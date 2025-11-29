import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, ref, mergeProps, withCtx, createBlock, createTextVNode, openBlock, createVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useFetch } from './fetch-DxdGcDtP.mjs';
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
import './asyncData-BJph7PBI.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: list, refresh, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/people", "$mhuZcqIP5K")), __temp = await __temp, __restore(), __temp);
    const deletingId = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto" }, _attrs))}><div class="flex items-center justify-between mb-8"><h1 class="text-3xl font-black text-gray-900 tracking-tight">People</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/people/new",
        class: "px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"${_scopeId}></path></svg> Add New `);
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
                  d: "M12 4v16m8-8H4"
                })
              ])),
              createTextVNode(" Add New ")
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
        _push(`<div class="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"><table class="w-full text-left border-collapse"><thead class="bg-gray-50 border-b border-gray-200"><tr><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Name</th><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Role / Company</th><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Location</th><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Status</th><th class="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Actions</th></tr></thead><tbody class="divide-y divide-gray-100"><!--[-->`);
        ssrRenderList(unref(list), (item) => {
          _push(`<tr class="group hover:bg-gray-50/50 transition-colors"><td class="px-6 py-4"><div class="flex items-center gap-3"><img${ssrRenderAttr("src", item.avatar || `https://ui-avatars.com/api/?name=${item.name}&background=random`)} class="w-8 h-8 rounded-full object-cover bg-gray-100 border border-gray-200"><p class="text-sm font-bold text-gray-900">${ssrInterpolate(item.name)}</p></div></td><td class="px-6 py-4"><div><p class="text-xs font-bold text-gray-900">${ssrInterpolate(item.role)}</p><p class="text-xs text-gray-500">${ssrInterpolate(item.companyName || "Freelance")}</p></div></td><td class="px-6 py-4 text-sm text-gray-500">${ssrInterpolate(item.location)}</td><td class="px-6 py-4"><span class="${ssrRenderClass([item.status === "approved" ? "bg-green-50 text-green-700 border-green-100" : "bg-orange-50 text-orange-700 border-orange-100", "text-[10px] font-bold uppercase px-2 py-1 rounded border"])}">${ssrInterpolate(item.status)}</span></td><td class="px-6 py-4 text-right flex justify-center">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/admin/people/${item.id}`,
            class: "text-gray-400 hover:text-blue-600 transition-colors p-2 inline-block",
            title: "Edit"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"${_scopeId}></path></svg>`);
              } else {
                return [
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
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button${ssrIncludeBooleanAttr(deletingId.value === item.id) ? " disabled" : ""} class="text-gray-400 hover:text-red-600 transition-colors p-2">`);
          if (deletingId.value === item.id) {
            _push(`<span class="text-xs text-red-600">...</span>`);
          } else {
            _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>`);
          }
          _push(`</button></td></tr>`);
        });
        _push(`<!--]--></tbody></table>`);
        if (!unref(list) || unref(list).length === 0) {
          _push(`<div class="p-12 text-center"><p class="text-gray-400 text-sm">No people found. Add your first one!</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/people/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BWj5ILy7.mjs.map
