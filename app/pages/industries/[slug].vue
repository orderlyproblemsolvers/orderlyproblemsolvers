<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

// 1. FETCH REAL DATA
// Calls: server/api/industries/[slug].get.ts
const { data: industry, error, status } = await useFetch(`/api/industries/${slug}`)

// 2. HANDLE 404
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Industry not found', fatal: true })
}

// 3. DATE HELPER
const formatDate = (dateStr: string | Date | null) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-white transition-colors duration-300">
    
    <!-- LOADING STATE -->
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-gray-100 dark:border-slate-800 border-t-black dark:border-t-white rounded-full animate-spin"></div>
    </div>

    <div v-else-if="industry">
      
      <!-- 1. HERO SECTION -->
      <div class="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 pt-32 pb-16 transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <!-- Breadcrumb -->
              <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-4">
                <NuxtLink to="/industries" class="hover:text-black dark:hover:text-white transition-colors">Industries</NuxtLink>
                <span>/</span>
                <span class="text-blue-600 dark:text-blue-400">{{ industry.name }}</span>
              </div>
              
              <h1 class="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
                {{ industry.name }}
              </h1>
              <p class="text-xl text-gray-500 dark:text-gray-400 max-w-2xl leading-relaxed">
                {{ industry.description }}
              </p>
            </div>

            <!-- Stats Block -->
            <div class="flex gap-8 p-6 bg-white dark:bg-slate-950 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm shrink-0">
               <div>
                  <span class="block text-3xl font-black text-gray-900 dark:text-white tracking-tight">{{ industry.stats.companies }}</span>
                  <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Companies</span>
               </div>
               <div class="w-px bg-gray-100 dark:bg-slate-800 h-auto"></div>
               <div>
                  <span class="block text-3xl font-black text-gray-900 dark:text-white tracking-tight">{{ industry.stats.stories }}</span>
                  <span class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Articles</span>
               </div>
            </div>
          </div>

        </div>
      </div>

      <!-- 2. MAIN CONTENT -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <!-- LEFT COLUMN (Companies List) -->
          <div class="lg:col-span-8 space-y-12">
             
             <!-- Top Companies -->
             <div>
                <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-slate-800">
                   <h2 class="text-2xl font-black tracking-tight text-gray-900 dark:text-white">Top Organizations</h2>
                   <NuxtLink :to="`/companies?industry=${industry.name}`" class="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">View All &rarr;</NuxtLink>
                </div>
                
                <div v-if="industry.companies.length > 0" class="grid grid-cols-1 gap-4">
                   <NuxtLink 
                     v-for="comp in industry.companies" 
                     :key="comp.slug"
                     :to="`/companies/${comp.slug}`" 
                     class="group flex items-center gap-6 p-6 border border-gray-200 dark:border-slate-800 rounded-xl hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-900/5 dark:hover:shadow-black/40 transition-all cursor-pointer bg-white dark:bg-slate-900"
                   >
                      <div class="w-16 h-16 rounded-lg bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-gray-500 text-xl font-black overflow-hidden shrink-0 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                         <img v-if="comp.logo && comp.logo.startsWith('http')" :src="comp.logo" class="w-full h-full object-cover" />
                         <span v-else>{{ comp.name.charAt(0) }}</span>
                      </div>
                      <div class="min-w-0 flex-1">
                         <h3 class="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">{{ comp.name }}</h3>
                         <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ comp.headline || 'No description available.' }}</p>
                      </div>
                      <div class="hidden sm:block text-right">
                         <span class="block px-3 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{{ comp.location }}</span>
                         <span class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">{{ comp.stage }}</span>
                      </div>
                   </NuxtLink>
                </div>

                <div v-else class="p-12 bg-gray-50 dark:bg-slate-900 border border-dashed border-gray-200 dark:border-slate-800 rounded-xl text-center">
                   <p class="text-gray-400 dark:text-gray-500 font-bold text-sm">No companies listed in this sector yet.</p>
                </div>
             </div>

          </div>

          <!-- RIGHT COLUMN (Stories & CTA) -->
          <div class="lg:col-span-4 space-y-12">
             
             <!-- Latest Stories -->
             <div class="p-8 bg-gray-50 dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800">
                <h3 class="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                   <span class="w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full"></span>
                   Latest in {{ industry.name }}
                </h3>
                
                <div v-if="industry.stories.length > 0" class="space-y-6">
                   <NuxtLink 
                     v-for="story in industry.stories" 
                     :key="story.slug"
                     :to="`/stories/${story.slug}`" 
                     class="group block"
                   >
                      <h4 class="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                         {{ story.title }}
                      </h4>
                      <p class="text-xs text-gray-500 dark:text-gray-400">By {{ story.authorName }}</p>
                   </NuxtLink>
                </div>
                <div v-else class="text-sm text-gray-400 dark:text-gray-500 italic">No articles published yet.</div>

                <div class="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800">
                   <NuxtLink :to="`/stories`" class="text-xs font-bold text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Read all stories &rarr;</NuxtLink>
                </div>
             </div>

             <!-- Join CTA -->
             <div class="bg-black dark:bg-white text-white dark:text-black p-8 rounded-2xl text-center shadow-xl shadow-gray-200 dark:shadow-none">
                <h3 class="text-xl font-black mb-2">Building in {{ industry.name }}?</h3>
                <p class="text-gray-400 dark:text-gray-600 text-sm mb-6">Get listed in the index and discovered by investors and partners.</p>
                <NuxtLink to="/submit-solution" class="block w-full py-3 bg-white dark:bg-black text-black dark:text-white font-bold text-sm rounded-lg hover:bg-blue-600 dark:hover:bg-gray-800 hover:text-white dark:hover:text-white transition-colors">
                   Submit Profile
                </NuxtLink>
             </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>