<template>
  <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-950">
    <div class="max-w-7xl mx-auto">
      <!-- Tab Navigation -->
      <div class="mb-12">
        <div class="flex gap-0 border-b-2 border-gray-700 pb-0 w-fit">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            class="px-6 py-4 font-ibm-plex-mono font-bold text-lg relative transition-all duration-300"
            :class="[
              activeTab === tab
                ? 'text-white bg-slate-900 border-t-2 border-l-2 border-r-2 border-gray-700 border-b-2 border-b-slate-900'
                : 'text-gray-400 hover:text-gray-200'
            ]"
          >
            {{ tab }}
          </button>
        </div>
      </div>

      <!-- Services Tab -->
      <transition name="fade-slide" mode="out-in">
        <div v-if="activeTab === 'Services'" :key="'services'" class="w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div
              v-for="(service, index) in services"
              :key="service.id"
              @mouseenter="hoveredService = service.id"
              @mouseleave="hoveredService = null"
              class="group relative bg-transparent rounded-2xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-500 border border-gray-800 overflow-hidden cursor-pointer"
            >
              <!-- Animated Border -->
              <div 
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                :style="{ 
                  background: `linear-gradient(135deg, ${serviceGradients[index % 6]}, transparent 60%)`, 
                  padding: '2px'
                }"
              >
                <div class="w-full h-full bg-slate-950 rounded-2xl"></div>
              </div>

              <!-- Content -->
              <div class="relative z-10">
                <div class="mb-4 transform group-hover:scale-110 transition-transform duration-500">
                  <div class="w-12 h-12 flex items-center justify-center p-2">
                    <NuxtImg
                      :src="service.icon"
                      :alt="service.title"
                      class="w-full h-full"
                      format="webp"
                      quality="80"
                      loading="lazy"
                    />
                  </div>
                </div>
                
                <h3 class="text-xl md:text-2xl font-heading font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300">
                  {{ service.title }}
                </h3>
                
                <p class="text-gray-300 mb-6 leading-relaxed">
                  {{ service.description }}
                </p>
                
                <div>
                  <h4 class="font-heading font-bold text-sm text-gray-200 mb-3">What You'll Get:</h4>
                  <ul class="space-y-2">
                    <li v-for="item in service.deliverables" :key="item" class="flex items-start gap-2 text-sm text-gray-400">
                      <span class="text-yellow-400 font-bold mt-0.5">✓</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Hover Arrow -->
                <div 
                  class="mt-4 inline-flex items-center gap-2 text-yellow-400 font-ibm-plex-mono font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500"
                  :class="hoveredService === service.id ? 'gap-4' : 'gap-2'"
                >
                  Learn More
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Projects Tab -->
      <transition name="fade-slide" mode="out-in">
        <div v-if="activeTab === 'Projects'" :key="'projects'" class="w-full">
          <section class="w-full py-4 md:py-8 bg-slate-950 relative overflow-hidden">
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
              <div class="text-center mb-8 md:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 leading-tight">
                  Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Work</span>
                </h2>
                <p class="text-base md:text-lg lg:text-xl text-gray-400 font-ibm-plex-mono">
                  Projects we're proud of
                </p>
              </div>

              <!-- Bento Grid Layout -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mb-8 md:mb-12">
                <!-- Large Project - Takes 2 rows, 8 columns on desktop -->
                <div
                  class="md:col-span-8 md:row-span-2 group relative rounded-2xl overflow-hidden cursor-pointer"
                  @mouseenter="hoveredProject = 0"
                  @mouseleave="hoveredProject = null"
                  @click="toggleMobileProject(0)"
                >
                  <div class="relative h-72 sm:h-96 md:h-full md:min-h-[500px] overflow-hidden">
                    <!-- Image -->
                    <NuxtImg
                      :src="projects[0].image"
                      :alt="projects[0].name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      format="webp"
                      quality="80"
                      loading="lazy"
                      sizes="sm:100vw md:66vw lg:66vw"
                    />
                    
                    <!-- Gradient Overlay -->
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    <!-- Animated Border -->
                    <div 
                      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style="background: linear-gradient(135deg, #f59e0b 0%, transparent 50%); padding: 3px; border-radius: 1rem;"
                    >
                      <div class="w-full h-full bg-slate-950 rounded-2xl"></div>
                    </div>

                    <!-- Mobile Click - Link at Top Center -->
                    <div class="md:hidden absolute top-4 left-0 right-0 flex justify-center z-20">
                      <NuxtLink 
                        v-if="mobileActiveProject === 0"
                        to="#"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-ibm-plex-mono font-bold text-xs rounded-full shadow-lg transform scale-100 animate-bounce-once"
                        @click.stop
                      >
                        Visit Site
                        <span>→</span>
                      </NuxtLink>
                    </div>

                    <!-- Content Overlay -->
                    <div class="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10">
                      <div class="transform transition-all duration-500" :class="hoveredProject === 0 ? 'translate-y-0' : 'translate-y-4'">
                        <div class="mb-3 md:mb-4 opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
                          <span class="px-3 md:px-4 py-1.5 md:py-2 bg-yellow-400 text-black font-ibm-plex-mono font-bold text-xs rounded-full">
                            FEATURED
                          </span>
                        </div>
                        
                        <h3 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-3 md:mb-4 opacity-0 md:group-hover:opacity-100 transition-all duration-500 delay-200">
                          {{ projects[0].name }}
                        </h3>
                        
                        <NuxtLink 
                          to="#"
                          class="hidden md:inline-flex items-center gap-3 px-5 md:px-6 py-2.5 md:py-3 bg-white text-black font-ibm-plex-mono font-bold text-sm md:text-base rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 hover:bg-yellow-400 hover:gap-5"
                        >
                          Visit Site
                          <span class="text-base md:text-lg">→</span>
                        </NuxtLink>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Small Project 1 - Top Right -->
                <div
                  class="md:col-span-4 group relative rounded-2xl overflow-hidden cursor-pointer"
                  @mouseenter="hoveredProject = 1"
                  @mouseleave="hoveredProject = null"
                  @click="toggleMobileProject(1)"
                >
                  <div class="relative h-64 sm:h-72 md:h-full overflow-hidden">
                    <NuxtImg
                      :src="projects[1].image"
                      :alt="projects[1].name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      format="webp"
                      quality="80"
                      loading="lazy"
                      sizes="sm:100vw md:33vw lg:33vw"
                    />
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    <!-- Animated Border (Purple) -->
                    <div 
                      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style="background: linear-gradient(135deg, #8b5cf6 0%, transparent 50%); padding: 3px; border-radius: 1rem;"
                    >
                      <div class="w-full h-full bg-slate-950 rounded-2xl"></div>
                    </div>

                    <!-- Mobile Click - Link at Top Center -->
                    <div class="md:hidden absolute top-4 left-0 right-0 flex justify-center z-20">
                      <NuxtLink 
                        v-if="mobileActiveProject === 1"
                        to="#"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white font-ibm-plex-mono font-bold text-xs rounded-full shadow-lg transform scale-100 animate-bounce-once"
                        @click.stop
                      >
                        Visit Site
                        <span>→</span>
                      </NuxtLink>
                    </div>

                    <div class="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-10">
                      <h3 class="text-lg sm:text-xl md:text-2xl font-heading font-bold text-white mb-2 md:mb-3 opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                        {{ projects[1].name }}
                      </h3>
                      
                      <NuxtLink 
                        to="#"
                        class="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-ibm-plex-mono font-bold text-xs md:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 hover:bg-purple-500 hover:text-white hover:gap-4 w-fit"
                      >
                        Visit Site
                        <span>→</span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>

                <!-- Small Project 2 - Bottom Right -->
                <div
                  class="md:col-span-4 group relative rounded-2xl overflow-hidden cursor-pointer"
                  @mouseenter="hoveredProject = 2"
                  @mouseleave="hoveredProject = null"
                  @click="toggleMobileProject(2)"
                >
                  <div class="relative h-64 sm:h-72 md:h-full overflow-hidden">
                    <NuxtImg
                      :src="projects[2].image"
                      :alt="projects[2].name"
                      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      format="webp"
                      quality="80"
                      loading="lazy"
                      sizes="sm:100vw md:33vw lg:33vw"
                    />
                    
                    <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                    
                    <!-- Animated Border (Cyan) -->
                    <div 
                      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style="background: linear-gradient(135deg, #06b6d4 0%, transparent 50%); padding: 3px; border-radius: 1rem;"
                    >
                      <div class="w-full h-full bg-slate-950 rounded-2xl"></div>
                    </div>

                    <!-- Mobile Click - Link at Top Center -->
                    <div class="md:hidden absolute top-4 left-0 right-0 flex justify-center z-20">
                      <NuxtLink 
                        v-if="mobileActiveProject === 2"
                        to="#"
                        class="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white font-ibm-plex-mono font-bold text-xs rounded-full shadow-lg transform scale-100 animate-bounce-once"
                        @click.stop
                      >
                        Visit Site
                        <span>→</span>
                      </NuxtLink>
                    </div>

                    <div class="absolute inset-0 flex flex-col justify-end p-5 md:p-6 z-10">
                      <h3 class="text-lg sm:text-xl md:text-2xl font-heading font-bold text-white mb-2 md:mb-3 opacity-0 md:group-hover:opacity-100 transition-all duration-500">
                        {{ projects[2].name }}
                      </h3>
                      
                      <NuxtLink 
                        to="#"
                        class="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-white text-black font-ibm-plex-mono font-bold text-xs md:text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 hover:bg-cyan-500 hover:text-white hover:gap-4 w-fit"
                      >
                        Visit Site
                        <span>→</span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CTA Button -->
              <div class="flex justify-center">
                <NuxtLink 
                  to="#"
                  class="group relative px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-heading font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-sm md:text-base lg:text-lg overflow-hidden"
                >
                  <span class="relative z-10">View All Projects</span>
                  
                  <!-- Animated background -->
                  <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </NuxtLink>
              </div>
            </div>
          </section>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('Services')
const tabs = ['Services', 'Projects']
const hoveredService = ref(null)
const hoveredProject = ref(null)
const mobileActiveProject = ref(null)

const toggleMobileProject = (id) => {
  if (mobileActiveProject.value === id) {
    mobileActiveProject.value = null
  } else {
    mobileActiveProject.value = id
  }
}

const serviceGradients = [
  '#f59e0b',
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
  '#ef4444',
  '#ec4899'
]

const services = [
  {
    id: 1,
    icon: '/icons/ui.svg',
    title: 'UI/UX Design',
    description: 'Create stunning, user-centered designs that engage and convert your audience.',
    deliverables: ['Wireframes & Prototypes', 'User Research', 'Design Systems', 'Interactive Mockups']
  },
  {
    id: 2,
    icon: '/icons/globe.svg',
    title: 'Web Development',
    description: 'Build fast, responsive, and scalable web applications tailored to your needs.',
    deliverables: ['Frontend Development', 'Backend Integration', 'API Development', 'Performance Optimization']
  },
  {
    id: 3,
    icon: '/icons/mobile.svg',
    title: 'Mobile Apps',
    description: 'Develop native and cross-platform mobile applications that users love.',
    deliverables: ['iOS Development', 'Android Development', 'App Store Deployment', 'Maintenance & Support']
  },
  {
    id: 4,
    icon: '/icons/seo.svg',
    title: 'SEO & Marketing',
    description: 'Boost your online visibility and drive organic traffic to your website.',
    deliverables: ['Keyword Research', 'On-page Optimization', 'Content Strategy', 'Analytics Reporting']
  },
  {
    id: 5,
    icon: '/icons/custom.svg',
    title: 'Custom Solutions',
    description: 'Get tailored technical solutions for your unique business challenges.',
    deliverables: ['Requirements Analysis', 'Custom Development', 'Integration Services', 'Technical Support']
  },
  {
    id: 6,
    icon: '/icons/analytics.svg',
    title: 'Data & Analytics',
    description: 'Transform your data into actionable insights to drive business growth.',
    deliverables: ['Data Collection', 'Analytics Setup', 'Custom Dashboards', 'Strategic Recommendations']
  }
]

const gradients = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  'linear-gradient(135deg, #06b6d4, #0891b2)'
]

const projects = [
  {
    id: 1,
    name: 'The Covenant Academy',
    image: '/img/tcad.png',
    imageMob: '/img/tcadmob.jpg'
  },
  {
    id: 2,
    name: 'B&S Educational Services',
    image: '/img/bsedu.png',
    imageMob: '/img/bsedumob.jpg'
  },
  {
    id: 3,
    name: 'AMU Foundation',
    image: '/img/amu.png',
    imageMob: '/img/amumob.jpg'
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease-in-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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

@keyframes bounce-once {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce-once {
  animation: bounce-once 0.6s ease-out;
}
</style>