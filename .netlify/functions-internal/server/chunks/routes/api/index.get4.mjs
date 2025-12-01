import { d as defineEventHandler } from '../../_/nitro.mjs';
import { sql } from 'drizzle-orm';
import { d as db, t as technologies, b as companyStack } from '../../_/db.mjs';
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

const index_get = defineEventHandler(async () => {
  const result = await db.select({
    id: technologies.id,
    name: technologies.name,
    category: technologies.category,
    count: sql`count(${companyStack.companyId})`
  }).from(technologies).leftJoin(companyStack, sql`${technologies.id} = ${companyStack.techId}`).groupBy(technologies.id, technologies.name, technologies.category).orderBy(technologies.category);
  const grouped = {};
  result.forEach((item) => {
    const cat = item.category || "Uncategorized";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push({
      ...item,
      slug: item.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")
    });
  });
  return grouped;
});

export { index_get as default };
//# sourceMappingURL=index.get4.mjs.map
