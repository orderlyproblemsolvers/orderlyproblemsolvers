import { eq, desc, sql } from 'drizzle-orm';
import { db } from '../../utils/db';
import { articles, people } from '../../database/schema';

export default defineEventHandler(async (event) => {
  try {
    // Fetch Articles + Author Details
    const result = await db.select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      excerpt: articles.excerpt,
      category: articles.category,
      image: articles.coverImage,
      readTime: articles.readTime,
      publishedAt: articles.publishedAt,
      
      // Author Logic: Prefer Linked Person, Fallback to Text Name
      authorName: sql<string>`COALESCE(${people.name}, ${articles.authorName})`,
      authorRole: people.role,
      authorImage: people.avatar,
    })
    .from(articles)
    .leftJoin(people, eq(articles.authorId, people.id))
    .where(eq(articles.isPublished, true)) // Only show published
    .orderBy(desc(articles.publishedAt));

    return result;

  } catch (error) {
    console.error('🔥 STORIES API ERROR:', error);
    return []; // Return empty array instead of crashing
  }
});