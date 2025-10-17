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
              v-for="service in services"
              :key="service.id"
              class="bg-slate-900 rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-800"
            >
              <div class="mb-4">
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
              <h3 class="text-xl md:text-2xl font-heading font-bold mb-3 text-white">
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
            </div>
          </div>
        </div>
      </transition>

      <!-- Projects Tab -->
      <transition name="fade-slide" mode="out-in">
        <div v-if="activeTab === 'Projects'" :key="'projects'" class="w-full">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            <div
              v-for="project in projects"
              :key="project.id"
              class="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-800"
            >
              <div class="relative overflow-hidden bg-gray-800">
                <!-- Skeleton Loader Mobile -->
                <div
                  v-if="!loadedImages[`${project.id}-mob`]"
                  class="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse md:hidden"
                />

                <!-- Skeleton Loader Desktop -->
                <div
                  v-if="!loadedImages[`${project.id}-desk`]"
                  class="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse hidden md:block"
                />

                <!-- Mobile Image -->
                <img
                  :src="project.imageMob"
                  :alt="project.name"
                  class="w-full h-auto group-hover:scale-105 transition-transform duration-500 md:hidden"
                  loading="lazy"
                  @load="loadedImages[`${project.id}-mob`] = true"
                />

                <!-- Desktop Image -->
                <NuxtImg
                  :src="project.image"
                  :alt="project.name"
                  class="w-full h-auto group-hover:scale-105 transition-transform duration-500 hidden md:block"
                  format="webp"
                  quality="80"
                  loading="lazy"
                  sizes="md:50vw lg:50vw"
                  @load="loadedImages[`${project.id}-desk`] = true"
                />
              </div>
              <div class="bg-slate-900 p-6 md:p-8">
                <h3 class="text-xl md:text-2xl font-heading font-bold text-white">
                  {{ project.name }}
                </h3>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <div class="flex justify-center">
            <button class="px-8 py-4 bg-white text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg font-ibm-plex-mono text-base md:text-lg">
              View All Projects
            </button>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('Services')
const tabs = ['Services', 'Projects']
const loadedImages = ref({})

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

.aspect-video {
  aspect-ratio: 16 / 9;
}

@keyframes pulse-shimmer {
  0%, 100% {
    background-position: -1000px 0;
  }
  50% {
    background-position: 1000px 0;
  }
}

.animate-pulse {
  animation: pulse-shimmer 2s infinite;
  background-size: 1000px 100%;
}
</style>