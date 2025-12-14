<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

// 1. FETCH REAL DATA
const { data: company, error, status } = await useFetch(`/api/companies/${slug}`)

// 2. HANDLE 404
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Company not found', fatal: true })
}

// 3. HELPERS
const logoUrl = computed(() => {
  if (company.value?.logo && company.value.logo.startsWith('http')) return company.value.logo
  return null
})

const fallbackInitial = computed(() => {
  return company.value?.name?.charAt(0) || 'C'
})

const formatDate = (dateStr: string | Date | null) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const toSolutionSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
}

const getYoutubeId = (url: string) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// SEO & Meta
useSeoMeta({
  title: () => `${company.value?.name} - Verified`,
  description: () => company.value?.headline || `Learn about ${company.value?.name}`,
  ogTitle: () => company.value?.name,
  ogDescription: () => company.value?.headline,
  ogImage: () => company.value?.logo,
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
    
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-gray-100 dark:border-slate-800 border-t-black dark:border-t-white rounded-full animate-spin"></div>
    </div>

    <div v-else-if="company">
      
      <div class="relative bg-gray-900 dark:bg-black text-white pt-32 pb-16 overflow-hidden transition-colors duration-300">
         <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-gray-500 to-transparent"></div>
         <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-start gap-8">
               <div class="w-24 h-24 rounded-2xl bg-white flex items-center justify-center text-4xl font-black text-gray-900 shadow-2xl overflow-hidden shrink-0 border-4 border-transparent dark:border-gray-800">
                  <img v-if="logoUrl" :src="logoUrl" class="w-full h-full object-cover" />
                  <span v-else>{{ fallbackInitial }}</span>
               </div>
               <div class="flex-1">
                  <div class="flex items-center gap-4 mb-4 flex-wrap">
                     <h1 class="text-4xl md:text-5xl font-black tracking-tight text-white">{{ company.name }}</h1>
                     <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-white">{{ company.industry }}</span>
                     <span class="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]">{{ company.stage }}</span>
                  </div>
                  <p class="text-xl text-gray-300 max-w-2xl leading-relaxed">{{ company.headline }}</p>
               </div>
               <div class="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <a v-if="company.website" :href="company.website" target="_blank" class="px-6 py-3 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors text-center flex items-center justify-center gap-2 shadow-lg">
                     Visit Website
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
               </div>
            </div>
         </div>
      </div>

      <div class="border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
         <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-wrap divide-x divide-gray-200 dark:divide-slate-800">
               <div class="px-8 py-6 flex-1 text-center md:text-left">
                  <p class="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-1">Location</p>
                  <p class="text-lg font-black text-gray-900 dark:text-white">{{ company.location }}</p>
               </div>
               <div class="px-8 py-6 flex-1 text-center md:text-left">
                  <p class="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-1">Added On</p>
                  <p class="text-lg font-black text-gray-900 dark:text-white">{{ formatDate(company.createdAt) }}</p>
               </div>
               <div class="px-8 py-6 flex-1 text-center md:text-left">
                  <p class="text-[10px] font-bold uppercase text-gray-400 dark:text-gray-500 tracking-widest mb-1">Team Size</p>
                  <p class="text-lg font-black text-gray-900 dark:text-white">{{ company.team?.length > 0 ? company.team.length + '+' : 'N/A' }}</p>
               </div>
            </div>
         </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div class="lg:col-span-8 space-y-16">
               
               <section>
                  <h3 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">The Solution</h3>
                  
                  <div 
                    class="tiptap-content" 
                    v-if="company.description"
                    v-html="company.description.includes('<') ? company.description : `<p>${company.description}</p>`"
                  ></div>
                  
                  <p v-else class="text-gray-500 dark:text-gray-400 italic">No description provided.</p>
               </section>

               <section v-if="company.videos && company.videos.length > 0">
                   <h3 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">In Action</h3>
                   <div class="grid grid-cols-1 gap-8">
                     <div v-for="(videoUrl, index) in company.videos" :key="index" class="aspect-video bg-black rounded-xl overflow-hidden shadow-sm relative group border border-gray-200 dark:border-slate-800">
                       <template v-if="getYoutubeId(videoUrl)">
                         <ClientOnly>
<iframe 
                            class="w-full h-full"
                            :src="`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}?rel=0&modestbranding=1&loop=1&playlist=${getYoutubeId(videoUrl)}&origin=https://orderlyproblemsolvers.com`" 
                            title="YouTube video player" 
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                            referrerpolicy="strict-origin-when-cross-origin"
                            loading="lazy"
                          ></iframe>
                         </ClientOnly>
                        </template>
                        <div v-else class="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-slate-900 text-gray-400"><span class="text-xs font-bold">Video Unavailable</span></div>
                      </div>
                    </div>
                </section>

               <section v-if="company.stack && company.stack.length > 0">
                  <h3 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Tech Stack</h3>
                  <div class="flex flex-wrap gap-3">
                     <NuxtLink v-for="tech in company.stack" :key="tech.name" :to="`/solutions/${toSolutionSlug(tech.name)}`" class="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg hover:border-black dark:hover:border-white transition-all">
                        <span class="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{{ tech.name }}</span>
                        <span class="text-[10px] text-gray-400 dark:text-gray-500 uppercase group-hover:text-gray-600 dark:group-hover:text-gray-400">{{ tech.category }}</span>
                     </NuxtLink>
                  </div>
               </section>
            </div>

            <div class="lg:col-span-4 space-y-12">
               <div class="p-6 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-sm">
                  <div class="flex items-center justify-between mb-6">
                     <h3 class="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">Team</h3>
                     <NuxtLink to="/people" class="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">View Directory</NuxtLink>
                  </div>
                  <div v-if="company.team && company.team.length > 0" class="space-y-4">
                     <NuxtLink v-for="person in company.team" :key="person.slug" :to="`/people/${person.slug}`" class="flex items-center gap-3 group">
                        <img :src="person.image || `https://ui-avatars.com/api/?name=${person.name}&background=random`" class="w-10 h-10 rounded-full object-cover" />
                        <div>
                           <p class="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600">{{ person.name }}</p>
                           <p class="text-xs text-gray-500 dark:text-gray-400">{{ person.role }}</p>
                        </div>
                     </NuxtLink>
                  </div>
                  <div v-else class="text-center py-6"><p class="text-xs text-gray-400">No verified team members.</p></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  </div>
</template>

<style>
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