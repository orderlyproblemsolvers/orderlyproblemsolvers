import { eq, desc } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies, people, articles, companyStack, technologies, articleCompanies } from '../../database/schema';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  try {
    // 1. Fetch Company Details
    const result = await db.select().from(companies).where(eq(companies.slug, slug)).limit(1);

    if (!result.length) {
      throw createError({ statusCode: 404, statusMessage: 'Company not found' });
    }

    const company = result[0];

    // 2. Fetch Team Members
    const teamMembers = await db.select({
      name: people.name,
      role: people.role,
      slug: people.slug,
      image: people.avatar
    })
    .from(people)
    .where(eq(people.companyId, company.id))
    .orderBy(desc(people.createdAt))
    .limit(6);

    // 3. Fetch Related Stories (UPDATED to use Junction Table)
    // We join articleCompanies -> articles
    const relatedStories = await db.select({
      title: articles.title,
      slug: articles.slug,
      category: articles.category,
      date: articles.publishedAt
    })
    .from(articleCompanies)
    .leftJoin(articles, eq(articleCompanies.articleId, articles.id))
    .where(eq(articleCompanies.companyId, company.id))
    .orderBy(desc(articles.publishedAt))
    .limit(3);

    // 4. Fetch Tech Stack
    const stack = await db.select({
      name: technologies.name,
      category: technologies.category
    })
    .from(companyStack)
    .leftJoin(technologies, eq(companyStack.techId, technologies.id))
    .where(eq(companyStack.companyId, company.id));

    return { 
      ...company, 
      team: teamMembers, 
      stories: relatedStories,
      stack 
    };

  } catch (error: any) {
    console.error('🔥 DATABASE ERROR:', error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});