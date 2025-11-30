import { d as defineEventHandler, c as createError, r as readBody } from '../../_/nitro.mjs';
import { d as db, a as articles, f as articleCompanies, g as articlePeople } from '../../_/db.mjs';
import { a as auth } from '../../_/auth.mjs';
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
import 'better-auth';
import 'better-auth/adapters/drizzle';

const index_post = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const body = await readBody(event);
  try {
    const newArticle = await db.insert(articles).values({
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      coverImage: body.coverImage,
      category: body.category,
      readTime: body.readTime,
      authorName: body.authorName || "OPS Admin",
      isPublished: body.isPublished || false,
      publishedAt: body.isPublished ? /* @__PURE__ */ new Date() : null
    }).returning();
    const articleId = newArticle[0].id;
    if (body.featuredCompanyIds && body.featuredCompanyIds.length > 0) {
      for (const compId of body.featuredCompanyIds) {
        await db.insert(articleCompanies).values({
          articleId,
          companyId: compId
        });
      }
    }
    if (body.featuredPersonIds && body.featuredPersonIds.length > 0) {
      for (const personId of body.featuredPersonIds) {
        await db.insert(articlePeople).values({
          articleId,
          personId
        });
      }
    }
    return { success: true, article: newArticle[0] };
  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post3.mjs.map
