import { d as defineEventHandler, r as readBody, c as createError } from '../../_/nitro.mjs';
import { d as db, c as companies, p as people } from '../../_/db.mjs';
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

const submissions_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  if (!body.name || !body.type) {
    throw createError({ statusCode: 400, statusMessage: "Missing required fields" });
  }
  const baseSlug = body.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
  const uniqueSlug = `${baseSlug}-${Math.floor(Math.random() * 1e3)}`;
  try {
    if (body.type === "company") {
      await db.insert(companies).values({
        name: body.name,
        slug: uniqueSlug,
        headline: (_a = body.description) == null ? void 0 : _a.substring(0, 100),
        // First 100 chars as headline
        description: body.description,
        industry: body.industry,
        location: body.location,
        website: body.website,
        email: body.email,
        // We might want to store contact info differently later
        status: "pending",
        // 🚨 CRITICAL: Must be approved by admin
        featured: false
      });
    } else if (body.type === "person") {
      await db.insert(people).values({
        name: body.name,
        slug: uniqueSlug,
        role: body.role,
        bio: body.description,
        location: body.location,
        status: "pending"
        // 🚨 CRITICAL
      });
    }
    return { success: true, message: "Submission received" };
  } catch (e) {
    console.error("Submission Error:", e);
    throw createError({ statusCode: 500, statusMessage: "Database Error" });
  }
});

export { submissions_post as default };
//# sourceMappingURL=submissions.post.mjs.map
