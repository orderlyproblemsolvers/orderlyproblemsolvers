import { d as defineEventHandler, a as toWebRequest } from '../../../_/nitro.mjs';
import { a as auth } from '../../../_/auth.mjs';
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
import 'better-auth';
import 'better-auth/adapters/drizzle';
import '../../../_/db.mjs';
import '@neondatabase/serverless';
import 'drizzle-orm/neon-http';
import 'drizzle-orm/pg-core';

const ____all_ = defineEventHandler(async (event) => {
  const webRequest = toWebRequest(event);
  return auth.handler(webRequest);
});

export { ____all_ as default };
//# sourceMappingURL=_...all_.mjs.map
