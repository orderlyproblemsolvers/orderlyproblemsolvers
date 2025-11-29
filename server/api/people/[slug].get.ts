import { eq, desc } from 'drizzle-orm';
import { db } from '../../utils/db';
import { people, companies, articles, personStack, technologies, articlePeople } from '../../database/schema';

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug');

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Missing slug' });
  }

  try {
    // 1. Fetch Person Profile + Company Info
    const result = await db.select({
      id: people.id,
      name: people.name,
      slug: people.slug,
      role: people.role,
      bio: people.bio,
      avatar: people.avatar,
      location: people.location,
      
      // Contact Info
      email: people.email,
      website: people.website,
      
      status: people.status,
      
      // Company Info (Left Join allows null if Freelance)
      companyName: companies.name,
      companySlug: companies.slug,
      companyLogo: companies.logo
    })
    .from(people)
    .leftJoin(companies, eq(people.companyId, companies.id))
    .where(eq(people.slug, slug))
    .limit(1);

    if (!result.length) {
      throw createError({ statusCode: 404, statusMessage: 'Person not found' });
    }

    const person = result[0];

    // 2. Fetch Tech Stack (Skills)
    const stack = await db.select({
      name: technologies.name,
      category: technologies.category
    })
    .from(personStack)
    .leftJoin(technologies, eq(personStack.techId, technologies.id))
    .where(eq(personStack.personId, person.id));

    // 3. Fetch Related Stories (Merge Authorship + Featured)
    
    // A. Stories they Authored
    const authoredStories = await db.select({
      title: articles.title,
      slug: articles.slug,
      date: articles.publishedAt,
      category: articles.category
    })
    .from(articles)
    .where(eq(articles.authorId, person.id));

    // B. Stories they are Featured in (via Junction Table)
    const featuredStories = await db.select({
      title: articles.title,
      slug: articles.slug,
      date: articles.publishedAt,
      category: articles.category
    })
    .from(articlePeople)
    .leftJoin(articles, eq(articlePeople.articleId, articles.id))
    .where(eq(articlePeople.personId, person.id));

    // C. Merge & Deduplicate
    // We create a Map using the slug as a key to ensure no duplicates
    const storyMap = new Map();
    
    [...authoredStories, ...featuredStories].forEach(story => {
      if (story && story.slug) {
        storyMap.set(story.slug, story);
      }
    });

    // Convert back to array and sort by date (newest first)
    const allStories = Array.from(storyMap.values()).sort((a, b) => {
      return new Date(b.date!).getTime() - new Date(a.date!).getTime();
    });

    // 4. Return Data
    return { 
      ...person, 
      stack, 
      articles: allStories.slice(0, 6) // Limit to top 6 recent stories
    };

  } catch (error) {
    console.error('🔥 DATABASE ERROR:', error);
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
  }
});