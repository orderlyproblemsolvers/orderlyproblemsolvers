import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { eq, desc } from 'drizzle-orm';
import { d as db, c as companies, p as people } from '../../../_/db.mjs';
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
