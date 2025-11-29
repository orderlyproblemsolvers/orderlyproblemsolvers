import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { a as _export_sfc, u as useHead$1, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';
import { useRoute, useRouter } from 'vue-router';
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
    const route = useRoute();
    useRouter();
    const searchQuery = ref(route.query.q || "");
    const activeTab = ref("all");
    const isLoading = ref(false);
    const { data: results, refresh, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/search", {
      query: computed(() => ({ q: searchQuery.value })),
      immediate: !!route.query.q,
      watch: false
      // Disable auto-watch to implement custom debounce
    }, "$kAireTSMcL")), __temp = await __temp, __restore(), __temp);
    const displayResults = computed(() => {
      if (!results.value) return [];
      if (activeTab.value === "all") return results.value;
      return results.value.filter((r) => r.type === activeTab.value);
    });
    const tabs = [
      { id: "all", label: "All Results" },
      { id: "company", label: "Companies" },
      { id: "person", label: "People" },
      { id: "story", label: "Stories" }
    ];
    const getLink = (item) => {
      if (item.type === "company") return `/companies/${item.slug}`;
      if (item.type === "person") return `/people/${item.slug}`;
      if (item.type === "story") return `/stories/${item.slug}`;
      return "#";
    };
    useHead$1({
      title: "Search the Index",
      meta: [
        { name: "description", content: "Find companies, people, and stories across the entire OPS ecosystem." },
        { name: "robots", content: "noindex" }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900" data-v-48067d25><div class="bg-gray-50 border-b border-gray-200 pt-32 pb-0 sticky top-0 z-20" data-v-48067d25><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" data-v-48067d25><div class="relative mb-8" data-v-48067d25><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search companies, people, or stories..." class="w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-400" autofocus data-v-48067d25>`);
      if (!isLoading.value && unref(status) !== "pending") {
        _push(`<svg class="w-6 h-6 text-gray-400 absolute left-5 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48067d25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-48067d25></path></svg>`);
      } else {
        _push(`<div class="w-6 h-6 border-2 border-gray-200 border-t-black rounded-full animate-spin absolute left-5 top-4.5" data-v-48067d25></div>`);
      }
      _push(`</div><div class="flex gap-8 overflow-x-auto no-scrollbar" data-v-48067d25><!--[-->`);
      ssrRenderList(tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([activeTab.value === tab.id ? "border-black text-black" : "border-transparent text-gray-500 hover:text-gray-800", "pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap px-1"])}" data-v-48067d25>${ssrInterpolate(tab.label)}</button>`);
      });
      _push(`<!--]--></div></div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-48067d25>`);
      if (displayResults.value.length > 0) {
        _push(`<div class="space-y-4" data-v-48067d25><!--[-->`);
        ssrRenderList(displayResults.value, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.id + item.type,
            to: getLink(item),
            class: "group flex items-center gap-4 p-5 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-white"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors" data-v-48067d25${_scopeId}>`);
                if (item.type === "person") {
                  _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48067d25${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-48067d25${_scopeId}></path></svg>`);
                } else {
                  _push2(`<!---->`);
                }
                if (item.type === "company") {
                  _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48067d25${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-48067d25${_scopeId}></path></svg>`);
                } else {
                  _push2(`<!---->`);
                }
                if (item.type === "story") {
                  _push2(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48067d25${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" data-v-48067d25${_scopeId}></path></svg>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex-1 min-w-0" data-v-48067d25${_scopeId}><div class="flex items-center gap-2 mb-1" data-v-48067d25${_scopeId}><span class="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded tracking-wide" data-v-48067d25${_scopeId}>${ssrInterpolate(item.type)}</span></div><h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate" data-v-48067d25${_scopeId}>${ssrInterpolate(item.name)}</h3>`);
                if (item.info) {
                  _push2(`<p class="text-sm text-gray-500 line-clamp-1" data-v-48067d25${_scopeId}>${ssrInterpolate(item.info)}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><svg class="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48067d25${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-48067d25${_scopeId}></path></svg>`);
              } else {
                return [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors" }, [
                    item.type === "person" ? (openBlock(), createBlock("svg", {
                      key: 0,
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      })
                    ])) : createCommentVNode("", true),
                    item.type === "company" ? (openBlock(), createBlock("svg", {
                      key: 1,
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      })
                    ])) : createCommentVNode("", true),
                    item.type === "story" ? (openBlock(), createBlock("svg", {
                      key: 2,
                      class: "w-5 h-5",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      })
                    ])) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "flex-1 min-w-0" }, [
                    createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                      createVNode("span", { class: "text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded tracking-wide" }, toDisplayString(item.type), 1)
                    ]),
                    createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate" }, toDisplayString(item.name), 1),
                    item.info ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "text-sm text-gray-500 line-clamp-1"
                    }, toDisplayString(item.info), 1)) : createCommentVNode("", true)
                  ]),
                  (openBlock(), createBlock("svg", {
                    class: "w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M9 5l7 7-7 7"
                    })
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (searchQuery.value && !isLoading.value && (!unref(results) || unref(results).length === 0)) {
        _push(`<div class="text-center py-24 border border-dashed border-gray-200 rounded-2xl" data-v-48067d25><div class="inline-flex p-4 bg-gray-50 rounded-full mb-4" data-v-48067d25><svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-48067d25><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-48067d25></path></svg></div><h3 class="text-lg font-bold text-gray-900 mb-2" data-v-48067d25>No results found</h3><p class="text-gray-500 text-sm" data-v-48067d25>We couldn&#39;t find anything for &quot;${ssrInterpolate(searchQuery.value)}&quot;. <br data-v-48067d25>Try a broader keyword or a different category.</p></div>`);
      } else if (!searchQuery.value) {
        _push(`<div class="text-center py-32 opacity-50" data-v-48067d25><p class="text-gray-400 font-bold text-sm uppercase tracking-widest" data-v-48067d25>Type to search the index</p></div>`);
      } else {
        _push(`<!---->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48067d25"]]);

export { index as default };
//# sourceMappingURL=index-CqUo8HEr.mjs.map
