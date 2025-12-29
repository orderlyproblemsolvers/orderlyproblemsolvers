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
  if (!dateStr) return '—'
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
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="flex flex-col items-center gap-4">
         <div class="w-16 h-16 border-t-2 border-[#00A9F4] rounded-full animate-spin"></div>
         <span class="text-xs font-bold uppercase tracking-widest text-gray-400">Loading Intelligence...</span>
       </div>
    </div>

    <div v-else-if="company">
      
      <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A253A]">
        <div class="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
           
           <div class="flex flex-col md:flex-row items-start gap-10">
              <div class="shrink-0 w-32 h-32 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg">
                 <img v-if="logoUrl" :src="logoUrl" class="w-24 h-24 object-contain" :alt="company.name" />
                 <span v-else class="text-5xl font-serif font-black text-gray-300 dark:text-gray-700">{{ fallbackInitial }}</span>
              </div>

              <div class="flex-1">
                 <div class="flex flex-wrap items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest">
                    <span class="text-[#00A9F4]">{{ company.industry }}</span>
                    <span class="text-gray-300 dark:text-gray-600">/</span>
                    <span class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                       {{ company.stage }}
                       <span class="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    </span>
                 </div>

                 <h1 class="text-5xl md:text-7xl font-serif text-[#051C2C] dark:text-white mb-6 leading-[0.9]">
                   {{ company.name }}
                 </h1>
                 
                 <p class="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                   {{ company.headline }}
                 </p>
              </div>
              
              <div class="mt-4 md:mt-0">
                 <a 
                   v-if="company.website" 
                   :href="company.website" 
                   target="_blank" 
                   class="group flex items-center gap-3 px-6 py-4 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:bg-[#00A9F4] dark:hover:bg-[#00A9F4] hover:text-white dark:hover:text-white transition-all duration-300 shadow-xl"
                 >
                   Visit Site
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                 </a>
              </div>
           </div>

        </div>
      </div>

      <div class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#051C2C]">
         <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 dark:divide-gray-800 border-x border-gray-200 dark:border-gray-800">
               
               <div class="p-6">
                  <span class="block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">HQ Location</span>
                  <span class="font-mono text-lg text-[#051C2C] dark:text-white">{{ company.location }}</span>
               </div>
               
               <div class="p-6">
                  <span class="block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Founded</span>
                  <span class="font-mono text-lg text-[#051C2C] dark:text-white">{{ formatDate(company.createdAt) }}</span>
               </div>

               <div class="p-6">
                  <span class="block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Team Size</span>
                  <span class="font-mono text-lg text-[#051C2C] dark:text-white">{{ company.team?.length > 0 ? company.team.length : '—' }} Verified</span>
               </div>

               <div class="p-6 flex items-center justify-center bg-gray-50 dark:bg-white/5">
                  <span class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00A9F4]">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     Verified Entity
                  </span>
               </div>

            </div>
         </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-20">
         <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            <div class="lg:col-span-8 space-y-20">
               
               <section>
                  <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Executive Summary
                  </h3>
                  
                  <div 
                    class="tiptap-content max-w-none font-serif" 
                    v-if="company.description"
                    v-html="company.description.includes('<') ? company.description : `<p>${company.description}</p>`"
                  ></div>
                  <p v-else class="text-gray-400 italic font-serif text-lg">No summary provided.</p>
               </section>

               <section v-if="company.stack && company.stack.length > 0">
                  <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Technology Infrastructure
                  </h3>


                  <div class="flex flex-wrap gap-3">
                     <NuxtLink 
                        v-for="tech in company.stack" 
                        :key="tech.name" 
                        :to="`/solutions/${toSolutionSlug(tech.name)}`"
                        class="group flex items-center gap-3 px-4 py-2 border border-gray-200 dark:border-gray-700 hover:border-[#00A9F4] dark:hover:border-[#00A9F4] transition-colors bg-white dark:bg-transparent"
                     >
                        <span class="text-sm font-mono font-bold text-[#051C2C] dark:text-white">{{ tech.name }}</span>
                        <span class="w-px h-3 bg-gray-300 dark:bg-gray-700"></span>
                        <span class="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-[#00A9F4]">{{ tech.category }}</span>
                     </NuxtLink>
                  </div>
               </section>

            </div>

            <div class="lg:col-span-4 space-y-16">
               
               <section>
                  <div class="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                     <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em]">Leadership</h3>
                     <NuxtLink to="/people" class="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-[#051C2C] dark:hover:text-white transition-colors">Directory &rarr;</NuxtLink>
                  </div>

                  <div v-if="company.team && company.team.length > 0" class="flex flex-col">
                     <NuxtLink 
                        v-for="person in company.team" 
                        :key="person.slug" 
                        :to="`/people/${person.slug}`" 
                        class="group flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0"
                     >
                        <img 
                           :src="person.image || `https://ui-avatars.com/api/?name=${person.name}&background=051C2C&color=fff`" 
                           class="w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-300 object-cover border border-gray-200 dark:border-gray-700" 
                        />
                        <div>
                           <p class="text-sm font-bold font-serif text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors mb-0.5">
                              {{ person.name }}
                           </p>
                           <p class="text-xs text-gray-500 uppercase tracking-wider">{{ person.role }}</p>
                        </div>
                     </NuxtLink>
                  </div>
                  <div v-else class="p-6 bg-gray-50 dark:bg-[#0A253A] border border-gray-100 dark:border-white/5 text-center">
                     <span class="text-xs text-gray-400">No verified members listed.</span>
                  </div>
               </section>

               <section v-if="company.videos && company.videos.length > 0">
                  <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                    Media Assets
                  </h3>
                  <div class="flex flex-col gap-6">
                     <div 
                        v-for="(videoUrl, index) in company.videos" 
                        :key="index" 
                        class="w-full aspect-video bg-black border border-gray-800 relative group"
                     >
                        <template v-if="getYoutubeId(videoUrl)">
                           <ClientOnly>
                              <iframe 
                                 class="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                                 :src="`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}?rel=0&modestbranding=1&loop=0`" 
                                 title="YouTube video player" 
                                 frameborder="0" 
                                 allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                                 referrerpolicy="strict-origin-when-cross-origin"
                                 allowfullscreen
                              ></iframe>
                           </ClientOnly>
                        </template>
                        <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
                           <span class="text-xs font-mono uppercase">Asset Unavailable</span>
                        </div>
                     </div>
                  </div>
               </section>

            </div>

         </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* EDITORIAL TYPOGRAPHY FOR DESCRIPTION */
.tiptap-content {
  font-size: 1.125rem; 
  line-height: 1.8;
}

/* Headers */
.tiptap-content :deep(h2) { 
  font-family: serif; 
  font-size: 1.75rem; 
  color: #051C2C; 
  margin-top: 2rem; 
  margin-bottom: 1rem; 
}
.tiptap-content :deep(h3) { 
  font-family: serif; 
  font-size: 1.5rem; 
  color: #051C2C; 
  margin-top: 1.5rem; 
  margin-bottom: 0.75rem; 
}

/* Links */
.tiptap-content :deep(a) { 
  color: #00A9F4; 
  text-decoration: underline; 
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
}

/* Blockquotes: Editorial Style */
.tiptap-content :deep(blockquote) {
  border-left: 2px solid #00A9F4;
  padding-left: 1.5rem;
  font-family: serif;
  font-style: italic;
  font-size: 1.25rem;
  color: #555;
  margin: 2rem 0;
}

/* Images: Sharp edges */
.tiptap-content :deep(img) {
  border-radius: 0;
  margin: 2rem 0;
  width: 100%;
}

/* DARK MODE OVERRIDES */
html.dark .tiptap-content :deep(h2),
html.dark .tiptap-content :deep(h3) {
  color: #ffffff;
}
html.dark .tiptap-content :deep(blockquote) {
  color: #9ca3af;
}
</style>