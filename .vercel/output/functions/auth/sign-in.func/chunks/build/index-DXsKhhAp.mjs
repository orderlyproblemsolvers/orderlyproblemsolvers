import { _ as __nuxt_component_0, a as __nuxt_component_2$1 } from './AppFooter-BXJkxf95.mjs';
import { defineComponent, ref, mergeProps, withAsyncContext, computed, withCtx, createTextVNode, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { a as _export_sfc, _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_0$2 } from './NuxtImg-lyvydNNu.mjs';
import { u as useFetch } from './fetch-DxdGcDtP.mjs';
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
import './asyncData-BJph7PBI.mjs';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    const searchQuery = ref("");
    const quickTags = ["FinTech", "Health", "Logistics", "Education"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-[700px] overflow-hidden flex items-center justify-center bg-white" }, _attrs))}><div class="absolute inset-0 z-0 pointer-events-none"></div><div class="relative z-10 w-full max-w-5xl px-6 text-center"><div class="mb-6 inline-block"><span class="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100"> The Problem Solving Ecosystem </span></div><h1 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-tight"> Find the <span class="relative inline-block text-blue-600"> solution <svg class="absolute w-full h-3 -bottom-1 left-0 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none"></path></svg></span> before you<br>build the software. </h1><p class="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"> OPS is the curated directory of the people, companies, and innovators solving the world&#39;s hardest challenges. </p><div class="relative max-w-2xl mx-auto mb-10 shadow-2xl shadow-blue-900/10 rounded-2xl"><div class="flex items-center bg-white rounded-2xl border border-gray-200 overflow-hidden p-2 transition-all focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-400"><div class="pl-4 pr-3 text-gray-400"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="Search innovators, industries, or stacks..." class="w-full h-12 text-gray-900 text-lg placeholder-gray-400 focus:outline-none bg-transparent"><button class="bg-gray-900 text-white h-12 px-8 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg"> Find It </button></div></div><div class="flex flex-wrap justify-center gap-3"><span class="text-sm font-medium text-gray-400 py-2">Popular:</span><!--[-->`);
      ssrRenderList(quickTags, (tag) => {
        _push(`<button class="px-5 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm font-bold border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-white transition-all">${ssrInterpolate(tag)}</button>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$6, { __name: "HeroSection" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FeatureDrop",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: stories, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/stories", "$cbR4-0TwKC")), __temp = await __temp, __restore(), __temp);
    const mainFeature = computed(() => {
      if (!stories.value || stories.value.length === 0) return null;
      const story = stories.value[0];
      return {
        ...story,
        link: `/stories/${story.slug}`
      };
    });
    const trendingStories = computed(() => {
      if (!stories.value || stories.value.length < 2) return [];
      return stories.value.slice(1, 4).map((story) => ({
        ...story,
        link: `/stories/${story.slug}`
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-full py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100" }, _attrs))}><div class="max-w-7xl mx-auto"><div class="flex items-center justify-between mb-8"><h2 class="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2"><span class="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></span> The Featured Drop </h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stories",
        class: "text-sm font-bold text-gray-500 hover:text-blue-600 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All Stories → `);
          } else {
            return [
              createTextVNode(" View All Stories → ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(status) === "pending") {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-12 h-96"><div class="lg:col-span-2 bg-gray-100 rounded-2xl animate-pulse"></div><div class="space-y-8"><div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div><div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div><div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div></div></div>`);
      } else if (!mainFeature.value) {
        _push(`<div class="py-20 text-center border border-dashed border-gray-200 rounded-2xl"><p class="text-gray-400 font-bold">No stories published yet.</p></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: mainFeature.value.link,
          class: "lg:col-span-2 group cursor-pointer block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative w-full h-[400px] rounded-2xl overflow-hidden mb-6 bg-gray-100"${_scopeId}>`);
              if (mainFeature.value.image) {
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: mainFeature.value.image,
                  alt: "Feature Image",
                  class: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="absolute top-4 left-4"${_scopeId}><span class="bg-white/90 backdrop-blur-md text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/50 shadow-sm"${_scopeId}>${ssrInterpolate(mainFeature.value.category)}</span></div></div><div class="max-w-2xl"${_scopeId}><h3 class="text-3xl md:text-4xl font-black text-gray-900 leading-[1] mb-3 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(mainFeature.value.title)}</h3><p class="text-lg text-gray-500 mb-4 line-clamp-2 leading-relaxed"${_scopeId}>${ssrInterpolate(mainFeature.value.excerpt)}</p><div class="flex items-center text-xs font-bold text-gray-400 gap-3 uppercase tracking-widest"${_scopeId}><span class="text-gray-900"${_scopeId}>${ssrInterpolate(mainFeature.value.authorName)}</span><span class="w-1 h-1 bg-gray-300 rounded-full"${_scopeId}></span><span${_scopeId}>${ssrInterpolate(mainFeature.value.readTime)}</span></div></div>`);
            } else {
              return [
                createVNode("div", { class: "relative w-full h-[400px] rounded-2xl overflow-hidden mb-6 bg-gray-100" }, [
                  mainFeature.value.image ? (openBlock(), createBlock(_component_NuxtImg, {
                    key: 0,
                    src: mainFeature.value.image,
                    alt: "Feature Image",
                    class: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  }, null, 8, ["src"])) : createCommentVNode("", true),
                  createVNode("div", { class: "absolute top-4 left-4" }, [
                    createVNode("span", { class: "bg-white/90 backdrop-blur-md text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/50 shadow-sm" }, toDisplayString(mainFeature.value.category), 1)
                  ])
                ]),
                createVNode("div", { class: "max-w-2xl" }, [
                  createVNode("h3", { class: "text-3xl md:text-4xl font-black text-gray-900 leading-[1] mb-3 group-hover:text-blue-600 transition-colors" }, toDisplayString(mainFeature.value.title), 1),
                  createVNode("p", { class: "text-lg text-gray-500 mb-4 line-clamp-2 leading-relaxed" }, toDisplayString(mainFeature.value.excerpt), 1),
                  createVNode("div", { class: "flex items-center text-xs font-bold text-gray-400 gap-3 uppercase tracking-widest" }, [
                    createVNode("span", { class: "text-gray-900" }, toDisplayString(mainFeature.value.authorName), 1),
                    createVNode("span", { class: "w-1 h-1 bg-gray-300 rounded-full" }),
                    createVNode("span", null, toDisplayString(mainFeature.value.readTime), 1)
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex flex-col h-full border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-12 pt-8 lg:pt-0"><h4 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-8"> Trending This Week </h4><div class="flex flex-col gap-10"><!--[-->`);
        ssrRenderList(trendingStories.value, (story, index) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: story.id,
            to: story.link,
            class: "group block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex flex-col gap-2"${_scopeId}><span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest"${_scopeId}>${ssrInterpolate(story.category)}</span><h3 class="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2"${_scopeId}>${ssrInterpolate(story.title)}</h3>`);
                if (index !== trendingStories.value.length - 1) {
                  _push2(`<div class="w-12 h-px bg-gray-200 mt-6 group-hover:w-full group-hover:bg-blue-100 transition-all duration-500"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col gap-2" }, [
                    createVNode("span", { class: "text-[10px] font-bold text-blue-600 uppercase tracking-widest" }, toDisplayString(story.category), 1),
                    createVNode("h3", { class: "text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2" }, toDisplayString(story.title), 1),
                    index !== trendingStories.value.length - 1 ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "w-12 h-px bg-gray-200 mt-6 group-hover:w-full group-hover:bg-blue-100 transition-all duration-500"
                    })) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div><div class="mt-auto pt-12"><div class="bg-gray-50 rounded-xl p-6 border border-gray-200"><p class="text-sm font-bold text-gray-900 mb-1">The OPS Brief.</p><p class="text-xs text-gray-500 mb-4">Weekly insights on the ecosystem.</p><div class="flex gap-2"><input type="email" placeholder="Email address" class="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 transition-colors"><button class="bg-black text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">Go</button></div></div></div></div></div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeatureDrop.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$5, { __name: "FeatureDrop" });
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "EcosystemGrid",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: stats } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/stats/ecosystem", "$LkXv2F5VoE")), __temp = await __temp, __restore(), __temp);
    const getCount = (industryName) => {
      const count = stats.value?.[industryName] || 0;
      return `${count} Solvers`;
    };
    const categories = computed(() => [
      {
        id: "fintech",
        label: "FinTech",
        count: getCount("FinTech"),
        desc: "Payments, Banking & Crypto",
        icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
        // Coin Icon
        color: "text-blue-600",
        bg: "bg-blue-50",
        link: "/companies?industry=FinTech"
      },
      {
        id: "health",
        label: "HealthTech",
        count: getCount("HealthTech"),
        desc: "Telemed, Records & AI Diag",
        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
        // Heart Icon
        color: "text-rose-600",
        bg: "bg-rose-50",
        link: "/companies?industry=HealthTech"
      },
      {
        id: "logistics",
        label: "Logistics",
        count: getCount("Logistics"),
        desc: "Supply Chain, Fleet & Delivery",
        icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
        // Truck Icon
        color: "text-amber-600",
        bg: "bg-amber-50",
        link: "/companies?industry=Logistics"
      },
      {
        id: "edu",
        label: "EdTech",
        count: getCount("EdTech"),
        desc: "LMS, Remote Learning & Skills",
        icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
        // Cap Icon
        color: "text-purple-600",
        bg: "bg-purple-50",
        link: "/companies?industry=EdTech"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-20 bg-gray-50 border-b border-gray-200" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"><div><h2 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2"> Explore the Ecosystem. </h2><p class="text-lg text-gray-500"> Curated solution providers across high-impact industries. </p></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/solutions",
        class: "group flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All Categories <span class="bg-gray-200 group-hover:bg-blue-100 p-1 rounded-full transition-colors"${_scopeId}><svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg></span>`);
          } else {
            return [
              createTextVNode(" View All Categories "),
              createVNode("span", { class: "bg-gray-200 group-hover:bg-blue-100 p-1 rounded-full transition-colors" }, [
                (openBlock(), createBlock("svg", {
                  class: "w-4 h-4 group-hover:translate-x-0.5 transition-transform",
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
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(categories.value, (cat) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: cat.id,
          to: cat.link,
          class: "group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="${ssrRenderClass([cat.bg, "absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"])}"${_scopeId}></div><div class="${ssrRenderClass([[cat.bg, cat.color], "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300"])}"${_scopeId}><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"${ssrRenderAttr("d", cat.icon)}${_scopeId}></path></svg></div><div class="relative z-10"${_scopeId}><div class="flex items-center justify-between mb-1"${_scopeId}><h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(cat.label)}</h3><svg class="w-5 h-5 text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg></div><p class="text-sm font-medium text-gray-400 mb-4 group-hover:text-gray-500"${_scopeId}>${ssrInterpolate(cat.desc)}</p><div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-bold text-gray-600 group-hover:border-blue-100 group-hover:text-blue-700 transition-colors"${_scopeId}><span class="relative flex h-2 w-2"${_scopeId}><span class="${ssrRenderClass([cat.bg.replace("bg-", "bg-"), "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"])}"${_scopeId}></span><span class="${ssrRenderClass([cat.color.replace("text-", "bg-"), "relative inline-flex rounded-full h-2 w-2"])}"${_scopeId}></span></span> ${ssrInterpolate(cat.count)}</div></div>`);
            } else {
              return [
                createVNode("div", {
                  class: ["absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl", cat.bg]
                }, null, 2),
                createVNode("div", {
                  class: ["w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300", [cat.bg, cat.color]]
                }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-6 h-6",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: cat.icon
                    }, null, 8, ["d"])
                  ]))
                ], 2),
                createVNode("div", { class: "relative z-10" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-1" }, [
                    createVNode("h3", { class: "text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors" }, toDisplayString(cat.label), 1),
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M17 8l4 4m0 0l-4 4m4-4H3"
                      })
                    ]))
                  ]),
                  createVNode("p", { class: "text-sm font-medium text-gray-400 mb-4 group-hover:text-gray-500" }, toDisplayString(cat.desc), 1),
                  createVNode("div", { class: "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-bold text-gray-600 group-hover:border-blue-100 group-hover:text-blue-700 transition-colors" }, [
                    createVNode("span", { class: "relative flex h-2 w-2" }, [
                      createVNode("span", {
                        class: ["animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", cat.bg.replace("bg-", "bg-")]
                      }, null, 2),
                      createVNode("span", {
                        class: ["relative inline-flex rounded-full h-2 w-2", cat.color.replace("text-", "bg-")]
                      }, null, 2)
                    ]),
                    createTextVNode(" " + toDisplayString(cat.count), 1)
                  ])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><div class="group relative bg-gray-900 rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors"><svg class="absolute inset-0 w-full h-full text-gray-800/20" fill="none" viewBox="0 0 400 400"><pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"></path></pattern><rect width="100%" height="100%" fill="url(#grid)"></rect></svg><div class="relative z-10"><h3 class="text-xl font-bold text-white mb-2">Not listed here?</h3><p class="text-sm text-gray-400">Search 15+ other categories including AgriTech, CleanTech &amp; Retail.</p></div><div class="relative z-10 mt-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/solutions",
        class: "w-full block text-center py-3 rounded-lg bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-white hover:text-black transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Search Directory `);
          } else {
            return [
              createTextVNode(" Search Directory ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="mt-16 pt-10 border-t border-gray-200"><p class="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6"> Solutions used by innovators at </p><div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png" class="h-6 w-auto" alt="Logo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" class="h-6 w-auto" alt="Logo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" class="h-5 w-auto" alt="Logo"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" class="h-8 w-auto" alt="Logo"></div></div></div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/EcosystemGrid.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$4, { __name: "EcosystemGrid" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SolversStream",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: peopleData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/people", "$vD4kItD1t2")), __temp = await __temp, __restore(), __temp);
    const { data: companyData } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/companies", "$fmKvoiTM0U")), __temp = await __temp, __restore(), __temp);
    const solvers = computed(() => {
      const p = (peopleData.value || []).slice(0, 10).map((person) => ({
        id: `p-${person.id}`,
        type: "person",
        name: person.name,
        role: person.role,
        company: person.companyName || "Freelance",
        image: person.image || person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=random`,
        superpower: person.bio ? person.bio.substring(0, 60) + "..." : "Building the future.",
        link: `/people/${person.slug}`
      }));
      const c = (companyData.value || []).slice(0, 10).map((comp) => ({
        id: `c-${comp.id}`,
        type: "company",
        name: comp.name,
        industry: comp.industry,
        logo: comp.logo,
        hook: comp.headline || "Solving complex problems.",
        link: `/companies/${comp.slug}`
      }));
      const combined = [];
      const max = Math.max(p.length, c.length);
      for (let i = 0; i < max; i++) {
        if (p[i]) combined.push(p[i]);
        if (c[i]) combined.push(c[i]);
      }
      return combined;
    });
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-20 bg-white border-b border-gray-100 overflow-hidden" }, _attrs))} data-v-dab0de82><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-dab0de82><div class="flex items-center justify-between mb-8" data-v-dab0de82><div data-v-dab0de82><h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2" data-v-dab0de82> Meet the Solvers. </h2><p class="text-lg text-gray-500" data-v-dab0de82> Fresh faces and new teams joining the ecosystem. </p></div><div class="hidden md:flex items-center gap-2" data-v-dab0de82><button class="p-2 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition" data-v-dab0de82><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-dab0de82><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" data-v-dab0de82></path></svg></button><button class="p-2 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition" data-v-dab0de82><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-dab0de82><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-dab0de82></path></svg></button></div></div>`);
      if (!solvers.value.length) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-4 gap-4" data-v-dab0de82><!--[-->`);
        ssrRenderList(4, (i) => {
          _push(`<div class="h-60 bg-gray-100 rounded-2xl animate-pulse" data-v-dab0de82></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid grid-rows-2 grid-flow-col auto-cols-[300px] gap-6 overflow-x-auto pb-8 -mx-4 px-4 no-scrollbar snap-x snap-mandatory" data-v-dab0de82><!--[-->`);
        ssrRenderList(solvers.value, (item) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: item.id,
            to: item.link,
            class: "h-60 snap-start group relative hover:-translate-y-1 transition-all duration-300"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                if (item.type === "person") {
                  _push2(`<div class="h-full bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between" data-v-dab0de82${_scopeId}><div data-v-dab0de82${_scopeId}><div class="flex items-center gap-3 mb-4" data-v-dab0de82${_scopeId}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-12 h-12 rounded-full object-cover border border-gray-100 bg-gray-50" data-v-dab0de82${_scopeId}><div class="min-w-0" data-v-dab0de82${_scopeId}><h3 class="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate" data-v-dab0de82${_scopeId}>${ssrInterpolate(item.name)}</h3><p class="text-xs font-medium text-gray-500 truncate" data-v-dab0de82${_scopeId}>${ssrInterpolate(item.role)}</p><p class="text-[10px] text-gray-400 truncate" data-v-dab0de82${_scopeId}>@ ${ssrInterpolate(item.company)}</p></div></div><div class="bg-blue-50/50 rounded-lg p-3" data-v-dab0de82${_scopeId}><p class="text-xs font-bold text-blue-700 uppercase mb-1" data-v-dab0de82${_scopeId}>About</p><p class="text-xs font-medium text-gray-700 leading-snug line-clamp-2" data-v-dab0de82${_scopeId}>&quot;${ssrInterpolate(item.superpower)}&quot;</p></div></div></div>`);
                } else {
                  _push2(`<div class="h-full bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between" data-v-dab0de82${_scopeId}><div data-v-dab0de82${_scopeId}><div class="flex items-center justify-between mb-4" data-v-dab0de82${_scopeId}><div class="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden" data-v-dab0de82${_scopeId}>`);
                  if (item.logo && item.logo.startsWith("http")) {
                    _push2(`<img${ssrRenderAttr("src", item.logo)} class="w-full h-full object-cover" data-v-dab0de82${_scopeId}>`);
                  } else {
                    _push2(`<span class="text-sm font-black uppercase" data-v-dab0de82${_scopeId}>${ssrInterpolate(item.name.charAt(0))}</span>`);
                  }
                  _push2(`</div><span class="px-2 py-1 rounded bg-white border border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wide group-hover:text-blue-600 group-hover:border-blue-100" data-v-dab0de82${_scopeId}>${ssrInterpolate(item.industry)}</span></div><h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate" data-v-dab0de82${_scopeId}>${ssrInterpolate(item.name)}</h3><p class="text-sm text-gray-500 leading-snug line-clamp-2" data-v-dab0de82${_scopeId}>${ssrInterpolate(item.hook)}</p></div></div>`);
                }
              } else {
                return [
                  item.type === "person" ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "h-full bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between"
                  }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center gap-3 mb-4" }, [
                        createVNode("img", {
                          src: item.image,
                          alt: item.name,
                          class: "w-12 h-12 rounded-full object-cover border border-gray-100 bg-gray-50"
                        }, null, 8, ["src", "alt"]),
                        createVNode("div", { class: "min-w-0" }, [
                          createVNode("h3", { class: "text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate" }, toDisplayString(item.name), 1),
                          createVNode("p", { class: "text-xs font-medium text-gray-500 truncate" }, toDisplayString(item.role), 1),
                          createVNode("p", { class: "text-[10px] text-gray-400 truncate" }, "@ " + toDisplayString(item.company), 1)
                        ])
                      ]),
                      createVNode("div", { class: "bg-blue-50/50 rounded-lg p-3" }, [
                        createVNode("p", { class: "text-xs font-bold text-blue-700 uppercase mb-1" }, "About"),
                        createVNode("p", { class: "text-xs font-medium text-gray-700 leading-snug line-clamp-2" }, '"' + toDisplayString(item.superpower) + '"', 1)
                      ])
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "h-full bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between"
                  }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                        createVNode("div", { class: "w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden" }, [
                          item.logo && item.logo.startsWith("http") ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: item.logo,
                            class: "w-full h-full object-cover"
                          }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "text-sm font-black uppercase"
                          }, toDisplayString(item.name.charAt(0)), 1))
                        ]),
                        createVNode("span", { class: "px-2 py-1 rounded bg-white border border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wide group-hover:text-blue-600 group-hover:border-blue-100" }, toDisplayString(item.industry), 1)
                      ]),
                      createVNode("h3", { class: "text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate" }, toDisplayString(item.name), 1),
                      createVNode("p", { class: "text-sm text-gray-500 leading-snug line-clamp-2" }, toDisplayString(item.hook), 1)
                    ])
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--><div class="w-4" data-v-dab0de82></div></div>`);
      }
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SolversStream.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-dab0de82"]]), { __name: "SolversStream" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "OPSSection",
  __ssrInlineRender: true,
  setup(__props) {
    const services = [
      {
        title: "Product Design",
        desc: "UI/UX that prioritizes clarity over clutter.",
        icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      },
      {
        title: "Full-Stack Engineering",
        desc: "Scalable Vue/Nuxt architectures.",
        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      },
      {
        title: "Brand Identity",
        desc: "Positioning innovators as authorities.",
        icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3"
      }
    ];
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative py-24 bg-gray-900 overflow-hidden" }, _attrs))}><div class="absolute inset-0 z-0 opacity-60 pointer-events-none"></div><div class="absolute inset-0 z-0 bg-linear-to-r from-gray-900 via-gray-900/90 to-transparent pointer-events-none"></div><div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"><div><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6"><span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span> OPS Studio </div><h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight"> We don&#39;t just chronicle the ecosystem. <br><span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400"> We build it. </span></h2><p class="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl"> OPS Studio is the premium design &amp; development arm behind the platform. We help ambitious brands define their digital future with orderly code and timeless design. </p><div class="flex flex-col sm:flex-row gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/services",
        class: "px-8 py-4 rounded-xl bg-white text-gray-900 font-bold hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hire OPS Studio `);
          } else {
            return [
              createTextVNode(" Hire OPS Studio ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/work",
        class: "px-8 py-4 rounded-xl border border-gray-700 text-white font-bold hover:bg-gray-800 transition-colors text-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Our Work `);
          } else {
            return [
              createTextVNode(" View Our Work ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="space-y-6"><!--[-->`);
      ssrRenderList(services, (service, index) => {
        _push(`<div class="group bg-gray-900/40 backdrop-blur-md border border-gray-700 p-6 rounded-2xl flex items-start gap-6 hover:bg-gray-800 hover:border-blue-500/50 transition-all duration-300"><div class="shrink-0 w-12 h-12 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-transform duration-300"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${ssrRenderAttr("d", service.icon)}></path></svg></div><div><h3 class="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">${ssrInterpolate(service.title)}</h3><p class="text-gray-400 text-sm leading-relaxed">${ssrInterpolate(service.desc)}</p></div><div class="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"><svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></div></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OPSSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$2, { __name: "OPSSection" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SubmissionCTA",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "py-24 bg-white border-b border-gray-200" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"><div class="lg:col-span-7"><h2 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8"> MAKE YOUR <br><span class="text-gray-300">MARK.</span></h2><p class="text-xl md:text-2xl font-medium text-gray-900 max-w-lg leading-tight"> The ecosystem is incomplete without you. Join the definitive directory of problem solvers. </p></div><div class="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-4"><div class="space-y-6 mb-12"><div class="flex items-start gap-4 group"><div class="mt-1 w-2 h-2 bg-blue-600 rounded-full"></div><div><h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Visibility</h4><p class="text-sm text-gray-500">Get seen by investors and partners scouting for solutions.</p></div></div><div class="flex items-start gap-4 group"><div class="mt-1 w-2 h-2 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></div><div><h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Authority</h4><p class="text-sm text-gray-500">Position your brand alongside the top 100 innovators in your region.</p></div></div></div><div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/submit-solution",
        class: "group block w-full bg-black text-white p-6 rounded-none text-left hover:bg-blue-600 transition-colors duration-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between mb-2"${_scopeId}><span class="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-200"${_scopeId}>Start Submission</span><svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"${_scopeId}></path></svg></div><span class="text-2xl font-bold"${_scopeId}>Submit your solution</span>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between mb-2" }, [
                createVNode("span", { class: "text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-200" }, "Start Submission"),
                (openBlock(), createBlock("svg", {
                  class: "w-6 h-6 group-hover:translate-x-2 transition-transform",
                  fill: "none",
                  stroke: "currentColor",
                  viewBox: "0 0 24 24"
                }, [
                  createVNode("path", {
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "stroke-width": "2",
                    d: "M17 8l4 4m0 0l-4 4m4-4H3"
                  })
                ]))
              ]),
              createVNode("span", { class: "text-2xl font-bold" }, "Submit your solution")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="mt-4 text-xs text-gray-400 font-medium"> Takes approx 3 minutes • Verified by OPS Team </p></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SubmissionCTA.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$1, { __name: "SubmissionCTA" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    defineOgImageComponent("OpsTemplate", {
      title: "Orderly Problem Solvers",
      description: "The definitive index of the problem-solving economy. Discover verified agencies, experts, and the technology driving emerging markets.",
      image: "/img/logo-sm.png",
      // Uses your brand logo as the central visual
      type: "Company",
      // We use the 'Company' layout because it frames the logo beautifully
      badge: "The Ecosystem"
      // Appears in the top right pill
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_HeroSection = __nuxt_component_1;
      const _component_FeatureDrop = __nuxt_component_2;
      const _component_EcosystemGrid = __nuxt_component_3;
      const _component_SolversStream = __nuxt_component_4;
      const _component_OPSSection = __nuxt_component_5;
      const _component_SubmissionCTA = __nuxt_component_6;
      const _component_AppFooter = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(ssrRenderComponent(_component_HeroSection, { class: "bg-gray-50" }, null, _parent));
      _push(ssrRenderComponent(_component_FeatureDrop, null, null, _parent));
      _push(ssrRenderComponent(_component_EcosystemGrid, null, null, _parent));
      _push(ssrRenderComponent(_component_SolversStream, null, null, _parent));
      _push(ssrRenderComponent(_component_OPSSection, null, null, _parent));
      _push(ssrRenderComponent(_component_SubmissionCTA, null, null, _parent));
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DXsKhhAp.mjs.map
