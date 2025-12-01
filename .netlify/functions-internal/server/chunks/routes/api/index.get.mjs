import { d as defineEventHandler, b as getQuery } from '../../_/nitro.mjs';
import { eq, or, ilike, and, desc } from 'drizzle-orm';
import { c as companies, d as db } from '../../_/db.mjs';
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
