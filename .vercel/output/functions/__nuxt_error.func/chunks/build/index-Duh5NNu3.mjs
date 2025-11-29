import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { a as _export_sfc, u as useHead$1, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, unref, withCtx, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const search = ref("");
    const selectedRole = ref("");
    const selectedLocation = ref("");
    const filterOptions = {
      roles: [
        "CTO",
        "Founder",
        "Software Engineer",
        "Product Designer",
        "Product Manager",
        "Data Scientist",
        "DevOps",
        "Mobile Developer"
      ],
      locations: [
        "Lagos",
        "Nairobi",
        "Cape Town",
        "Accra",
        "Cairo",
        "Kigali",
        "London",
        "Remote"
      ]
    };
    const { data: people, status, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/people", {
      query: computed(() => ({
        search: search.value,
        role: selectedRole.value,
        location: selectedLocation.value
      })),
      transform: (data) => {
        return data.map((p) => ({
          id: p.id,
          slug: p.slug,
          name: p.name,
          role: p.role,
          company: p.companyName || "Freelance",
          location: p.location || "Remote",
          image: p.avatar || `https://ui-avatars.com/api/?name=${p.name}&background=random&size=128`,
          bio: p.bio,
          status: p.companyName ? "Active" : "Open to Work"
        }));
      },
      watch: [selectedRole, selectedLocation]
      // Explicitly watch specific refs if needed, though 'query' computed usually handles it
    }, "$AZ2AIkLm38")), __temp = await __temp, __restore(), __temp);
    useHead$1({
      title: "The Talent Index - Verified Solvers",
      meta: [
        { name: "description", content: "Browse 2,000+ verified founders, CTOs, and engineers. Filter by role, stack, and location." },
        { property: "og:title", content: "Find Top Tech Talent" },
        { property: "og:description", content: "The curated list of the people building the future in emerging markets." },
        { name: "twitter:card", content: "summary_large_image" }
      ]
    });
    defineOgImageComponent("OpsTemplate", {
      title: "The Talent Index",
      description: "Browse verified founders, CTOs, and engineers.",
      type: "General",
      badge: "People"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-gray-50/50" data-v-18fb3f1f><div class="bg-white border-b border-gray-200 pt-32 pb-8" data-v-18fb3f1f><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-v-18fb3f1f><div class="flex flex-col md:flex-row md:items-end justify-between gap-6" data-v-18fb3f1f><div data-v-18fb3f1f><p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2" data-v-18fb3f1f>The Talent Index</p><h1 class="text-4xl font-black text-gray-900 tracking-tighter" data-v-18fb3f1f>People.</h1></div><div class="w-full md:w-96 relative" data-v-18fb3f1f><input${ssrRenderAttr("value", search.value)} type="text" placeholder="Search by name, role, or bio..." class="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border rounded-lg transition-all text-sm font-medium outline-none" data-v-18fb3f1f>`);
      if (unref(status) !== "pending") {
        _push(`<svg class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18fb3f1f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-18fb3f1f></path></svg>`);
      } else {
        _push(`<div class="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin absolute left-3 top-3" data-v-18fb3f1f></div>`);
      }
      _push(`</div></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" data-v-18fb3f1f><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" data-v-18fb3f1f><div class="hidden lg:block lg:col-span-3 sticky top-32 space-y-10" data-v-18fb3f1f><div data-v-18fb3f1f><div class="flex items-center justify-between mb-4" data-v-18fb3f1f><h3 class="text-xs font-black uppercase tracking-widest text-gray-900" data-v-18fb3f1f>Role</h3>`);
      if (selectedRole.value) {
        _push(`<button class="text-[10px] font-bold text-red-500 hover:underline" data-v-18fb3f1f>Clear</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar" data-v-18fb3f1f><!--[-->`);
      ssrRenderList(filterOptions.roles, (role) => {
        _push(`<label class="flex items-center gap-3 cursor-pointer group" data-v-18fb3f1f><input type="radio" name="role"${ssrRenderAttr("value", role)}${ssrIncludeBooleanAttr(ssrLooseEqual(selectedRole.value, role)) ? " checked" : ""} class="w-4 h-4 border-gray-300 text-black focus:ring-black accent-black" data-v-18fb3f1f><span class="${ssrRenderClass([{ "font-bold text-black": selectedRole.value === role }, "text-sm text-gray-600 group-hover:text-black transition-colors"])}" data-v-18fb3f1f>${ssrInterpolate(role)}</span></label>`);
      });
      _push(`<!--]--></div></div><div data-v-18fb3f1f><div class="flex items-center justify-between mb-4" data-v-18fb3f1f><h3 class="text-xs font-black uppercase tracking-widest text-gray-900" data-v-18fb3f1f>Location</h3>`);
      if (selectedLocation.value) {
        _push(`<button class="text-[10px] font-bold text-red-500 hover:underline" data-v-18fb3f1f>Clear</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex flex-wrap gap-2" data-v-18fb3f1f><!--[-->`);
      ssrRenderList(filterOptions.locations, (loc) => {
        _push(`<button class="${ssrRenderClass([selectedLocation.value === loc ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-200 hover:border-black", "px-3 py-1.5 rounded text-xs font-bold border transition-colors"])}" data-v-18fb3f1f>${ssrInterpolate(loc)}</button>`);
      });
      _push(`<!--]--></div></div>`);
      if (search.value || selectedRole.value || selectedLocation.value) {
        _push(`<button class="w-full py-2 text-xs font-bold text-gray-500 border border-gray-200 rounded hover:bg-gray-50 transition-colors" data-v-18fb3f1f> Reset All Filters </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="lg:col-span-9" data-v-18fb3f1f><div class="flex items-center justify-between mb-6" data-v-18fb3f1f><span class="text-sm font-bold text-gray-500" data-v-18fb3f1f>Showing ${ssrInterpolate(unref(people)?.length || 0)} Solvers</span><div class="flex items-center gap-2" data-v-18fb3f1f><span class="text-xs font-bold text-gray-400 uppercase" data-v-18fb3f1f>Sort:</span><span class="text-xs font-bold text-black" data-v-18fb3f1f>Newest First</span></div></div>`);
      if (unref(status) === "pending" && !unref(people)) {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-18fb3f1f><!--[-->`);
        ssrRenderList(6, (i) => {
          _push(`<div class="h-56 bg-gray-100 rounded-xl animate-pulse border border-gray-200" data-v-18fb3f1f></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="p-8 bg-red-50 text-red-600 rounded-xl text-center border border-red-100" data-v-18fb3f1f><p class="font-bold" data-v-18fb3f1f>Unable to load directory.</p><p class="text-sm mt-1" data-v-18fb3f1f>${ssrInterpolate(unref(error).message)}</p><button class="mt-4 text-xs font-bold underline" data-v-18fb3f1f>Try Again</button></div>`);
      } else if (!unref(people) || unref(people).length === 0) {
        _push(`<div class="p-16 bg-white border border-gray-200 rounded-xl text-center" data-v-18fb3f1f><div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300" data-v-18fb3f1f><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18fb3f1f><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" data-v-18fb3f1f></path></svg></div><h3 class="text-lg font-bold text-gray-900 mb-2" data-v-18fb3f1f>No results match your criteria</h3><p class="text-gray-500 mb-6 max-w-md mx-auto text-sm" data-v-18fb3f1f>We couldn&#39;t find anyone matching the filters. Try clearing them or searching for something else.</p><button class="px-6 py-3 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-gray-700 transition-colors" data-v-18fb3f1f>Clear Filters</button></div>`);
      } else {
        _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-18fb3f1f><!--[-->`);
        ssrRenderList(unref(people), (person) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: person.id,
            to: `/people/${person.slug}`,
            class: "group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col cursor-pointer"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-start justify-between mb-4" data-v-18fb3f1f${_scopeId}><div class="flex items-center gap-4" data-v-18fb3f1f${_scopeId}><div class="relative" data-v-18fb3f1f${_scopeId}><img${ssrRenderAttr("src", person.image)} class="w-14 h-14 rounded-full object-cover border border-gray-100 bg-gray-50" data-v-18fb3f1f${_scopeId}>`);
                if (person.status === "Open to Work") {
                  _push2(`<div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" title="Available" data-v-18fb3f1f${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div data-v-18fb3f1f${_scopeId}><h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1" data-v-18fb3f1f${_scopeId}>${ssrInterpolate(person.name)}</h3><p class="text-xs text-gray-500 font-medium line-clamp-1" data-v-18fb3f1f${_scopeId}>${ssrInterpolate(person.role)} `);
                if (person.company !== "Freelance") {
                  _push2(`<span data-v-18fb3f1f${_scopeId}><span class="text-gray-300 mx-1" data-v-18fb3f1f${_scopeId}>@</span> <span class="text-black font-bold" data-v-18fb3f1f${_scopeId}>${ssrInterpolate(person.company)}</span></span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p></div></div><span class="px-2 py-1 bg-gray-50 text-[10px] font-bold uppercase text-gray-500 rounded border border-gray-100 whitespace-nowrap" data-v-18fb3f1f${_scopeId}>${ssrInterpolate(person.location)}</span></div><p class="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2 flex-grow" data-v-18fb3f1f${_scopeId}>${ssrInterpolate(person.bio || "No bio provided.")}</p><div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between" data-v-18fb3f1f${_scopeId}><span class="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded group-hover:bg-blue-100 transition-colors" data-v-18fb3f1f${_scopeId}> View Profile </span><svg class="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-18fb3f1f${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" data-v-18fb3f1f${_scopeId}></path></svg></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-start justify-between mb-4" }, [
                    createVNode("div", { class: "flex items-center gap-4" }, [
                      createVNode("div", { class: "relative" }, [
                        createVNode("img", {
                          src: person.image,
                          class: "w-14 h-14 rounded-full object-cover border border-gray-100 bg-gray-50"
                        }, null, 8, ["src"]),
                        person.status === "Open to Work" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full",
                          title: "Available"
                        })) : createCommentVNode("", true)
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1" }, toDisplayString(person.name), 1),
                        createVNode("p", { class: "text-xs text-gray-500 font-medium line-clamp-1" }, [
                          createTextVNode(toDisplayString(person.role) + " ", 1),
                          person.company !== "Freelance" ? (openBlock(), createBlock("span", { key: 0 }, [
                            createVNode("span", { class: "text-gray-300 mx-1" }, "@"),
                            createTextVNode(),
                            createVNode("span", { class: "text-black font-bold" }, toDisplayString(person.company), 1)
                          ])) : createCommentVNode("", true)
                        ])
                      ])
                    ]),
                    createVNode("span", { class: "px-2 py-1 bg-gray-50 text-[10px] font-bold uppercase text-gray-500 rounded border border-gray-100 whitespace-nowrap" }, toDisplayString(person.location), 1)
                  ]),
                  createVNode("p", { class: "text-sm text-gray-500 leading-relaxed mb-6 line-clamp-2 flex-grow" }, toDisplayString(person.bio || "No bio provided."), 1),
                  createVNode("div", { class: "mt-auto pt-4 border-t border-gray-50 flex items-center justify-between" }, [
                    createVNode("span", { class: "text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded group-hover:bg-blue-100 transition-colors" }, " View Profile "),
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all",
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
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/people/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-18fb3f1f"]]);

export { index as default };
//# sourceMappingURL=index-Duh5NNu3.mjs.map
