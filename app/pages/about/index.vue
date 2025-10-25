<template>
  <div class="w-full bg-slate-950">
    <!-- Hero Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8 relative overflow-hidden">
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
        <!-- Logo -->
        <div class="flex justify-center mb-8 md:mb-12">
          <img 
            src="/img/logo.png" 
            alt="OPS Logo" 
            class="h-16 md:h-20 lg:h-24 w-auto"
          />
        </div>

        <!-- Hero Content -->
        <div class="text-center max-w-4xl mx-auto">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Who We <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Are</span>
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed mb-6">
            Orderly Problem Solvers (OPS) is a technology solutions company driven by one core mission — to simplify complexity through intelligent systems. We design and build custom web applications, enterprise software, and digital platforms that transform manual operations into seamless, automated experiences.
          </p>
          <p class="text-base md:text-lg text-gray-400 font-ibm-plex-mono">
            At OPS, we believe technology should do more than exist — it should solve, streamline, and scale. That's why every solution we craft begins with understanding the problem first. From startups to established organizations, we help teams bring order to their digital challenges, one system at a time.
          </p>
        </div>
      </div>
    </section>

    <!-- Vision & Mission Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-900/50">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <!-- Vision -->
          <div 
            class="group relative bg-transparent rounded-2xl p-8 md:p-10 border border-gray-800 overflow-hidden"
            @mouseenter="hoveredSection = 'vision'"
            @mouseleave="hoveredSection = null"
          >
            <!-- Animated Border -->
            <div 
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              style="background: linear-gradient(135deg, #f59e0b, transparent 60%); padding: 2px;"
            >
              <div class="w-full h-full bg-slate-900/50 rounded-2xl"></div>
            </div>

            <div class="relative z-10">
              <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-6 group-hover:text-yellow-400 transition-colors duration-300">
                Our Vision
              </h2>
              <p class="text-gray-300 text-lg leading-relaxed">
                To become a leading force in Africa's digital transformation by building technology that organizes, empowers, and drives sustainable progress — where every solution improves the way people work, connect, and create impact.
              </p>
            </div>
          </div>

          <!-- Mission -->
          <div 
            class="group relative bg-transparent rounded-2xl p-8 md:p-10 border border-gray-800 overflow-hidden"
            @mouseenter="hoveredSection = 'mission'"
            @mouseleave="hoveredSection = null"
          >
            <!-- Animated Border -->
            <div 
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              style="background: linear-gradient(135deg, #8b5cf6, transparent 60%); padding: 2px;"
            >
              <div class="w-full h-full bg-slate-900/50 rounded-2xl"></div>
            </div>

            <div class="relative z-10">
              <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-6 group-hover:text-yellow-400 transition-colors duration-300">
                Our Mission
              </h2>
              <p class="text-gray-300 text-lg leading-relaxed">
                To create smart, scalable, and user-centered software that bridges the gap between ideas and execution. We aim to help organizations evolve beyond outdated systems, eliminate inefficiencies, and unlock new levels of productivity through technology that truly fits their goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What We Do Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            What We <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Do</span>
          </h2>
          <p class="text-lg md:text-xl text-gray-400 font-ibm-plex-mono">
            We specialize in designing and developing solutions that matter
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div
            v-for="(service, index) in whatWeDo"
            :key="service.id"
            @mouseenter="hoveredCard = service.id"
            @mouseleave="hoveredCard = null"
            class="group relative bg-transparent rounded-2xl p-6 md:p-8 border border-gray-800 overflow-hidden cursor-pointer transition-all duration-500"
          >
            <!-- Animated Border -->
            <div 
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              :style="{ 
                background: `linear-gradient(135deg, ${serviceGradients[index % 5]}, transparent 60%)`, 
                padding: '2px'
              }"
            >
              <div class="w-full h-full bg-slate-950 rounded-2xl"></div>
            </div>

            <div class="relative z-10">
              <div class="mb-4">
                <span class="text-5xl font-heading font-bold text-gray-800 group-hover:text-yellow-400/20 transition-colors duration-300">
                  0{{ index + 1 }}
                </span>
              </div>
              
              <h3 class="text-xl md:text-2xl font-heading font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300">
                {{ service.title }}
              </h3>
              
              <p class="text-gray-300 leading-relaxed">
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-gray-400 text-lg font-ibm-plex-mono">
            Each project we take on is grounded in deep understanding, technical precision, and a commitment to measurable results.
          </p>
        </div>
      </div>
    </section>

    <!-- Philosophy Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-900/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Philosophy</span>
          </h2>
          <p class="text-lg md:text-xl text-gray-400 font-ibm-plex-mono max-w-3xl mx-auto">
            We believe that clarity is the foundation of innovation. At OPS, our process follows a disciplined yet creative approach:
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div
            v-for="(step, index) in philosophy"
            :key="step.step"
            class="group relative bg-transparent rounded-2xl p-6 md:p-8 border border-gray-800 overflow-hidden"
          >
            <!-- Animated Border -->
            <div 
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              :style="{ 
                background: `linear-gradient(135deg, ${philosophyGradients[index]}, transparent 60%)`, 
                padding: '2px'
              }"
            >
              <div class="w-full h-full bg-slate-900/50 rounded-2xl"></div>
            </div>

            <div class="relative z-10">
              <div class="mb-4">
                <span class="text-6xl md:text-7xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-yellow-600">
                  {{ step.step }}
                </span>
              </div>
              
              <h3 class="text-xl md:text-2xl font-heading font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors duration-300">
                {{ step.title }}
              </h3>
              
              <p class="text-gray-300 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <p class="text-xl md:text-2xl text-white font-heading font-bold">
            This mindset — <span class="text-yellow-400">from chaos to clarity</span> — defines everything we do.
          </p>
        </div>
      </div>
    </section>

    <!-- Why Choose OPS Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Why Choose <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">OPS</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          <div
            v-for="(reason, index) in whyChooseUs"
            :key="index"
            class="group relative bg-transparent rounded-2xl p-6 md:p-8 border border-gray-800 overflow-hidden"
          >
            <div class="relative z-10 flex items-start gap-4">
              <span class="text-yellow-400 font-bold text-2xl mt-1">✓</span>
              <div>
                <h3 class="text-xl md:text-2xl font-heading font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors duration-300">
                  {{ reason.title }}
                </h3>
                <p class="text-gray-300 leading-relaxed">
                  {{ reason.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Work Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-900/50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
            Our <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Work</span>
          </h2>
          <p class="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
            Our growing portfolio spans diverse sectors — from education and NGOs to corporate enterprises and creative industries. Each project reflects our dedication to precision, usability, and purpose-driven technology.
          </p>
        </div>

        <div class="text-center max-w-3xl mx-auto">
          <p class="text-xl md:text-2xl text-white font-heading font-bold mb-8">
            At OPS, we don't just write code — we <span class="text-yellow-400">engineer clarity</span>, craft <span class="text-yellow-400">efficiency</span>, and solve <span class="text-yellow-400">problems that matter</span>.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8 relative overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          class="absolute rounded-full blur-3xl animate-float"
          style="
            width: 400px;
            height: 400px;
            background: linear-gradient(135deg, #f59e0b, #d97706);
            opacity: 0.1;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation-duration: 15s;
          "
        ></div>
      </div>

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
          Let's Build Something That <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Works</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Whether you're an organization seeking to streamline operations or a brand aiming to redefine its digital presence, OPS is your partner for clear, smart, and effective solutions.
        </p>
        <p class="text-2xl md:text-3xl text-white font-heading font-bold mb-12">
          We don't just build software. <br class="hidden md:block" />
          We bring <span class="text-yellow-400">order to complexity</span>.
        </p>
        
        <NuxtLink 
          to="/contact"
          class="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-heading font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-102 text-base md:text-lg overflow-hidden relative"
        >
          <span class="relative z-10">Get Started</span>
          <span class="relative z-10 text-xl transition-all duration-300 group-hover:translate-x-1">→</span>
          
          <!-- Animated background -->
          <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hoveredSection = ref(null)
const hoveredCard = ref(null)

const gradients = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  'linear-gradient(135deg, #06b6d4, #0891b2)'
]

const serviceGradients = [
  '#f59e0b',
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
  '#ef4444'
]

const philosophyGradients = [
  '#f59e0b',
  '#8b5cf6',
  '#06b6d4',
  '#10b981'
]

const whatWeDo = [
  {
    id: 1,
    title: 'Custom Web Applications',
    description: 'Tailored software that adapts to your workflows, not the other way around.'
  },
  {
    id: 2,
    title: 'Enterprise Software Solutions',
    description: 'Scalable tools that power collaboration, analytics, and automation.'
  },
  {
    id: 3,
    title: 'Website Design & Development',
    description: 'Engaging, modern, and conversion-driven websites that reflect your brand and purpose.'
  },
  {
    id: 4,
    title: 'System Integration & Process Automation',
    description: 'Connecting data and operations for smoother, faster performance.'
  },
  {
    id: 5,
    title: 'Tech Consulting & Digital Strategy',
    description: 'Helping organizations plan, build, and grow with confidence.'
  }
]

const philosophy = [
  {
    step: '01',
    title: 'Understand the Problem',
    description: 'We begin by listening and studying the pain points that matter most.'
  },
  {
    step: '02',
    title: 'Design Order',
    description: 'We organize ideas into structured, efficient, and intuitive systems.'
  },
  {
    step: '03',
    title: 'Build Solutions',
    description: 'We bring those systems to life through clean, scalable, and future-ready code.'
  },
  {
    step: '04',
    title: 'Refine & Support',
    description: 'We continuously optimize to ensure long-term performance and reliability.'
  }
]

const whyChooseUs = [
  {
    title: 'We think long-term',
    description: 'Our products are built for growth, not just deployment.'
  },
  {
    title: 'We value simplicity',
    description: 'Every solution is user-focused and strategically designed.'
  },
  {
    title: 'We collaborate closely',
    description: 'Your vision becomes our shared blueprint.'
  },
  {
    title: 'We deliver impact',
    description: 'We measure success by how effectively your problem gets solved.'
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