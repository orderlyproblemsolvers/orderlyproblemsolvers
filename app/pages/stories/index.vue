<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Stories - Orderly Problem Solvers',
  description: 'In-depth articles and insights on problem solvers shaping the future.',
  ogTitle: 'Stories - Orderly Problem Solvers',
  ogDescription: 'In-depth articles and insights on problem solvers shaping the future.',
  ogImage: '/img/logo-sm.png',
  twitterCard: 'summary_large_image',
  ogUrl: 'https://orderlyproblemsolvers.com/stories',
  canonical: 'https://orderlyproblemsolvers.com/stories'
})

definePageMeta({
  title: 'Stories - Orderly Problem Solvers',
  description: 'In-depth articles and insights on problem solvers shaping the future.'
})

defineOgImageComponent('OpsTemplate', {
  title: 'Stories - Orderly Problem Solvers',
  description: 'In-depth articles and insights on problem solvers shaping the future.',
  image: '/img/logo-sm.png',
  type: 'Story'
})

const categories = ['All', 'Spotlight', 'Engineering', 'Market Watch', 'Opinion']
const activeCategory = ref('All')

// 1. FETCH STORIES FROM DB
const { data: stories, status } = await useFetch('/api/stories')

// 2. COMPUTED LISTS
const heroStory = computed(() => stories.value?.[0]) 
const trendingStories = computed(() => stories.value?.slice(1, 4) || []) 
const feedStories = computed(() => {
  const all = stories.value?.slice(4) || []
  if (activeCategory.value === 'All') return all
  return all.filter(s => s.category === activeCategory.value)
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="pt-24 pb-12 px-6 lg:px-12 bg-gray-50 dark:bg-[#0A253A] border-b border-[#051C2C] dark:border-white">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row justify-between items-end mb-8">
           <div>
             <span class="block text-xs font-bold uppercase tracking-[0.2em] text-[#00A9F4] mb-3">
               OPS Editorial
             </span>
             <h1 class="text-6xl md:text-8xl font-serif text-[#051C2C] dark:text-white tracking-tight leading-none">
               The Journal<span class="text-[#00A9F4]">.</span>
             </h1>
           </div>
           <p class="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-6 md:mt-0">
             Intelligence for the<br/>Age of Solution.
           </p>
        </div>
      </div>
    </div>

    <div class="sticky top-0 z-30 bg-white dark:bg-[#051C2C] border-b border-gray-200 dark:border-gray-800">
       <div class="max-w-7xl mx-auto px-6 lg:px-12">
          <div class="flex overflow-x-auto no-scrollbar py-4 gap-8">
             <button 
               v-for="cat in categories" 
               :key="cat"
               @click="activeCategory = cat"
               class="text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-colors"
               :class="activeCategory === cat ? 'text-[#00A9F4]' : 'text-gray-400 hover:text-[#051C2C] dark:hover:text-white'"
             >
               {{ cat }}
             </button>
          </div>
       </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16">

      <div v-if="status === 'pending'" class="py-24 grid grid-cols-1 md:grid-cols-2 gap-8">
         <div class="h-[500px] bg-gray-50 dark:bg-[#0A253A] animate-pulse border border-gray-200 dark:border-gray-800"></div>
         <div class="space-y-8">
            <div class="h-12 bg-gray-50 dark:bg-[#0A253A] animate-pulse w-3/4"></div>
            <div class="h-4 bg-gray-50 dark:bg-[#0A253A] animate-pulse w-full"></div>
            <div class="h-4 bg-gray-50 dark:bg-[#0A253A] animate-pulse w-2/3"></div>
         </div>
      </div>

      <div v-else-if="heroStory">
        
        <NuxtLink :to="`/stories/${heroStory.slug}`" class="group grid grid-cols-1 lg:grid-cols-12 gap-0 border border-gray-200 dark:border-gray-800 mb-24 hover:border-[#00A9F4] transition-colors duration-500 bg-white dark:bg-[#051C2C]">
          
          <div class="lg:col-span-8 relative aspect-[16/9] lg:aspect-auto lg:h-[600px] overflow-hidden bg-gray-100 dark:bg-[#0A253A]">
             <img :src="heroStory.image" class="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out" />
             <div class="absolute top-0 left-0 bg-[#00A9F4] text-white px-4 py-2 text-xs font-bold uppercase tracking-widest">
                Cover Story
             </div>
          </div>

          <div class="lg:col-span-4 p-8 lg:p-12 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800">
             <span class="font-mono text-xs text-[#00A9F4] uppercase mb-4">{{ heroStory.category }}</span>
             
             <h2 class="text-4xl md:text-5xl font-serif text-[#051C2C] dark:text-white leading-[1] mb-6 group-hover:text-[#00A9F4] transition-colors">
               {{ heroStory.title }}
             </h2>
             
             <p class="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-12 font-light line-clamp-4">
               {{ heroStory.excerpt }}
             </p>
             
             <div class="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                   <p class="text-xs font-bold uppercase text-[#051C2C] dark:text-white">{{ heroStory.authorName }}</p>
                   <p class="text-[10px] font-mono text-gray-400">{{ heroStory.readTime }}</p>
                </div>
                <span class="text-2xl group-hover:translate-x-2 transition-transform duration-300">&rarr;</span>
             </div>
          </div>
        </NuxtLink>

        <div v-if="trendingStories.length > 0" class="mb-24">
           <div class="flex items-center justify-between mb-8 border-b border-black dark:border-white pb-2">
              <h3 class="text-sm font-bold uppercase tracking-widest text-[#051C2C] dark:text-white">Trending Intelligence</h3>
              <span class="font-mono text-xs text-gray-400">// 01 - 03</span>
           </div>

           <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 border border-gray-200 dark:border-gray-800">
              <NuxtLink 
                v-for="story in trendingStories" 
                :key="story.id" 
                :to="`/stories/${story.slug}`" 
                class="group p-8 hover:bg-gray-50 dark:hover:bg-[#0A253A] transition-colors"
              >
                 <div class="aspect-video bg-gray-100 dark:bg-black mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                    <img :src="story.image" class="w-full h-full object-cover" />
                 </div>
                 
                 <span class="block font-mono text-[10px] text-[#00A9F4] uppercase mb-2">{{ story.category }}</span>
                 <h4 class="text-xl font-serif font-bold text-[#051C2C] dark:text-white leading-tight mb-4 group-hover:text-[#00A9F4] transition-colors">
                    {{ story.title }}
                 </h4>
                 <p class="text-xs font-bold uppercase text-gray-400 group-hover:text-[#051C2C] dark:group-hover:text-white transition-colors">Read Article &rarr;</p>
              </NuxtLink>
           </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           
           <div class="lg:col-span-8">
              <div class="flex items-center justify-between mb-8 border-b border-black dark:border-white pb-2">
                 <h3 class="text-sm font-bold uppercase tracking-widest text-[#051C2C] dark:text-white">Latest Dispatches</h3>
                 <span class="font-mono text-xs text-gray-400">Filter: {{ activeCategory }}</span>
              </div>
              
              <div class="flex flex-col">
                 <NuxtLink 
                   v-for="article in feedStories" 
                   :key="article.id" 
                   :to="`/stories/${article.slug}`" 
                   class="group py-12 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row gap-8"
                 >
                    <div class="md:w-1/3 aspect-[4/3] bg-gray-100 dark:bg-black grayscale group-hover:grayscale-0 transition-all duration-500">
                       <img :src="article.image" class="w-full h-full object-cover" />
                    </div>
                    
                    <div class="md:w-2/3 flex flex-col">
                       <div class="flex items-center gap-3 mb-3">
                          <span class="font-mono text-[10px] text-[#051C2C] dark:text-white border border-[#051C2C] dark:border-gray-600 px-1 uppercase">{{ article.category }}</span>
                          <span class="font-mono text-[10px] text-gray-400">{{ article.readTime }}</span>
                       </div>
                       
                       <h4 class="text-2xl font-serif font-bold text-[#051C2C] dark:text-white mb-4 group-hover:text-[#00A9F4] transition-colors">
                          {{ article.title }}
                       </h4>
                       
                       <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 line-clamp-2">
                          {{ article.excerpt }}
                       </p>
                       
                       <div class="mt-auto">
                          <span class="text-xs font-bold uppercase text-gray-400 group-hover:text-[#051C2C] dark:group-hover:text-white transition-colors">Full Story &rarr;</span>
                       </div>
                    </div>
                 </NuxtLink>
              </div>
           </div>
           
           <div class="hidden lg:block lg:col-span-4 sticky top-32">
              <div class="p-8 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-center">
                 <h3 class="font-serif text-2xl mb-4">The Newsletter</h3>
                 <p class="text-xs font-mono mb-6 opacity-70">Get the signal, skip the noise.</p>
                 <input type="email" placeholder="EMAIL ADDRESS" class="w-full bg-transparent border border-white/30 dark:border-[#051C2C]/30 p-3 text-xs font-bold text-center mb-4 focus:border-[#00A9F4] outline-none placeholder-current" />
                 <button class="w-full bg-[#00A9F4] text-white py-3 text-xs font-bold uppercase tracking-widest hover:bg-opacity-90 transition-opacity">
                    Subscribe
                 </button>
              </div>
           </div>

        </div>

      </div>

      <div v-else class="py-32 border-2 border-dashed border-gray-200 dark:border-gray-800 text-center">
         <h3 class="font-serif text-2xl text-gray-400 italic">No dispatches filed yet.</h3>
      </div>

    </div>
  </div>
</template>