<script setup lang="ts">
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'Submit Your Solution - Orderly Problem Solvers',
  description: 'Join the definitive index of problem solvers. Submit your profile for verification and gain visibility to investors, partners, and talent.',
  ogTitle: 'Submit Your Solution - Orderly Problem Solvers',
  ogDescription: 'Join the definitive index of problem solvers. Submit your profile for verification and gain visibility to investors, partners, and talent.',
  twitterCard: 'summary_large_image',
  ogUrl: 'https://orderlyproblemsolvers.com/submit-solution',
  canonical: 'https://orderlyproblemsolvers.com/submit-solution'
})

definePageMeta({
  title: 'Submit Your Solution - Orderly Problem Solvers',
  description: 'Join the definitive index of problem solvers. Submit your profile for verification and gain visibility to investors, partners, and talent.'
})

defineOgImageComponent('OpsTemplate', {
  title: 'Submit Your Solution - Orderly Problem Solvers',
  description: 'Join the definitive index of problem solvers. Submit your profile for verification and gain visibility to investors, partners, and talent.',
  image: '/img/logo-sm.png',
  type: 'Submission'
})

// WIZARD CONFIG
const currentStep = ref(1)
const totalSteps = 4 // Added 'Impact' step
const isSubmitting = ref(false)
const isSuccess = ref(false)
const submissionId = ref('')

// FORM DATA
const form = ref({
  type: 'person', // 'person' | 'company'
  name: '',
  email: '', 
  website: '',
  role: '', 
  location: '',
  industry: '',
  // Stack Logic
  stack: [] as string[],
  stackInput: '',
  // Impact Data 
  problem: '',
  solution: '',
  metric: '' 
})

// INDUSTRIES
const industries = ['FinTech', 'HealthTech', 'AgriTech', 'Logistics', 'EdTech', 'Clean Energy', 'PropTech', 'GovTech', 'E-commerce', 'AI & Data']

// PROGRESS
const progress = computed(() => (currentStep.value / totalSteps) * 100)

// NAVIGATION
const nextStep = () => {
  // Simple Validation
  if (currentStep.value === 1) {
    if (!form.value.name || !form.value.email) return alert('Name and Email are required.')
  }
  if (currentStep.value === 2) {
    if (!form.value.location || !form.value.industry) return alert('Location and Industry are required.')
  }

  if (currentStep.value < totalSteps) {
    currentStep.value++
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    handleSubmit()
  }
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

// TAGGING LOGIC
const addTag = () => {
  const val = form.value.stackInput.trim()
  if (val && !form.value.stack.includes(val)) {
    form.value.stack.push(val)
  }
  form.value.stackInput = ''
}

const removeTag = (index: number) => {
  form.value.stack.splice(index, 1)
}

// SUBMISSION
const handleSubmit = async () => {
  isSubmitting.value = true
  
  const structuredDescription = `
**The Challenge:**
${form.value.problem}

**The Fix:**
${form.value.solution}

**The Outcome:**
${form.value.metric}
  `.trim()

  try {
    await $fetch('/api/submissions', {
      method: 'POST',
      body: {
        ...form.value,
        description: structuredDescription
      }
    })

    submissionId.value = `#OPS-${Math.floor(Math.random() * 10000)}`
    isSuccess.value = true
    isSubmitting.value = false
    window.scrollTo({ top: 0, behavior: 'smooth' })

  } catch (e: any) {
    alert('Error submitting: ' + (e.data?.statusMessage || e.message))
    isSubmitting.value = false
  }
}
</script>

<template>
  <AppHeader/>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
    
    <div class="sticky top-20 z-20 bg-white/90 dark:bg-slate-950/90 backdrop-blur border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Submission Portal</span>
        <div class="hidden md:flex items-center gap-3 text-xs font-mono">
          <span :class="currentStep >= 1 ? 'text-black dark:text-white font-bold' : 'text-gray-300 dark:text-gray-600'">01. IDENTITY</span>
          <span class="text-gray-300 dark:text-gray-700">/</span>
          <span :class="currentStep >= 2 ? 'text-black dark:text-white font-bold' : 'text-gray-300 dark:text-gray-600'">02. CONTEXT</span>
          <span class="text-gray-300 dark:text-gray-700">/</span>
          <span :class="currentStep >= 3 ? 'text-black dark:text-white font-bold' : 'text-gray-300 dark:text-gray-600'">03. IMPACT</span>
          <span class="text-gray-300 dark:text-gray-700">/</span>
          <span :class="currentStep >= 4 ? 'text-black dark:text-white font-bold' : 'text-gray-300 dark:text-gray-600'">04. REVIEW</span>
        </div>
        <div class="md:hidden text-xs font-bold text-gray-900 dark:text-white">Step {{ currentStep }} of {{ totalSteps }}</div>
      </div>
      <div class="h-1 bg-gray-100 dark:bg-slate-800 w-full">
        <div class="h-full bg-blue-600 transition-all duration-500 ease-out" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      
      <div v-if="isSuccess" class="max-w-lg mx-auto text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div class="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 class="text-4xl font-black tracking-tighter mb-4 text-gray-900 dark:text-white">Received.</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-10">Your profile is in the verification queue. Our editorial team reviews all submissions within 48 hours.</p>
        
        <div class="bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-lg text-left font-mono text-sm mb-10 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-slate-700 dark:to-slate-600"></div>
          <div class="flex justify-between mb-2 border-b border-gray-200 dark:border-slate-800 pb-2">
            <span class="text-gray-400 dark:text-gray-500">TICKET ID</span>
            <span class="font-bold text-gray-900 dark:text-gray-200">{{ submissionId }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-400 dark:text-gray-500">TYPE</span>
            <span class="uppercase text-gray-900 dark:text-gray-200">{{ form.type }}</span>
          </div>
          <div class="flex justify-between mb-2">
            <span class="text-gray-400 dark:text-gray-500">ENTITY</span>
            <span class="font-bold text-gray-900 dark:text-gray-200">{{ form.name }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 dark:text-gray-500">STATUS</span>
            <span class="text-orange-500 dark:text-orange-400 font-bold">PENDING REVIEW</span>
          </div>
        </div>

        <NuxtLink to="/" class="inline-block px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-sm rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
          Return to Index
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        <div class="hidden lg:block lg:col-span-4">
          <div class="sticky top-48">
            <h1 class="text-5xl font-black tracking-tighter mb-6 leading-[0.9] text-gray-900 dark:text-white">
              ADD TO <br/> THE INDEX.
            </h1>
            <p class="text-lg text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
              Join the definitive directory of problem solvers. Verification grants you visibility to investors, partners, and talent.
            </p>
            
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 p-6 rounded-xl">
               <h4 class="text-blue-900 dark:text-blue-300 font-bold text-sm mb-2">Why "Impact" matters?</h4>
               <p class="text-blue-700 dark:text-blue-200 text-xs leading-relaxed">
                  We don't just list names. We list solutions. Providing a clear case study (The Problem & The Fix) increases your chance of verification by 80%.
               </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8 max-w-2xl">
          
          <form @submit.prevent class="space-y-10">
            
            <div v-if="currentStep === 1" class="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
              
              <div>
                <label class="block text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4">I am listing a...</label>
                <div class="grid grid-cols-2 gap-4">
                  <div 
                    @click="form.type = 'person'" 
                    class="cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all" 
                    :class="form.type === 'person' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-500' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'"
                  >
                    <svg class="w-8 h-8 mb-3" :class="form.type === 'person' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span class="font-bold text-sm" :class="form.type === 'person' ? 'text-blue-900 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'">Person</span>
                  </div>
                  <div 
                    @click="form.type = 'company'" 
                    class="cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all" 
                    :class="form.type === 'company' ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-500' : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'"
                  >
                    <svg class="w-8 h-8 mb-3" :class="form.type === 'company' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    <span class="font-bold text-sm" :class="form.type === 'company' ? 'text-blue-900 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'">Company</span>
                  </div>
                </div>
              </div>

              <div class="space-y-6">
                <div>
                  <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">{{ form.type === 'person' ? 'Full Name' : 'Company Name' }}</label>
                  <input v-model="form.name" type="text" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="e.g. PayStack" />
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">Email Address</label>
                    <input v-model="form.email" type="email" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="admin@example.com" />
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">Website / Portfolio</label>
                    <input v-model="form.website" type="url" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="https://" />
                  </div>
                </div>
                <div v-if="form.type === 'person'">
                  <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">Current Role</label>
                  <input v-model="form.role" type="text" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="e.g. Senior Engineer" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 2" class="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">Industry</label>
                  <div class="relative">
                    <select v-model="form.industry" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm appearance-none cursor-pointer text-gray-900 dark:text-white">
                      <option value="" disabled selected>Select...</option>
                      <option v-for="ind in industries" :key="ind" :value="ind">{{ ind }}</option>
                    </select>
                    <svg class="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">HQ Location</label>
                  <input v-model="form.location" type="text" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="e.g. Lagos" />
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">Tech Stack / Tools</label>
                <div class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus-within:bg-white dark:focus-within:bg-black focus-within:border-black dark:focus-within:border-white transition-colors flex flex-wrap gap-2 min-h-[50px]">
                  <span v-for="(tag, index) in form.stack" :key="index" class="bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                    {{ tag }}
                    <button @click="removeTag(index)" class="hover:text-gray-300 dark:hover:text-gray-500"><svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
                  </span>
                  <input v-model="form.stackInput" @keydown.enter.prevent="addTag" @keydown.backspace="form.stackInput === '' && form.stack.pop()" type="text" class="bg-transparent outline-none text-sm flex-1 min-w-[120px] text-gray-900 dark:text-white placeholder-gray-400" placeholder="Type & Enter..." />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 3" class="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
              
              <div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800/30 p-4 rounded-lg mb-6">
                 <p class="text-xs text-yellow-800 dark:text-yellow-200 font-medium">Describe a specific challenge you solved. This helps us verify your expertise.</p>
              </div>

              <div>
                 <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">The Challenge (Constraint)</label>
                 <textarea v-model="form.problem" rows="2" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="e.g. Our payment API was timing out at 50 TPS during Black Friday..."></textarea>
              </div>

              <div>
                 <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">The Fix (Technical Approach)</label>
                 <textarea v-model="form.solution" rows="3" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="e.g. We migrated the ledger to Rust and implemented Redis caching for read-heavy endpoints..."></textarea>
              </div>

              <div>
                 <label class="block text-xs font-bold text-gray-900 dark:text-white mb-2">The Outcome (Metric)</label>
                 <input v-model="form.metric" type="text" class="w-full px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg focus:bg-white dark:focus:bg-black focus:border-black dark:focus:border-white outline-none transition-colors text-sm text-gray-900 dark:text-white placeholder-gray-400" placeholder="e.g. Scaled to 5,000 TPS with 0 downtime." />
              </div>
            </div>

            <div v-if="currentStep === 4" class="space-y-8 animate-in slide-in-from-right-4 fade-in duration-300">
              <div class="bg-gray-50 dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800">
                <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-6 border-b border-gray-200 dark:border-slate-800 pb-4">Review</h3>
                <dl class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 text-sm text-gray-600 dark:text-gray-400">
                  <div><dt class="text-gray-400 dark:text-gray-500 text-xs uppercase font-bold mb-1">Type</dt><dd class="font-bold capitalize text-gray-900 dark:text-white">{{ form.type }}</dd></div>
                  <div><dt class="text-gray-400 dark:text-gray-500 text-xs uppercase font-bold mb-1">Name</dt><dd class="font-bold text-gray-900 dark:text-white">{{ form.name }}</dd></div>
                  <div><dt class="text-gray-400 dark:text-gray-500 text-xs uppercase font-bold mb-1">Location</dt><dd class="font-bold text-gray-900 dark:text-white">{{ form.location }}</dd></div>
                  <div class="md:col-span-2"><dt class="text-gray-400 dark:text-gray-500 text-xs uppercase font-bold mb-1">Stack</dt><dd class="flex flex-wrap gap-2"><span v-for="tag in form.stack" :key="tag" class="bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-[10px] font-bold px-2 py-1 rounded">{{ tag }}</span></dd></div>
                </dl>
              </div>
              <div class="flex items-start gap-3">
                <input type="checkbox" id="terms" class="mt-1 w-4 h-4 rounded border-gray-300 dark:border-slate-700 text-black focus:ring-black accent-black dark:accent-white" />
                <label for="terms" class="text-sm text-gray-600 dark:text-gray-400">I confirm this info is accurate. I agree to the <NuxtLink to="/legal/terms" class="underline text-black dark:text-white">Terms</NuxtLink>.</label>
              </div>
            </div>

            <div class="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-slate-800">
              <button v-if="currentStep > 1" @click="prevStep" type="button" class="px-6 py-3 rounded-lg border border-gray-200 dark:border-slate-700 text-sm font-bold hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-900 dark:text-white transition-colors">Back</button>
              <button @click="nextStep" type="button" class="flex-1 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg text-sm font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2" :disabled="isSubmitting">
                <span v-if="isSubmitting">Submitting...</span>
                <span v-else>{{ currentStep === totalSteps ? 'Submit Solution' : 'Continue' }}</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  </div>
  <AppFooter/>
</template>