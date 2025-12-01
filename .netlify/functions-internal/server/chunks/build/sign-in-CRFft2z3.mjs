import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
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
  __name: "sign-in",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    useRoute();
    const isLoading = ref(false);
    const errorMsg = ref("");
    const form = ref({
      email: "",
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 px-4" }, _attrs))}><div class="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-8"><div class="text-center mb-8"><div class="w-10 h-10 bg-black rounded-full mx-auto mb-4"></div><h1 class="text-xl font-black tracking-tight text-gray-900 mb-2"> OPS Admin. </h1><p class="text-xs text-gray-500 font-mono"> Authorized Personnel Only. </p></div><form class="space-y-4"><div><label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Email</label><input${ssrRenderAttr("value", form.value.email)} type="email" required class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-black focus:outline-none transition-colors bg-gray-50 focus:bg-white" placeholder="admin@ops.com"></div><div><label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Password</label><input${ssrRenderAttr("value", form.value.password)} type="password" required class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-black focus:outline-none transition-colors bg-gray-50 focus:bg-white" placeholder="••••••••"></div>`);
      if (errorMsg.value) {
        _push(`<div class="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">${ssrInterpolate(errorMsg.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="w-full py-3 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">${ssrInterpolate(isLoading.value ? "Authenticating..." : "Enter Dashboard")}</button></form><div class="mt-8 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "text-xs font-bold text-gray-400 hover:text-black transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` ← Back to Platform `);
          } else {
            return [
              createTextVNode(" ← Back to Platform ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/sign-in.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=sign-in-CRFft2z3.mjs.map
