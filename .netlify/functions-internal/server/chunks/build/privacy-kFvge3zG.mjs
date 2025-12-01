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
import 'vue-router';
import '@unhead/addons';
import '@unhead/schema-org/vue';

const lastUpdated = "October 24, 2025";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "privacy",
  __ssrInlineRender: true,
  setup(__props) {
    const sections = [
      { id: "introduction", label: "1. Introduction" },
      { id: "data-collection", label: "2. Data Collection" },
      { id: "usage", label: "3. How We Use Data" },
      { id: "sharing", label: "4. Data Sharing" },
      { id: "security", label: "5. Security" },
      { id: "rights", label: "6. Your Rights" },
      { id: "contact", label: "7. Contact Us" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppHeader = __nuxt_component_0;
      const _component_AppFooter = __nuxt_component_2;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_AppHeader, null, null, _parent));
      _push(`<div class="min-h-screen bg-white font-sans text-gray-900"><div class="bg-gray-50 border-b border-gray-200 pt-32 pb-16"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Legal Documentation</p><h1 class="text-4xl md:text-6xl font-black tracking-tighter mb-6">Privacy Policy.</h1><p class="text-gray-500 text-sm font-mono">Last Updated: ${ssrInterpolate(lastUpdated)}</p></div></div><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"><div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"><div class="hidden lg:block lg:col-span-3 sticky top-32"><h4 class="text-xs font-black uppercase tracking-widest mb-6">Table of Contents</h4><ul class="space-y-3 border-l-2 border-gray-100 pl-4"><!--[-->`);
      ssrRenderList(sections, (section) => {
        _push(`<li><a${ssrRenderAttr("href", `#${section.id}`)} class="text-sm font-medium text-gray-500 hover:text-black hover:underline decoration-gray-300 underline-offset-4 transition-all">${ssrInterpolate(section.label)}</a></li>`);
      });
      _push(`<!--]--></ul></div><div class="lg:col-span-8 lg:col-start-5 prose prose-lg prose-gray max-w-none"><section id="introduction" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">1. Introduction</h2><p> Orderly Problem Solvers (&quot;OPS&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the OPS Platform, Directory, and Studio. We are committed to protecting your personal information and your right to privacy. </p><p> This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, submit a profile to our directory, or engage our studio services. </p></section><section id="data-collection" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">2. Information We Collect</h2><p>We collect information that you voluntarily provide to us when you:</p><ul class="list-disc pl-5 space-y-2 mb-6"><li>Register on the OPS Platform.</li><li>Submit a Solution, Company, or Personal Profile.</li><li>Subscribe to the OPS Journal newsletter.</li><li>Contact us regarding OPS Studio services.</li></ul><h3 class="text-lg font-bold mb-2">Publicly Visible Data</h3><p> Please note that if you submit a profile to the <strong>OPS Directory</strong>, the information you provide (Name, Role, Bio, Tech Stack, Social Links) is intended for public consumption and will be visible to all visitors of the site. </p></section><section id="usage" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">3. How We Use Your Information</h2><p>We use the information we collect or receive:</p><ul class="list-disc pl-5 space-y-2"><li>To facilitate account creation and logon processes.</li><li>To verify the authenticity of &quot;Solvers&quot; listed in our directory.</li><li>To send you editorial updates (if subscribed).</li><li>To connect you with potential partners or investors (with your consent).</li><li>To improve the UX/UI of our platform through analytics.</li></ul></section><section id="sharing" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">4. Sharing Your Information</h2><p> We do not sell your personal data. We may share information in specific situations, such as: </p><div class="bg-gray-50 p-6 rounded-lg border border-gray-200 my-6"><p class="font-bold text-sm mb-2">Business Transfers</p><p class="text-sm text-gray-600">We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</p></div></section><section id="security" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">5. Security of Your Information</h2><p> We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse. </p></section><section id="rights" class="mb-16 scroll-mt-32"><h2 class="text-2xl font-bold mb-4">6. Your Privacy Rights</h2><p> Depending on your location (e.g., GDPR for Europe, NDPR for Nigeria), you may have the right to access, correct, or delete the personal information we collect. </p><p> To request a deletion of your Directory Profile, please email <a href="mailto:privacy@ops.com" class="text-blue-600 underline">privacy@ops.com</a>. </p></section><section id="contact" class="scroll-mt-32"><h2 class="text-2xl font-bold mb-4">7. Contact Us</h2><p class="mb-4"> If you have questions or comments about this policy, you may email us at <a href="mailto:legal@ops.com" class="text-blue-600 underline">legal@ops.com</a> or by post to: </p><address class="not-italic bg-gray-900 text-white p-6 rounded-xl inline-block"><strong>Orderly Problem Solvers</strong><br> 123 Innovation Way,<br> Abuja, Nigeria. </address></section></div></div></div></div>`);
      _push(ssrRenderComponent(_component_AppFooter, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/legal/privacy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacy-kFvge3zG.mjs.map
