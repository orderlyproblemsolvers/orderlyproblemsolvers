<script setup lang="ts">
import { ref, computed } from 'vue'

const categories = ['All', 'Spotlight', 'Engineering', 'Market Watch', 'Opinion']
const activeCategory = ref('All')

// 1. FETCH STORIES FROM DB
const { data: stories, status } = await useFetch('/api/stories')

// 2. COMPUTED LISTS
// We filter the raw data into sections
const heroStory = computed(() => stories.value?.[0]) // The newest story is Hero
const trendingStories = computed(() => stories.value?.slice(1, 4) || []) // Next 3 are Trending
const feedStories = computed(() => {
  const all = stories.value?.slice(4) || []
  if (activeCategory.value === 'All') return all
  return all.filter(s => s.category === activeCategory.value)
})
</script>

<template>
   <AppHeader/>
  <div class="min-h-screen bg-white font-sans selection:bg-blue-100">
    
    <!-- HEADER (Keep existing code) -->
    <div class="sticky top-20 z-30 bg-white/90 backdrop-blur-xl border-b border-gray-100">
       <!-- ... keep header code ... -->
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

      <!-- LOADING STATE -->
      <div v-if="status === 'pending'" class="py-20 text-center">
         <div class="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
         <p class="mt-4 text-gray-400 text-xs font-bold uppercase">Loading Journal...</p>
      </div>

      <div v-else-if="heroStory">
        
        <!-- HERO STORY -->
        <NuxtLink :to="`/stories/${heroStory.slug}`" class="group relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-32 border-b border-gray-100 pb-24">
          <div class="lg:col-span-7 relative overflow-hidden rounded-2xl aspect-[4/3] lg:h-[600px] lg:aspect-auto bg-gray-100">
             <img :src="heroStory.image" class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105" />
          </div>
          <div class="lg:col-span-5 flex flex-col justify-center lg:pl-4">
             <span class="text-blue-600 font-black uppercase tracking-widest text-xs mb-6 block">{{ heroStory.category }}</span>
             <h2 class="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-[1] mb-8 group-hover:text-blue-600 transition-colors">
               {{ heroStory.title }}
             </h2>
             <p class="text-xl text-gray-500 leading-relaxed mb-12 border-l-4 border-gray-100 pl-6 line-clamp-3">
               {{ heroStory.excerpt }}
             </p>
             <div class="mt-auto flex items-center gap-3">
                <img v-if="heroStory.authorImage" :src="heroStory.authorImage" class="w-10 h-10 rounded-full bg-gray-100" />
                <div>
                   <p class="text-sm font-bold text-gray-900">{{ heroStory.authorName }}</p>
                   <p class="text-xs text-gray-500">{{ heroStory.readTime }}</p>
                </div>
             </div>
          </div>
        </NuxtLink>

        <!-- TRENDING GRID -->
        <div v-if="trendingStories.length > 0" class="mb-32">
           <div class="flex items-center justify-between mb-12">
              <h3 class="text-2xl font-black tracking-tight text-gray-900">Recent Features</h3>
              <div class="h-px bg-gray-100 flex-1 mx-8"></div>
           </div>
           <div class="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
              <NuxtLink v-for="story in trendingStories" :key="story.id" :to="`/stories/${story.slug}`" class="group cursor-pointer">
                 <div class="aspect-[3/2] overflow-hidden rounded-xl mb-6 bg-gray-100 relative">
                    <img :src="story.image" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                 </div>
                 <h4 class="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {{ story.title }}
                 </h4>
                 <p class="text-xs font-medium text-gray-400">{{ story.readTime }} • By {{ story.authorName }}</p>
              </NuxtLink>
           </div>
        </div>

        <!-- FEED (Keep the sidebar layout, just iterate over 'feedStories') -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           <div class="lg:col-span-8 space-y-20">
              <div class="flex items-center justify-between pb-8 border-b border-gray-100">
                 <h3 class="text-2xl font-black tracking-tight text-gray-900">Latest Stories</h3>
              </div>
              
              <NuxtLink v-for="article in feedStories" :key="article.id" :to="`/stories/${article.slug}`" class="group grid grid-cols-1 md:grid-cols-12 gap-10 items-start pb-20 border-b border-gray-100 last:border-0">
                 <div class="md:col-span-5 aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
                    <img :src="article.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                 </div>
                 <div class="md:col-span-7 flex flex-col h-full">
                    <div class="flex items-center gap-3 mb-4">
                       <span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest px-2 py-1 bg-blue-50 rounded">{{ article.category }}</span>
                    </div>
                    <h4 class="text-2xl font-bold text-gray-900 tracking-tight mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                       {{ article.title }}
                    </h4>
                    <p class="text-base text-gray-500 leading-relaxed mb-6 line-clamp-2">
                       {{ article.excerpt }}
                    </p>
                    <div class="mt-auto pt-6 border-t border-gray-50 flex items-center gap-3">
                       <span class="text-xs font-bold text-gray-900">By {{ article.authorName }}</span>
                       <span class="ml-auto text-xs font-bold text-gray-400 group-hover:text-blue-600 transition-colors">Read &rarr;</span>
                    </div>
                 </div>
              </NuxtLink>
           </div>
           
           <!-- Keep Sidebar (Static or Dynamic) -->
           <div class="hidden lg:block lg:col-span-4">
              <!-- ... Sidebar widgets ... -->
           </div>
        </div>

      </div>

      <!-- EMPTY STATE -->
      <div v-else class="text-center py-32 border border-dashed border-gray-200 rounded-2xl">
         <p class="text-gray-400 font-bold">No stories published yet.</p>
      </div>

    </div>
  </div>
  <AppFooter/>
</template>