import { sql, eq } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies } from '../../database/schema';

export default defineEventHandler(async () => {
  // 1. Aggregate companies by industry
  // Returns: [{ industry: 'FinTech', count: 12 }, { industry: 'Health', count: 5 }]
  const result = await db.select({
    name: companies.industry,
    count: sql<number>`count(*)`
  })
  .from(companies)
  .where(eq(companies.status, 'approved'))
  .groupBy(companies.industry)
  .orderBy(companies.industry);

  // 2. Format for UI
  // We add icons/colors based on the name dynamically in the frontend
  return result.map(row => ({
    id: row.name?.toLowerCase().replace(/\s+/g, '-'), // Slugify
    label: row.name || 'Uncategorized',
    count: Number(row.count) + ' Solvers',
    desc: `Innovators in ${row.name}`, // Generic desc, or you can map specific ones
    link: `/industries/${row.name?.toLowerCase().replace(/\s+/g, '-')}`
  }));
});