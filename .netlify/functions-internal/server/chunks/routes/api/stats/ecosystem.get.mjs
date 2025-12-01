import { d as defineEventHandler } from '../../../_/nitro.mjs';
import { sql, eq } from 'drizzle-orm';
import { d as db, c as companies } from '../../../_/db.mjs';
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
