import { d as defineEventHandler, g as auth, h as createError, r as readBody, a as db, c as companies, b as people } from '../../../../_/nitro.mjs';
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
