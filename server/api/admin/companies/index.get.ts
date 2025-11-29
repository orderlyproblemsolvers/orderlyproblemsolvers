import { desc } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { companies } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security Check
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. Fetch All
  const result = await db.select().from(companies).orderBy(desc(companies.createdAt));
  return result;
});