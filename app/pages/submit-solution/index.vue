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
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="sticky top-0 z-30 bg-white/95 dark:bg-[#051C2C]/95 backdrop-blur border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div class="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        
        <div class="flex items-center gap-4">
           <span class="w-2 h-2 bg-[#00A9F4] animate-pulse rounded-full"></span>
           <span class="text-xs font-bold uppercase tracking-[0.2em] text-[#051C2C] dark:text-white">Application Protocol</span>
        </div>

        <div class="hidden md:flex items-center gap-8">
          <div v-for="step in totalSteps" :key="step" class="flex items-center gap-2">
             <span 
               class="font-mono text-sm font-bold"
               :class="currentStep === step ? 'text-[#00A9F4]' : (currentStep > step ? 'text-[#051C2C] dark:text-white' : 'text-gray-300 dark:text-gray-700')"
             >
               0{{ step }}
             </span>
             <span v-if="step < totalSteps" class="text-gray-200 dark:text-gray-800 text-xs">//</span>
          </div>
        </div>

        <div class="md:hidden font-mono text-xs text-[#00A9F4]">
          STEP 0{{ currentStep }} / 0{{ totalSteps }}
        </div>

      </div>
      
      <div class="absolute bottom-0 left-0 h-[2px] bg-[#00A9F4] transition-all duration-500 ease-in-out" :style="{ width: `${progress}%` }"></div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
      
      <div v-if="isSuccess" class="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div class="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A253A] p-8 lg:p-12 relative overflow-hidden">
           
           <div class="absolute top-0 left-0 w-full h-2 bg-[radial-gradient(circle,transparent_50%,#051C2C_50%)] dark:bg-[radial-gradient(circle,transparent_50%,#fff_50%)] bg-[length:16px_16px] opacity-10"></div>

           <div class="text-center mb-10">
              <div class="inline-flex items-center justify-center w-16 h-16 border-2 border-[#00A9F4] rounded-full text-[#00A9F4] mb-6">
                 <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              </div>
              <h2 class="text-4xl font-serif text-[#051C2C] dark:text-white mb-2">Submission Received</h2>
              <p class="font-mono text-xs text-gray-500 uppercase tracking-widest">Logged at {{ new Date().toLocaleTimeString() }}</p>
           </div>

           <div class="space-y-4 font-mono text-sm border-t border-b border-gray-200 dark:border-gray-700 py-6 mb-8 border-dashed">
              <div class="flex justify-between">
                 <span class="text-gray-500 uppercase">Ref ID</span>
                 <span class="font-bold text-[#051C2C] dark:text-white">{{ submissionId }}</span>
              </div>
              <div class="flex justify-between">
                 <span class="text-gray-500 uppercase">Entity</span>
                 <span class="font-bold text-[#051C2C] dark:text-white">{{ form.name }}</span>
              </div>
              <div class="flex justify-between">
                 <span class="text-gray-500 uppercase">Category</span>
                 <span class="font-bold text-[#051C2C] dark:text-white uppercase">{{ form.type }}</span>
              </div>
              <div class="flex justify-between">
                 <span class="text-gray-500 uppercase">Status</span>
                 <span class="font-bold text-[#00A9F4] uppercase animate-pulse">Queued for Verification</span>
              </div>
           </div>

           <div class="text-center">
              <p class="text-xs text-gray-500 mb-6 leading-relaxed">
                 Our editorial board reviews all submissions within 48 hours. You will be notified via {{ form.email }} upon approval.
              </p>
              <NuxtLink to="/" class="inline-block px-8 py-4 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity">
                 Return to Index
              </NuxtLink>
           </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        <div class="hidden lg:block lg:col-span-4">
          <div class="sticky top-32">
            <h1 class="text-6xl font-serif text-[#051C2C] dark:text-white mb-6 leading-[0.9]">
              Add to<br/> <span class="text-[#00A9F4]">The Index.</span>
            </h1>
            <p class="text-lg text-gray-500 dark:text-gray-400 mb-12 leading-relaxed font-light">
              Join the definitive directory of problem solvers. Verification grants you visibility to investors, partners, and talent.
            </p>
            
            <div class="border-l-2 border-[#00A9F4] pl-6 py-2">
               <h4 class="font-bold text-xs uppercase tracking-widest text-[#051C2C] dark:text-white mb-2">Guidance</h4>
               <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                 We don't just list names. We list solutions. Providing a clear case study (The Problem & The Fix) increases your chance of verification by 80%.
               </p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-8">
          <form @submit.prevent class="space-y-12">
            
            <div v-if="currentStep === 1" class="space-y-10 animate-in slide-in-from-right-8 fade-in duration-500">
              
              <div>
                <label class="block font-mono text-xs text-gray-400 uppercase mb-4">Select Entity Type</label>
                <div class="grid grid-cols-2 gap-6">
                  <div 
                    @click="form.type = 'person'" 
                    class="cursor-pointer h-32 border flex flex-col items-center justify-center transition-all duration-300" 
                    :class="form.type === 'person' ? 'border-[#00A9F4] bg-[#00A9F4]/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'"
                  >
                    <span class="text-2xl mb-2" :class="form.type === 'person' ? 'text-[#00A9F4]' : 'text-gray-300'">●</span>
                    <span class="font-bold text-xs uppercase tracking-widest" :class="form.type === 'person' ? 'text-[#051C2C] dark:text-white' : 'text-gray-400'">Individual</span>
                  </div>
                  <div 
                    @click="form.type = 'company'" 
                    class="cursor-pointer h-32 border flex flex-col items-center justify-center transition-all duration-300" 
                    :class="form.type === 'company' ? 'border-[#00A9F4] bg-[#00A9F4]/5' : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'"
                  >
                    <span class="text-2xl mb-2" :class="form.type === 'company' ? 'text-[#00A9F4]' : 'text-gray-300'">■</span>
                    <span class="font-bold text-xs uppercase tracking-widest" :class="form.type === 'company' ? 'text-[#051C2C] dark:text-white' : 'text-gray-400'">Organization</span>
                  </div>
                </div>
              </div>

              <div class="space-y-8">
                <div>
                  <label class="block font-mono text-xs text-gray-400 uppercase mb-2">Official Name</label>
                  <input v-model="form.name" type="text" class="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-3 text-lg font-serif text-[#051C2C] dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:border-[#00A9F4] focus:outline-none transition-colors rounded-none" placeholder="e.g. John Doe OR PayStack" />
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label class="block font-mono text-xs text-gray-400 uppercase mb-2">Contact Email</label>
                    <input v-model="form.email" type="email" class="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-3 text-sm font-bold text-[#051C2C] dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:border-[#00A9F4] focus:outline-none transition-colors rounded-none" placeholder="admin@example.com" />
                  </div>
                  <div>
                    <label class="block font-mono text-xs text-gray-400 uppercase mb-2">Public URL</label>
                    <input v-model="form.website" type="url" class="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-3 text-sm font-bold text-[#051C2C] dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:border-[#00A9F4] focus:outline-none transition-colors rounded-none" placeholder="https://" />
                  </div>
                </div>

                <div v-if="form.type === 'person'">
                  <label class="block font-mono text-xs text-gray-400 uppercase mb-2">Current Title</label>
                  <input v-model="form.role" type="text" class="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-3 text-sm font-bold text-[#051C2C] dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:border-[#00A9F4] focus:outline-none transition-colors rounded-none" placeholder="e.g. Lead Systems Architect" />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 2" class="space-y-10 animate-in slide-in-from-right-8 fade-in duration-500">
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label class="block font-mono text-xs text-gray-400 uppercase mb-2">Sector</label>
                  <div class="relative">
                    <select v-model="form.industry" class="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-3 text-sm font-bold text-[#051C2C] dark:text-white focus:border-[#00A9F4] focus:outline-none transition-colors appearance-none rounded-none cursor-pointer">
                      <option value="" disabled selected>SELECT VERTICAL</option>
                      <option v-for="ind in industries" :key="ind" :value="ind">{{ ind }}</option>
                    </select>
                    <span class="absolute right-0 top-3 pointer-events-none text-gray-400">▼</span>
                  </div>
                </div>
                <div>
                  <label class="block font-mono text-xs text-gray-400 uppercase mb-2">HQ Location</label>
                  <input v-model="form.location" type="text" class="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-3 text-sm font-bold text-[#051C2C] dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:border-[#00A9F4] focus:outline-none transition-colors rounded-none" placeholder="e.g. Lagos, Nigeria" />
                </div>
              </div>

              <div>
                <label class="block font-mono text-xs text-gray-400 uppercase mb-4">Technical Stack</label>
                <div class="border border-gray-200 dark:border-gray-700 p-4 min-h-[100px] flex flex-wrap content-start gap-2 bg-gray-50 dark:bg-[#0A253A]">
                  <span v-for="(tag, index) in form.stack" :key="index" class="bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] font-mono text-[10px] uppercase px-3 py-1 flex items-center gap-2">
                    {{ tag }}
                    <button @click="removeTag(index)" class="hover:text-[#00A9F4]">×</button>
                  </span>
                  <input 
                    v-model="form.stackInput" 
                    @keydown.enter.prevent="addTag" 
                    @keydown.backspace="form.stackInput === '' && form.stack.pop()" 
                    type="text" 
                    class="bg-transparent outline-none font-mono text-xs flex-1 min-w-[150px] text-[#051C2C] dark:text-white placeholder-gray-400 uppercase" 
                    placeholder="TYPE TOOL & ENTER..." 
                  />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 3" class="space-y-10 animate-in slide-in-from-right-8 fade-in duration-500">
              
              

              <div class="bg-blue-50 dark:bg-[#00A9F4]/10 border-l-4 border-[#00A9F4] p-6">
                 <p class="font-serif italic text-lg text-[#051C2C] dark:text-white leading-relaxed">
                   "We define verification by results, not hype. Be specific about the engineering constraint and the measurable outcome."
                 </p>
              </div>

              <div class="space-y-8">
                <div>
                   <label class="block font-mono text-xs text-gray-400 uppercase mb-2">01. The Challenge (Constraint)</label>
                   <textarea v-model="form.problem" rows="3" class="w-full bg-transparent border border-gray-200 dark:border-gray-700 p-4 text-sm text-[#051C2C] dark:text-white placeholder-gray-300 dark:placeholder-gray-600 focus:border-[#00A9F4] focus:outline-none transition-colors rounded-none" placeholder="Describe the specific technical or operational bottleneck..."></textarea>
                </div>

                <div>
                   <label class="block font-mono text-xs text-gray-400 uppercase mb-2">02. The Fix (Approach)</label>
                   <textarea v-model="form.solution" rows="4" class="w-full bg-transparent border border-gray-200 dark:border-gray-700 p-4 text-sm text-[#051C2C] dark:text-white placeholder-gray-300 dark:placeholder-gray-600 focus:border-[#00A9F4] focus:outline-none transition-colors rounded-none" placeholder="Detail the architecture, stack choice, or strategy used..."></textarea>
                </div>

                <div>
                   <label class="block font-mono text-xs text-gray-400 uppercase mb-2">03. The Outcome (Metric)</label>
                   <input v-model="form.metric" type="text" class="w-full bg-transparent border-b-2 border-gray-200 dark:border-gray-700 py-3 text-sm font-bold text-[#051C2C] dark:text-white placeholder-gray-300 dark:placeholder-gray-700 focus:border-[#00A9F4] focus:outline-none transition-colors rounded-none" placeholder="e.g. Reduced latency by 400ms." />
                </div>
              </div>
            </div>

            <div v-if="currentStep === 4" class="space-y-10 animate-in slide-in-from-right-8 fade-in duration-500">
              
              <div class="border border-gray-200 dark:border-gray-700 p-8">
                <h3 class="font-mono text-xs font-bold uppercase tracking-widest mb-8 text-[#00A9F4]">Data Verification</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                   <div>
                     <span class="block font-mono text-[10px] text-gray-400 uppercase mb-1">Classification</span>
                     <span class="block font-bold text-lg text-[#051C2C] dark:text-white capitalize">{{ form.type }}</span>
                   </div>
                   <div>
                     <span class="block font-mono text-[10px] text-gray-400 uppercase mb-1">Entity Name</span>
                     <span class="block font-bold text-lg text-[#051C2C] dark:text-white">{{ form.name }}</span>
                   </div>
                   <div>
                     <span class="block font-mono text-[10px] text-gray-400 uppercase mb-1">Origin</span>
                     <span class="block font-bold text-lg text-[#051C2C] dark:text-white">{{ form.location }}</span>
                   </div>
                   <div class="md:col-span-2">
                     <span class="block font-mono text-[10px] text-gray-400 uppercase mb-2">Infrastructure</span>
                     <div class="flex flex-wrap gap-2">
                        <span v-for="tag in form.stack" :key="tag" class="border border-gray-300 dark:border-gray-600 px-2 py-1 text-[10px] font-mono uppercase">{{ tag }}</span>
                     </div>
                   </div>
                </div>
              </div>

              <div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-[#0A253A]">
                <input type="checkbox" id="terms" class="mt-1 w-4 h-4 rounded-none border-gray-400 text-[#00A9F4] focus:ring-0 cursor-pointer" />
                <label for="terms" class="text-sm text-gray-500 dark:text-gray-400 font-light cursor-pointer select-none">
                  I certify that the information provided is accurate and representative of actual work. I agree to the <NuxtLink to="/legal/terms" class="underline decoration-[#00A9F4] text-[#051C2C] dark:text-white">Terms of Service</NuxtLink>.
                </label>
              </div>

            </div>

            <div class="flex items-center gap-6 pt-8 border-t border-gray-100 dark:border-gray-800">
              <button 
                v-if="currentStep > 1" 
                @click="prevStep" 
                type="button" 
                class="px-8 py-4 border border-gray-200 dark:border-gray-700 text-xs font-bold uppercase tracking-widest hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
              >
                Previous
              </button>
              
              <button 
                @click="nextStep" 
                type="button" 
                class="flex-1 px-8 py-4 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:bg-[#00A9F4] dark:hover:bg-[#00A9F4] hover:text-white dark:hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                :disabled="isSubmitting"
              >
                <span v-if="isSubmitting">Processing...</span>
                <span v-else>{{ currentStep === totalSteps ? 'Confirm Submission' : 'Proceed to Next' }}</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  </div>
</template>