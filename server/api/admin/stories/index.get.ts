import { desc, eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { articles, people } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security Check
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. Fetch All Articles with Author Name
  const result = await db.select({
    id: articles.id,
    title: articles.title,
    category: articles.category,
    isPublished: articles.isPublished,
    publishedAt: articles.publishedAt,
    createdAt: articles.createdAt,
    // Join Data
    authorName: people.name
  })
  .from(articles)
  .leftJoin(people, eq(articles.authorId, people.id))
  .orderBy(desc(articles.createdAt));

  return result;
});