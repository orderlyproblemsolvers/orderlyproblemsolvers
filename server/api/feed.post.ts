import { inArray, desc, eq } from 'drizzle-orm';
import { db } from '../utils/db';
import { companies, articles, people } from '../database/schema';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const slugs = body.slugs as string[];

  if (!slugs || slugs.length === 0) {
    return [];
  }

  // 1. Get Company IDs from the Slugs
  // We need IDs because the 'articles' table links via 'featuredCompanyId'
  const targetCompanies = await db.select({ id: companies.id })
    .from(companies)
    .where(inArray(companies.slug, slugs));

  const companyIds = targetCompanies.map(c => c.id);

  if (companyIds.length === 0) return [];

  // 2. Fetch Stories featuring these companies
  const feed = await db.select({
    title: articles.title,
    slug: articles.slug,
    excerpt: articles.excerpt,
    category: articles.category,
    image: articles.coverImage,
    date: articles.publishedAt,
    readTime: articles.readTime,
    // Author
    authorName: people.name,
    // Company
    companyName: companies.name,
    companySlug: companies.slug
  })
  .from(articles)
  .leftJoin(people, eq(articles.authorId, people.id))
  .leftJoin(companies, eq(articles.featuredCompanyId, companies.id))
  .where(inArray(articles.featuredCompanyId, companyIds))
  .orderBy(desc(articles.publishedAt))
  .limit(20);

  return feed;
});