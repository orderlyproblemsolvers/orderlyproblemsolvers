<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { SOLUTION_CATEGORIES } from '~/utils/constants'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const isLoading = ref(false)

// Define the shape of a selected tech item
interface TechItem {
  name: string
  category: string
}

// FORM STATE
const form = ref({
  name: '',
  slug: '',
  headline: '',
  description: '',
  industry: 'FinTech',
  location: '',
  website: '',
  stage: 'Seed',
  logo: '', // Managed by ImageUpload component
  featured: false,
  
  // ✅ REFACTORED: Stack is now an array of objects
  stack: [] as TechItem[],
  
  // ✅ NEW: Local state for the "Add Tech" inputs
  currentTechCategory: SOLUTION_CATEGORIES[0] as string,
  currentTechName: '',

  // Video Data
  videos: [] as string[],
  videoInput: ''
})

// Auto-generate slug from name
watch(() => form.value.name, (newName) => {
  form.value.slug = newName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
})

// --- TECH STACK LOGIC (Refactored) ---
const addTech = () => {
  const name = form.value.currentTechName.trim()
  const category = form.value.currentTechCategory

  if (!name) return

  // Check for duplicates
  const exists = form.value.stack.find(t => t.name.toLowerCase() === name.toLowerCase())
  
  if (exists) {
    alert(`'${name}' is already added under ${exists.category}.`)
    return
  }

  // Add to local list
  form.value.stack.push({ name, category })
  
  // Reset Name input only (keep category selected for speed)
  form.value.currentTechName = ''
}

const removeTech = (index: number) => {
  form.value.stack.splice(index, 1)
}

// --- VIDEO LOGIC ---
const addVideo = () => {
  const val = form.value.videoInput.trim()
  if (val) {
    if (val.includes('youtube.com') || val.includes('youtu.be')) {
      form.value.videos.push(val)
      form.value.videoInput = ''
    } else {
      alert('Please enter a valid YouTube URL')
    }
  }
}

const removeVideo = (index: number) => {
  form.value.videos.splice(index, 1)
}

// --- SUBMISSION ---
const handleSubmit = async () => {
  isLoading.value = true
  try {
    // The API now expects form.stack to be array of { name, category }
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
  <div class="max-w-3xl mx-auto py-10">
    
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-black text-gray-900">New Company</h1>
        <p class="text-sm text-gray-500">Add an entity to the global index.</p>
      </div>
      <NuxtLink to="/admin/dashboard" class="text-sm font-bold text-gray-500 hover:text-black">Cancel</NuxtLink>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Company Name</label>
            <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="PayFlow" />
          </div>
          <div>
            <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Slug (URL)</label>
            <input v-model="form.slug" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors bg-gray-50" />
          </div>
        </div>

        <div>
           <ImageUpload v-model="form.logo" label="Company Logo" />
        </div>

        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Headline (One Liner)</label>
          <input v-model="form.headline" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Simplifying cross-border payments." />
        </div>
      </div>

      <hr class="border-gray-100" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </select>
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Stage</label>
          <select v-model="form.stage" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white">
            <option>Seed</option>
            <option>Series A</option>
            <option>Series B</option>
            <option>Series C+</option>
            <option>IPO</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Location</label>
          <input v-model="form.location" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Lagos, Nigeria" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Website</label>
          <input v-model="form.website" type="url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="https://" />
        </div>
      </div>

      <hr class="border-gray-100" />

      <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div class="flex items-center justify-between mb-4">
           <label class="block text-xs font-bold uppercase text-gray-500">Tech Stack & Solutions</label>
           <span class="text-[10px] text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-full">{{ form.stack.length }} added</span>
        </div>

        <div class="flex flex-col md:flex-row gap-3 mb-4">
          <div class="md:w-1/2">
            <select v-model="form.currentTechCategory" class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-black outline-none bg-white">
              <option v-for="cat in SOLUTION_CATEGORIES" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>

          <div class="md:w-1/2 flex gap-2">
            <input 
              v-model="form.currentTechName" 
              @keydown.enter.prevent="addTech"
              type="text" 
              class="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-black outline-none"
              placeholder="Tech Name (e.g. Stripe)" 
            />
            <button 
              @click.prevent="addTech"
              type="button" 
              class="px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add
            </button>
          </div>
        </div>

        <div v-if="form.stack.length > 0" class="flex flex-wrap gap-2">
          <div 
            v-for="(item, i) in form.stack" 
            :key="i" 
            class="group flex items-center gap-2 bg-white border border-gray-300 rounded-md pl-2 pr-1 py-1.5 shadow-sm animate-in zoom-in duration-200"
          >
            <div class="flex flex-col leading-none pr-1">
              <span class="text-[9px] text-gray-400 uppercase font-bold mb-0.5">{{ item.category }}</span>
              <span class="text-xs font-bold text-gray-900">{{ item.name }}</span>
            </div>
            <button @click="removeTech(i)" type="button" class="text-gray-300 hover:text-red-500 hover:bg-red-50 rounded p-1 transition-colors">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>
        
        <div v-else class="text-center py-6 border border-dashed border-gray-300 rounded-lg">
          <p class="text-xs text-gray-400 italic">No technologies added yet.</p>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-2">YouTube Videos</label>
        
        <div class="flex gap-2 mb-3">
          <input 
            v-model="form.videoInput" 
            @keydown.enter.prevent="addVideo"
            type="url" 
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" 
            placeholder="Paste YouTube URL..." 
          />
          <button 
            @click.prevent="addVideo"
            type="button"
            class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-black font-bold rounded-lg text-xs uppercase transition-colors"
          >
            Add
          </button>
        </div>

        <div v-if="form.videos.length > 0" class="space-y-2">
          <div v-for="(vid, i) in form.videos" :key="i" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div class="flex items-center gap-2 overflow-hidden">
              <svg class="w-4 h-4 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span class="text-xs text-gray-600 truncate">{{ vid }}</span>
            </div>
            <button @click="removeVideo(i)" type="button" class="text-red-500 hover:text-red-700 font-bold text-xs transition-colors">Remove</button>
          </div>
        </div>
      </div>

      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Full Description</label>
        <RichEditor v-model="form.description" />
      </div>

      <div class="flex items-center gap-3 border-t border-gray-100 pt-4">
        <input v-model="form.featured" type="checkbox" id="feat" class="w-4 h-4 text-black rounded border-gray-300 focus:ring-black accent-black" />
        <label for="feat" class="text-sm font-bold text-gray-900 cursor-pointer">Feature this company</label>
      </div>

      <div class="pt-4">
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm uppercase tracking-widest"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ isLoading ? 'Saving Entity...' : 'Create Company' }}
        </button>
      </div>

    </form>
  </div>
</template>