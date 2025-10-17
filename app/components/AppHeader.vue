<template>
  <div class="w-full">
    <div class="hidden md:block bg-black border-b border-gray-800">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center"
      >
        <p class="text-sm text-gray-300 font-ibm-plex-mono">
          Start building your software today.
          <span class="text-white font-semibold cursor-pointer">Book a call</span>
        </p>
        <a
          href="mailto:orderlyproblemsolvers@gmail.com"
          class="text-sm text-gray-300 hover:text-white transition-colors font-ibm-plex-mono"
        >
          orderlyproblemsolvers@gmail.com
        </a>
      </div>
    </div>

    <header class="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between"
      >
        <a href="/" class="text-2xl md:text-3xl font-bold text-white font-copperplate">
          <span class="hidden md:inline">Orderly Problem Solvers</span>
          <span class="md:hidden">OPS</span>
        </a>

        <nav class="hidden md:flex items-center gap-10">
          <div
            v-for="(items, key) in menuData"
            :key="key"
            class="relative group"
          >
            <button
              class="flex items-center text-white hover:text-gray-300 transition-colors py-2 font-ibm-plex-mono capitalize"
            >
              <span>{{ key }}</span>
            </button>

            <div
              class="absolute left-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-md shadow-xl overflow-hidden transition-all duration-300 ease-out origin-top opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 translate-y-2"
            >
              <a
                v-for="(item, idx) in items"
                :key="idx"
                :href="item.href"
                class="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-sm font-ibm-plex-mono"
              >
                {{ item.label }}
              </a>
            </div>
          </div>
        </nav>

        <div class="md:hidden">
          <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="text-white">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-black/95 backdrop-blur-sm fixed inset-0 z-40 pt-20"
    >
      <nav class="flex flex-col px-6">
        <div v-for="(items, key) in menuData" :key="key" class="border-b border-gray-800">
          <button
            @click="toggleMobileSubMenu(key)"
            class="w-full flex justify-between items-center py-4 text-white font-ibm-plex-mono capitalize"
          >
            <span>{{ key }}</span>
            <svg
              :class="[
                'w-4 h-4 transition-transform duration-300',
                openMobileSubMenu === key ? 'rotate-180' : ''
              ]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          <div v-if="openMobileSubMenu === key" class="pb-2">
            <a
              v-for="(item, idx) in items"
              :key="idx"
              :href="item.href"
              class="block pl-4 pr-2 py-3 text-gray-300 hover:text-white text-sm font-ibm-plex-mono"
            >
              {{ item.label }}
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);
const openMobileSubMenu = ref(null);

const menuData = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Team', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' }
  ],
  services: [
    { label: 'Web Development', href: '#' },
    { label: 'Mobile Apps', href: '#' },
    { label: 'Consulting', href: '#' },
    { label: 'Support', href: '#' }
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'FAQ', href: '#' }
  ],
  pricing: [
    { label: 'Plans', href: '#' },
    { label: 'Enterprise', href: '#' },
    { label: 'Add-ons', href: '#' },
    { label: 'Compare', href: '#' }
  ]
};

const toggleMobileSubMenu = (menu) => {
  openMobileSubMenu.value = openMobileSubMenu.value === menu ? null : menu;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Playfair+Display:wght@700&display=swap');

.font-copperplate {
  font-family: 'Copperplate Gothic', 'Playfair Display', serif;
}

.font-ibm-plex-mono {
  font-family: 'IBM Plex Mono', monospace;
}
</style>