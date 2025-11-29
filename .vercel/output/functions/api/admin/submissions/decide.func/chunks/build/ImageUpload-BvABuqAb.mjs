import { defineComponent, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { j as useRuntimeConfig } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ImageUpload",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    label: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const config = useRuntimeConfig();
    const isUploading = ref(false);
    ref(null);
    config.public.cloudinaryCloudName;
    config.public.cloudinaryUploadPreset;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (__props.label) {
        _push(`<label class="block text-xs font-bold uppercase text-gray-500 mb-2">${ssrInterpolate(__props.label)}</label>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.modelValue) {
        _push(`<div class="relative group"><img${ssrRenderAttr("src", __props.modelValue)} class="w-full h-48 object-cover rounded-lg border border-gray-200"><button class="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        _push(`<div class="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">`);
        if (isUploading.value) {
          _push(`<div class="text-blue-600 flex flex-col items-center"><div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2"></div><span class="text-xs font-bold uppercase">Uploading...</span></div>`);
        } else {
          _push(`<div class="text-gray-400 flex flex-col items-center"><svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg><span class="text-xs font-bold uppercase">Click to Upload Image</span></div>`);
        }
        _push(`<input type="file" accept="image/*" class="hidden"></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ImageUpload.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main, { __name: "ImageUpload" });

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ImageUpload-BvABuqAb.mjs.map
