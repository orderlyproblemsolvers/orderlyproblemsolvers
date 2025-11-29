<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const slug = route.params.slug as string

// 1. FETCH REAL DATA
// Calls: server/api/companies/[slug].get.ts
// Expects return: { ...company, team: [], stories: [], stack: [] }
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

// Convert "Vue.js" -> "vue-js" for the URL linking
const toSolutionSlug = (name: string) => {
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
}
// 3. FOLLOW LOGIC (Local Storage)
const isFollowing = ref(false)

onMounted(() => {
  if (import.meta.client) {
    // Check if user already follows this company
    const followed = localStorage.getItem(`ops-follow-${slug}`)
    if (followed) isFollowing.value = true
  }
})

const toggleFollow = () => {
  isFollowing.value = !isFollowing.value
  
  if (import.meta.client) {
    if (isFollowing.value) {
      localStorage.setItem(`ops-follow-${slug}`, 'true')
    } else {
      localStorage.removeItem(`ops-follow-${slug}`)
    }
  }
}


useSeoMeta({
  title: () => `${company.value?.name} - Verified`,
  description: () => company.value?.headline || `Learn about ${company.value?.name}, a ${company.value?.industry} company in ${company.value?.location}.`,
  // Open Graph (Facebook, WhatsApp, LinkedIn)
  ogTitle: () => company.value?.name,
  ogDescription: () => company.value?.headline,
  ogImage: () => company.value?.logo, // Ensure this is a full URL (http...)
  ogType: 'profile',
  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: () => company.value?.name,
  twitterDescription: () => company.value?.headline,
  twitterImage: () => company.value?.logo,
})

// 2. JSON-LD (Structured Data for Google)
useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.value?.name,
  description: company.value?.description,
  url: company.value?.website,
  logo: company.value?.logo,
  address: {
    '@type': 'PostalAddress',
    addressLocality: company.value?.location
  },
  industry: company.value?.industry
}))

defineOgImageComponent('OpsTemplate', {
  title: company.value?.name,
  description: company.value?.headline || `Verified ${company.value?.industry} Solution`,
  image: company.value?.logo, // Passes the logo URL to the bottom-right or center depending on layout
  type: 'Company',
  badge: company.value?.industry // e.g. "FinTech"
})
</script>

<template>
   <AppHeader/>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    
    <!-- LOADING STATE -->
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
    </div>

    <div v-else-if="company">
      
      <!-- 1. HEADER HERO -->
      <div class="relative bg-gray-900 text-white pt-32 pb-16 overflow-hidden">
         <!-- Background Texture -->
         <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-500 to-transparent"></div>
         
         <div class="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row items-start gap-8">
               
               <!-- Logo Block -->
               <div class="w-24 h-24 rounded-2xl bg-white flex items-center justify-center text-4xl font-black text-gray-900 shadow-2xl overflow-hidden shrink-0">
                  <img v-if="logoUrl" :src="logoUrl" class="w-full h-full object-cover" alt="Company Logo" />
                  <span v-else>{{ fallbackInitial }}</span>
               </div>

               <div class="flex-1">
                  <div class="flex items-center gap-4 mb-4 flex-wrap">
                     <h1 class="text-4xl md:text-5xl font-black tracking-tight">{{ company.name }}</h1>
                     <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest">{{ company.industry }}</span>
                     <span class="px-3 py-1 bg-blue-600 rounded-full text-xs font-bold uppercase tracking-widest">{{ company.stage }}</span>
                  </div>
                  <p class="text-xl text-gray-300 max-w-2xl leading-relaxed">
                     {{ company.headline || 'Building the future of ' + company.industry }}
                  </p>
               </div>

               <!-- Actions -->
               <div class="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <a v-if="company.website" :href="company.website" target="_blank" class="px-6 py-3 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors text-center flex items-center justify-center gap-2">
                     Visit Website
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                  </a>
                  <button 
                    @click="toggleFollow"
                    class="px-6 py-3 border text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-sm"
                    :class="isFollowing 
                      ? 'bg-green-600 border-green-600 text-white hover:bg-green-700' 
                      : 'border-white/20 text-white hover:bg-white/10'"
                  >
                     <svg v-if="isFollowing" class="w-4 h-4 animate-in zoom-in duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                     <span v-if="isFollowing">Following</span>
                     <span v-else>Follow Updates</span>
                  </button>
               </div>
            </div>
         </div>
      </div>

      <!-- 2. STATS BAR -->
      <div class="border-b border-gray-200 bg-gray-50">
         <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-wrap divide-x divide-gray-200">
               <div class="px-8 py-6 flex-1 text-center md:text-left">
                  <p class="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Location</p>
                  <p class="text-lg font-black text-gray-900">{{ company.location }}</p>
               </div>
               <div class="px-8 py-6 flex-1 text-center md:text-left">
                  <p class="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Added On</p>
                  <p class="text-lg font-black text-gray-900">{{ formatDate(company.createdAt) }}</p>
               </div>
               <div class="px-8 py-6 flex-1 text-center md:text-left">
                  <p class="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Team Size</p>
                  <p class="text-lg font-black text-gray-900">{{ company.team?.length > 0 ? company.team.length + '+' : 'N/A' }}</p>
               </div>
            </div>
         </div>
      </div>

      <!-- 3. MAIN CONTENT -->
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         <div class="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <!-- LEFT: DETAILS (Span 8) -->
            <div class="lg:col-span-8 space-y-16">
               
               <!-- About -->
               <section>
                  <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">The Solution</h3>
                  <div 
                    class="prose prose-gray max-w-none text-gray-900 leading-relaxed prose-headings:font-bold prose-a:text-blue-600" 
                    v-if="company.description"
                    v-html="company.description.includes('<') ? company.description : `<p>${company.description}</p>`"
                  ></div>
                  <p v-else class="text-gray-500 italic">No description provided.</p>
               </section>

               <!-- TECH STACK (Dynamic) -->
               <section v-if="company.stack && company.stack.length > 0">
                  <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Tech Stack</h3>
                  <div class="flex flex-wrap gap-3">
                     <NuxtLink 
                       v-for="tech in company.stack" 
                       :key="tech.name" 
                       :to="`/solutions/${toSolutionSlug(tech.name)}`"
                       class="group flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-black hover:shadow-sm transition-all"
                     >
                        <span class="text-sm font-bold text-gray-700 group-hover:text-black">{{ tech.name }}</span>
                        <span class="text-[10px] text-gray-400 uppercase group-hover:text-gray-600">{{ tech.category }}</span>
                     </NuxtLink>
                  </div>
               </section>
               <section v-else>
                  <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Tech Stack</h3>
                  <p class="text-sm text-gray-400 italic">No technologies listed yet.</p>
               </section>

            </div>

            <!-- RIGHT: PEOPLE & META (Span 4) -->
            <div class="lg:col-span-4 space-y-12">
               
               <!-- Key People -->
               <div class="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm">
                  <div class="flex items-center justify-between mb-6">
                     <h3 class="text-xs font-black text-gray-900 uppercase tracking-widest">Team</h3>
                     <NuxtLink to="/people" class="text-xs text-blue-600 font-bold hover:underline">View Directory</NuxtLink>
                  </div>
                  
                  <div v-if="company.team && company.team.length > 0" class="space-y-4">
                     <NuxtLink 
                        v-for="person in company.team" 
                        :key="person.slug" 
                        :to="`/people/${person.slug}`" 
                        class="flex items-center gap-3 group cursor-pointer"
                     >
                        <img :src="person.image || `https://ui-avatars.com/api/?name=${person.name}&background=random`" class="w-10 h-10 rounded-full object-cover border border-gray-100" />
                        <div>
                           <p class="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{{ person.name }}</p>
                           <p class="text-xs text-gray-500">{{ person.role }}</p>
                        </div>
                     </NuxtLink>
                  </div>
                  <div v-else class="text-center py-6">
                     <p class="text-xs text-gray-400">No verified team members linked yet.</p>
                  </div>
               </div>

               <!-- Related News -->
               <div v-if="company.stories && company.stories.length > 0">
                  <h3 class="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">In The Journal</h3>
                  <div class="space-y-4">
                     <NuxtLink v-for="story in company.stories" :key="story.slug" :to="`/stories/${story.slug}`" class="block group p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-colors bg-gray-50">
                        <h4 class="text-sm font-bold text-gray-900 group-hover:text-blue-600 leading-snug mb-1">
                           {{ story.title }}
                        </h4>
                        <span class="text-xs text-gray-400">{{ story.category }} • {{ formatDate(story.date) }}</span>
                     </NuxtLink>
                  </div>
               </div>

            </div>

         </div>
      </div>

    </div>
  </div>
  <AppFooter/>
</template>