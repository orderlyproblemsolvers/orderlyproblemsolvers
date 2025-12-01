import { d as defineEventHandler } from '../../_/nitro.mjs';
import { sql, eq, desc } from 'drizzle-orm';
import { d as db, p as people, a as articles } from '../../_/db.mjs';
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

const index_get = defineEventHandler(async (event) => {
  try {
    const result = await db.select({
      id: articles.id,
      title: articles.title,
      slug: articles.slug,
      excerpt: articles.excerpt,
      category: articles.category,
      image: articles.coverImage,
      readTime: articles.readTime,
      publishedAt: articles.publishedAt,
      // Author Logic: Prefer Linked Person, Fallback to Text Name
      authorName: sql`COALESCE(${people.name}, ${articles.authorName})`,
      authorRole: people.role,
      authorImage: people.avatar
    }).from(articles).leftJoin(people, eq(articles.authorId, people.id)).where(eq(articles.isPublished, true)).orderBy(desc(articles.publishedAt));
    return result;
  } catch (error) {
    console.error("\u{1F525} STORIES API ERROR:", error);
    return [];
  }
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
