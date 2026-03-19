<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

// ── FETCH ────────────────────────────────────────────────────────
const { data: company, error, status } = await useFetch(`/api/companies/${slug}`)
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Company not found', fatal: true })
}

// ── SIMILAR COMPANIES (lazy — fetched after mount) ───────────────
const similarCompanies = ref<any[]>([])
const similarStatus = ref<'idle' | 'loading' | 'done'>('idle')

onMounted(async () => {
  if (!company.value?.industry) return
  similarStatus.value = 'loading'
  try {
    const res = await $fetch<any[]>('/api/companies', {
      query: { industry: company.value.industry, exclude: slug, limit: 3 },
    })
    similarCompanies.value = Array.isArray(res) ? res : (res as any).companies ?? []
  } catch {
    // non-critical — silent fail
  } finally {
    similarStatus.value = 'done'
  }
})

// ── COLOR MODE ───────────────────────────────────────────────────
const colorMode = useColorMode()

// ── RENDERED DESCRIPTION ─────────────────────────────────────────
const renderedDescription = computed(() => {
  const html = company.value?.description
  if (!html) return ''
  const base = html.includes('<') ? html : `<p>${html}</p>`
  return base
    .replace(/\bcolor\s*:[^;}"']+;?/gi, '')
    .replace(/<table/gi, '<div class="table-scroll"><table')
    .replace(/<\/table>/gi, '</table></div>')
    .replace(/<(h[23])([^>]*)>(.*?)<\/h[23]>/gi, (_, tag, attrs, inner) => {
      const id = inner.replace(/<[^>]+>/g, '').trim()
        .toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-')
      return `<${tag}${attrs} id="${id}">${inner}</${tag}>`
    })
})

// ── READ MORE ────────────────────────────────────────────────────
const isExpanded = ref(false)
const COLLAPSE_HEIGHT = 420

const wordCount = computed(() => {
  if (!company.value?.description) return 0
  return company.value.description.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
})
const readTime = computed(() => Math.max(1, Math.ceil(wordCount.value / 200)))
const isLongContent = computed(() => wordCount.value > 300)

// ── TABLE OF CONTENTS ────────────────────────────────────────────
interface TocItem { id: string; text: string; level: number }
const tableOfContents = computed((): TocItem[] => {
  const html = company.value?.description
  if (!html) return []
  const items: TocItem[] = []
  const regex = /<(h[23])[^>]*>(.*?)<\/h[23]>/gi
  let match
  while ((match = regex.exec(html)) !== null) {
    const level = match[1] === 'h2' ? 2 : 3
    const text = match[2].replace(/<[^>]+>/g, '').trim()
    const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-')
    if (text) items.push({ id, text, level })
  }
  return items
})

function scrollToHeading(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ── STACK CHART ──────────────────────────────────────────────────
interface StackCategory { category: string; items: string[]; color: string }

const CATEGORY_COLORS: Record<string, string> = {
  'Payments': '#00A9F4', 'Infrastructure': '#6366f1', 'AI / ML': '#8b5cf6',
  'Frontend': '#f59e0b', 'Backend': '#10b981', 'Database': '#ef4444',
  'DevOps': '#f97316', 'Security': '#ec4899', 'Analytics': '#14b8a6',
  'Communication': '#3b82f6', 'General': '#9ca3af',
}
const FALLBACK_COLORS = ['#00A9F4','#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#f97316']

const stackByCategory = computed((): StackCategory[] => {
  const stack = company.value?.stack
  if (!stack?.length) return []
  const map: Record<string, string[]> = {}
  for (const item of stack) {
    const cat = item.category || 'General'
    if (!map[cat]) map[cat] = []
    map[cat].push(item.name)
  }
  return Object.entries(map).map(([category, items], i) => ({
    category,
    items,
    color: CATEGORY_COLORS[category] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length],
  }))
})

const maxCategoryCount = computed(() =>
  Math.max(...stackByCategory.value.map(c => c.items.length), 1)
)

// ── SHARE ────────────────────────────────────────────────────────
const copyState = ref<'idle' | 'copied'>('idle')
async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
  } catch {
    const el = document.createElement('input')
    el.value = window.location.href
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }
  copyState.value = 'copied'
  setTimeout(() => { copyState.value = 'idle' }, 2200)
}

// ── MISC HELPERS ─────────────────────────────────────────────────
const logoUrl = computed(() =>
  company.value?.logo?.startsWith('http') ? company.value.logo : null
)
const fallbackInitial = computed(() => company.value?.name?.charAt(0) || 'C')
const formatDate = (d: string | Date | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'
const toSolutionSlug = (n: string) => n.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
const getYoutubeId = (url: string) =>
  url?.match(/(?:youtu\.be\/|v\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]{11})/)?.[1] ?? null

// ── SEO ──────────────────────────────────────────────────────────
useSeoMeta({
  title: () => `${company.value?.name} - Verified`,
  description: () => company.value?.headline || `Learn about ${company.value?.name}`,
  ogTitle: () => company.value?.name,
  ogDescription: () => company.value?.headline,
  ogImage: () => company.value?.logo,
  twitterCard: 'summary_large_image',
})
useJsonld(() => ({
  '@context': 'https://schema.org', '@type': 'Organization',
  name: company.value?.name, description: company.value?.description,
  url: company.value?.website, logo: company.value?.logo,
  address: { '@type': 'PostalAddress', addressLocality: company.value?.location },
  industry: company.value?.industry,
}))
defineOgImageComponent('OpsTemplate', {
  title: company.value?.name,
  description: company.value?.headline || `Verified ${company.value?.industry} Solution`,
  image: company.value?.logo, type: 'Company', badge: company.value?.industry,
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">

    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div class="w-16 h-16 border-t-2 border-[#00A9F4] rounded-full animate-spin" />
        <span class="text-xs font-bold uppercase tracking-widest text-gray-400">Loading Intelligence...</span>
      </div>
    </div>

    <div v-else-if="company">

      <!-- ── HERO ──────────────────────────────────────────────── -->
      <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A253A]">
        <div class="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12">
          <div class="flex flex-col md:flex-row items-start gap-10">

            <div class="shrink-0 w-32 h-32 bg-white dark:bg-black border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg">
              <img v-if="logoUrl" :src="logoUrl" class="w-24 h-24 object-contain" :alt="company.name" />
              <span v-else class="text-5xl font-serif font-black text-gray-300 dark:text-gray-700">{{ fallbackInitial }}</span>
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-4 mb-4 text-xs font-bold uppercase tracking-widest">
                <span class="text-[#00A9F4]">{{ company.industry }}</span>
                <span class="text-gray-300 dark:text-gray-600">/</span>
                <span class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  {{ company.stage }}
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500" />
                </span>
              </div>
              <h1 class="text-5xl md:text-7xl font-serif text-[#051C2C] dark:text-white mb-6 leading-[0.9]">
                {{ company.name }}
              </h1>
              <p class="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {{ company.headline }}
              </p>
            </div>

            <!-- Hero actions -->
            <div class="mt-4 md:mt-0 flex flex-col gap-3 shrink-0">
              <a
                v-if="company.website"
                :href="company.website"
                target="_blank"
                class="group flex items-center gap-3 px-6 py-4 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:bg-[#00A9F4] dark:hover:bg-[#00A9F4] hover:text-white dark:hover:text-white transition-all duration-300 shadow-xl"
              >
                Visit Site
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <!-- SHARE -->
              <button type="button" class="share-btn" :class="{ 'share-btn--copied': copyState === 'copied' }" @click="copyLink">
                <Transition name="share-icon" mode="out-in">
                  <svg v-if="copyState === 'idle'" key="share" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <svg v-else key="check" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </Transition>
                <span>{{ copyState === 'copied' ? 'Copied!' : 'Share' }}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <!-- ── STATS BAR ─────────────────────────────────────────── -->
      <div class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#051C2C]">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200 dark:divide-gray-800 border-x border-gray-200 dark:border-gray-800">
            <div class="p-6">
              <span class="block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">HQ Location</span>
              <span class="font-mono text-lg text-[#051C2C] dark:text-white">{{ company.location }}</span>
            </div>
            <div class="p-6">
              <span class="block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Date Added</span>
              <span class="font-mono text-lg text-[#051C2C] dark:text-white">{{ formatDate(company.createdAt) }}</span>
            </div>
            <div class="p-6">
              <span class="block text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Team Size</span>
              <span class="font-mono text-lg text-[#051C2C] dark:text-white">{{ company.team?.length > 0 ? company.team.length : '—' }} Verified</span>
            </div>
            <div class="p-6 flex items-center justify-center bg-gray-50 dark:bg-white/5">
              <span class="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00A9F4]">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Verified Entity
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── BODY ──────────────────────────────────────────────── -->
      <div class="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

          <!-- LEFT COLUMN -->
          <div class="lg:col-span-8 space-y-20 min-w-0">

            <!-- EXECUTIVE SUMMARY + READ MORE -->
            <section>
              <div class="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em]">Executive Summary</h3>
                <span v-if="readTime" class="text-[10px] font-bold uppercase tracking-widest text-gray-400">~{{ readTime }} min read</span>
              </div>

              <div v-if="company.description">
                <div
                  class="description-wrapper"
                  :style="isLongContent && !isExpanded ? `max-height:${COLLAPSE_HEIGHT}px` : ''"
                  :class="{ 'description-wrapper--collapsed': isLongContent && !isExpanded }"
                >
                  <div class="tiptap-content" v-html="renderedDescription" />
                  <div v-if="isLongContent && !isExpanded" class="description-fade" />
                </div>
                <button v-if="isLongContent" type="button" class="read-more-btn" @click="isExpanded = !isExpanded">
                  <span>{{ isExpanded ? 'Collapse' : 'Read full profile' }}</span>
                  <svg class="w-3.5 h-3.5 transition-transform duration-300" :class="{ 'rotate-180': isExpanded }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <p v-else class="text-gray-400 italic font-serif text-lg">No summary provided.</p>
            </section>

            <!-- TECH STACK + CHART -->
            <section v-if="company.stack && company.stack.length > 0">
              <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                Technology Infrastructure
              </h3>

              <!-- Stack chart -->
              <div class="stack-chart mb-8">
                <p class="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">By Category</p>
                <div v-for="cat in stackByCategory" :key="cat.category" class="stack-chart-row">
                  <div class="stack-chart-label">
                    <span class="stack-chart-dot" :style="{ background: cat.color }" />
                    <span class="stack-chart-cat">{{ cat.category }}</span>
                    <span class="stack-chart-count">{{ cat.items.length }}</span>
                  </div>
                  <div class="stack-chart-track">
                    <div class="stack-chart-bar" :style="{ width: `${(cat.items.length / maxCategoryCount) * 100}%`, background: cat.color }" />
                  </div>
                  <div class="stack-chart-pills">
                    <span v-for="item in cat.items" :key="item" class="stack-pill" :style="{ borderColor: cat.color + '55', color: cat.color }">
                      {{ item }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Flat chips -->
              <div class="flex flex-wrap gap-3">
                <NuxtLink
                  v-for="tech in company.stack"
                  :key="tech.name"
                  :to="`/solutions/${toSolutionSlug(tech.name)}`"
                  class="group flex items-center gap-3 px-4 py-2 border border-gray-200 dark:border-gray-700 hover:border-[#00A9F4] dark:hover:border-[#00A9F4] transition-colors bg-white dark:bg-transparent"
                >
                  <span class="text-sm font-mono font-bold text-[#051C2C] dark:text-white">{{ tech.name }}</span>
                  <span class="w-px h-3 bg-gray-300 dark:bg-gray-700" />
                  <span class="text-[10px] text-gray-400 uppercase tracking-wider group-hover:text-[#00A9F4]">{{ tech.category }}</span>
                </NuxtLink>
              </div>
            </section>

            <!-- SIMILAR COMPANIES -->
            <section>
              <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                Similar Entities
              </h3>

              <!-- Skeleton -->
              <div v-if="similarStatus === 'loading'" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="i in 3" :key="i" class="similar-skeleton" />
              </div>

              <!-- Results -->
              <div v-else-if="similarCompanies.length > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <NuxtLink v-for="c in similarCompanies" :key="c.slug" :to="`/companies/${c.slug}`" class="similar-card group">
                  <div class="similar-card-logo">
                    <img v-if="c.logo && c.logo.startsWith('http')" :src="c.logo" :alt="c.name" class="w-8 h-8 object-contain" />
                    <span v-else class="text-xl font-serif font-black text-gray-300 dark:text-gray-600">{{ c.name?.charAt(0) }}</span>
                  </div>
                  <p class="text-sm font-bold font-serif text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors mb-1 leading-tight">{{ c.name }}</p>
                  <p class="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{{ c.headline }}</p>
                  <div class="flex items-center gap-2 mt-3">
                    <span class="text-[9px] font-bold uppercase tracking-widest text-[#00A9F4]">{{ c.industry }}</span>
                    <span class="text-gray-300 dark:text-gray-700">·</span>
                    <span class="text-[9px] font-bold uppercase tracking-widest text-gray-400">{{ c.stage }}</span>
                  </div>
                </NuxtLink>
              </div>

              <p v-else-if="similarStatus === 'done'" class="text-sm text-gray-400 italic">
                No similar entities found in the index yet.
              </p>
            </section>

          </div>

          <!-- RIGHT COLUMN -->
          <div class="lg:col-span-4 space-y-16">

            <!-- Leadership -->
            <section>
              <div class="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">
                <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em]">Leadership</h3>
                <NuxtLink to="/people" class="text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-[#051C2C] dark:hover:text-white transition-colors">Directory &rarr;</NuxtLink>
              </div>
              <div v-if="company.team && company.team.length > 0" class="flex flex-col">
                <NuxtLink v-for="person in company.team" :key="person.slug" :to="`/people/${person.slug}`" class="group flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <img :src="person.image || `https://ui-avatars.com/api/?name=${person.name}&background=051C2C&color=fff`" class="w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-300 object-cover border border-gray-200 dark:border-gray-700" />
                  <div>
                    <p class="text-sm font-bold font-serif text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors mb-0.5">{{ person.name }}</p>
                    <p class="text-xs text-gray-500 uppercase tracking-wider">{{ person.role }}</p>
                  </div>
                </NuxtLink>
              </div>
              <div v-else class="border border-dashed border-gray-200 dark:border-gray-700 p-6 text-center space-y-3">
                <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">No verified members yet</p>
                <p class="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">Are you part of this team? Submit your profile to be listed here.</p>
                <NuxtLink to="/submit-solution" class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#00A9F4] hover:underline">Submit profile &rarr;</NuxtLink>
              </div>
            </section>

            <!-- Videos -->
            <section>
              <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">Media Assets</h3>
              <div v-if="company.videos && company.videos.length > 0" class="flex flex-col gap-6">
                <div v-for="(videoUrl, index) in company.videos" :key="index" class="w-full aspect-video bg-black border border-gray-800 relative group">
                  <template v-if="getYoutubeId(videoUrl)">
                    <ClientOnly>
                      <iframe
                        class="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                        :src="`https://www.youtube.com/embed/${getYoutubeId(videoUrl)}?rel=0&modestbranding=1`"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen
                      />
                    </ClientOnly>
                  </template>
                  <div v-else class="w-full h-full flex items-center justify-center text-gray-600">
                    <span class="text-xs font-mono uppercase">Asset Unavailable</span>
                  </div>
                </div>
              </div>
              <div v-else class="border border-dashed border-gray-200 dark:border-gray-700 p-6 text-center space-y-3">
                <div class="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mx-auto">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.845v6.31a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                </div>
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">No media assets yet</p>
                <p class="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">Product demos and pitch recordings will appear here.</p>
              </div>
            </section>

            <!-- TOC -->
            <section v-if="tableOfContents.length > 0">
              <h3 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-8 border-b border-gray-200 dark:border-gray-800 pb-2">Contents</h3>
              <nav class="flex flex-col">
                <button
                  v-for="item in tableOfContents" :key="item.id"
                  type="button" class="toc-item" :class="item.level === 3 ? 'toc-item--sub' : ''"
                  @click="scrollToHeading(item.id)"
                >
                  <span class="toc-marker" />
                  <span class="toc-text">{{ item.text }}</span>
                </button>
              </nav>
            </section>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* ── Share ──────────────────────────────────────────────────── */
.share-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.75rem 1.25rem; font-size: 0.75rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.1em;
  border: 1px solid #e5e7eb; color: #374151; background: white; cursor: pointer;
  transition: all 0.2s;
}
.share-btn:hover { border-color: #00A9F4; color: #00A9F4; }
.share-btn--copied { border-color: #10b981 !important; color: #10b981 !important; }
html.dark .share-btn { background: transparent; color: #9ca3af; border-color: #374151; }
html.dark .share-btn:hover { border-color: #00A9F4; color: #00A9F4; }
.share-icon-enter-active, .share-icon-leave-active { transition: all 0.15s; }
.share-icon-enter-from, .share-icon-leave-to { opacity: 0; transform: scale(0.7); }

/* ── Read more ──────────────────────────────────────────────── */
.description-wrapper { position: relative; overflow: hidden; transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1); }
.description-fade {
  position: absolute; bottom: 0; left: 0; right: 0; height: 140px;
  background: linear-gradient(to bottom, transparent, white); pointer-events: none;
}
html.dark .description-fade { background: linear-gradient(to bottom, transparent, #051C2C); }
.read-more-btn {
  display: inline-flex; align-items: center; gap: 0.4rem; margin-top: 1.25rem;
  font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
  color: #00A9F4; background: none; border: none; cursor: pointer; padding: 0; transition: opacity 0.15s;
}
.read-more-btn:hover { opacity: 0.75; }

/* ── Stack chart ────────────────────────────────────────────── */
.stack-chart {
  padding: 1.25rem; border: 1px solid #e5e7eb; background: #f9fafb;
  display: flex; flex-direction: column; gap: 1rem;
}
html.dark .stack-chart { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.07); }
.stack-chart-row { display: flex; flex-direction: column; gap: 0.375rem; }
.stack-chart-label { display: flex; align-items: center; gap: 0.5rem; }
.stack-chart-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.stack-chart-cat { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #374151; }
html.dark .stack-chart-cat { color: #d1d5db; }
.stack-chart-count { margin-left: auto; font-size: 0.65rem; font-weight: 700; font-family: monospace; color: #9ca3af; }
.stack-chart-track { width: 100%; height: 4px; background: rgba(0,0,0,0.07); border-radius: 2px; overflow: hidden; }
html.dark .stack-chart-track { background: rgba(255,255,255,0.07); }
.stack-chart-bar { height: 100%; border-radius: 2px; transition: width 0.8s cubic-bezier(0.4,0,0.2,1); }
.stack-chart-pills { display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.125rem; }
.stack-pill { font-size: 0.65rem; font-weight: 600; font-family: monospace; padding: 0.1rem 0.4rem; border: 1px solid; border-radius: 2px; line-height: 1.6; }

/* ── Similar companies ──────────────────────────────────────── */
.similar-card {
  display: flex; flex-direction: column; padding: 1.125rem;
  border: 1px solid #e5e7eb; background: white; transition: border-color 0.2s, box-shadow 0.2s;
}
html.dark .similar-card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.08); }
.similar-card:hover { border-color: #00A9F4; box-shadow: 0 4px 16px -4px rgba(0,169,244,0.15); }
.similar-card-logo {
  width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center;
  border: 1px solid #e5e7eb; margin-bottom: 0.75rem; background: white;
}
html.dark .similar-card-logo { background: rgba(0,0,0,0.3); border-color: rgba(255,255,255,0.1); }
.similar-skeleton {
  height: 140px; border: 1px solid #e5e7eb;
  background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
  background-size: 200% 100%; animation: shimmer 1.4s infinite;
}
html.dark .similar-skeleton {
  border-color: rgba(255,255,255,0.06);
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 75%);
  background-size: 200% 100%;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* ── TOC ────────────────────────────────────────────────────── */
.toc-item {
  display: flex; align-items: flex-start; gap: 0.625rem; width: 100%; padding: 0.5rem 0;
  background: transparent; border: none; text-align: left; cursor: pointer; transition: color 0.15s; color: #6b7280;
}
.toc-item:hover { color: #051C2C; }
html.dark .toc-item:hover { color: #f9fafb; }
.toc-item:hover .toc-marker { background: #00A9F4; transform: scaleY(1.4); }
.toc-item--sub { padding-left: 1rem; }
.toc-marker { flex-shrink: 0; width: 2px; height: 1rem; margin-top: 2px; background: #e5e7eb; border-radius: 1px; transition: background 0.15s, transform 0.15s; }
html.dark .toc-marker { background: #374151; }
.toc-text { font-size: 0.8125rem; font-family: serif; line-height: 1.4; }
.toc-item--sub .toc-text { font-size: 0.75rem; font-family: sans-serif; }

/* ── TipTap content ─────────────────────────────────────────── */
:deep(.tiptap-content) { font-size: 1.125rem; line-height: 1.85; color: inherit; min-width: 0; word-break: break-word; }
:deep(.tiptap-content p) { margin-bottom: 1.25rem; }
:deep(.tiptap-content p:last-child) { margin-bottom: 0; }
:deep(.tiptap-content h2) {
  font-family: serif; font-size: 1.75rem; font-weight: 700; color: inherit;
  margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.2;
  text-decoration: underline; text-decoration-color: #00A9F4; text-underline-offset: 6px; text-decoration-thickness: 2px;
  scroll-margin-top: 6rem;
}
:deep(.tiptap-content h3) {
  font-family: serif; font-size: 1.35rem; font-weight: 700; color: inherit;
  margin-top: 2rem; margin-bottom: 0.75rem; line-height: 1.3; scroll-margin-top: 6rem;
}
:deep(.tiptap-content strong) { font-weight: 700; color: inherit; }
:deep(.tiptap-content em) { font-style: italic; }
:deep(.tiptap-content u) { text-decoration: underline; text-underline-offset: 3px; }
:deep(.tiptap-content a) { color: #00A9F4; text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 4px; transition: color 0.15s; }
:deep(.tiptap-content a:hover) { color: #0284c7; }
:deep(.tiptap-content ul) { list-style-type: square; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem; }
:deep(.tiptap-content ol) { list-style-type: decimal; padding-left: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem; }
:deep(.tiptap-content li) { padding-left: 0.25rem; }
:deep(.tiptap-content ul li::marker) { color: #00A9F4; }
:deep(.tiptap-content ol li::marker) { color: #00A9F4; font-weight: 700; }
:deep(.tiptap-content blockquote) {
  border-left: 2px solid #00A9F4; padding-left: 1.5rem; font-family: serif;
  font-style: italic; font-size: 1.2rem; color: inherit; opacity: 0.75; margin: 2rem 0;
}
:deep(.tiptap-content code) { font-family: ui-monospace, monospace; font-size: 0.875em; background: rgba(0,0,0,0.06); color: inherit; padding: 0.15em 0.4em; border-radius: 0.25rem; }
:deep(.tiptap-content pre) { background: #0d0d0d; color: #f8f8f2; font-family: ui-monospace, monospace; font-size: 0.875rem; padding: 1rem 1.25rem; border-radius: 0.5rem; margin: 1.5rem 0; overflow-x: auto; }
:deep(.tiptap-content pre code) { background: none; color: inherit; padding: 0; border-radius: 0; }
:deep(.tiptap-content img) { display: block; width: 100%; border-radius: 0; margin: 2rem 0; border: 1px solid rgba(0,0,0,0.1); }
:deep(.tiptap-content .table-scroll) { display: block; width: 100%; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 1.5rem 0; contain: inline-size; }
:deep(.tiptap-content .table-scroll table) { border-collapse: collapse; font-size: 0.9375rem; table-layout: auto; margin: 0; min-width: 100%; }
:deep(.tiptap-content th), :deep(.tiptap-content td) { border: 1px solid rgba(128,128,128,0.25); padding: 0.625rem 0.875rem; text-align: left; vertical-align: top; background: transparent; color: inherit; min-width: 80px; max-width: 320px; }
:deep(.tiptap-content th) { font-weight: 700; font-size: 0.8125rem; text-transform: uppercase; letter-spacing: 0.04em; background: rgba(0,169,244,0.08); color: inherit; white-space: nowrap; }
:deep(.tiptap-content tr:nth-child(even) td) { background: rgba(0,0,0,0.03); }
:deep(.tiptap-content .iframe-wrapper), :deep(.tiptap-content div[data-iframe-wrapper]) { position: relative; width: 100%; padding-top: 56.25%; margin: 1.5rem 0; background: #000; overflow: hidden; }
:deep(.tiptap-content .iframe-wrapper iframe), :deep(.tiptap-content div[data-iframe-wrapper] iframe) { position: absolute; inset: 0; width: 100%; height: 100%; border: none; }
:deep(.tiptap-content hr) { border: none; border-top: 1px solid rgba(128,128,128,0.2); margin: 2rem 0; }
html.dark :deep(.tiptap-content code) { background: rgba(255,255,255,0.08); }
html.dark :deep(.tiptap-content img) { border-color: rgba(255,255,255,0.1); }
html.dark :deep(.tiptap-content tr:nth-child(even) td) { background: rgba(255,255,255,0.03); }
html.dark :deep(.tiptap-content th) { background: rgba(0,169,244,0.12); }
</style>