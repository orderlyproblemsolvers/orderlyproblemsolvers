import { d as defineEventHandler, r as readBody, a as db, c as companies, b as people, e as articles } from '../../_/nitro.mjs';
import { inArray, eq, desc } from 'drizzle-orm';
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

const feed_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const slugs = body.slugs;
  if (!slugs || slugs.length === 0) {
    return [];
  }
  const targetCompanies = await db.select({ id: companies.id }).from(companies).where(inArray(companies.slug, slugs));
  const companyIds = targetCompanies.map((c) => c.id);
  if (companyIds.length === 0) return [];
  const feed = await db.select({
    title: articles.title,
    slug: articles.slug,
    excerpt: articles.excerpt,
    category: articles.category,
    image: articles.coverImage,
    date: articles.publishedAt,
    readTime: articles.readTime,
    // Author
    authorName: people.name,
    // Company
    companyName: companies.name,
    companySlug: companies.slug
  }).from(articles).leftJoin(people, eq(articles.authorId, people.id)).leftJoin(companies, eq(articles.featuredCompanyId, companies.id)).where(inArray(articles.featuredCompanyId, companyIds)).orderBy(desc(articles.publishedAt)).limit(20);
  return feed;
});

export { feed_post as default };
//# sourceMappingURL=feed.post.mjs.map
