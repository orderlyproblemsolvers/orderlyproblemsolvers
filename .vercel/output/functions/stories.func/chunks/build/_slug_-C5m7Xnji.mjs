import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { c as createError, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
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
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const { data: industry, error, status } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/industries/${slug}`, "$13RMLSO1pY")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Industry not found", fatal: true });
    }
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900">`);
      if (unref(status) === "pending") {
        _push(`<div class="h-screen flex items-center justify-center"><div class="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div></div>`);
      } else if (unref(industry)) {
        _push(`<div><div class="bg-gray-50 border-b border-gray-200 pt-32 pb-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row md:items-end justify-between gap-8"><div><div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/industries",
          class: "hover:text-black transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Industries`);
            } else {
              return [
                createTextVNode("Industries")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<span>/</span><span class="text-blue-600">${ssrInterpolate(unref(industry).name)}</span></div><h1 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter mb-6">${ssrInterpolate(unref(industry).name)}</h1><p class="text-xl text-gray-500 max-w-2xl leading-relaxed">${ssrInterpolate(unref(industry).description)}</p></div><div class="flex gap-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm shrink-0"><div><span class="block text-3xl font-black text-gray-900 tracking-tight">${ssrInterpolate(unref(industry).stats.companies)}</span><span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Companies</span></div><div class="w-px bg-gray-100 h-auto"></div><div><span class="block text-3xl font-black text-gray-900 tracking-tight">${ssrInterpolate(unref(industry).stats.stories)}</span><span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Articles</span></div></div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 lg:grid-cols-12 gap-16"><div class="lg:col-span-8 space-y-12"><div><div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100"><h2 class="text-2xl font-black tracking-tight text-gray-900">Top Organizations</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/companies?industry=${unref(industry).name}`,
          class: "text-sm font-bold text-blue-600 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View All →`);
            } else {
              return [
                createTextVNode("View All →")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(industry).companies.length > 0) {
          _push(`<div class="grid grid-cols-1 gap-4"><!--[-->`);
          ssrRenderList(unref(industry).companies, (comp) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: comp.slug,
              to: `/companies/${comp.slug}`,
              class: "group flex items-center gap-6 p-6 border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all cursor-pointer bg-white"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xl font-black overflow-hidden shrink-0 group-hover:text-blue-600 transition-colors"${_scopeId}>`);
                  if (comp.logo && comp.logo.startsWith("http")) {
                    _push2(`<img${ssrRenderAttr("src", comp.logo)} class="w-full h-full object-cover"${_scopeId}>`);
                  } else {
                    _push2(`<span${_scopeId}>${ssrInterpolate(comp.name.charAt(0))}</span>`);
                  }
                  _push2(`</div><div class="min-w-0 flex-1"${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate"${_scopeId}>${ssrInterpolate(comp.name)}</h3><p class="text-sm text-gray-500 truncate"${_scopeId}>${ssrInterpolate(comp.headline || "No description available.")}</p></div><div class="hidden sm:block text-right"${_scopeId}><span class="block px-3 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-500 mb-1"${_scopeId}>${ssrInterpolate(comp.location)}</span><span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider"${_scopeId}>${ssrInterpolate(comp.stage)}</span></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-16 h-16 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 text-xl font-black overflow-hidden shrink-0 group-hover:text-blue-600 transition-colors" }, [
                      comp.logo && comp.logo.startsWith("http") ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: comp.logo,
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src"])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(comp.name.charAt(0)), 1))
                    ]),
                    createVNode("div", { class: "min-w-0 flex-1" }, [
                      createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate" }, toDisplayString(comp.name), 1),
                      createVNode("p", { class: "text-sm text-gray-500 truncate" }, toDisplayString(comp.headline || "No description available."), 1)
                    ]),
                    createVNode("div", { class: "hidden sm:block text-right" }, [
                      createVNode("span", { class: "block px-3 py-1 bg-gray-50 border border-gray-200 rounded text-xs font-bold text-gray-500 mb-1" }, toDisplayString(comp.location), 1),
                      createVNode("span", { class: "text-[10px] font-bold text-gray-400 uppercase tracking-wider" }, toDisplayString(comp.stage), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="p-12 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center"><p class="text-gray-400 font-bold text-sm">No companies listed in this sector yet.</p></div>`);
        }
        _push(`</div></div><div class="lg:col-span-4 space-y-12"><div class="p-8 bg-gray-50 rounded-2xl border border-gray-200"><h3 class="text-sm font-black uppercase tracking-widest text-gray-900 mb-6 flex items-center gap-2"><span class="w-2 h-2 bg-blue-600 rounded-full"></span> Latest in ${ssrInterpolate(unref(industry).name)}</h3>`);
        if (unref(industry).stories.length > 0) {
          _push(`<div class="space-y-6"><!--[-->`);
          ssrRenderList(unref(industry).stories, (story) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: story.slug,
              to: `/stories/${story.slug}`,
              class: "group block"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<h4 class="text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(story.title)}</h4><p class="text-xs text-gray-500"${_scopeId}>`);
                  if (story.authorName) {
                    _push2(`<span${_scopeId}>By ${ssrInterpolate(story.authorName)} • </span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`<span${_scopeId}>${ssrInterpolate(formatDate(story.date))}</span></p>`);
                } else {
                  return [
                    createVNode("h4", { class: "text-lg font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors" }, toDisplayString(story.title), 1),
                    createVNode("p", { class: "text-xs text-gray-500" }, [
                      story.authorName ? (openBlock(), createBlock("span", { key: 0 }, "By " + toDisplayString(story.authorName) + " • ", 1)) : createCommentVNode("", true),
                      createVNode("span", null, toDisplayString(formatDate(story.date)), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="text-sm text-gray-400 italic">No articles published yet.</div>`);
        }
        _push(`<div class="mt-8 pt-6 border-t border-gray-200">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/stories`,
          class: "text-xs font-bold text-black hover:text-blue-600 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Read all stories →`);
            } else {
              return [
                createTextVNode("Read all stories →")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><div class="bg-black text-white p-8 rounded-2xl text-center shadow-xl shadow-gray-200"><h3 class="text-xl font-black mb-2">Building in ${ssrInterpolate(unref(industry).name)}?</h3><p class="text-gray-400 text-sm mb-6">Get listed in the index and discovered by investors and partners.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/submit-solution",
          class: "block w-full py-3 bg-white text-black font-bold text-sm rounded-lg hover:bg-gray-200 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Submit Profile `);
            } else {
              return [
                createTextVNode(" Submit Profile ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/industries/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-C5m7Xnji.mjs.map
