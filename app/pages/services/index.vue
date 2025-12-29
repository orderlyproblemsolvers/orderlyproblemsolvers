<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  title: 'Services & Pricing - OPS Studio',
  description: 'Custom software development, cloud consultancy, and system design for high-growth companies.'
})

useSeoMeta({
  title: "Services & Pricing - OPS Studio",
  description: "We build the engines. Elite software engineering, mobile development, and system design for ambitious brands in emerging markets.",
  ogTitle: "OPS Studio - Engineering & Design",
  ogDescription: "Custom software, cloud architecture, and system design. View our transparent pricing and packages.",
  twitterCard: "summary_large_image",
  ogUrl: 'https://orderlyproblemsolvers.com/services',
  canonical: 'https://orderlyproblemsolvers.com/services'
});

const billingCycle = ref('project')
const activeFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

// 1. SERVICES DATA (Kept original logic)
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

// 2. PRICING DATA (Kept original logic)
const projectPlans = [
  {
    name: 'MVP Build',
    description: 'For startups verifying an idea. Core features fast.',
    price: '₦150k',
    priceNote: 'Starts at',
    features: ['Web or Mobile App', 'Auth & User Profiles', 'Database Setup', 'Basic Admin Dashboard', 'Payment Integration']
  },
  {
    name: 'Business Scale',
    description: 'For established businesses digitizing operations.',
    price: '₦250k',
    priceNote: 'Starts at',
    featured: true,
    features: ['Full Custom Platform', 'Complex Workflows', 'Advanced Analytics', 'CRM/ERP Integration', 'Cloud Infrastructure', '90 Days Support']
  },
  {
    name: 'System Design',
    description: 'Pure architectural consultancy before you build.',
    price: '₦100k',
    priceNote: 'Fixed Fee',
    features: ['Requirement Analysis', 'Database Schema (ERD)', 'API Specification', 'Cloud Architecture', 'Risk Assessment']
  }
]

const retainerPlans = [
  {
    name: 'Maintenance',
    description: 'Keep your lights on and software secure.',
    price: '₦50k',
    priceNote: '/ month',
    features: ['Security Patching', 'Uptime Monitoring', 'Minor Updates', 'Database Backups', 'Monthly Report']
  },
  {
    name: 'Dev Team',
    description: 'A dedicated engineer for ongoing features.',
    price: '₦150k',
    priceNote: '/ month',
    featured: true,
    features: ['New Feature Dev', 'UI/UX Improvements', 'API Development', 'Code Reviews', 'Priority Support', 'Weekly Sprints']
  },
  {
    name: 'CTO Service',
    description: 'Strategic leadership for your technical team.',
    price: '₦200k',
    priceNote: '/ month',
    features: ['Technical Strategy', 'Vendor Selection', 'Hiring & Vetting', 'Code Audits', 'Cost Optimization', 'Board Advisory']
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
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="relative bg-[#051C2C] text-white pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(#00A9F4 1px, transparent 1px); background-size: 32px 32px;"></div>
      
      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div>
             <div class="inline-block mb-8 border-b border-[#00A9F4] pb-1">
               <span class="text-xs font-bold tracking-[0.2em] uppercase text-[#00A9F4]">OPS Studio</span>
             </div>
             
             <h1 class="text-6xl md:text-8xl font-serif tracking-tight mb-8 leading-[0.95]">
               We build<br/>
               <span class="italic text-gray-400">the engines.</span>
             </h1>
             
             <p class="text-xl text-gray-300 max-w-lg mb-12 leading-relaxed font-light border-l border-white/20 pl-6">
               The elite engineering arm of the ecosystem. We solve hard technical problems so you can focus on growth.
             </p>

             <div class="flex flex-wrap gap-8 text-xs font-bold uppercase tracking-widest text-gray-400">
               <span class="flex items-center gap-2"><div class="w-1 h-1 bg-[#00A9F4]"></div>Web & Mobile</span>
               <span class="flex items-center gap-2"><div class="w-1 h-1 bg-[#00A9F4]"></div>Cloud Systems</span>
               <span class="flex items-center gap-2"><div class="w-1 h-1 bg-[#00A9F4]"></div>Consultancy</span>
             </div>
           </div>

           <div class="hidden lg:block relative h-full">
              <div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rotate-45"></div>
              <div class="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-64 border border-[#00A9F4]/30 rotate-12"></div>
           </div>
        </div>
      </div>
    </div>

    <div class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#051C2C]">
       <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-x border-gray-200 dark:border-gray-800">
             
             <div 
               v-for="(service, index) in services" 
               :key="service.title" 
               class="p-10 border-b md:border-b-0 border-r border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-[#0A253A] transition-colors group"
               :class="{'lg:border-b': index < 3}"
             >
                <div class="w-8 h-8 mb-8 text-gray-400 group-hover:text-[#00A9F4] transition-colors">
                   <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" :d="service.icon"></path></svg>
                </div>
                <h3 class="text-xl font-serif text-[#051C2C] dark:text-white mb-4">{{ service.title }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light">{{ service.desc }}</p>
             </div>

             <div class="p-10 bg-[#00A9F4] text-white flex flex-col justify-center items-start">
                <h3 class="text-xl font-serif mb-2">Unique Challenge?</h3>
                <p class="text-sm text-white/80 mb-8 leading-relaxed">We thrive on edge cases. Tell us about your complex requirements.</p>
                <a 
                   href="mailto:orderlyproblemsolvers@gmail.com" 
                   class="inline-block border-b border-white pb-1 text-xs font-bold uppercase tracking-widest hover:opacity-70 transition-opacity"
                >
                   Book Technical Call
                </a>
             </div>

          </div>
       </div>
    </div>

    <div class="py-24 px-6 lg:px-12 bg-gray-50 dark:bg-[#0A253A] transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
             <h2 class="text-4xl font-serif text-[#051C2C] dark:text-white mb-2">Engagement Models</h2>
             <p class="text-gray-500 dark:text-gray-400 font-light">Transparent pricing structures for every stage.</p>
          </div>
          
          <div class="flex border-b border-gray-300 dark:border-gray-600">
            <button
              @click="billingCycle = 'project'"
              class="px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all relative"
              :class="billingCycle === 'project' ? 'text-[#051C2C] dark:text-white' : 'text-gray-400 hover:text-gray-600'"
            >
              Project
              <span v-if="billingCycle === 'project'" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#00A9F4]"></span>
            </button>
            <button
              @click="billingCycle = 'retainer'"
              class="px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all relative"
              :class="billingCycle === 'retainer' ? 'text-[#051C2C] dark:text-white' : 'text-gray-400 hover:text-gray-600'"
            >
              Retainer
              <span v-if="billingCycle === 'retainer'" class="absolute bottom-0 left-0 w-full h-0.5 bg-[#00A9F4]"></span>
            </button>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#051C2C] shadow-xl">
          
          <div 
            v-for="(plan) in (billingCycle === 'project' ? projectPlans : retainerPlans)" 
            :key="plan.name"
            class="relative p-10 flex flex-col border-r border-gray-200 dark:border-gray-700 last:border-r-0 dark:hover:bg-white/5 transition-colors"
            :class="plan.featured ? 'bg-[#051C2C] dark:bg-black text-white hover:bg-[#051C2C] dark:hover:bg-black transform md:scale-y-110 md:-my-5 z-10 shadow-2xl border-none ring-1 ring-[#051C2C] dark:ring-gray-700' : ''"
          >
            <div class="mb-8">
               <h3 class="text-xl font-serif font-bold mb-2" :class="plan.featured ? 'text-white' : 'text-[#051C2C] dark:text-white'">
                 {{ plan.name }}
               </h3>
               <p class="text-sm leading-relaxed min-h-[40px]" :class="plan.featured ? 'text-gray-400' : 'text-gray-500 dark:text-gray-400'">
                 {{ plan.description }}
               </p>
            </div>
            
            <div class="mb-10 pb-8 border-b" :class="plan.featured ? 'border-gray-700' : 'border-gray-100 dark:border-gray-800'">
               <div class="flex items-baseline gap-1">
                 <span class="text-3xl font-mono font-bold" :class="plan.featured ? 'text-white' : 'text-[#051C2C] dark:text-white'">
                   {{ plan.price }}
                 </span>
                 <span class="text-[10px] uppercase tracking-wider" :class="plan.featured ? 'text-gray-500' : 'text-gray-400'">
                   {{ plan.priceNote }}
                 </span>
               </div>
            </div>

            <ul class="space-y-4 mb-10 flex-1">
               <li 
                 v-for="feat in plan.features" 
                 :key="feat" 
                 class="flex items-start gap-3 text-sm"
                 :class="plan.featured ? 'text-gray-300' : 'text-gray-600 dark:text-gray-300'"
               >
                  <span class="text-[#00A9F4] font-bold">/</span> {{ feat }}
               </li>
            </ul>

            <a 
              :href="`mailto:orderlyproblemsolvers@gmail.com?subject=Inquiry: ${plan.name}`"
              class="block w-full py-3 text-center text-xs font-bold uppercase tracking-widest border transition-all" 
              :class="plan.featured 
                ? 'bg-[#00A9F4] border-[#00A9F4] text-white hover:bg-white hover:text-[#051C2C]' 
                : 'bg-transparent border-[#051C2C] dark:border-gray-600 text-[#051C2C] dark:text-white hover:bg-[#051C2C] hover:text-white dark:hover:bg-white dark:hover:text-[#051C2C]'"
            >
               Select Plan
            </a>
          </div>

        </div>
      </div>
    </div>

    <div class="py-24 px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#051C2C]">
      <div class="max-w-3xl mx-auto">
         <h2 class="text-xs font-bold text-[#00A9F4] uppercase tracking-[0.2em] mb-12 text-center">
           Frequently Asked Questions
         </h2>
         
         <div class="divide-y divide-gray-200 dark:divide-gray-800 border-y border-gray-200 dark:border-gray-800">
            <div v-for="(faq, i) in pricingFaqs" :key="i" class="group">
               <button @click="toggleFaq(i)" class="w-full flex items-center justify-between py-6 text-left focus:outline-none">
                  <span class="font-serif text-lg text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors">
                    {{ faq.question }}
                  </span>
                  <span class="text-[#00A9F4] text-xl font-light">
                    {{ activeFaq === i ? '−' : '+' }}
                  </span>
               </button>
               <div v-show="activeFaq === i" class="pb-6 pr-12 text-gray-500 dark:text-gray-400 text-sm leading-loose font-light">
                  {{ faq.answer }}
               </div>
            </div>
         </div>
      </div>
    </div>

    <div class="py-24 bg-[#051C2C] text-white text-center px-6">
       <div class="max-w-2xl mx-auto">
          <h2 class="text-4xl font-serif mb-6">Need a bespoke arrangement?</h2>
          <p class="text-gray-400 mb-10 font-light">For enterprise requirements or hybrid equity deals, let's talk.</p>
          <a 
            href="mailto:orderlyproblemsolvers@gmail.com" 
            class="inline-block px-10 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#051C2C] transition-all"
          >
             Contact Principal
          </a>
       </div>
    </div>

  </div>
</template>