<template>
  <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-950">
    <div class="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
      <!-- Section Header -->
      <div class="mb-12 pb-6 border-b-2 border-gray-700">
        <h2 class="text-sm md:text-md font-ibm-plex-mono font-bold text-yellow-300 tracking-wide">
          RESEARCH
        </h2>
      </div>

      <!-- Research Items -->
      <div class="space-y-8">
        <article 
          v-for="(item, index) in researchItems" 
          :key="index"
          class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start pb-8"
          :class="{ 'border-b border-gray-700': index !== researchItems.length - 1 }"
        >
          <!-- Left Column: Date -->
          <div class="md:col-span-1">
            <p class="text-xs md:text-sm text-gray-400 font-ibm-plex-mono">{{ item.date }}</p>
          </div>

          <!-- Middle Column: Content -->
          <div class="md:col-span-1">
            <h3 class="text-base md:text-lg font-heading font-bold text-white mb-2 leading-tight">
              {{ item.title }}
            </h3>
            <p class="text-gray-300 text-xs md:text-sm leading-relaxed">
              {{ item.description }}
            </p>
          </div>

          <!-- Right Column: Image -->
          <div class="md:col-span-1">
            <div class="overflow-hidden rounded bg-gray-800">
              <NuxtImg 
                :src="item.image" 
                :alt="item.title"
                class="w-full h-32 md:h-40 object-cover"
                sizes="sm:100vw md:25vw"
                format="webp"
                quality="80"
              />
            </div>
          </div>
        </article>
      </div>

      <!-- CTA Button -->
      <div class="flex justify-center mt-12">
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
interface ResearchItem {
  date: string
  title: string
  description: string
  image: string
}

const researchItems: ResearchItem[] = [
  {
    date: '1 day ago',
    title: 'I spend hours responding to \'AI\' jewellery customers',
    description: 'Stevie Holmes\'s legitimate company is being mistaken for a dubious website populated with AI images.',
    image: '/img/bdl.png'
  },
  {
    date: '1 day ago',
    title: 'Technology heading for Mars is created in Surrey',
    description: 'Founded in 1966, the laboratory sits in a Victorian mansion in 30 acres in the Surrey Hills.',
    image: '/img/bdl.png'
  },
  {
    date: '1 day ago',
    title: 'Grand Theft Auto made him a legend. His latest game was a disaster',
    description: 'Lesley Benzies was one of the architects behind one of the most successful video games in history.',
    image: '/img/bdl.png'
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
</style>