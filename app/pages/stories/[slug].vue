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
  badge: article.value?.category 
})
</script>

<template>
  <AppHeader/>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-slate-200 selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
    
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-gray-100 dark:border-slate-800 border-t-black dark:border-t-white rounded-full animate-spin"></div>
    </div>

    <div v-else-if="article">
      
      <div class="sticky top-20 z-30 w-full bg-white/95 dark:bg-slate-950/95 backdrop-blur border-b border-gray-100 dark:border-white/5 h-1">
        <div class="h-full bg-blue-600 transition-all duration-150 ease-out" :style="{ width: `${scrollProgress}%` }"></div>
      </div>

      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
        <div class="flex justify-center gap-3 mb-6">
          <span class="px-3 py-1 bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-full">{{ article.category }}</span>
          <span class="px-3 py-1 bg-gray-100 dark:bg-slate-900 text-gray-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-widest rounded-full">{{ article.readTime }}</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black tracking-tighter leading-[1.1] mb-6 text-gray-900 dark:text-white">{{ article.title }}</h1>
        <p class="text-xl text-gray-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">{{ article.excerpt }}</p>
        <p class="mt-6 text-sm font-bold text-gray-400 dark:text-slate-500">{{ formatDate(article.date) }}</p>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div class="aspect-video rounded-2xl overflow-hidden shadow-sm bg-gray-100 dark:bg-slate-900 border border-transparent dark:border-white/5">
          <NuxtImg 
            v-if="article.image" 
            :src="article.image" 
            class="w-full h-full object-cover" 
            alt="Cover Article" 
          />
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div class="hidden lg:block lg:col-span-2">
            <div class="sticky top-48 flex flex-col gap-4 items-center">
              <button class="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-gray-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-800/50">
                 <span class="sr-only">Share Twitter</span>
                 <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
              </button>
              <button class="w-10 h-10 rounded-full bg-gray-50 dark:bg-slate-900 flex items-center justify-center text-gray-400 dark:text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-transparent hover:border-blue-100 dark:hover:border-blue-800/50">
                 <span class="sr-only">Share LinkedIn</span>
                 <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd"></path></svg>
              </button>
            </div>
          </div>

          <div class="lg:col-span-7">
            <div class="flex lg:hidden items-center gap-3 mb-8 pb-8 border-b border-gray-100 dark:border-white/10">
               <img :src="authorImage" class="w-10 h-10 rounded-full object-cover" />
               <div>
                  <p class="text-sm font-bold text-gray-900 dark:text-white">{{ article.authorName }}</p>
               </div>
            </div>

            <div 
              class="tiptap-content max-w-none" 
              v-html="article.content"
            ></div>
          </div>

          <div class="hidden lg:block lg:col-span-3">
             <div class="sticky top-48 space-y-12">
               
               <div>
                  <p class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Written By</p>
                  <div class="flex items-start gap-3">
                     <NuxtLink 
                       v-if="article.authorDetails" 
                       :to="`/people/${article.authorDetails.slug}`"
                       class="shrink-0 group"
                     >
                       <img :src="authorImage" class="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 object-cover group-hover:border-blue-500 transition-colors" />
                     </NuxtLink>
                     
                     <div v-else class="shrink-0">
                        <img :src="authorImage" class="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 object-cover" />
                     </div>

                     <div>
                        <NuxtLink 
                           v-if="article.authorDetails" 
                           :to="`/people/${article.authorDetails.slug}`" 
                           class="font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                        >
                           {{ article.authorName }}
                        </NuxtLink>
                        <p v-else class="font-bold text-gray-900 dark:text-white">{{ article.authorName }}</p>

                        <p class="text-xs text-gray-500 dark:text-slate-400 mt-1 leading-relaxed">
                           {{ article.authorDetails?.role || 'OPS Contributor' }}
                        </p>
                     </div>
                  </div>
               </div>

               <div v-if="article.companies && article.companies.length > 0" class="space-y-4">
                  <p class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Featured Companies</p>
                  
                  <div v-for="comp in article.companies" :key="comp.slug" class="p-4 bg-gray-50 dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-white/5">
                     <div class="flex items-center gap-3 mb-3">
                        <div class="w-8 h-8 rounded bg-white dark:bg-slate-800 border border-gray-200 dark:border-white/10 flex items-center justify-center font-black text-gray-900 dark:text-white shrink-0 text-xs overflow-hidden">
                           <img v-if="comp.logo && comp.logo.startsWith('http')" :src="comp.logo" class="w-full h-full object-cover" />
                           <span v-else>{{ comp.name.charAt(0) }}</span>
                        </div>
                        <div>
                           <p class="font-bold text-sm text-gray-900 dark:text-white leading-tight">{{ comp.name }}</p>
                           <p class="text-[10px] text-gray-500 dark:text-slate-400">{{ comp.industry }}</p>
                        </div>
                     </div>
                     <NuxtLink :to="`/companies/${comp.slug}`" class="block w-full py-2 bg-white dark:bg-slate-950 border border-gray-200 dark:border-white/10 text-center rounded text-xs font-bold hover:border-black hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all dark:text-slate-200">
                        View Profile
                     </NuxtLink>
                  </div>
               </div>

               <div v-if="article.people && article.people.length > 0" class="space-y-4">
                  <p class="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Featured Experts</p>
                  
                  <div v-for="p in article.people" :key="p.slug" class="flex items-center gap-3 p-3 border border-gray-100 dark:border-white/5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors bg-white dark:bg-slate-950">
                     <img :src="p.avatar || `https://ui-avatars.com/api/?name=${p.name}`" class="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-slate-800" />
                     <div>
                        <NuxtLink :to="`/people/${p.slug}`" class="text-sm font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 block transition-colors">{{ p.name }}</NuxtLink>
                        <p class="text-xs text-gray-500 dark:text-slate-400">{{ p.role }}</p>
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

<style scoped>
/* 1. Base Styles for Tiptap Content */
.tiptap-content {
  font-size: 1.125rem; /* 18px */
  line-height: 1.8;
  color: #374151; /* gray-700 */
}

/* Headers */
.tiptap-content h2 { font-size: 1.75rem; font-weight: 800; color: #111827; margin-top: 2rem; margin-bottom: 1rem; }
.tiptap-content h3 { font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 1.5rem; margin-bottom: 0.75rem; }

/* Links */
.tiptap-content a { color: #2563eb; text-decoration: underline; font-weight: 600; cursor: pointer; }

/* Lists */
.tiptap-content ul { list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0; }
.tiptap-content ol { list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0; }

/* Blockquotes */
.tiptap-content blockquote {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  font-style: italic;
  color: #6b7280;
  margin: 1.5rem 0;
}

/* Images */
.tiptap-content img {
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  max-width: 100%;
}

/* 2. CODE BLOCKS (Dark Terminal Look) */
.tiptap-content pre {
  background: #0d0d0d;
  color: #FFF;
  font-family: 'JetBrainsMono', monospace;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
  overflow-x: auto;
}
.tiptap-content code {
  color: inherit;
  background: none;
  font-size: 0.875rem;
}

/* 3. DARK MODE OVERRIDES (The "Nuclear" Fix) */
/* We target 'html.dark' to ensure this only applies when dark mode is active */

html.dark .tiptap-content {
  color: #f1f5f9 !important; /* Slate-100 */
}

/* Force standard text elements to white */
html.dark .tiptap-content p, 
html.dark .tiptap-content span:not([style*="color"]), /* Don't override spans that have specific color styles from the picker */
html.dark .tiptap-content li {
  color: #f1f5f9; 
}

/* Headers - Bright White */
html.dark .tiptap-content h1,
html.dark .tiptap-content h2,
html.dark .tiptap-content h3,
html.dark .tiptap-content strong,
html.dark .tiptap-content b {
  color: #ffffff !important;
}

/* Links - Keep Blue */
html.dark .tiptap-content a {
  color: #60a5fa !important; /* Blue-400 */
}

/* Blockquotes */
html.dark .tiptap-content blockquote {
  border-color: #334155; /* Slate-700 */
  color: #cbd5e1; /* Slate-300 */
}

/* Code Blocks - Ensure they stay dark */
html.dark .tiptap-content pre {
  background: #020617; /* Slate-950 */
  border: 1px solid #1e293b;
}
</style>