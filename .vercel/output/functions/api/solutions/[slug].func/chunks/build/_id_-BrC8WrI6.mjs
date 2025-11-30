import { _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './ImageUpload-BvABuqAb.mjs';
import { defineComponent, ref, withAsyncContext, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { u as useFetch } from './fetch-93bQWxTs.mjs';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRouter();
    const route = useRoute();
    const id = route.params.id;
    const isLoading = ref(false);
    const { data: existingData, pending } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/admin/people/${id}`, "$MD35R5tpwp")), __temp = await __temp, __restore(), __temp);
    const { data: companies } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/companies", "$RZcCfncViv")), __temp = await __temp, __restore(), __temp);
    const form = ref({
      name: "",
      slug: "",
      role: "",
      bio: "",
      location: "",
      // Contact Info
      email: "",
      website: "",
      companyId: null,
      avatar: "",
      featured: false,
      status: "approved",
      // Stack
      stack: [],
      stackInput: ""
    });
    watch(existingData, (newData) => {
      if (newData) {
        form.value = {
          ...form.value,
          ...newData,
          // Ensure nulls are handled for fields that might be missing
          email: newData.email || "",
          website: newData.website || "",
          stack: newData.stack || [],
          stackInput: ""
        };
      }
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ImageUpload = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-2xl mx-auto" }, _attrs))}><div class="flex items-center justify-between mb-8"><h1 class="text-2xl font-black text-gray-900">Edit Person</h1><div class="flex gap-3">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/people",
        class: "px-4 py-2 text-sm font-bold text-gray-500 hover:text-black"
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
      _push(`<button${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50">${ssrInterpolate(isLoading.value ? "Saving..." : "Save Changes")}</button></div></div>`);
      if (unref(pending)) {
        _push(`<div class="py-20 text-center"><div class="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div></div>`);
      } else {
        _push(`<form class="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm"><div class="grid grid-cols-2 gap-6"><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label><input${ssrRenderAttr("value", form.value.name)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors"></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Slug</label><input${ssrRenderAttr("value", form.value.slug)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-gray-50"></div></div><div>`);
        _push(ssrRenderComponent(_component_ImageUpload, {
          modelValue: form.value.avatar,
          "onUpdate:modelValue": ($event) => form.value.avatar = $event,
          label: "Profile Picture"
        }, null, _parent));
        _push(`</div><div class="grid grid-cols-2 gap-6"><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Role / Title</label><input${ssrRenderAttr("value", form.value.role)} type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors"></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Company</label><select class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(form.value.companyId) ? ssrLooseContain(form.value.companyId, null) : ssrLooseEqual(form.value.companyId, null)) ? " selected" : ""}>Freelance / Unemployed</option><!--[-->`);
        ssrRenderList(unref(companies), (comp) => {
          _push(`<option${ssrRenderAttr("value", comp.id)}${ssrIncludeBooleanAttr(Array.isArray(form.value.companyId) ? ssrLooseContain(form.value.companyId, comp.id) : ssrLooseEqual(form.value.companyId, comp.id)) ? " selected" : ""}>${ssrInterpolate(comp.name)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="grid grid-cols-2 gap-6"><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Email (Public)</label><input${ssrRenderAttr("value", form.value.email)} type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="contact@example.com"></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Website / Portfolio</label><input${ssrRenderAttr("value", form.value.website)} type="url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="https://"></div></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Location</label><input${ssrRenderAttr("value", form.value.location)} type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors"></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-2">Skills / Stack</label><div class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex flex-wrap gap-2 items-center focus-within:border-black transition-all min-h-[46px]"><!--[-->`);
        ssrRenderList(form.value.stack, (tag, i) => {
          _push(`<span class="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">${ssrInterpolate(tag)} <button type="button" class="hover:text-gray-300">×</button></span>`);
        });
        _push(`<!--]--><input${ssrRenderAttr("value", form.value.stackInput)} type="text" class="outline-none text-sm flex-grow min-w-[100px] bg-transparent" placeholder="Type &amp; Enter..."></div></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Short Bio</label><textarea rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors">${ssrInterpolate(form.value.bio)}</textarea></div><div class="border-t border-gray-100 pt-4 space-y-3"><div class="flex items-center gap-3"><input${ssrIncludeBooleanAttr(Array.isArray(form.value.featured) ? ssrLooseContain(form.value.featured, null) : form.value.featured) ? " checked" : ""} type="checkbox" id="feat" class="w-4 h-4 text-black rounded border-gray-300 focus:ring-black accent-black"><label for="feat" class="text-sm font-bold text-gray-900 cursor-pointer">Featured Solver</label></div><div class="flex items-center gap-3"><label class="text-sm font-bold text-gray-500">Status:</label><select class="px-2 py-1 border border-gray-300 rounded text-xs font-bold uppercase"><option value="pending"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "pending") : ssrLooseEqual(form.value.status, "pending")) ? " selected" : ""}>Pending</option><option value="approved"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "approved") : ssrLooseEqual(form.value.status, "approved")) ? " selected" : ""}>Approved</option><option value="rejected"${ssrIncludeBooleanAttr(Array.isArray(form.value.status) ? ssrLooseContain(form.value.status, "rejected") : ssrLooseEqual(form.value.status, "rejected")) ? " selected" : ""}>Rejected</option></select></div></div></form>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/people/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-BrC8WrI6.mjs.map
