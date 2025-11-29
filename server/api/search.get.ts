import { ilike, or } from 'drizzle-orm';
import { db } from '../utils/db';
import { companies, people, articles } from '../database/schema';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const q = query.q as string;

  // DEBUG LOG
  console.log('🔎 Searching for:', q);

  if (!q || q.length < 2) {
    return [];
  }

  const searchTerm = `%${q}%`;

  try {
    // 1. Search Companies
    const rawCompanies = await db.select({
      id: companies.id,
      name: companies.name,
      slug: companies.slug,
      info: companies.industry
    })
    .from(companies)
    .where(or(
      ilike(companies.name, searchTerm),
      ilike(companies.industry, searchTerm),
      ilike(companies.description, searchTerm)
    ))
    .limit(5);

    // 2. Search People
    const rawPeople = await db.select({
      id: people.id,
      name: people.name,
      slug: people.slug,
      info: people.role
    })
    .from(people)
    .where(or(
      ilike(people.name, searchTerm),
      ilike(people.role, searchTerm),
      ilike(people.bio, searchTerm)
    ))
    .limit(5);

    // 3. Search Stories
    const rawStories = await db.select({
      id: articles.id,
      name: articles.title, // Map 'title' to 'name' so the UI stays consistent
      slug: articles.slug,
      info: articles.category
    })
    .from(articles)
    .where(or(
      ilike(articles.title, searchTerm),
      ilike(articles.content, searchTerm)
    ))
    .limit(5);

    // 4. Tag and Merge Results in Javascript
    // This avoids the Drizzle "Maximum call stack" error by doing the mapping outside the SQL query builder
    const companyResults = rawCompanies.map(c => ({ ...c, type: 'company' }));
    const peopleResults = rawPeople.map(p => ({ ...p, type: 'person' }));
    const storyResults = rawStories.map(s => ({ ...s, type: 'story' }));

    const results = [...companyResults, ...peopleResults, ...storyResults];
    
    console.log(`✅ Found ${results.length} results`);
    return results;

  } catch (e) {
    console.error("Search API Error:", e);
    return [];
  }
});