import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { ilike, eq } from 'drizzle-orm';
import { d as db, c as companies, p as people, a as articles } from '../../../_/db.mjs';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'devalue';
import 'consola';
import 'unhead';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'vue/server-renderer';
import 'xss';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'drizzle-orm/pg-core';

const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const industryName = slug == null ? void 0 : slug.replace(/-/g, " ");
  if (!industryName) throw createError({ statusCode: 400, statusMessage: "Missing slug" });
  try {
    const companyList = await db.select({
      name: companies.name,
      slug: companies.slug,
      logo: companies.logo,
      headline: companies.headline,
      location: companies.location,
      stage: companies.stage
    }).from(companies).where(ilike(companies.industry, industryName)).limit(12);
    const stats = {
      companies: companyList.length,
      // Approximate from limit or do count() query
      people: 0,
      // You can add a complex join to count people in these companies if needed
      stories: 0
    };
    const storyList = await db.select({
      title: articles.title,
      slug: articles.slug,
      date: articles.publishedAt,
      authorName: people.name
    }).from(articles).leftJoin(people, eq(articles.authorId, people.id)).where(ilike(articles.category, `%${industryName}%`)).limit(3);
    if (companyList.length === 0 && storyList.length === 0) {
      throw createError({ statusCode: 404, statusMessage: "Industry not found or empty" });
    }
    return {
      name: industryName.toUpperCase(),
      // Format nicely
      description: `Exploring the ecosystem of ${industryName}.`,
      stats,
      companies: companyList,
      stories: storyList
    };
  } catch (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
