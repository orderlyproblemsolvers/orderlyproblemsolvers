<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Companies Directory - Orderly Problem Solvers',
  description: 'Discover innovative companies solving real-world problems across various industries. Explore our curated directory of solution-driven enterprises.',
  
  // Open Graph
  ogTitle: 'Companies Directory - Orderly Problem Solvers',
  ogDescription: 'Discover innovative companies solving real-world problems across various industries. Explore our curated directory of solution-driven enterprises.',
  ogImage: '/img/logo-sm.png',
  ogUrl: 'https://orderlyproblemsolvers.com/companies',
  ogType: 'website',
  // Twitter
  twitterCard: 'summary_large_image',
})

// --- FILTER STATE ---
const search = ref('')
const selectedIndustry = ref('')
const selectedStage = ref('')
const isHiring = ref(false)

// --- OPTIONS CONFIGURATION ---
const filterOptions = {
  industries: [
    'FinTech', 'HealthTech', 'AgriTech', 'Logistics', 'EdTech', 
    'Clean Energy', 'PropTech', 'GovTech', 'E-commerce', 'AI & Data'
  ],
  stages: [
    'Bootstrapped', 'Pre-Seed', 'Seed', 'Series A', 'Series B+', 'Public'
  ]
}

// --- DATA FETCHING ---
const { data: companies, status, error, refresh } = await useFetch('/api/companies', {
  query: computed(() => ({
    search: search.value,
    industry: selectedIndustry.value,
    stage: selectedStage.value,
    hiring: isHiring.value ? 'true' : undefined
  })),
  transform: (data: any[]) => {
    return data.map(comp => ({
      ...comp,
      color: 'bg-blue-600',
      logo: comp.logo || comp.name.charAt(0),
      solution: comp.headline || (comp.description ? comp.description.substring(0, 100) + '...' : 'No description provided.'),
      stack: [], 
      hiring: comp.featured || false 
    }))
  },
  watch: [selectedIndustry, selectedStage, isHiring]
})

// --- DEBOUNCE SEARCH ---
let timeout: NodeJS.Timeout
const handleSearch = () => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    refresh()
  }, 500)
}

// --- HELPERS ---
const clearFilters = () => {
  search.value = ''
  selectedIndustry.value = ''
  selectedStage.value = ''
  isHiring.value = false
  refresh()
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A253A] pt-32 pb-12 transition-colors duration-500">
       <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
             <div>
                <span class="block text-xs font-bold uppercase tracking-[0.2em] text-[#00A9F4] mb-3">
                   Global Directory
                </span>
                <h1 class="text-5xl md:text-6xl font-serif text-[#051C2C] dark:text-white tracking-tight leading-none">
                   The Entity Index<span class="text-[#00A9F4]">.</span>
                </h1>
             </div>

             <div class="w-full lg:w-[480px] relative group">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                   <svg v-if="status !== 'pending'" class="w-5 h-5 text-gray-400 group-focus-within:text-[#00A9F4] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                   <div v-else class="w-4 h-4 border-2 border-[#00A9F4] border-t-transparent rounded-full animate-spin"></div>
                </div>
                <input 
                  v-model="search" 
                  @input="handleSearch"
                  type="text" 
                  placeholder="SEARCH DATABASE..." 
                  class="block w-full pl-12 pr-4 py-4 bg-white dark:bg-[#051C2C] border-2 border-gray-200 dark:border-gray-700 text-[#051C2C] dark:text-white placeholder-gray-400 font-mono text-sm focus:border-[#00A9F4] focus:ring-0 transition-all uppercase tracking-wider" 
                />
             </div>
          </div>

       </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
         
         <div class="hidden lg:block lg:col-span-3 sticky top-32">
            
            <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
               <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-[#051C2C] dark:text-white">Filters</h3>
               <button v-if="search || selectedIndustry || selectedStage || isHiring" @click="clearFilters" class="text-[10px] font-bold text-red-500 uppercase tracking-wider hover:underline">Reset</button>
            </div>

            <div class="space-y-10">
               
               <div>
                  <h4 class="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-4">Sector</h4>
                  <div class="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                     <label v-for="ind in filterOptions.industries" :key="ind" class="flex items-center gap-3 cursor-pointer group">
                        <div class="relative flex items-center">
                           <input type="radio" name="industry" :value="ind" v-model="selectedIndustry" class="peer sr-only" />
                           <div class="w-4 h-4 border border-gray-300 dark:border-gray-600 group-hover:border-[#00A9F4] transition-colors peer-checked:bg-[#00A9F4] peer-checked:border-[#00A9F4]"></div>
                        </div>
                        <span class="text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-[#051C2C] dark:group-hover:text-white transition-colors uppercase" :class="{ 'text-[#051C2C] dark:text-white font-bold': selectedIndustry === ind }">
                           {{ ind }}
                        </span>
                     </label>
                  </div>
               </div>

               <div>
                  <h4 class="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-4">Stage</h4>
                  <div class="flex flex-wrap gap-2">
                     <button 
                        v-for="stage in filterOptions.stages" 
                        :key="stage" 
                        @click="selectedStage = selectedStage === stage ? '' : stage"
                        class="px-3 py-1 border text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                        :class="selectedStage === stage 
                           ? 'bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] border-[#051C2C] dark:border-white' 
                           : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-[#00A9F4] hover:text-[#00A9F4]'"
                     >
                        {{ stage }}
                     </button>
                  </div>
               </div>
               
               <div class="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <label class="flex items-center justify-between cursor-pointer group">
                     <span class="text-sm font-bold uppercase tracking-wide text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors">Hiring Now</span>
                     <div class="relative inline-flex items-center">
                        <input type="checkbox" v-model="isHiring" class="sr-only peer">
                        <div class="w-10 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none rounded-none peer-checked:bg-[#00A9F4] transition-colors after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                     </div>
                  </label>
               </div>
            </div>
         </div>

         <div class="lg:col-span-9">
            
            <div class="flex items-center justify-between mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
               <span class="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  // Records: {{ companies?.length || 0 }}
               </span>
               <div class="hidden md:flex items-center gap-2">
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort:</span>
                  <span class="text-[10px] font-bold text-[#051C2C] dark:text-white uppercase tracking-widest">Date Added (DESC)</span>
               </div>
            </div>

            <div v-if="status === 'pending' && !companies" class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div v-for="i in 4" :key="i" class="h-64 bg-gray-50 dark:bg-[#0A253A] animate-pulse border border-gray-200 dark:border-gray-800"></div>
            </div>

            <div v-else-if="error" class="p-12 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 text-center">
               <p class="font-mono text-red-600 dark:text-red-400 mb-4">ERROR: Unable to retrieve index.</p>
               <button @click="refresh()" class="text-xs font-bold uppercase tracking-widest border-b border-red-500 text-red-500">Retry Connection</button>
            </div>

            <div v-else-if="!companies || companies.length === 0" class="py-24 border border-dashed border-gray-300 dark:border-gray-700 text-center">
               <h3 class="text-xl font-serif text-[#051C2C] dark:text-white mb-2">No Matches Found</h3>
               <p class="text-gray-500 font-mono text-xs mb-8">Refine your query parameters.</p>
               <button @click="clearFilters" class="px-6 py-3 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:opacity-90">Reset Filters</button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-gray-200 dark:border-gray-800">
               
               <NuxtLink 
                  v-for="comp in companies" 
                  :key="comp.id" 
                  :to="`/companies/${comp.slug}`"
                  class="group relative bg-white dark:bg-[#051C2C] border-b border-r border-gray-200 dark:border-gray-800 p-8 hover:bg-gray-50 dark:hover:bg-[#0A253A] transition-colors duration-300 flex flex-col h-full"
               >
                  <div class="absolute top-0 left-0 w-0 h-0.5 bg-[#00A9F4] group-hover:w-full transition-all duration-500"></div>
                  
                  <div class="flex items-start justify-between mb-8">
                     <div class="w-12 h-12 border border-gray-200 dark:border-gray-700 bg-white dark:bg-black flex items-center justify-center p-1">
                        <img v-if="comp.logo && comp.logo.startsWith('http')" :src="comp.logo" class="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                        <span v-else class="text-lg font-black text-gray-400 group-hover:text-[#051C2C] dark:group-hover:text-white transition-colors">{{ comp.logo }}</span>
                     </div>
                     <div v-if="comp.hiring" class="flex items-center gap-2 border border-[#00A9F4] px-2 py-1">
                        <span class="w-1.5 h-1.5 bg-[#00A9F4] animate-pulse"></span>
                        <span class="text-[10px] font-bold text-[#00A9F4] uppercase tracking-widest">Open Req</span>
                     </div>
                  </div>

                  <div class="flex-grow mb-8">
                     <div class="flex items-center gap-3 mb-2">
                        <h3 class="text-2xl font-serif text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors">
                           {{ comp.name }}
                        </h3>
                     </div>
                     
                     <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4 font-light">
                        {{ comp.solution }}
                     </p>

                     <div class="flex flex-wrap gap-2">
                        <span class="font-mono text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 uppercase">
                           [{{ comp.industry }}]
                        </span>
                        <span class="font-mono text-[10px] text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 uppercase">
                           [{{ comp.stage }}]
                        </span>
                     </div>
                  </div>

                  <div class="mt-auto flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 group-hover:border-[#00A9F4]/20 transition-colors">
                     <span class="text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-[#051C2C] dark:group-hover:text-white transition-colors">
                        View Dossier
                     </span>
                     <svg class="w-4 h-4 text-gray-400 group-hover:text-[#00A9F4] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>

               </NuxtLink>

            </div>

            <div v-if="companies && companies.length > 20" class="mt-16 flex justify-center">
               <button class="px-8 py-4 border border-[#051C2C] dark:border-white text-[#051C2C] dark:text-white text-xs font-bold uppercase tracking-widest hover:bg-[#051C2C] hover:text-white dark:hover:bg-white dark:hover:text-[#051C2C] transition-all">
                  Load Additional Records
               </button>
            </div>
         </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar for filter list */
.custom-scrollbar::-webkit-scrollbar {
  width: 2px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db; 
}
:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569; 
}
</style>