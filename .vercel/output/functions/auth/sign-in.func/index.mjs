import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { p as parseQuery, t as toNodeListener, u as useNitroApp } from './chunks/_/nitro.mjs';
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

const nitroApp = useNitroApp();
const handler = toNodeListener(nitroApp.h3App);
const listener = function(req, res) {
  const query = req.headers["x-now-route-matches"];
  if (query) {
    const { url } = parseQuery(query);
    if (url) {
      req.url = url;
    }
  }
  return handler(req, res);
};

export { listener as default };
//# sourceMappingURL=index.mjs.map
