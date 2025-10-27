<template>
  <div class="bg-slate-950 text-white min-h-screen py-16 md:py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-8">
      <h1 class="font-heading text-4xl md:text-5xl mb-12">All Articles</h1>

      <div v-if="loading" class="text-center text-gray-400">
        <p class="font-heading text-2xl">Loading articles...</p>
      </div>
      
      <div v-else-if="error" class="text-center text-red-400">
        <p class="font-heading text-2xl">Could not load articles.</p>
        <p class="font-ibm-plex-mono">{{ error.message }}</p>
      </div>

      <div v-else-if="posts.length === 0" class="text-center text-gray-400 border-2 border-dashed border-gray-700 rounded-lg p-12">
        <p class="font-heading text-xl mb-2">No posts found.</p>
        <p class="font-ibm-plex-mono">Check back later for new articles.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article 
          v-for="post in posts" 
          :key="post.slug"
          class="flex flex-col"
        >
          <div class="relative mb-4 overflow-hidden rounded bg-gray-800 h-48">
            <NuxtLink :to="`/blog/${post.slug}`">
              <NuxtImg 
                :src="post.image_url || '/img/bdl.png'" 
                :alt="post.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                sizes="sm:100vw md:50vw lg:33vw"
                format="webp"
                quality="80"
              />
            </NuxtLink>
          </div>
          
          <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-yellow-500">
            <h3 class="text-lg font-heading font-bold mb-2 text-white leading-tight line-clamp-3">
              {{ post.title }}
            </h3>
          </NuxtLink>
          
          <p class="text-gray-300 text-sm mb-4 flex-grow line-clamp-2">
            {{ post.description }}
          </p>
          
          <div class="flex items-center gap-2 text-xs text-gray-400 mt-auto">
            <span class="font-ibm-plex-mono">{{ formatDate(post.created_at) }}</span>
            <span class="px-2 py-1 bg-slate-900 rounded text-xs font-ibm-plex-mono font-bold text-yellow-400 border border-gray-700">
              {{ post.tag }}
            </span>
          </div>
        </article>
      </div>
      
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

// Set SEO for the page
useHead({
  title: 'All Articles',
  meta: [
    { name: 'description', content: 'Browse all articles from Orderly Problem Solvers.' }
  ]
})

// Helper function for formatting dates
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`
}

// Fetch ALL published posts, ordered by most recent
const { data: posts, pending: loading, error } = await useAsyncData(
  'all-blog-posts',
  async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('title, slug, description, image_url, created_at, tag')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(error.message)
    return data
  },
  {
    default: () => []
  }
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@700;800;900&display=swap');

.font-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
}
.font-ibm-plex-mono {
  font-family: 'IBM Plex Mono', monospace;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>