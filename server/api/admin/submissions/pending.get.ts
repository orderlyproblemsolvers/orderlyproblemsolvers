import { eq, desc } from 'drizzle-orm';
import { db } from '../../../utils/db';
import { companies, people } from '../../../database/schema';
import { auth } from '../../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. Security
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. Fetch Pending Companies
  const pendingCompanies = await db.select().from(companies).where(eq(companies.status, 'pending'));
  
  // 3. Fetch Pending People
  const pendingPeople = await db.select().from(people).where(eq(people.status, 'pending'));

  // 4. Normalize Data (So the UI handles them the same way)
  const normalizedCompanies = pendingCompanies.map(c => ({
    id: c.id,
    type: 'company',
    name: c.name,
    info: `${c.industry} • ${c.location}`,
    description: c.description,
    createdAt: c.createdAt
  }));

  const normalizedPeople = pendingPeople.map(p => ({
    id: p.id,
    type: 'person',
    name: p.name,
    info: `${p.role} • ${p.location}`,
    description: p.bio,
    createdAt: p.createdAt
  }));

  // 5. Merge and Sort (Oldest first, so you clear the backlog)
  const merged = [...normalizedCompanies, ...normalizedPeople].sort((a, b) => {
    return new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime();
  });

  return merged;
});