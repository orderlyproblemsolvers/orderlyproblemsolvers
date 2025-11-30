import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { a as _export_sfc, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual, ssrLooseContain } from 'vue/server-renderer';
import { u as useFetch } from './fetch-93bQWxTs.mjs';
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
    const search = ref("");
    const selectedIndustry = ref("");
    const selectedStage = ref("");
    const isHiring = ref(false);
    const filterOptions = {
      industries: [
        "FinTech",
        "HealthTech",
        "AgriTech",
        "Logistics",
        "EdTech",
        "Clean Energy",
        "E-Commerce",
        "Real Estate",
        "Manufacturing",
        "Telecommunications",
        "Media & Entertainment",
        "Retail",
        "Transportation",
        "Hospitality",
        "Cybersecurity",
        "Artificial Intelligence",
        "Software Development",
        "Cloud Computing",
        "Gaming",
        "Fashion & Apparel",
        "Food & Beverage",
        "Automotive",
        "Aerospace & Defense",
        "Pharmaceuticals",
        "Insurance",
        "Banking",
        "Construction",
        "Mining",
        "Oil & Gas",
        "Utilities",
        "Tourism",
        "Sports & Recreation",
        "Beauty & Wellness"
      ],
      stages: [
        "Bootstrapped",
        "Pre-Seed",
        "Seed",
        "Series A",
        "Series B",
        "Series B+",
        "Series C",
        "Series D",
        "Series E",
        "Series F+",
        "Growth Stage",
        "Late Stage",
        "Pre-IPO",
        "IPO",
        "Private Equity",
        "Acquisition",
        "Grant Funding",
        "Angel Investment",
        "Venture Capital",
        "Crowdfunding",
        "Debt Financing"
      ]
    };
    const { data: companies, status, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/companies", {
      query: computed(() => ({
        search: search.value,
        industry: selectedIndustry.value,
        stage: selectedStage.value,
        hiring: isHiring.value ? "true" : void 0
      })),
      transform: (data) => {
        return data.map((comp) => ({
          ...comp,
          // UI Helpers / Fallbacks
          color: "bg-blue-600",
          // You can map industry to color here if desired
          logo: comp.logo || comp.name.charAt(0),
          // Map DB fields to UI fields (handle short descriptions)
          solution: comp.headline || (comp.description ? comp.description.substring(0, 100) + "..." : "No description provided."),
          stack: [],
          // Placeholder until tagging system is live
          // Mock hiring status for UI demo if DB column missing, or use featured as proxy
          hiring: comp.featured || false
        }));
      },
      watch: [selectedIndustry, selectedStage, isHiring]
    }, "$CtWFAYFPpU")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-gray-50/50" data-v-3c3d7ac2><div class="bg-white border-b border-gray-200 pt-32 pb-8" data-v-3c3d7ac2><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-3c3d7ac2><div class="flex flex-col md:flex-row md:items-end justify-between gap-6" data-v-3c3d7ac2><div data-v-3c3d7ac2><p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" data-v-3c3d7ac2>The Entity Index</p><h1 class="text-4xl font-black text-gray-900 tracking-tighter" data-v-3c3d7ac2>Companies.</h1></div><div class="w-full md:w-96 relative" data-v-3c3d7ac2><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Search companies, problems, or stacks..." class="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border rounded-lg transition-all text-sm font-medium outline-none" data-v-3c3d7ac2>`);
      if (unref(status) !== "pending") {
        _push(`<svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3c3d7ac2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-3c3d7ac2></path></svg>`);
      } else {
        _push(`<div class="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin absolute left-3 top-3" data-v-3c3d7ac2></div>`);
      }
      _push(`</div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-3c3d7ac2><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" data-v-3c3d7ac2><div class="hidden lg:block lg:col-span-3 sticky top-32 space-y-10" data-v-3c3d7ac2><div data-v-3c3d7ac2><div class="flex items-center justify-between mb-4" data-v-3c3d7ac2><h3 class="text-xs font-black uppercase tracking-widest text-gray-900" data-v-3c3d7ac2>By Industry</h3>`);
      if (selectedIndustry.value) {
        _push(`<button class="text-[10px] font-bold text-red-500 hover:underline" data-v-3c3d7ac2>Clear</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar" data-v-3c3d7ac2><!--[-->`);
      ssrRenderList(filterOptions.industries, (ind) => {
        _push(`<label class="flex items-center gap-3 cursor-pointer group" data-v-3c3d7ac2><input type="radio" name="industry"${ssrRenderAttr("value", ind)}${ssrIncludeBooleanAttr(ssrLooseEqual(selectedIndustry.value, ind)) ? " checked" : ""} class="w-4 h-4 border-gray-300 text-black focus:ring-black accent-black" data-v-3c3d7ac2><span class="${ssrRenderClass([{ "font-bold text-black": selectedIndustry.value === ind }, "text-sm text-gray-600 group-hover:text-black transition-colors"])}" data-v-3c3d7ac2>${ssrInterpolate(ind)}</span></label>`);
      });
      _push(`<!--]--></div></div><div data-v-3c3d7ac2><div class="flex items-center justify-between mb-4" data-v-3c3d7ac2><h3 class="text-xs font-black uppercase tracking-widest text-gray-900" data-v-3c3d7ac2>Funding Stage</h3>`);
      if (selectedStage.value) {
        _push(`<button class="text-[10px] font-bold text-red-500 hover:underline" data-v-3c3d7ac2>Clear</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-wrap gap-2" data-v-3c3d7ac2><!--[-->`);
      ssrRenderList(filterOptions.stages, (stage) => {
        _push(`<button class="${ssrRenderClass([selectedStage.value === stage ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200 hover:border-black", "px-3 py-1.5 rounded text-xs font-bold border transition-colors"])}" data-v-3c3d7ac2>${ssrInterpolate(stage)}</button>`);
      });
      _push(`<!--]--></div></div><div class="pt-6 border-t border-gray-200" data-v-3c3d7ac2><label class="flex items-center gap-3 cursor-pointer group" data-v-3c3d7ac2><div class="relative inline-flex items-center" data-v-3c3d7ac2><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(isHiring.value) ? ssrLooseContain(isHiring.value, null) : isHiring.value) ? " checked" : ""} class="sr-only peer" data-v-3c3d7ac2><div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" data-v-3c3d7ac2></div></div><span class="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors" data-v-3c3d7ac2>Hiring Only</span></label></div>`);
      if (search.value || selectedIndustry.value || selectedStage.value || isHiring.value) {
        _push(`<button class="w-full py-2 text-xs font-bold text-gray-500 border border-gray-200 rounded hover:bg-gray-50 transition-colors" data-v-3c3d7ac2> Reset All Filters </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lg:col-span-9" data-v-3c3d7ac2><div class="flex items-center justify-between mb-6" data-v-3c3d7ac2><span class="text-sm font-bold text-gray-500" data-v-3c3d7ac2> Showing ${ssrInterpolate(unref(companies)?.length || 0)} Verified Companies </span><div class="flex items-center gap-2" data-v-3c3d7ac2><span class="text-xs font-bold text-gray-400 uppercase" data-v-3c3d7ac2>Sort:</span><span class="text-xs font-bold text-black" data-v-3c3d7ac2>Newest Added</span></div></div>`);
      if (unref(status) === "pending" && !unref(companies)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-3c3d7ac2><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="h-64 bg-gray-100 rounded-xl animate-pulse border border-gray-200" data-v-3c3d7ac2></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="p-8 bg-red-50 text-red-600 rounded-xl text-center border border-red-100" data-v-3c3d7ac2><p class="font-bold" data-v-3c3d7ac2>Unable to load directory.</p><p class="text-sm mt-1" data-v-3c3d7ac2>${ssrInterpolate(unref(error).message)}</p><button class="mt-4 text-xs font-bold underline" data-v-3c3d7ac2>Try Again</button></div>`);
      } else if (!unref(companies) || unref(companies).length === 0) {
        _push(`<div class="p-16 bg-white border border-gray-200 rounded-xl text-center" data-v-3c3d7ac2><div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300" data-v-3c3d7ac2><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-3c3d7ac2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" data-v-3c3d7ac2></path></svg></div><h3 class="text-lg font-bold text-gray-900 mb-2" data-v-3c3d7ac2>No companies match your criteria</h3><p class="text-gray-500 mb-6 max-w-md mx-auto text-sm" data-v-3c3d7ac2>Try clearing filters or searching for a different stack.</p><button class="px-6 py-3 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-gray-700 transition-colors" data-v-3c3d7ac2>Clear Filters</button></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-3c3d7ac2><!--[-->`);
        ssrRenderList(unref(companies), (comp) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: comp.id,
            to: `/companies/${comp.slug}`,
            class: "group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col cursor-pointer"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-start justify-between mb-6" data-v-3c3d7ac2${_scopeId}><div class="flex items-center gap-4" data-v-3c3d7ac2${_scopeId}><div class="${ssrRenderClass(`w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0 overflow-hidden`)}" data-v-3c3d7ac2${_scopeId}>`);
                if (comp.logo && comp.logo.startsWith("http")) {
                  _push2(`<img${ssrRenderAttr("src", comp.logo)} class="w-full h-full object-cover" data-v-3c3d7ac2${_scopeId}>`);
                } else {
                  _push2(`<span class="text-xl font-black uppercase" data-v-3c3d7ac2${_scopeId}>${ssrInterpolate(comp.logo)}</span>`);
                }
                _push2(`</div><div data-v-3c3d7ac2${_scopeId}><h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1" data-v-3c3d7ac2${_scopeId}>${ssrInterpolate(comp.name)}</h3><p class="text-xs font-bold text-gray-400 uppercase tracking-wide" data-v-3c3d7ac2${_scopeId}>${ssrInterpolate(comp.industry)}</p></div></div><span class="px-2 py-1 bg-gray-50 text-[10px] font-bold uppercase text-gray-500 rounded border border-gray-100 whitespace-nowrap" data-v-3c3d7ac2${_scopeId}>${ssrInterpolate(comp.stage)}</span></div><div class="mb-6 flex-grow" data-v-3c3d7ac2${_scopeId}><h4 class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1" data-v-3c3d7ac2${_scopeId}>Solving For:</h4><p class="text-sm text-gray-600 font-medium leading-relaxed line-clamp-2" data-v-3c3d7ac2${_scopeId}>${ssrInterpolate(comp.solution)}</p></div><div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between" data-v-3c3d7ac2${_scopeId}><div class="flex gap-2" data-v-3c3d7ac2${_scopeId}><span class="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded" data-v-3c3d7ac2${_scopeId}> View Details </span></div>`);
                if (comp.hiring) {
                  _push2(`<div class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-50 text-blue-700" data-v-3c3d7ac2${_scopeId}><span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" data-v-3c3d7ac2${_scopeId}></span><span class="text-[10px] font-bold uppercase" data-v-3c3d7ac2${_scopeId}>Hiring</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-start justify-between mb-6" }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: `w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0 overflow-hidden` }, [
                        comp.logo && comp.logo.startsWith("http") ? (openBlock(), createBlock("img", {
                          key: 0,
                          src: comp.logo,
                          class: "w-full h-full object-cover"
                        }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                          key: 1,
                          class: "text-xl font-black uppercase"
                        }, toDisplayString(comp.logo), 1))
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1" }, toDisplayString(comp.name), 1),
                        createVNode("p", { class: "text-xs font-bold text-gray-400 uppercase tracking-wide" }, toDisplayString(comp.industry), 1)
                      ])
                    ]),
                    createVNode("span", { class: "px-2 py-1 bg-gray-50 text-[10px] font-bold uppercase text-gray-500 rounded border border-gray-100 whitespace-nowrap" }, toDisplayString(comp.stage), 1)
                  ]),
                  createVNode("div", { class: "mb-6 flex-grow" }, [
                    createVNode("h4", { class: "text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1" }, "Solving For:"),
                    createVNode("p", { class: "text-sm text-gray-600 font-medium leading-relaxed line-clamp-2" }, toDisplayString(comp.solution), 1)
                  ]),
                  createVNode("div", { class: "mt-auto pt-4 border-t border-gray-50 flex items-center justify-between" }, [
                    createVNode("div", { class: "flex gap-2" }, [
                      createVNode("span", { class: "text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded" }, " View Details ")
                    ]),
                    comp.hiring ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-50 text-blue-700"
                    }, [
                      createVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" }),
                      createVNode("span", { class: "text-[10px] font-bold uppercase" }, "Hiring")
                    ])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      }
      if (unref(companies) && unref(companies).length > 20) {
        _push(`<div class="mt-12 flex justify-center" data-v-3c3d7ac2><button class="px-6 py-3 bg-white border border-gray-200 text-sm font-bold rounded-lg hover:border-black transition-colors" data-v-3c3d7ac2>Load More</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/companies/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3c3d7ac2"]]);

export { index as default };
//# sourceMappingURL=index-B7B4wGkp.mjs.map
