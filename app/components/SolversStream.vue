<script setup lang="ts">
import { ref, computed } from 'vue'

// 1. FETCH REAL DATA
// We grab the latest list from both directories
const { data: peopleData } = await useFetch('/api/people')
const { data: companyData } = await useFetch('/api/companies')

// 2. MERGE & NORMALIZE
// We combine them into a single "Solvers" list for the feed
const solvers = computed(() => {
  const p = (peopleData.value || []).slice(0, 10).map((person: any) => ({
    id: `p-${person.id}`,
    type: 'person',
    name: person.name,
    role: person.role,
    company: person.companyName || 'Freelance',
    image: person.image || person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=random`,
    superpower: person.bio ? person.bio.substring(0, 60) + '...' : 'Building the future.',
    link: `/people/${person.slug}`
  }))

  const c = (companyData.value || []).slice(0, 10).map((comp: any) => ({
    id: `c-${comp.id}`,
    type: 'company',
    name: comp.name,
    industry: comp.industry,
    logo: comp.logo,
    hook: comp.headline || 'Solving complex problems.',
    link: `/companies/${comp.slug}`
  }))

  // Interleave them (Person, Company, Person, Company...)
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
    const scrollAmount = 320 
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}
</script>

<template>
  <section class="py-20 bg-white border-b border-gray-100 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- HEADER -->
      <div class="flex items-center justify-between mb-8">
        <div>
           <h2 class="text-3xl font-black text-gray-900 tracking-tight mb-2">
            Meet the Solvers.
          </h2>
          <p class="text-lg text-gray-500">
             Fresh faces and new teams joining the ecosystem.
          </p>
        </div>
       
        <!-- CONTROLS -->
        <div class="hidden md:flex items-center gap-2">
          <button @click="scroll('left')" class="p-2 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
          </button>
          <button @click="scroll('right')" class="p-2 rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition">
             <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>

      <!-- LOADING STATE -->
      <div v-if="!solvers.length" class="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div v-for="i in 4" :key="i" class="h-60 bg-gray-100 rounded-2xl animate-pulse"></div>
      </div>

      <!-- STREAM CONTENT -->
      <div 
        v-else
        ref="scrollContainer"
        class="grid grid-rows-2 grid-flow-col auto-cols-[300px] gap-6 overflow-x-auto pb-8 -mx-4 px-4 no-scrollbar snap-x snap-mandatory"
      >
        
        <NuxtLink 
          v-for="item in solvers" 
          :key="item.id"
          :to="item.link"
          class="h-60 snap-start group relative hover:-translate-y-1 transition-all duration-300"
        >
          
          <!-- PERSON CARD -->
          <div v-if="item.type === 'person'" class="h-full bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-full object-cover border border-gray-100 bg-gray-50">
                <div class="min-w-0">
                  <h3 class="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">{{ item.name }}</h3>
                  <p class="text-xs font-medium text-gray-500 truncate">{{ item.role }}</p>
                  <p class="text-[10px] text-gray-400 truncate">@ {{ item.company }}</p>
                </div>
              </div>
              <div class="bg-blue-50/50 rounded-lg p-3">
                 <p class="text-xs font-bold text-blue-700 uppercase mb-1">About</p>
                 <p class="text-xs font-medium text-gray-700 leading-snug line-clamp-2">"{{ item.superpower }}"</p>
              </div>
            </div>
          </div>

          <!-- COMPANY CARD -->
          <div v-else class="h-full bg-gray-50 border border-gray-200 rounded-2xl p-5 hover:bg-white hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between">
             <div>
               <div class="flex items-center justify-between mb-4">
                  <div class="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 overflow-hidden">
                     <img v-if="item.logo && item.logo.startsWith('http')" :src="item.logo" class="w-full h-full object-cover" />
                     <span v-else class="text-sm font-black uppercase">{{ item.name.charAt(0) }}</span>
                  </div>
                  <span class="px-2 py-1 rounded bg-white border border-gray-200 text-[10px] font-bold text-gray-500 uppercase tracking-wide group-hover:text-blue-600 group-hover:border-blue-100">{{ item.industry }}</span>
               </div>
               <h3 class="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors truncate">{{ item.name }}</h3>
               <p class="text-sm text-gray-500 leading-snug line-clamp-2">{{ item.hook }}</p>
             </div>
          </div>

        </NuxtLink>
        
        <div class="w-4"></div>

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