<template>
  <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-950">
    <div class="max-w-7xl mx-auto">
      <!-- Main Featured Article -->
      <div class="mb-12">
        <article class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <!-- Featured Image -->
          <div class="lg:col-span-2">
            <NuxtImg 
              src="/img/bdl.png" 
              alt="Featured article"
              class="w-full h-64 md:h-96 object-cover rounded-lg"
              sizes="sm:100vw md:66vw lg:66vw"
              format="webp"
              quality="80"
            />
          </div>
          
          <!-- Featured Content -->
          <div class="flex flex-col justify-between">
            <div>
              <NuxtLink class="hover:text-yellow-500" to="#"><h2 class="text-2xl md:text-3xl font-heading font-bold mb-4 leading-tight text-white">
                {{ featured.title }}
              </h2></NuxtLink>
              <p class="text-gray-300 mb-4 text-base leading-relaxed">
                {{ featured.excerpt }}
              </p>
            </div>
            <div class="flex items-center gap-3 text-sm text-gray-400">
              <span class="font-ibm-plex-mono">{{ featured.date }}</span>
              <span class="px-3 py-1 bg-slate-900 rounded text-xs font-ibm-plex-mono font-bold text-yellow-400 border border-gray-700">{{ featured.category }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- Grid Articles -->
      <div class="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 mb-8">
        <article 
          v-for="(post, index) in gridPosts" 
          :key="index"
          class="flex flex-col md:flex-col gap-4 md:gap-0"
        >
          <!-- Mobile Layout: Side by Side -->
          <div class="flex gap-4 md:hidden">
            <div class="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded bg-gray-800">
              <NuxtImg 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover"
                sizes="100px"
                format="webp"
                quality="80"
              />
              <div v-if="post.hasVideo" class="absolute inset-0 flex items-center justify-center">
                <div class="bg-black bg-opacity-60 rounded-full p-1.5">
                  <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <NuxtLink class="hover:text-yellow-500" to="#"><h3 class="text-sm font-heading font-bold text-white leading-tight line-clamp-2">
                  {{ post.title }}
                </h3></NuxtLink>
              </div>
              
              <div class="flex items-center gap-2 text-xs text-gray-400 mt-2">
                <span class="font-ibm-plex-mono">{{ post.date }}</span>
                <span class="px-2 py-0.5 bg-slate-900 rounded text-xs font-ibm-plex-mono font-bold text-yellow-400 border border-gray-700">{{ post.category }}</span>
              </div>
            </div>
          </div>

          <!-- Desktop Layout: Standard Grid -->
          <div class="hidden md:flex md:flex-col">
            <div class="relative mb-4 overflow-hidden rounded bg-gray-800 h-48">
              <NuxtImg 
                :src="post.image" 
                :alt="post.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                sizes="sm:100vw md:50vw lg:25vw"
                format="webp"
                quality="80"
              />
              <div v-if="post.hasVideo" class="absolute inset-0 flex items-center justify-center">
                <div class="bg-black bg-opacity-50 rounded-full p-3">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <NuxtLink class="hover:text-yellow-500" to="#"><h3 class="text-lg font-heading font-bold mb-2 text-white leading-tight line-clamp-3">
              {{ post.title }}
            </h3></NuxtLink>
            
            <p class="text-gray-300 text-sm mb-4 flex-grow line-clamp-2">
              {{ post.excerpt }}
            </p>
            
            <div class="flex items-center gap-2 text-xs text-gray-400 mt-auto">
              <span class="font-ibm-plex-mono">{{ post.date }}</span>
              <span class="px-2 py-1 bg-slate-900 rounded text-xs font-ibm-plex-mono font-bold text-yellow-400 border border-gray-700">{{ post.category }}</span>
            </div>
          </div>
        </article>
      </div>

      <!-- CTA Button -->
      <div class="flex justify-center">
        <button 
          class="px-8 py-4 bg-white text-black font-heading font-bold rounded-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-base md:text-lg"
        >
          View All Articles
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface BlogPost {
  title: string
  excerpt: string
  image: string
  date: string
  category: string
  hasVideo?: boolean
}

const featured: BlogPost = {
  title: 'Your toothbrush is bristling with bacteria',
  excerpt: 'Bacteria from our toilets, the cold sore virus and thrush-causing yeast can thrive on our toothbrushes. But there are ways to keep your toothbrush a little cleaner.',
  image: '/img/bdl.png',
  date: '11 hrs ago',
  category: 'Future'
}

const gridPosts: BlogPost[] = [
  {
    title: 'The race to unlock nature\'s hidden secrets',
    excerpt: 'A team of researchers is working on an ambitious project to build the world\'s largest biological database.',
    image: '/img/bdl.png',
    date: '2 days ago',
    category: 'Science',
    hasVideo: true
  },
  {
    title: 'Chinese Nobel laureate and physicist Chen Ning Yang dies aged 103',
    excerpt: 'Yang, one of the world\'s most influential scientists, earned global recognition for his work in theoretical physics.',
    image: '/img/bdl.png',
    date: '1 day ago',
    category: 'News'
  },
  {
    title: 'How good is the battery in a used electric vehicle?',
    excerpt: 'Companies are offering tech they say can accurately test the health of batteries in used EVs.',
    image: '/img/bdl.png',
    date: '3 days ago',
    category: 'Technology'
  },
  {
    title: 'The wonder material that could transform solar',
    excerpt: 'Some say advances in perovskite solar cells mean we are on the brink of the next solar energy revolution.',
    image: '/img/bdl.png',
    date: '3 days ago',
    category: 'Future'
  }
]
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