import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { u as useHead$1, _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const team = [
      { name: "David O.", role: "Editor in Chief", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
      { name: "Sarah J.", role: "Head of Curation", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
      { name: "Michael K.", role: "Technical Director", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
      { name: "Amara U.", role: "Design Lead", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" }
    ];
    const pillars = [
      {
        number: "01",
        title: "The Directory",
        desc: "The raw data. A verified index of the companies, people, and stacks solving real problems.",
        link: "/discover",
        label: "Browse Data"
      },
      {
        number: "02",
        title: "The Journal",
        desc: 'The context. Deep-dive editorial that explains the "Why" and "How" behind the solutions.',
        link: "/stories",
        label: "Read Stories"
      },
      {
        number: "03",
        title: "The Studio",
        desc: "The craft. Our in-house design & engineering arm building infrastructure for the future.",
        link: "/services",
        label: "Hire OPS"
      }
    ];
    ref(null);
    useHead$1({
      title: "About Us - The Curators of Order",
      meta: [
        { name: "description", content: "We are chronicling the Age of Solution. OPS is a media platform and directory filtering the signal from the noise in the tech ecosystem." },
        { property: "og:title", content: "About Orderly Problem Solvers" },
        { property: "og:description", content: "Meet the editorial board and engineering team behind the definitive index of problem solvers." },
        { property: "og:image", content: "/img/logo-sm.png" },
        { name: "twitter:card", content: "summary_large_image" }
      ]
    });
    defineOgImageComponent("OpsTemplate", {
      title: "The Curators of Order",
      description: "We chronicle the Age of Solution.",
      type: "General",
      badge: "Manifesto"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white"><section class="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-900"><div class="max-w-7xl mx-auto"><span class="block text-xs font-bold tracking-[0.2em] uppercase mb-6 sm:mb-8">The Manifesto</span><h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] mb-12 sm:mb-16"> WE CHRONICLE <br class="hidden sm:inline"> THE AGE OF <br class="hidden sm:inline"><span class="bg-linear-to-b from-gray-500 to-gray-900 bg-clip-text text-transparent">SOLUTION.</span></h1><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 border-t border-gray-200 pt-8 sm:pt-12"><div class="lg:col-span-5"><p class="text-lg sm:text-xl md:text-2xl font-serif leading-relaxed text-gray-800"> The tech world is drowning in noise. Vaporware, buzzwords, and wrappers. We exist to find the signal. </p></div><div class="lg:col-span-7 flex flex-col justify-between gap-6 sm:gap-8"><p class="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl"> OPS started as a simple observation: for every problem we tried to solve, there was already a brilliant team somewhere in the world solving it. The problem wasn&#39;t a lack of innovation; it was a lack of <strong>Order</strong>. </p><p class="text-xs sm:text-sm font-bold uppercase tracking-widest">Est. 2025 — Abuja / Global</p></div></div></div></section><section class="border-b border-gray-900"><div class="max-w-7xl mx-auto"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-900"><!--[-->`);
      ssrRenderList(pillars, (pillar) => {
        _push(`<div class="group relative p-6 sm:p-8 lg:p-12 flex flex-col justify-between min-h-80 sm:min-h-[400px] hover:bg-gray-50 transition-colors cursor-pointer"><div><span class="block text-5xl sm:text-6xl font-black text-gray-200 mb-6 sm:mb-8 group-hover:text-gray-900 transition-colors duration-500">${ssrInterpolate(pillar.number)}</span><h3 class="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">${ssrInterpolate(pillar.title)}</h3><p class="text-gray-500 text-sm sm:text-base leading-relaxed">${ssrInterpolate(pillar.desc)}</p></div><div class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100 group-hover:border-gray-900 transition-colors">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: pillar.link,
          class: "inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(pillar.label)} → `);
            } else {
              return [
                createTextVNode(toDisplayString(pillar.label) + " → ", 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div></section><section class="bg-black text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8"><div class="max-w-7xl mx-auto"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"><div><div class="inline-block px-3 py-1.5 border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 sm:mb-8"> OPS Studio </div><h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 sm:mb-8 leading-tight"> WE PRACTICE <br> WHAT WE <br> PREACH. </h2><p class="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md"> We don&#39;t just curate the ecosystem; we build the infrastructure. OPS Studio applies our philosophy of &quot;Radical Order&quot; to build scalable platforms for enterprise and government clients. </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/services",
        class: "inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Capabilities `);
          } else {
            return [
              createTextVNode(" View Capabilities ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="relative w-full aspect-square lg:aspect-4/5 border border-white/20 rounded-lg overflow-hidden bg-black/50"><div class="absolute inset-0 z-0"></div><div class="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 pointer-events-none z-10"><div class="text-xs font-mono text-gray-500"><p>ARCHITECTURE_V1.0</p><p>STATUS: ONLINE</p><p class="animate-pulse text-blue-500">&gt;&gt; RENDERING</p></div><div class="text-right"><p class="text-4xl sm:text-6xl font-black text-white/10">BUILD</p></div></div></div></div></div></section><section class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200"><div class="max-w-7xl mx-auto"><div class="mb-12 sm:mb-16 border-b border-gray-900 pb-4 sm:pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"><h2 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase">The Editorial Board</h2><p class="hidden sm:block text-xs font-bold uppercase tracking-widest whitespace-nowrap">Curators of Order</p></div><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"><!--[-->`);
      ssrRenderList(team, (member) => {
        _push(`<div class="group"><div class="aspect-3/4 overflow-hidden bg-gray-100 mb-3 sm:mb-4 grayscale group-hover:grayscale-0 transition-all duration-500"><img${ssrRenderAttr("src", member.image)} class="w-full h-full object-cover" alt="Team Member"></div><h3 class="text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight">${ssrInterpolate(member.name)}</h3><p class="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">${ssrInterpolate(member.role)}</p></div>`);
      });
      _push(`<!--]--></div></div></section><section class="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-center"><p class="text-gray-500 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-6">The Ecosystem is waiting</p><h2 class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 sm:mb-12 hover:text-blue-600 transition-colors cursor-default"> JOIN THE<br> ORDER. </h2><div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/submit-solution",
        class: "px-6 sm:px-10 py-3 sm:py-4 bg-black text-white font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-blue-600 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Submit Solution `);
          } else {
            return [
              createTextVNode(" Submit Solution ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/stories",
        class: "px-6 sm:px-10 py-3 sm:py-4 border border-gray-200 font-bold text-xs sm:text-sm uppercase tracking-widest hover:border-black transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Read The Journal `);
          } else {
            return [
              createTextVNode(" Read The Journal ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></div>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-iuud0QHM.mjs.map
