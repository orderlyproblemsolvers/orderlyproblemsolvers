import { d as defineEventHandler, g as auth, h as createError, a as db, c as companies, b as people } from '../../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
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

const pending_get = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const pendingCompanies = await db.select().from(companies).where(eq(companies.status, "pending"));
  const pendingPeople = await db.select().from(people).where(eq(people.status, "pending"));
  const normalizedCompanies = pendingCompanies.map((c) => ({
    id: c.id,
    type: "company",
    name: c.name,
    info: `${c.industry} \u2022 ${c.location}`,
    description: c.description,
    createdAt: c.createdAt
  }));
  const normalizedPeople = pendingPeople.map((p) => ({
    id: p.id,
    type: "person",
    name: p.name,
    info: `${p.role} \u2022 ${p.location}`,
    description: p.bio,
    createdAt: p.createdAt
  }));
  const merged = [...normalizedCompanies, ...normalizedPeople].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  return merged;
});

export { pending_get as default };
//# sourceMappingURL=pending.get.mjs.map
