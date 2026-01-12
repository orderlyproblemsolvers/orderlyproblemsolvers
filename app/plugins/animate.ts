// plugins/animate.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate', {
    // 1. SERVER-SIDE: Apply initial state (Hidden)
    // This prevents the "flash" of content by hiding it before it even reaches the browser.
    getSSRProps(binding, vnode) {
      return {
        class: 'opacity-0 translate-y-8 transition-all duration-700 ease-out'
      }
    },

    // 2. CLIENT-SIDE: Handle the animation trigger
    mounted(el) {
      // IntersectionObserver is browser-only, so we use it here in mounted
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Reveal the element
              el.classList.remove('opacity-0', 'translate-y-8');
              el.classList.add('opacity-100', 'translate-y-0');
              
              observer.unobserve(el);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '50px',
        }
      );

      observer.observe(el);
    },
  });
});