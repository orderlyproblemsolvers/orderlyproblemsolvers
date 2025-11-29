import { eq, desc, and, or, ilike } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies } from '../../database/schema';

export default defineEventHandler(async (event) => {
  // 1. Get Query Params
  const query = getQuery(event);
  const search = query.search as string;
  const industry = query.industry as string;
  const stage = query.stage as string;
  const hiring = query.hiring as string; // "true" or undefined

  // 2. Build Conditions
  // Always filter by 'approved'
  const conditions = [eq(companies.status, 'approved')];

  if (search) {
    const searchLower = `%${search}%`;
    conditions.push(or(
      ilike(companies.name, searchLower),
      ilike(companies.headline, searchLower),
      ilike(companies.description, searchLower),
      ilike(companies.industry, searchLower)
    ));
  }

  if (industry) {
    conditions.push(ilike(companies.industry, `%${industry}%`));
  }

  if (stage) {
    conditions.push(ilike(companies.stage, `%${stage}%`));
  }

  // Note: Hiring logic is usually a boolean column or derived. 
  // If you haven't added a 'hiring' column to the DB yet, we skip this filter logic 
  // or assume all companies are potential employers.
  // For now, let's assume we filter if the featured flag is true as a proxy, 
  // OR if you added a specific 'isHiring' column. 
  // If not, we ignore it to avoid errors.

  // 3. Execute Query
  const result = await db.select()
    .from(companies)
    .where(and(...conditions))
    .orderBy(desc(companies.createdAt));

  return result;
});