import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, withCtx, createBlock, createTextVNode, openBlock, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import '@vue/shared';
import './asyncData-BNkxUXpX.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: list, refresh, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/stories", "$G7dcejnHZK")), __temp = await __temp, __restore(), __temp);
    const deletingId = ref(null);
    const formatDate = (date) => {
      if (!date) return "Draft";
      return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto" }, _attrs))}><div class="flex items-center justify-between mb-8"><h1 class="text-3xl font-black text-gray-900 tracking-tight">Stories</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/stories/new",
        class: "px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg> Write Story `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-4 h-4",
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
              ])),
              createTextVNode(" Write Story ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(status) === "pending") {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<div class="h-16 bg-gray-100 rounded-lg animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"><table class="w-full text-left border-collapse"><thead class="bg-gray-50 border-b border-gray-200"><tr><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Title</th><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Author</th><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Category</th><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Published</th><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Actions</th></tr></thead><tbody class="divide-y divide-gray-100"><!--[-->`);
        ssrRenderList(unref(list), (item) => {
          _push(`<tr class="group hover:bg-gray-50/50 transition-colors"><td class="px-6 py-4"><p class="text-sm font-bold text-gray-900 line-clamp-1">${ssrInterpolate(item.title)}</p></td><td class="px-6 py-4"><span class="text-sm text-gray-600">${ssrInterpolate(item.authorName || "Unknown")}</span></td><td class="px-6 py-4"><span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded border border-gray-200">${ssrInterpolate(item.category)}</span></td><td class="px-6 py-4"><span class="${ssrRenderClass([item.isPublished ? "bg-green-50 text-green-700 border-green-100" : "bg-gray-100 text-gray-500 border-gray-200", "text-[10px] font-bold uppercase px-2 py-1 rounded border"])}">${ssrInterpolate(item.isPublished ? formatDate(item.publishedAt) : "DRAFT")}</span></td><td class="px-6 py-4 text-right"><button${ssrIncludeBooleanAttr(deletingId.value === item.id) ? " disabled" : ""} class="text-gray-400 hover:text-red-600 transition-colors p-2">`);
          if (deletingId.value === item.id) {
            _push(`<span class="text-xs text-red-600">Deleting...</span>`);
          } else {
            _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`);
          }
          _push(`</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (!unref(list) || unref(list).length === 0) {
          _push(`<div class="p-12 text-center"><p class="text-gray-400 text-sm">No stories found. Start writing!</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/stories/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-C52rFzWy.mjs.map
