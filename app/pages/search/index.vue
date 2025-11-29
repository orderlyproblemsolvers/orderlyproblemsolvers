<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// STATE
const searchQuery = ref((route.query.q as string) || '')
const activeTab = ref('all') // 'all', 'company', 'person', 'story'
const isLoading = ref(false)

// DATA FETCHING
// We use 'immediate: false' because we want to control when the fetch happens (debounce)
// But if there is a query param on load, we fetch immediately.
const { data: results, refresh, status } = await useFetch('/api/search', {
  query: computed(() => ({ q: searchQuery.value })),
  immediate: !!route.query.q, 
  watch: false // Disable auto-watch to implement custom debounce
})

// DEBOUNCE LOGIC
let timeout: NodeJS.Timeout

const handleInput = () => {
  isLoading.value = true
  clearTimeout(timeout)
  
  // Update URL without reloading the page so users can share the link
  router.replace({ query: { ...route.query, q: searchQuery.value } })

  // Wait 500ms after typing stops before hitting the API
  timeout = setTimeout(async () => {
    if (searchQuery.value.length >= 2) {
      await refresh()
    }
    isLoading.value = false
  }, 500)
}

// FILTERING LOGIC (Client-side filter for speed)
const displayResults = computed(() => {
  if (!results.value) return []
  if (activeTab.value === 'all') return results.value
  return results.value.filter((r: any) => r.type === activeTab.value)
})

const tabs = [
  { id: 'all', label: 'All Results' },
  { id: 'company', label: 'Companies' },
  { id: 'person', label: 'People' },
  { id: 'story', label: 'Stories' }
]

// NAVIGATION HELPER
const getLink = (item: any) => {
  if (item.type === 'company') return `/companies/${item.slug}`
  if (item.type === 'person') return `/people/${item.slug}`
  if (item.type === 'story') return `/stories/${item.slug}`
  return '#'
}

useSeoMeta({
  title: 'Search the Index',
  description: 'Find companies, people, and stories across the entire OPS ecosystem.',
  robots: 'noindex',
})
</script>

<template>
  <AppHeader/>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    
    <!-- SEARCH HEADER -->
    <div class="bg-gray-50 border-b border-gray-200 pt-32 pb-0 sticky top-0 z-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Input Field -->
        <div class="relative mb-8">
           <input 
             v-model="searchQuery"
             @input="handleInput"
             type="text" 
             placeholder="Search companies, people, or stories..." 
             class="w-full pl-14 pr-4 py-4 bg-white border border-gray-200 rounded-xl shadow-sm text-lg focus:outline-none focus:border-black transition-colors placeholder-gray-400"
             autofocus
           />
           
           <!-- Search Icon (Default) -->
           <svg v-if="!isLoading && status !== 'pending'" class="w-6 h-6 text-gray-400 absolute left-5 top-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           
           <!-- Loading Spinner -->
           <div v-else class="w-6 h-6 border-2 border-gray-200 border-t-black rounded-full animate-spin absolute left-5 top-4.5"></div>
        </div>
        
        <!-- Tabs -->
        <div class="flex gap-8 overflow-x-auto no-scrollbar">
           <button 
             v-for="tab in tabs" 
             :key="tab.id"
             @click="activeTab = tab.id"
             class="pb-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap px-1"
             :class="activeTab === tab.id ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-800'"
           >
             {{ tab.label }}
           </button>
        </div>
      </div>
    </div>

    <!-- RESULTS AREA -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- LIST OF RESULTS -->
      <div v-if="displayResults.length > 0" class="space-y-4">
         <NuxtLink 
           v-for="item in displayResults" 
           :key="item.id + item.type" 
           :to="getLink(item)"
           class="group flex items-center gap-4 p-5 border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition-all cursor-pointer bg-white"
         >
            
            <!-- Icon / Thumb -->
            <div class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 shrink-0 border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
               <svg v-if="item.type === 'person'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               <svg v-if="item.type === 'company'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
               <svg v-if="item.type === 'story'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
               <div class="flex items-center gap-2 mb-1">
                  <span class="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-2 py-0.5 rounded tracking-wide">{{ item.type }}</span>
               </div>
               <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                  {{ item.name }}
               </h3>
               <p class="text-sm text-gray-500 line-clamp-1" v-if="item.info">
                  {{ item.info }}
               </p>
            </div>

            <!-- Arrow -->
            <svg class="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
         </NuxtLink>
      </div>

      <!-- EMPTY STATE (No Matches) -->
      <div v-else-if="searchQuery && !isLoading && (!results || results.length === 0)" class="text-center py-24 border border-dashed border-gray-200 rounded-2xl">
         <div class="inline-flex p-4 bg-gray-50 rounded-full mb-4">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
         </div>
         <h3 class="text-lg font-bold text-gray-900 mb-2">No results found</h3>
         <p class="text-gray-500 text-sm">We couldn't find anything for "{{ searchQuery }}". <br/>Try a broader keyword or a different category.</p>
      </div>

      <!-- INITIAL STATE (Start Typing) -->
      <div v-else-if="!searchQuery" class="text-center py-32 opacity-50">
         <p class="text-gray-400 font-bold text-sm uppercase tracking-widest">Type to search the index</p>
      </div>

    </div>

  </div>
  <AppFooter/>
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