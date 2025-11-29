import { eq, desc, ilike, sql } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies, people, articles } from '../../database/schema';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  // Convert slug back to Industry Name (approximate)
  // "healthtech" -> "HealthTech" (This relies on ILIKE matching)
  const industryName = slug?.replace(/-/g, ' '); 

  if (!industryName) throw createError({ statusCode: 400, statusMessage: 'Missing slug' });

  try {
    // 1. Fetch Companies in this Industry
    const companyList = await db.select({
      name: companies.name,
      slug: companies.slug,
      logo: companies.logo,
      headline: companies.headline,
      location: companies.location,
      stage: companies.stage
    })
    .from(companies)
    .where(ilike(companies.industry, industryName))
    .limit(12);

    // 2. Count Stats
    // We use a subquery approach for speed
    const stats = {
        companies: companyList.length, // Approximate from limit or do count() query
        people: 0, // You can add a complex join to count people in these companies if needed
        stories: 0
    };

    // 3. Fetch Stories (Matching category name or content tags)
    // We assume article categories might match industries or contain the keyword
    const storyList = await db.select({
        title: articles.title,
        slug: articles.slug,
        date: articles.publishedAt,
        authorName: people.name
    })
    .from(articles)
    .leftJoin(people, eq(articles.authorId, people.id))
    .where(ilike(articles.category, `%${industryName}%`))
    .limit(3);

    if (companyList.length === 0 && storyList.length === 0) {
       throw createError({ statusCode: 404, statusMessage: 'Industry not found or empty' });
    }

    return { 
        name: industryName.toUpperCase(), // Format nicely
        description: `Exploring the ecosystem of ${industryName}.`,
        stats,
        companies: companyList,
        stories: storyList
    };

  } catch (error: any) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});