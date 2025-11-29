<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const isLoading = ref(false)

// 1. FETCH COMPANIES
const { data: companies } = await useFetch('/api/companies')

const form = ref({
  name: '',
  slug: '',
  role: '',
  bio: '',
  location: '',
  // 🚨 NEW FIELDS
  email: '',
  website: '',
  companyId: null as number | null,
  avatar: '', 
  featured: false,
  stack: [] as string[],
  stackInput: ''
})

// 2. AUTO-SLUG
watch(() => form.value.name, (newName) => {
  form.value.slug = newName.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
})

// 3. TAGGING LOGIC
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

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await $fetch('/api/people', {
      method: 'POST',
      body: form.value
    })
    alert('Person Added Successfully!')
    router.push('/admin/dashboard')
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Error creating profile')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-black text-gray-900">Add Person</h1>
      <NuxtLink to="/admin/dashboard" class="text-sm font-bold text-gray-500 hover:text-black">Cancel</NuxtLink>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <!-- Name & Slug -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Sarah Jenkins" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Slug</label>
          <input v-model="form.slug" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-gray-50" />
        </div>
      </div>

      <!-- AVATAR UPLOAD -->
      <div>
         <ImageUpload v-model="form.avatar" label="Profile Picture" />
      </div>

      <!-- Role & Company -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Role / Title</label>
          <input v-model="form.role" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Senior Engineer" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Company</label>
          <select v-model="form.companyId" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none bg-white">
            <option :value="null">Freelance / Unemployed</option>
            <option v-for="comp in companies" :key="comp.id" :value="comp.id">
              {{ comp.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- CONTACT DETAILS (NEW SECTION) -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Email (Public)</label>
          <input v-model="form.email" type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="contact@example.com" />
        </div>
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Website / Portfolio</label>
          <input v-model="form.website" type="url" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="https://" />
        </div>
      </div>

      <!-- Location -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Location</label>
        <input v-model="form.location" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Remote / Lagos" />
      </div>

      <!-- TECH STACK INPUT -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-2">Skills / Stack</label>
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
            placeholder="Type & Enter (e.g. Rust)..." 
          />
        </div>
        <p class="text-[10px] text-gray-400 mt-1">Press Enter to add a skill.</p>
      </div>

      <!-- Bio -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Short Bio</label>
        <textarea v-model="form.bio" rows="3" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" placeholder="Brief professional summary..."></textarea>
      </div>

      <!-- Toggles -->
      <div class="flex items-center gap-3 border-t border-gray-100 pt-4">
        <input v-model="form.featured" type="checkbox" id="feat" class="w-4 h-4 text-black rounded border-gray-300 focus:ring-black accent-black" />
        <label for="feat" class="text-sm font-bold text-gray-900 cursor-pointer">Featured Solver</label>
      </div>

      <!-- Submit -->
      <div class="pt-4">
        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3 bg-black text-white font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ isLoading ? 'Saving...' : 'Add Person' }}
        </button>
      </div>

    </form>
  </div>
</template>