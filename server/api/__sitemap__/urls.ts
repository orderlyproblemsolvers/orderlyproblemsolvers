import { db } from '../../utils/db';
import { companies, people, articles, technologies } from '../../database/schema';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async () => {
  const urls = [];

  // 1. Fetch Companies (Only approved)
  const companyList = await db.select({ slug: companies.slug, updatedAt: companies.updatedAt })
    .from(companies)
    .where(eq(companies.status, 'approved'));

  urls.push(...companyList.map(c => ({
    loc: `/companies/${c.slug}`,
    lastmod: c.updatedAt || new Date()
  })));

  // 2. Fetch People (Only approved)
  const peopleList = await db.select({ slug: people.slug })
    .from(people)
    .where(eq(people.status, 'approved'));

  urls.push(...peopleList.map(p => `/people/${p.slug}`));

  // 3. Fetch Stories (Only published)
  const storyList = await db.select({ slug: articles.slug, publishedAt: articles.publishedAt })
    .from(articles)
    .where(eq(articles.isPublished, true));

  urls.push(...storyList.map(s => ({
    loc: `/stories/${s.slug}`,
    lastmod: s.publishedAt || new Date(),
    changefreq: 'weekly'
  })));

  // 4. Fetch Solutions (Categories)
  const techList = await db.select({ name: technologies.name }).from(technologies);
  
  urls.push(...techList.map(t => `/solutions/${t.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`));

  return urls;
});