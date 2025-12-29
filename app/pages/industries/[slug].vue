<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

// 1. FETCH REAL DATA
// We use a custom transform to ensure the UI has fallback data if the API is sparse
const { data: industry, error, status } = await useFetch(`/api/industries/${slug}`, {
  transform: (data: any) => ({
    ...data,
    // Ensure nested objects exist to prevent UI crashes
    stats: data.stats || { companies: 0, stories: 0, growth: '0%' },
    companies: data.companies || [],
    stories: data.stories || []
  })
})

// 2. HANDLE 404
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Industry Dossier Not Found', fatal: true })
}

// 3. DATE HELPER
const formatDate = (dateStr: string | Date | null) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div v-if="status === 'pending'" class="h-screen flex flex-col items-center justify-center font-mono text-xs uppercase tracking-widest text-gray-400">
       <div class="w-8 h-8 border-2 border-[#00A9F4] border-t-transparent rounded-full animate-spin mb-4"></div>
       <p>Accessing Sector Database...</p>
    </div>

    <div v-else-if="industry">
      
      <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A253A] pt-32 pb-12 transition-colors">
        <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
             <div>
                <div class="font-mono text-xs text-gray-400 mb-4">
                  <NuxtLink to="/industries" class="hover:text-[#051C2C] dark:hover:text-white transition-colors">INDEX</NuxtLink>
                  <span class="mx-2">/</span>
                  <span class="text-[#00A9F4] font-bold">SECTOR_{{ slug.toUpperCase() }}</span>
                </div>
                
                <h1 class="text-6xl md:text-8xl font-serif text-[#051C2C] dark:text-white tracking-tight leading-[0.9] uppercase">
                  {{ industry.name }}<span class="text-[#00A9F4]">.</span>
                </h1>
             </div>

             <div class="flex gap-8 border-l border-gray-300 dark:border-gray-600 pl-8 py-1">
                <div>
                   <span class="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Total Entities</span>
                   <span class="block font-serif text-3xl font-bold">{{ industry.stats.companies }}</span>
                </div>
                <div>
                   <span class="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Intelligence</span>
                   <span class="block font-serif text-3xl font-bold">{{ industry.stats.stories }}</span>
                </div>
                <div>
                   <span class="block font-mono text-[10px] text-gray-500 uppercase tracking-widest mb-1">Growth (Q4)</span>
                   <span class="block font-serif text-3xl font-bold text-green-600">{{ industry.stats.growth }}</span>
                </div>
             </div>
          </div>

          <div class="max-w-3xl border-t border-gray-200 dark:border-gray-700 pt-8">
             <p class="text-xl text-[#051C2C] dark:text-gray-300 leading-relaxed font-serif">
                {{ industry.description }}
             </p>
             <div class="mt-6">
                
             </div>
          </div>

        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div class="lg:col-span-8">
             
             <div class="flex items-end justify-between mb-8 border-b border-[#051C2C] dark:border-white pb-2">
                <h2 class="text-xl font-bold uppercase tracking-widest text-[#051C2C] dark:text-white">Active Entities</h2>
                <div class="flex items-center gap-2">
                   <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                   <span class="font-mono text-xs text-gray-400">LIVE INDEX</span>
                </div>
             </div>
             
             <div v-if="industry.companies.length > 0" class="flex flex-col border-t border-gray-200 dark:border-gray-800">
                <NuxtLink 
                   v-for="comp in industry.companies" 
                   :key="comp.slug"
                   :to="`/companies/${comp.slug}`" 
                   class="group grid grid-cols-1 md:grid-cols-12 gap-6 py-6 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#0A253A] transition-colors items-center"
                >
                   <div class="md:col-span-6 flex items-center gap-4">
                      <div class="w-12 h-12 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 flex items-center justify-center p-1 grayscale group-hover:grayscale-0 transition-all">
                         <img v-if="comp.logo" :src="comp.logo" class="max-w-full max-h-full" />
                         <span v-else class="text-lg font-bold">{{ comp.name.charAt(0) }}</span>
                      </div>
                      <div>
                         <h3 class="text-xl font-serif font-bold text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors">
                            {{ comp.name }}
                         </h3>
                         <p class="font-mono text-[10px] text-gray-400 uppercase truncate max-w-[200px]">
                            {{ comp.headline || 'Verified Entity' }}
                         </p>
                      </div>
                   </div>

                   <div class="md:col-span-4 font-mono text-xs text-gray-500 dark:text-gray-400">
                      <span class="block uppercase mb-1">{{ comp.location }}</span>
                      <span class="block text-[10px] bg-gray-100 dark:bg-gray-800 inline-block px-2 py-0.5 rounded">{{ comp.stage }}</span>
                   </div>

                   <div class="md:col-span-2 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                      <span class="text-xs font-bold uppercase tracking-widest text-[#051C2C] dark:text-white">View &rarr;</span>
                   </div>
                </NuxtLink>
             </div>

             <div v-else class="p-16 text-center border border-dashed border-gray-200 dark:border-gray-800">
                <p class="font-mono text-xs text-gray-400 mb-2">STATUS: EMPTY_SET</p>
                <p class="text-lg font-serif">No organizations currently verified in this sector.</p>
             </div>

          </div>

          <div class="lg:col-span-4 space-y-16">
             
             <div>
                <h3 class="text-sm font-bold uppercase tracking-widest text-[#051C2C] dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-2">
                   Sector Briefing
                </h3>
                
                <div v-if="industry.stories.length > 0" class="space-y-8">
                   <NuxtLink 
                      v-for="story in industry.stories" 
                      :key="story.slug"
                      :to="`/stories/${story.slug}`" 
                      class="group block"
                   >
                      <span class="font-mono text-[10px] text-[#00A9F4] mb-2 block">{{ formatDate(story.publishedAt || new Date()) }}</span>
                      <h4 class="text-lg font-serif font-bold text-[#051C2C] dark:text-white leading-tight mb-2 group-hover:underline decoration-[#00A9F4] underline-offset-4">
                         {{ story.title }}
                      </h4>
                      <p class="text-xs text-gray-500 font-mono"> // By {{ story.authorName }}</p>
                   </NuxtLink>
                </div>
                <div v-else class="text-sm text-gray-400 italic font-mono">No briefings filed.</div>
             </div>

             <div class="bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] p-8 text-center">
                <h3 class="text-xl font-serif font-bold mb-2">Operate in {{ industry.name }}?</h3>
                <p class="text-xs font-mono opacity-70 mb-6 uppercase tracking-wide">Signal Your Presence</p>
                <NuxtLink to="/submit-solution" class="block w-full py-4 border border-white/20 dark:border-[#051C2C]/20 font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#051C2C] dark:hover:bg-[#051C2C] dark:hover:text-white transition-colors">
                   Submit Entity
                </NuxtLink>
             </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>