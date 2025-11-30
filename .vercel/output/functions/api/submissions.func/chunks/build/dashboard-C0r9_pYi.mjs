import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createVNode, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useAuthSession } from './auth-client-WXPv7HbZ.mjs';
import { u as useFetch } from './fetch-93bQWxTs.mjs';
import '../_/nitro.mjs';
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
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import '@iconify/utils';
import 'node:crypto';
import 'xss';
import 'vue-router';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import 'tailwind-variants';
import 'better-auth/vue';
import '@vue/shared';
import './asyncData-BNkxUXpX.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const sessionState = useAuthSession();
    const { data: stats, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/stats", "$VdleRPxypR")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-12 flex items-end justify-between"><div><h1 class="text-3xl font-black tracking-tight text-gray-900 mb-2"> Dashboard </h1><p class="text-gray-500"> Welcome back, ${ssrInterpolate(unref(sessionState).data?.user?.name)}. System is operational. </p></div><button class="text-sm font-bold text-blue-600 hover:underline">Refresh Data</button></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"><div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Solvers</p><p class="text-3xl font-black text-gray-900">${ssrInterpolate(unref(stats)?.people || 0)}</p></div><div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Companies</p><p class="text-3xl font-black text-gray-900">${ssrInterpolate(unref(stats)?.companies || 0)}</p></div><div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Published Stories</p><p class="text-3xl font-black text-gray-900">${ssrInterpolate(unref(stats)?.articles || 0)}</p></div><div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm"><p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pending Review</p><div class="flex items-center gap-2"><p class="text-3xl font-black text-gray-900">${ssrInterpolate(unref(stats)?.pending || 0)}</p>`);
      if (unref(stats)?.pending > 0) {
        _push(`<span class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>`);
      } else {
        _push(`<span class="w-2 h-2 rounded-full bg-green-500"></span>`);
      }
      _push(`</div></div></div><h2 class="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Quick Actions</h2><div class="grid grid-cols-1 md:grid-cols-3 gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/companies/new",
        class: "group p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg></div><h3 class="font-bold text-gray-900 mb-1"${_scopeId}>Add Company</h3><p class="text-xs text-gray-500"${_scopeId}>Create a new entity profile manually.</p>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                  })
                ]))
              ]),
              createVNode("h3", { class: "font-bold text-gray-900 mb-1" }, "Add Company"),
              createVNode("p", { class: "text-xs text-gray-500" }, "Create a new entity profile manually.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/people/new",
        class: "group p-6 bg-white border border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"${_scopeId}></path></svg></div><h3 class="font-bold text-gray-900 mb-1"${_scopeId}>Add Person</h3><p class="text-xs text-gray-500"${_scopeId}>Add an innovator to the directory.</p>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  })
                ]))
              ]),
              createVNode("h3", { class: "font-bold text-gray-900 mb-1" }, "Add Person"),
              createVNode("p", { class: "text-xs text-gray-500" }, "Add an innovator to the directory.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/stories/new",
        class: "group p-6 bg-white border border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform"${_scopeId}><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg></div><h3 class="font-bold text-gray-900 mb-1"${_scopeId}>Write Story</h3><p class="text-xs text-gray-500"${_scopeId}>Draft a new article or case study.</p>`);
          } else {
            return [
              createVNode("div", { class: "w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-5 h-5",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  })
                ]))
              ]),
              createVNode("h3", { class: "font-bold text-gray-900 mb-1" }, "Write Story"),
              createVNode("p", { class: "text-xs text-gray-500" }, "Draft a new article or case study.")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-C0r9_pYi.mjs.map
