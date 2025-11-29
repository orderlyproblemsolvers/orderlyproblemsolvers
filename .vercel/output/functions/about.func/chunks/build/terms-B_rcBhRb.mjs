import { _ as __nuxt_component_0, a as __nuxt_component_2 } from './AppFooter-BXJkxf95.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import './server.mjs';
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
import 'vue-router';
import '@unhead/addons';
import '@unhead/schema-org/vue';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import 'tailwind-variants';

const lastUpdated = "October 24, 2025";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "terms",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "acceptance", label: "1. Acceptance" },
      { id: "directory", label: "2. Directory Rules" },
      { id: "content", label: "3. User Content" },
      { id: "ip", label: "4. Intellectual Property" },
      { id: "studio", label: "5. OPS Studio" },
      { id: "termination", label: "6. Termination" },
      { id: "liability", label: "7. Liability" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900"><div class="bg-gray-50 border-b border-gray-200 pt-32 pb-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Legal Documentation</p><h1 class="text-4xl md:text-6xl font-black tracking-tighter mb-6">Terms of Service.</h1><p class="text-gray-500 text-sm font-mono">Last Updated: ${ssrInterpolate(lastUpdated)}</p></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"><div class="hidden lg:block lg:col-span-3 sticky top-32"><h4 class="text-xs font-black uppercase tracking-widest mb-6">Table of Contents</h4><ul class="space-y-3 border-l-2 border-gray-100 pl-4"><!--[-->`);
      ssrRenderList(sections, (section) => {
        _push(`<li><a${ssrRenderAttr("href", `#${section.id}`)} class="text-sm font-medium text-gray-500 hover:text-black hover:underline decoration-gray-300 underline-offset-4 transition-all">${ssrInterpolate(section.label)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="lg:col-span-8 lg:col-start-5 prose prose-lg prose-gray max-w-none"><section id="acceptance" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">1. Acceptance of Terms</h2><p> By accessing and using the Orderly Problem Solvers (&quot;OPS&quot;) website, directory, or services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services. </p></section><section id="directory" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">2. Directory Listing Rules</h2><p> OPS aims to maintain a high-quality index of verified problem solvers. By submitting your profile or company to the directory, you agree that: </p><ul class="list-disc pl-5 space-y-2 mb-4"><li>All information provided is accurate, current, and not misleading.</li><li>You have the authority to represent the company or entity you are listing.</li><li>You will not use the directory for spam, harassment, or illegal activities.</li></ul><div class="p-4 bg-red-50 border border-red-100 rounded-lg text-red-800 text-sm font-medium"><strong>Notice:</strong> We reserve the right to reject, edit, or remove any listing at our sole discretion if it violates our quality standards or these terms. </div></section><section id="content" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">3. User Generated Content</h2><p> You retain ownership of the content you submit (e.g., bios, logos, project descriptions). However, by submitting content to OPS, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content in connection with the OPS Platform. </p></section><section id="ip" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">4. Intellectual Property</h2><p> The OPS brand, logo, website design, &quot;The Journal&quot; editorial content, and the underlying code of the platform are the exclusive property of Orderly Problem Solvers. You agree not to copy, distribute, or create derivative works from our intellectual property without explicit permission. </p></section><section id="studio" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">5. OPS Studio Services</h2><p> Engagements with <strong>OPS Studio</strong> (our design and development agency) are governed by separate Master Services Agreements (MSA) and Statements of Work (SOW). These Terms of Service apply primarily to the use of the public platform and directory. </p></section><section id="termination" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">6. Termination</h2><p> We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. </p></section><section id="liability" class="scroll-mt-32"><h2 class="text-2xl font-bold mb-4">7. Limitation of Liability</h2><p> In no event shall OPS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service. </p></section></div></div></div></div>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/legal/terms.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=terms-B_rcBhRb.mjs.map
