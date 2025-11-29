import { eq, desc, sql, ilike } from 'drizzle-orm';
import { db } from '../../utils/db';
import { technologies, companies, people, companyStack, personStack } from '../../database/schema';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');
  
  // Convert slug back to Name (approximate) or use fuzzy search
  // e.g. "vue-js" -> "Vue.js" (This relies on the search name being similar)
  // A better way is to store 'slug' in the technologies table, but for now we match by name pattern
  const nameQuery = slug?.replace(/-/g, ' '); 

  if (!nameQuery) throw createError({ statusCode: 400, statusMessage: 'Missing slug' });

  // 1. Find the Technology ID
  const techResult = await db.select().from(technologies).where(ilike(technologies.name, nameQuery)).limit(1);
  
  if (!techResult.length) {
    throw createError({ statusCode: 404, statusMessage: 'Solution not found' });
  }
  const tech = techResult[0];

  // 2. Find Companies using it
  const companiesUsing = await db.select({
    name: companies.name,
    slug: companies.slug,
    logo: companies.logo,
    industry: companies.industry,
    location: companies.location
  })
  .from(companyStack)
  .leftJoin(companies, eq(companyStack.companyId, companies.id))
  .where(eq(companyStack.techId, tech.id))
  .limit(6);

  // 3. Find People skilled in it
  const experts = await db.select({
    name: people.name,
    slug: people.slug,
    role: people.role,
    avatar: people.avatar
  })
  .from(personStack)
  .leftJoin(people, eq(personStack.personId, people.id))
  .where(eq(personStack.techId, tech.id))
  .limit(6);

  // 4. Stats
  const stats = {
    companies: companiesUsing.length,
    experts: experts.length
  };

  return { ...tech, companies: companiesUsing, experts, stats };
});