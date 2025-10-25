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
            Clear <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Pricing</span>, Real Value
          </h1>
          <p class="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            Choose the package that fits your needs. Every solution is customized to solve your specific challenges.
          </p>
          
          <!-- Billing Toggle -->
          <div class="inline-flex items-center gap-4 bg-slate-900 rounded-full p-2 border border-gray-800">
            <button
              @click="billingCycle = 'project'"
              class="px-6 py-2 rounded-full font-ibm-plex-mono font-bold text-sm transition-all duration-300"
              :class="billingCycle === 'project' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'"
            >
              Project-Based
            </button>
            <button
              @click="billingCycle = 'retainer'"
              class="px-6 py-2 rounded-full font-ibm-plex-mono font-bold text-sm transition-all duration-300"
              :class="billingCycle === 'retainer' ? 'bg-yellow-400 text-black' : 'text-gray-400 hover:text-white'"
            >
              Monthly Retainer
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Cards - Project Based -->
    <section v-if="billingCycle === 'project'" class="w-full py-8 md:py-16 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(plan, index) in projectPlans"
            :key="plan.name"
            @mouseenter="hoveredPlan = plan.name"
            @mouseleave="hoveredPlan = null"
            class="group relative bg-slate-900/50 rounded-2xl p-8 border transition-all duration-500 hover:transform hover:scale-102"
            :class="[
              plan.featured ? 'border-yellow-400 lg:-mt-4 lg:mb-4' : 'border-gray-800',
              hoveredPlan === plan.name ? 'shadow-2xl' : ''
            ]"
          >
            <!-- Featured Badge -->
            <div v-if="plan.featured" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="px-4 py-1.5 bg-yellow-400 text-black font-ibm-plex-mono font-bold text-xs rounded-full">
                MOST POPULAR
              </span>
            </div>

            <!-- Animated Border -->
            <div 
              v-if="!plan.featured"
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              :style="{ 
                background: `linear-gradient(135deg, ${planGradients[index]}, transparent 60%)`, 
                padding: '2px'
              }"
            >
              <div class="w-full h-full bg-slate-900/50 rounded-2xl"></div>
            </div>

            <div class="relative z-10">
              <!-- Plan Header -->
              <div class="mb-6">
                <h3 class="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  {{ plan.name }}
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  {{ plan.description }}
                </p>
              </div>

              <!-- Pricing -->
              <div class="mb-6">
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="text-4xl md:text-5xl font-heading font-bold text-white">
                    {{ plan.price }}
                  </span>
                </div>
                <p class="text-sm text-gray-500 font-ibm-plex-mono">
                  {{ plan.priceNote }}
                </p>
              </div>

              <!-- Features -->
              <div class="mb-8">
                <ul class="space-y-3">
                  <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3 text-gray-300">
                    <span class="text-yellow-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span class="text-sm">{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- CTA Button -->
              <NuxtLink
                to="/contact"
                class="group/btn w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-heading font-bold transition-all duration-300 text-base"
                :class="plan.featured 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:shadow-2xl hover:scale-102' 
                  : 'bg-slate-950 text-white border border-gray-700 hover:border-yellow-400'"
              >
                <span>Get Started</span>
                <span class="text-xl transition-all duration-300 group-hover/btn:translate-x-1">→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Cards - Retainer -->
    <section v-if="billingCycle === 'retainer'" class="w-full py-8 md:py-16 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(plan, index) in retainerPlans"
            :key="plan.name"
            @mouseenter="hoveredPlan = plan.name"
            @mouseleave="hoveredPlan = null"
            class="group relative bg-slate-900/50 rounded-2xl p-8 border transition-all duration-500 hover:transform hover:scale-102"
            :class="[
              plan.featured ? 'border-yellow-400 lg:-mt-4 lg:mb-4' : 'border-gray-800',
              hoveredPlan === plan.name ? 'shadow-2xl' : ''
            ]"
          >
            <!-- Featured Badge -->
            <div v-if="plan.featured" class="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span class="px-4 py-1.5 bg-yellow-400 text-black font-ibm-plex-mono font-bold text-xs rounded-full">
                BEST VALUE
              </span>
            </div>

            <!-- Animated Border -->
            <div 
              v-if="!plan.featured"
              class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              :style="{ 
                background: `linear-gradient(135deg, ${planGradients[index]}, transparent 60%)`, 
                padding: '2px'
              }"
            >
              <div class="w-full h-full bg-slate-900/50 rounded-2xl"></div>
            </div>

            <div class="relative z-10">
              <!-- Plan Header -->
              <div class="mb-6">
                <h3 class="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                  {{ plan.name }}
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed">
                  {{ plan.description }}
                </p>
              </div>

              <!-- Pricing -->
              <div class="mb-6">
                <div class="flex items-baseline gap-2 mb-2">
                  <span class="text-4xl md:text-5xl font-heading font-bold text-white">
                    ₦{{ plan.price }}
                  </span>
                  <span class="text-gray-500 font-ibm-plex-mono">/month</span>
                </div>
                <p class="text-sm text-gray-500 font-ibm-plex-mono">
                  {{ plan.hours }} hours per month
                </p>
              </div>

              <!-- Features -->
              <div class="mb-8">
                <ul class="space-y-3">
                  <li v-for="feature in plan.features" :key="feature" class="flex items-start gap-3 text-gray-300">
                    <span class="text-yellow-400 font-bold mt-0.5 flex-shrink-0">✓</span>
                    <span class="text-sm">{{ feature }}</span>
                  </li>
                </ul>
              </div>

              <!-- CTA Button -->
              <NuxtLink
                to="/contact"
                class="group/btn w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-heading font-bold transition-all duration-300 text-base"
                :class="plan.featured 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:shadow-2xl hover:scale-102' 
                  : 'bg-slate-950 text-white border border-gray-700 hover:border-yellow-400'"
              >
                <span>Get Started</span>
                <span class="text-xl transition-all duration-300 group-hover/btn:translate-x-1">→</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Enterprise Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-900/50">
      <div class="max-w-5xl mx-auto">
        <div class="bg-gradient-to-br from-yellow-400/10 to-yellow-600/5 rounded-2xl p-8 md:p-12 border border-yellow-400/20 text-center">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Need Something Custom?
          </h2>
          <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            For large-scale enterprise solutions, complex integrations, or long-term partnerships, let's build a custom plan tailored to your organization's needs.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black font-heading font-bold text-xl mb-3">
                ∞
              </div>
              <p class="text-white font-ibm-plex-mono font-bold text-sm">Unlimited Scale</p>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black font-heading font-bold text-xl mb-3">
                24/7
              </div>
              <p class="text-white font-ibm-plex-mono font-bold text-sm">Priority Support</p>
            </div>
            <div class="flex flex-col items-center">
              <div class="w-12 h-12 flex items-center justify-center rounded-full bg-yellow-400 text-black font-heading font-bold text-xl mb-3">
                ✓
              </div>
              <p class="text-white font-ibm-plex-mono font-bold text-sm">Dedicated Team</p>
            </div>
          </div>

          <NuxtLink
            to="/contact"
            class="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-heading font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-102 text-base md:text-lg overflow-hidden relative"
          >
            <span class="relative z-10">Contact Sales</span>
            <span class="relative z-10 text-xl transition-all duration-300 group-hover:translate-x-1">→</span>
            
            <!-- Animated background -->
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Compare <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Features</span>
          </h2>
        </div>

        <!-- Mobile: Accordion Style -->
        <div class="lg:hidden space-y-4">
          <div
            v-for="(feature, index) in comparisonFeatures"
            :key="index"
            class="bg-slate-900/50 rounded-xl border border-gray-800 overflow-hidden"
          >
            <button
              @click="toggleFeature(index)"
              class="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors duration-300"
            >
              <span class="font-ibm-plex-mono font-bold text-white text-sm">{{ feature.name }}</span>
              <svg
                class="w-5 h-5 text-yellow-400 transition-transform duration-300"
                :class="activeFeature === index ? 'rotate-180' : ''"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
            <div
              v-show="activeFeature === index"
              class="px-6 pb-4 space-y-2"
            >
              <div v-for="(plan, planName) in feature.plans" :key="planName" class="flex items-center justify-between py-2 border-t border-gray-800">
                <span class="text-gray-400 text-sm">{{ planName }}</span>
                <span v-if="typeof plan === 'boolean'">
                  <svg v-if="plan" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                  </svg>
                  <svg v-else class="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </span>
                <span v-else class="text-gray-300 text-sm">{{ plan }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop: Table -->
        <div class="hidden lg:block overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b border-gray-800">
                <th class="px-6 py-4 text-left font-heading font-bold text-white">Feature</th>
                <th class="px-6 py-4 text-center font-heading font-bold text-white">Starter</th>
                <th class="px-6 py-4 text-center font-heading font-bold text-yellow-400">Professional</th>
                <th class="px-6 py-4 text-center font-heading font-bold text-white">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(feature, index) in comparisonFeatures"
                :key="index"
                class="border-b border-gray-800 hover:bg-slate-900/30 transition-colors duration-300"
              >
                <td class="px-6 py-4 font-ibm-plex-mono text-gray-300 text-sm">{{ feature.name }}</td>
                <td class="px-6 py-4 text-center">
                  <span v-if="typeof feature.plans.Starter === 'boolean'">
                    <svg v-if="feature.plans.Starter" class="w-5 h-5 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <svg v-else class="w-5 h-5 text-gray-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                  <span v-else class="text-gray-300 text-sm">{{ feature.plans.Starter }}</span>
                </td>
                <td class="px-6 py-4 text-center bg-yellow-400/5">
                  <span v-if="typeof feature.plans.Professional === 'boolean'">
                    <svg v-if="feature.plans.Professional" class="w-5 h-5 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <svg v-else class="w-5 h-5 text-gray-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                  <span v-else class="text-gray-300 text-sm font-bold">{{ feature.plans.Professional }}</span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span v-if="typeof feature.plans.Enterprise === 'boolean'">
                    <svg v-if="feature.plans.Enterprise" class="w-5 h-5 text-yellow-400 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    <svg v-else class="w-5 h-5 text-gray-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                    </svg>
                  </span>
                  <span v-else class="text-gray-300 text-sm">{{ feature.plans.Enterprise }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-900/50">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
            Pricing <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Questions</span>
          </h2>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in pricingFaqs"
            :key="index"
            class="bg-slate-950 rounded-xl border border-gray-800 overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-900/50 transition-colors duration-300"
            >
              <span class="font-heading font-bold text-white text-lg">{{ faq.question }}</span>
              <svg
                class="w-6 h-6 text-yellow-400 transition-transform duration-300 flex-shrink-0"
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

    <!-- Final CTA -->
    <section class="w-full py-16 md:py-24 px-4 sm:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
          Ready to Get <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Started?</span>
        </h2>
        <p class="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
          Let's discuss your project and find the perfect solution for your business.
        </p>
        
        <NuxtLink 
          to="/contact"
          class="group inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-heading font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-102 text-base md:text-lg overflow-hidden relative"
        >
          <span class="relative z-10">Schedule a Call</span>
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

const billingCycle = ref('project')
const hoveredPlan = ref(null)
const activeFaq = ref(null)
const activeFeature = ref(null)

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

const toggleFeature = (index) => {
  activeFeature.value = activeFeature.value === index ? null : index
}

const gradients = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  'linear-gradient(135deg, #06b6d4, #0891b2)'
]

const planGradients = [
  '#8b5cf6', // Purple
  '#f59e0b', // Yellow
  '#06b6d4'  // Cyan
]

const projectPlans = [
  {
    name: 'Starter',
    description: 'Perfect for small businesses and startups looking to establish their digital presence.',
    price: 'From ₦70,000',
    priceNote: 'One-time project fee',
    features: [
      '5-10 page custom website',
      'Responsive design (mobile-friendly)',
      'Basic SEO optimization',
      'Contact form integration',
      '2 rounds of revisions',
      '30 days post-launch support',
      'Content management system',
      'Performance optimization'
    ]
  },
  {
    name: 'Professional',
    description: 'Ideal for growing businesses that need custom web applications and advanced features.',
    price: 'From ₦120,000',
    priceNote: 'Based on project scope',
    featured: true,
    features: [
      'Custom web application development',
      'AI-powered features integration',
      'Database design & integration',
      'User authentication & authorization',
      'API development & integration',
      'Advanced features & functionality',
      'Unlimited revisions',
      '90 days post-launch support',
      'Training & documentation',
      'Analytics integration',
      'Security implementation'
    ]
  },
  {
    name: 'Enterprise',
    description: 'Comprehensive solutions for large organizations with complex requirements.',
    price: 'Custom Quote',
    priceNote: 'Tailored to your needs',
    features: [
      'Large-scale application development',
      'Multi-platform solutions',
      'System integration & automation',
      'Dedicated project manager',
      'Priority support & maintenance',
      'Custom SLA agreements',
      'Scalability planning',
      'Security audits & compliance',
      'Team training programs',
      'Ongoing optimization',
      'White-label options'
    ]
  }
]

const retainerPlans = [
  {
    name: 'Essential',
    description: 'Ongoing support and small updates for existing projects.',
    price: '20,000',
    hours: '10-15',
    features: [
      'Bug fixes & maintenance',
      'Content updates',
      'Performance monitoring',
      'Security updates',
      'Email support',
      'Monthly reports',
      'Backup management'
    ]
  },
  {
    name: 'Growth',
    description: 'Continuous development and feature additions to grow with your business.',
    price: '50,000',
    hours: '30-40',
    featured: true,
    features: [
      'Everything in Essential',
      'New feature development',
      'Design improvements',
      'API integrations',
      'Priority support',
      'Strategic consulting',
      'Bi-weekly sprint planning',
      'Advanced analytics',
      'A/B testing'
    ]
  },
  {
    name: 'Scale',
    description: 'Full-service partnership for rapid development and scaling.',
    price: '100,000',
    hours: '80+',
    features: [
      'Everything in Growth',
      'Dedicated development team',
      '24/7 support coverage',
      'Custom integrations',
      'Infrastructure management',
      'DevOps support',
      'Weekly strategy sessions',
      'Unlimited revisions',
      'Performance optimization',
      'Load testing'
    ]
  }
]

const comparisonFeatures = [
  {
    name: 'Project Timeline',
    plans: {
      Starter: '4-6 weeks',
      Professional: '8-16 weeks',
      Enterprise: 'Custom'
    }
  },
  {
    name: 'Revisions',
    plans: {
      Starter: '2 rounds',
      Professional: 'Unlimited',
      Enterprise: 'Unlimited'
    }
  },
  {
    name: 'Post-Launch Support',
    plans: {
      Starter: '30 days',
      Professional: '90 days',
      Enterprise: '6+ months'
    }
  },
  {
    name: 'Custom Design',
    plans: {
      Starter: true,
      Professional: true,
      Enterprise: true
    }
  },
  {
    name: 'Mobile Responsive',
    plans: {
      Starter: true,
      Professional: true,
      Enterprise: true
    }
  },
  {
    name: 'Database Integration',
    plans: {
      Starter: false,
      Professional: true,
      Enterprise: true
    }
  },
  {
    name: 'API Development',
    plans: {
      Starter: false,
      Professional: true,
      Enterprise: true
    }
  },
  {
    name: 'User Authentication',
    plans: {
      Starter: false,
      Professional: true,
      Enterprise: true
    }
  },
  {
    name: 'Analytics & Reporting',
    plans: {
      Starter: 'Basic',
      Professional: 'Advanced',
      Enterprise: 'Custom'
    }
  },
  {
    name: 'Training & Documentation',
    plans: {
      Starter: 'Basic',
      Professional: 'Comprehensive',
      Enterprise: 'Full Team'
    }
  },
  {
    name: 'Dedicated Project Manager',
    plans: {
      Starter: false,
      Professional: false,
      Enterprise: true
    }
  },
  {
    name: 'Priority Support',
    plans: {
      Starter: false,
      Professional: false,
      Enterprise: true
    }
  },
  {
    name: 'System Integration',
    plans: {
      Starter: false,
      Professional: 'Basic',
      Enterprise: 'Advanced'
    }
  },
  {
    name: 'Security Audit',
    plans: {
      Starter: false,
      Professional: true,
      Enterprise: true
    }
  },
  {
    name: 'Scalability Planning',
    plans: {
      Starter: false,
      Professional: true,
      Enterprise: true
    }
  }
]

const pricingFaqs = [
  {
    question: 'How do you determine project pricing?',
    answer: 'We base our pricing on project scope, complexity, timeline, and required features. After our discovery call, we provide a detailed proposal with transparent pricing breakdown. We consider factors like design complexity, number of integrations, user roles, and ongoing support needs.'
  },
  {
    question: 'Do you offer payment plans?',
    answer: 'Yes! For projects over ₦120,000, we offer flexible payment schedules. Typically, we work with milestone-based payments: 30% upfront, 40% at midpoint, and 30% upon completion. We can customize payment terms based on your needs.'
  },
  {
    question: 'What\'s included in post-launch support?',
    answer: 'Post-launch support includes bug fixes, performance monitoring, security updates, and technical assistance. The duration varies by package (30-90 days). After this period, you can opt for a monthly retainer for ongoing support and updates.'
  },
  {
    question: 'Can I switch from project-based to retainer pricing?',
    answer: 'Absolutely! Many clients start with a project-based approach to build their solution, then switch to a monthly retainer for ongoing development, maintenance, and feature additions. We make the transition seamless.'
  },
  {
    question: 'What if my project scope changes mid-development?',
    answer: 'We understand that requirements evolve. We use agile methodology with regular check-ins to adapt to changes. Significant scope changes are documented with revised timelines and pricing. Minor adjustments are often accommodated within the original agreement.'
  },
  {
    question: 'Do you offer discounts for nonprofits or startups?',
    answer: 'Yes! We offer special pricing for registered nonprofits, educational institutions, and early-stage startups. Contact us to discuss your organization and we\'ll work out a pricing structure that fits your budget and mission.'
  },
  {
    question: 'What happens if I\'m not satisfied with the work?',
    answer: 'Your satisfaction is our priority. We work iteratively with regular feedback loops and milestone approvals. If you\'re not happy with any deliverable, we revise it until it meets your expectations. Our contracts include clear revision policies and quality guarantees.'
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees, ever. Our quotes include all development costs. Third-party services (hosting, domains, premium APIs) are separate and clearly outlined. We provide transparent estimates for any additional costs before proceeding.'
  }
]
</script>