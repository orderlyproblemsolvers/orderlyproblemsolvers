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
  return person.value?.avatar || `https://ui-avatars.com/api/?name=${person.value?.name}&background=random&size=256`
})

const formatDate = (dateStr: string | Date) => {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const toSolutionSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
}

// ✅ NEW: Robust YouTube ID Extractor (Handles Shorts/Share/Standard)
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
  <AppHeader/>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-white transition-colors duration-300">
    
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-gray-100 dark:border-slate-800 border-t-black dark:border-t-white rounded-full animate-spin"></div>
    </div>

    <div v-else-if="person">
      
      <div class="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 pt-32 pb-12 transition-colors duration-300">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div class="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div class="relative group shrink-0">
              <div class="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-sm bg-white dark:bg-slate-800">
                <img :src="avatarUrl" class="w-full h-full object-cover" alt="Profile Picture" />
              </div>
              <div class="absolute -bottom-3 -right-3 bg-blue-600 text-white p-1.5 rounded-full border-4 border-gray-50 dark:border-slate-900">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
            </div>

            <div class="flex-1 w-full">
              <div class="flex items-center gap-3 mb-2">
                <h1 class="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white">{{ person.name }}</h1>
                <span v-if="!person.companyName" class="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider rounded-full">Open to Work</span>
              </div>
              
              <p class="text-lg text-gray-600 dark:text-gray-300 font-medium mb-4 flex items-center flex-wrap gap-1">
                {{ person.role }} 
                <span v-if="person.companyName">
                  <span class="text-gray-400 dark:text-gray-500 mx-1">at</span> 
                  <NuxtLink :to="`/companies/${person.companySlug}`" class="text-blue-600 dark:text-blue-400 hover:underline font-bold">
                    {{ person.companyName }}
                  </NuxtLink>
                </span>
                <span v-else class="text-gray-400 dark:text-gray-500 mx-1">(Freelance)</span>
              </p>

              <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 font-medium">
                <span class="flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {{ person.location || 'Remote' }}
                </span>
              </div>
            </div>

            <div class="flex flex-wrap gap-3 w-full md:w-auto">
               
               <button 
                 v-if="person.email"
                 @click="openEmail"
                 class="px-6 py-3 bg-black dark:bg-white text-white dark:text-black text-sm font-bold rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-lg shadow-gray-200 dark:shadow-black/20 flex items-center gap-2"
               >
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                 Send Email
               </button>

               <button 
                 v-if="person.website"
                 @click="openWebsite"
                 class="px-6 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 text-sm font-bold rounded-lg hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-colors flex items-center gap-2"
               >
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                 Website
               </button>

            </div>
          </div>

        </div>
      </div>

      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div class="lg:col-span-8 space-y-16">
            
            <section>
              <h3 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">About</h3>
              <div 
                class="prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300 prose-img:rounded-xl prose-blockquote:border-l-black dark:prose-blockquote:border-l-white prose-blockquote:italic prose-blockquote:font-serif" 
                v-html="person.bio || 'No bio available.'"
              ></div>
            </section>

            <section v-if="person.videos && person.videos.length > 0">
               <h3 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">In Action</h3>
               <div class="grid grid-cols-1 gap-8">
                 <div v-for="(videoUrl, index) in person.videos" :key="index" class="aspect-video bg-black rounded-xl overflow-hidden shadow-sm relative group border border-gray-200 dark:border-slate-800">
                   
                   <template v-if="getYoutubeId(videoUrl)">
                     <iframe 
                       class="w-full h-full"
                       :src="`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}?rel=0&modestbranding=1`" 
                       title="YouTube video player" 
                       frameborder="0" 
                       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" 
                       loading="lazy"
                     ></iframe>
                   </template>

                   <div v-else class="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                     <svg class="w-8 h-8 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>
                     <span class="text-xs font-bold uppercase tracking-wider">Video Unavailable</span>
                   </div>

                 </div>
               </div>
            </section>

            <section v-if="person.stack && person.stack.length > 0">
               <h3 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Expertise</h3>
               <div class="flex flex-wrap gap-3">
                  <NuxtLink 
                    v-for="tech in person.stack" 
                    :key="tech.name" 
                    :to="`/solutions/${toSolutionSlug(tech.name)}`"
                    class="group flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg hover:border-black dark:hover:border-white hover:shadow-sm transition-all"
                  >
                     <span class="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white">{{ tech.name }}</span>
                     <span class="text-[10px] text-gray-400 dark:text-gray-500 uppercase group-hover:text-gray-600 dark:group-hover:text-gray-400">{{ tech.category }}</span>
                  </NuxtLink>
               </div>
            </section>

            <section v-if="person.articles && person.articles.length > 0">
              <h3 class="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">Recent Writing</h3>
              <div class="space-y-4">
                 <NuxtLink 
                   v-for="article in person.articles" 
                   :key="article.slug" 
                   :to="`/stories/${article.slug}`" 
                   class="block group p-6 border border-gray-200 dark:border-slate-800 rounded-xl hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-sm transition-all bg-white dark:bg-slate-900"
                 >
                    <div class="flex items-center gap-2 mb-2">
                       <span class="text-[10px] font-bold uppercase bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded">{{ article.category }}</span>
                       <span class="text-xs text-gray-400 dark:text-gray-500" v-if="article.date">{{ formatDate(article.date) }}</span>
                    </div>
                    <h4 class="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                       {{ article.title }}
                    </h4>
                 </NuxtLink>
              </div>
            </section>

          </div>

          <div class="lg:col-span-4 space-y-12">
             
             <div class="p-6 border-t border-gray-100 dark:border-slate-800">
                <NuxtLink to="/people" class="flex items-center gap-3 group cursor-pointer hover:opacity-70 transition-opacity">
                   <div class="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white">
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                   </div>
                   <div>
                      <p class="text-xs font-bold text-gray-900 dark:text-white">Explore Directory</p>
                      <p class="text-[10px] text-gray-500 dark:text-gray-400">Find more experts</p>
                   </div>
                </NuxtLink>
             </div>

          </div>

        </div>
      </div>

    </div>
  </div>
  <AppFooter/>
</template>