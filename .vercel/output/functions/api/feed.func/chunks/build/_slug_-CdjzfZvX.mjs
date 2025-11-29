import { c as createError, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, withCtx, createVNode, createBlock, openBlock, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
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
    const { data: solution, error, status } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/solutions/${slug}`, "$qZkJJOxUnO")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Solution not found", fatal: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white font-sans text-gray-900" }, _attrs))}>`);
      if (unref(status) === "pending") {
        _push(`<div class="h-screen flex items-center justify-center"><div class="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div></div>`);
      } else if (unref(solution)) {
        _push(`<div><div class="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden"><div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-500 to-transparent"></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"><div class="flex flex-col md:flex-row md:items-start justify-between gap-8"><div><span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">${ssrInterpolate(unref(solution).category || "General Tech")}</span><h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-8">${ssrInterpolate(unref(solution).name)}</h1><div class="flex gap-8 text-sm font-mono text-gray-400 border-t border-white/10 pt-6 inline-flex"><div><strong class="text-white text-lg block">${ssrInterpolate(unref(solution).stats.companies)}</strong><span>Organizations</span></div><div class="w-px bg-white/20 h-full"></div><div><strong class="text-white text-lg block">${ssrInterpolate(unref(solution).stats.experts)}</strong><span>Experts</span></div></div></div><div class="hidden md:flex w-32 h-32 bg-white/5 border border-white/10 rounded-3xl items-center justify-center backdrop-blur-sm transform rotate-3 hover:rotate-0 transition-transform"><span class="text-5xl font-black text-white/20">${ssrInterpolate(unref(solution).name.charAt(0))}</span></div></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 lg:grid-cols-2 gap-16"><div><h3 class="text-xl font-black text-gray-900 mb-8 flex items-center gap-2 border-b border-gray-100 pb-4"><span class="w-2 h-2 bg-blue-600 rounded-full"></span> Implemented By </h3>`);
        if (unref(solution).companies && unref(solution).companies.length > 0) {
          _push(`<div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(solution).companies, (comp) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: comp.slug,
              to: `/companies/${comp.slug}`,
              class: "flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all bg-white group"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors overflow-hidden shrink-0"${_scopeId}>`);
                  if (comp.logo && comp.logo.startsWith("http")) {
                    _push2(`<img${ssrRenderAttr("src", comp.logo)} class="w-full h-full object-cover"${_scopeId}>`);
                  } else {
                    _push2(`<span class="text-sm uppercase"${_scopeId}>${ssrInterpolate(comp.name.charAt(0))}</span>`);
                  }
                  _push2(`</div><div${_scopeId}><h4 class="font-bold text-gray-900 group-hover:text-blue-700 transition-colors"${_scopeId}>${ssrInterpolate(comp.name)}</h4><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(comp.industry)} • ${ssrInterpolate(comp.location)}</p></div>`);
                } else {
                  return [
                    createVNode("div", { class: "w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors overflow-hidden shrink-0" }, [
                      comp.logo && comp.logo.startsWith("http") ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: comp.logo,
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src"])) : (openBlock(), createBlock("span", {
                        key: 1,
                        class: "text-sm uppercase"
                      }, toDisplayString(comp.name.charAt(0)), 1))
                    ]),
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-900 group-hover:text-blue-700 transition-colors" }, toDisplayString(comp.name), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(comp.industry) + " • " + toDisplayString(comp.location), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="p-8 bg-gray-50 rounded-xl text-center border border-dashed border-gray-200"><p class="text-sm font-bold text-gray-400">No organizations verified yet.</p></div>`);
        }
        _push(`</div><div><h3 class="text-xl font-black text-gray-900 mb-8 flex items-center gap-2 border-b border-gray-100 pb-4"><span class="w-2 h-2 bg-purple-600 rounded-full"></span> Domain Experts </h3>`);
        if (unref(solution).experts && unref(solution).experts.length > 0) {
          _push(`<div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(solution).experts, (person) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: person.slug,
              to: `/people/${person.slug}`,
              class: "flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all bg-white group"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<img${ssrRenderAttr("src", person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=random`)} class="w-12 h-12 rounded-full object-cover border border-gray-100 bg-gray-50 shrink-0"${_scopeId}><div${_scopeId}><h4 class="font-bold text-gray-900 group-hover:text-purple-700 transition-colors"${_scopeId}>${ssrInterpolate(person.name)}</h4><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(person.role)}</p></div>`);
                } else {
                  return [
                    createVNode("img", {
                      src: person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=random`,
                      class: "w-12 h-12 rounded-full object-cover border border-gray-100 bg-gray-50 shrink-0"
                    }, null, 8, ["src"]),
                    createVNode("div", null, [
                      createVNode("h4", { class: "font-bold text-gray-900 group-hover:text-purple-700 transition-colors" }, toDisplayString(person.name), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(person.role), 1)
                    ])
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<div class="p-8 bg-gray-50 rounded-xl text-center border border-dashed border-gray-200"><p class="text-sm font-bold text-gray-400">No experts listed yet.</p></div>`);
        }
        _push(`</div></div><div class="mt-24 p-10 bg-gray-100 rounded-3xl text-center border border-gray-200"><h3 class="text-2xl font-black mb-4">Do you work with ${ssrInterpolate(unref(solution).name)}?</h3><p class="text-gray-600 mb-8 max-w-md mx-auto">Add your profile to the index to be discovered by partners and clients looking for this expertise.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/submit-solution",
          class: "inline-block px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Join the Index `);
            } else {
              return [
                createTextVNode(" Join the Index ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/solutions/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-CdjzfZvX.mjs.map
