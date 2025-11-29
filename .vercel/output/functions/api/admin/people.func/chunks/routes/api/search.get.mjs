import { d as defineEventHandler, n as getQuery, a as db, c as companies, b as people, e as articles } from '../../_/nitro.mjs';
import { or, ilike } from 'drizzle-orm';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'devalue';
import 'consola';
import 'unhead';
import 'better-auth';
import 'better-auth/adapters/drizzle';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'drizzle-orm/pg-core';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'vue';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import '@iconify/utils';
import 'node:crypto';
import 'xss';

const search_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const q = query.q;
  console.log("\u{1F50E} Searching for:", q);
  if (!q || q.length < 2) {
    return [];
  }
  const searchTerm = `%${q}%`;
  try {
    const rawCompanies = await db.select({
      id: companies.id,
      name: companies.name,
      slug: companies.slug,
      info: companies.industry
    }).from(companies).where(or(
      ilike(companies.name, searchTerm),
      ilike(companies.industry, searchTerm),
      ilike(companies.description, searchTerm)
    )).limit(5);
    const rawPeople = await db.select({
      id: people.id,
      name: people.name,
      slug: people.slug,
      info: people.role
    }).from(people).where(or(
      ilike(people.name, searchTerm),
      ilike(people.role, searchTerm),
      ilike(people.bio, searchTerm)
    )).limit(5);
    const rawStories = await db.select({
      id: articles.id,
      name: articles.title,
      // Map 'title' to 'name' so the UI stays consistent
      slug: articles.slug,
      info: articles.category
    }).from(articles).where(or(
      ilike(articles.title, searchTerm),
      ilike(articles.content, searchTerm)
    )).limit(5);
    const companyResults = rawCompanies.map((c) => ({ ...c, type: "company" }));
    const peopleResults = rawPeople.map((p) => ({ ...p, type: "person" }));
    const storyResults = rawStories.map((s) => ({ ...s, type: "story" }));
    const results = [...companyResults, ...peopleResults, ...storyResults];
    console.log(`\u2705 Found ${results.length} results`);
    return results;
  } catch (e) {
    console.error("Search API Error:", e);
    return [];
  }
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
