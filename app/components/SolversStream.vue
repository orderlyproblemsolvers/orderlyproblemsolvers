<script setup lang="ts">
import { ref, computed } from 'vue'

// 1. FETCH REAL DATA
const { data: peopleData } = await useFetch('/api/people')
const { data: companyData } = await useFetch('/api/companies')

// 2. MERGE & NORMALIZE
const solvers = computed(() => {
  const p = (peopleData.value || []).slice(0, 10).map((person: any) => ({
    id: `p-${person.id}`,
    type: 'person',
    name: person.name,
    role: person.role,
    company: person.companyName || 'Freelance',
    image: person.image || person.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=051C2C&color=fff`,
    superpower: person.bio ? person.bio.substring(0, 80) + '...' : 'Building the future of tech.',
    link: `/people/${person.slug}`
  }))

  const c = (companyData.value || []).slice(0, 10).map((comp: any) => ({
    id: `c-${comp.id}`,
    type: 'company',
    name: comp.name,
    industry: comp.industry,
    logo: comp.logo,
    hook: comp.headline || 'Solving complex problems in emerging markets.',
    link: `/companies/${comp.slug}`
  }))

  // Interleave them
  const combined = []
  const max = Math.max(p.length, c.length)
  for (let i = 0; i < max; i++) {
    if (p[i]) combined.push(p[i])
    if (c[i]) combined.push(c[i])
  }
  return combined
})

// SCROLL LOGIC
const scrollContainer = ref<HTMLElement | null>(null)

const scroll = (direction: 'left' | 'right') => {
  if (scrollContainer.value) {
    const scrollAmount = 350 
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <section class="py-24 lg:py-32 bg-gray-50 dark:bg-[#051C2C] border-b border-gray-200 dark:border-gray-800 transition-colors duration-500 overflow-hidden">
    <div v-animate class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div>
          <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A9F4] mb-3">
            The Network
          </span>
          <h2 class="text-3xl md:text-4xl font-serif text-gray-900 dark:text-white tracking-tight">
            Experts Solving Real Problems
          </h2>
        </div>
        
        <div class="flex items-center gap-3">
          <button @click="scroll('left')" class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 hover:border-[#00A9F4] dark:hover:border-[#00A9F4] text-gray-400 hover:text-[#00A9F4] transition-all duration-300">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button @click="scroll('right')" class="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 dark:border-white/10 hover:border-[#00A9F4] dark:hover:border-[#00A9F4] text-gray-400 hover:text-[#00A9F4] transition-all duration-300">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      <div v-if="!solvers.length" class="flex gap-6 overflow-hidden">
         <div v-for="i in 4" :key="i" class="w-[280px] sm:w-[320px] shrink-0 h-[380px] bg-white dark:bg-[#0A253A] rounded-2xl border border-gray-100 dark:border-white/5 animate-pulse"></div>
      </div>

      <div 
        v-else
        ref="scrollContainer"
        class="flex gap-6 overflow-x-auto pb-12 -mx-6 px-6 lg:-mx-12 lg:px-12 no-scrollbar snap-x snap-mandatory"
      >
        <NuxtLink 
          v-for="item in solvers" 
          :key="item.id"
          :to="item.link"
          class="w-[280px] sm:w-[320px] shrink-0 snap-start group relative flex flex-col p-6 sm:p-8 h-[380px] rounded-2xl bg-white dark:bg-[#0A253A]/50 border border-gray-200 dark:border-white/10 hover:border-[#00A9F4]/50 hover:shadow-xl transition-all duration-500"
        >
          <template v-if="item.type === 'person'">
            
            <div class="flex items-start justify-between mb-8">
              <div class="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 dark:border-white/10 group-hover:border-[#00A9F4] transition-colors duration-500">
                 <img :src="item.image" :alt="item.name" class="w-full h-full object-cover  transition-all duration-500">
              </div>
              <span class="text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-white/5 px-2.5 py-1 rounded-full border border-gray-200 dark:border-white/5">
                Expert
              </span>
            </div>

            <div>
              <h3 class="text-2xl font-serif text-gray-900 dark:text-white mb-1 group-hover:text-[#00A9F4] transition-colors duration-300">
                {{ item.name }}
              </h3>
              <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 line-clamp-1">
                {{ item.role }} <span class="mx-1 text-gray-300 dark:text-gray-600">|</span> <span class="text-gray-500">{{ item.company }}</span>
              </p>
            </div>

            <div class="mt-auto border-t border-gray-100 dark:border-white/10 pt-5 flex items-end justify-between">
              <p class="text-sm font-light text-gray-500 dark:text-gray-400 leading-relaxed italic line-clamp-2 pr-4">
                "{{ item.superpower.replace(/<[^>]*>?/gm, '') }}"
              </p>
              <div class="w-8 h-8 shrink-0 rounded-full bg-gray-50 dark:bg-[#051C2C] flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-[#00A9F4] transition-all duration-300">
                <svg class="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>

          </template>

          <template v-else>
            
            <div class="flex items-start justify-between mb-8">
              <div class="w-14 h-14 rounded-xl bg-gray-50 dark:bg-[#051C2C] flex items-center justify-center border border-gray-100 dark:border-white/10 overflow-hidden group-hover:border-[#00A9F4] transition-colors duration-500 p-2">
                 <img v-if="item.logo && item.logo.startsWith('http')" :src="item.logo" class="w-full h-full object-contain transition-all duration-500" />
                 <span v-else class="text-xl font-serif font-bold text-gray-400 group-hover:text-[#00A9F4]">{{ item.name.charAt(0) }}</span>
              </div>
              <span class="text-[9px] font-bold uppercase tracking-widest text-[#00A9F4] bg-[#00A9F4]/10 px-2.5 py-1 rounded-full border border-[#00A9F4]/20">
                Venture
              </span>
            </div>

            <div>
              <h3 class="text-2xl font-serif text-gray-900 dark:text-white mb-1 group-hover:text-[#00A9F4] transition-colors duration-300">
                {{ item.name }}
              </h3>
              <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 line-clamp-1">
                {{ item.industry }}
              </p>
            </div>

            <div class="mt-auto border-t border-gray-100 dark:border-white/10 pt-5 flex items-end justify-between">
              <p class="text-sm font-light text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 pr-4">
                {{ item.hook }}
              </p>
              <div class="w-8 h-8 shrink-0 rounded-full bg-gray-50 dark:bg-[#051C2C] flex items-center justify-center text-gray-300 group-hover:text-white group-hover:bg-[#00A9F4] transition-all duration-300">
                <svg class="w-4 h-4 -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </div>
            </div>

          </template>

        </NuxtLink>
        <div class="min-w-[24px] lg:min-w-[48px]"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>