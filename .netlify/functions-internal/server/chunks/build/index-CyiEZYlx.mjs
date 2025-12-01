import { defineComponent, withAsyncContext, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { u as useFetch } from './fetch-aglCyMKr.mjs';
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
import '@vue/shared';
import './server.mjs';
import 'vue-router';
import '@unhead/addons';
import '@unhead/schema-org/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: pendingItems, refresh, status, error } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/admin/submissions/pending", "$qr0ztwYfaN")), __temp = await __temp, __restore(), __temp);
    const processingId = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-5xl mx-auto" }, _attrs))}><div class="flex items-center justify-between mb-8"><div><h1 class="text-3xl font-black tracking-tight text-gray-900 mb-1">Incoming Queue</h1><p class="text-sm text-gray-500">Review and verify community submissions.</p></div><div class="bg-white px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold shadow-sm">${ssrInterpolate(unref(pendingItems)?.length || 0)} Pending </div></div>`);
      if (unref(status) === "pending") {
        _push(`<div class="space-y-4"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="h-48 bg-gray-100 rounded-xl animate-pulse border border-gray-200"></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (unref(error)) {
        _push(`<div class="p-8 bg-red-50 text-red-600 rounded-xl border border-red-100"><p class="font-bold">Failed to load submissions.</p><p class="text-sm mt-1">${ssrInterpolate(unref(error).message)}</p></div>`);
      } else if (!unref(pendingItems) || unref(pendingItems).length === 0) {
        _push(`<div class="py-24 text-center bg-white rounded-xl border border-dashed border-gray-300"><div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><p class="text-gray-900 font-bold text-lg">All caught up!</p><p class="text-sm text-gray-500">No pending submissions waiting for review.</p></div>`);
      } else {
        _push(`<div class="space-y-6"><!--[-->`);
        ssrRenderList(unref(pendingItems), (item) => {
          _push(`<div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-blue-200 group"><div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-100"><div class="flex items-center gap-3"><span class="${ssrRenderClass([item.type === "company" ? "bg-blue-50 text-blue-700 border-blue-100" : "bg-purple-50 text-purple-700 border-purple-100", "px-2.5 py-1 text-[10px] font-bold uppercase rounded border tracking-wider"])}">${ssrInterpolate(item.type)}</span><span class="text-xs font-mono text-gray-400"> ID: #${ssrInterpolate(item.id)}</span></div><span class="text-xs font-bold text-gray-400">${ssrInterpolate(new Date(item.createdAt).toLocaleDateString())}</span></div><div class="grid grid-cols-1 md:grid-cols-12 gap-6"><div class="md:col-span-8"><h3 class="text-xl font-black text-gray-900 mb-1">${ssrInterpolate(item.name)}</h3><p class="text-sm font-bold text-gray-500 mb-4">${ssrInterpolate(item.info)}</p><div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 leading-relaxed border border-gray-100 font-medium"> &quot;${ssrInterpolate(item.description)}&quot; </div></div><div class="md:col-span-4 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6"><button${ssrIncludeBooleanAttr(processingId.value === item.id) ? " disabled" : ""} class="w-full py-3 bg-black text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
          if (processingId.value === item.id) {
            _push(`<span class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>`);
          } else {
            _push(`<!---->`);
          }
          _push(` Approve &amp; Publish </button><button${ssrIncludeBooleanAttr(processingId.value === item.id) ? " disabled" : ""} class="w-full py-3 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50"> Reject </button></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/submissions/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-CyiEZYlx.mjs.map
