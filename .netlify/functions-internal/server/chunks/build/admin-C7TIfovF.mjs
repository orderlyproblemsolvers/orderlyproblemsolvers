import { a8 as executeAsync } from '../_/nitro.mjs';
import { a as authClient } from './auth-client-WXPv7HbZ.mjs';
import { n as defineNuxtRouteMiddleware, o as useRequestHeaders, p as navigateTo } from './server.mjs';
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
import 'better-auth/vue';
import 'vue-router';
import '@unhead/addons';
import '@unhead/schema-org/vue';

const admin = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const { data: session } = ([__temp, __restore] = executeAsync(() => authClient.getSession({
    fetchOptions: {
      headers: useRequestHeaders(["cookie"])
      // Pass cookies if running on server
    }
  })), __temp = await __temp, __restore(), __temp);
  if (!session) {
    return navigateTo(`/auth/sign-in?redirect=${encodeURIComponent(to.fullPath)}`);
  }
  const role = session.user?.role;
  if (role !== "admin") {
    return navigateTo("/");
  }
});

export { admin as default };
//# sourceMappingURL=admin-C7TIfovF.mjs.map
