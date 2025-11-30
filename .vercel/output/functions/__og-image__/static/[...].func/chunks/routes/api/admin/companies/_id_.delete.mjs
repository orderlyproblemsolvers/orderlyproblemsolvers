import { d as defineEventHandler, c as createError, g as getRouterParam } from '../../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { d as db, c as companies } from '../../../../_/db.mjs';
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

const _id__delete = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const id = getRouterParam(event, "id");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID required" });
  try {
    await db.delete(companies).where(eq(companies.id, parseInt(id)));
    return { success: true };
  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: "Foreign Key Error: Cannot delete company because People or Stories are linked to it." });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
