import { d as defineEventHandler, n as getQuery, c as companies, a as db } from '../../_/nitro.mjs';
import { eq, or, ilike, and, desc } from 'drizzle-orm';
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

const index_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = query.search;
  const industry = query.industry;
  const stage = query.stage;
  query.hiring;
  const conditions = [eq(companies.status, "approved")];
  if (search) {
    const searchLower = `%${search}%`;
    conditions.push(or(
      ilike(companies.name, searchLower),
      ilike(companies.headline, searchLower),
      ilike(companies.description, searchLower),
      ilike(companies.industry, searchLower)
    ));
  }
  if (industry) {
    conditions.push(ilike(companies.industry, `%${industry}%`));
  }
  if (stage) {
    conditions.push(ilike(companies.stage, `%${stage}%`));
  }
  const result = await db.select().from(companies).where(and(...conditions)).orderBy(desc(companies.createdAt));
  return result;
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
