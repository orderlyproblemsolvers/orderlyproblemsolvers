<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'People Directory - Orderly Problem Solvers',
  description: 'Discover talented problem solvers from around the world. Search and filter by role, location, and expertise to find your next collaborator or hire.',
  
  // Open Graph
  ogTitle: 'People Directory - Orderly Problem Solvers',
  ogDescription: 'Discover talented problem solvers from around the world. Search and filter by role, location, and expertise to find your next collaborator or hire.',
  ogImage: '/img/logo-sm.png',
  ogUrl: 'https://orderlyproblemsolvers.com/people',
  ogType: 'website',

  // Twitter
  twitterCard: 'summary_large_image',
  canonical: 'https://orderlyproblemsolvers.com/people'
})

// --- FILTER STATE ---
const search = ref('')
const selectedRole = ref('')
const selectedLocation = ref('')

// --- OPTIONS CONFIGURATION ---
const filterOptions = {
  roles: [
    'CTO', 'Founder', 'Software Engineer', 'Product Designer', 
    'Product Manager', 'Data Scientist', 'DevOps', 'Mobile Developer'
  ],
  locations: [
    'Lagos', 'Nairobi', 'Cape Town', 'Accra', 'Cairo', 
    'Kigali', 'London', 'Remote'
  ]
}

// --- DATA FETCHING ---
const { data: people, status, error, refresh } = await useFetch('/api/people', {
  query: computed(() => ({
    search: search.value,
    role: selectedRole.value,
    location: selectedLocation.value
  })),
  transform: (data: any[]) => {
    return data.map(p => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      role: p.role,
      company: p.companyName || 'Freelance',
      location: p.location || 'Remote',
      image: p.avatar || `https://ui-avatars.com/api/?name=${p.name}&background=051C2C&color=fff`,
      bio: p.bio,
      status: p.companyName ? 'Active' : 'Open to Work'
    }))
  },
  watch: [selectedRole, selectedLocation]
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
  selectedRole.value = ''
  selectedLocation.value = ''
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
                   The Network
                </span>
                <h1 class="text-5xl md:text-6xl font-serif text-[#051C2C] dark:text-white tracking-tight leading-none">
                   Talent Index<span class="text-[#00A9F4]">.</span>
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
                  placeholder="FIND EXPERT..." 
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
               <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-[#051C2C] dark:text-white">Parameters</h3>
               <button v-if="search || selectedRole || selectedLocation" @click="clearFilters" class="text-[10px] font-bold text-red-500 uppercase tracking-wider hover:underline">Reset</button>
            </div>

            <div class="space-y-10">
               
               <div>
                  <h4 class="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-4">Role</h4>
                  <div class="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                     <label v-for="role in filterOptions.roles" :key="role" class="flex items-center gap-3 cursor-pointer group">
                        <div class="relative flex items-center">
                           <input type="radio" name="role" :value="role" v-model="selectedRole" class="peer sr-only" />
                           <div class="w-4 h-4 border border-gray-300 dark:border-gray-600 group-hover:border-[#00A9F4] transition-colors peer-checked:bg-[#00A9F4] peer-checked:border-[#00A9F4]"></div>
                        </div>
                        <span class="text-sm font-mono text-gray-600 dark:text-gray-400 group-hover:text-[#051C2C] dark:group-hover:text-white transition-colors uppercase" :class="{ 'text-[#051C2C] dark:text-white font-bold': selectedRole === role }">
                           {{ role }}
                        </span>
                     </label>
                  </div>
               </div>

               <div>
                  <h4 class="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-4">Base</h4>
                  <div class="flex flex-wrap gap-2">
                     <button 
                        v-for="loc in filterOptions.locations" 
                        :key="loc" 
                        @click="selectedLocation = selectedLocation === loc ? '' : loc"
                        class="px-3 py-1 border text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                        :class="selectedLocation === loc 
                           ? 'bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] border-[#051C2C] dark:border-white' 
                           : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-[#00A9F4] hover:text-[#00A9F4]'"
                     >
                        {{ loc }}
                     </button>
                  </div>
               </div>

            </div>
         </div>

         <div class="lg:col-span-9">
            
            <div class="flex items-center justify-between mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
               <span class="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                  // Records: {{ people?.length || 0 }}
               </span>
               <div class="hidden md:flex items-center gap-2">
                  <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sort:</span>
                  <span class="text-[10px] font-bold text-[#051C2C] dark:text-white uppercase tracking-widest">Relevant</span>
               </div>
            </div>

            <div v-if="status === 'pending' && !people" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div v-for="i in 6" :key="i" class="h-64 bg-gray-50 dark:bg-[#0A253A] animate-pulse border border-gray-200 dark:border-gray-800"></div>
            </div>

            <div v-else-if="error" class="p-12 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 text-center">
               <p class="font-mono text-red-600 dark:text-red-400 mb-4">ERROR: Unable to retrieve index.</p>
               <button @click="refresh()" class="text-xs font-bold uppercase tracking-widest border-b border-red-500 text-red-500">Retry Connection</button>
            </div>

            <div v-else-if="!people || people.length === 0" class="py-24 border border-dashed border-gray-300 dark:border-gray-700 text-center">
               <h3 class="text-xl font-serif text-[#051C2C] dark:text-white mb-2">No Matches Found</h3>
               <p class="text-gray-500 font-mono text-xs mb-8">Refine your query parameters.</p>
               <button @click="clearFilters" class="px-6 py-3 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:opacity-90">Reset Filters</button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-gray-200 dark:border-gray-800">
               
               <NuxtLink 
                  v-for="person in people" 
                  :key="person.id" 
                  :to="`/people/${person.slug}`"
                  class="group relative bg-white dark:bg-[#051C2C] border-b border-r border-gray-200 dark:border-gray-800 p-8 hover:bg-gray-50 dark:hover:bg-[#0A253A] transition-colors duration-300 flex flex-col h-full cursor-pointer"
               >
                  <div class="absolute top-0 left-0 w-0 h-0.5 bg-[#00A9F4] group-hover:w-full transition-all duration-500"></div>
                  
                  <div class="flex items-start justify-between mb-8">
                     <div class="w-16 h-16 bg-gray-200 dark:bg-black overflow-hidden border border-gray-200 dark:border-gray-700">
                        <img 
                          :src="person.image" 
                          class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" 
                          :alt="person.name"
                        />
                     </div>
                     
                     <div v-if="person.status === 'Open to Work'" class="relative flex h-3 w-3" title="Open to Work">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A9F4] opacity-75"></span>
                        <span class="relative inline-flex rounded-full h-3 w-3 bg-[#00A9F4]"></span>
                     </div>
                  </div>

                  <div class="flex-grow mb-6">
                     <h3 class="text-2xl font-serif text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors mb-2 leading-tight">
                        {{ person.name }}
                     </h3>
                     
                     <div class="flex flex-col gap-1 mb-4">
                        <span class="font-mono text-xs text-[#051C2C] dark:text-white font-bold uppercase">
                           {{ person.role }}
                        </span>
                        <span class="font-mono text-[10px] text-gray-400 uppercase">
                           @ {{ person.company }}
                        </span>
                     </div>
                  </div>

                  <div class="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between group-hover:border-gray-200 dark:group-hover:border-gray-700 transition-colors">
                     <span class="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase">
                        [{{ person.location }}]
                     </span>
                     <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#00A9F4] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>

               </NuxtLink>

            </div>
         </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Scrollbar */
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