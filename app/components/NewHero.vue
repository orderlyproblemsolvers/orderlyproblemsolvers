<script setup>
import { ref, computed } from 'vue'

// --- SEARCH LOGIC ---
const searchQuery = ref('')
const searchInput = ref(null)

const handleSearch = () => {
  if (searchQuery.value.trim().length === 0) return
  const queryParam = encodeURIComponent(searchQuery.value.trim())
  window.location.href = `/search?q=${queryParam}`
}

// --- EDITORIAL LOGIC ---
const { data: stories, status } = await useFetch('/api/stories')

const mainFeature = computed(() => {
  if (!stories.value || stories.value.length === 0) return null
  const story = stories.value[0]
  return { 
    ...story, 
    link: `/stories/${story.slug}`,
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
  <div class="relative min-h-screen bg-[#051C2C] text-white overflow-hidden selection:bg-[#00A9F4] selection:text-white">
    
    <div class="absolute inset-0 opacity-20 pointer-events-none" style="background-image: radial-gradient(#00A9F4 1px, transparent 1px); background-size: 32px 32px;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-24 lg:pt-28 lg:pb-32 flex flex-col items-center">

      <div class="w-full max-w-xl mb-8 md:mb-12">
        <form @submit.prevent="handleSearch" role="search" class="flex items-center bg-white rounded-full px-6 py-3 shadow-lg focus-within:ring-4 focus-within:ring-[#00A9F4]/30 transition-all duration-300">
          <input 
            id="search-input" 
            ref="searchInput" 
            v-model="searchQuery" 
            type="search" 
            placeholder="Search innovators, industries, or stacks..." 
            class="w-full text-lg md:text-xl font-serif bg-transparent border-none focus:ring-0 p-0 text-[#051C2C] placeholder-gray-400 outline-none" 
          />
          <button type="submit" class="ml-4 text-[#00A9F4] hover:opacity-70 transition-opacity">
            <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </form>
        
        <p class="text-center mt-5 text-sm font-light text-gray-400">
          Try searching for 
          <button @click="searchQuery = 'FinTech'; handleSearch()" class="text-gray-300 hover:text-white hover:underline transition-all">FinTech</button>, 
          <button @click="searchQuery = 'Logistics'; handleSearch()" class="text-gray-300 hover:text-white hover:underline transition-all">Logistics</button>, or 
          <button @click="searchQuery = 'Web3'; handleSearch()" class="text-gray-300 hover:text-white hover:underline transition-all">Web3</button>
        </p>
      </div>

      <section class="w-full max-w-6xl group/section">
        
        <div class="transition-all duration-700 ease-out rounded-3xl p-6 lg:p-12 -mx-6 lg:-mx-12 border border-transparent hover:bg-white/[0.03] hover:backdrop-blur-sm hover:border-white/10 hover:shadow-2xl">
          
          <div class="flex items-end justify-between mb-10 border-b border-white/10 pb-4">
            <div>
              <span class="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#00A9F4] mb-2">
                Journal
              </span>
              <h2 class="text-2xl md:text-3xl font-serif tracking-tight">
                Latest Updates.
              </h2>
            </div>
            
            <NuxtLink 
              to="/stories" 
              class="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
            >
              Read the Archive
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </NuxtLink>
          </div>

          <div v-if="status === 'pending'" class="grid grid-cols-1 lg:grid-cols-12 gap-10">
             <div class="lg:col-span-8 h-80 bg-white/5 border border-white/10 rounded-xl animate-pulse"></div>
             <div class="lg:col-span-4 space-y-6">
                <div class="h-20 bg-white/5 border border-white/10 rounded-xl animate-pulse"></div>
                <div class="h-20 bg-white/5 border border-white/10 rounded-xl animate-pulse"></div>
                <div class="h-20 bg-white/5 border border-white/10 rounded-xl animate-pulse"></div>
             </div>
          </div>

          <div v-else-if="!mainFeature" class="py-16 text-center border border-dashed border-white/20 rounded-xl bg-white/5">
             <p class="text-gray-400 font-serif text-lg italic">No intelligence reports published yet.</p>
          </div>

          <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            <div class="lg:col-span-8 group cursor-pointer">
              <NuxtLink :to="mainFeature.link" class="block">
                <div class="relative w-full aspect-[16/9] overflow-hidden mb-6 bg-[#0A253A] border border-white/10">
                   <div class="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                   <NuxtImg 
                     v-if="mainFeature.image"
                     :src="mainFeature.image" 
                     alt="Feature Image" 
                     class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 filter saturate-0 group-hover:saturate-100"
                   />
                   <div class="absolute top-0 left-0 bg-[#00A9F4] text-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest z-20 rounded-br-xl">
                     {{ mainFeature.category }}
                   </div>
                </div>

                <div class="max-w-3xl">
                  <h3 class="text-2xl md:text-4xl font-serif text-white leading-tight mb-3 group-hover:text-[#00A9F4] transition-colors duration-300">
                    {{ mainFeature.title }}
                  </h3>
                  <p class="text-base text-gray-400 mb-5 leading-relaxed border-l-2 border-white/20 pl-4">
                    {{ mainFeature.excerpt }}
                  </p>
                  
                  <div class="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    <span class="text-gray-300">{{ mainFeature.authorName }}</span>
                    <span>/</span>
                    <span>{{ mainFeature.readTime }}</span>
                  </div>
                </div>
              </NuxtLink>
            </div>

            <div class="lg:col-span-4 flex flex-col h-full lg:border-l lg:border-white/10 lg:pl-10">
              
              <h4 class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-[#00A9F4] rounded-full"></span>
                Trending
              </h4>

              <div class="flex flex-col gap-6">
                <NuxtLink 
                  v-for="(story) in trendingStories" 
                  :key="story.id"
                  :to="story.link"
                  class="group block border-b border-white/10 pb-6 last:border-0 last:pb-0"
                >
                  <div class="flex flex-col gap-1.5">
                    <span class="text-[9px] font-bold text-[#00A9F4] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                      {{ story.category }}
                    </span>
                    
                    <h3 class="text-lg font-serif text-gray-200 leading-snug group-hover:text-[#00A9F4] transition-colors">
                      {{ story.title }}
                    </h3>
                    
                    <div class="mt-1 text-[#00A9F4] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                       <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                    </div>
                  </div>
                </NuxtLink>
              </div>

              <div class="mt-6 md:hidden">
                <NuxtLink to="/stories" class="text-xs font-bold text-[#00A9F4] underline decoration-transparent hover:decoration-current transition-all">
                   View Full Archive
                </NuxtLink>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  </div>
</template>