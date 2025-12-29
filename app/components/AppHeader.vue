<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

interface NavItem {
  label: string;
  to: string;
  desc?: string;
  isHighlight?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const isOpen = ref(false);
const activeDropdown = ref<string | null>(null);
const route = useRoute();

// AUTO-CLOSE MENU ON ROUTE CHANGE
watch(
  () => route.path,
  () => {
    isOpen.value = false;
    activeDropdown.value = null;
  }
);

let closeTimeout: any = null;

const showMenu = (name: string) => {
  if (closeTimeout) clearTimeout(closeTimeout);
  activeDropdown.value = name;
};

const hideMenu = () => {
  closeTimeout = setTimeout(() => {
    activeDropdown.value = null;
  }, 200);
};

// DATA STRUCTURE
const navMap = {
  stories: { label: "Stories", to: "/stories" },
  about: { label: "About", to: "/about" },
  services: { label: "Studio", to: "/services" }, // Renamed to 'Studio' for prestige

  discover: {
    label: "Discover",
    groups: [
      {
        title: "The Ecosystem",
        items: [
          { label: "People", to: "/people", desc: "Founders & Visionaries" },
          { label: "Companies", to: "/companies", desc: "Verified Ventures" },
          { label: "Submit Solution", to: "/submit-solution", desc: "Join the Directory", isHighlight: true },
        ],
      },
      {
        title: "By Solution",
        items: [
          { label: "FinTech & Crypto", to: "/solutions/finance" },
          { label: "AI & Automation", to: "/solutions/ai" },
          { label: "Health & Bio", to: "/solutions/health" },
          { label: "Clean Energy", to: "/solutions/energy" },
        ],
      },
      {
        title: "By Industry",
        items: [
          { label: "Healthcare", to: "/industries/health" },
          { label: "Education", to: "/industries/education" },
          { label: "Logistics", to: "/industries/logistics" },
          { label: "Agriculture", to: "/industries/agriculture" },
        ],
      },
    ] as NavGroup[],
  },
};
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#051C2C] transition-colors duration-500"
  >
    <div class="mx-auto max-w-7xl px-6 lg:px-12">
      <div class="flex h-20 items-center justify-between">
        
        <NuxtLink to="/" class="shrink-0 z-50 flex items-center gap-1 group">
           <img src="/img/logo.png" alt="Logo" class="h-12 dark:invert" />
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-12 h-full">
          
          <NuxtLink
            :to="navMap.stories.to"
            class="relative h-full flex items-center text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-300 hover:text-[#051C2C] dark:hover:text-white transition-colors"
            exact-active-class="text-[#051C2C] dark:text-white"
          >
            {{ navMap.stories.label }}
          </NuxtLink>

          <div
            class="relative h-full flex items-center"
            @mouseenter="showMenu('discover')"
            @mouseleave="hideMenu"
          >
            <button
              class="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] transition-colors outline-none h-full border-b-2 border-transparent"
              :class="activeDropdown === 'discover' ? 'text-[#051C2C] dark:text-white border-[#00A9F4]' : 'text-gray-500 dark:text-gray-300 hover:text-[#051C2C] dark:hover:text-white'"
            >
              Discover
              <svg :class="{ 'rotate-180': activeDropdown === 'discover' }" class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-2"
            >
              <div
                v-if="activeDropdown === 'discover'"
                class="absolute left-1/2 -translate-x-1/2 top-full w-[800px] pt-0"
              >
                <div class="bg-white dark:bg-[#0A253A] border border-gray-200 dark:border-gray-700 shadow-2xl shadow-black/20 grid grid-cols-3">
                  
                  <div
                    v-for="(group) in navMap.discover.groups"
                    :key="group.title"
                    class="p-8 border-r border-gray-100 dark:border-white/5 last:border-0"
                  >
                    <h3 class="font-serif text-lg text-[#051C2C] dark:text-white mb-6">
                      {{ group.title }}
                    </h3>
                    
                    <div class="flex flex-col gap-4">
                      <NuxtLink
                        v-for="item in group.items"
                        :key="item.to"
                        :to="item.to"
                        @click="activeDropdown = null"
                        class="group block"
                      >
                        <div class="flex items-center gap-2">
                           <span class="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-[#00A9F4] transition-colors">
                             {{ item.label }}
                           </span>
                           <svg v-if="item.isHighlight" class="w-3 h-3 text-[#00A9F4]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </div>
                        <div v-if="item.desc" class="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                          {{ item.desc }}
                        </div>
                      </NuxtLink>
                    </div>
                  </div>

                </div>
              </div>
            </transition>
          </div>

          <NuxtLink
            :to="navMap.services.to"
            class="relative h-full flex items-center text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-300 hover:text-[#051C2C] dark:hover:text-white transition-colors"
            exact-active-class="text-[#051C2C] dark:text-white"
          >
            {{ navMap.services.label }}
            <span class="ml-1.5 flex h-1.5 w-1.5">
               <span class="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-[#00A9F4] opacity-75"></span>
               <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00A9F4]"></span>
            </span>
          </NuxtLink>
          
          <NuxtLink
            :to="navMap.about.to"
            class="relative h-full flex items-center text-xs font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-gray-300 hover:text-[#051C2C] dark:hover:text-white transition-colors"
            exact-active-class="text-[#051C2C] dark:text-white"
          >
            {{ navMap.about.label }}
          </NuxtLink>

        </nav>

        <div class="hidden md:flex items-center gap-8">
          <NuxtLink
            to="/search"
            class="text-gray-400 dark:text-gray-500 hover:text-[#00A9F4] transition-colors"
            aria-label="Search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </NuxtLink>

          <NuxtLink
            to="/submit-solution"
            class="flex items-center gap-2 px-6 py-2.5 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:bg-[#00A9F4] dark:hover:bg-[#00A9F4] hover:text-white dark:hover:text-white transition-all duration-300"
          >
            Submit
          </NuxtLink>
        </div>

        <button
          @click="isOpen = !isOpen"
          class="md:hidden p-2 text-[#051C2C] dark:text-white z-50 relative"
        >
          <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="-translate-y-full"
        enter-to-class="translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-y-0"
        leave-to-class="-translate-y-full"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-40 bg-white dark:bg-[#051C2C] md:hidden overflow-y-auto pt-20"
        >
          <div class="px-6 py-8">
            
            <div class="mb-10 pb-6 border-b border-gray-100 dark:border-white/10">
               <NuxtLink to="/search" @click="isOpen = false" class="flex items-center gap-3 text-2xl font-serif text-gray-400">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  Search...
               </NuxtLink>
            </div>

            <div class="space-y-8">
               
               <div>
                 <span class="text-xs font-bold text-[#00A9F4] uppercase tracking-widest mb-4 block">Menu</span>
                 <div class="space-y-4">
                    <NuxtLink to="/stories" @click="isOpen = false" class="block text-4xl font-serif text-[#051C2C] dark:text-white">Stories</NuxtLink>
                    <NuxtLink to="/about" @click="isOpen = false" class="block text-4xl font-serif text-[#051C2C] dark:text-white">About</NuxtLink>
                    <NuxtLink to="/services" @click="isOpen = false" class="block text-4xl font-serif text-[#051C2C] dark:text-white flex items-center gap-3">
                       Studio <span class="text-sm bg-[#00A9F4] text-white px-2 py-0.5 rounded-sm font-sans font-bold tracking-widest uppercase">Hire</span>
                    </NuxtLink>
                 </div>
               </div>

               <div>
                  <span class="text-xs font-bold text-[#00A9F4] uppercase tracking-widest mb-4 block mt-12">Directory</span>
                  <div class="space-y-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                     <NuxtLink to="/people" @click="isOpen = false" class="block text-lg font-medium text-gray-600 dark:text-gray-300">People</NuxtLink>
                     <NuxtLink to="/companies" @click="isOpen = false" class="block text-lg font-medium text-gray-600 dark:text-gray-300">Companies</NuxtLink>
                     <NuxtLink to="/solutions" @click="isOpen = false" class="block text-lg font-medium text-gray-600 dark:text-gray-300">All Solutions</NuxtLink>
                  </div>
               </div>

               <div class="pt-8">
                  <NuxtLink 
                    to="/submit-solution" 
                    @click="isOpen = false"
                    class="block w-full py-4 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-center font-bold uppercase tracking-widest"
                  >
                    Submit Solution
                  </NuxtLink>
               </div>

            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </header>
</template>