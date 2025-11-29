import { eq, desc, and, or, ilike } from 'drizzle-orm';
import { db } from '../../utils/db';
import { people, companies } from '../../database/schema';

export default defineEventHandler(async (event) => {
  // 1. Get Query Params
  const query = getQuery(event);
  const search = query.search as string;
  const role = query.role as string;
  const location = query.location as string;

  // 2. Build Conditions
  // We always filter by 'approved'. We add other conditions if they exist.
  const conditions = [eq(people.status, 'approved')];

  if (search) {
    const searchLower = `%${search}%`;
    conditions.push(or(
      ilike(people.name, searchLower),
      ilike(people.bio, searchLower),
      ilike(people.role, searchLower)
    ));
  }

  if (role) {
    conditions.push(ilike(people.role, `%${role}%`));
  }

  if (location) {
    conditions.push(ilike(people.location, `%${location}%`));
  }

  // 3. Execute Query
  const result = await db.select({
    id: people.id,
    name: people.name,
    slug: people.slug,
    role: people.role,
    bio: people.bio,
    avatar: people.avatar,
    location: people.location,
    status: people.status,
    createdAt: people.createdAt,
    companyName: companies.name,
    companySlug: companies.slug,
  })
  .from(people)
  .leftJoin(companies, eq(people.companyId, companies.id))
  .where(and(...conditions)) // Apply all filters
  .orderBy(desc(people.createdAt));

  return result;
});