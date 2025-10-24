<template>
  <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-950 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="i in 6" 
        :key="i"
        class="absolute rounded-full blur-3xl animate-float"
        :class="`float-${i}`"
        :style="{
          width: `${200 + i * 50}px`,
          height: `${200 + i * 50}px`,
          background: gradients[i - 1],
          opacity: 0.1,
          left: `${i * 15}%`,
          top: `${i % 2 === 0 ? '10%' : '60%'}`,
          animationDelay: `${i * 0.5}s`,
          animationDuration: `${8 + i}s`
        }"
      ></div>
    </div>

    <div class="max-w-6xl mx-auto relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 md:mb-24">
        <h2 class="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
          Why Pay for<br class="md:hidden" />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 animate-gradient">
            Custom Software?
          </span>
        </h2>
        <p class="text-lg md:text-xl text-gray-400 font-ibm-plex-mono">
          Because expertise still matters in the AI era
        </p>
      </div>

      <!-- Reasons List with Visual Elements -->
      <div class="space-y-8 md:space-y-12">
        <div
          v-for="(reason, index) in reasons"
          :key="reason.id"
          class="group relative"
          @mouseenter="activeReason = reason.id"
          @mouseleave="activeReason = null"
        >
          <div class="flex items-center gap-6 md:gap-12">
            <!-- Animated Number -->
            <div class="flex-shrink-0 relative">
              <div 
                class="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 flex items-center justify-center transition-all duration-500 relative overflow-hidden"
                :class="activeReason === reason.id ? 'border-yellow-400 scale-110' : 'border-gray-700'"
                :style="{ background: activeReason === reason.id ? `${reason.gradient}20` : 'transparent' }"
              >
                <!-- Rotating gradient background on hover -->
                <div 
                  class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  :style="{ background: `conic-gradient(from ${index * 60}deg, ${reason.gradient}, transparent, ${reason.gradient})` }"
                ></div>
                
                <span 
                  class="text-4xl md:text-5xl font-heading font-bold relative z-10 transition-colors duration-500"
                  :class="activeReason === reason.id ? 'text-yellow-400' : 'text-gray-600'"
                >
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
              </div>
              
              <!-- Pulse ring effect -->
              <div 
                v-if="activeReason === reason.id"
                class="absolute inset-0 rounded-full border-2 border-yellow-400 animate-ping"
              ></div>
            </div>

            <!-- Text Content -->
            <div class="flex-1">
              <h3 
                class="text-2xl md:text-4xl lg:text-5xl font-heading font-bold transition-all duration-500 leading-tight"
                :class="activeReason === reason.id ? 'text-white translate-x-2' : 'text-gray-400'"
              >
                {{ reason.title }}
              </h3>
              
              <!-- Animated underline -->
              <div 
                class="h-1 mt-3 rounded-full transition-all duration-500"
                :style="{
                  width: activeReason === reason.id ? '100%' : '0%',
                  background: reason.gradient
                }"
              ></div>
            </div>

            <!-- Icon -->
            <div class="hidden lg:block flex-shrink-0">
              <div 
                class="w-16 h-16 transition-all duration-500 transform"
                :class="activeReason === reason.id ? 'scale-110 rotate-12' : 'scale-100 rotate-0'"
              >
                <component 
                  :is="reason.icon" 
                  class="w-full h-full transition-colors duration-500"
                  :class="activeReason === reason.id ? 'text-yellow-400' : 'text-gray-700'"
                />
              </div>
            </div>
          </div>

          <!-- Connecting line -->
          <div 
            v-if="index < reasons.length - 1"
            class="ml-10 md:ml-14 mt-6 md:mt-8 mb-0 h-8 md:h-12 w-0.5 bg-gradient-to-b from-gray-700 to-transparent"
          ></div>
        </div>
      </div>

      <!-- Bottom Decorative Stats -->
      <div class="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="stat.label"
          class="text-center group cursor-pointer"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="relative inline-block mb-3">
            <div class="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br transition-all duration-500 group-hover:scale-110"
              :style="{ backgroundImage: `linear-gradient(135deg, ${stat.color1}, ${stat.color2})` }"
            >
              {{ stat.value }}
            </div>
            <!-- Glow effect -->
            <div 
              class="absolute inset-0 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"
              :style="{ background: `linear-gradient(135deg, ${stat.color1}, ${stat.color2})` }"
            ></div>
          </div>
          <div class="text-sm md:text-base text-gray-500 font-ibm-plex-mono">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeReason = ref(null)

const gradients = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  'linear-gradient(135deg, #06b6d4, #0891b2)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #ef4444, #dc2626)',
  'linear-gradient(135deg, #ec4899, #db2777)'
]

const reasons = [
  {
    id: 1,
    title: 'Expertise AI Can\'t Replace',
    icon: 'BrainIcon',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
  },
  {
    id: 2,
    title: 'Battle-Tested Solutions',
    icon: 'ShieldIcon',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
  },
  {
    id: 3,
    title: 'Speed Through Experience',
    icon: 'ZapIcon',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)'
  },
  {
    id: 4,
    title: 'Someone Answers at 3 AM',
    icon: 'PhoneIcon',
    gradient: 'linear-gradient(135deg, #10b981, #059669)'
  },
  {
    id: 5,
    title: 'Built to Scale',
    icon: 'RocketIcon',
    gradient: 'linear-gradient(135deg, #ef4444, #dc2626)'
  },
  {
    id: 6,
    title: 'Quality That Lasts',
    icon: 'DiamondIcon',
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)'
  }
]

const stats = [
  { value: '10x', label: 'Faster', color1: '#f59e0b', color2: '#d97706' },
  { value: '24/7', label: 'Support', color1: '#06b6d4', color2: '#0891b2' },
  { value: '100%', label: 'Reliable', color1: '#10b981', color2: '#059669' },
  { value: '∞', label: 'Scalable', color1: '#ec4899', color2: '#db2777' }
]

// Icon Components
const BrainIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>`
}

const ShieldIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>`
}

const ZapIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>`
}

const PhoneIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>`
}

const RocketIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>`
}

const DiamondIcon = {
  template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>`
}
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

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}
</style>