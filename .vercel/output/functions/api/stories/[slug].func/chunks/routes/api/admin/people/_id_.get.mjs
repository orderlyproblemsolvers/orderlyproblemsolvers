import { d as defineEventHandler, c as createError, g as getRouterParam } from '../../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { d as db, p as people, t as technologies, e as personStack } from '../../../../_/db.mjs';
import { a as auth } from '../../../../_/auth.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID required" });
  const person = await db.query.people.findFirst({
    where: eq(people.id, parseInt(id))
  });
  if (!person) throw createError({ statusCode: 404, statusMessage: "Person not found" });
  const stackRows = await db.select({
    name: technologies.name
  }).from(personStack).leftJoin(technologies, eq(personStack.techId, technologies.id)).where(eq(personStack.personId, person.id));
  const stack = stackRows.map((r) => r.name).filter(Boolean);
  return { ...person, stack };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
