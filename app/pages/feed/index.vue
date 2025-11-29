<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoading = ref(true)
const feed = ref<any[]>([])
const followingCount = ref(0)
const isPersonalized = ref(false) // Track if showing personal vs generic data

onMounted(async () => {
  const followedSlugs: string[] = []

  // 1. Check Local Storage
  if (import.meta.client) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith('ops-follow-')) {
        followedSlugs.push(key.replace('ops-follow-', ''))
      }
    }
  }

  followingCount.value = followedSlugs.length

  // 2. DECISION LOGIC
  if (followedSlugs.length > 0) {
    // A. User follows people -> Fetch specific stories
    isPersonalized.value = true
    try {
      feed.value = await $fetch('/api/feed', {
        method: 'POST',
        body: { slugs: followedSlugs }
      })
    } catch (e) { console.error(e) }
  } else {
    // B. User follows NO ONE -> Fetch generic latest stories (Fallback)
    isPersonalized.value = false
    const { data } = await useFetch('/api/stories') // Re-use existing list API
    // Take the top 10 latest
    feed.value = data.value?.slice(0, 10) || []
  }
  
  isLoading.value = false
})

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
    <AppHeader/>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    
    <!-- HEADER -->
    <div class="bg-gray-50 border-b border-gray-200 pt-32 pb-12">
       <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Dynamic Headline -->
          <h1 class="text-4xl font-black text-gray-900 tracking-tighter mb-2">
            {{ isPersonalized ? 'Your Feed' : 'Latest Updates' }}
          </h1>
          
          <!-- Dynamic Subhead -->
          <p class="text-gray-500" v-if="isPersonalized">
             Updates from the <strong>{{ followingCount }}</strong> organizations you follow.
          </p>
          
          <!-- The "Zero State" Upsell -->
          <div v-else class="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-lg inline-flex mt-2">
             <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
             You aren't following anyone yet. Here is what's trending today.
          </div>

       </div>
    </div>

    <!-- CONTENT -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       
       <!-- Loading -->
       <div v-if="isLoading" class="space-y-8">
          <div v-for="i in 3" :key="i" class="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
       </div>

       <!-- Feed List -->
       <div v-else-if="feed.length > 0" class="space-y-12">
          <NuxtLink 
            v-for="story in feed" 
            :key="story.slug" 
            :to="`/stories/${story.slug}`"
            class="group block border-b border-gray-100 pb-12 last:border-0"
          >
             <div class="flex flex-col md:flex-row gap-8 items-start">
                <!-- Thumb -->
                <div class="w-full md:w-48 aspect-video bg-gray-100 rounded-lg overflow-hidden shrink-0">
                   <NuxtImg :src="story.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>

                <!-- Content -->
                <div>
                   <div class="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest">
                      <span class="text-blue-600">{{ story.companyName || story.category }}</span>
                      <span class="text-gray-300">•</span>
                      <span class="text-gray-500">{{ formatDate(story.date || story.publishedAt) }}</span>
                   </div>
                   <h3 class="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {{ story.title }}
                   </h3>
                   <p class="text-gray-500 text-sm leading-relaxed line-clamp-2">
                      {{ story.excerpt }}
                   </p>
                </div>
             </div>
          </NuxtLink>

          <!-- Bottom CTA (Only show if in fallback mode) -->
          <div v-if="!isPersonalized" class="text-center pt-12 border-t border-gray-100">
             <p class="text-gray-900 font-bold mb-2">Want a better feed?</p>
             <p class="text-gray-500 text-sm mb-6">Follow specific companies to curate this page.</p>
             <NuxtLink to="/companies" class="px-6 py-3 bg-black text-white rounded-lg font-bold text-sm hover:bg-gray-800 transition-colors">
                Browse Directory
             </NuxtLink>
          </div>
       </div>

    </div>
  </div>
  <AppFooter/>
</template>