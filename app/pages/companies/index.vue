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
    "FinTech",
  "HealthTech",
  "AgriTech",
  "Logistics",
  "EdTech",
  "Clean Energy",
  "E-Commerce",
  "Real Estate",
  "Manufacturing",
  "Telecommunications",
  "Media & Entertainment",
  "Retail",
  "Transportation",
  "Hospitality",
  "Cybersecurity",
  "Artificial Intelligence",
  "Software Development",
  "Cloud Computing",
  "Gaming",
  "Fashion & Apparel",
  "Food & Beverage",
  "Automotive",
  "Aerospace & Defense",
  "Pharmaceuticals",
  "Insurance",
  "Banking",
  "Construction",
  "Mining",
  "Oil & Gas",
  "Utilities",
  "Tourism",
  "Sports & Recreation",
  "Beauty & Wellness"
  ],
  stages: [
    "Bootstrapped",
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series B+",
  "Series C",
  "Series D",
  "Series E",
  "Series F+",
  "Growth Stage",
  "Late Stage",
  "Pre-IPO",
  "IPO",
  "Private Equity",
  "Acquisition",
  "Grant Funding",
  "Angel Investment",
  "Venture Capital",
  "Crowdfunding",
  "Debt Financing"
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
  <div class="min-h-screen bg-gray-50/50">
    
    <!-- PAGE HEADER -->
    <div class="bg-white border-b border-gray-200 pt-32 pb-8">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">The Entity Index</p>
                <h1 class="text-4xl font-black text-gray-900 tracking-tighter">Companies.</h1>
             </div>
             <!-- Search Input -->
             <div class="w-full md:w-96 relative">
                <input 
                  v-model="search" 
                  @input="handleSearch"
                  type="text" 
                  placeholder="Search companies, problems, or stacks..." 
                  class="w-full pl-10 pr-4 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-black border rounded-lg transition-all text-sm font-medium outline-none" 
                />
                <svg v-if="status !== 'pending'" class="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <div v-else class="w-5 h-5 border-2 border-gray-300 border-t-black rounded-full animate-spin absolute left-3 top-3"></div>
             </div>
          </div>
       </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
         
         <!-- SIDEBAR FILTERS -->
         <div class="hidden lg:block lg:col-span-3 sticky top-32 space-y-10">
            
            <!-- Industry Filter -->
            <div>
               <div class="flex items-center justify-between mb-4">
                 <h3 class="text-xs font-black uppercase tracking-widest text-gray-900">By Industry</h3>
                 <button v-if="selectedIndustry" @click="selectedIndustry = ''" class="text-[10px] font-bold text-red-500 hover:underline">Clear</button>
               </div>
               <div class="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  <label v-for="ind in filterOptions.industries" :key="ind" class="flex items-center gap-3 cursor-pointer group">
                     <input 
                        type="radio" 
                        name="industry" 
                        :value="ind" 
                        v-model="selectedIndustry"
                        class="w-4 h-4 border-gray-300 text-black focus:ring-black accent-black" 
                     />
                     <span class="text-sm text-gray-600 group-hover:text-black transition-colors" :class="{ 'font-bold text-black': selectedIndustry === ind }">{{ ind }}</span>
                  </label>
               </div>
            </div>

            <!-- Stage Filter -->
            <div>
               <div class="flex items-center justify-between mb-4">
                 <h3 class="text-xs font-black uppercase tracking-widest text-gray-900">Funding Stage</h3>
                 <button v-if="selectedStage" @click="selectedStage = ''" class="text-[10px] font-bold text-red-500 hover:underline">Clear</button>
               </div>
               <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="stage in filterOptions.stages" 
                    :key="stage" 
                    @click="selectedStage = selectedStage === stage ? '' : stage"
                    class="px-3 py-1.5 rounded text-xs font-bold border transition-colors"
                    :class="selectedStage === stage ? 'bg-black text-white border-black' : 'bg-white text-gray-600 border-gray-200 hover:border-black'"
                  >
                     {{ stage }}
                  </button>
               </div>
            </div>
            
            <!-- Hiring Filter (Optional Visual) -->
            <div class="pt-6 border-t border-gray-200">
               <label class="flex items-center gap-3 cursor-pointer group">
                  <div class="relative inline-flex items-center">
                     <input type="checkbox" v-model="isHiring" class="sr-only peer">
                     <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                  </div>
                  <span class="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">Hiring Only</span>
               </label>
            </div>

            <!-- Global Reset -->
            <button 
              v-if="search || selectedIndustry || selectedStage || isHiring" 
              @click="clearFilters"
              class="w-full py-2 text-xs font-bold text-gray-500 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
            >
              Reset All Filters
            </button>
         </div>

         <!-- RESULTS GRID -->
         <div class="lg:col-span-9">
            
            <!-- Result Count & Sort -->
            <div class="flex items-center justify-between mb-6">
               <span class="text-sm font-bold text-gray-500">
                 Showing {{ companies?.length || 0 }} Verified Companies
               </span>
               <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-gray-400 uppercase">Sort:</span>
                  <span class="text-xs font-bold text-black">Newest Added</span>
               </div>
            </div>

            <!-- LOADING STATE -->
            <div v-if="status === 'pending' && !companies" class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div v-for="i in 4" :key="i" class="h-64 bg-gray-100 rounded-xl animate-pulse border border-gray-200"></div>
            </div>

            <!-- ERROR STATE -->
            <div v-else-if="error" class="p-8 bg-red-50 text-red-600 rounded-xl text-center border border-red-100">
               <p class="font-bold">Unable to load directory.</p>
               <p class="text-sm mt-1">{{ error.message }}</p>
               <button @click="refresh()" class="mt-4 text-xs font-bold underline">Try Again</button>
            </div>

            <!-- EMPTY STATE -->
            <div v-else-if="!companies || companies.length === 0" class="p-16 bg-white border border-gray-200 rounded-xl text-center">
               <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
               </div>
               <h3 class="text-lg font-bold text-gray-900 mb-2">No companies match your criteria</h3>
               <p class="text-gray-500 mb-6 max-w-md mx-auto text-sm">Try clearing filters or searching for a different stack.</p>
               <button @click="clearFilters" class="px-6 py-3 bg-gray-900 text-white rounded-lg font-bold text-sm hover:bg-gray-700 transition-colors">Clear Filters</button>
            </div>

            <!-- REAL DATA GRID -->
            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               <NuxtLink 
                 v-for="comp in companies" 
                 :key="comp.id" 
                 :to="`/companies/${comp.slug}`"
                 class="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-200/50 hover:border-blue-200 transition-all duration-300 flex flex-col cursor-pointer"
               >
                  
                  <!-- Card Header -->
                  <div class="flex items-start justify-between mb-6">
                     <div class="flex items-center gap-4">
                        <div :class="`w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0 overflow-hidden`">
                           <!-- Logo Logic: Show Image if URL, else Initial -->
                           <img v-if="comp.logo && comp.logo.startsWith('http')" :src="comp.logo" class="w-full h-full object-cover" />
                           <span v-else class="text-xl font-black uppercase">{{ comp.logo }}</span>
                        </div>
                        <div>
                           <h3 class="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">{{ comp.name }}</h3>
                           <p class="text-xs font-bold text-gray-400 uppercase tracking-wide">{{ comp.industry }}</p>
                        </div>
                     </div>
                     <span class="px-2 py-1 bg-gray-50 text-[10px] font-bold uppercase text-gray-500 rounded border border-gray-100 whitespace-nowrap">
                        {{ comp.stage }}
                     </span>
                  </div>

                  <!-- Solution -->
                  <div class="mb-6 flex-grow">
                     <h4 class="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Solving For:</h4>
                     <p class="text-sm text-gray-600 font-medium leading-relaxed line-clamp-2">
                        {{ comp.solution }}
                     </p>
                  </div>

                  <!-- Footer -->
                  <div class="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                     <div class="flex gap-2">
                        <!-- Placeholder Stack Badges -->
                        <span class="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded">
                           View Details
                        </span>
                     </div>
                     
                     <!-- Conditional Hiring Badge -->
                     <div v-if="comp.hiring" class="flex items-center gap-1.5 px-2 py-1 rounded-full bg-blue-50 text-blue-700">
                        <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        <span class="text-[10px] font-bold uppercase">Hiring</span>
                     </div>
                  </div>
               </NuxtLink>

            </div>

            <!-- Pagination (Static) -->
            <div v-if="companies && companies.length > 20" class="mt-12 flex justify-center">
               <button class="px-6 py-3 bg-white border border-gray-200 text-sm font-bold rounded-lg hover:border-black transition-colors">Load More</button>
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
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af; 
}
</style>