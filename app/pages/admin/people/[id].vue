<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const route = useRoute()
const id = route.params.id as string
const isLoading = ref(false)

// 1. FETCH EXISTING DATA & COMPANIES LIST
const { data: existingData, pending } = await useFetch(`/api/admin/people/${id}`)
const { data: companies } = await useFetch('/api/companies')

const form = ref({
  name: '',
  slug: '',
  role: '',
  bio: '',
  location: '',
  // Contact Info
  email: '',
  website: '',
  companyId: null as number | null,
  avatar: '',
  featured: false,
  status: 'approved',
  // Stack
  stack: [] as string[],
  stackInput: ''
})

// 2. POPULATE FORM
watch(existingData, (newData) => {
  if (newData) {
    form.value = {
      ...form.value,
      ...newData,
      // Ensure nulls are handled for fields that might be missing
      email: newData.email || '',
      website: newData.website || '',
      stack: newData.stack || [],
      stackInput: ''
    }
  }
}, { immediate: true })

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

const handleUpdate = async () => {
  isLoading.value = true
  try {
    await $fetch(`/api/admin/people/${id}`, {
      method: 'PUT',
      body: form.value
    })
    alert('Profile Updated Successfully!')
    router.push('/admin/people')
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Error updating profile')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-black text-gray-900">Edit Person</h1>
      <div class="flex gap-3">
         <NuxtLink to="/admin/people" class="px-4 py-2 text-sm font-bold text-gray-500 hover:text-black">Cancel</NuxtLink>
         <button 
            @click="handleUpdate" 
            :disabled="isLoading"
            class="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
         >
            {{ isLoading ? 'Saving...' : 'Save Changes' }}
         </button>
      </div>
    </div>

    <div v-if="pending" class="py-20 text-center">
       <div class="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin mx-auto"></div>
    </div>

    <form v-else @submit.prevent="handleUpdate" class="space-y-6 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <!-- Name & Slug -->
      <div class="grid grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Full Name</label>
          <input v-model="form.name" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" />
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
          <input v-model="form.role" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" />
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

      <!-- CONTACT DETAILS -->
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
        <input v-model="form.location" type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-black outline-none transition-colors" />
      </div>

      <!-- TECH STACK INPUT -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-2">Skills / Stack</label>
        <div class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex flex-wrap gap-2 items-center focus-within:border-black transition-all min-h-[46px]">
          <span v-for="(tag, i) in form.stack" :key="tag" class="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
            {{ tag }}
            <button @click="removeTag(i)" type="button" class="hover:text-gray-300">&times;</button>
          </span>
          <input 
            v-model="form.stackInput" 
            @keydown.enter.prevent="addTag" 
            @keydown.backspace="form.stackInput === '' && form.stack.pop()"
            type="text" 
            class="outline-none text-sm flex-grow min-w-[100px] bg-transparent" 
            placeholder="Type & Enter..." 
          />
        </div>
      </div>

      <!-- Bio -->
      <div>
        <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Short Bio</label>
       <RichEditor v-model="form.bio" />
      </div>

      <!-- Meta Toggles -->
      <div class="border-t border-gray-100 pt-4 space-y-3">
         <div class="flex items-center gap-3">
           <input v-model="form.featured" type="checkbox" id="feat" class="w-4 h-4 text-black rounded border-gray-300 focus:ring-black accent-black" />
           <label for="feat" class="text-sm font-bold text-gray-900 cursor-pointer">Featured Solver</label>
         </div>
         
         <div class="flex items-center gap-3">
           <label class="text-sm font-bold text-gray-500">Status:</label>
           <select v-model="form.status" class="px-2 py-1 border border-gray-300 rounded text-xs font-bold uppercase">
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
           </select>
         </div>
      </div>

    </form>
  </div>
</template>