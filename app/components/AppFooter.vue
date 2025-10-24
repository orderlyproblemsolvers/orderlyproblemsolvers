<template>
  <footer class="w-full bg-black border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Main Footer Content -->
      <div class="py-12 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          
          <!-- Logo and Description -->
          <div class="lg:col-span-2">
            <div class="mb-6">
              <img 
                src="/img/logo.png" 
                alt="Orderly Problem Solvers" 
                class="h-16 w-auto mb-4"
              />
              <p class="text-gray-400 text-sm leading-relaxed font-ibm-plex-mono">
                Building innovative digital solutions that drive business growth. We transform complex challenges into elegant, scalable software.
              </p>
            </div>
            
            <!-- Social Links -->
            <div class="flex items-center gap-4">
              <a 
                v-for="social in socialLinks" 
                :key="social.name"
                :href="social.href"
                :aria-label="social.name"
                class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 text-gray-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                <component :is="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Company Links -->
          <div>
            <h4 class="text-white font-ibm-plex-mono font-bold text-sm uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul class="space-y-3">
              <li v-for="link in menuData.company" :key="link.label">
                <a 
                  :href="link.href"
                  class="text-gray-400 hover:text-white text-sm font-ibm-plex-mono transition-colors duration-300"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Services Links -->
          <div>
            <h4 class="text-white font-ibm-plex-mono font-bold text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul class="space-y-3">
              <li v-for="link in menuData.services" :key="link.label">
                <a 
                  :href="link.href"
                  class="text-gray-400 hover:text-white text-sm font-ibm-plex-mono transition-colors duration-300"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Resources Links -->
          <div>
            <h4 class="text-white font-ibm-plex-mono font-bold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul class="space-y-3">
              <li v-for="link in menuData.resources" :key="link.label">
                <a 
                  :href="link.href"
                  class="text-gray-400 hover:text-white text-sm font-ibm-plex-mono transition-colors duration-300"
                >
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Newsletter Section -->
      <div class="border-t border-gray-800 py-8 md:py-10">
        <div class="max-w-2xl">
          <h4 class="text-white font-heading font-bold text-xl md:text-2xl mb-2">
            Stay Updated
          </h4>
          <p class="text-gray-400 text-sm font-ibm-plex-mono mb-4">
            Get the latest insights, updates, and tech tips delivered to your inbox.
          </p>
          
          <form @submit.prevent="handleSubscribe" class="flex gap-3">
            <input
              v-model="email"
              type="email"
              required
              placeholder="Enter your email"
              class="flex-1 px-4 py-3 bg-gray-900 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors duration-300 text-sm font-ibm-plex-mono"
            />
            <button
              type="submit"
              :disabled="isSubscribing || subscribed"
              class="px-6 py-3 bg-yellow-400 text-black font-ibm-plex-mono font-bold text-sm rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
            >
              {{ subscribed ? 'Subscribed ✓' : isSubscribing ? 'Sending...' : 'Subscribe' }}
            </button>
          </form>
          
          <transition name="fade">
            <p v-if="subscribed" class="mt-3 text-green-400 text-sm font-ibm-plex-mono">
              Thanks for subscribing! Check your inbox.
            </p>
          </transition>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm font-ibm-plex-mono text-center md:text-left">
            © {{ currentYear }} Orderly Problem Solvers. All rights reserved.
          </p>
          
          <div class="flex items-center gap-6">
            <a 
              href="#" 
              class="text-gray-400 hover:text-white text-sm font-ibm-plex-mono transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a 
              href="#" 
              class="text-gray-400 hover:text-white text-sm font-ibm-plex-mono transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a 
              href="mailto:orderlyproblemsolvers@gmail.com" 
              class="text-gray-400 hover:text-white text-sm font-ibm-plex-mono transition-colors duration-300"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, h } from 'vue'

const email = ref('')
const isSubscribing = ref(false)
const subscribed = ref(false)

const currentYear = computed(() => new Date().getFullYear())

const menuData = {
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Team', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: '#' }
  ],
  services: [
    { label: 'Web Development', href: '#' },
    { label: 'Mobile Apps', href: '#' },
    { label: 'Consulting', href: '#' },
    { label: 'Digital Literacy', href: '#' },
    { label: 'Support', href: '#' }
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'Documentation', href: '#' },
    { label: 'Case Studies', href: '#' },
    { label: 'FAQ', href: '#' }
  ]
}

// Social media icons as functional components
const TwitterIcon = (props) => h('svg', { ...props, fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' })
])

const LinkedInIcon = (props) => h('svg', { ...props, fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' })
])

const GithubIcon = (props) => h('svg', { ...props, fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' })
])

const InstagramIcon = (props) => h('svg', { ...props, fill: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' })
])

const socialLinks = [
  { name: 'Twitter', href: '#', icon: TwitterIcon },
  { name: 'LinkedIn', href: '#', icon: LinkedInIcon },
  { name: 'GitHub', href: '#', icon: GithubIcon },
  { name: 'Instagram', href: '#', icon: InstagramIcon }
]

const handleSubscribe = async () => {
  isSubscribing.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubscribing.value = false
  subscribed.value = true
  
  // Reset after 3 seconds
  setTimeout(() => {
    email.value = ''
    subscribed.value = false
  }, 3000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@700;800;900&family=Playfair+Display:wght@700&display=swap');

@font-face {
  font-family: 'Copperplate Gothic';
  src: url('/fonts/copperplate-gothic-bold.woff2') format('woff2');
  font-weight: bold;
}

.font-copperplate {
  font-family: 'Copperplate Gothic', 'Playfair Display', serif;
}

.font-ibm-plex-mono {
  font-family: 'IBM Plex Mono', monospace;
}

.font-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>