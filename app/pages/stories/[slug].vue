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
  return article.value?.authorDetails?.avatar || `https://ui-avatars.com/api/?name=${article.value?.authorName || 'Admin'}&background=051C2C&color=fff`
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

// 5. SEO & SOCIAL (Kept intact)
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

useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
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
      url: 'https://orderlyproblemsolvers.com/img/logo.png' 
    }
  },
  description: article.value?.excerpt
}))

defineOgImageComponent('OpsTemplate', {
  title: article.value?.title,
  description: article.value?.excerpt || article.value?.subtitle,
  type: 'Story',
  badge: article.value?.category 
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-gray-200 selection:bg-[#00A9F4] selection:text-white transition-colors duration-500">
    
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-gray-100 dark:border-[#0A253A] border-t-[#00A9F4] dark:border-t-[#00A9F4] rounded-full animate-spin"></div>
    </div>

    <div v-else-if="article">
      
      <div class="sticky top-0 z-50 w-full bg-white dark:bg-[#051C2C] border-b border-gray-100 dark:border-gray-800 h-1">
        <div class="h-full bg-[#00A9F4] transition-all duration-150 ease-out" :style="{ width: `${scrollProgress}%` }"></div>
      </div>

      <div class="max-w-4xl mx-auto px-6 lg:px-12 pt-16 pb-12 text-center">
        <div class="flex flex-wrap justify-center gap-4 mb-8">
          <span class="text-[#00A9F4] text-xs font-bold uppercase tracking-[0.2em] border border-[#00A9F4] px-3 py-1">
            {{ article.category }}
          </span>
          <span class="text-gray-400 text-xs font-bold uppercase tracking-[0.2em] border border-gray-200 dark:border-gray-700 px-3 py-1">
            {{ article.readTime }}
          </span>
        </div>
        
        <h1 class="text-4xl md:text-6xl font-serif text-[#051C2C] dark:text-white leading-[1.1] mb-8">
          {{ article.title }}
        </h1>
        
        <p class="text-xl md:text-2xl font-light text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto border-l-2 border-[#00A9F4] pl-6 italic">
          {{ article.excerpt }}
        </p>
        
        <div class="mt-8 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
          <span>Published</span>
          <span class="w-1 h-1 bg-[#00A9F4] rounded-full"></span>
          <span>{{ formatDate(article.date) }}</span>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-0 sm:px-6 lg:px-12 mb-20">
        <div class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-[#0A253A] border-y sm:border border-gray-200 dark:border-gray-800">
          <NuxtImg 
            v-if="article.image" 
            :src="article.image" 
            class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-out" 
            alt="Cover Article" 
          />
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-12 pb-32">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div class="hidden lg:block lg:col-span-2">
            <div class="sticky top-32 flex flex-col gap-6 items-center border-r border-gray-100 dark:border-gray-800 pr-6">
              <span class="text-[10px] font-bold uppercase tracking-widest -rotate-90 text-gray-300 mb-4">Share</span>
              
              <button class="w-12 h-12 flex items-center justify-center text-[#051C2C] dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-[#00A9F4] hover:border-[#00A9F4] hover:text-white transition-all duration-300 group">
                 <span class="sr-only">Share Twitter</span>
                 <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </button>
              
              <button class="w-12 h-12 flex items-center justify-center text-[#051C2C] dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-[#00A9F4] hover:border-[#00A9F4] hover:text-white transition-all duration-300 group">
                 <span class="sr-only">Share LinkedIn</span>
                 <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="flex lg:hidden items-center gap-4 mb-12 pb-8 border-b border-gray-100 dark:border-gray-800">
               <img :src="authorImage" class="w-12 h-12 object-cover grayscale" />
               <div>
                  <p class="text-xs font-bold uppercase tracking-widest text-gray-400">Written by</p>
                  <p class="text-lg font-serif text-[#051C2C] dark:text-white">{{ article.authorName }}</p>
               </div>
            </div>

            <div 
              class="tiptap-content max-w-none" 
              v-html="article.content"
            ></div>
          </div>

          <div class="hidden lg:block lg:col-span-3">
              <div class="sticky top-32 space-y-12 border-l border-gray-100 dark:border-gray-800 pl-8">
                
                <div>
                  <p class="text-[10px] font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-6">Author Dossier</p>
                  <div class="group">
                     <NuxtLink 
                       v-if="article.authorDetails" 
                       :to="`/people/${article.authorDetails.slug}`"
                       class="block"
                     >
                       <div class="w-20 h-20 mb-4 overflow-hidden bg-gray-100 dark:bg-black">
                          <img :src="authorImage" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                       </div>
                       
                       <h4 class="font-serif text-xl text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors">
                          {{ article.authorName }}
                       </h4>
                       <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">
                          {{ article.authorDetails?.role || 'OPS Contributor' }}
                       </p>
                     </NuxtLink>
                     
                     <div v-else>
                        <div class="w-20 h-20 mb-4 overflow-hidden bg-gray-100 dark:bg-black">
                          <img :src="authorImage" class="w-full h-full object-cover grayscale" />
                        </div>
                        <h4 class="font-serif text-xl text-[#051C2C] dark:text-white">{{ article.authorName }}</h4>
                        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mt-1">OPS Contributor</p>
                     </div>
                  </div>
                </div>

                <div v-if="article.companies && article.companies.length > 0">
                   <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Related Entities</p>
                   
                   <div class="space-y-4">
                     <div v-for="comp in article.companies" :key="comp.slug" class="group">
                        <NuxtLink :to="`/companies/${comp.slug}`" class="block bg-gray-50 dark:bg-[#0A253A] p-4 border border-transparent hover:border-[#00A9F4] transition-all duration-300">
                          <div class="flex items-center gap-3 mb-2">
                             <div class="w-6 h-6 bg-white dark:bg-black flex items-center justify-center text-[10px] font-bold border border-gray-200 dark:border-gray-700">
                                <img v-if="comp.logo && comp.logo.startsWith('http')" :src="comp.logo" class="w-full h-full object-cover" />
                                <span v-else>{{ comp.name.charAt(0) }}</span>
                             </div>
                             <span class="font-bold text-sm text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors">{{ comp.name }}</span>
                          </div>
                          <span class="text-[10px] uppercase tracking-widest text-gray-400">{{ comp.industry }}</span>
                        </NuxtLink>
                     </div>
                   </div>
                </div>

                <div v-if="article.people && article.people.length > 0">
                   <p class="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-6">Mentioned</p>
                   
                   <ul class="space-y-3">
                     <li v-for="p in article.people" :key="p.slug">
                        <NuxtLink :to="`/people/${p.slug}`" class="flex items-center gap-3 group">
                           <img :src="p.avatar || `https://ui-avatars.com/api/?name=${p.name}`" class="w-8 h-8 object-cover grayscale group-hover:grayscale-0 transition-all" />
                           <div>
                              <span class="block text-sm font-serif text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors">{{ p.name }}</span>
                              <span class="block text-[10px] text-gray-400 uppercase tracking-widest">{{ p.role }}</span>
                           </div>
                        </NuxtLink>
                     </li>
                   </ul>
                </div>

              </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* 1. Base Styles for Tiptap Content - OPS Theme */
.tiptap-content {
  font-size: 1.125rem; /* 18px */
  line-height: 1.9;
  color: #374151; /* gray-700 */
}

/* Serif Headings */
.tiptap-content :deep(h2) { 
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 2rem; 
  color: #051C2C; 
  margin-top: 3rem; 
  margin-bottom: 1.5rem; 
  line-height: 1.1;
}

.tiptap-content :deep(h3) { 
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 1.5rem; 
  color: #051C2C; 
  margin-top: 2rem; 
  margin-bottom: 1rem; 
}

/* Links - Cyan Accent */
.tiptap-content :deep(a) { 
  color: #00A9F4; 
  text-decoration: underline; 
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  font-weight: 600; 
  cursor: pointer; 
  transition: opacity 0.2s;
}
.tiptap-content :deep(a:hover) { opacity: 0.8; }

/* Lists */
.tiptap-content :deep(ul) { list-style-type: square; padding-left: 1.5rem; margin: 1.5rem 0; color: #4B5563; }
.tiptap-content :deep(ol) { list-style-type: decimal; padding-left: 1.5rem; margin: 1.5rem 0; color: #4B5563; }

/* Editorial Blockquotes */
.tiptap-content :deep(blockquote) {
  border-left: 4px solid #00A9F4;
  padding-left: 1.5rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 1.25rem;
  font-style: italic;
  color: #051C2C;
  margin: 2.5rem 0;
  background: #F9FAFB;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

/* Images - Sharp & Clean */
.tiptap-content :deep(img) {
  width: 100%;
  margin: 2.5rem 0;
  border: 1px solid #E5E7EB;
}

/* Code Blocks - Terminal Style */
.tiptap-content :deep(pre) {
  background: #051C2C;
  color: #E2E8F0;
  font-family: 'JetBrainsMono', monospace;
  padding: 1.5rem;
  margin: 2rem 0;
  overflow-x: auto;
  border-left: 4px solid #00A9F4;
}

/* --- DARK MODE OVERRIDES --- */
html.dark .tiptap-content { color: #9CA3AF; } /* Gray-400 */

/* Headings to White */
html.dark .tiptap-content :deep(h1),
html.dark .tiptap-content :deep(h2),
html.dark .tiptap-content :deep(h3),
html.dark .tiptap-content :deep(strong),
html.dark .tiptap-content :deep(b) {
  color: #FFFFFF !important;
}

/* Blockquotes Dark */
html.dark .tiptap-content :deep(blockquote) {
  background: #0A253A;
  color: #E5E7EB;
  border-left-color: #00A9F4;
}

/* Lists Dark */
html.dark .tiptap-content :deep(ul),
html.dark .tiptap-content :deep(ol) {
  color: #9CA3AF;
}

/* Images Dark */
html.dark .tiptap-content :deep(img) {
  border-color: #1F2937;
  opacity: 0.9;
}
</style>