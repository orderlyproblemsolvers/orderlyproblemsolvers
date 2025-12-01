<script setup lang="ts">
import { computed } from 'vue'

// 1. FETCH REAL STORIES
// We grab the latest stories from the database
const { data: stories, status } = await useFetch('/api/stories')

// 2. ORGANIZE DATA
const mainFeature = computed(() => {
  if (!stories.value || stories.value.length === 0) return null
  const story = stories.value[0]
  return {
    ...story,
    link: `/stories/${story.slug}`
  }
})

// Next 3 stories = Trending Sidebar
const trendingStories = computed(() => {
  if (!stories.value || stories.value.length < 2) return []
  return stories.value.slice(1, 4).map(story => ({
    ...story,
    link: `/stories/${story.slug}`
  }))
})
</script>

<template>
  <section class="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
    <div class="max-w-7xl mx-auto">
      
      <!-- HEADER -->
      <div class="flex items-center justify-between mb-8">
        <h2 class="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
          <span class="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></span>
          The Featured Drop
        </h2>
        <NuxtLink to="/stories" class="text-sm font-bold text-gray-500 hover:text-blue-600 transition">
          View All Stories &rarr;
        </NuxtLink>
      </div>

      <!-- LOADING STATE -->
      <div v-if="status === 'pending'" class="grid grid-cols-1 lg:grid-cols-3 gap-12 h-96">
         <div class="lg:col-span-2 bg-gray-100 rounded-2xl animate-pulse"></div>
         <div class="space-y-8">
            <div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
            <div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
            <div class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
         </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else-if="!mainFeature" class="py-20 text-center border border-dashed border-gray-200 rounded-2xl">
         <p class="text-gray-400 font-bold">No stories published yet.</p>
      </div>

      <!-- CONTENT GRID -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        
        <!-- LEFT COLUMN: MAIN FEATURE -->
        <NuxtLink :to="mainFeature.link" class="lg:col-span-2 group cursor-pointer block">
          <div class="relative w-full h-[400px] rounded-2xl overflow-hidden mb-6 bg-gray-100">
             <NuxtImg 
               v-if="mainFeature.image"
               :src="mainFeature.image" 
               alt="Feature Image" 
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div class="absolute top-4 left-4">
               <span class="bg-white/90 backdrop-blur-md text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/50 shadow-sm">
                 {{ mainFeature.category }}
               </span>
             </div>
          </div>

          <div class="max-w-2xl">
            <h3 class="text-3xl md:text-4xl font-black text-gray-900 leading-[1] mb-3 group-hover:text-blue-600 transition-colors">
              {{ mainFeature.title }}
            </h3>
            <p class="text-lg text-gray-500 mb-4 line-clamp-2 leading-relaxed">
              {{ mainFeature.excerpt }}
            </p>
            <div class="flex items-center text-xs font-bold text-gray-400 gap-3 uppercase tracking-widest">
              <span class="text-gray-900">{{ mainFeature.authorName }}</span>
              <span class="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>{{ mainFeature.readTime }}</span>
            </div>
          </div>
        </NuxtLink>

        <!-- RIGHT COLUMN: TRENDING SIDEBAR -->
        <div class="flex flex-col h-full border-t lg:border-t-0 lg:border-l border-gray-100 lg:pl-12 pt-8 lg:pt-0">
          
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
                <span class="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  {{ story.category }}
                </span>
                <h3 class="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                  {{ story.title }}
                </h3>
                
                <div v-if="index !== trendingStories.length - 1" class="w-12 h-px bg-gray-200 mt-6 group-hover:w-full group-hover:bg-blue-100 transition-all duration-500"></div>
              </div>
            </NuxtLink>
          </div>

          <!-- Newsletter Box -->
          <!-- <div class="mt-auto pt-12">
            <div class="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p class="text-sm font-bold text-gray-900 mb-1">The OPS Brief.</p>
              <p class="text-xs text-gray-500 mb-4">Weekly insights on the ecosystem.</p>
              <div class="flex gap-2">
                <input type="email" placeholder="Email address" class="bg-white border border-gray-200 text-xs rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500 transition-colors" />
                <button class="bg-black text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">Go</button>
              </div>
            </div>
          </div> -->

        </div>

      </div>
    </div>
  </section>
</template>