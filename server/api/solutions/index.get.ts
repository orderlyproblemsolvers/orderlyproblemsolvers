import { sql } from 'drizzle-orm';
import { db } from '../../utils/db';
import { technologies, companyStack } from '../../database/schema';

export default defineEventHandler(async () => {
  // 1. Fetch all solutions with a count of how many companies use them
  // We group by category to create the "Diverse" layout
  
  const result = await db.select({
    id: technologies.id,
    name: technologies.name,
    category: technologies.category,
    count: sql<number>`count(${companyStack.companyId})`
  })
  .from(technologies)
  .leftJoin(companyStack, sql`${technologies.id} = ${companyStack.techId}`)
  .groupBy(technologies.id, technologies.name, technologies.category)
  .orderBy(technologies.category);

  // 2. Group by Category in JS
  const grouped: Record<string, any[]> = {};
  
  result.forEach(item => {
    const cat = item.category || 'Uncategorized';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push({
      ...item,
      slug: item.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    });
  });

  return grouped;
});