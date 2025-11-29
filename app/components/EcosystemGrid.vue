<script setup lang="ts">
import { computed } from 'vue'

// 1. FETCH REAL COUNTS
const { data: stats } = await useFetch('/api/stats/ecosystem')

// 2. HELPER: Get count with fallback
const getCount = (industryName: string) => {
  const count = stats.value?.[industryName] || 0
  return `${count} Solvers`
}

// 3. CONFIGURATION (Icons & Colors remain static design assets)
const categories = computed(() => [
  {
    id: 'fintech',
    label: 'FinTech',
    count: getCount('FinTech'),
    desc: 'Payments, Banking & Crypto',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', // Coin Icon
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    link: '/companies?industry=FinTech'
  },
  {
    id: 'health',
    label: 'HealthTech',
    count: getCount('HealthTech'),
    desc: 'Telemed, Records & AI Diag',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', // Heart Icon
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    link: '/companies?industry=HealthTech'
  },
  {
    id: 'logistics',
    label: 'Logistics',
    count: getCount('Logistics'),
    desc: 'Supply Chain, Fleet & Delivery',
    icon: 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0', // Truck Icon
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    link: '/companies?industry=Logistics'
  },
  {
    id: 'edu',
    label: 'EdTech',
    count: getCount('EdTech'),
    desc: 'LMS, Remote Learning & Skills',
    icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z', // Cap Icon
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    link: '/companies?industry=EdTech'
  }
])
</script>

<template>
  <section class="py-20 bg-gray-50 border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight mb-2">
            Explore the Ecosystem.
          </h2>
          <p class="text-lg text-gray-500">
            Curated solution providers across high-impact industries.
          </p>
        </div>
        
        <NuxtLink 
          to="/solutions" 
          class="group flex items-center gap-2 text-sm font-bold text-gray-900 hover:text-blue-600 transition"
        >
          View All Categories
          <span class="bg-gray-200 group-hover:bg-blue-100 p-1 rounded-full transition-colors">
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </span>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <NuxtLink 
          v-for="cat in categories" 
          :key="cat.id" 
          :to="cat.link"
          class="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 overflow-hidden"
        >
          <div 
            class="absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"
            :class="cat.bg"
          ></div>

          <div 
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300"
            :class="[cat.bg, cat.color]"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="cat.icon"></path>
            </svg>
          </div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-1">
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {{ cat.label }}
              </h3>
              <svg class="w-5 h-5 text-blue-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
            
            <p class="text-sm font-medium text-gray-400 mb-4 group-hover:text-gray-500">
              {{ cat.desc }}
            </p>

            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-50 border border-gray-100 text-xs font-bold text-gray-600 group-hover:border-blue-100 group-hover:text-blue-700 transition-colors">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" :class="cat.bg.replace('bg-', 'bg-')"></span>
                <span class="relative inline-flex rounded-full h-2 w-2" :class="cat.color.replace('text-', 'bg-')"></span>
              </span>
              {{ cat.count }}
            </div>
          </div>
        </NuxtLink>

        <div class="group relative bg-gray-900 rounded-2xl p-6 flex flex-col justify-between overflow-hidden cursor-pointer hover:bg-gray-800 transition-colors">
            <svg class="absolute inset-0 w-full h-full text-gray-800/20" fill="none" viewBox="0 0 400 400">
               <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1"/>
               </pattern>
               <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            <div class="relative z-10">
              <h3 class="text-xl font-bold text-white mb-2">Not listed here?</h3>
              <p class="text-sm text-gray-400">Search 15+ other categories including AgriTech, CleanTech & Retail.</p>
            </div>

            <div class="relative z-10 mt-6">
               <NuxtLink to="/solutions" class="w-full block text-center py-3 rounded-lg bg-white/10 border border-white/10 text-white text-sm font-bold hover:bg-white hover:text-black transition-all">
                  Search Directory
               </NuxtLink>
            </div>
        </div>

      </div>

      <div class="mt-16 pt-10 border-t border-gray-200">
        <p class="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
           Solutions used by innovators at
        </p>
        <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png" class="h-6 w-auto" alt="Logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" class="h-6 w-auto" alt="Logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" class="h-5 w-auto" alt="Logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png" class="h-8 w-auto" alt="Logo">
        </div>
      </div>

    </div>
  </section>
</template>