<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const isLoading = ref(false)

const form = ref({
  name: '',
  slug: '',
  headline: '',
  description: '',
  industry: 'FinTech',
  location: '',
  website: '',
  stage: 'Seed',
  logo: '', // Managed by ImageUpload
  featured: false,
  // Tech Stack Data
  stack: [] as string[],
  stackInput: ''
})

// Auto-generate slug from name
watch(() => form.value.name, (newName) => {
  form.value.slug = newName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
})

// --- TAGGING LOGIC ---
const addTag = () => {
  const val = form.value.stackInput.trim()
  // Prevent duplicates and empty strings
  if (val && !form.value.stack.includes(val)) {
    form.value.stack.push(val)
  }
  form.value.stackInput = ''
}

const removeTag = (index: number) => {
  form.value.stack.splice(index, 1)
}

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await $fetch('/api/companies', {
      method: 'POST',
      body: form.value
    })
    alert('Company Created Successfully!')
    router.push('/admin/dashboard')
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Error creating company')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-black text-gray-900">New Company</h1>
      <NuxtLink to="/admin/dashboard" class="text-sm font-bold text-gray-500 hover:text-black">Cancel</NuxtLink>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <!-- Name & Slug -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Company Name</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="PayFlow" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Slug (URL)</label>
          <input v-model="form.slug" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors bg-gray-50" />
        </div>
      </div>

      <!-- LOGO UPLOAD -->
      <div>
         <ImageUpload v-model="form.logo" label="Company Logo" />
      </div>

      <!-- Headline -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Headline (One Liner)</label>
        <input v-model="form.headline" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Simplifying cross-border payments." />
      </div>

      <!-- Industry & Stage -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Industry</label>
          <select v-model="form.industry" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white">
            <option>FinTech</option>
<option>HealthTech</option>
<option>AgriTech</option>
<option>Logistics</option>
<option>EdTech</option>
<option>Clean Energy</option>
<option>E-Commerce</option>
<option>Real Estate</option>
<option>Manufacturing</option>
<option>Telecommunications</option>
<option>Media & Entertainment</option>
<option>Retail</option>
<option>Transportation</option>
<option>Hospitality</option>
<option>Cybersecurity</option>
<option>Artificial Intelligence</option>
<option>Software Development</option>
<option>Cloud Computing</option>
<option>Gaming</option>
<option>Fashion & Apparel</option>
<option>Food & Beverage</option>
<option>Automotive</option>
<option>Aerospace & Defense</option>
<option>Pharmaceuticals</option>
<option>Insurance</option>
<option>Banking</option>
<option>Construction</option>
<option>Mining</option>
<option>Oil & Gas</option>
<option>Utilities</option>
<option>Tourism</option>
<option>Sports & Recreation</option>
<option>Beauty & Wellness</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Stage</label>
          <select v-model="form.stage" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white">
            <option>Bootstrapped</option>
<option>Pre-Seed</option>
<option>Seed</option>
<option>Series A</option>
<option>Series B+</option>
<option>Series B</option>
<option>Series C</option>
<option>Series D</option>
<option>Series E</option>
<option>Series F+</option>
<option>Growth Stage</option>
<option>Late Stage</option>
<option>Pre-IPO</option>
<option>IPO</option>
<option>Private Equity</option>
<option>Acquisition</option>
<option>Grant Funding</option>
<option>Angel Investment</option>
<option>Venture Capital</option>
<option>Crowdfunding</option>
<option>Debt Financing</option>
          </select>
        </div>
      </div>

      <!-- Location & Website -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Location</label>
          <input v-model="form.location" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Lagos, Nigeria" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Website</label>
          <input v-model="form.website" type="url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="https://" />
        </div>
      </div>

      <!-- TECH STACK INPUT -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-2">Tech Stack</label>
        <div class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex flex-wrap gap-2 items-center focus-within:border-black focus-within:ring-1 focus-within:ring-black transition-all min-h-[46px]">
          
          <!-- Tags -->
          <span v-for="(tag, i) in form.stack" :key="tag" class="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-in fade-in zoom-in duration-200">
            {{ tag }}
            <button @click="removeTag(i)" type="button" class="hover:text-gray-300 focus:outline-none font-mono">×</button>
          </span>
          
          <!-- Input -->
          <input 
            v-model="form.stackInput" 
            @keydown.enter.prevent="addTag" 
            @keydown.backspace="form.stackInput === '' && form.stack.pop()"
            type="text" 
            class="outline-none text-sm flex-grow min-w-[100px] bg-transparent" 
            placeholder="Type & Enter (e.g. Vue)..." 
          />
        </div>
        <p class="text-[10px] text-gray-400 mt-1">Press Enter to add a technology.</p>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Full Description</label>
        <textarea v-model="form.description" rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Describe the company's mission and product..."></textarea>
      </div>

      <!-- Toggles -->
      <div class="flex items-center gap-3 border-t border-gray-100 pt-4">
        <input v-model="form.featured" type="checkbox" id="feat" class="w-4 h-4 text-black rounded border-gray-300 focus:ring-black accent-black" />
        <label for="feat" class="text-sm font-bold text-gray-900 cursor-pointer">Feature this company (Homepage)</label>
      </div>

      <!-- Submit -->
      <div class="pt-4">
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ isLoading ? 'Saving...' : 'Create Company' }}
        </button>
      </div>

    </form>
  </div>
</template>