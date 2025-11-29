import { count, eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies, people, articles } from '../../database/schema';
import { auth } from '../../utils/auth';

export default defineEventHandler(async (event) => {
  // 1. SECURITY: Admin Only
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Unauthorized' });
  }

  // 2. FETCH COUNTS (Parallel for speed)
  const [companyCount, peopleCount, articleCount, pendingCompanies] = await Promise.all([
    db.select({ value: count() }).from(companies),
    db.select({ value: count() }).from(people),
    db.select({ value: count() }).from(articles),
    db.select({ value: count() }).from(companies).where(eq(companies.status, 'pending')),
  ]);

  return {
    companies: companyCount[0].value,
    people: peopleCount[0].value,
    articles: articleCount[0].value,
    pending: pendingCompanies[0].value
  };
});