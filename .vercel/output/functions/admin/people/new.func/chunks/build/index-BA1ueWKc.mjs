import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withAsyncContext, computed, unref, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
    const activeCategory = ref("All");
    const { data: stories, status } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/stories", "$2D9rnQ1TZ7")), __temp = await __temp, __restore(), __temp);
    const heroStory = computed(() => stories.value?.[0]);
    const trendingStories = computed(() => stories.value?.slice(1, 4) || []);
    const feedStories = computed(() => {
      const all = stories.value?.slice(4) || [];
      if (activeCategory.value === "All") return all;
      return all.filter((s) => s.category === activeCategory.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans selection:bg-blue-100"><div class="sticky top-20 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100"></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">`);
      if (unref(status) === "pending") {
        _push(`<div class="py-20 text-center"><div class="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div><p class="mt-4 text-gray-400 text-xs font-bold uppercase">Loading Journal...</p></div>`);
      } else if (heroStory.value) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/stories/${heroStory.value.slug}`,
          class: "group relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-32 border-b border-gray-100 pb-24"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="lg:col-span-7 relative overflow-hidden rounded-2xl aspect-[4/3] lg:h-[600px] lg:aspect-auto bg-gray-100"${_scopeId}><img${ssrRenderAttr("src", heroStory.value.image)} class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"${_scopeId}></div><div class="lg:col-span-5 flex flex-col justify-center lg:pl-4"${_scopeId}><span class="text-blue-600 font-black uppercase tracking-widest text-xs mb-6 block"${_scopeId}>${ssrInterpolate(heroStory.value.category)}</span><h2 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-[1] mb-8 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(heroStory.value.title)}</h2><p class="text-xl text-gray-500 leading-relaxed mb-12 border-l-4 border-gray-100 pl-6 line-clamp-3"${_scopeId}>${ssrInterpolate(heroStory.value.excerpt)}</p><div class="mt-auto flex items-center gap-3"${_scopeId}>`);
              if (heroStory.value.authorImage) {
                _push2(`<img${ssrRenderAttr("src", heroStory.value.authorImage)} class="w-10 h-10 rounded-full bg-gray-100"${_scopeId}>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div${_scopeId}><p class="text-sm font-bold text-gray-900"${_scopeId}>${ssrInterpolate(heroStory.value.authorName)}</p><p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(heroStory.value.readTime)}</p></div></div></div>`);
            } else {
              return [
                createVNode("div", { class: "lg:col-span-7 relative overflow-hidden rounded-2xl aspect-[4/3] lg:h-[600px] lg:aspect-auto bg-gray-100" }, [
                  createVNode("img", {
                    src: heroStory.value.image,
                    class: "w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  }, null, 8, ["src"])
                ]),
                createVNode("div", { class: "lg:col-span-5 flex flex-col justify-center lg:pl-4" }, [
                  createVNode("span", { class: "text-blue-600 font-black uppercase tracking-widest text-xs mb-6 block" }, toDisplayString(heroStory.value.category), 1),
                  createVNode("h2", { class: "text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-[1] mb-8 group-hover:text-blue-600 transition-colors" }, toDisplayString(heroStory.value.title), 1),
                  createVNode("p", { class: "text-xl text-gray-500 leading-relaxed mb-12 border-l-4 border-gray-100 pl-6 line-clamp-3" }, toDisplayString(heroStory.value.excerpt), 1),
                  createVNode("div", { class: "mt-auto flex items-center gap-3" }, [
                    heroStory.value.authorImage ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: heroStory.value.authorImage,
                      class: "w-10 h-10 rounded-full bg-gray-100"
                    }, null, 8, ["src"])) : createCommentVNode("", true),
                    createVNode("div", null, [
                      createVNode("p", { class: "text-sm font-bold text-gray-900" }, toDisplayString(heroStory.value.authorName), 1),
                      createVNode("p", { class: "text-xs text-gray-500" }, toDisplayString(heroStory.value.readTime), 1)
                    ])
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        if (trendingStories.value.length > 0) {
          _push(`<div class="mb-32"><div class="flex items-center justify-between mb-12"><h3 class="text-2xl font-black tracking-tight text-gray-900">Recent Features</h3><div class="h-px bg-gray-100 flex-1 mx-8"></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16"><!--[-->`);
          ssrRenderList(trendingStories.value, (story) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: story.id,
              to: `/stories/${story.slug}`,
              class: "group cursor-pointer"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="aspect-[3/2] overflow-hidden rounded-xl mb-6 bg-gray-100 relative"${_scopeId}><img${ssrRenderAttr("src", story.image)} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"${_scopeId}></div><h4 class="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(story.title)}</h4><p class="text-xs font-medium text-gray-400"${_scopeId}>${ssrInterpolate(story.readTime)} • By ${ssrInterpolate(story.authorName)}</p>`);
                } else {
                  return [
                    createVNode("div", { class: "aspect-[3/2] overflow-hidden rounded-xl mb-6 bg-gray-100 relative" }, [
                      createVNode("img", {
                        src: story.image,
                        class: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("h4", { class: "text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors" }, toDisplayString(story.title), 1),
                    createVNode("p", { class: "text-xs font-medium text-gray-400" }, toDisplayString(story.readTime) + " • By " + toDisplayString(story.authorName), 1)
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
        _push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"><div class="lg:col-span-8 space-y-20"><div class="flex items-center justify-between pb-8 border-b border-gray-100"><h3 class="text-2xl font-black tracking-tight text-gray-900">Latest Stories</h3></div><!--[-->`);
        ssrRenderList(feedStories.value, (article) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: article.id,
            to: `/stories/${article.slug}`,
            class: "group grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-20 border-b border-gray-100 last:border-0"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100"${_scopeId}><img${ssrRenderAttr("src", article.image)} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"${_scopeId}></div><div class="md:col-span-7 flex flex-col h-full"${_scopeId}><div class="flex items-center gap-3 mb-4"${_scopeId}><span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded"${_scopeId}>${ssrInterpolate(article.category)}</span></div><h4 class="text-2xl font-bold text-gray-900 tracking-tight mb-4 group-hover:text-blue-600 transition-colors leading-tight"${_scopeId}>${ssrInterpolate(article.title)}</h4><p class="text-base text-gray-500 leading-relaxed mb-6 line-clamp-2"${_scopeId}>${ssrInterpolate(article.excerpt)}</p><div class="mt-auto pt-6 border-t border-gray-50 flex items-center gap-3"${_scopeId}><span class="text-xs font-bold text-gray-900"${_scopeId}>By ${ssrInterpolate(article.authorName)}</span><span class="ml-auto text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors"${_scopeId}>Read →</span></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100" }, [
                    createVNode("img", {
                      src: article.image,
                      class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    }, null, 8, ["src"])
                  ]),
                  createVNode("div", { class: "md:col-span-7 flex flex-col h-full" }, [
                    createVNode("div", { class: "flex items-center gap-3 mb-4" }, [
                      createVNode("span", { class: "text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded" }, toDisplayString(article.category), 1)
                    ]),
                    createVNode("h4", { class: "text-2xl font-bold text-gray-900 tracking-tight mb-4 group-hover:text-blue-600 transition-colors leading-tight" }, toDisplayString(article.title), 1),
                    createVNode("p", { class: "text-base text-gray-500 leading-relaxed mb-6 line-clamp-2" }, toDisplayString(article.excerpt), 1),
                    createVNode("div", { class: "mt-auto pt-6 border-t border-gray-50 flex items-center gap-3" }, [
                      createVNode("span", { class: "text-xs font-bold text-gray-900" }, "By " + toDisplayString(article.authorName), 1),
                      createVNode("span", { class: "ml-auto text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors" }, "Read →")
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div><div class="hidden lg:block lg:col-span-4"></div></div></div>`);
      } else {
        _push(`<div class="text-center py-32 border border-dashed border-gray-200 rounded-2xl"><p class="text-gray-400 font-bold">No stories published yet.</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/stories/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BA1ueWKc.mjs.map
