import { d as defineEventHandler, a as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { sql, eq } from 'drizzle-orm';
import { d as db, p as people, a as articles, c as companies, f as articleCompanies, g as articlePeople } from '../../../_/db.mjs';
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
    const articleResult = await db.select({
      id: articles.id,
      title: articles.title,
      subtitle: articles.excerpt,
      content: articles.content,
      date: articles.publishedAt,
      readTime: articles.readTime,
      category: articles.category,
      image: articles.coverImage,
      // Author Logic: Prefer Linked Person, Fallback to Text Name
      authorName: sql`COALESCE(${people.name}, ${articles.authorName})`,
      authorRole: people.role,
      authorImage: people.avatar,
      authorBio: people.bio,
      authorSlug: people.slug
    }).from(articles).leftJoin(people, eq(articles.authorId, people.id)).where(eq(articles.slug, slug)).limit(1);
    if (!articleResult.length) {
      throw createError({ statusCode: 404, statusMessage: "Story not found" });
    }
    const article = articleResult[0];
    const linkedCompanies = await db.select({
      name: companies.name,
      slug: companies.slug,
      logo: companies.logo,
      industry: companies.industry,
      headline: companies.headline
    }).from(articleCompanies).leftJoin(companies, eq(articleCompanies.companyId, companies.id)).where(eq(articleCompanies.articleId, article.id));
    const linkedPeople = await db.select({
      name: people.name,
      slug: people.slug,
      avatar: people.avatar,
      role: people.role
    }).from(articlePeople).leftJoin(people, eq(articlePeople.personId, people.id)).where(eq(articlePeople.articleId, article.id));
    return {
      ...article,
      companies: linkedCompanies,
      people: linkedPeople
    };
  } catch (error) {
    console.error("\u{1F525} DATABASE ERROR:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
