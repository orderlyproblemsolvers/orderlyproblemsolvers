import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_0$2 } from './NuxtImg-lyvydNNu.mjs';
import { defineComponent, ref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const isLoading = ref(true);
    const feed = ref([]);
    const followingCount = ref(0);
    const isPersonalized = ref(false);
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtImg = __nuxt_component_0$2;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900"><div class="bg-gray-50 border-b border-gray-200 pt-32 pb-12"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"><h1 class="text-4xl font-black text-gray-900 tracking-tighter mb-2">${ssrInterpolate(isPersonalized.value ? "Your Feed" : "Latest Updates")}</h1>`);
      if (isPersonalized.value) {
        _push(`<p class="text-gray-500"> Updates from the <strong>${ssrInterpolate(followingCount.value)}</strong> organizations you follow. </p>`);
      } else {
        _push(`<div class="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg inline-flex mt-2"><span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span> You aren&#39;t following anyone yet. Here is what&#39;s trending today. </div>`);
      }
      _push(`</div></div><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">`);
      if (isLoading.value) {
        _push(`<div class="space-y-8"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-48 bg-gray-100 rounded-xl animate-pulse"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (feed.value.length > 0) {
        _push(`<div class="space-y-12"><!--[-->`);
        ssrRenderList(feed.value, (story) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: story.slug,
            to: `/stories/${story.slug}`,
            class: "group block border-b border-gray-100 pb-12 last:border-0"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex flex-col md:flex-row gap-8 items-start"${_scopeId}><div class="w-full md:w-48 aspect-video bg-gray-100 rounded-lg overflow-hidden shrink-0"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: story.image,
                  class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                }, null, _parent2, _scopeId));
                _push2(`</div><div${_scopeId}><div class="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest"${_scopeId}><span class="text-blue-600"${_scopeId}>${ssrInterpolate(story.companyName || story.category)}</span><span class="text-gray-300"${_scopeId}>•</span><span class="text-gray-500"${_scopeId}>${ssrInterpolate(formatDate(story.date || story.publishedAt))}</span></div><h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(story.title)}</h3><p class="text-gray-500 text-sm leading-relaxed line-clamp-2"${_scopeId}>${ssrInterpolate(story.excerpt)}</p></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex flex-col md:flex-row gap-8 items-start" }, [
                    createVNode("div", { class: "w-full md:w-48 aspect-video bg-gray-100 rounded-lg overflow-hidden shrink-0" }, [
                      createVNode(_component_NuxtImg, {
                        src: story.image,
                        class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      }, null, 8, ["src"])
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest" }, [
                        createVNode("span", { class: "text-blue-600" }, toDisplayString(story.companyName || story.category), 1),
                        createVNode("span", { class: "text-gray-300" }, "•"),
                        createVNode("span", { class: "text-gray-500" }, toDisplayString(formatDate(story.date || story.publishedAt)), 1)
                      ]),
                      createVNode("h3", { class: "text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors" }, toDisplayString(story.title), 1),
                      createVNode("p", { class: "text-gray-500 text-sm leading-relaxed line-clamp-2" }, toDisplayString(story.excerpt), 1)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        if (!isPersonalized.value) {
          _push(`<div class="text-center pt-12 border-t border-gray-100"><p class="text-gray-900 font-bold mb-2">Want a better feed?</p><p class="text-gray-500 text-sm mb-6">Follow specific companies to curate this page.</p>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/companies",
            class: "px-6 py-3 bg-black text-white rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Browse Directory `);
              } else {
                return [
                  createTextVNode(" Browse Directory ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/feed/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BIzYwy6_.mjs.map
