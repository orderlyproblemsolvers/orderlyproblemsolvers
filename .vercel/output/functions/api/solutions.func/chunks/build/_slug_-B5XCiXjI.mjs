import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { _ as __nuxt_component_0$1 } from './NuxtImg-lyvydNNu.mjs';
import { c as createError, u as useHead$1, _ as __nuxt_component_0$1$1 } from './server.mjs';
import { defineComponent, withAsyncContext, computed, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { u as useFetch } from './fetch-DxdGcDtP.mjs';
import { u as useJsonld } from './composable-Dhv3eEY9.mjs';
import { d as defineOgImageComponent } from './defineOgImageComponent-Ch6vH54m.mjs';
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
    const { data: article, error, status } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/stories/${slug}`, "$J3XYSZvk-8")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({ statusCode: 404, statusMessage: "Story not found", fatal: true });
    }
    const authorImage = computed(() => {
      return article.value?.authorDetails?.avatar || `https://ui-avatars.com/api/?name=${article.value?.authorName || "Admin"}&background=random&color=fff`;
    });
    const formatDate = (dateStr) => {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    };
    const scrollProgress = ref(0);
    useHead$1({
      title: () => article.value?.title,
      meta: [
        { name: "description", content: () => article.value?.subtitle || article.value?.excerpt },
        { name: "author", content: () => article.value?.authorName },
        { property: "og:title", content: () => article.value?.title },
        { property: "og:description", content: () => article.value?.excerpt },
        { property: "og:image", content: () => article.value?.image },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: () => article.value?.date },
        { property: "article:author", content: () => article.value?.authorName },
        { name: "twitter:card", content: "summary_large_image" }
      ]
    });
    useJsonld(() => ({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      // or 'NewsArticle'
      headline: article.value?.title,
      image: [article.value?.image],
      datePublished: article.value?.date,
      author: {
        "@type": "Person",
        name: article.value?.authorName
      },
      publisher: {
        "@type": "Organization",
        name: "Orderly Problem Solvers",
        logo: {
          "@type": "ImageObject",
          url: "https://orderlyproblemsolvers.com/img/logo.png"
          // Update with real domain
        }
      },
      description: article.value?.excerpt
    }));
    defineOgImageComponent("OpsTemplate", {
      title: article.value?.title,
      description: article.value?.excerpt || article.value?.subtitle,
      type: "Story",
      badge: article.value?.category
      // e.g. "Spotlight" or "Engineering"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$1$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">`);
      if (unref(status) === "pending") {
        _push(`<div class="h-screen flex items-center justify-center"><div class="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div></div>`);
      } else if (unref(article)) {
        _push(`<div><div class="sticky top-20 z-30 w-full bg-white/95 backdrop-blur border-b border-gray-100 h-1"><div class="h-full bg-blue-600 transition-all duration-150 ease-out" style="${ssrRenderStyle({ width: `${scrollProgress.value}%` })}"></div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center"><div class="flex justify-center gap-3 mb-6"><span class="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full">${ssrInterpolate(unref(article).category)}</span><span class="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full">${ssrInterpolate(unref(article).readTime)}</span></div><h1 class="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-6 text-gray-900">${ssrInterpolate(unref(article).title)}</h1><p class="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">${ssrInterpolate(unref(article).excerpt)}</p><p class="mt-6 text-sm font-bold text-gray-400">${ssrInterpolate(formatDate(unref(article).date))}</p></div><div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"><div class="aspect-video rounded-2xl overflow-hidden shadow-sm bg-gray-100">`);
        if (unref(article).image) {
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: unref(article).image,
            class: "w-full h-full object-cover",
            alt: "Cover Article"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24"><div class="grid grid-cols-1 lg:grid-cols-12 gap-12"><div class="hidden lg:block lg:col-span-2"><div class="sticky top-48 flex flex-col gap-4 items-center"><button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100"><span class="sr-only">Share Twitter</span><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg></button><button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100"><span class="sr-only">Share LinkedIn</span><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path></svg></button></div></div><div class="lg:col-span-7"><div class="flex lg:hidden items-center gap-3 mb-8 pb-8 border-b border-gray-100"><img${ssrRenderAttr("src", authorImage.value)} class="w-10 h-10 rounded-full object-cover"><div><p class="text-sm font-bold">${ssrInterpolate(unref(article).authorName)}</p></div></div><div class="prose prose-lg prose-gray max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl prose-blockquote:border-l-black prose-blockquote:italic prose-blockquote:font-serif">${unref(article).content ?? ""}</div></div><div class="hidden lg:block lg:col-span-3"><div class="sticky top-48 space-y-12"><div><p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Written By</p><div class="flex items-start gap-3">`);
        if (unref(article).authorDetails) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/people/${unref(article).authorDetails.slug}`,
            class: "shrink-0 group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", authorImage.value)} class="w-12 h-12 rounded-full border border-gray-200 object-cover group-hover:border-blue-500 transition-colors"${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: authorImage.value,
                    class: "w-12 h-12 rounded-full border border-gray-200 object-cover group-hover:border-blue-500 transition-colors"
                  }, null, 8, ["src"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<div class="shrink-0"><img${ssrRenderAttr("src", authorImage.value)} class="w-12 h-12 rounded-full border border-gray-200 object-cover"></div>`);
        }
        _push(`<div>`);
        if (unref(article).authorDetails) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/people/${unref(article).authorDetails.slug}`,
            class: "font-bold text-gray-900 hover:text-blue-600 transition-colors block"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(article).authorName)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(article).authorName), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<p class="font-bold text-gray-900">${ssrInterpolate(unref(article).authorName)}</p>`);
        }
        _push(`<p class="text-xs text-gray-500 mt-1 leading-relaxed">${ssrInterpolate(unref(article).authorDetails?.role || "OPS Contributor")}</p></div></div></div>`);
        if (unref(article).companies && unref(article).companies.length > 0) {
          _push(`<div class="space-y-4"><p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Companies</p><!--[-->`);
          ssrRenderList(unref(article).companies, (comp) => {
            _push(`<div class="p-4 bg-gray-50 rounded-xl border border-gray-200"><div class="flex items-center gap-3 mb-3"><div class="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center font-black text-gray-900 shrink-0 text-xs overflow-hidden">`);
            if (comp.logo && comp.logo.startsWith("http")) {
              _push(`<img${ssrRenderAttr("src", comp.logo)} class="w-full h-full object-cover">`);
            } else {
              _push(`<span>${ssrInterpolate(comp.name.charAt(0))}</span>`);
            }
            _push(`</div><div><p class="font-bold text-sm text-gray-900 leading-tight">${ssrInterpolate(comp.name)}</p><p class="text-[10px] text-gray-500">${ssrInterpolate(comp.industry)}</p></div></div>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/companies/${comp.slug}`,
              class: "block w-full py-2 bg-white border border-gray-200 text-center rounded text-xs font-bold hover:border-black hover:bg-black hover:text-white transition-all"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` View Profile `);
                } else {
                  return [
                    createTextVNode(" View Profile ")
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(article).people && unref(article).people.length > 0) {
          _push(`<div class="space-y-4"><p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Experts</p><!--[-->`);
          ssrRenderList(unref(article).people, (p) => {
            _push(`<div class="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors bg-white"><img${ssrRenderAttr("src", p.avatar || `https://ui-avatars.com/api/?name=${p.name}`)} class="w-10 h-10 rounded-full object-cover border border-gray-100"><div>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: `/people/${p.slug}`,
              class: "text-sm font-bold text-gray-900 hover:text-blue-600 block transition-colors"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(p.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(p.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            _push(`<p class="text-xs text-gray-500">${ssrInterpolate(p.role)}</p></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stories/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_slug_-B5XCiXjI.mjs.map
