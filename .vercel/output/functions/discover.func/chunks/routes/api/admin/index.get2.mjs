import { d as defineEventHandler, g as auth, h as createError, a as db, c as companies, b as people } from '../../../_/nitro.mjs';
import { eq, desc } from 'drizzle-orm';
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
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const result = await db.select({
    id: people.id,
    name: people.name,
    role: people.role,
    location: people.location,
    avatar: people.avatar,
    status: people.status,
    createdAt: people.createdAt,
    // Join Data
    companyName: companies.name
  }).from(people).leftJoin(companies, eq(people.companyId, companies.id)).orderBy(desc(people.createdAt));
  return result;
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
