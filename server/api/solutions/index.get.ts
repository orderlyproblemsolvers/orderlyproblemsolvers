import { sql, eq, desc } from 'drizzle-orm';
import { db } from '../../utils/db';
import { technologies, companyStack } from '../../database/schema';

export default defineEventHandler(async () => {
  // 1. Fetch all solutions + count of companies using them
  const result = await db.select({
    id: technologies.id,
    name: technologies.name,
    category: technologies.category,
    // Cast count to integer ensures it comes back as a number, not string '12'
    count: sql<number>`cast(count(${companyStack.companyId}) as int)`
  })
  .from(technologies)
  .leftJoin(companyStack, eq(technologies.id, companyStack.techId))
  .groupBy(technologies.id, technologies.name, technologies.category)
  // Sort by Category A-Z, then by Popularity (Highest First)
  .orderBy(technologies.category, desc(sql`count`));

  // 2. Group by Category in JS
  const grouped: Record<string, any[]> = {};
  
  result.forEach(item => {
    // Handle Legacy Data: If category is null, put in 'Uncategorized'
    // If it's 'General', you might want to group that separately or rename it
    const cat = item.category || 'General Solutions';
    
    if (!grouped[cat]) grouped[cat] = [];
    
    grouped[cat].push({
      ...item,
      // Create a URL-friendly slug on the fly
      slug: item.name.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '')
    });
  });

  return grouped;
});