import { sql, eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies } from '../../database/schema';

export default defineEventHandler(async () => {
  // Count companies grouped by industry
  const result = await db.select({
    industry: companies.industry,
    count: sql<number>`count(*)`
  })
  .from(companies)
  .where(eq(companies.status, 'approved'))
  .groupBy(companies.industry);

  // Convert to a dictionary for easy lookup: { 'FinTech': 45, 'HealthTech': 12 }
  const stats: Record<string, number> = {};
  
  result.forEach(row => {
    if (row.industry) {
      stats[row.industry] = Number(row.count);
    }
  });

  return stats;
});