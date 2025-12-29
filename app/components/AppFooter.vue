<script setup lang="ts">
const currentYear = new Date().getFullYear()

// FOOTER NAVIGATION DATA
const footerNav = {
  discover: [
    { label: 'People', to: '/people' },
    { label: 'Companies', to: '/companies' },
    { label: 'Industries', to: '/industries' },
    { label: 'Solutions Directory', to: '/solutions' },
    { label: 'Submit a Solution', to: '/submit-solution', isHighlight: true }
  ],
  stories: [
    { label: 'Latest News', to: '/stories' },
    { label: 'Spotlight Interviews', to: '/stories/interviews' },
    { label: 'Case Studies', to: '/stories/case-studies' },
    { label: 'Trends Report 2025', to: '/stories/trends' }
  ],
  company: [
    { label: 'About OPS', to: '/about' },
    { label: 'OPS Studio', to: '/services', isBadge: true },
  ]
}

// SOCIAL LINKS CONFIG
const socialLinks = [
  { name: 'Twitter', url: 'https://x.com/OPS_Institute', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { name: 'LinkedIn', url: '#', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
  { name: 'Instagram', url: 'https://www.instagram.com/orderlyproblemsolvers/', icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { name: 'YouTube', url: '#', icon: 'M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z' }
]
</script>

<template>
  <footer class="bg-white dark:bg-[#051C2C] border-t border-gray-900 dark:border-white/10 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-gray-200 dark:border-white/5">
        
        <div class="pt-16 pb-12 pr-8 border-r border-gray-200 dark:border-white/5 pl-8 md:pl-0 lg:pl-0 border-l-0 lg:border-l-0">
          <div class="mb-8">
             <NuxtLink to="/" class="block">
                <img src="/img/logo.png" alt="Logo" class="h-12 dark:invert" />
             </NuxtLink>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light mb-8">
            Orderly Problem Solvers is the definitive directory and intelligence platform for emerging market innovation.
          </p>
          <div class="text-xs font-bold text-gray-300 dark:text-gray-600 uppercase tracking-widest">
            Abuja, Nigeria 
          </div>
        </div>

        <div class="pt-16 pb-12 px-8 border-r border-gray-200 dark:border-white/5">
          <h4 class="text-xs font-bold text-[#051C2C] dark:text-white uppercase tracking-[0.2em] mb-8">
            Directory
          </h4>
          <ul class="space-y-4">
            <li v-for="link in footerNav.discover" :key="link.label">
              <NuxtLink 
                :to="link.to" 
                class="group flex items-center text-sm transition-colors duration-300"
                :class="link.isHighlight ? 'text-[#00A9F4] font-bold' : 'text-gray-600 dark:text-gray-400 hover:text-[#051C2C] dark:hover:text-white'"
              >
                {{ link.label }}
                <svg v-if="link.isHighlight" class="w-3 h-3 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="pt-16 pb-12 px-8 border-r border-gray-200 dark:border-white/5">
          <h4 class="text-xs font-bold text-[#051C2C] dark:text-white uppercase tracking-[0.2em] mb-8">
            Insights
          </h4>
          <ul class="space-y-4 mb-10">
            <li v-for="link in footerNav.stories" :key="link.label">
              <NuxtLink :to="link.to" class="text-sm text-gray-600 dark:text-gray-400 hover:text-[#051C2C] dark:hover:text-white transition-colors duration-300">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>

          <h4 class="text-xs font-bold text-[#051C2C] dark:text-white uppercase tracking-[0.2em] mb-8">
            Firm
          </h4>
          <ul class="space-y-4">
            <li v-for="link in footerNav.company" :key="link.label" class="flex items-center gap-2">
              <NuxtLink :to="link.to" class="text-sm text-gray-600 dark:text-gray-400 hover:text-[#051C2C] dark:hover:text-white transition-colors duration-300">
                {{ link.label }}
              </NuxtLink>
              <span v-if="link.isBadge" class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A9F4] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[#00A9F4]"></span>
              </span>
            </li>
          </ul>
        </div>

        <div class="pt-16 pb-12 px-8 border-r border-gray-200 dark:border-white/5">
           <h4 class="text-xs font-bold text-[#051C2C] dark:text-white uppercase tracking-[0.2em] mb-8">
            Connect
          </h4>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-8 font-light">
             Follow the journey of 10,000+ problem solvers building the future.
          </p>
          
          <div class="grid grid-cols-2 gap-4">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url" 
              class="flex items-center gap-3 group text-gray-500 dark:text-gray-500 hover:text-[#051C2C] dark:hover:text-white transition-colors duration-300"
              :aria-label="social.name"
            >
               <svg class="w-5 h-5 group-hover:-translate-y-0.5 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path :d="social.icon"></path>
               </svg>
               <span class="text-xs font-medium">{{ social.name }}</span>
            </a>
          </div>
        </div>

      </div>

      <div class="border-t border-gray-200 dark:border-white/5 py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p class="text-xs text-gray-400 font-mono">
          &copy; {{ currentYear }} Orderly Problem Solvers.
        </p>
        
        <div class="flex gap-8">
          <NuxtLink to="/legal/privacy" class="text-xs text-gray-400 hover:text-[#051C2C] dark:hover:text-white transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="/legal/terms" class="text-xs text-gray-400 hover:text-[#051C2C] dark:hover:text-white transition-colors">Terms of Service</NuxtLink>
        </div>
      </div>

    </div>
  </footer>
</template>