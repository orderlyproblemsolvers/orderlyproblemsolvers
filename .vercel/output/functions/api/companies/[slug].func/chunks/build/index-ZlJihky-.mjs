import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { u as useHead$1, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { u as useFetch } from './fetch-93bQWxTs.mjs';
import { d as defineOgImageComponent } from './defineOgImageComponent-Ch6vH54m.mjs';
import 'vue-router';
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
    const { data: industries, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/industries", "$BiUW4jgIWD")), __temp = await __temp, __restore(), __temp);
    const getIcon = (name) => {
      const n = name.toLowerCase();
      if (n.includes("fin") || n.includes("pay") || n.includes("bank"))
        return "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
      if (n.includes("health") || n.includes("med") || n.includes("bio"))
        return "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z";
      if (n.includes("agri") || n.includes("food") || n.includes("green"))
        return "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064";
      if (n.includes("logist") || n.includes("transport") || n.includes("mobility"))
        return "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0";
      if (n.includes("ed") || n.includes("learn") || n.includes("school"))
        return "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z";
      if (n.includes("energy") || n.includes("power") || n.includes("solar"))
        return "M13 10V3L4 14h7v7l9-11h-7z";
      if (n.includes("prop") || n.includes("real") || n.includes("estate"))
        return "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6";
      return "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z";
    };
    useHead$1({
      title: "Industries - The Sector Map",
      meta: [
        { name: "description", content: "Explore the ecosystem by sector. From FinTech giants to AgriTech innovators, see who is solving what." },
        { property: "og:title", content: "The OPS Sector Map" },
        { property: "og:description", content: "Deep dives into FinTech, HealthTech, Logistics, and more." },
        { name: "twitter:card", content: "summary_large_image" }
      ]
    });
    defineOgImageComponent("OpsTemplate", {
      title: "The Sector Map",
      description: "Explore the ecosystem by industry vertical.",
      type: "General",
      badge: "Sectors"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-gray-50/50"><div class="bg-white border-b border-gray-200 pt-32 pb-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">The Sector Map</p><h1 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-6"> Industries. </h1><p class="text-lg text-gray-500 max-w-2xl"> Explore the ecosystem by sector. From FinTech giants to AgriTech innovators, see who is solving what. </p></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">`);
      if (unref(status) === "pending") {
        _push(`<div class="grid grid-cols-1 md:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(8, (i) => {
          _push(`<div class="h-48 bg-gray-200 rounded-2xl animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(industries) && unref(industries).length > 0) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
        ssrRenderList(unref(industries), (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.id,
            to: item.link,
            class: "group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 flex flex-col"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 bg-blue-50 text-blue-600"${_scopeId}><svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", getIcon(item.label))}${_scopeId}></path></svg></div><h3 class="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(item.label)}</h3><p class="text-sm text-gray-500 leading-relaxed mb-6"${_scopeId}>${ssrInterpolate(item.desc)}</p><div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between"${_scopeId}><span class="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100"${_scopeId}>${ssrInterpolate(item.count)}</span><span class="text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm font-bold"${_scopeId}>Explore →</span></div>`);
              } else {
                return [
                  createVNode("div", { class: "w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300 bg-blue-50 text-blue-600" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-7 h-7",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "1.5",
                        d: getIcon(item.label)
                      }, null, 8, ["d"])
                    ]))
                  ]),
                  createVNode("h3", { class: "text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors" }, toDisplayString(item.label), 1),
                  createVNode("p", { class: "text-sm text-gray-500 leading-relaxed mb-6" }, toDisplayString(item.desc), 1),
                  createVNode("div", { class: "mt-auto pt-4 border-t border-gray-50 flex items-center justify-between" }, [
                    createVNode("span", { class: "text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded border border-gray-100" }, toDisplayString(item.count), 1),
                    createVNode("span", { class: "text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm font-bold" }, "Explore →")
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><div class="bg-gray-900 rounded-2xl p-8 flex flex-col justify-between text-white"><div><h3 class="text-xl font-bold mb-2">Missing a Sector?</h3><p class="text-gray-400 text-sm">We are constantly mapping new verticals. Submit a request to add a new industry category.</p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/submit-solution",
          class: "mt-6 block text-center py-3 w-full bg-white/10 border border-white/10 rounded-lg text-sm font-bold hover:bg-white hover:text-black transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Add Company `);
            } else {
              return [
                createTextVNode(" Add Company ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="p-12 bg-white border border-gray-200 rounded-xl text-center"><p class="text-gray-400 mb-4">No industries found in the database yet.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/admin/companies/new",
          class: "text-blue-600 hover:underline font-bold text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Add the first company`);
            } else {
              return [
                createTextVNode("Add the first company")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/industries/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ZlJihky-.mjs.map
