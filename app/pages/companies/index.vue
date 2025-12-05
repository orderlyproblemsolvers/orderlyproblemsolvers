<script setup lang="ts">
import { ref, computed } from 'vue'

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
// The 'query' computed property ensures the API is called whenever filters change
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
      // UI Helpers / Fallbacks
      color: 'bg-blue-600', // You can map industry to color here if desired
      logo: comp.logo || comp.name.charAt(0),
      // Map DB fields to UI fields (handle short descriptions)
      solution: comp.headline || (comp.description ? comp.description.substring(0, 100) + '...' : 'No description provided.'),
      stack: [], // Placeholder until tagging system is live
      // Mock hiring status for UI demo if DB column missing, or use featured as proxy
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
  <AppHeader/>
  <div class="min-h-screen bg-gray-50/50 dark:bg-slate-950 transition-colors duration-300">
    
    <div class="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 pt-32 pb-8 transition-colors duration-300">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">The Entity Index</p>
                <h1 class="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Companies.</h1>
             </div>
             <div class="w-full md:w-96 relative">
                <input 
                  v-model="search" 
                  @input="handleSearch"
                  type="text" 
                  placeholder="Search companies, problems, or stacks..." 
                  class="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-slate-800 border-transparent dark:border-slate-700 focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white border rounded-lg transition-all text-sm font-medium outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" 
                />
                <svg v-if="status !== 'pending'" class="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <div v-else class="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 border-t-black dark:border-t-white rounded-full animate-spin absolute left-3 top-3"></div>
             </div>
          </div>
       </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
         
         <div class="hidden lg:block lg:col-span-3 sticky top-32 space-y-10">
            
            <div>
               <div class="flex items-center justify-between mb-4">
                 <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">By Industry</h3>
                 <button v-if="selectedIndustry" @click="selectedIndustry = ''" class="text-[10px] font-bold text-red-500 hover:underline">Clear</button>
               </div>
               <div class="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  <label v-for="ind in filterOptions.industries" :key="ind" class="flex items-center gap-3 cursor-pointer group">
                     <input 
                        type="radio" 
                        name="industry" 
                        :value="ind" 
                        v-model="selectedIndustry"
                        class="w-4 h-4 border-gray-300 dark:border-slate-600 text-black focus:ring-black accent-black dark:accent-white" 
                     />
                     <span class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" :class="{ 'font-bold text-black dark:text-white': selectedIndustry === ind }">{{ ind }}</span>
                  </label>
               </div>
            </div>

            <div>
               <div class="flex items-center justify-between mb-4">
                 <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Funding Stage</h3>
                 <button v-if="selectedStage" @click="selectedStage = ''" class="text-[10px] font-bold text-red-500 hover:underline">Clear</button>
               </div>
               <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="stage in filterOptions.stages" 
                    :key="stage" 
                    @click="selectedStage = selectedStage === stage ? '' : stage"
                    class="px-3 py-1.5 rounded text-xs font-bold border transition-colors"
                    :class="selectedStage === stage ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:border-black dark:hover:border-white'"
                  >
                     {{ stage }}
                  </button>
               </div>
            </div>
            
            <div class="pt-6 border-t border-gray-200 dark:border-slate-800">
               <label class="flex items-center gap-3 cursor-pointer group">
                  <div class="relative inline-flex items-center">
                     <input type="checkbox" v-model="isHiring" class="sr-only peer">
                     <div class="w-9 h-5 bg-gray-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <span class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Hiring Only</span>
               </label>
            </div>

            <button 
              v-if="search || selectedIndustry || selectedStage || isHiring" 
              @click="clearFilters"
              class="w-full py-2 text-xs font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700 rounded hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Reset All Filters
            </button>
         </div>

         <div class="lg:col-span-9">
            
            <div class="flex items-center justify-between mb-6">
               <span class="text-sm font-bold text-gray-500 dark:text-gray-400">
                 Showing {{ companies?.length || 0 }} Verified Companies
               </span>
               <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Sort:</span>
                  <span class="text-xs font-bold text-black dark:text-white">Newest Added</span>
               </div>
            </div>

            <div v-if="status === 'pending' && !companies" class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div v-for="i in 4" :key="i" class="h-64 bg-gray-100 dark:bg-slate-900 rounded-xl animate-pulse border border-gray-200 dark:border-slate-800"></div>
            </div>

            <div v-else-if="error" class="p-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-center border border-red-100 dark:border-red-900/30">
               <p class="font-bold">Unable to load directory.</p>
               <p class="text-sm mt-1">{{ error.message }}</p>
               <button @click="refresh()" class="mt-4 text-xs font-bold underline">Try Again</button>
            </div>

            <div v-else-if="!companies || companies.length === 0" class="p-16 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-center">
               <div class="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 dark:text-slate-600">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
               </div>
               <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">No companies match your criteria</h3>
               <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm">Try clearing filters or searching for a different stack.</p>
               <button @click="clearFilters" class="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-bold text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">Clear Filters</button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               <NuxtLink 
                 v-for="comp in companies" 
                 :key="comp.id" 
                 :to="`/companies/${comp.slug}`"
                 class="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col cursor-pointer"
               >
                  
                  <div class="flex items-start justify-between mb-6">
                     <div class="flex items-center gap-4">
                        <div :class="`w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0 overflow-hidden`">
                           <img v-if="comp.logo && comp.logo.startsWith('http')" :src="comp.logo" class="w-full h-full object-cover" />
                           <span v-else class="text-xl font-black uppercase">{{ comp.logo }}</span>
                        </div>
                        <div>
                           <h3 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{{ comp.name }}</h3>
                           <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wide">{{ comp.industry }}</p>
                        </div>
                     </div>
                     <span class="px-2 py-1 bg-gray-50 dark:bg-slate-800 text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 rounded border border-gray-100 dark:border-slate-700 whitespace-nowrap">
                        {{ comp.stage }}
                     </span>
                  </div>

                  <div class="mb-6 flex-grow">
                     <h4 class="text-[10px] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest mb-1">Solving For:</h4>
                     <p class="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed line-clamp-2">
                        {{ comp.solution }}
                     </p>
                  </div>

                  <div class="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between">
                     <div class="flex gap-2">
                        <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-slate-800 px-2 py-1 rounded">
                           View Details
                        </span>
                     </div>
                     
                     <div v-if="comp.hiring" class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                        <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        <span class="text-[10px] font-bold uppercase">Hiring</span>
                     </div>
                  </div>
               </NuxtLink>

            </div>

            <div v-if="companies && companies.length > 20" class="mt-12 flex justify-center">
               <button class="px-6 py-3 bg-white dark:bg-slate-900 text-black dark:text-white border border-gray-200 dark:border-slate-700 text-sm font-bold rounded-lg hover:border-black dark:hover:border-white transition-colors">Load More</button>
            </div>
         </div>

      </div>
    </div>
  </div>
  <AppFooter/>
</template>

<style scoped>
/* Custom Scrollbar for filter list */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
/* Dark mode scrollbar */
:global(.dark) .custom-scrollbar::-webkit-scrollbar-track {
  background: #1e293b; 
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db; 
  border-radius: 4px;
}
:global(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #475569; 
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af; 
}
</style>