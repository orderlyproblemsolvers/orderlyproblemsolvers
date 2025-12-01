import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { c as createError, u as useHead$1, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useFetch } from './fetch-aglCyMKr.mjs';
import { u as useJsonld } from './composable-Dhv3eEY9.mjs';
import { d as defineOgImageComponent } from './defineOgImageComponent-Ch6vH54m.mjs';
import '../_/nitro.mjs';
import '@unocss/core';
import '@unocss/preset-wind3';
import 'devalue';
import 'consola';
import 'unhead';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import 'xss';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import '@vue/shared';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const slug = route.params.slug;
    const { data: person, status, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/people/${slug}`, "$H13_Fy37Z2")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Person not found", fatal: true });
    }
    const avatarUrl = computed(() => {
      return person.value?.avatar || `https://ui-avatars.com/api/?name=${person.value?.name}&background=random&size=256`;
    });
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    };
    const toSolutionSlug = (name) => {
      return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    };
    useHead$1({
      title: () => `${person.value?.name} - ${person.value?.role}`,
      meta: [
        { name: "description", content: () => person.value?.bio || `View the professional profile of ${person.value?.name}, a verified expert in ${person.value?.location}.` },
        { property: "og:title", content: () => `${person.value?.name} | OPS Index` },
        { property: "og:description", content: () => person.value?.bio },
        { property: "og:image", content: () => person.value?.avatar },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:title", content: () => person.value?.name },
        { name: "twitter:image", content: () => person.value?.avatar }
      ]
    });
    useJsonld(() => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: person.value?.name,
      jobTitle: person.value?.role,
      image: person.value?.avatar,
      worksFor: {
        "@type": "Organization",
        name: person.value?.companyName
      },
      description: person.value?.bio
    }));
    defineOgImageComponent("OpsTemplate", {
      title: person.value?.name,
      image: person.value?.avatar,
      type: "Person",
      badge: "Verified",
      role: person.value?.role,
      companyName: person.value?.companyName
      // If this is null/undefined, the template handles it cleanly
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900">`);
      if (unref(status) === "pending") {
        _push(`<div class="h-screen flex items-center justify-center"><div class="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div></div>`);
      } else if (unref(person)) {
        _push(`<div><div class="bg-gray-50 border-b border-gray-200 pt-32 pb-12"><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row items-start md:items-center gap-8"><div class="relative group shrink-0"><div class="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-sm bg-white"><img${ssrRenderAttr("src", avatarUrl.value)} class="w-full h-full object-cover" alt="Profile Picture"></div><div class="absolute -bottom-3 -right-3 bg-blue-600 text-white p-1.5 rounded-full border-4 border-gray-50"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div></div><div class="flex-1 w-full"><div class="flex items-center gap-3 mb-2"><h1 class="text-3xl md:text-4xl font-black tracking-tight text-gray-900">${ssrInterpolate(unref(person).name)}</h1>`);
        if (!unref(person).companyName) {
          _push(`<span class="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider rounded-full">Open to Work</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><p class="text-lg text-gray-600 font-medium mb-4 flex items-center flex-wrap gap-1">${ssrInterpolate(unref(person).role)} `);
        if (unref(person).companyName) {
          _push(`<span><span class="text-gray-400 mx-1">at</span>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/companies/${unref(person).companySlug}`,
            class: "text-blue-600 hover:underline font-bold"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(person).companyName)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(person).companyName), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</span>`);
        } else {
          _push(`<span class="text-gray-400 mx-1">(Freelance)</span>`);
        }
        _push(`</p><div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium"><span class="flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> ${ssrInterpolate(unref(person).location || "Remote")}</span></div></div><div class="flex flex-wrap gap-3 w-full md:w-auto">`);
        if (unref(person).email) {
          _push(`<button class="px-6 py-3 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> Send Email </button>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(person).website) {
          _push(`<button class="px-6 py-3 border border-gray-200 bg-white text-gray-700 text-sm font-bold rounded-lg hover:border-black hover:text-black transition-colors flex items-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg> Website </button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 lg:grid-cols-12 gap-16"><div class="lg:col-span-8 space-y-16"><section><h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">About</h3><p class="text-lg text-gray-900 leading-relaxed font-serif whitespace-pre-line">${ssrInterpolate(unref(person).bio || "No biography provided yet.")}</p></section>`);
        if (unref(person).stack && unref(person).stack.length > 0) {
          _push(`<section><h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Expertise</h3><div class="flex flex-wrap gap-3"><!--[-->`);
          ssrRenderList(unref(person).stack, (tech) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: tech.name,
              to: `/solutions/${toSolutionSlug(tech.name)}`,
              class: "group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-black hover:shadow-sm transition-all"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="text-sm font-bold text-gray-700 group-hover:text-black"${_scopeId}>${ssrInterpolate(tech.name)}</span><span class="text-[10px] text-gray-400 uppercase group-hover:text-gray-600"${_scopeId}>${ssrInterpolate(tech.category)}</span>`);
                } else {
                  return [
                    createVNode("span", { class: "text-sm font-bold text-gray-700 group-hover:text-black" }, toDisplayString(tech.name), 1),
                    createVNode("span", { class: "text-[10px] text-gray-400 uppercase group-hover:text-gray-600" }, toDisplayString(tech.category), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(person).articles && unref(person).articles.length > 0) {
          _push(`<section><h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Recent Writing</h3><div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(person).articles, (article) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: article.slug,
              to: `/stories/${article.slug}`,
              class: "block group p-6 border border-gray-200 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all bg-white"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="flex items-center gap-2 mb-2"${_scopeId}><span class="text-[10px] font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded"${_scopeId}>${ssrInterpolate(article.category)}</span>`);
                  if (article.date) {
                    _push2(`<span class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(article.date))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div><h4 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug"${_scopeId}>${ssrInterpolate(article.title)}</h4>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                      createVNode("span", { class: "text-[10px] font-bold uppercase bg-blue-50 text-blue-600 px-2 py-0.5 rounded" }, toDisplayString(article.category), 1),
                      article.date ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "text-xs text-gray-400"
                      }, toDisplayString(formatDate(article.date)), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("h4", { class: "text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-snug" }, toDisplayString(article.title), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="lg:col-span-4 space-y-12"><div class="p-6 border-t border-gray-100">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/people",
          class: "flex items-center gap-3 group cursor-pointer hover:opacity-70 transition-opacity"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:text-black"${_scopeId}><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"${_scopeId}></path></svg></div><div${_scopeId}><p class="text-xs font-bold text-gray-900"${_scopeId}>Explore Directory</p><p class="text-[10px] text-gray-500"${_scopeId}>Find more experts</p></div>`);
            } else {
              return [
                createVNode("div", { class: "w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 group-hover:text-black" }, [
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
                      d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    })
                  ]))
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-xs font-bold text-gray-900" }, "Explore Directory"),
                  createVNode("p", { class: "text-[10px] text-gray-500" }, "Find more experts")
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/people/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-B9Cnr1IQ.mjs.map
