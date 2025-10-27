<template>
  <div >
    <div v-if="loading" class="bg-slate-950 text-white min-h-screen flex items-center justify-center">
      <p class="font-heading text-2xl">Loading article...</p>
    </div>

    <article v-else-if="post" class="bg-slate-950 text-white py-16 md:py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-8">
        
        <div class="mb-8">
          <button 
            @click="goBack" 
            class="flex items-center gap-2 text-gray-400 hover:text-white font-ibm-plex-mono text-sm transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to articles
          </button>
        </div>

        <header class="mb-8">
          <span class="font-ibm-plex-mono font-bold text-yellow-400 mb-2 block">
            {{ post.tag }}
          </span>
          <h1 class="font-heading text-4xl md:text-5xl my-4 leading-tight">
            {{ post.title }}
          </h1>

          <div class="flex items-center gap-3 mt-6 text-gray-300">
            <div v-if="post.writers" class="flex-shrink-0">
              <p class="font-bold text-white">{{ post.writers.name }}</p>
            </div>
            <span v-if="post.writers" class="text-gray-500">&bull;</span>
            <p class="text-sm font-ibm-plex-mono">{{ formatDate(post.created_at) }}</p>
          </div>
        </header>
      </div>

      <div v-if="post.image_url" class="max-w-5xl mx-auto mb-12 px-4 sm:px-8">
        <div class="aspect-video w-full overflow-hidden rounded-lg bg-slate-800">
          <NuxtImg 
            :src="post.image_url" 
            :alt="post.title" 
            class="w-full h-full object-cover"
            sizes="sm:100vw md:100vw lg:1024px"
            format="webp"
            quality="85"
          />
        </div>
      </div>

      <div class="max-w-3xl mx-auto px-4 sm:px-8">
        <div 
          class="prose prose-invert prose-lg lg:prose-xl prose-p:text-gray-300 prose-headings:font-heading prose-headings:text-white prose-a:text-yellow-400 hover:prose-a:text-yellow-300 prose-strong:text-white"
          v-html="post.content"
        >
        </div>
      </div>
    </article>

    <section v-if="relatedPosts && relatedPosts.length > 0" class="pb-16 md:pb-24 lg:pb-32 bg-slate-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-8">
        <h2 class="font-heading text-3xl text-white mb-8">See Also</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article 
            v-for="related in relatedPosts" 
            :key="related.slug"
            class="flex flex-col"
          >
            <div class="relative mb-4 overflow-hidden rounded bg-gray-800 h-48">
              <NuxtLink :to="`/blog/${related.slug}`">
                <NuxtImg 
                  :src="related.image_url || '/img/bdl.png'" 
                  :alt="related.title"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  sizes="sm:100vw md:50vw lg:33vw"
                  format="webp"
                  quality="80"
                />
              </NuxtLink>
            </div>

            
            <NuxtLink :to="`/blog/${related.slug}`" class="hover:text-yellow-500">
              <h3 class="text-lg font-heading font-bold mb-2 text-white leading-tight line-clamp-3">
                {{ related.title }}
              </h3>
            </NuxtLink>

            
            <p class="text-gray-300 text-sm mb-4 flex-grow line-clamp-2">
              {{ related.description }}
            </p>
            
            <div class="flex items-center gap-2 text-xs text-gray-400 mt-auto">
              <span class="font-ibm-plex-mono">{{ formatDate(related.created_at) }}</span>
              <span class="px-2 py-1 bg-slate-900 rounded text-xs font-ibm-plex-mono font-bold text-yellow-400 border border-gray-700">
                {{ related.tag }}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const router = useRouter()
const slug = route.params.slug

// Back button functionality
const goBack = () => {
  router.push('/blog')
}

// Date formatting helper
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 1. Fetch the main post
const { data: post, pending: loading, error } = await useAsyncData(
  `post-${slug}`,
  async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('title, slug, content, description, image_url, created_at, tag, writers ( name )')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error || !data) {
      throw createError({ statusCode: 404, statusMessage: 'Post Not Found' })
    }
    return data
  }
)

// Handle 404 error
if (error.value && !post.value) {
  showError({ statusCode: 404, statusMessage: 'Post Not Found' })
}

// 2. Fetch related posts (only if the main post loaded)
const { data: relatedPosts } = await useAsyncData(
  `related-posts-${slug}`,
  async () => {
    // Only run this fetch if the main post exists
    if (!post.value) return []

    const { data, error } = await supabase
      .from('posts')
      .select('title, slug, description, image_url, created_at, tag')
      .eq('status', 'published')
      .eq('tag', post.value.tag) // Find posts with the same tag
      .neq('slug', slug)         // Exclude the current post
      .order('created_at', { ascending: false })
      .limit(3)                 // Get up to 3 related posts

    if (error) {
      console.error('Error fetching related posts:', error)
      return []
    }
    return data
  },
  {
    watch: [post] // This ensures this fetch runs once 'post' data is available
  }
)

// 3. Set SEO meta tags
if (post.value) {
  useHead({
    title: post.value.title,
    meta: [
      { name: 'description', content: post.value.description },
      { property: 'og:title', content: post.value.title },
      { property: 'og:description', content: post.value.description },
      { property: 'og:image', content: post.value.image_url },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]
  })
}
</script>

<style>
/* Styles from previous component */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@700;800;900&display=swap');

.font-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.font-ibm-plex-mono {
  font-family: 'IBM Plex Mono', monospace;
}
.prose {
  max-width: none;
}
.prose h2 {
  margin-top: 2em;
  margin-bottom: 1em;
}
.prose p {
  margin-bottom: 1.25em;
}
.prose img {
  border-radius: 0.5rem; /* rounded-lg */
}
</style>