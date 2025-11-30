import { d as defineEventHandler, c as createError, r as readBody } from '../../_/nitro.mjs';
import { eq } from 'drizzle-orm';
import { d as db, c as companies, t as technologies, b as companyStack } from '../../_/db.mjs';
import { a as auth } from '../../_/auth.mjs';
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

const index_post = defineEventHandler(async (event) => {
  const session = await auth.api.getSession({ headers: event.headers });
  if (!session || session.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Unauthorized" });
  }
  const body = await readBody(event);
  if (!body.name || !body.slug) {
    throw createError({ statusCode: 400, statusMessage: "Name and Slug are required" });
  }
  try {
    const newCompany = await db.insert(companies).values({
      name: body.name,
      slug: body.slug,
      headline: body.headline,
      description: body.description,
      industry: body.industry,
      location: body.location,
      website: body.website,
      stage: body.stage,
      logo: body.logo,
      status: "approved",
      // Admin creations are auto-approved
      featured: body.featured || false
    }).returning();
    const companyId = newCompany[0].id;
    if (body.stack && Array.isArray(body.stack) && body.stack.length > 0) {
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
          companyId,
          techId: tech.id
        });
      }
    }
    return { success: true, company: newCompany[0] };
  } catch (e) {
    if (e.code === "23505") {
      throw createError({ statusCode: 409, statusMessage: "Slug already exists." });
    }
    console.error("Create Company Error:", e);
    throw createError({ statusCode: 500, statusMessage: e.message });
  }
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
