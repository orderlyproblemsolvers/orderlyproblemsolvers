<script setup lang="ts">
import { ref } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()

const props = defineProps<{
  modelValue: string // The current URL
  label?: string
}>()

const emit = defineEmits(['update:modelValue'])

const isUploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const CLOUD_NAME = config.public.cloudinaryCloudName
const UPLOAD_PRESET = config.public.cloudinaryUploadPreset

const handleFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  await uploadToCloudinary(file)
}

const uploadToCloudinary = async (file: File) => {
  isUploading.value = true
  
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    
    if (data.secure_url) {
      emit('update:modelValue', data.secure_url)
    } else {
      alert('Upload failed')
    }
  } catch (e) {
    console.error(e)
    alert('Error uploading image')
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div>
    <label v-if="label" class="block text-xs font-bold uppercase text-gray-500 mb-2">{{ label }}</label>
    
    <!-- PREVIEW STATE -->
    <div v-if="modelValue" class="relative group">
      <img :src="modelValue" class="w-full h-48 object-cover rounded-lg border border-gray-200" />
      <button 
        @click="emit('update:modelValue', '')"
        class="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
    </div>

    <!-- UPLOAD STATE -->
    <div 
      v-else
      @click="fileInput?.click()"
      class="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
    >
      <div v-if="isUploading" class="text-blue-600 flex flex-col items-center">
         <div class="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-2"></div>
         <span class="text-xs font-bold uppercase">Uploading...</span>
      </div>
      <div v-else class="text-gray-400 flex flex-col items-center">
         <svg class="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
         <span class="text-xs font-bold uppercase">Click to Upload Image</span>
      </div>
      <input 
        ref="fileInput" 
        type="file" 
        accept="image/*" 
        class="hidden" 
        @change="handleFile" 
      />
    </div>
  </div>
</template>