import { d as defineEventHandler, a as db, c as companies } from '../../_/nitro.mjs';
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

const index_get = defineEventHandler(async () => {
  const result = await db.select({
    name: companies.industry,
    count: sql`count(*)`
  }).from(companies).where(eq(companies.status, "approved")).groupBy(companies.industry).orderBy(companies.industry);
  return result.map((row) => {
    var _a, _b;
    return {
      id: (_a = row.name) == null ? void 0 : _a.toLowerCase().replace(/\s+/g, "-"),
      // Slugify
      label: row.name || "Uncategorized",
      count: Number(row.count) + " Solvers",
      desc: `Innovators in ${row.name}`,
      // Generic desc, or you can map specific ones
      link: `/industries/${(_b = row.name) == null ? void 0 : _b.toLowerCase().replace(/\s+/g, "-")}`
    };
  });
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
