import { _ as __nuxt_component_0$1 } from './server.mjs';
import { defineComponent, ref, watch, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderTeleport } from 'vue/server-renderer';
import { useRoute } from 'vue-router';
import { y as publicAssetsURL } from '../_/nitro.mjs';

const _imports_0 = publicAssetsURL("/img/logo.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    const activeDropdown = ref(null);
    const route = useRoute();
    watch(() => route.path, () => {
      isOpen.value = false;
    });
    const navMap = {
      stories: { label: "Stories", to: "/stories" },
      about: { label: "About", to: "/about" },
      discover: {
        // Cast to NavGroup[] to satisfy TS
        groups: [
          {
            title: "The Ecosystem",
            items: [
              { label: "People", to: "/people", desc: "Innovators & Founders" },
              { label: "Companies", to: "/companies", desc: "Startups & Agencies" }
            ]
          },
          {
            title: "Browse Solutions",
            items: [
              { label: "Technology", to: "/solutions/technology" },
              { label: "FinTech", to: "/solutions/finance" },
              { label: "AI & Automation", to: "/solutions/ai" },
              { label: "Marketing", to: "/solutions/marketing" }
            ]
          },
          {
            title: "By Industry",
            items: [
              { label: "Healthcare", to: "/industries/health" },
              { label: "Education", to: "/industries/education" },
              { label: "Logistics", to: "/industries/logistics" },
              { label: "Agriculture", to: "/industries/agriculture" }
            ]
          }
        ]
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-40 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md" }, _attrs))}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="flex h-20 items-center justify-between">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "flex-shrink-0 z-50"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="OPS Logo" class="h-12 w-auto object-contain"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "OPS Logo",
                class: "h-12 w-auto object-contain"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="hidden md:flex items-center gap-10 h-full">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: navMap.stories.to,
        class: "text-sm font-bold text-gray-800 hover:text-blue-600 transition tracking-wide",
        "exact-active-class": "text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(navMap.stories.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(navMap.stories.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative h-full flex items-center"><button class="${ssrRenderClass([activeDropdown.value === "discover" ? "text-blue-600" : "text-gray-800 hover:text-blue-600", "flex items-center gap-1 text-sm font-bold transition-colors outline-none tracking-wide"])}"> Discover <svg class="${ssrRenderClass([{ "rotate-180": activeDropdown.value === "discover" }, "w-4 h-4 transition-transform duration-200 stroke-2"])}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></button>`);
      if (activeDropdown.value === "discover") {
        _push(`<div class="absolute left-1/2 -translate-x-1/2 top-full w-[640px] pt-4"><div class="rounded-xl border border-gray-100 bg-white shadow-2xl p-8 grid grid-cols-3 gap-8"><!--[-->`);
        ssrRenderList(navMap.discover.groups, (group) => {
          _push(`<div><h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">${ssrInterpolate(group.title)}</h3><div class="flex flex-col gap-3"><!--[-->`);
          ssrRenderList(group.items, (item) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: item.to,
              to: item.to,
              onClick: ($event) => activeDropdown.value = null,
              class: "group block"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors"${_scopeId}>${ssrInterpolate(item.label)}</div>`);
                  if (item.desc) {
                    _push2(`<div class="text-xs font-medium text-gray-400 group-hover:text-gray-500 mt-0.5"${_scopeId}>${ssrInterpolate(item.desc)}</div>`);
                  } else {
                    _push2(`<!---->`);
                  }
                } else {
                  return [
                    createVNode("div", { class: "text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors" }, toDisplayString(item.label), 1),
                    item.desc ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "text-xs font-medium text-gray-400 group-hover:text-gray-500 mt-0.5"
                    }, toDisplayString(item.desc), 1)) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--><div class="col-span-3 bg-gray-50 -mx-8 -mb-8 mt-4 px-8 py-3 rounded-b-xl flex justify-between items-center"><span class="text-xs font-medium text-gray-500">Looking for something specific?</span>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/solutions",
          class: "text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` View Full Directory → `);
            } else {
              return [
                createTextVNode(" View Full Directory → ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: navMap.about.to,
        class: "text-sm font-bold text-gray-800 hover:text-blue-600 transition tracking-wide",
        "exact-active-class": "text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(navMap.about.label)}`);
          } else {
            return [
              createTextVNode(toDisplayString(navMap.about.label), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/feed",
        class: "text-sm font-bold text-gray-800 hover:text-blue-600 transition tracking-wide flex items-center gap-1",
        "exact-active-class": "text-blue-600"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` My Feed <span class="w-1.5 h-1.5 rounded-full bg-green-500"${_scopeId}></span>`);
          } else {
            return [
              createTextVNode(" My Feed "),
              createVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-green-500" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav><div class="hidden md:flex items-center gap-5">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/search",
        class: "text-gray-500 hover:text-blue-600 transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg>`);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "w-5 h-5 stroke-2",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/submit-solution",
        class: "bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 transition shadow-lg shadow-gray-900/10"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Submit Solution `);
          } else {
            return [
              createTextVNode(" Submit Solution ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><button class="md:hidden p-2 text-gray-800 z-50 relative">`);
      if (!isOpen.value) {
        _push(`<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>`);
      } else {
        _push(`<svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`);
      }
      _push(`</button></div></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isOpen.value) {
          _push2(`<div class="fixed inset-0 z-[100] bg-white md:hidden overflow-y-auto"><div class="p-6"><div class="flex items-center justify-between mb-8"><img${ssrRenderAttr("src", _imports_0)} alt="OPS Logo" class="h-10 w-auto"><button class="p-2 text-gray-500"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="space-y-8"><div class="border-b border-gray-100 pb-6">`);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/search",
            class: "flex items-center gap-3 text-lg font-bold text-gray-500"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`<svg class="w-5 h-5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg> Search... `);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    class: "w-5 h-5 stroke-2",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    createVNode("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    })
                  ])),
                  createTextVNode(" Search... ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div>`);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/stories",
            class: "block text-3xl font-black text-gray-900 tracking-tight"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Stories`);
              } else {
                return [
                  createTextVNode("Stories")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="space-y-4"><p class="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-100 pb-2">Discover</p><div>`);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/people",
            class: "block text-xl font-bold text-gray-700 hover:text-blue-600"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`People`);
              } else {
                return [
                  createTextVNode("People")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div>`);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/companies",
            class: "block text-xl font-bold text-gray-700 hover:text-blue-600"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Companies`);
              } else {
                return [
                  createTextVNode("Companies")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div>`);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/solutions",
            class: "block text-xl font-bold text-gray-700 hover:text-blue-600"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`All Solutions`);
              } else {
                return [
                  createTextVNode("All Solutions")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div><div>`);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/about",
            class: "block text-3xl font-black text-gray-900 tracking-tight"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`About`);
              } else {
                return [
                  createTextVNode("About")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div><div class="pt-8 border-t border-gray-100">`);
          _push2(ssrRenderComponent(_component_NuxtLink, {
            to: "/submit-solution",
            class: "block w-full text-center bg-black text-white py-4 rounded-xl text-lg font-bold"
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(`Submit Solution`);
              } else {
                return [
                  createTextVNode("Submit Solution")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</header>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppHeader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "AppHeader" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const footerNav = {
      discover: [
        { label: "People", to: "/people" },
        { label: "Companies", to: "/companies" },
        { label: "Industries", to: "/industries" },
        { label: "Solutions Directory", to: "/solutions" },
        { label: "Submit a Solution", to: "/submit-solution", isHighlight: true }
      ],
      stories: [
        { label: "Latest News", to: "/stories" },
        { label: "Spotlight Interviews", to: "/stories/interviews" },
        { label: "Case Studies", to: "/stories/case-studies" },
        { label: "Trends Report 2025", to: "/stories/trends" }
      ],
      company: [
        { label: "About OPS", to: "/about" },
        { label: "OPS Studio", to: "/services", isBadge: true },
        { label: "Contact", to: "/contact" },
        { label: "Careers", to: "/careers" }
      ]
    };
    const socialLinks = [
      { name: "Twitter", url: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
      { name: "LinkedIn", url: "#", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
      { name: "Instagram", url: "#", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
      { name: "YouTube", url: "#", icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-50 border-t border-gray-200 pt-16 pb-8" }, _attrs))}><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 mb-16 items-stretch"><div class="lg:col-span-8 lg:pr-12 flex flex-col justify-center"><div class="mb-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="OPS Logo" class="h-12 w-auto object-contain"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "OPS Logo",
                class: "h-12 w-auto object-contain"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 md:grid-cols-3 gap-8"><div><h4 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Discover</h4><ul class="space-y-4"><!--[-->`);
      ssrRenderList(footerNav.discover, (link) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.to,
          class: ["text-sm transition-colors", link.isHighlight ? "text-blue-600 font-bold hover:text-blue-800" : "text-gray-600 hover:text-black"]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div><h4 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Stories</h4><ul class="space-y-4"><!--[-->`);
      ssrRenderList(footerNav.stories, (link) => {
        _push(`<li>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/stories",
          class: "text-sm text-gray-600 hover:text-black transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div><div><h4 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Company</h4><ul class="space-y-4"><!--[-->`);
      ssrRenderList(footerNav.company, (link) => {
        _push(`<li class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/about",
          class: "text-sm text-gray-600 hover:text-black transition-colors"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(link.label)}`);
            } else {
              return [
                createTextVNode(toDisplayString(link.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        if (link.isBadge) {
          _push(`<span class="bg-black text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm">NEW</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div></div></div><div class="lg:col-span-4 flex flex-col h-full min-h-[300px] lg:min-h-0 mt-8 lg:mt-0"><div class="relative bg-linear-to-br from-gray-900 via-black to-gray-900 p-10 text-white h-full flex flex-col justify-center overflow-hidden"><div class="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div><div class="relative z-10 mb-10"><h3 class="text-3xl font-black tracking-tight uppercase mb-2 leading-none">Join the<br>Community.</h3><p class="text-gray-400 text-sm font-medium">Follow the journey of 10,000+ problem solvers.</p></div><div class="relative z-10 flex items-center gap-8"><!--[-->`);
      ssrRenderList(socialLinks, (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} class="text-gray-500 hover:text-white transition-all duration-300 group"${ssrRenderAttr("aria-label", social.name)}><svg class="w-12 h-12 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24"><path${ssrRenderAttr("d", social.icon)}></path></svg></a>`);
      });
      _push(`<!--]--></div></div></div></div><div class="border-t border-gray-200 pt-8 flex flex-col md:flex-row md:items-center justify-between gap-4"><p class="text-xs text-gray-400 font-medium"> © ${ssrInterpolate(unref(currentYear))} Orderly Problem Solvers. </p><div class="flex gap-6">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/legal/privacy",
        class: "text-xs text-gray-400 hover:text-black transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privacy Policy`);
          } else {
            return [
              createTextVNode("Privacy Policy")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/legal/terms",
        class: "text-xs text-gray-400 hover:text-black transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Terms of Service`);
          } else {
            return [
              createTextVNode("Terms of Service")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></footer>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main, { __name: "AppFooter" });

export { __nuxt_component_0 as _, __nuxt_component_2 as a };
//# sourceMappingURL=AppFooter-BXJkxf95.mjs.map
