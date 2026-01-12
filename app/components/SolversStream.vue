<script setup lang="ts">
import { ref, computed } from 'vue'

// 1. FETCH REAL DATA (Logic Retained)
const { data: peopleData } = await useFetch('/api/people')
const { data: companyData } = await useFetch('/api/companies')

// 2. MERGE & NORMALIZE (Logic Retained)
const solvers = computed(() => {
  const p = (peopleData.value || []).slice(0, 10).map((person: any) => ({
    id: `p-${person.id}`,
    type: 'person',
    name: person.name,
    role: person.role,
    company: person.companyName || 'Freelance',
    // Ensure high-res avatars if possible, or fallback
    image: person.image || person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=051C2C&color=fff`,
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

// SCROLL LOGIC (Logic Retained)
const scrollContainer = ref<HTMLElement | null>(null)

const scroll = (direction: 'left' | 'right') => {
  if (scrollContainer.value) {
    const scrollAmount = 400 // Adjusted for wider "Editorial" cards
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <section class="py-24 bg-white dark:bg-[#051C2C] border-b border-gray-100 dark:border-gray-800 transition-colors duration-500 overflow-hidden">
    <div v-animate class="max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8 border-b border-black dark:border-gray-700 pb-6">
        <div>
          <span class="block text-xs font-bold uppercase tracking-[0.2em] text-[#00A9F4] mb-3">
             The Network
          </span>
          <h2 class="text-4xl md:text-5xl font-serif text-[#051C2C] dark:text-white tracking-tight">
            Meet the Solvers.
          </h2>
        </div>
        
        <div class="flex items-center gap-0 border border-gray-200 dark:border-gray-700">
          <button @click="scroll('left')" class="p-4 hover:bg-[#051C2C] hover:text-white dark:hover:bg-white dark:hover:text-[#051C2C] text-[#051C2C] dark:text-white transition-all duration-300 border-r border-gray-200 dark:border-gray-700">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button @click="scroll('right')" class="p-4 hover:bg-[#051C2C] hover:text-white dark:hover:bg-white dark:hover:text-[#051C2C] text-[#051C2C] dark:text-white transition-all duration-300">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      <div v-if="!solvers.length" class="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div v-for="i in 4" :key="i" class="h-[400px] bg-gray-50 dark:bg-[#0A253A] animate-pulse border-t-4 border-gray-200 dark:border-gray-700"></div>
      </div>

      <div 
        v-else
        ref="scrollContainer"
        class="flex gap-8 overflow-x-auto pb-12 -mx-6 px-6 no-scrollbar snap-x snap-mandatory"
      >
        
        <NuxtLink 
          v-for="item in solvers" 
          :key="item.id"
          :to="item.link"
          class="min-w-[320px] max-w-[320px] snap-start group relative flex flex-col h-[420px] bg-transparent border border-gray-200 dark:border-gray-700 hover:border-[#051C2C] dark:hover:border-[#00A9F4] transition-colors duration-300"
        >
          <template v-if="item.type === 'person'">
            <div class="h-1/2 w-full overflow-hidden bg-gray-100 dark:bg-[#02101a] relative">
               <img 
                 :src="item.image" 
                 :alt="item.name" 
                 class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
               >
               <div class="absolute inset-0 bg-gradient-to-t from-[#051C2C]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div class="h-1/2 p-6 flex flex-col justify-between bg-white dark:bg-[#051C2C] relative">
               <div class="absolute top-0 left-6 right-6 h-[1px] bg-gray-100 dark:bg-gray-800 group-hover:bg-[#00A9F4] transition-colors duration-500"></div>
               
               <div class="pt-4">
                 <h3 class="text-2xl font-serif text-[#051C2C] dark:text-white mb-1 group-hover:text-[#00A9F4] transition-colors duration-300">
                   {{ item.name }}
                 </h3>
                 <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                   {{ item.role }} <span class="text-gray-300 dark:text-gray-600">|</span> {{ item.company }}
                 </p>
                 <p class="text-sm font-light text-gray-600 dark:text-gray-300 leading-relaxed italic border-l-2 border-gray-200 dark:border-gray-700 pl-3">
                   "{{ item.superpower.replace(/<[^>]*>?/gm, '') }}"
                 </p>
               </div>

               <div class="flex justify-end">
                 <span class="text-[#051C2C] dark:text-white group-hover:translate-x-2 transition-transform duration-300">
                   <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 </span>
               </div>
            </div>
          </template>

          <template v-else>
            <div class="h-full p-8 flex flex-col justify-between bg-gray-50 dark:bg-[#0A253A] group-hover:bg-[#051C2C] dark:group-hover:bg-white transition-colors duration-500">
               
               <div class="transition-colors duration-300">
                 <span class="inline-block px-2 py-1 mb-6 text-[10px] font-bold uppercase tracking-widest border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 group-hover:border-white/20 group-hover:text-white dark:group-hover:border-[#051C2C]/20 dark:group-hover:text-[#051C2C]">
                   {{ item.industry }}
                 </span>

                 <div class="mb-6 w-16 h-16 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                    <img v-if="item.logo && item.logo.startsWith('http')" :src="item.logo" class="w-full h-full object-contain" />
                    <div v-else class="w-full h-full flex items-center justify-center border-2 border-current text-2xl font-serif font-bold text-gray-400 group-hover:text-white dark:group-hover:text-[#051C2C]">
                      {{ item.name.charAt(0) }}
                    </div>
                 </div>

                 <h3 class="text-3xl font-serif text-[#051C2C] dark:text-white mb-4 group-hover:text-white dark:group-hover:text-[#051C2C] transition-colors duration-300">
                   {{ item.name }}
                 </h3>
                 
                 <p class="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-300 dark:group-hover:text-gray-600 transition-colors duration-300 leading-relaxed">
                   {{ item.hook }}
                 </p>
               </div>

               <div class="border-t border-gray-200 dark:border-gray-600 group-hover:border-white/20 dark:group-hover:border-[#051C2C]/20 pt-4 flex justify-between items-center">
                 <span class="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white dark:group-hover:text-[#051C2C] transition-colors">
                   View Venture
                 </span>
                 <svg class="w-5 h-5 text-gray-400 group-hover:text-white dark:group-hover:text-[#051C2C] group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
               </div>

            </div>
          </template>

        </NuxtLink>

        <div class="min-w-[1px]"></div>

      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>