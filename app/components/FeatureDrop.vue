<script setup lang="ts">
import { computed, ref } from 'vue'

// 1. FETCH REAL STORIES
const { data: stories, status } = await useFetch('/api/stories')

// 2. ORGANIZE DATA
const mainFeature = computed(() => {
  if (!stories.value || stories.value.length === 0) return null
  const story = stories.value[0]
  return { ...story, link: `/stories/${story.slug}` }
})

const trendingStories = computed(() => {
  if (!stories.value || stories.value.length < 2) return []
  return stories.value.slice(1, 4).map(story => ({ ...story, link: `/stories/${story.slug}` }))
})
</script>

<template>
  <section class="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-900 transition-colors duration-300">
    <div class="max-w-7xl mx-auto">
      
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
          <span class="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></span>
          The Featured Drop
        </h2>
        <NuxtLink to="/stories" class="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
          View All Stories &rarr;
        </NuxtLink>
      </div>

      <div v-if="status === 'pending'" class="grid grid-cols-1 lg:grid-cols-3 gap-12 h-96">
         <div class="lg:col-span-2 bg-gray-100 dark:bg-slate-900 rounded-2xl animate-pulse"></div>
         <div class="space-y-8">
            <div class="h-24 bg-gray-100 dark:bg-slate-900 rounded-xl animate-pulse"></div>
            <div class="h-24 bg-gray-100 dark:bg-slate-900 rounded-xl animate-pulse"></div>
            <div class="h-24 bg-gray-100 dark:bg-slate-900 rounded-xl animate-pulse"></div>
         </div>
      </div>

      <div v-else-if="!mainFeature" class="py-20 text-center border border-dashed border-gray-200 dark:border-slate-800 rounded-2xl">
         <p class="text-gray-400 font-bold">No stories published yet.</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        <NuxtLink :to="mainFeature.link" class="lg:col-span-2 group cursor-pointer block">
          <div class="relative w-full h-[400px] rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-slate-900">
             <NuxtImg 
               v-if="mainFeature.image"
               :src="mainFeature.image" 
               alt="Feature Image" 
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div class="absolute top-4 left-4">
               <span class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/50 dark:border-slate-700 shadow-sm">
                 {{ mainFeature.category }}
               </span>
             </div>
          </div>

          <div class="max-w-2xl">
            <h3 class="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-[1] mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {{ mainFeature.title }}
            </h3>
            <p class="text-lg text-gray-500 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">
              {{ mainFeature.excerpt }}
            </p>
            <div class="flex items-center text-xs font-bold text-gray-400 gap-3 uppercase tracking-widest">
              <span class="text-gray-900 dark:text-gray-300">{{ mainFeature.authorName }}</span>
              <span class="w-1 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
              <span>{{ mainFeature.readTime }}</span>
            </div>
          </div>
        </NuxtLink>

        <div class="flex flex-col h-full border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-slate-900 lg:pl-12 pt-8 lg:pt-0">
          
          <h4 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-8">
            Trending This Week
          </h4>

          <div class="flex flex-col gap-10">
            <NuxtLink 
              v-for="(story, index) in trendingStories" 
              :key="story.id"
              :to="story.link"
              class="group block"
            >
              <div class="flex flex-col gap-2">
                <span class="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                  {{ story.category }}
                </span>
                <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {{ story.title }}
                </h3>
                
                <div v-if="index !== trendingStories.length - 1" class="w-12 h-px bg-gray-200 dark:bg-slate-800 mt-6 group-hover:w-full group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-all duration-500"></div>
              </div>
            </NuxtLink>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>