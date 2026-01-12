<script setup>
import { computed } from 'vue'

// 1. FETCH REAL STORIES (Original Logic Restored)
const { data: stories, status } = await useFetch('/api/stories')

// 2. ORGANIZE DATA
const mainFeature = computed(() => {
  if (!stories.value || stories.value.length === 0) return null
  const story = stories.value[0]
  // Ensure we map the data to the expected visual fields if they exist, 
  // otherwise fallback to safe defaults to prevent layout breaks.
  return { 
    ...story, 
    link: `/stories/${story.slug}`,
    // Visual fallbacks in case API data is partial
    category: story.category || 'Insight',
    readTime: story.readTime || '5 min read',
    authorName: story.authorName || 'OPS Editor'
  }
})

const trendingStories = computed(() => {
  if (!stories.value || stories.value.length < 2) return []
  return stories.value.slice(1, 4).map((story) => ({ 
    ...story, 
    link: `/stories/${story.slug}`,
    category: story.category || 'Trending'
  }))
})
</script>

<template>
  <section class="w-full py-24 px-6 lg:px-12 bg-white dark:bg-[#051C2C] border-b border-gray-200 dark:border-gray-800 transition-colors duration-500">
    <div v-animate class="max-w-7xl mx-auto">
      
      <div class="flex items-end justify-between mb-12 border-b border-black dark:border-gray-700 pb-6">
        <div>
          <span class="block text-xs font-bold uppercase tracking-[0.2em] text-[#00A9F4] mb-3">
             Journal
          </span>
          <h2 class="text-4xl md:text-5xl font-serif text-[#051C2C] dark:text-white tracking-tight">
            Latest Intelligence.
          </h2>
        </div>
        
        <NuxtLink 
          to="/stories" 
          class="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 hover:text-[#051C2C] dark:hover:text-white transition-colors"
        >
          Read the Archive
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
        </NuxtLink>
      </div>

      <div v-if="status === 'pending'" class="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div class="lg:col-span-8 h-96 bg-gray-50 dark:bg-[#0A253A] animate-pulse"></div>
         <div class="lg:col-span-4 space-y-8">
            <div class="h-24 bg-gray-50 dark:bg-[#0A253A] animate-pulse"></div>
            <div class="h-24 bg-gray-50 dark:bg-[#0A253A] animate-pulse"></div>
            <div class="h-24 bg-gray-50 dark:bg-[#0A253A] animate-pulse"></div>
         </div>
      </div>

      <div v-else-if="!mainFeature" class="py-20 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-sm">
         <p class="text-gray-400 font-serif text-xl italic">No intelligence reports published yet.</p>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        <div class="lg:col-span-8 group cursor-pointer">
          <NuxtLink :to="mainFeature.link" class="block">
            <div class="relative w-full aspect-[16/9] overflow-hidden mb-8 bg-gray-100 dark:bg-[#0A253A]">
               <div class="absolute inset-0 bg-blue-900/10 dark:bg-black/20 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
               <NuxtImg 
                 v-if="mainFeature.image"
                 :src="mainFeature.image" 
                 alt="Feature Image" 
                 class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter saturate-0 group-hover:saturate-100"
               />
               <div class="absolute top-0 left-0 bg-[#00A9F4] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest z-20">
                 {{ mainFeature.category }}
               </div>
            </div>

            <div class="max-w-3xl">
              <h3 class="text-3xl md:text-5xl font-serif text-[#051C2C] dark:text-white leading-[1.05] mb-4 group-hover:text-[#00A9F4] transition-colors duration-300">
                {{ mainFeature.title }}
              </h3>
              <p class="text-lg text-gray-500 dark:text-gray-400 mb-6 leading-relaxed border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                {{ mainFeature.excerpt }}
              </p>
              
              <div class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                <span class="text-[#051C2C] dark:text-gray-300">{{ mainFeature.authorName }}</span>
                <span class="text-gray-300 dark:text-gray-600">/</span>
                <span>{{ mainFeature.readTime }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="lg:col-span-4 flex flex-col h-full lg:border-l lg:border-gray-200 lg:dark:border-gray-700 lg:pl-12">
          
          <h4 class="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
            <span class="w-2 h-2 bg-[#00A9F4] rounded-full"></span>
            Trending
          </h4>

          <div class="flex flex-col gap-8">
            <NuxtLink 
              v-for="(story) in trendingStories" 
              :key="story.id"
              :to="story.link"
              class="group block border-b border-gray-100 dark:border-gray-800 pb-8 last:border-0 last:pb-0"
            >
              <div class="flex flex-col gap-2">
                <span class="text-[10px] font-bold text-[#00A9F4] uppercase tracking-widest mb-1 opacity-80 group-hover:opacity-100 transition-opacity">
                  {{ story.category }}
                </span>
                
                <h3 class="text-xl font-serif text-[#051C2C] dark:text-gray-200 leading-tight group-hover:text-[#00A9F4] transition-colors">
                  {{ story.title }}
                </h3>
                
                <div class="mt-2 text-[#00A9F4] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </div>
              </div>
            </NuxtLink>
          </div>

          <div class="mt-8 md:hidden">
            <NuxtLink to="/stories" class="text-sm font-bold text-[#00A9F4] underline decoration-transparent hover:decoration-current transition-all">
               View Full Archive
            </NuxtLink>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>