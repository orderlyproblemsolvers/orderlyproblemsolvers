import { d as defineEventHandler, g as getRouterParam, c as createError } from '../../../_/nitro.mjs';
import { ilike, eq } from 'drizzle-orm';
import { d as db, t as technologies, c as companies, b as companyStack, p as people, e as personStack } from '../../../_/db.mjs';
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

const _slug__get = defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const nameQuery = slug?.replace(/-/g, " ");
  if (!nameQuery) throw createError({ statusCode: 400, statusMessage: "Missing slug" });
  const techResult = await db.select().from(technologies).where(ilike(technologies.name, nameQuery)).limit(1);
  if (!techResult.length) {
    throw createError({ statusCode: 404, statusMessage: "Solution not found" });
  }
  const tech = techResult[0];
  const companiesUsing = await db.select({
    name: companies.name,
    slug: companies.slug,
    logo: companies.logo,
    industry: companies.industry,
    location: companies.location
  }).from(companyStack).leftJoin(companies, eq(companyStack.companyId, companies.id)).where(eq(companyStack.techId, tech.id)).limit(6);
  const experts = await db.select({
    name: people.name,
    slug: people.slug,
    role: people.role,
    avatar: people.avatar
  }).from(personStack).leftJoin(people, eq(personStack.personId, people.id)).where(eq(personStack.techId, tech.id)).limit(6);
  const stats = {
    companies: companiesUsing.length,
    experts: experts.length
  };
  return { ...tech, companies: companiesUsing, experts, stats };
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
