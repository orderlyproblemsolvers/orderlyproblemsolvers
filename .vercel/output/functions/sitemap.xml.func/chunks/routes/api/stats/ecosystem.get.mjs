import { d as defineEventHandler, a as db, c as companies } from '../../../_/nitro.mjs';
import { sql, eq } from 'drizzle-orm';
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

const ecosystem_get = defineEventHandler(async () => {
  const result = await db.select({
    industry: companies.industry,
    count: sql`count(*)`
  }).from(companies).where(eq(companies.status, "approved")).groupBy(companies.industry);
  const stats = {};
  result.forEach((row) => {
    if (row.industry) {
      stats[row.industry] = Number(row.count);
    }
  });
  return stats;
});

export { ecosystem_get as default };
//# sourceMappingURL=ecosystem.get.mjs.map
