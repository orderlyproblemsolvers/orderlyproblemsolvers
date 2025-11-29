import { d as defineEventHandler, g as auth, h as createError, i as getRouterParam, r as readBody, a as db, b as people, k as personStack, f as technologies } from '../../../../_/nitro.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const id = parseInt(getRouterParam(event, "id") || "");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID required" });
  const body = await readBody(event);
  try {
    await db.update(people).set({
      name: body.name,
      slug: body.slug,
      role: body.role,
      bio: body.bio,
      avatar: body.avatar,
      location: body.location,
      // Contact Info
      email: body.email,
      website: body.website,
      companyId: body.companyId || null,
      // Handle Unlinking
      status: body.status,
      featured: body.featured
    }).where(eq(people.id, id));
    if (Array.isArray(body.stack)) {
      await db.delete(personStack).where(eq(personStack.personId, id));
      for (const techName of body.stack) {
        const cleanName = techName.trim();
        if (!cleanName) continue;
        let tech = await db.query.technologies.findFirst({
          where: eq(technologies.name, cleanName)
        });
        if (!tech) {
          const inserted = await db.insert(technologies).values({
            name: cleanName,
            category: "General"
          }).returning();
          tech = inserted[0];
        }
        await db.insert(personStack).values({
          personId: id,
          techId: tech.id
        });
      }
    }
    return { success: true };
  } catch (e) {
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
