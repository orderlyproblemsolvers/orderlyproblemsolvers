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
const { data: results, refresh, status } = await useFetch('/api/search', {
  query: computed(() => ({ q: searchQuery.value })),
  immediate: !!route.query.q, 
  watch: false 
})

// DEBOUNCE LOGIC
let timeout: NodeJS.Timeout

const handleInput = () => {
  isLoading.value = true
  clearTimeout(timeout)
  
  // Update URL
  router.replace({ query: { ...route.query, q: searchQuery.value } })

  // Wait 500ms
  timeout = setTimeout(async () => {
    if (searchQuery.value.length >= 2) {
      await refresh()
    }
    isLoading.value = false
  }, 500)
}

// FILTERING LOGIC
const displayResults = computed(() => {
  if (!results.value) return []
  if (activeTab.value === 'all') return results.value
  return results.value.filter((r: any) => r.type === activeTab.value)
})

const tabs = [
  { id: 'all', label: 'All Records' },
  { id: 'company', label: 'Entities' },
  { id: 'person', label: 'Talent' },
  { id: 'story', label: 'Journal' }
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
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="sticky top-0 z-30 bg-white/95 dark:bg-[#051C2C]/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div class="max-w-5xl mx-auto px-6 lg:px-12 pt-24 pb-8">
        
        <div class="relative group">
           <div class="absolute top-1/2 -translate-y-1/2 left-0 font-mono text-xl text-gray-300 dark:text-gray-600 select-none">
             <span v-if="isLoading" class="animate-pulse text-[#00A9F4]">>_</span>
             <span v-else>></span>
           </div>
           
           <input 
             v-model="searchQuery"
             @input="handleInput"
             type="text" 
             placeholder="ENTER QUERY..." 
             class="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-4 pl-10 text-2xl md:text-4xl font-mono font-bold uppercase text-[#051C2C] dark:text-white placeholder-gray-200 dark:placeholder-gray-700 focus:border-[#00A9F4] focus:outline-none transition-colors"
             autofocus
           />
           
           <div v-if="isLoading || status === 'pending'" class="absolute right-0 top-1/2 -translate-y-1/2">
              <div class="w-5 h-5 border-2 border-[#00A9F4] border-t-transparent rounded-full animate-spin"></div>
           </div>
        </div>
        
        <div class="mt-8 flex items-center justify-between">
           <div class="flex gap-4 overflow-x-auto no-scrollbar">
              <button 
                v-for="tab in tabs" 
                :key="tab.id"
                @click="activeTab = tab.id"
                class="text-xs font-bold uppercase tracking-widest px-3 py-1 transition-all"
                :class="activeTab === tab.id ? 'bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C]' : 'text-gray-400 hover:text-[#051C2C] dark:hover:text-white'"
              >
                {{ tab.label }}
              </button>
           </div>
           
           <div class="hidden md:block font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              {{ displayResults.length }} Matches Found
           </div>
        </div>

      </div>
    </div>

    <div class="max-w-5xl mx-auto px-6 lg:px-12 py-12">
      
      <div v-if="displayResults.length > 0" class="flex flex-col border-t border-gray-200 dark:border-gray-800">
         <NuxtLink 
           v-for="item in displayResults" 
           :key="item.id + item.type" 
           :to="getLink(item)"
           class="group flex items-start gap-6 py-8 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#0A253A] transition-colors cursor-pointer"
         >
            <div class="pt-1">
               <span 
                 class="block w-2 h-2 rounded-full"
                 :class="{
                   'bg-[#00A9F4]': item.type === 'company',
                   'bg-green-500': item.type === 'person',
                   'bg-purple-500': item.type === 'story'
                 }"
               ></span>
            </div>

            <div class="flex-1 min-w-0">
               <div class="flex items-center gap-3 mb-2">
                  <span class="font-mono text-[10px] uppercase text-gray-400 group-hover:text-[#051C2C] dark:group-hover:text-white transition-colors">
                     [{{ item.type }}]
                  </span>
                  <div v-if="item.type === 'story'" class="h-px w-8 bg-gray-200 dark:bg-gray-700"></div>
               </div>
               
               <h3 class="text-2xl font-serif text-[#051C2C] dark:text-white leading-tight group-hover:text-[#00A9F4] transition-colors mb-2">
                  {{ item.name }}
               </h3>
               
               <p class="font-mono text-xs text-gray-500 dark:text-gray-400 truncate max-w-lg" v-if="item.info">
                  // {{ item.info }}
               </p>
            </div>

            <div class="self-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
               <span class="text-xs font-bold uppercase tracking-widest text-[#051C2C] dark:text-white">View</span>
            </div>
         </NuxtLink>
      </div>

      <div v-else-if="searchQuery && !isLoading && (!results || results.length === 0)" class="py-32 text-center border border-dashed border-gray-200 dark:border-gray-800">
         <p class="font-mono text-xs text-gray-400 mb-2">STATUS: NO_DATA</p>
         <h3 class="text-xl font-serif text-[#051C2C] dark:text-white mb-4">No records found for "{{ searchQuery }}"</h3>
         <p class="text-sm text-gray-500 max-w-xs mx-auto">Verify spelling or try a broader category keyword.</p>
      </div>

      <div v-else-if="!searchQuery" class="py-32 text-center opacity-30">
         <div class="font-mono text-4xl text-gray-300 dark:text-gray-700 mb-4 font-bold">Waiting for Input...</div>
         <p class="text-xs uppercase tracking-widest text-gray-400">Accessing The Global Index</p>
      </div>

    </div>

  </div>
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