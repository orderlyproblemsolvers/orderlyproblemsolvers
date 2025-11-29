import { d as defineEventHandler, a as db, c as companies, b as people, e as articles, f as technologies } from '../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const urls = defineEventHandler(async () => {
  const urls = [];
  const companyList = await db.select({ slug: companies.slug, updatedAt: companies.updatedAt }).from(companies).where(eq(companies.status, "approved"));
  urls.push(...companyList.map((c) => ({
    loc: `/companies/${c.slug}`,
    lastmod: c.updatedAt || /* @__PURE__ */ new Date()
  })));
  const peopleList = await db.select({ slug: people.slug }).from(people).where(eq(people.status, "approved"));
  urls.push(...peopleList.map((p) => `/people/${p.slug}`));
  const storyList = await db.select({ slug: articles.slug, publishedAt: articles.publishedAt }).from(articles).where(eq(articles.isPublished, true));
  urls.push(...storyList.map((s) => ({
    loc: `/stories/${s.slug}`,
    lastmod: s.publishedAt || /* @__PURE__ */ new Date(),
    changefreq: "weekly"
  })));
  const techList = await db.select({ name: technologies.name }).from(technologies);
  urls.push(...techList.map((t) => `/solutions/${t.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")}`));
  return urls;
});

export { urls as default };
//# sourceMappingURL=urls.mjs.map
