import { eq, desc, sql, ilike, inArray, or } from "drizzle-orm";
import { db } from "../../utils/db";
import {
  technologies,
  companies,
  people,
  companyStack,
  personStack,
} from "../../database/schema";

// Helper to Capitalize
const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (!slug)
    throw createError({ statusCode: 400, statusMessage: "Missing slug" });

  const nameQuery = slug.replace(/-/g, " ");

  try {
    // 1. FETCH EVERYTHING AT ONCE
    // We search for technologies where:
    // A) The Name matches the slug (e.g. Name = "Fintech")
    // OR
    // B) The Category matches the slug (e.g. Category = "Fintech")

    const relatedTechs = await db
      .select()
      .from(technologies)
      .where(
        or(
          ilike(technologies.name, nameQuery),
          ilike(technologies.category, nameQuery)
        )
      );
    //explain

    // If absolutely nothing matches either name or category -> 404
    if (relatedTechs.length === 0) {
      throw createError({
        statusCode: 404,
        statusMessage: "Solution Not Found",
      });
    }

    // 2. DETERMINE PAGE INFO
    // If we found a specific tech matching the name exactly (e.g. the "Fintech" tag),
    // we use its details (description, etc) as the main page info.
    // Otherwise, we create a generic "Category" object.
    const mainTech = relatedTechs.find(
      (t) => t.name.toLowerCase() === nameQuery.toLowerCase()
    );

    // Collect ALL IDs (The ID of "Fintech" tag + IDs of "Javascript", "AWS" etc.)
    const allTechIds = relatedTechs.map((t) => t.id);

    // 3. FETCH COMPANIES (Using the Combined List of IDs)
    // We want companies that:
    // A) Use one of the found technologies (e.g. uses "Stripe")
    // OR
    // B) Matches the search term in their Industry or Name (e.g. Industry is "Fintech")
    const combinedCompanies = await db
      .selectDistinct({
        name: companies.name,
        slug: companies.slug,
        logo: companies.logo,
        industry: companies.industry,
        location: companies.location,
        featured: companies.featured,
      })
      .from(companies) // Start from companies, not the stack!
      .leftJoin(companyStack, eq(companies.id, companyStack.companyId)) // Left join so we don't lose companies without the stack
      .where(
        or(
          // Match 1: The company uses one of the found technologies
          inArray(companyStack.techId, allTechIds),

          // Match 2: The company's industry matches the search term
          ilike(companies.industry, nameQuery),

          // Match 3 (Optional): The company name matches
          ilike(companies.name, nameQuery)
        )
      )
      .orderBy(desc(companies.featured), companies.name)
      .limit(12);

    // 4. FETCH EXPERTS (Using the Combined List of IDs)
    const combinedExperts = await db
      .selectDistinct({
        name: people.name,
        slug: people.slug,
        role: people.role,
        avatar: people.avatar,
      })
      .from(personStack)
      .innerJoin(people, eq(personStack.personId, people.id))
      .where(inArray(personStack.techId, allTechIds))
      .limit(8);

    // 5. CALCULATE TOTAL STATS (Optional: Separate query for accuracy if needed)
    // For now, we return the counts of what we found or just a simple length check
    // If you need exact DB counts for the "Stats" pill, you'd run a `count` query with `inArray` here.

    return {
      // Use specific tech details if available, else generic defaults
      id: mainTech?.id || `cat-${slug}`,
      name: mainTech?.name || toTitleCase(nameQuery),
      category: mainTech?.category || "Solution Category",
      description:
        mainTech?.description ||
        `Explore top companies and experts specializing in ${nameQuery}.`,

      // Return the merged lists
      companies: combinedCompanies,
      experts: combinedExperts,

      stats: {
        companies:
          combinedCompanies.length >= 12 ? "12+" : combinedCompanies.length,
        experts: combinedExperts.length >= 8 ? "8+" : combinedExperts.length,
      },
    };
  } catch (e: any) {
    if (e.statusCode === 404) throw e;
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});
