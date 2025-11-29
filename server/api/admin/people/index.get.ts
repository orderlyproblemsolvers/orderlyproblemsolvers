import { desc, eq } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { people, companies } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security Check
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. Fetch All People with Company Name
  const result = await db.select({
    id: people.id,
    name: people.name,
    role: people.role,
    location: people.location,
    avatar: people.avatar,
    status: people.status,
    createdAt: people.createdAt,
    // Join Data
    companyName: companies.name
  })
  .from(people)
  .leftJoin(companies, eq(people.companyId, companies.id))
  .orderBy(desc(people.createdAt));

  return result;
});