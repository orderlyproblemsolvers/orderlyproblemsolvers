import { d as defineEventHandler, c as createError, r as readBody } from '../../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { d as db, c as companies, p as people } from '../../../../_/db.mjs';
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

const decide_post = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const body = await readBody(event);
  if (!body.id || !body.type || !body.status) {
    throw createError({ statusCode: 400, statusMessage: "Invalid parameters" });
  }
  try {
    if (body.type === "company") {
      await db.update(companies).set({ status: body.status }).where(eq(companies.id, body.id));
    } else if (body.type === "person") {
      await db.update(people).set({ status: body.status }).where(eq(people.id, body.id));
    }
    return { success: true };
  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});

export { decide_post as default };
//# sourceMappingURL=decide.post.mjs.map
