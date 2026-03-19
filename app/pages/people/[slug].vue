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

const getYoutubeId = (url: string) => {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// 4. THE "REVERSE HACK" + RENDERING FIXES
const socialLinks = computed(() => {
  const html = person.value?.bio || ''
  const links = { linkedin: '', github: '' }
  
  const socialsMatch = html.match(/<br><br><p><strong>Socials:<\/strong>(.*?)<\/p>/)
  if (socialsMatch) {
    const block = socialsMatch[1]
    const liMatch = block.match(/href="([^"]+)"[^>]*>LinkedIn/)
    const ghMatch = block.match(/href="([^"]+)"[^>]*>GitHub/)
    
    if (liMatch) links.linkedin = liMatch[1]
    if (ghMatch) links.github = ghMatch[1]
  }
  return links
})

const cleanBio = computed(() => {
  const rawHtml = person.value?.bio || ''
  if (!rawHtml) return ''

  // A. Strip out the appended socials block
  let processed = rawHtml.replace(/<br><br><p><strong>Socials:<\/strong>.*?<\/p>/, '')

  // B. Plain text fallback (wrap in <p> if no tags exist)
  const base = processed.includes('<') ? processed : `<p>${processed}</p>`

  // C. Apply Rendering Fixes
  return base
    .replace(/\bcolor\s*:[^;}"']+;?/gi, '') // Strip inline colors (Dark Mode fix)
    .replace(/<table/gi, '<div class="table-scroll"><table') // Responsive table fix
    .replace(/<\/table>/gi, '</table></div>')
})

// 5. BUTTON ACTIONS
const openEmail = () => {
  if (person.value?.email) window.location.href = `mailto:${person.value.email}`
}

const openWebsite = () => {
  if (person.value?.website) window.open(person.value.website, '_blank')
}

// 6. SEO & STRUCTURED DATA
useSeoMeta({
  title: () => `${person.value?.name} - ${person.value?.role}`,
  description: () => cleanBio.value.replace(/<[^>]+>/g, '').substring(0, 160) || `View the professional profile of ${person.value?.name}.`,
  ogTitle: () => `${person.value?.name} | OPS Index`,
  ogDescription: () => cleanBio.value.replace(/<[^>]+>/g, '').substring(0, 160),
  ogImage: () => person.value?.avatar,
  ogType: 'profile',
  twitterCard: 'summary',
})

useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.value?.name,
  description: cleanBio.value.replace(/<[^>]+>/g, ''),
  jobTitle: person.value?.role,
  worksFor: person.value?.companyName ? { '@type': 'Organization', name: person.value?.companyName } : undefined,
  url: person.value?.website,
  image: person.value?.avatar,
  sameAs: [socialLinks.value.linkedin, socialLinks.value.github].filter(Boolean) 
}))

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
                <img :src="avatarUrl" class="w-full h-full object-cover  transition-all duration-700" alt="Profile Picture" />
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
                <NuxtLink v-if="person.companyName" :to="`/companies/${person.companySlug}`" class="text-[#00A9F4] hover:underline decoration-1 underline-offset-4">
                  {{ person.companyName }}
                </NuxtLink>
              </div>

              <div class="flex flex-wrap items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                <button v-if="person.email" @click="openEmail" class="action-btn-primary">Contact</button>
                <button v-if="person.website" @click="openWebsite" class="action-btn-secondary">Website</button>
                
                <a v-if="socialLinks.linkedin" :href="socialLinks.linkedin" target="_blank" class="social-icon-btn"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                <a v-if="socialLinks.github" :href="socialLinks.github" target="_blank" class="social-icon-btn"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div class="lg:col-span-8 space-y-20">
            <section>
              <h3 class="section-heading">Biography</h3>
              <div class="tiptap-content font-serif text-lg text-gray-700 dark:text-gray-300" v-html="cleanBio || '<p class=\'italic text-gray-400\'>No biography provided.</p>'"></div>
            </section>

            <section v-if="person.stack?.length">
               <h3 class="section-heading">Technical Stack</h3>
               <div class="flex flex-wrap gap-3">
                  <NuxtLink v-for="tech in person.stack" :key="tech.name" :to="`/solutions/${toSolutionSlug(tech.name)}`" class="tech-chip">
                     <span class="text-sm font-mono font-bold text-[#051C2C] dark:text-white">{{ tech.name }}</span>
                     <span class="w-px h-3 bg-gray-300 dark:bg-gray-700"></span>
                     <span class="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-[#00A9F4]">{{ tech.category }}</span>
                  </NuxtLink>
               </div>
            </section>

            <section v-if="person.articles?.length">
              <h3 class="section-heading">Published Intelligence</h3>
              <div class="flex flex-col">
                 <NuxtLink v-for="article in person.articles" :key="article.slug" :to="`/stories/${article.slug}`" class="article-row group">
                    <div class="article-date">{{ article.date ? formatDate(article.date) : 'Recent' }}</div>
                    <div>
                       <h4 class="article-title">{{ article.title }}</h4>
                       <span class="article-cat">{{ article.category }}</span>
                    </div>
                 </NuxtLink>
              </div>
            </section>
          </div>

          <div class="lg:col-span-4 space-y-16">
             <section v-if="person.videos?.length">
                <h3 class="section-heading">In Action</h3>
                <div class="flex flex-col gap-8">
                  <div v-for="(videoUrl, index) in person.videos" :key="index" class="video-container group">
                    <template v-if="getYoutubeId(videoUrl)">
                      <ClientOnly>
                         <iframe class="video-iframe grayscale group-hover:grayscale-0" :src="`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}?rel=0&modestbranding=1`" frameborder="0" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" ></iframe>
                      </ClientOnly>
                    </template>
                  </div>
                </div>
             </section>

             <div class="sidebar-promo">
                <h4 class="font-serif text-xl text-[#051C2C] dark:text-white mb-4">Explore the Network</h4>
                <p class="text-sm text-gray-500 mb-6">Discover more verified experts in the OPS directory.</p>
                <NuxtLink to="/people" class="promo-link">View Directory &rarr;</NuxtLink>
             </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* REUSABLE CLASSES */
.section-heading {
  font-size: 0.75rem; font-weight: 700; color: #00A9F4; text-transform: uppercase;
  letter-spacing: 0.2em; margin-bottom: 2rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;
}
html.dark .section-heading { border-color: #1f2937; }

.action-btn-primary {
  display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.5rem; background: #051C2C; color: white;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s;
}
html.dark .action-btn-primary { background: white; color: #051C2C; }
.action-btn-primary:hover { background: #00A9F4; color: white; }

.action-btn-secondary {
  display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 1.5rem; border: 1px solid #d1d5db;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; transition: all 0.3s;
}
html.dark .action-btn-secondary { border-color: #374151; color: white; }
.action-btn-secondary:hover { border-color: #00A9F4; color: #00A9F4; }

.social-icon-btn {
  padding: 0.75rem; border: 1px solid #d1d5db; color: #6b7280; transition: all 0.3s;
}
html.dark .social-icon-btn { border-color: #374151; }
.social-icon-btn:hover { color: #00A9F4; border-color: #00A9F4; }

.tech-chip {
  display: flex; align-items: center; gap: 0.75rem; padding: 0.5rem 1rem; border: 1px solid #e5e7eb; transition: 0.3s;
}
html.dark .tech-chip { border-color: #374151; }
.tech-chip:hover { border-color: #00A9F4; }

.article-row {
  display: flex; flex-direction: column; padding: 1.5rem 0; border-bottom: 1px solid #f3f4f6;
}
@media (min-width: 768px) { .article-row { flex-direction: row; align-items: baseline; gap: 1rem; } }
html.dark .article-row { border-color: #1f2937; }
.article-date { width: 8rem; flex-shrink: 0; font-size: 0.75rem; font-weight: 700; color: #9ca3af; text-transform: uppercase; }
.article-title { font-family: serif; font-size: 1.25rem; color: #051C2C; transition: 0.3s; margin-bottom: 0.5rem; }
html.dark .article-title { color: white; }
.article-row:hover .article-title { color: #00A9F4; }
.article-cat { font-size: 0.625rem; font-weight: 700; color: #9ca3af; border: 1px solid #e5e7eb; padding: 0.125rem 0.5rem; text-transform: uppercase; }

.video-container { width: 100%; aspect-ratio: 16/9; background: black; border: 1px solid #1f2937; overflow: hidden; }
.video-iframe { width: 100%; height: 100%; transition: filter 0.7s; }

.sidebar-promo { padding: 2rem; background: #f9fafb; border: 1px solid #f3f4f6; }
html.dark .sidebar-promo { background: #0A253A; border-color: rgba(255,255,255,0.05); }
.promo-link { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #00A9F4; }

/* TIPTAP RENDERING */
:deep(.tiptap-content) { line-height: 1.8; word-break: break-word; }
:deep(.tiptap-content p) { margin-bottom: 1.5rem; }
:deep(.tiptap-content h2) { font-family: serif; font-size: 1.75rem; margin-top: 2.5rem; margin-bottom: 1rem; color: inherit; text-decoration: underline; text-decoration-color: #00A9F4; text-underline-offset: 6px; }
:deep(.tiptap-content a) { color: #00A9F4; text-decoration: underline; }
:deep(.tiptap-content blockquote) { border-left: 2px solid #00A9F4; padding-left: 1.5rem; font-style: italic; opacity: 0.8; margin: 2rem 0; }
:deep(.tiptap-content .table-scroll) { display: block; width: 100%; overflow-x: auto; margin: 1.5rem 0; border: 1px solid rgba(128,128,128,0.2); }
:deep(.tiptap-content table) { width: 100%; border-collapse: collapse; min-width: 400px; }
:deep(.tiptap-content th), :deep(.tiptap-content td) { border: 1px solid rgba(128,128,128,0.2); padding: 0.75rem; text-align: left; }
:deep(.tiptap-content th) { background: rgba(0, 169, 244, 0.05); }
</style>