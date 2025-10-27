<template>
  <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-950">
    <div class="max-w-7xl mx-auto">
      
      <div v-if="loading" class="text-center text-white">
        <p class="font-heading text-2xl">Loading latest articles...</p>
      </div>

      <div v-else-if="error" class="text-center text-red-400">
        <p class="font-heading text-2xl">Could not load articles.</p>
        <p class="font-ibm-plex-mono">{{ error.message }}</p>
      </div>
      
      <div v-else-if="featuredPost">
        <div class="mb-12">
          <article class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div class="lg:col-span-2">
              <NuxtLink :to="`/blog/${featuredPost.slug}`">
                <NuxtImg 
                  :src="featuredPost.image_url || '/img/bdl.png'" 
                  :alt="featuredPost.title"
                  class="w-full h-64 md:h-96 object-cover rounded-lg bg-slate-800"
                  sizes="sm:100vw md:66vw lg:66vw"
                  format="webp"
                  quality="80"
                />
              </NuxtLink>
            </div>
            
            <div class="flex flex-col justify-between">
              <div>
                <NuxtLink :to="`/blog/${featuredPost.slug}`" class="hover:text-yellow-500">
                  <h2 class="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight text-white">
                    {{ featuredPost.title }}
                  </h2>
                </NuxtLink>
                <p class="text-gray-300 mb-4 text-base leading-relaxed line-clamp-3">
                  {{ featuredPost.description }}
                </p>
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-400">
                <span class="font-ibm-plex-mono">{{ formatDate(featuredPost.created_at) }}</span>
                <span class="px-3 py-1 bg-slate-900 rounded text-xs font-ibm-plex-mono font-bold text-yellow-400 border border-gray-700">
                  {{ featuredPost.tag }}
                </span>
              </div>
            </div>
          </article>
        </div>

        <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-8">
          <article 
            v-for="post in gridPosts" 
            :key="post.slug"
            class="flex flex-col md:flex-col gap-4 md:gap-0"
          >
            <div class="flex gap-4 md:hidden">
              <div class="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded bg-gray-800">
                <NuxtLink :to="`/blog/${post.slug}`">
                  <NuxtImg 
                    :src="post.image_url || '/img/bdl.png'" 
                    :alt="post.title"
                    class="w-full h-full object-cover"
                    sizes="100px"
                    format="webp"
                    quality="80"
                  />
                </NuxtLink>
              </div>
              
              <div class="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-yellow-500">
                    <h3 class="text-sm font-heading font-bold text-white leading-tight line-clamp-2">
                      {{ post.title }}
                    </h3>
                  </NuxtLink>
                </div>
                
                <div class="flex items-center gap-2 text-xs text-gray-400 mt-2">
                  <span class="font-ibm-plex-mono">{{ formatDate(post.created_at) }}</span>
                  <span class="px-2 py-0.5 bg-slate-900 rounded text-xs font-ibm-plex-mono font-bold text-yellow-400 border border-gray-700">
                    {{ post.tag }}
                  </span>
                </div>
              </div>
            </div>

            <div class="hidden md:flex md:flex-col">
              <div class="relative mb-4 overflow-hidden rounded bg-gray-800 h-48">
                <NuxtLink :to="`/blog/${post.slug}`">
                  <NuxtImg 
                    :src="post.image_url || '/img/bdl.png'" 
                    :alt="post.title"
                    class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    sizes="sm:100vw md:50vw lg:25vw"
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
            </div>
          </article>
        </div>

        <div class="flex justify-center">
          <NuxtLink 
            to="/blog"
            class="px-8 py-4 bg-white text-black font-heading font-bold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base md:text-lg"
          >
            View All Articles
          </NuxtLink>
        </div>
      </div>
      
      <div v-else class="text-center text-gray-400">
         <p class="font-heading text-2xl">No posts found.</p>
         <p class="font-ibm-plex-mono">Check back later for new articles.</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const supabase = useSupabaseClient()

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}, ${date.getFullYear()}`
}

const { data: posts, pending: loading, error } = await useAsyncData(
  'home-blog-posts',
  async () => {
    const { data, error } = await supabase
      .from('posts')
      // FIXED: Selecting description instead of excerpt
      .select('title, slug, description, image_url, created_at, tag')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(5)
    
    if (error) throw new Error(error.message)
    return data
  },
  {
    default: () => []
  }
)

const featuredPost = computed(() => (posts.value && posts.value.length > 0) ? posts.value[0] : null)
const gridPosts = computed(() => (posts.value && posts.value.length > 1) ? posts.value.slice(1, 5) : [])
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