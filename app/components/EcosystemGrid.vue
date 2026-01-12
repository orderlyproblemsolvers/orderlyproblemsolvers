<script setup lang="ts">
import { computed } from "vue";

// 1. FETCH REAL COUNTS (Logic Retained)
const { data: stats, status } = await useFetch("/api/stats/ecosystem");

// 2. HELPER: Get count (Logic Retained)
const getCount = (industryName: string) => {
  const count = stats.value?.[industryName] || 0;
  return `${count} Solvers`;
};

// 3. CONFIGURATION
// Refined for the new design system (Unified Palette)
const categories = computed(() => [
  {
    id: "fintech",
    label: "FinTech",
    count: getCount("FinTech"),
    desc: "Payments, Banking & Crypto",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    link: "/companies?industry=FinTech",
    img: "/img/fintech.png"
  },
  {
    id: "health",
    label: "HealthTech",
    count: getCount("HealthTech"),
    desc: "Telemed, Records & AI Diag",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    link: "/companies?industry=HealthTech",
    img: "/img/health.png"
  },
  {
    id: "logistics",
    label: "Logistics",
    count: getCount("Logistics"),
    desc: "Supply Chain, Fleet & Delivery",
    icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0",
    link: "/companies?industry=Logistics",
    img: "/img/logistics.png"
  },
  {
    id: "edu",
    label: "EdTech",
    count: getCount("EdTech"),
    desc: "LMS, Remote Learning & Skills",
    icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z",
    link: "/companies?industry=EdTech",
    img: "/img/edtech.png"
  },
]);
</script>

<template>
  <section
    class="py-24 bg-white dark:bg-[#051C2C] border-b border-gray-200 dark:border-gray-800 transition-colors duration-500"
  >
    <div class="max-w-7xl mx-auto px-6 lg:px-12"  v-animate>
      <div
        class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 border-b border-black dark:border-gray-700 pb-8"
      >
        <div class="md:col-span-8">
          <h2
            class="text-4xl md:text-5xl font-serif text-[#051C2C] dark:text-white tracking-tight mb-4"
          >
            Ecosystem Intelligence
          </h2>
          <p
            class="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl"
          >
            Verified solution providers across high-impact sectors.
          </p>
        </div>

        <div class="md:col-span-4 flex items-end justify-start md:justify-end">
          <NuxtLink
            to="/solutions"
            class="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-[#00A9F4] hover:text-[#051C2C] dark:hover:text-white transition-colors"
          >
            View Full Directory
            <span
              class="block w-8 h-[1px] bg-[#00A9F4] group-hover:w-12 transition-all duration-300"
            ></span>
          </NuxtLink>
        </div>
      </div>

      <div
        v-if="status === 'pending'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gray-200 dark:border-gray-800 divide-x divide-gray-200 dark:divide-gray-800"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="h-80 bg-gray-50 dark:bg-[#0A253A] animate-pulse"
        ></div>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-gray-200 dark:border-gray-700"
      >
        <NuxtLink
          v-for="cat in categories"
          :key="cat.id"
          :to="cat.link"
          class="group relative overflow-hidden p-8 border-b border-r border-gray-200 dark:border-gray-700 transition-colors duration-300 flex flex-col justify-between h-[360px]"
        >
          <div class="absolute inset-0 z-0">
            <img
              :src="cat.img"
              alt=""
              class="w-full h-full object-cover"
            />

            <div 
  class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"
></div>
          </div>
          <div
            class="absolute top-0 left-0 w-0 h-1 bg-[#00A9F4] group-hover:w-full transition-all duration-500 ease-out z-20"
          ></div>

          <div class="relative z-10">
            <div
              class="mb-8 text-gray-300 group-hover:text-[#00A9F4] transition-colors duration-300"
            >
              <svg
                class="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  stroke-width="1.5"
                  :d="cat.icon"
                ></path>
              </svg>
            </div>

            <h3
              class="text-2xl font-serif text-white mb-2 group-hover:translate-x-1 transition-transform duration-300"
            >
              {{ cat.label }}
            </h3>

            <p class="text-sm text-gray-100 leading-relaxed font-light">
              {{ cat.desc }}
            </p>
          </div>

          <div class="mt-8 relative z-10">
            <span
              class="block text-[10px] font-bold uppercase tracking-widest text-gray-100 mb-1"
              >Active Solvers</span
            >
            <div class="flex items-baseline gap-2">
              <span
                class="text-4xl font-serif text-white group-hover:text-[#00A9F4] transition-colors duration-300"
              >
                {{ cat.count.split(" ")[0] }}
              </span>
              <svg
                class="w-5 h-5 text-[#00A9F4] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  stroke-width="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                ></path>
              </svg>
            </div>
          </div>
        </NuxtLink>

        <div
          class="group relative p-8 border-b border-r border-gray-200 dark:border-gray-700 bg-[#051C2C] dark:bg-[#00A9F4] flex flex-col justify-between h-[360px] overflow-hidden"
        >
          <div class="absolute top-0 right-0 p-4 opacity-10">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="48" stroke="white" stroke-width="1" />
              <circle cx="50" cy="50" r="32" stroke="white" stroke-width="1" />
            </svg>
          </div>

          <div class="relative z-10 pt-8">
            <h3
              class="text-2xl font-serif text-white dark:text-[#051C2C] mb-4 leading-tight"
            >
              Sector<br />Missing?
            </h3>
            <p
              class="text-sm text-gray-300 dark:text-[#051C2C]/80 leading-relaxed mb-6"
            >
              Our database covers 15+ emerging verticals including AgriTech,
              CleanTech & Retail.
            </p>
          </div>

          <div class="relative z-10">
            <NuxtLink
              to="/solutions"
              class="inline-flex items-center gap-3 text-white dark:text-[#051C2C] font-bold border-b border-white/30 hover:border-white pb-1 transition-all"
            >
              Search Directory
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <div
        class="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <p
          class="text-xs font-bold text-gray-400 dark:text-gray-600 uppercase tracking-widest"
        >
          Trusted by teams at
        </p>
        <div
          class="flex flex-wrap justify-center items-center gap-10 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
        >
          <NuxtImg
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png"
            class="h-5 w-auto dark:invert"
            alt="Google"
          />
          <NuxtImg
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
            class="h-5 w-auto dark:invert"
            alt="Amazon"
          />
          <NuxtImg
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            class="h-4 w-auto dark:invert"
            alt="Netflix"
          />
          <NuxtImg
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png"
            class="h-6 w-auto dark:invert"
            alt="IBM"
          />
        </div>
      </div>
    </div>
  </section>
</template>
