<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

// 1. FETCH REAL DATA
const { data: person, status, error } = await useFetch(`/api/people/${slug}`)

// 2. HANDLE 404
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Person not found', fatal: true })
}

// 3. HELPERS
const avatarUrl = computed(() => {
  return person.value?.avatar || `https://ui-avatars.com/api/?name=${person.value?.name}&background=051C2C&color=fff&size=512`
})

const formatDate = (dateStr: string | Date) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const toSolutionSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
}

// Robust YouTube ID Extractor
const getYoutubeId = (url: string) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// 4. BUTTON ACTIONS
const openEmail = () => {
  if (person.value?.email) window.location.href = `mailto:${person.value.email}`
}

const openWebsite = () => {
  if (person.value?.website) window.open(person.value.website, '_blank')
}

// 5. SEO
useSeoMeta({
  title: () => `${person.value?.name} - ${person.value?.role}`,
  description: () => person.value?.bio || `View the professional profile of ${person.value?.name}, a verified expert in ${person.value?.location}.`,
  ogTitle: () => `${person.value?.name} | OPS Index`,
  ogDescription: () => person.value?.bio,
  ogImage: () => person.value?.avatar,
  ogType: 'profile',
  twitterCard: 'summary',
  twitterTitle: () => person.value?.name,
  twitterImage: () => person.value?.avatar,
})

defineOgImageComponent('OpsTemplate', {
  title: person.value?.name,
  image: person.value?.avatar,
  type: 'Person',
  badge: 'Verified',
  role: person.value?.role,
  companyName: person.value?.companyName
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="flex flex-col items-center gap-4">
         <div class="w-16 h-16 border-t-2 border-[#00A9F4] rounded-full animate-spin"></div>
         <span class="text-xs font-bold uppercase tracking-widest text-gray-400">Loading Profile...</span>
       </div>
    </div>

    <div v-else-if="person">
      
      <div class="border-b border-gray-200 dark:border-gray-800">
        <div class="max-w-7xl mx-auto px-6 lg:px-12 pt-12 lg:pt-24 pb-12">
          
          <div class="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            
            <div class="md:col-span-4 lg:col-span-3">
              <div class="group relative w-full aspect-[3/4] bg-gray-100 dark:bg-black overflow-hidden border border-gray-200 dark:border-gray-700 shadow-2xl">
                <img 
                  :src="avatarUrl" 
                  class="w-full h-full object-cover  transition-all duration-700" 
                  alt="Profile Picture" 
                />
                <div class="absolute bottom-0 right-0 bg-[#00A9F4] text-white p-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
              </div>
            </div>

            <div class="md:col-span-8 lg:col-span-9 pb-2">
              
              <div class="flex items-center gap-4 mb-6">
                 <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {{ person.location || 'Global / Remote' }}
                 </div>

                 <div v-if="!person.companyName" class="flex items-center gap-2 px-3 py-1 border border-[#00A9F4]/30 rounded-full">
                    <span class="relative flex h-2 w-2">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A9F4] opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-2 w-2 bg-[#00A9F4]"></span>
                    </span>
                    <span class="text-[10px] font-bold uppercase tracking-widest text-[#00A9F4]">Available</span>
                 </div>
              </div>

              <h1 class="text-5xl md:text-7xl font-serif text-[#051C2C] dark:text-white mb-2 leading-[0.9]">
                {{ person.name }}<span class="text-[#00A9F4]">.</span>
              </h1>
              <div class="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 mb-8">
                {{ person.role }}
                <span v-if="person.companyName" class="text-gray-400 mx-2">—</span>
                <NuxtLink 
                  v-if="person.companyName" 
                  :to="`/companies/${person.companySlug}`" 
                  class="text-[#00A9F4] hover:underline decoration-1 underline-offset-4"
                >
                  {{ person.companyName }}
                </NuxtLink>
              </div>

              <div class="flex flex-wrap gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                <button 
                  v-if="person.email"
                  @click="openEmail"
                  class="group flex items-center gap-3 px-6 py-3 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:bg-[#00A9F4] dark:hover:bg-[#00A9F4] hover:text-white dark:hover:text-white transition-all duration-300"
                >
                  Contact
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                </button>

                <button 
                  v-if="person.website"
                  @click="openWebsite"
                  class="group flex items-center gap-3 px-6 py-3 border border-gray-300 dark:border-gray-600 text-[#051C2C] dark:text-white text-xs font-bold uppercase tracking-widest hover:border-[#00A9F4] hover:text-[#00A9F4] transition-all duration-300"
                >
                  Website
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div class="lg:col-span-8 space-y-20">
            
            <section>
              <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                Biography
              </h3>
              <div 
                class="tiptap-content max-w-none font-serif text-lg leading-loose text-gray-700 dark:text-gray-300" 
                v-html="person.bio || 'No biography provided.'"
              ></div>
            </section>

            <section v-if="person.stack && person.stack.length > 0">
               <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                Technical Stack
              </h3>
               <div class="flex flex-wrap gap-3">
                  <NuxtLink 
                    v-for="tech in person.stack" 
                    :key="tech.name" 
                    :to="`/solutions/${toSolutionSlug(tech.name)}`"
                    class="group flex items-center gap-3 px-4 py-2 border border-gray-200 dark:border-gray-700 hover:border-[#00A9F4] dark:hover:border-[#00A9F4] transition-colors"
                  >
                     <span class="text-sm font-mono font-bold text-[#051C2C] dark:text-white">{{ tech.name }}</span>
                     <span class="w-px h-3 bg-gray-300 dark:bg-gray-700"></span>
                     <span class="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-[#00A9F4]">{{ tech.category }}</span>
                  </NuxtLink>
               </div>
            </section>

            <section v-if="person.articles && person.articles.length > 0">
              <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                Published Intelligence
              </h3>
              <div class="flex flex-col">
                 <NuxtLink 
                   v-for="article in person.articles" 
                   :key="article.slug" 
                   :to="`/stories/${article.slug}`" 
                   class="group py-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row md:items-baseline gap-4"
                 >
                    <div class="w-32 shrink-0 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                       {{ article.date ? formatDate(article.date) : 'Recent' }}
                    </div>
                    <div>
                       <h4 class="text-xl font-serif text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors mb-2">
                          {{ article.title }}
                       </h4>
                       <span class="inline-block text-[10px] font-bold text-gray-400 border border-gray-200 dark:border-gray-700 px-2 py-0.5 uppercase tracking-wider">
                          {{ article.category }}
                       </span>
                    </div>
                 </NuxtLink>
              </div>
            </section>

          </div>

          <div class="lg:col-span-4 space-y-16">
             
             <section v-if="person.videos && person.videos.length > 0">
                <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                  In Action
                </h3>
                <div class="flex flex-col gap-8">
                  <div 
                    v-for="(videoUrl, index) in person.videos" 
                    :key="index" 
                    class="w-full aspect-video bg-black relative border border-gray-800 group"
                  >
                    <template v-if="getYoutubeId(videoUrl)">
                      <ClientOnly>
                         <iframe 
                         class="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                         :src="`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}?rel=0&modestbranding=1&loop=0`" 
                         title="YouTube video player" 
                         frameborder="0" 
                         allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                         allowfullscreen
                         referrerpolicy="strict-origin-when-cross-origin"
                         ></iframe>
                      </ClientOnly>
                    </template>
                    <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
                       <span class="text-xs font-mono uppercase">Source Unavailable</span>
                    </div>
                  </div>
                </div>
             </section>

             <div class="p-8 bg-gray-50 dark:bg-[#0A253A] border border-gray-100 dark:border-white/5">
                <h4 class="font-serif text-xl text-[#051C2C] dark:text-white mb-4">Explore the Network</h4>
                <p class="text-sm text-gray-500 mb-6">Discover more verified experts in the OPS directory.</p>
                <NuxtLink to="/people" class="text-xs font-bold uppercase tracking-widest text-[#00A9F4] hover:text-[#051C2C] dark:hover:text-white transition-colors">
                   View Directory &rarr;
                </NuxtLink>
             </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* EDITORIAL TYPOGRAPHY FOR BIO CONTENT */
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
  filter: grayscale(100%);
  transition: filter 0.5s;
}
.tiptap-content :deep(img):hover {
  filter: grayscale(0%);
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