<template>
  <section
    class="relative w-full h-[80dvh] md:h-screen lg:h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black"
  >
    <!-- Animated Grid Background -->
    <div class="absolute inset-0">
      <!-- Grid lines with SVG -->
      <svg class="w-full h-full opacity-10" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="url(#gridGradient)" stroke-width="0.5"/>
          </pattern>
          <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#facc15" />
            <stop offset="100%" stop-color="#60a5fa" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      <!-- Gradient mesh overlays -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div 
        class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 text-center">
      <h1
        class="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 md:mb-8 font-heading bg-gradient-to-r from-yellow-300 via-yellow-100 to-blue-300 bg-clip-text text-transparent p-4"
      >
        We Are Agents Of Change
      </h1>

      <p
        class="text-base sm:text-lg md:text-xl text-gray-300 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-ibm-plex-mono"
      >
        We create cutting-edge digital solutions that empower startups, and small
        to medium-sized companies to achieve their business goals.
      </p>

      <button
        class="px-7 py-3 sm:px-8 sm:py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl font-ibm-plex-mono text-base sm:text-lg"
      >
        Start Your Journey
      </button>
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