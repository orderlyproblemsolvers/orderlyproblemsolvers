import { eq, desc, and, or, ilike } from 'drizzle-orm';
import { db } from '../../utils/db';
import { companies } from '../../database/schema';

export default defineEventHandler(async (event) => {
  // 1. Get Query Params
  const query = getQuery(event);
  const search = query.search as string;
  const industry = query.industry as string;
  const stage = query.stage as string;

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

  // 3. Execute Query (Explicit Selection)
  const result = await db.select({
    id: companies.id,
    name: companies.name,
    slug: companies.slug,
    headline: companies.headline,
    logo: companies.logo,
    location: companies.location,
    industry: companies.industry,
    stage: companies.stage,
    
    // ✅ NEW: explicitly fetch videos for list view (e.g., to show a "Play" icon)
    videos: companies.videos,
    
    featured: companies.featured,
    createdAt: companies.createdAt
  })
  .from(companies)
  .where(and(...conditions))
  .orderBy(desc(companies.createdAt));

  return result;
});