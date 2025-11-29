import { _ as __nuxt_component_0 } from './NuxtImg-lyvydNNu.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { y as publicAssetsURL } from '../_/nitro.mjs';
import './server.mjs';
import 'vue-router';
import '@unhead/addons';
import 'unhead/plugins';
import '@unhead/schema-org/vue';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import 'tailwind-variants';
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
import 'unhead/utils';
import 'vue-bundle-renderer/runtime';
import '@iconify/utils';
import 'node:crypto';
import 'xss';

const _imports_0 = publicAssetsURL("/img/logo-sm.png");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OpsTemplate",
  __ssrInlineRender: true,
  props: {
    title: { default: "Orderly Problem Solvers" },
    description: { default: "The definitive index of the problem-solving economy." },
    image: {},
    type: { default: "General" },
    role: {},
    companyName: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "width": "100%", "height": "100%", "display": "flex", "flex-direction": "column", "background-color": "#ffffff", "position": "relative", "overflow": "hidden" } }, _attrs))}><div style="${ssrRenderStyle({ "position": "absolute", "top": "0", "left": "0", "right": "0", "bottom": "0", "background-image": "radial-gradient(#e5e7eb 1px, transparent 1px)", "background-size": "40px 40px", "opacity": "0.8" })}"></div><div style="${ssrRenderStyle({ "position": "absolute", "top": "-150px", "right": "-150px", "width": "700px", "height": "700px", "background": "radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, rgba(255,255,255,0) 70%)", "border-radius": "50%" })}"></div><div style="${ssrRenderStyle({ "position": "absolute", "bottom": "-150px", "left": "-150px", "width": "600px", "height": "600px", "background": "radial-gradient(circle, rgba(147, 51, 234, 0.05) 0%, rgba(255,255,255,0) 70%)", "border-radius": "50%" })}"></div><div style="${ssrRenderStyle({ "flex": "1", "display": "flex", "flex-direction": "column", "justify-content": "center", "padding": "0 80px", "gap": "32px", "position": "relative", "z-index": "10" })}">`);
      if (__props.type === "Story") {
        _push(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "24px" })}"><h1 style="${ssrRenderStyle({ "font-size": "70px", "font-weight": "900", "letter-spacing": "-0.03em", "line-height": "1.1", "color": "#000000", "margin": "0" })}">${ssrInterpolate(__props.title)}</h1><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "20px" })}"><div style="${ssrRenderStyle({ "width": "6px", "height": "60px", "background-color": "#2563eb" })}"></div><p style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "500", "color": "#4b5563", "line-height": "1.4", "max-width": "900px", "margin": "0" })}">${ssrInterpolate(__props.description)}</p></div></div>`);
      } else if (__props.type === "Person") {
        _push(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "48px" })}">`);
        if (__props.image) {
          _push(`<div style="${ssrRenderStyle({ "display": "flex", "position": "relative" })}">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: __props.image,
            width: "220",
            height: "220",
            style: {
              objectFit: "cover",
              borderRadius: "50%",
              border: "6px solid white",
              boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)"
            }
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "12px" })}"><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "16px" })}"><h1 style="${ssrRenderStyle({ "font-size": "72px", "font-weight": "900", "letter-spacing": "-0.04em", "color": "#000000", "margin": "0", "line-height": "1" })}">${ssrInterpolate(__props.title)}</h1><svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#2563eb"></circle><path d="M8 12L11 15L16 9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "16px" })}"><p style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "600", "color": "#4b5563", "margin": "0" })}">${ssrInterpolate(__props.role)}</p>`);
        if (__props.companyName) {
          _push(`<p style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "400", "color": "#9ca3af", "margin": "0" })}"> at <span style="${ssrRenderStyle({ "color": "#2563eb", "font-weight": "600" })}">${ssrInterpolate(__props.companyName)}</span></p>`);
        } else {
          _push(`<div style="${ssrRenderStyle({ "padding": "6px 16px", "background-color": "#f3f4f6", "border-radius": "8px", "display": "flex" })}"><span style="${ssrRenderStyle({ "font-size": "20px", "font-weight": "700", "color": "#6b7280", "text-transform": "uppercase", "letter-spacing": "0.05em" })}">Freelance</span></div>`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "48px" })}">`);
        if (__props.image) {
          _push(`<div style="${ssrRenderStyle({ "display": "flex" })}">`);
          _push(ssrRenderComponent(_component_NuxtImg, {
            src: __props.image,
            width: "200",
            height: "200",
            style: {
              objectFit: "cover",
              borderRadius: "32px",
              border: "6px solid white",
              boxShadow: "0 20px 40px -5px rgba(0, 0, 0, 0.1)"
            }
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div style="${ssrRenderStyle({ "display": "flex", "flex-direction": "column", "gap": "16px" })}"><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "16px" })}"><h1 style="${ssrRenderStyle({ "font-size": "72px", "font-weight": "900", "letter-spacing": "-0.04em", "color": "#000000", "margin": "0", "line-height": "1" })}">${ssrInterpolate(__props.title)}</h1><svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#2563eb"></circle><path d="M8 12L11 15L16 9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div><p style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "500", "color": "#6b7280", "margin": "0", "max-width": "800px", "line-height": "1.3" })}">${ssrInterpolate(__props.description)}</p></div></div>`);
      }
      _push(`</div><div style="${ssrRenderStyle({ "display": "flex", "justify-content": "space-between", "align-items": "flex-end", "padding": "0 80px 60px 80px", "margin-top": "auto" })}"><span style="${ssrRenderStyle({ "font-size": "28px", "color": "#9ca3af", "font-weight": "600", "letter-spacing": "-0.02em" })}"> orderlyproblemsolvers.com </span><div style="${ssrRenderStyle({ "display": "flex", "align-items": "center", "gap": "16px" })}"><span style="${ssrRenderStyle({ "font-size": "32px", "font-weight": "900", "letter-spacing": "-0.05em", "color": "#111827", "text-transform": "uppercase" })}">OPS Index.</span><img${ssrRenderAttr("src", _imports_0)} width="80" height="80" style="${ssrRenderStyle({ "object-fit": "contain" })}"></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OgImage/OpsTemplate.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const OpsTemplate = Object.assign(_sfc_main, { __name: "OgImageOpsTemplate" });

export { OpsTemplate as default };
//# sourceMappingURL=OpsTemplate-w0H_Ps2P.mjs.map
