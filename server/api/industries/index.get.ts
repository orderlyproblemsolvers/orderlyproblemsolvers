import { sql, eq, desc } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies } from '../../database/schema';

// Helper for slugs (or import { kebabCase } from 'scule')
const createSlug = (str: string | null) => 
  str ? str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'uncategorized';

export default defineEventHandler(async () => {
  const result = await db.select({
    name: companies.industry,
    count: sql<number>`count(*)`
  })
  .from(companies)
  .where(eq(companies.status, 'approved'))
  .groupBy(companies.industry)
  .orderBy(desc(sql`count`)); // Optional: Order by most popular industry first

  return result.map(row => {
    const slug = createSlug(row.name);
    const count = Number(row.count);

    return {
      id: slug,
      label: row.name || 'Uncategorized',
      count: count, // Send raw number
      formattedCount: `${count} Solvers`, // Optional: Keep if you really want it here
      desc: `Innovators in ${row.name || 'various fields'}`,
      link: `/industries/${slug}`
    };
  });
});