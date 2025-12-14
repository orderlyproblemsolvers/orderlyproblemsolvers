<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

interface NavItem {
  label: string;
  to: string;
  desc?: string;
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

const navMap = {
  stories: { label: "Stories", to: "/stories" },
  about: { label: "About", to: "/about" },
  services: { label: "Services", to: "/services" },

  discover: {
    label: "Discover",
    groups: [
      {
        title: "The Ecosystem",
        items: [
          { label: "People", to: "/people", desc: "Innovators & Founders" },
          { label: "Companies", to: "/companies", desc: "Startups & Agencies" },
        ],
      },
      {
        title: "Browse Solutions",
        items: [
          { label: "Technology", to: "/solutions/technology" },
          { label: "FinTech", to: "/solutions/finance" },
          { label: "AI & Automation", to: "/solutions/ai" },
          { label: "Marketing", to: "/solutions/marketing" },
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
    class="sticky top-2 z-40 w-[90dvw] border border-b rounded-md border-gray-100 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors duration-300 self-center"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <NuxtLink to="/" class="shrink-0 z-50">
          <img
            src="/img/logo.png"
            alt="OPS Logo"
            class="h-12 w-auto object-contain dark:invert"
          />
        </NuxtLink>

        <nav class="hidden md:flex items-center gap-10 h-full">
          <NuxtLink
            :to="navMap.stories.to"
            class="text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition tracking-wide"
            exact-active-class="text-blue-600 dark:text-blue-400"
          >
            {{ navMap.stories.label }}
          </NuxtLink>

          <div
            class="relative h-full flex items-center"
            @mouseenter="showMenu('discover')"
            @mouseleave="hideMenu"
          >
            <button
              class="flex items-center gap-1 text-sm font-bold transition-colors outline-none tracking-wide"
              :class="
                activeDropdown === 'discover'
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
              "
            >
              Discover
              <svg
                :class="{ 'rotate-180': activeDropdown === 'discover' }"
                class="w-4 h-4 transition-transform duration-200 stroke-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
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
                class="absolute left-1/2 -translate-x-1/2 top-full w-[640px] pt-4"
              >
                <div
                  class="rounded-xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-8 grid grid-cols-3 gap-8"
                >
                  <div
                    v-for="group in navMap.discover.groups"
                    :key="group.title"
                  >
                    <h3
                      class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 border-b border-gray-100 dark:border-slate-800 pb-2"
                    >
                      {{ group.title }}
                    </h3>
                    <div class="flex flex-col gap-3">
                      <NuxtLink
                        v-for="item in group.items"
                        :key="item.to"
                        :to="item.to"
                        @click="activeDropdown = null"
                        class="group block"
                      >
                        <div
                          class="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                        >
                          {{ item.label }}
                        </div>
                        <div
                          v-if="item.desc"
                          class="text-xs font-medium text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400 mt-0.5"
                        >
                          {{ item.desc }}
                        </div>
                      </NuxtLink>
                    </div>
                  </div>

                  <div
                    class="col-span-3 bg-gray-50 dark:bg-slate-800 -mx-8 -mb-8 mt-4 px-8 py-3 rounded-b-xl flex justify-between items-center"
                  >
                    <span
                      class="text-xs font-medium text-gray-500 dark:text-gray-400"
                      >Looking for something specific?</span
                    >
                    <NuxtLink
                      to="/solutions"
                      class="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline"
                    >
                      View Full Directory &rarr;
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <NuxtLink
            :to="navMap.about.to"
            class="text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition tracking-wide"
            exact-active-class="text-blue-600 dark:text-blue-400"
          >
            {{ navMap.about.label }}
          </NuxtLink>
          <NuxtLink
            :to="navMap.services.to"
            class="text-sm font-bold text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition tracking-wide"
            exact-active-class="text-blue-600 dark:text-blue-400"
          >
            {{ navMap.services.label }}
          </NuxtLink>
        </nav>

        <div class="hidden md:flex items-center gap-5">
          <NuxtLink
            to="/search"
            class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            <svg
              class="w-5 h-5 stroke-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </NuxtLink>

          <NuxtLink
            to="/submit-solution"
            class="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg shadow-gray-900/10 dark:shadow-black/20"
          >
            Submit Solution
          </NuxtLink>
        </div>

        <button
          @click="isOpen = !isOpen"
          class="md:hidden p-2 text-gray-800 dark:text-gray-200 z-50 relative"
        >
          <svg
            v-if="!isOpen"
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <svg
            v-else
            class="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </div>

    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-100 bg-white dark:bg-slate-950 md:hidden overflow-y-auto transition-colors duration-300"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-8">
              <NuxtImg
                src="/img/logo.png"
                alt="OPS Logo"
                class="h-10 w-auto dark:invert"
              />
              <button
                @click="isOpen = false"
                class="p-2 text-gray-500 dark:text-gray-400"
              >
                <svg
                  class="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>

            <div class="space-y-8">
              <div
                @click="isOpen = false"
                class="border-b border-gray-100 dark:border-slate-800 pb-6"
              >
                <NuxtLink
                  to="/search"
                  class="flex items-center gap-3 text-lg font-bold text-gray-500 dark:text-gray-400"
                >
                  <svg
                    class="w-5 h-5 stroke-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  Search...
                </NuxtLink>
              </div>

              <div @click="isOpen = false">
                <NuxtLink
                  to="/stories"
                  class="block text-3xl font-black text-gray-900 dark:text-white tracking-tight"
                  >Stories</NuxtLink
                >
              </div>

              <div class="space-y-4">
                <p
                  class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest border-b border-gray-100 dark:border-slate-800 pb-2"
                >
                  Discover
                </p>
                <div @click="isOpen = false">
                  <NuxtLink
                    to="/people"
                    class="block text-xl font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >People</NuxtLink
                  >
                </div>
                <div @click="isOpen = false">
                  <NuxtLink
                    to="/companies"
                    class="block text-xl font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >Companies</NuxtLink
                  >
                </div>
                <div @click="isOpen = false">
                  <NuxtLink
                    to="/solutions"
                    class="block text-xl font-bold text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                    >All Solutions</NuxtLink
                  >
                </div>
              </div>

              <div @click="isOpen = false">
                <NuxtLink
                  to="/about"
                  class="block text-3xl font-black text-gray-900 dark:text-white tracking-tight"
                  >About</NuxtLink
                >
              </div>

              <div @click="isOpen = false">
                <NuxtLink
                  to="/services"
                  class="block text-3xl font-black text-gray-900 dark:text-white tracking-tight"
                  >Services</NuxtLink
                >
              </div>

              <div
                class="pt-8 border-t border-gray-100 dark:border-slate-800"
                @click="isOpen = false"
              >
                <NuxtLink
                  to="/submit-solution"
                  class="block w-full text-center bg-black dark:bg-white text-white dark:text-black py-4 rounded-xl text-lg font-bold"
                  >Submit Solution</NuxtLink
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </header>
</template>
