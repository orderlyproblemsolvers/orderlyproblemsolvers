<script setup lang="ts">
import { ref } from 'vue'

// definePageMeta({
//   title: 'Services & Pricing - OPS Studio',
//   description: 'Custom software development, cloud consultancy, and system design for high-growth companies.'
// })

const billingCycle = ref('project')
const activeFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

// 1. SERVICES DATA
const services = [
  {
    title: 'Custom Software',
    desc: 'Bespoke solutions tailored to specific business logic. We build scalable, secure engines.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', 
  },
  {
    title: 'Mobile Engineering',
    desc: 'Native and cross-platform apps using Flutter & React Native. Offline-first architectures.',
    icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', 
  },
  {
    title: 'Web Platforms',
    desc: 'Modern, responsive web platforms built with Vue.js & Nuxt. SEO-optimized and accessible.',
    icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9', 
  },
  {
    title: 'System Design',
    desc: 'Architectural planning. We define data models and infrastructure before code is written.',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', 
  },
  {
    title: 'Cloud & DB',
    desc: 'Expert guidance on Neon, Supabase, and AWS. We optimize queries and reduce costs.',
    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 00-2-2m-2-4h.01M17 16h.01', 
  }
]

// 2. PRICING DATA
const projectPlans = [
  {
    name: 'MVP Build',
    description: 'For startups verifying an idea. We build core features fast.',
    price: '$5k',
    priceNote: 'Starts at',
    features: [
      'Web or Mobile App',
      'Auth & User Profiles',
      'Database Setup',
      'Basic Admin Dashboard',
      'Payment Integration'
    ]
  },
  {
    name: 'Business Scale',
    description: 'For established businesses digitizing operations.',
    price: '$15k',
    priceNote: 'Starts at',
    featured: true,
    features: [
      'Full Custom Platform',
      'Complex Workflows',
      'Advanced Analytics',
      'CRM/ERP Integration',
      'Cloud Infrastructure',
      '90 Days Support'
    ]
  },
  {
    name: 'System Design',
    description: 'Pure architectural consultancy before you build.',
    price: '$2,500',
    priceNote: 'Fixed Fee',
    features: [
      'Requirement Analysis',
      'Database Schema (ERD)',
      'API Specification',
      'Cloud Architecture',
      'Risk Assessment'
    ]
  }
]

const retainerPlans = [
  {
    name: 'Maintenance',
    description: 'Keep your lights on and software secure.',
    price: '$500',
    priceNote: '/ month',
    features: [
      'Security Patching',
      'Uptime Monitoring',
      'Minor Updates',
      'Database Backups',
      'Monthly Report'
    ]
  },
  {
    name: 'Dev Team',
    description: 'A dedicated engineer for ongoing features.',
    price: '$2,500',
    priceNote: '/ month',
    featured: true,
    features: [
      'New Feature Dev',
      'UI/UX Improvements',
      'API Development',
      'Code Reviews',
      'Priority Support',
      'Weekly Sprints'
    ]
  },
  {
    name: 'CTO Service',
    description: 'Strategic leadership for your technical team.',
    price: '$4,000',
    priceNote: '/ month',
    features: [
      'Technical Strategy',
      'Vendor Selection',
      'Hiring & Vetting',
      'Code Audits',
      'Cost Optimization',
      'Board Advisory'
    ]
  }
]

const pricingFaqs = [
  {
    question: 'Do you work with existing codebases?',
    answer: 'Yes, but we require a paid "Code Audit" first ($500). This allows us to assess the quality, security, and scalability of the existing code before we commit to maintaining or extending it.'
  },
  {
    question: 'What is your tech stack?',
    answer: 'We specialize in the Modern Stack: Vue.js/Nuxt for frontend, Node.js/TypeScript for backend, and PostgreSQL/Neon for databases. We also do mobile with Flutter and React Native.'
  },
  {
    question: 'How does payment work?',
    answer: 'For projects: 40% upfront to book the slot, 30% at the halfway milestone, and 30% upon completion/handover. For retainers: Monthly upfront billing.'
  },
  {
    question: 'Do you offer equity deals?',
    answer: 'Generally, no. We are a service business. However, for exceptional founders with previous exits, we may consider a small equity component to lower the cash fee.'
  }
]
</script>

<template>
  <AppHeader/>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-white selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
    
    <div class="relative border-b border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 pt-32 pb-20 lg:pb-32 overflow-hidden transition-colors duration-300">
      <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.1]" style="background-image: linear-gradient(#000 1px, transparent 1px), linear-gradient(to right, #000 1px, transparent 1px); background-size: 40px 40px;"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div class="inline-block mb-8">
          <span class="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">OPS Studio</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white tracking-tighter mb-8 leading-[0.9]">
          WE BUILD THE <br/>
          <span class="text-transparent bg-clip-text bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600">ENGINES.</span>
        </h1>
        
        <p class="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          The elite engineering arm of the ecosystem. We solve hard technical problems so you can focus on growth.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
           <div class="px-6 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 shadow-sm">Web & Mobile</div>
           <div class="px-6 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 shadow-sm">Cloud Systems</div>
           <div class="px-6 py-3 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-300 shadow-sm">Consultancy</div>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-200 dark:border-slate-800">
       <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-slate-800 border-x border-gray-200 dark:border-slate-800">
             
             <div v-for="service in services" :key="service.title" class="p-10 hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors group">
                <div class="w-12 h-12 mb-6 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                   <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="service.icon"></path></svg>
                </div>
                <h3 class="text-xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">{{ service.title }}</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{{ service.desc }}</p>
             </div>

             <div class="p-10 bg-gray-900 dark:bg-black text-white flex flex-col justify-center items-center text-center">
                <h3 class="text-2xl font-black mb-4 tracking-tight">Have a unique challenge?</h3>
                <p class="text-gray-400 text-sm mb-8">We thrive on complexity. Let's talk about your edge case.</p>
                <a 
                  href="mailto:orderlyproblemsolvers@gmail.com?subject=Discovery Call Request" 
                  class="inline-block px-6 py-3 bg-white text-black font-bold text-sm rounded hover:bg-gray-200 transition-colors uppercase tracking-wider"
                >
                   Book Discovery Call
                </a>
             </div>

          </div>
       </div>
    </div>

    <div class="py-24 px-6 lg:px-8 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 dark:text-white mb-8">TRANSPARENT PRICING</h2>
          
          <div class="inline-flex bg-white dark:bg-slate-900 p-1 rounded-lg border border-gray-200 dark:border-slate-800 shadow-sm">
            <button
              @click="billingCycle = 'project'"
              class="px-6 py-2 rounded-md text-sm font-bold transition-all"
              :class="billingCycle === 'project' ? 'bg-black dark:bg-white text-white dark:text-black shadow' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'"
            >
              Project Based
            </button>
            <button
              @click="billingCycle = 'retainer'"
              class="px-6 py-2 rounded-md text-sm font-bold transition-all"
              :class="billingCycle === 'retainer' ? 'bg-black dark:bg-white text-white dark:text-black shadow' : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'"
            >
              Monthly Retainer
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          <div 
            v-for="plan in (billingCycle === 'project' ? projectPlans : retainerPlans)" 
            :key="plan.name"
            class="bg-white dark:bg-slate-900 p-8 rounded-2xl border transition-all duration-300 relative flex flex-col"
            :class="plan.featured ? 'border-blue-600 dark:border-blue-500 shadow-xl shadow-blue-900/5 dark:shadow-black/40 scale-105 z-10' : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700'"
          >
            <div v-if="plan.featured" class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
               Recommended
            </div>

            <h3 class="text-xl font-black text-gray-900 dark:text-white mb-2">{{ plan.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-8 h-10">{{ plan.description }}</p>
            
            <div class="mb-8 pb-8 border-b border-gray-100 dark:border-slate-800">
               <span class="text-4xl font-black text-gray-900 dark:text-white">{{ plan.price }}</span>
               <p class="text-xs text-gray-400 mt-1 font-mono uppercase tracking-wider">{{ plan.priceNote }}</p>
            </div>

            <ul class="space-y-4 mb-8 flex-1">
               <li v-for="feat in plan.features" :key="feat" class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                  <span class="text-blue-600 dark:text-blue-400 font-bold text-lg leading-none">✓</span> {{ feat }}
               </li>
            </ul>

            <a 
              :href="`mailto:orderlyproblemsolvers@gmail.com?subject=${billingCycle === 'project' ? 'Project Inquiry' : 'Retainer Inquiry'}: ${plan.name}`"
              class="block w-full py-4 text-center rounded-xl font-bold text-sm transition-colors border border-black dark:border-white" 
              :class="plan.featured ? 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200' : 'bg-white dark:bg-slate-900 text-black dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800'"
            >
               Get Started
            </a>
          </div>

        </div>

      </div>
    </div>

    <div class="py-24 px-6 lg:px-8 border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div class="max-w-3xl mx-auto">
         <h2 class="text-3xl font-black text-gray-900 dark:text-white mb-12 text-center tracking-tight">COMMON QUESTIONS</h2>
         
         <div class="space-y-4">
            <div v-for="(faq, i) in pricingFaqs" :key="i" class="border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden">
               <button @click="toggleFaq(i)" class="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-slate-900 transition-colors">
                  <span class="font-bold text-gray-900 dark:text-white">{{ faq.question }}</span>
                  <span class="text-gray-400 text-2xl leading-none">{{ activeFaq === i ? '−' : '+' }}</span>
               </button>
               <div v-show="activeFaq === i" class="px-6 pb-6 text-gray-600 dark:text-gray-300 text-sm leading-relaxed border-t border-gray-100 dark:border-slate-800 pt-4 bg-gray-50/50 dark:bg-slate-900/50">
                  {{ faq.answer }}
               </div>
            </div>
         </div>
      </div>
    </div>

    <div class="py-24 bg-black dark:bg-white text-white dark:text-black text-center px-6">
       <div class="max-w-2xl mx-auto">
          <h2 class="text-4xl md:text-5xl font-black tracking-tighter mb-6">Ready to Build?</h2>
          <p class="text-gray-400 dark:text-gray-600 mb-10 text-lg">Let's discuss your project and find the perfect solution.</p>
          <a 
            href="mailto:orderlyproblemsolvers@gmail.com?subject=New Project Discussion" 
            class="inline-block px-10 py-4 bg-white dark:bg-black text-black dark:text-white font-bold text-sm rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors uppercase tracking-widest"
          >
             Schedule a Call
          </a>
       </div>
    </div>

  </div>
  <AppFooter/>
</template>