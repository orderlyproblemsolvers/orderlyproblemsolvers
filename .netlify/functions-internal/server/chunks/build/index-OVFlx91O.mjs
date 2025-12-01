import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, computed, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import 'vue-router';
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

const totalSteps = 4;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const currentStep = ref(1);
    const isSubmitting = ref(false);
    const isSuccess = ref(false);
    const submissionId = ref("");
    const form = ref({
      type: "person",
      // 'person' | 'company'
      name: "",
      email: "",
      // Contact info (saved in DB now)
      website: "",
      role: "",
      // Only for person
      location: "",
      industry: "",
      // Stack Logic
      stack: [],
      stackInput: "",
      // Impact Data (Concatenated into description later)
      problem: "",
      solution: "",
      metric: ""
    });
    const industries = ["FinTech", "HealthTech", "AgriTech", "Logistics", "EdTech", "Clean Energy", "PropTech", "GovTech", "E-commerce", "AI & Data"];
    const progress = computed(() => currentStep.value / totalSteps * 100);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white"><div class="sticky top-20 z-20 bg-white/90 backdrop-blur border-b border-gray-100"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"><span class="text-xs font-bold uppercase tracking-widest text-gray-500">Submission Portal</span><div class="hidden md:flex items-center gap-3 text-xs font-mono"><span class="${ssrRenderClass(currentStep.value >= 1 ? "text-black font-bold" : "text-gray-300")}">01. IDENTITY</span><span class="text-gray-300">/</span><span class="${ssrRenderClass(currentStep.value >= 2 ? "text-black font-bold" : "text-gray-300")}">02. CONTEXT</span><span class="text-gray-300">/</span><span class="${ssrRenderClass(currentStep.value >= 3 ? "text-black font-bold" : "text-gray-300")}">03. IMPACT</span><span class="text-gray-300">/</span><span class="${ssrRenderClass(currentStep.value >= 4 ? "text-black font-bold" : "text-gray-300")}">04. REVIEW</span></div><div class="md:hidden text-xs font-bold">Step ${ssrInterpolate(currentStep.value)} of ${ssrInterpolate(totalSteps)}</div></div><div class="h-1 bg-gray-100 w-full"><div class="h-full bg-blue-600 transition-all duration-500 ease-out" style="${ssrRenderStyle({ width: `${progress.value}%` })}"></div></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">`);
      if (isSuccess.value) {
        _push(`<div class="max-w-lg mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-500"><div class="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"><svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg></div><h2 class="text-4xl font-black tracking-tighter mb-4">Received.</h2><p class="text-gray-500 mb-10">Your profile is in the verification queue. Our editorial team reviews all submissions within 48 hours.</p><div class="bg-gray-50 border border-gray-200 p-6 rounded-lg text-left font-mono text-sm mb-10 relative overflow-hidden"><div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300"></div><div class="flex justify-between mb-2 border-b border-gray-200 pb-2"><span class="text-gray-400">TICKET ID</span><span class="font-bold">${ssrInterpolate(submissionId.value)}</span></div><div class="flex justify-between mb-2"><span class="text-gray-400">TYPE</span><span class="uppercase">${ssrInterpolate(form.value.type)}</span></div><div class="flex justify-between mb-2"><span class="text-gray-400">ENTITY</span><span class="font-bold">${ssrInterpolate(form.value.name)}</span></div><div class="flex justify-between"><span class="text-gray-400">STATUS</span><span class="text-orange-500 font-bold">PENDING REVIEW</span></div></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "inline-block px-8 py-4 bg-black text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Return to Index `);
            } else {
              return [
                createTextVNode(" Return to Index ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-16"><div class="hidden lg:block lg:col-span-4"><div class="sticky top-48"><h1 class="text-5xl font-black tracking-tighter mb-6 leading-[0.9]"> ADD TO <br> THE INDEX. </h1><p class="text-lg text-gray-500 mb-8 leading-relaxed"> Join the definitive directory of problem solvers. Verification grants you visibility to investors, partners, and talent. </p><div class="bg-blue-50 border border-blue-100 p-6 rounded-xl"><h4 class="text-blue-900 font-bold text-sm mb-2">Why &quot;Impact&quot; matters?</h4><p class="text-blue-700 text-xs leading-relaxed"> We don&#39;t just list names. We list solutions. Providing a clear case study (The Problem &amp; The Fix) increases your chance of verification by 80%. </p></div></div></div><div class="lg:col-span-8 max-w-2xl"><form class="space-y-10">`);
        if (currentStep.value === 1) {
          _push(`<div class="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300"><div><label class="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">I am listing a...</label><div class="grid grid-cols-2 gap-4"><div class="${ssrRenderClass([form.value.type === "person" ? "border-blue-600 bg-blue-50/50" : "border-gray-200 hover:border-gray-300", "cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all"])}"><svg class="${ssrRenderClass([form.value.type === "person" ? "text-blue-600" : "text-gray-400", "w-8 h-8 mb-3"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg><span class="${ssrRenderClass([form.value.type === "person" ? "text-blue-900" : "text-gray-500", "font-bold text-sm"])}">Person</span></div><div class="${ssrRenderClass([form.value.type === "company" ? "border-blue-600 bg-blue-50/50" : "border-gray-200 hover:border-gray-300", "cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all"])}"><svg class="${ssrRenderClass([form.value.type === "company" ? "text-blue-600" : "text-gray-400", "w-8 h-8 mb-3"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg><span class="${ssrRenderClass([form.value.type === "company" ? "text-blue-900" : "text-gray-500", "font-bold text-sm"])}">Company</span></div></div></div><div class="space-y-6"><div><label class="block text-xs font-bold text-gray-900 mb-2">${ssrInterpolate(form.value.type === "person" ? "Full Name" : "Company Name")}</label><input${ssrRenderAttr("value", form.value.name)} type="text" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm" placeholder="e.g. PayStack"></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-xs font-bold text-gray-900 mb-2">Email Address</label><input${ssrRenderAttr("value", form.value.email)} type="email" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm" placeholder="admin@example.com"></div><div><label class="block text-xs font-bold text-gray-900 mb-2">Website / Portfolio</label><input${ssrRenderAttr("value", form.value.website)} type="url" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm" placeholder="https://"></div></div>`);
          if (form.value.type === "person") {
            _push(`<div><label class="block text-xs font-bold text-gray-900 mb-2">Current Role</label><input${ssrRenderAttr("value", form.value.role)} type="text" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm" placeholder="e.g. Senior Engineer"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentStep.value === 2) {
          _push(`<div class="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300"><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div><label class="block text-xs font-bold text-gray-900 mb-2">Industry</label><div class="relative"><select class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm appearance-none cursor-pointer"><option value="" disabled selected>Select...</option><!--[-->`);
          ssrRenderList(industries, (ind) => {
            _push(`<option${ssrRenderAttr("value", ind)}${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, ind) : ssrLooseEqual(form.value.industry, ind)) ? " selected" : ""}>${ssrInterpolate(ind)}</option>`);
          });
          _push(`<!--]--></select><svg class="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></div></div><div><label class="block text-xs font-bold text-gray-900 mb-2">HQ Location</label><input${ssrRenderAttr("value", form.value.location)} type="text" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm" placeholder="e.g. Lagos"></div></div><div><label class="block text-xs font-bold text-gray-900 mb-2">Tech Stack / Tools</label><div class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus-within:bg-white focus-within:border-black transition-colors flex flex-wrap gap-2 min-h-[50px]"><!--[-->`);
          ssrRenderList(form.value.stack, (tag, index) => {
            _push(`<span class="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">${ssrInterpolate(tag)} <button class="hover:text-gray-300"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></span>`);
          });
          _push(`<!--]--><input${ssrRenderAttr("value", form.value.stackInput)} type="text" class="bg-transparent outline-none text-sm flex-1 min-w-[120px]" placeholder="Type &amp; Enter..."></div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentStep.value === 3) {
          _push(`<div class="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300"><div class="bg-yellow-50 border border-yellow-100 p-4 rounded-lg mb-6"><p class="text-xs text-yellow-800 font-medium">Describe a specific challenge you solved. This helps us verify your expertise.</p></div><div><label class="block text-xs font-bold text-gray-900 mb-2">The Challenge (Constraint)</label><textarea rows="2" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm" placeholder="e.g. Our payment API was timing out at 50 TPS during Black Friday...">${ssrInterpolate(form.value.problem)}</textarea></div><div><label class="block text-xs font-bold text-gray-900 mb-2">The Fix (Technical Approach)</label><textarea rows="3" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm" placeholder="e.g. We migrated the ledger to Rust and implemented Redis caching for read-heavy endpoints...">${ssrInterpolate(form.value.solution)}</textarea></div><div><label class="block text-xs font-bold text-gray-900 mb-2">The Outcome (Metric)</label><input${ssrRenderAttr("value", form.value.metric)} type="text" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-black outline-none transition-colors text-sm" placeholder="e.g. Scaled to 5,000 TPS with 0 downtime."></div></div>`);
        } else {
          _push(`<!---->`);
        }
        if (currentStep.value === 4) {
          _push(`<div class="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300"><div class="bg-gray-50 p-6 rounded-xl border border-gray-200"><h3 class="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">Review</h3><dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 text-sm"><div><dt class="text-gray-400 text-xs uppercase font-bold mb-1">Type</dt><dd class="font-bold capitalize">${ssrInterpolate(form.value.type)}</dd></div><div><dt class="text-gray-400 text-xs uppercase font-bold mb-1">Name</dt><dd class="font-bold">${ssrInterpolate(form.value.name)}</dd></div><div><dt class="text-gray-400 text-xs uppercase font-bold mb-1">Location</dt><dd class="font-bold">${ssrInterpolate(form.value.location)}</dd></div><div class="md:col-span-2"><dt class="text-gray-400 text-xs uppercase font-bold mb-1">Stack</dt><dd class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(form.value.stack, (tag) => {
            _push(`<span class="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-1 rounded">${ssrInterpolate(tag)}</span>`);
          });
          _push(`<!--]--></dd></div></dl></div><div class="flex items-start gap-3"><input type="checkbox" id="terms" class="mt-1 w-4 h-4 rounded border-gray-300 text-black focus:ring-black"><label for="terms" class="text-sm text-gray-600">I confirm this info is accurate. I agree to the `);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/legal/terms",
            class: "underline text-black"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`Terms`);
              } else {
                return [
                  createTextVNode("Terms")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`.</label></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex items-center gap-4 pt-6 border-t border-gray-100">`);
        if (currentStep.value > 1) {
          _push(`<button type="button" class="px-6 py-3 rounded-lg border border-gray-200 text-sm font-bold hover:bg-gray-50 transition-colors">Back</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="flex-1 px-6 py-3 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""}>`);
        if (isSubmitting.value) {
          _push(`<span>Submitting...</span>`);
        } else {
          _push(`<span>${ssrInterpolate(currentStep.value === totalSteps ? "Submit Solution" : "Continue")}</span>`);
        }
        _push(`</button></div></form></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/submit-solution/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-OVFlx91O.mjs.map
