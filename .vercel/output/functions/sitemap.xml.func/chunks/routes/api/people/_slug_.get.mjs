import { d as defineEventHandler, i as getRouterParam, h as createError, a as db, c as companies, b as people, f as technologies, k as personStack, e as articles, o as articlePeople } from '../../../_/nitro.mjs';
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

const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing slug" });
  }
  try {
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
    }).from(people).leftJoin(companies, eq(people.companyId, companies.id)).where(eq(people.slug, slug)).limit(1);
    if (!result.length) {
      throw createError({ statusCode: 404, statusMessage: "Person not found" });
    }
    const person = result[0];
    const stack = await db.select({
      name: technologies.name,
      category: technologies.category
    }).from(personStack).leftJoin(technologies, eq(personStack.techId, technologies.id)).where(eq(personStack.personId, person.id));
    const authoredStories = await db.select({
      title: articles.title,
      slug: articles.slug,
      date: articles.publishedAt,
      category: articles.category
    }).from(articles).where(eq(articles.authorId, person.id));
    const featuredStories = await db.select({
      title: articles.title,
      slug: articles.slug,
      date: articles.publishedAt,
      category: articles.category
    }).from(articlePeople).leftJoin(articles, eq(articlePeople.articleId, articles.id)).where(eq(articlePeople.personId, person.id));
    const storyMap = /* @__PURE__ */ new Map();
    [...authoredStories, ...featuredStories].forEach((story) => {
      if (story && story.slug) {
        storyMap.set(story.slug, story);
      }
    });
    const allStories = Array.from(storyMap.values()).sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    return {
      ...person,
      stack,
      articles: allStories.slice(0, 6)
      // Limit to top 6 recent stories
    };
  } catch (error) {
    console.error("\u{1F525} DATABASE ERROR:", error);
    throw createError({ statusCode: 500, statusMessage: "Internal Server Error" });
  }
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
