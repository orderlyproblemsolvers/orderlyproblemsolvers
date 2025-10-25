<template>
  <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-950 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="i in 3" 
        :key="i"
        class="absolute rounded-full blur-3xl animate-float"
        :style="{
          width: `${300 + i * 50}px`,
          height: `${300 + i * 50}px`,
          background: gradients[i - 1],
          opacity: 0.06,
          left: `${i * 25}%`,
          top: `${i % 2 === 0 ? '10%' : '60%'}`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${12 + i}s`
        }"
      ></div>
    </div>

    <div class="max-w-7xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12 md:mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
          Meet The <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Team</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-400 font-ibm-plex-mono max-w-3xl mx-auto">
          The minds behind the solutions. Passionate problem solvers dedicated to bringing order to complexity.
        </p>
      </div>

      <!-- Team Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        <div
          v-for="(member, index) in team"
          :key="member.id"
          @mouseenter="hoveredMember = member.id"
          @mouseleave="hoveredMember = null"
          class="group flex flex-col items-center text-center"
        >
          <!-- Circular Avatar Container -->
          <div class="relative mb-6">
            <!-- Colored Ring -->
            <div 
              class="absolute inset-0 rounded-full transition-all duration-500 group-hover:scale-110"
              :style="{ 
                background: `conic-gradient(from 0deg, ${memberGradients[index]}, transparent, ${memberGradients[index]})`,
                padding: '4px'
              }"
            >
              <div class="w-full h-full rounded-full bg-slate-950"></div>
            </div>

            <!-- Avatar Image -->
            <div class="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-slate-950">
              <img 
                :src="member.image" 
                :alt="member.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <!-- Overlay on Hover -->
              <div 
                class="absolute inset-0 transition-opacity duration-500 flex items-center justify-center"
                :class="hoveredMember === member.id ? 'opacity-100' : 'opacity-0'"
                :style="{ background: `${memberGradients[index]}CC` }"
              >
                <div class="text-white">
                  <p class="font-ibm-plex-mono text-sm mb-3">Connect with me</p>
                  <div class="flex gap-3 justify-center">
                    <a 
                      href="#" 
                      class="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      class="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      aria-label="Twitter"
                    >
                      <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      class="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 hover:scale-110"
                      aria-label="Email"
                    >
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Member Info -->
          <div class="space-y-2">
            <h3 class="text-xl md:text-2xl font-heading font-bold text-white transition-colors duration-300 group-hover:text-yellow-400">
              {{ member.name }}
            </h3>
            <p 
              class="text-sm md:text-base font-ibm-plex-mono font-bold transition-colors duration-300"
              :style="{ color: memberGradients[index] }"
            >
              {{ member.role }}
            </p>
            <p class="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto pt-2">
              {{ member.bio }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-16">
        <JoinUs/>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const hoveredMember = ref(null)

const gradients = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  'linear-gradient(135deg, #06b6d4, #0891b2)'
]

const memberGradients = [
  '#f59e0b', // Yellow for CEO
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#10b981'  // Emerald
]

const team = [
  {
    id: 1,
    name: 'Inikori Efe',
    role: 'Founder',
    image: '/img/team/efe.png',
    bio: 'Visionary leader driving OPS mission to simplify complexity through intelligent systems.'
  },
  {
    id: 2,
    name: 'Anita Olaleye',
    role: 'Founding Member',
    image: '/img/team/anita.jpg',
    bio: 'Passionate problem solver dedicated to creating user-centered solutions that drive impact.'
  },
  {
    id: 3,
    name: 'Antony Idiata',
    role: 'Founding Member',
    image: '/img/team/anton.jpg',
    bio: 'Technical expert committed to building scalable systems that transform operations.'
  },
  {
    id: 4,
    name: 'Marvella Nwaka',
    role: 'Founding Member',
    image: '/img/team/marvella.jpg',
    bio: 'Creative thinker focused on designing elegant solutions that bridge ideas and execution.'
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

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-float {
  animation: float infinite ease-in-out;
}
</style>