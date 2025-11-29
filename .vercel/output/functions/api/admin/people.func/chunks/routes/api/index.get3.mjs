import { d as defineEventHandler, n as getQuery, b as people, a as db, c as companies } from '../../_/nitro.mjs';
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
  const role = query.role;
  const location = query.location;
  const conditions = [eq(people.status, "approved")];
  if (search) {
    const searchLower = `%${search}%`;
    conditions.push(or(
      ilike(people.name, searchLower),
      ilike(people.bio, searchLower),
      ilike(people.role, searchLower)
    ));
  }
  if (role) {
    conditions.push(ilike(people.role, `%${role}%`));
  }
  if (location) {
    conditions.push(ilike(people.location, `%${location}%`));
  }
  const result = await db.select({
    id: people.id,
    name: people.name,
    slug: people.slug,
    role: people.role,
    bio: people.bio,
    avatar: people.avatar,
    location: people.location,
    status: people.status,
    createdAt: people.createdAt,
    companyName: companies.name,
    companySlug: companies.slug
  }).from(people).leftJoin(companies, eq(people.companyId, companies.id)).where(and(...conditions)).orderBy(desc(people.createdAt));
  return result;
});

export { index_get as default };
//# sourceMappingURL=index.get3.mjs.map
