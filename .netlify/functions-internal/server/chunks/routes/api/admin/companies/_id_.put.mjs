import { d as defineEventHandler, c as createError, a as getRouterParam, r as readBody } from '../../../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { d as db, c as companies, b as companyStack, t as technologies } from '../../../../_/db.mjs';
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

const _id__put = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const id = parseInt(getRouterParam(event, "id") || "");
  if (!id) throw createError({ statusCode: 400, statusMessage: "ID required" });
  const body = await readBody(event);
  try {
    await db.update(companies).set({
      name: body.name,
      slug: body.slug,
      headline: body.headline,
      description: body.description,
      industry: body.industry,
      location: body.location,
      website: body.website,
      stage: body.stage,
      logo: body.logo,
      status: body.status,
      // Allow changing status back to pending/rejected
      featured: body.featured,
      updatedAt: /* @__PURE__ */ new Date()
    }).where(eq(companies.id, id));
    if (Array.isArray(body.stack)) {
      await db.delete(companyStack).where(eq(companyStack.companyId, id));
      for (const techName of body.stack) {
        const cleanName = techName.trim();
        if (!cleanName) continue;
        let tech = await db.query.technologies.findFirst({
          where: eq(technologies.name, cleanName)
        });
        if (!tech) {
          const inserted = await db.insert(technologies).values({
            name: cleanName,
            category: body.industry || "General"
          }).returning();
          tech = inserted[0];
        }
        await db.insert(companyStack).values({
          companyId: id,
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
