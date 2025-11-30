import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { count, eq } from 'drizzle-orm';
import { d as db, c as companies, p as people, a as articles } from '../../../_/db.mjs';
import { a as auth } from '../../../_/auth.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const [companyCount, peopleCount, articleCount, pendingCompanies] = await Promise.all([
    db.select({ value: count() }).from(companies),
    db.select({ value: count() }).from(people),
    db.select({ value: count() }).from(articles),
    db.select({ value: count() }).from(companies).where(eq(companies.status, "pending"))
  ]);
  return {
    companies: companyCount[0].value,
    people: peopleCount[0].value,
    articles: articleCount[0].value,
    pending: pendingCompanies[0].value
  };
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
