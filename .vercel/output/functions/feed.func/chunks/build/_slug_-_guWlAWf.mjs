import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { c as createError, u as useHead$1, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, ref, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
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
    const { data: company, error, status } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/companies/${slug}`, "$ELc3h7QiHr")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Company not found", fatal: true });
    }
    const logoUrl = computed(() => {
      if (company.value?.logo && company.value.logo.startsWith("http")) return company.value.logo;
      return null;
    });
    const fallbackInitial = computed(() => {
      return company.value?.name?.charAt(0) || "C";
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };
    const toSolutionSlug = (name) => {
      return name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    };
    const isFollowing = ref(false);
    useHead$1({
      title: () => `${company.value?.name} - Verified`,
      meta: [
        { name: "description", content: () => company.value?.headline || `Learn about ${company.value?.name}, a ${company.value?.industry} company in ${company.value?.location}.` },
        { property: "og:title", content: () => company.value?.name },
        { property: "og:description", content: () => company.value?.headline },
        { property: "og:image", content: () => company.value?.logo },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: () => company.value?.name },
        { name: "twitter:description", content: () => company.value?.headline },
        { name: "twitter:image", content: () => company.value?.logo }
      ]
    });
    useJsonld(() => ({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: company.value?.name,
      description: company.value?.description,
      url: company.value?.website,
      logo: company.value?.logo,
      address: {
        "@type": "PostalAddress",
        addressLocality: company.value?.location
      },
      industry: company.value?.industry
    }));
    defineOgImageComponent("OpsTemplate", {
      title: company.value?.name,
      description: company.value?.headline || `Verified ${company.value?.industry} Solution`,
      image: company.value?.logo,
      // Passes the logo URL to the bottom-right or center depending on layout
      type: "Company",
      badge: company.value?.industry
      // e.g. "FinTech"
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
      } else if (unref(company)) {
        _push(`<div><div class="relative bg-gray-900 text-white pt-32 pb-16 overflow-hidden"><div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 to-transparent"></div><div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-col md:flex-row items-start gap-8"><div class="w-24 h-24 rounded-2xl bg-white flex items-center justify-center text-4xl font-black text-gray-900 shadow-2xl overflow-hidden shrink-0">`);
        if (logoUrl.value) {
          _push(`<img${ssrRenderAttr("src", logoUrl.value)} class="w-full h-full object-cover" alt="Company Logo">`);
        } else {
          _push(`<span>${ssrInterpolate(fallbackInitial.value)}</span>`);
        }
        _push(`</div><div class="flex-1"><div class="flex items-center gap-4 mb-4 flex-wrap"><h1 class="text-4xl md:text-5xl font-black tracking-tight">${ssrInterpolate(unref(company).name)}</h1><span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest">${ssrInterpolate(unref(company).industry)}</span><span class="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">${ssrInterpolate(unref(company).stage)}</span></div><p class="text-xl text-gray-300 max-w-2xl leading-relaxed">${ssrInterpolate(unref(company).headline || "Building the future of " + unref(company).industry)}</p></div><div class="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">`);
        if (unref(company).website) {
          _push(`<a${ssrRenderAttr("href", unref(company).website)} target="_blank" class="px-6 py-3 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors text-center flex items-center justify-center gap-2"> Visit Website <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg></a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button class="${ssrRenderClass([unref(isFollowing) ? "bg-green-600 border-green-600 text-white hover:bg-green-700" : "border-white/20 text-white hover:bg-white/10", "px-6 py-3 border text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"])}">`);
        if (unref(isFollowing)) {
          _push(`<svg class="w-4 h-4 animate-in zoom-in duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(isFollowing)) {
          _push(`<span>Following</span>`);
        } else {
          _push(`<span>Follow Updates</span>`);
        }
        _push(`</button></div></div></div></div><div class="border-b border-gray-200 bg-gray-50"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex flex-wrap divide-x divide-gray-200"><div class="px-8 py-6 flex-1 text-center md:text-left"><p class="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Location</p><p class="text-lg font-black text-gray-900">${ssrInterpolate(unref(company).location)}</p></div><div class="px-8 py-6 flex-1 text-center md:text-left"><p class="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Added On</p><p class="text-lg font-black text-gray-900">${ssrInterpolate(formatDate(unref(company).createdAt))}</p></div><div class="px-8 py-6 flex-1 text-center md:text-left"><p class="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Team Size</p><p class="text-lg font-black text-gray-900">${ssrInterpolate(unref(company).team?.length > 0 ? unref(company).team.length + "+" : "N/A")}</p></div></div></div></div><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 lg:grid-cols-12 gap-16"><div class="lg:col-span-8 space-y-16"><section><h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">The Solution</h3>`);
        if (unref(company).description) {
          _push(`<div class="prose prose-gray max-w-none text-gray-900 leading-relaxed prose-headings:font-bold prose-a:text-blue-600">${(unref(company).description.includes("<") ? unref(company).description : `<p>${unref(company).description}</p>`) ?? ""}</div>`);
        } else {
          _push(`<p class="text-gray-500 italic">No description provided.</p>`);
        }
        _push(`</section>`);
        if (unref(company).stack && unref(company).stack.length > 0) {
          _push(`<section><h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Tech Stack</h3><div class="flex flex-wrap gap-3"><!--[-->`);
          ssrRenderList(unref(company).stack, (tech) => {
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
          _push(`<section><h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Tech Stack</h3><p class="text-sm text-gray-400 italic">No technologies listed yet.</p></section>`);
        }
        _push(`</div><div class="lg:col-span-4 space-y-12"><div class="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm"><div class="flex items-center justify-between mb-6"><h3 class="text-xs font-black text-gray-900 uppercase tracking-widest">Team</h3>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/people",
          class: "text-xs text-blue-600 font-bold hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View Directory`);
            } else {
              return [
                createTextVNode("View Directory")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        if (unref(company).team && unref(company).team.length > 0) {
          _push(`<div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(company).team, (person) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: person.slug,
              to: `/people/${person.slug}`,
              class: "flex items-center gap-3 group cursor-pointer"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<img${ssrRenderAttr("src", person.image || `https://ui-avatars.com/api/?name=${person.name}&background=random`)} class="w-10 h-10 rounded-full object-cover border border-gray-100"${_scopeId}><div${_scopeId}><p class="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(person.name)}</p><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(person.role)}</p></div>`);
                } else {
                  return [
                    createVNode("img", {
                      src: person.image || `https://ui-avatars.com/api/?name=${person.name}&background=random`,
                      class: "w-10 h-10 rounded-full object-cover border border-gray-100"
                    }, null, 8, ["src"]),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors" }, toDisplayString(person.name), 1),
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
          _push(`<div class="text-center py-6"><p class="text-xs text-gray-400">No verified team members linked yet.</p></div>`);
        }
        _push(`</div>`);
        if (unref(company).stories && unref(company).stories.length > 0) {
          _push(`<div><h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">In The Journal</h3><div class="space-y-4"><!--[-->`);
          ssrRenderList(unref(company).stories, (story) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: story.slug,
              to: `/stories/${story.slug}`,
              class: "block group p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors bg-gray-50"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<h4 class="text-sm font-bold text-gray-900 group-hover:text-blue-600 leading-snug mb-1"${_scopeId}>${ssrInterpolate(story.title)}</h4><span class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(story.category)} • ${ssrInterpolate(formatDate(story.date))}</span>`);
                } else {
                  return [
                    createVNode("h4", { class: "text-sm font-bold text-gray-900 group-hover:text-blue-600 leading-snug mb-1" }, toDisplayString(story.title), 1),
                    createVNode("span", { class: "text-xs text-gray-400" }, toDisplayString(story.category) + " • " + toDisplayString(formatDate(story.date)), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/companies/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-_guWlAWf.mjs.map
