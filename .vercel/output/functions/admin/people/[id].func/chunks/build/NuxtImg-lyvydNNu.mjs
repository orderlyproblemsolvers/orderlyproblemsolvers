import { computed, ref, useAttrs, useTemplateRef, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { a3 as defu, aq as withLeadingSlash, a6 as hasProtocol, a1 as joinURL, X as parseURL, ay as encodePath } from '../_/nitro.mjs';
import { u as useHead$1, b as useNuxtApp, j as useRuntimeConfig } from './server.mjs';

async function imageMeta(_ctx, url) {
  const meta = await _imageMeta(url).catch((err) => {
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await import('image-meta').then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta;
  }
}
function createMapper(map) {
  return ((key) => key !== void 0 ? map[key] || key : map.missingValue);
}
function createOperationsGenerator(config = {}) {
  const formatter = config.formatter;
  const keyMap = config.keyMap && typeof config.keyMap !== "function" ? createMapper(config.keyMap) : config.keyMap;
  const map = {};
  for (const key in config.valueMap) {
    const valueKey = key;
    const value = config.valueMap[valueKey];
    map[valueKey] = typeof value === "object" ? createMapper(value) : value;
  }
  return (modifiers) => {
    const operations = [];
    for (const _key in modifiers) {
      const key = _key;
      if (typeof modifiers[key] === "undefined") {
        continue;
      }
      const value = typeof map[key] === "function" ? map[key](modifiers[key]) : modifiers[key];
      operations.push([keyMap ? keyMap(key) : key, value]);
    }
    if (formatter) {
      return operations.map((entry) => formatter(...entry)).join(config.joinWith ?? "&");
    }
    return new URLSearchParams(operations).toString();
  };
}
function parseDensities(input = "") {
  if (input === void 0 || !input.length) {
    return [];
  }
  const densities = /* @__PURE__ */ new Set();
  for (const density of input.split(" ")) {
    const d = Number.parseInt(density.replace("x", ""));
    if (d) {
      densities.add(d);
    }
  }
  return Array.from(densities);
}
function checkDensities(densities) {
  if (densities.length === 0) {
    throw new Error("`densities` must not be empty, configure to `1` to render regular size only (DPR 1.0)");
  }
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return Number.parseInt(input, 10);
    }
  }
}
function parseSizes(input) {
  const sizes = {};
  if (typeof input === "string") {
    for (const entry of input.split(/[\s,]+/).filter((e) => e)) {
      const s = entry.split(":");
      if (s.length !== 2) {
        sizes["1px"] = s[0].trim();
      } else {
        sizes[s[0].trim()] = s[1].trim();
      }
    }
  } else {
    Object.assign(sizes, input);
  }
  return sizes;
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = ((input, modifiers, options) => getImage(input, defu({ modifiers }, options)).url);
  for (const presetName in globalOptions.presets) {
    $img[presetName] = ((source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options }));
  }
  $img.options = globalOptions;
  $img.getImage = getImage;
  $img.getMeta = ((input, options) => getMeta(ctx, input, options));
  $img.getSizes = ((input, options) => getSizes(ctx, input, options));
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  if (input && typeof input !== "string") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (!input || input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { setup, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const provider = setup();
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        const alias = ctx.options.alias[base];
        if (alias) {
          input = joinURL(alias, input.slice(base.length));
        }
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  const resolvedOptions = {
    ..._options,
    modifiers: {
      ..._options.modifiers,
      width: _options.modifiers?.width ? parseSize(_options.modifiers.width) : void 0,
      height: _options.modifiers?.height ? parseSize(_options.modifiers.height) : void 0
    }
  };
  const image = provider.getImage(input, resolvedOptions, ctx);
  image.format ||= resolvedOptions.modifiers.format || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  const preset = getPreset(ctx, opts.preset);
  const merged = defu(opts, preset);
  const width = parseSize(merged.modifiers?.width);
  const height = parseSize(merged.modifiers?.height);
  const sizes = merged.sizes ? parseSizes(merged.sizes) : {};
  const _densities = merged.densities?.trim();
  const densities = _densities ? parseDensities(_densities) : ctx.options.densities;
  checkDensities(densities);
  const hwRatio = width && height ? height / width : 0;
  const sizeVariants = [];
  const srcsetVariants = [];
  if (Object.keys(sizes).length >= 1) {
    for (const key in sizes) {
      const variant = getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx);
      if (variant === void 0) {
        continue;
      }
      sizeVariants.push({
        size: variant.size,
        screenMaxWidth: variant.screenMaxWidth,
        media: `(max-width: ${variant.screenMaxWidth}px)`
      });
      for (const density of densities) {
        srcsetVariants.push({
          width: variant._cWidth * density,
          src: getVariantSrc(ctx, input, opts, variant, density)
        });
      }
    }
    finaliseSizeVariants(sizeVariants);
  } else {
    for (const density of densities) {
      const key = Object.keys(sizes)[0];
      let variant = key ? getSizesVariant(key, String(sizes[key]), height, hwRatio, ctx) : void 0;
      if (variant === void 0) {
        variant = {
          size: "",
          screenMaxWidth: 0,
          _cWidth: opts.modifiers?.width,
          _cHeight: opts.modifiers?.height
        };
      }
      srcsetVariants.push({
        width: density,
        src: getVariantSrc(ctx, input, opts, variant, density)
      });
    }
  }
  finaliseSrcsetVariants(srcsetVariants);
  const defaultVariant = srcsetVariants[srcsetVariants.length - 1];
  const sizesVal = sizeVariants.length ? sizeVariants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", ") : void 0;
  const suffix = sizesVal ? "w" : "x";
  const srcsetVal = srcsetVariants.map((v) => `${v.src} ${v.width}${suffix}`).join(", ");
  return {
    sizes: sizesVal,
    srcset: srcsetVal,
    src: defaultVariant?.src
  };
}
function getSizesVariant(key, size, height, hwRatio, ctx) {
  const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || Number.parseInt(key);
  const isFluid = size.endsWith("vw");
  if (!isFluid && /^\d+$/.test(size)) {
    size = size + "px";
  }
  if (!isFluid && !size.endsWith("px")) {
    return void 0;
  }
  let _cWidth = Number.parseInt(size);
  if (!screenMaxWidth || !_cWidth) {
    return void 0;
  }
  if (isFluid) {
    _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
  }
  const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
  return {
    size,
    screenMaxWidth,
    _cWidth,
    _cHeight
  };
}
function getVariantSrc(ctx, input, opts, variant, density) {
  return ctx.$img(
    input,
    {
      ...opts.modifiers,
      width: variant._cWidth ? variant._cWidth * density : void 0,
      height: variant._cHeight ? variant._cHeight * density : void 0
    },
    opts
  );
}
function finaliseSizeVariants(sizeVariants) {
  sizeVariants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  let previousMedia = null;
  for (let i = sizeVariants.length - 1; i >= 0; i--) {
    const sizeVariant = sizeVariants[i];
    if (sizeVariant.media === previousMedia) {
      sizeVariants.splice(i, 1);
    }
    previousMedia = sizeVariant.media;
  }
  for (let i = 0; i < sizeVariants.length; i++) {
    sizeVariants[i].media = sizeVariants[i + 1]?.media || "";
  }
}
function finaliseSrcsetVariants(srcsetVariants) {
  srcsetVariants.sort((v1, v2) => v1.width - v2.width);
  let previousWidth = null;
  for (let i = srcsetVariants.length - 1; i >= 0; i--) {
    const sizeVariant = srcsetVariants[i];
    if (sizeVariant.width === previousWidth) {
      srcsetVariants.splice(i, 1);
    }
    previousWidth = sizeVariant.width;
  }
}
function defineProvider(setup) {
  let result;
  return () => {
    if (result) {
      return result;
    }
    result = typeof setup === "function" ? setup() : setup;
    return result;
  };
}
const convertHexToRgbFormat = (value) => value.startsWith("#") ? value.replace("#", "rgb_") : value;
const removePathExtension = (value) => value.replace(/\.[^/.]+$/, "");
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    fit: "c",
    width: "w",
    height: "h",
    format: "f",
    quality: "q",
    background: "b",
    rotate: "a",
    roundCorner: "r",
    gravity: "g",
    effect: "e",
    color: "co",
    flags: "fl",
    dpr: "dpr",
    opacity: "o",
    overlay: "l",
    underlay: "u",
    transformation: "t",
    zoom: "z",
    colorSpace: "cs",
    customFunc: "fn",
    density: "dn",
    aspectRatio: "ar",
    blur: "e_blur"
  },
  valueMap: {
    fit: {
      fill: "fill",
      inside: "pad",
      outside: "lpad",
      cover: "lfill",
      contain: "scale",
      minCover: "mfit",
      minInside: "mpad",
      thumbnail: "thumb",
      cropping: "crop",
      coverLimit: "limit"
    },
    format: {
      jpeg: "jpg"
    },
    background(value) {
      return convertHexToRgbFormat(value);
    },
    color(value) {
      return convertHexToRgbFormat(value);
    },
    gravity: {
      auto: "auto",
      subject: "auto:subject",
      face: "face",
      sink: "sink",
      faceCenter: "face:center",
      multipleFaces: "faces",
      multipleFacesCenter: "faces:center",
      north: "north",
      northEast: "north_east",
      northWest: "north_west",
      west: "west",
      southWest: "south_west",
      south: "south",
      southEast: "south_east",
      east: "east",
      center: "center"
    }
  },
  joinWith: ",",
  formatter: (key, value) => encodePath(key.includes("_") ? `${key}:${value}` : `${key}_${value}`)
});
const defaultModifiers = {
  format: "auto",
  quality: "auto"
};
const REMOTE_MAPPING_RE = /\/image\/upload\/(.*)$/;
const cloudinaryRuntime$_45ghxgEYguZv_45mn1JE7yPL_Ad_45gS1opFNrvJKw7lVNWM = defineProvider({
  getImage: (src, { modifiers, baseURL = "/" }) => {
    const mergeModifiers = defu(modifiers, defaultModifiers);
    const operations = operationsGenerator(mergeModifiers);
    const srcMapping = src.match(REMOTE_MAPPING_RE)?.[1];
    if (srcMapping) {
      baseURL = src.replace(srcMapping, "");
      src = srcMapping;
    }
    const remoteFolderMapping = baseURL.match(REMOTE_MAPPING_RE);
    if (remoteFolderMapping && remoteFolderMapping?.length >= 1) {
      const remoteFolder = remoteFolderMapping[1];
      const baseURLWithoutRemoteFolder = baseURL.replace(remoteFolder, "");
      return {
        url: joinURL(baseURLWithoutRemoteFolder, operations, remoteFolder, src)
      };
    } else if (/\/image\/fetch\/?/.test(baseURL)) {
      src = encodePath(src);
    } else {
      src = removePathExtension(src);
    }
    return {
      url: joinURL(baseURL, operations, src)
    };
  }
});
const imageOptions = {
  ...{
    "screens": {
      "sm": 640,
      "md": 768,
      "lg": 1024,
      "xl": 1280,
      "2xl": 1536
    },
    "presets": {},
    "provider": "cloudinary",
    "domains": [
      "images.unsplash.com",
      "i.pravatar.cc",
      "res.cloudinary.com",
      "localhost:3000"
    ],
    "alias": {},
    "densities": [
      1,
      2
    ],
    "format": [
      "webp"
    ]
  },
  /** @type {"cloudinary"} */
  provider: "cloudinary",
  providers: {
    ["cloudinary"]: { setup: cloudinaryRuntime$_45ghxgEYguZv_45mn1JE7yPL_Ad_45gS1opFNrvJKw7lVNWM, defaults: { "baseURL": "https://res.cloudinary.com/..." } }
  }
};
const useImage = (event) => {
  const config = useRuntimeConfig();
  const nuxtApp = useNuxtApp();
  return nuxtApp.$img || nuxtApp._img || (nuxtApp._img = createImage({
    ...imageOptions,
    event: nuxtApp.ssrContext?.event,
    nuxt: {
      baseURL: config.app.baseURL
    },
    runtimeConfig: config
  }));
};
const useImageProps = (props) => {
  const $img = useImage();
  const providerOptions = computed(() => ({
    provider: props.provider,
    preset: props.preset
  }));
  const normalizedAttrs = computed(() => ({
    width: parseSize(props.width),
    height: parseSize(props.height),
    crossorigin: props.crossorigin === true ? "anonymous" : props.crossorigin || void 0,
    nonce: props.nonce
  }));
  const imageModifiers = computed(() => {
    return {
      ...props.modifiers,
      width: props.width,
      height: props.height,
      format: props.format,
      quality: props.quality || $img.options.quality,
      background: props.background,
      fit: props.fit
    };
  });
  return { providerOptions, normalizedAttrs, imageModifiers };
};
const _sfc_main = {
  __name: "NuxtImg",
  __ssrInlineRender: true,
  props: {
    custom: { type: Boolean, required: false },
    placeholder: { type: [Boolean, String, Number, Array], required: false },
    placeholderClass: { type: String, required: false },
    src: { type: String, required: false },
    format: { type: String, required: false },
    quality: { type: [String, Number], required: false },
    background: { type: String, required: false },
    fit: { type: String, required: false },
    modifiers: { type: Object, required: false },
    preset: { type: String, required: false },
    provider: { type: null, required: false },
    sizes: { type: [String, Object], required: false },
    densities: { type: String, required: false },
    preload: { type: [Boolean, Object], required: false },
    width: { type: [String, Number], required: false },
    height: { type: [String, Number], required: false },
    crossorigin: { type: [String, Boolean], required: false },
    nonce: { type: String, required: false }
  },
  emits: ["load", "error"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const $img = useImage();
    const { providerOptions, normalizedAttrs, imageModifiers } = useImageProps(props);
    const sizes = computed(() => $img.getSizes(props.src, {
      ...providerOptions.value,
      sizes: props.sizes,
      densities: props.densities,
      modifiers: imageModifiers.value
    }));
    const placeholderLoaded = ref(false);
    const attrs = useAttrs();
    const imgAttrs = computed(() => ({
      ...normalizedAttrs.value,
      "data-nuxt-img": "",
      ...!props.placeholder || placeholderLoaded.value ? { sizes: sizes.value.sizes, srcset: sizes.value.srcset } : {},
      ...{ onerror: "this.setAttribute('data-error', 1)" },
      ...attrs
    }));
    const placeholder = computed(() => {
      if (placeholderLoaded.value) {
        return false;
      }
      const placeholder2 = props.placeholder === "" ? [10, 10] : props.placeholder;
      if (!placeholder2) {
        return false;
      }
      if (typeof placeholder2 === "string") {
        return placeholder2;
      }
      const [width = 10, height = width, quality = 50, blur = 3] = Array.isArray(placeholder2) ? placeholder2 : typeof placeholder2 === "number" ? [placeholder2] : [];
      return $img(props.src, {
        ...imageModifiers.value,
        width,
        height,
        quality,
        blur
      }, providerOptions.value);
    });
    const mainSrc = computed(
      () => props.sizes ? sizes.value.src : $img(props.src, imageModifiers.value, providerOptions.value)
    );
    const src = computed(() => placeholder.value || mainSrc.value);
    if (props.preload) {
      const hasMultipleDensities = sizes.value.srcset.includes("x, ");
      const isResponsive = hasMultipleDensities || !!sizes.value.sizes;
      useHead$1({
        link: [{
          rel: "preload",
          as: "image",
          nonce: props.nonce,
          crossorigin: normalizedAttrs.value.crossorigin,
          href: isResponsive ? sizes.value.src : src.value,
          ...sizes.value.sizes && { imagesizes: sizes.value.sizes },
          ...hasMultipleDensities && { imagesrcset: sizes.value.srcset },
          ...typeof props.preload !== "boolean" && props.preload.fetchPriority ? { fetchpriority: props.preload.fetchPriority } : {}
        }]
      });
    }
    useNuxtApp().isHydrating;
    const imgEl = useTemplateRef("imgEl");
    __expose({ imgEl });
    return (_ctx, _push, _parent, _attrs) => {
      if (!__props.custom) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "imgEl",
          ref: imgEl,
          class: placeholder.value ? __props.placeholderClass : void 0
        }, imgAttrs.value, { src: src.value }, _attrs))}>`);
      } else {
        ssrRenderSlot(_ctx.$slots, "default", {
          imgAttrs: imgAttrs.value,
          isLoaded: placeholderLoaded.value,
          src: src.value
        }, null, _push, _parent);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main, { __name: "NuxtImg" });

export { __nuxt_component_0 as _ };
//# sourceMappingURL=NuxtImg-lyvydNNu.mjs.map
