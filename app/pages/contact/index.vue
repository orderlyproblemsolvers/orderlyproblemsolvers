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
        <div class="text-center mb-12 md:mb-16">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Let's Build Your <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Solution</span>
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Ready to transform your operations? Tell us about your project and let's create software that truly works for you.
          </p>
        </div>
      </div>
    </section>

    <!-- Main Contact Section -->
    <section class="w-full py-8 md:py-16 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <!-- Contact Form -->
          <div class="order-2 lg:order-1">
            <div class="bg-slate-900/50 rounded-2xl p-6 md:p-10 border border-gray-800">
              <h2 class="text-2xl md:text-3xl font-heading font-bold text-white mb-6">
                Start Your Project
              </h2>
              
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <!-- Name -->
                <div>
                  <label for="name" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    v-model="formData.name"
                    required
                    class="w-full px-4 py-3 bg-slate-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    v-model="formData.email"
                    required
                    class="w-full px-4 py-3 bg-slate-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="john@company.com"
                  />
                </div>

                <!-- Company -->
                <div>
                  <label for="company" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    v-model="formData.company"
                    class="w-full px-4 py-3 bg-slate-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="Your Company"
                  />
                </div>

                <!-- Project Type -->
                <div>
                  <label for="projectType" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    v-model="formData.projectType"
                    required
                    class="w-full px-4 py-3 bg-slate-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                  >
                    <option value="" disabled>Select a project type</option>
                    <option value="web-app">Custom Web Application</option>
                    <option value="enterprise">Enterprise Software Solution</option>
                    <option value="website">Website Design & Development</option>
                    <option value="integration">System Integration & Automation</option>
                    <option value="consulting">Tech Consulting & Strategy</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <!-- Budget -->
                <div>
                  <label for="budget" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
                    Estimated Budget
                  </label>
                  <select
                    id="budget"
                    v-model="formData.budget"
                    class="w-full px-4 py-3 bg-slate-950 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                  >
                    <option value="" disabled>Select your budget range</option>
                    <option value="under-5k">Under $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-25k">$10,000 - $25,000</option>
                    <option value="25k-50k">$25,000 - $50,000</option>
                    <option value="over-50k">$50,000+</option>
                    <option value="not-sure">Not Sure Yet</option>
                  </select>
                </div>

                <!-- Message -->
                <div>
                  <label for="message" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    id="message"
                    v-model="formData.message"
                    required
                    rows="5"
                    class="w-full px-4 py-3 bg-slate-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors duration-300 resize-none"
                    placeholder="Describe your project, challenges you're facing, and what you hope to achieve..."
                  ></textarea>
                </div>

                <!-- Submit Button -->
                <button
                  type="submit"
                  class="group w-full px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-heading font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-base md:text-lg overflow-hidden relative"
                >
                  <span class="relative z-10 flex items-center justify-center gap-3">
                    Send Message
                    <span class="text-xl transition-all duration-300 group-hover:translate-x-1">→</span>
                  </span>
                  
                  <!-- Animated background -->
                  <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <p class="text-xs text-gray-500 font-ibm-plex-mono text-center">
                  We'll respond within 24 hours
                </p>
              </form>
            </div>
          </div>

          <!-- Contact Info & Why Choose Us -->
          <div class="order-1 lg:order-2 space-y-8">
            <!-- Contact Information -->
            <div class="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-gray-800">
              <h3 class="text-xl md:text-2xl font-heading font-bold text-white mb-6">
                Get In Touch
              </h3>
              
              <div class="space-y-6">
                <!-- Email -->
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400/10 border border-yellow-400/20 flex-shrink-0">
                    <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-ibm-plex-mono text-gray-400 mb-1">Email Us</p>
                    <a href="mailto:orderlyproblemsolvers@gmail.com" class="text-white hover:text-yellow-400 transition-colors duration-300">
                      orderlyproblemsolvers@gmail<span class="hidden md:inline-flex lg:inline-flex">.com</span>
                    </a>
                  </div>
                </div>

                <!-- Phone -->
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 flex items-center justify-center rounded-full bg-purple-500/10 border border-purple-500/20 flex-shrink-0">
                    <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-ibm-plex-mono text-gray-400 mb-1">Call Us</p>
                    <a href="tel:+2349018099785" class="text-white hover:text-yellow-400 transition-colors duration-300">
                      Book a call
                    </a>
                  </div>
                </div>

                <!-- Location -->
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 flex items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20 flex-shrink-0">
                    <svg class="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <p class="text-sm font-ibm-plex-mono text-gray-400 mb-1">Location</p>
                    <p class="text-white">Abuja, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- What Happens Next -->
            <div class="bg-slate-900/50 rounded-2xl p-6 md:p-8 border border-gray-800">
              <h3 class="text-xl md:text-2xl font-heading font-bold text-white mb-6">
                What Happens Next?
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-black font-heading font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 class="text-white font-ibm-plex-mono font-bold mb-1">Quick Response</h4>
                    <p class="text-gray-400 text-sm">We'll get back to you within 24 hours to schedule a discovery call.</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 flex items-center justify-center rounded-full bg-purple-500 text-white font-heading font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 class="text-white font-ibm-plex-mono font-bold mb-1">Discovery Call</h4>
                    <p class="text-gray-400 text-sm">We'll discuss your needs, challenges, and goals in detail.</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 flex items-center justify-center rounded-full bg-cyan-500 text-white font-heading font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 class="text-white font-ibm-plex-mono font-bold mb-1">Proposal & Timeline</h4>
                    <p class="text-gray-400 text-sm">Receive a detailed proposal with scope, timeline, and pricing.</p>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500 text-white font-heading font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 class="text-white font-ibm-plex-mono font-bold mb-1">Let's Build</h4>
                    <p class="text-gray-400 text-sm">Once approved, we start bringing your solution to life.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trust Indicators -->
            <div class="bg-gradient-to-br from-yellow-400/10 to-yellow-600/10 rounded-2xl p-6 md:p-8 border border-yellow-400/20">
              <div class="flex items-center gap-3 mb-4">
                <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <h3 class="text-lg font-heading font-bold text-white">
                  Why Businesses Choose OPS
                </h3>
              </div>
              
              <ul class="space-y-3">
                <li class="flex items-start gap-3 text-gray-300">
                  <span class="text-yellow-400 font-bold mt-0.5">✓</span>
                  <span class="text-sm">Proven track record across diverse industries</span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <span class="text-yellow-400 font-bold mt-0.5">✓</span>
                  <span class="text-sm">Solutions built for long-term growth</span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <span class="text-yellow-400 font-bold mt-0.5">✓</span>
                  <span class="text-sm">Transparent pricing, no hidden costs</span>
                </li>
                <li class="flex items-start gap-3 text-gray-300">
                  <span class="text-yellow-400 font-bold mt-0.5">✓</span>
                  <span class="text-sm">Ongoing support and maintenance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-900/50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Frequently Asked <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Questions</span>
          </h2>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-slate-950 rounded-xl border border-gray-800 overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors duration-300"
            >
              <span class="font-heading font-bold text-white text-lg">{{ faq.question }}</span>
              <svg
                class="w-6 h-6 text-yellow-400 transition-transform duration-300"
                :class="activeFaq === index ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div
              v-show="activeFaq === index"
              class="px-6 pb-5 text-gray-300 leading-relaxed"
            >
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeFaq = ref(null)
const formData = ref({
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  message: ''
})

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', formData.value)
  alert('Thank you for reaching out! We\'ll get back to you within 24 hours.')
  // Reset form
  formData.value = {
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  }
}

const gradients = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  'linear-gradient(135deg, #06b6d4, #0891b2)'
]

const faqs = [
  {
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while a custom web application could take 3-6 months. We provide detailed timelines in our proposal after understanding your requirements.'
  },
  {
    question: 'What is your development process?',
    answer: 'We follow a disciplined approach: Understand the Problem, Design Order, Build Solutions, and Refine & Support. You\'ll be involved throughout the process with regular updates and feedback sessions.'
  },
  {
    question: 'Do you provide ongoing support after launch?',
    answer: 'Yes! We offer ongoing maintenance and support packages to ensure your software continues to perform optimally. We also provide training for your team and documentation for your systems.'
  },
  {
    question: 'Can you work with our existing systems?',
    answer: 'Absolutely. We specialize in system integration and can work with your existing infrastructure to create seamless connections between your current tools and new solutions.'
  },
  {
    question: 'What technologies do you work with?',
    answer: 'We work with modern, proven technologies including Vue.js, React, Node.js, Python, and various database systems. We choose the best tech stack based on your specific needs and long-term goals.'
  },
  {
    question: 'How do you handle project pricing?',
    answer: 'We provide transparent, detailed quotes based on project scope. Pricing depends on complexity, timeline, and required features. We offer both fixed-price and time-and-materials arrangements depending on your needs.'
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