<template>
  <section class="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black via-slate-950 to-slate-900 overflow-hidden">
    <!-- Background Grid -->
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" preserveAspectRatio="none">
        <defs>
          <pattern id="gridFeatured" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#gridGradientFeatured)" stroke-width="0.5"/>
          </pattern>
          <linearGradient id="gridGradientFeatured" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#facc15" />
            <stop offset="100%" stop-color="#60a5fa" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridFeatured)" />
      </svg>
    </div>

    <!-- Gradient Blobs -->
    <div class="absolute top-1/4 left-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
    <div 
      class="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse"
      style="animation-delay: 1s"
    ></div>

    <!-- Content Container -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8">
      <!-- Featured Project Header -->
      <div class="flex items-center justify-center gap-4 mb-16 md:mb-20">
        <div class="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-400/50"></div>
        <span class="text-sm font-ibm-plex-mono text-yellow-300 uppercase tracking-widest whitespace-nowrap">Featured Project</span>
        <div class="flex-1 h-px bg-gradient-to-l from-transparent to-blue-400/50"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        
        <!-- Featured Image -->
        <div class="order-2 md:order-1">
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-blue-400/20 rounded-xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/img/bdl.png" 
              alt="Featured project"
              class="relative w-full rounded-xl shadow-2xl object-cover aspect-video md:aspect-auto md:h-[500px] transition-transform duration-300 group-hover:scale-101"
            />
          </div>
        </div>

        <!-- Description & CTA -->
        <div class="order-1 md:order-2 flex flex-col justify-center">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-heading bg-gradient-to-r from-yellow-300 via-yellow-100 to-blue-300 bg-clip-text text-transparent">
            Building Digital Legacy
          </h2>

          <p class="text-base sm:text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed font-ibm-plex-mono">
           We partnered with educational institutions and community organizations to democratize digital skills. Through comprehensive training programs and innovative learning platforms, we empowered thousands of individuals to thrive in the digital economy and close the skills gap.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              class="px-7 py-3 sm:px-8 sm:py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-101 shadow-2xl font-ibm-plex-mono text-base sm:text-lg w-full sm:w-auto"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No changes needed here
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