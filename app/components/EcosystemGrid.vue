<script setup lang="ts">
import { computed } from "vue";

// 1. FETCH REAL COUNTS
const { data: stats, status } = await useFetch("/api/stats/ecosystem");

// 2. HELPER: Get count
const getCount = (industryName: string) => {
  const count = stats.value?.[industryName] || 0;
  return `${count} Solvers`;
};

// 3. CONFIGURATION (Images removed for a cleaner, data-first UI)
const categories = computed(() => [
  {
    id: "fintech",
    label: "FinTech",
    count: getCount("FinTech"),
    desc: "Payments, Banking & Crypto",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    link: "/companies?industry=FinTech",
  },
  {
    id: "health",
    label: "HealthTech",
    count: getCount("HealthTech"),
    desc: "Telemed, Records & AI Diag",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    link: "/companies?industry=HealthTech",
  },
  {
    id: "logistics",
    label: "Logistics",
    count: getCount("Logistics"),
    desc: "Supply Chain, Fleet & Delivery",
    icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    link: "/companies?industry=Logistics",
  },
  {
    id: "edu",
    label: "EdTech",
    count: getCount("EdTech"),
    desc: "LMS, Remote Learning & Skills",
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    link: "/companies?industry=EdTech",
  },
]);
</script>

<template>
  <section class="py-24 lg:py-32 bg-gray-50 dark:bg-[#051C2C] border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
    <div class="max-w-7xl mx-auto px-6 lg:px-12" v-animate>
      
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-gray-200 dark:border-white/10 pb-8">
        <div class="max-w-2xl">
          <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A9F4] mb-3">
            The Network
          </span>
          <h2 class="text-3xl md:text-3xl font-serif text-gray-900 dark:text-white tracking-tight mb-4">
            Browse by sector
          </h2>
          <p class="text-lg text-gray-500 dark:text-gray-400 font-light leading-relaxed">
            Verified solution providers actively deploying infrastructure across high-impact sectors.
          </p>
        </div>

        <NuxtLink
          to="/solutions"
          class="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          Explore Directory
          <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </NuxtLink>
      </div>

      <div v-if="status === 'pending'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="i in 4" :key="i" class="h-[280px] bg-white dark:bg-[#0A253A] rounded-2xl border border-gray-100 dark:border-white/5 animate-pulse"></div>
        <div class="h-[280px] lg:col-span-2 bg-white dark:bg-[#0A253A] rounded-2xl border border-gray-100 dark:border-white/5 animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="cat.link"
          class="group relative overflow-hidden p-8 rounded-2xl bg-white dark:bg-[#0A253A]/50 border border-gray-200 dark:border-white/10 hover:border-[#00A9F4]/50 dark:hover:border-[#00A9F4]/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-[280px]"
        >
          <div>
            <div class="w-12 h-12 rounded-xl bg-gray-50 dark:bg-[#051C2C] border border-gray-100 dark:border-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#00A9F4] group-hover:scale-110 transition-all duration-500 mb-6">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" :d="cat.icon"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-serif text-gray-900 dark:text-white mb-2">{{ cat.label }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 font-light">{{ cat.desc }}</p>
          </div>

          <div class="pt-6 border-t border-gray-100 dark:border-white/10 flex items-end justify-between mt-auto">
            <div>
              <span class="block text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
                Active Solvers
              </span>
              <span class="text-3xl font-serif text-gray-900 dark:text-white group-hover:text-[#00A9F4] transition-colors duration-300">
                {{ cat.count.split(" ")[0] }}
              </span>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-50 dark:bg-[#051C2C] flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-[#00A9F4] transition-all duration-300">
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </div>
          </div>
        </NuxtLink>

        <div class="group relative p-8 lg:p-12 rounded-2xl bg-[#00A9F4] flex flex-col md:flex-row items-start md:items-center justify-between lg:col-span-2 overflow-hidden shadow-lg border border-[#00A9F4]">
          <div class="absolute top-0 right-0 -mr-16 -mt-16 opacity-10 transition-transform duration-700 group-hover:rotate-45 pointer-events-none">
            <svg width="250" height="250" viewBox="0 0 100 100" fill="none">
              <rect x="20" y="20" width="60" height="60" stroke="white" stroke-width="2" />
              <rect x="35" y="35" width="30" height="30" stroke="white" stroke-width="2" />
            </svg>
          </div>

          <div class="relative z-10 max-w-sm mb-8 md:mb-0">
            <h3 class="text-3xl md:text-4xl font-serif text-white mb-3 leading-tight">Sector Missing?</h3>
            <p class="text-white/90 font-light text-sm md:text-base leading-relaxed">
              Our database covers 15+ emerging verticals including AgriTech, CleanTech, and Retail. Search the full index.
            </p>
          </div>

          <div class="relative z-10 w-full md:w-auto">
            <NuxtLink
              to="/solutions"
              class="flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 bg-white text-[#051C2C] text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-md"
            >
              Search Directory
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </NuxtLink>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>