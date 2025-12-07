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
      image: p.avatar || `https://ui-avatars.com/api/?name=${p.name}&background=random&size=128`,
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
  <AppHeader/>
  <div class="min-h-screen bg-gray-50/50 dark:bg-slate-950 transition-colors duration-300">
    
    <div class="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 pt-32 pb-8 transition-colors duration-300">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
                <p class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">The Talent Index</p>
                <h1 class="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">People.</h1>
             </div>
             <div class="w-full md:w-96 relative">
                <input 
                  v-model="search" 
                  @input="handleSearch"
                  type="text" 
                  placeholder="Search by name, role, or bio..." 
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
                 <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Role</h3>
                 <button v-if="selectedRole" @click="selectedRole = ''" class="text-[10px] font-bold text-red-500 hover:underline">Clear</button>
               </div>
               <div class="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  <label v-for="role in filterOptions.roles" :key="role" class="flex items-center gap-3 cursor-pointer group">
                     <input 
                        type="radio" 
                        name="role" 
                        :value="role" 
                        v-model="selectedRole"
                        class="w-4 h-4 border-gray-300 dark:border-slate-600 text-black focus:ring-black accent-black dark:accent-white" 
                     />
                     <span class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" :class="{ 'font-bold text-black dark:text-white': selectedRole === role }">{{ role }}</span>
                  </label>
               </div>
            </div>

            <div>
               <div class="flex items-center justify-between mb-4">
                 <h3 class="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">Location</h3>
                 <button v-if="selectedLocation" @click="selectedLocation = ''" class="text-[10px] font-bold text-red-500 hover:underline">Clear</button>
               </div>
               <div class="flex flex-wrap gap-2">
                  <button 
                    v-for="loc in filterOptions.locations" 
                    :key="loc" 
                    @click="selectedLocation = selectedLocation === loc ? '' : loc"
                    class="px-3 py-1.5 rounded text-xs font-bold border transition-colors"
                    :class="selectedLocation === loc ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'bg-white dark:bg-slate-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:border-black dark:hover:border-white'"
                  >
                     {{ loc }}
                  </button>
               </div>
            </div>

            <button 
              v-if="search || selectedRole || selectedLocation" 
              @click="clearFilters"
              class="w-full py-2 text-xs font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-slate-700 rounded hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
            >
              Reset All Filters
            </button>
         </div>

         <div class="lg:col-span-9">
            
            <div class="flex items-center justify-between mb-6">
               <span class="text-sm font-bold text-gray-500 dark:text-gray-400">Showing {{ people?.length || 0 }} Solvers</span>
               <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">Sort:</span>
                  <span class="text-xs font-bold text-black dark:text-white">Newest First</span>
               </div>
            </div>

            <div v-if="status === 'pending' && !people" class="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div v-for="i in 6" :key="i" class="h-56 bg-gray-100 dark:bg-slate-900 rounded-xl animate-pulse border border-gray-200 dark:border-slate-800"></div>
            </div>

            <div v-else-if="error" class="p-8 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-center border border-red-100 dark:border-red-900/30">
               <p class="font-bold">Unable to load directory.</p>
               <p class="text-sm mt-1">{{ error.message }}</p>
               <button @click="refresh()" class="mt-4 text-xs font-bold underline">Try Again</button>
            </div>

            <div v-else-if="!people || people.length === 0" class="p-16 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl text-center">
               <div class="w-16 h-16 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 dark:text-slate-600">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
               </div>
               <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">No results match your criteria</h3>
               <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto text-sm">We couldn't find anyone matching the filters. Try clearing them or searching for something else.</p>
               <button @click="clearFilters" class="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg font-bold text-sm hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors">Clear Filters</button>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
               
               <NuxtLink 
                 v-for="person in people" 
                 :key="person.id" 
                 :to="`/people/${person.slug}`"
                 class="group bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 flex flex-col cursor-pointer"
               >
                  
                  <div class="flex items-start justify-between mb-4">
                     <div class="flex items-center gap-4">
                        <div class="relative">
                           <img :src="person.image" class="w-14 h-14 rounded-full object-cover border border-gray-100 dark:border-slate-700 bg-gray-50 dark:bg-slate-800" />
                           <div v-if="person.status === 'Open to Work'" class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" title="Available"></div>
                        </div>
                        <div>
                           <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{{ person.name }}</h3>
                           <p class="text-xs text-gray-500 dark:text-gray-400 font-medium line-clamp-1">
                              {{ person.role }} 
                              <span v-if="person.company !== 'Freelance'">
                                <span class="text-gray-300 dark:text-gray-600 mx-1">@</span> <span class="text-black dark:text-gray-200 font-bold">{{ person.company }}</span>
                              </span>
                           </p>
                        </div>
                     </div>
                     <span class="px-2 py-1 bg-gray-50 dark:bg-slate-800 text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 rounded border border-gray-100 dark:border-slate-700 whitespace-nowrap">
                        {{ person.location }}
                     </span>
                  </div>

                  <div v-html="person.bio || 'No bio available'" class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-2 grow">
                  </div>

                  <div class="mt-auto pt-4 border-t border-gray-50 dark:border-slate-800 flex items-center justify-between">
                     <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                        View Profile
                     </span>
                     <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </div>
               </NuxtLink>

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