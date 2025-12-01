import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { eq, desc } from 'drizzle-orm';
import { d as db, c as companies, p as people, a as articles, f as articleCompanies, t as technologies, b as companyStack } from '../../../_/db.mjs';
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
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing slug" });
  }
  try {
    const result = await db.select().from(companies).where(eq(companies.slug, slug)).limit(1);
    if (!result.length) {
      throw createError({ statusCode: 404, statusMessage: "Company not found" });
    }
    const company = result[0];
    const teamMembers = await db.select({
      name: people.name,
      role: people.role,
      slug: people.slug,
      image: people.avatar
    }).from(people).where(eq(people.companyId, company.id)).orderBy(desc(people.createdAt)).limit(6);
    const relatedStories = await db.select({
      title: articles.title,
      slug: articles.slug,
      category: articles.category,
      date: articles.publishedAt
    }).from(articleCompanies).leftJoin(articles, eq(articleCompanies.articleId, articles.id)).where(eq(articleCompanies.companyId, company.id)).orderBy(desc(articles.publishedAt)).limit(3);
    const stack = await db.select({
      name: technologies.name,
      category: technologies.category
    }).from(companyStack).leftJoin(technologies, eq(companyStack.techId, technologies.id)).where(eq(companyStack.companyId, company.id));
    return {
      ...company,
      team: teamMembers,
      stories: relatedStories,
      stack
    };
  } catch (error) {
    console.error("\u{1F525} DATABASE ERROR:", error);
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
