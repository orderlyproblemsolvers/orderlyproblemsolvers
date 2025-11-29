import { _ as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './ImageUpload-BvABuqAb.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useRouter } from 'vue-router';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RichEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editor = useEditor({
      content: props.modelValue,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: { class: "text-blue-600 underline cursor-pointer" }
        })
      ],
      editorProps: {
        attributes: {
          class: "prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[400px] max-w-none p-6"
        }
      },
      onUpdate: () => {
        emit("update:modelValue", editor.value?.getHTML());
      }
    });
    watch(() => props.modelValue, (newValue) => {
      const isSame = editor.value?.getHTML() === newValue;
      if (isSame) return;
      editor.value?.commands.setContent(newValue, false);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-shadow" }, _attrs))}>`);
      if (unref(editor)) {
        _push(`<div class="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50 overflow-x-auto"><button class="${ssrRenderClass([{ "bg-gray-200 text-black": unref(editor).isActive("bold") }, "p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase min-w-[32px]"])}" title="Bold">B</button><button class="${ssrRenderClass([{ "bg-gray-200 text-black": unref(editor).isActive("italic") }, "p-2 rounded hover:bg-gray-200 text-gray-500 font-serif italic text-xs min-w-[32px]"])}" title="Italic">I</button><div class="w-px h-4 bg-gray-300 mx-1"></div><button class="${ssrRenderClass([{ "bg-gray-200 text-black": unref(editor).isActive("heading", { level: 2 }) }, "p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase"])}">H2</button><button class="${ssrRenderClass([{ "bg-gray-200 text-black": unref(editor).isActive("heading", { level: 3 }) }, "p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase"])}">H3</button><div class="w-px h-4 bg-gray-300 mx-1"></div><button class="${ssrRenderClass([{ "bg-gray-200 text-black": unref(editor).isActive("bulletList") }, "p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase"])}">List</button><button class="${ssrRenderClass([{ "bg-gray-200 text-black": unref(editor).isActive("blockquote") }, "p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase"])}">Quote</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(EditorContent), { editor: unref(editor) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/RichEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "RichEditor" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const isLoading = ref(false);
    const form = ref({
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      category: "Spotlight",
      readTime: "5 min read",
      coverImage: "",
      // 1. AUTHOR: Simple Text Input
      authorName: "OPS Admin",
      // 2. FEATURED ENTITIES: Arrays of IDs
      featuredCompanyIds: [],
      featuredPersonIds: [],
      isPublished: true
    });
    const displayCompanies = ref([]);
    const displayPeople = ref([]);
    const companySearch = ref("");
    const companyResults = ref([]);
    const showCompanyList = ref(false);
    const personSearch = ref("");
    const personResults = ref([]);
    const showPersonList = ref(false);
    watch(() => form.value.title, (newVal) => {
      form.value.slug = newVal.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_ImageUpload = __nuxt_component_1;
      const _component_RichEditor = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-6xl mx-auto pb-20" }, _attrs))}><div class="flex items-center justify-between mb-8"><h1 class="text-3xl font-black text-gray-900 tracking-tight">Write Story</h1><div class="flex gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/admin/dashboard",
        class: "px-4 py-2 text-sm font-bold text-gray-500 hover:text-black transition-colors"
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
      _push(`<button${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2">`);
      if (isLoading.value) {
        _push(`<span class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(` ${ssrInterpolate(isLoading.value ? "Publishing..." : "Publish Story")}</button></div></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-4 space-y-6 order-last lg:order-first"><div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">`);
      _push(ssrRenderComponent(_component_ImageUpload, {
        modelValue: form.value.coverImage,
        "onUpdate:modelValue": ($event) => form.value.coverImage = $event,
        label: "Cover Image"
      }, null, _parent));
      _push(`</div><div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6"><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label><select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm bg-white h-10"><option${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, null) : ssrLooseEqual(form.value.category, null)) ? " selected" : ""}>Spotlight</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, null) : ssrLooseEqual(form.value.category, null)) ? " selected" : ""}>Case Studies</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, null) : ssrLooseEqual(form.value.category, null)) ? " selected" : ""}>Market Watch</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, null) : ssrLooseEqual(form.value.category, null)) ? " selected" : ""}>Engineering</option><option${ssrIncludeBooleanAttr(Array.isArray(form.value.category) ? ssrLooseContain(form.value.category, null) : ssrLooseEqual(form.value.category, null)) ? " selected" : ""}>Opinion</option></select></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Author Name</label><input${ssrRenderAttr("value", form.value.authorName)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm" placeholder="e.g. OPS Admin"></div><div class="relative"><label class="block text-xs font-bold uppercase text-gray-500 mb-2">Featured Companies</label>`);
      if (displayCompanies.value.length > 0) {
        _push(`<div class="flex flex-wrap gap-2 mb-3"><!--[-->`);
        ssrRenderList(displayCompanies.value, (c, i) => {
          _push(`<div class="bg-blue-50 text-blue-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-blue-100">${ssrInterpolate(c.name)} <button class="hover:text-red-600 ml-1 font-black">×</button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", companySearch.value)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm" placeholder="Search to add company...">`);
      if (showCompanyList.value && companyResults.value.length > 0) {
        _push(`<div class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto"><!--[-->`);
        ssrRenderList(companyResults.value, (comp) => {
          _push(`<div class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"><p class="text-sm font-bold text-gray-900">${ssrInterpolate(comp.name)}</p><p class="text-[10px] text-gray-500 truncate">${ssrInterpolate(comp.info)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative"><label class="block text-xs font-bold uppercase text-gray-500 mb-2">Featured People</label>`);
      if (displayPeople.value.length > 0) {
        _push(`<div class="flex flex-wrap gap-2 mb-3"><!--[-->`);
        ssrRenderList(displayPeople.value, (p, i) => {
          _push(`<div class="bg-purple-50 text-purple-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-purple-100">${ssrInterpolate(p.name)} <button class="hover:text-red-600 ml-1 font-black">×</button></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<input${ssrRenderAttr("value", personSearch.value)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm" placeholder="Search to add person...">`);
      if (showPersonList.value && personResults.value.length > 0) {
        _push(`<div class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto"><!--[-->`);
        ssrRenderList(personResults.value, (person) => {
          _push(`<div class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"><p class="text-sm font-bold text-gray-900">${ssrInterpolate(person.name)}</p><p class="text-[10px] text-gray-500 truncate">${ssrInterpolate(person.info)}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-1">Read Time</label><input${ssrRenderAttr("value", form.value.readTime)} type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm" placeholder="e.g. 5 min read"></div></div></div><div class="lg:col-span-8 space-y-6"><div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6"><div><input${ssrRenderAttr("value", form.value.title)} type="text" class="w-full py-2 border-none focus:ring-0 text-3xl md:text-4xl font-black placeholder-gray-300 outline-none text-gray-900" placeholder="Enter Title Here..."></div><div class="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2 rounded border border-gray-100"><span class="font-bold uppercase tracking-wider">URL SLUG:</span><span class="font-mono text-gray-600">/stories/${ssrInterpolate(form.value.slug)}</span></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-2">Excerpt</label><textarea rows="2" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black outline-none text-sm leading-relaxed resize-none transition-colors" placeholder="A short summary that appears on the card...">${ssrInterpolate(form.value.excerpt)}</textarea></div><div><label class="block text-xs font-bold uppercase text-gray-500 mb-2">Story Content</label>`);
      _push(ssrRenderComponent(_component_RichEditor, {
        modelValue: form.value.content,
        "onUpdate:modelValue": ($event) => form.value.content = $event
      }, null, _parent));
      _push(`</div></div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/stories/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-CXdBaCei.mjs.map
