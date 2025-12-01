import { _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './ImageUpload-BvABuqAb.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const isLoading = ref(false);
    const form = ref({
      name: "",
      slug: "",
      headline: "",
      description: "",
      industry: "FinTech",
      location: "",
      website: "",
      stage: "Seed",
      logo: "",
      // Managed by ImageUpload
      featured: false,
      // Tech Stack Data
      stack: [],
      stackInput: ""
    });
    watch(() => form.value.name, (newName) => {
      form.value.slug = newName.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ImageUpload = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto" }, _attrs))}><div class="flex items-center justify-between mb-8"><h1 class="text-2xl font-black text-gray-900">New Company</h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/dashboard",
        class: "text-sm font-bold text-gray-500 hover:text-black"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cancel`);
          } else {
            return [
              createTextVNode("Cancel")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><form class="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm"><div class="grid grid-cols-2 gap-6"><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Company Name</label><input${ssrRenderAttr("value", form.value.name)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="PayFlow"></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Slug (URL)</label><input${ssrRenderAttr("value", form.value.slug)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors bg-gray-50"></div></div><div>`);
      _push(ssrRenderComponent(_component_ImageUpload, {
        modelValue: form.value.logo,
        "onUpdate:modelValue": ($event) => form.value.logo = $event,
        label: "Company Logo"
      }, null, _parent));
      _push(`</div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Headline (One Liner)</label><input${ssrRenderAttr("value", form.value.headline)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Simplifying cross-border payments."></div><div class="grid grid-cols-2 gap-6"><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Industry</label><select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white"><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>FinTech</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>HealthTech</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>AgriTech</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Logistics</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>EdTech</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Clean Energy</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>E-Commerce</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Real Estate</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Manufacturing</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Telecommunications</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Media &amp; Entertainment</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Retail</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Transportation</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Hospitality</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Cybersecurity</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Artificial Intelligence</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Software Development</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Cloud Computing</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Gaming</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Fashion &amp; Apparel</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Food &amp; Beverage</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Automotive</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Aerospace &amp; Defense</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Pharmaceuticals</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Insurance</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Banking</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Construction</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Mining</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Oil &amp; Gas</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Utilities</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Tourism</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Sports &amp; Recreation</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.industry) ? ssrLooseContain(form.value.industry, null) : ssrLooseEqual(form.value.industry, null)) ? " selected" : ""}>Beauty &amp; Wellness</option></select></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Stage</label><select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white"><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Bootstrapped</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Pre-Seed</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Seed</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Series A</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Series B+</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Series B</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Series C</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Series D</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Series E</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Series F+</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Growth Stage</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Late Stage</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Pre-IPO</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>IPO</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Private Equity</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Acquisition</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Grant Funding</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Angel Investment</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Venture Capital</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Crowdfunding</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.stage) ? ssrLooseContain(form.value.stage, null) : ssrLooseEqual(form.value.stage, null)) ? " selected" : ""}>Debt Financing</option></select></div></div><div class="grid grid-cols-2 gap-6"><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Location</label><input${ssrRenderAttr("value", form.value.location)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Lagos, Nigeria"></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Website</label><input${ssrRenderAttr("value", form.value.website)} type="url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="https://"></div></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-2">Tech Stack</label><div class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex flex-wrap gap-2 items-center focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all min-h-[46px]"><!--[-->`);
      ssrRenderList(form.value.stack, (tag, i) => {
        _push(`<span class="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-in fade-in zoom-in duration-200">${ssrInterpolate(tag)} <button type="button" class="hover:text-gray-300 focus:outline-none font-mono">×</button></span>`);
      });
      _push(`<!--]--><input${ssrRenderAttr("value", form.value.stackInput)} type="text" class="outline-none text-sm flex-grow min-w-[100px] bg-transparent" placeholder="Type &amp; Enter (e.g. Vue)..."></div><p class="text-[10px] text-gray-400 mt-1">Press Enter to add a technology.</p></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Full Description</label><textarea rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Describe the company&#39;s mission and product...">${ssrInterpolate(form.value.description)}</textarea></div><div class="flex items-center gap-3 border-t border-gray-100 pt-4"><input${ssrIncludeBooleanAttr(Array.isArray(form.value.featured) ? ssrLooseContain(form.value.featured, null) : form.value.featured) ? " checked" : ""} type="checkbox" id="feat" class="w-4 h-4 text-black rounded border-gray-300 focus:ring-black accent-black"><label for="feat" class="text-sm font-bold text-gray-900 cursor-pointer">Feature this company (Homepage)</label></div><div class="pt-4"><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">`);
      if (isLoading.value) {
        _push(`<span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isLoading.value ? "Saving..." : "Create Company")}</button></div></form></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/companies/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-DblrVXQL.mjs.map
