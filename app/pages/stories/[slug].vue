<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

// 1. FETCH DATA
const { data: article, error, status } = await useFetch(`/api/stories/${slug}`)

// 2. HANDLE 404
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Story not found', fatal: true })
}

// 3. HELPERS
const authorImage = computed(() => {
  // Use linked profile avatar OR generate one from the text name
  return article.value?.authorDetails?.avatar || `https://ui-avatars.com/api/?name=${article.value?.authorName || 'Admin'}&background=random&color=fff`
})

const formatDate = (dateStr: string | Date) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// 4. SCROLL PROGRESS LOGIC
const scrollProgress = ref(0)
const updateScroll = () => {
  if (import.meta.client) {
    const scrollTop = window.scrollY
    const docHeight = document.body.offsetHeight - window.innerHeight
    scrollProgress.value = (scrollTop / docHeight) * 100
  }
}

onMounted(() => window.addEventListener('scroll', updateScroll))
onUnmounted(() => window.removeEventListener('scroll', updateScroll))

// 5. SEO & SOCIAL
useSeoMeta({
  title: () => article.value?.title,
  description: () => article.value?.subtitle || article.value?.excerpt,
  author: () => article.value?.authorName,
  ogTitle: () => article.value?.title,
  ogDescription: () => article.value?.excerpt,
  ogImage: () => article.value?.image,
  ogType: 'article',
  articlePublishedTime: () => article.value?.date,
  articleAuthor: () => article.value?.authorName,
  twitterCard: 'summary_large_image',
})

// 2. JSON-LD
useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting', // or 'NewsArticle'
  headline: article.value?.title,
  image: [article.value?.image],
  datePublished: article.value?.date,
  author: {
    '@type': 'Person',
    name: article.value?.authorName
  },
  publisher: {
    '@type': 'Organization',
    name: 'Orderly Problem Solvers',
    logo: {
      '@type': 'ImageObject',
      url: 'https://orderlyproblemsolvers.com/img/logo.png' // Update with real domain
    }
  },
  description: article.value?.excerpt
}))

defineOgImageComponent('OpsTemplate', {
  title: article.value?.title,
  description: article.value?.excerpt || article.value?.subtitle,
  type: 'Story',
  badge: article.value?.category // e.g. "Spotlight" or "Engineering"
})
</script>

<template>
  <AppHeader/>
  <div class="min-h-screen bg-white font-sans text-gray-900 selection:bg-blue-100">
    
    <!-- LOADING STATE -->
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
    </div>

    <div v-else-if="article">
      
      <!-- PROGRESS BAR -->
      <div class="sticky top-20 z-30 w-full bg-white/95 backdrop-blur border-b border-gray-100 h-1">
        <div class="h-full bg-blue-600 transition-all duration-150 ease-out" :style="{ width: `${scrollProgress}%` }"></div>
      </div>

      <!-- HERO SECTION -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <div class="flex justify-center gap-3 mb-6">
          <span class="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full">{{ article.category }}</span>
          <span class="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full">{{ article.readTime }}</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-6 text-gray-900">{{ article.title }}</h1>
        <p class="text-xl text-gray-500 leading-relaxed max-w-2xl mx-auto">{{ article.excerpt }}</p>
        <p class="mt-6 text-sm font-bold text-gray-400">{{ formatDate(article.date) }}</p>
      </div>

      <!-- COVER IMAGE -->
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="aspect-video rounded-2xl overflow-hidden shadow-sm bg-gray-100">
          <NuxtImg 
            v-if="article.image" 
            :src="article.image" 
            class="w-full h-full object-cover" 
            alt="Cover Article" 
          />
        </div>
      </div>

      <!-- CONTENT GRID -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <!-- LEFT: SHARE -->
          <div class="hidden lg:block lg:col-span-2">
            <div class="sticky top-48 flex flex-col gap-4 items-center">
              <button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100">
                 <span class="sr-only">Share Twitter</span>
                 <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-blue-50 hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100">
                 <span class="sr-only">Share LinkedIn</span>
                 <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
          </div>

          <!-- CENTER: ARTICLE BODY -->
          <div class="lg:col-span-7">
            <!-- Mobile Byline -->
            <div class="flex lg:hidden items-center gap-3 mb-8 pb-8 border-b border-gray-100">
               <img :src="authorImage" class="w-10 h-10 rounded-full object-cover" />
               <div>
                  <p class="text-sm font-bold">{{ article.authorName }}</p>
               </div>
            </div>

            <div 
              class="prose prose-lg prose-gray max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-blue-600 hover:prose-a:text-blue-800 prose-img:rounded-xl prose-blockquote:border-l-black prose-blockquote:italic prose-blockquote:font-serif" 
              v-html="article.content"
            ></div>
          </div>

          <!-- RIGHT: CONTEXT SIDEBAR -->
          <div class="hidden lg:block lg:col-span-3">
             <div class="sticky top-48 space-y-12">
                
                <!-- 1. Author Widget -->
                <div>
                   <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Written By</p>
                   <div class="flex items-start gap-3">
                      <!-- Link to profile ONLY if authorDetails exists -->
                      <NuxtLink 
                        v-if="article.authorDetails" 
                        :to="`/people/${article.authorDetails.slug}`"
                        class="shrink-0 group"
                      >
                        <img :src="authorImage" class="w-12 h-12 rounded-full border border-gray-200 object-cover group-hover:border-blue-500 transition-colors" />
                      </NuxtLink>
                      <!-- Else show static image -->
                      <div v-else class="shrink-0">
                         <img :src="authorImage" class="w-12 h-12 rounded-full border border-gray-200 object-cover" />
                      </div>

                      <div>
                         <!-- Link name only if details exist -->
                         <NuxtLink 
                            v-if="article.authorDetails" 
                            :to="`/people/${article.authorDetails.slug}`" 
                            class="font-bold text-gray-900 hover:text-blue-600 transition-colors block"
                         >
                            {{ article.authorName }}
                         </NuxtLink>
                         <p v-else class="font-bold text-gray-900">{{ article.authorName }}</p>

                         <p class="text-xs text-gray-500 mt-1 leading-relaxed">
                            {{ article.authorDetails?.role || 'OPS Contributor' }}
                         </p>
                      </div>
                   </div>
                </div>

                <!-- 2. Featured Companies (List) -->
                <div v-if="article.companies && article.companies.length > 0" class="space-y-4">
                   <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Companies</p>
                   
                   <div v-for="comp in article.companies" :key="comp.slug" class="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div class="flex items-center gap-3 mb-3">
                         <div class="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center font-black text-gray-900 shrink-0 text-xs overflow-hidden">
                           <img v-if="comp.logo && comp.logo.startsWith('http')" :src="comp.logo" class="w-full h-full object-cover" />
                           <span v-else>{{ comp.name.charAt(0) }}</span>
                         </div>
                         <div>
                            <p class="font-bold text-sm text-gray-900 leading-tight">{{ comp.name }}</p>
                            <p class="text-[10px] text-gray-500">{{ comp.industry }}</p>
                         </div>
                      </div>
                      <NuxtLink :to="`/companies/${comp.slug}`" class="block w-full py-2 bg-white border border-gray-200 text-center rounded text-xs font-bold hover:border-black hover:bg-black hover:text-white transition-all">
                         View Profile
                      </NuxtLink>
                   </div>
                </div>

                <!-- 3. Featured People (List) -->
                <div v-if="article.people && article.people.length > 0" class="space-y-4">
                   <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">Featured Experts</p>
                   
                   <div v-for="p in article.people" :key="p.slug" class="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors bg-white">
                      <img :src="p.avatar || `https://ui-avatars.com/api/?name=${p.name}`" class="w-10 h-10 rounded-full object-cover border border-gray-100" />
                      <div>
                         <NuxtLink :to="`/people/${p.slug}`" class="text-sm font-bold text-gray-900 hover:text-blue-600 block transition-colors">{{ p.name }}</NuxtLink>
                         <p class="text-xs text-gray-500">{{ p.role }}</p>
                      </div>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </div>

    </div>
  </div>
  <AppFooter/>
</template>