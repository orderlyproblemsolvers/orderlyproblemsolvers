<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const route = useRoute()
const id = route.params.id as string
const isLoading = ref(false)

// ── TOAST ──────────────────────────────────────────────────────
type ToastType = 'success' | 'error' | 'info'
const toast = ref<{ show: boolean; message: string; type: ToastType }>({
  show: false, message: '', type: 'success'
})
let toastTimer: ReturnType<typeof setTimeout>
const showToast = (message: string, type: ToastType = 'success') => {
  clearTimeout(toastTimer)
  toast.value = { show: true, message, type }
  toastTimer = setTimeout(() => { toast.value.show = false }, 3500)
}

// ── FETCH DATA ──────────────────────────────────────────────────
// Fetch existing person data
const { data: existingData, pending } = await useFetch(`/api/admin/people/${id}`)

// Lazy load companies so the page renders quickly
const { data: companies, pending: companiesPending } = await useFetch('/api/companies', {
  lazy: true
})

// ── ROLES MASTER LIST ───────────────────────────────────────────
const ROLES_LIST = [
  'Founder', 'CTO', 'VPE (VP of Engineering)', 'Product Manager',
  'Product Designer', 'Backend Engineer', 'Frontend Engineer',
  'Full-Stack Engineer', 'Mobile Developer (iOS/Android)',
  'DevOps Engineer', 'SRE', 'Data Scientist', 'Data Engineer',
  'QA Engineer', 'Security Engineer', 'Growth Lead',
  'Bioinformatician', 'Embedded Systems Engineer', 'Hardware Engineer',
  'Unity Developer', 'Unreal Engine Developer', 'GIS Specialist',
  'Security Researcher', 'Blockchain Developer', 'Smart Contract Auditor',
  'Robotics Engineer', 'Machine Learning Engineer', 'Computer Vision Engineer',
  'Compliance Officer', 'Legal Engineer', 'Sustainability Consultant',
  'BIM Manager', 'Supply Chain Analyst', 'Clinical Operations Manager',
  'Gaming Economist', 'Technical Artist'
]

// ── FORM DATA ───────────────────────────────────────────────────
const form = ref({
  name: '',
  slug: '',
  role: '',
  bio: '',
  location: '',
  email: '',
  website: '',
  linkedin: '', // Frontend only field
  github: '',   // Frontend only field
  companyId: null as number | null,
  avatar: '',
  featured: false,
  status: 'approved',
  stack: [] as string[],
  stackInput: '',
  videos: [] as string[],
  videoInput: ''
})

// ── POPULATE FORM & EXTRACT SOCIALS ─────────────────────────────
watch(existingData, (newData: any) => {
  if (newData) {
    let extractedBio = newData.bio || ''
    let extractedLinkedin = ''
    let extractedGithub = ''

    // The Hack in Reverse: Find the appended socials block and extract the URLs
    const socialsMatch = extractedBio.match(/<br><br><p><strong>Socials:<\/strong>(.*?)<\/p>/)
    if (socialsMatch) {
      const socialsHtml = socialsMatch[1] // Get the stuff between the <p> tags
      
      // Extract LinkedIn
      if (socialsHtml.includes('LinkedIn')) {
        const liMatch = socialsHtml.match(/href="([^"]+)"[^>]*>LinkedIn/)
        if (liMatch) extractedLinkedin = liMatch[1]
      }
      // Extract GitHub
      if (socialsHtml.includes('GitHub')) {
        const ghMatch = socialsHtml.match(/href="([^"]+)"[^>]*>GitHub/)
        if (ghMatch) extractedGithub = ghMatch[1]
      }

      // Remove the appended block from the bio so it doesn't show in the RichEditor
      extractedBio = extractedBio.replace(/<br><br><p><strong>Socials:<\/strong>.*?<\/p>/, '')
    }

    form.value = {
      ...form.value,
      ...newData,
      bio: extractedBio,
      linkedin: extractedLinkedin,
      github: extractedGithub,
      email: newData.email || '',
      website: newData.website || '',
      stack: newData.stack || [],
      videos: newData.videos || [], 
      stackInput: '',
      videoInput: ''
    }
  }
}, { immediate: true })

// ── AUTO SLUG ───────────────────────────────────────────────────
// Optional: You might want to remove this on the Edit page so the slug doesn't 
// accidentally change and break existing links. I've left it here, but 
// consider commenting it out if slugs are permanent.
watch(() => form.value.name, (val) => {
  if (!existingData.value?.slug) { // Only auto-gen if it was somehow blank
    form.value.slug = val
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/--+/g, '-')
  }
})

// ── TAGGING LOGIC ───────────────────────────────────────────────
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

// ── VIDEO LOGIC ─────────────────────────────────────────────────
const addVideo = () => {
  const val = form.value.videoInput.trim()
  if (val) {
    if (val.includes('youtube.com') || val.includes('youtu.be')) {
      form.value.videos.push(val)
      form.value.videoInput = ''
    } else {
      showToast('Please enter a valid YouTube URL', 'error')
    }
  }
}

const removeVideo = (index: number) => {
  form.value.videos.splice(index, 1)
}

// ── UPDATE (WITH BIO APPEND WORKAROUND) ─────────────────────────
const handleUpdate = async () => {
  if (!form.value.name.trim()) return showToast('Full name is required', 'error')
  
  isLoading.value = true
  try {
    // 1. Intercept and format the bio just like in the New page
    let finalBio = form.value.bio || ''
    const socials = []
    
    if (form.value.linkedin) socials.push(`<a href="${form.value.linkedin}" target="_blank" rel="noopener" class="text-blue-600 hover:underline">LinkedIn</a>`)
    if (form.value.github) socials.push(`<a href="${form.value.github}" target="_blank" rel="noopener" class="text-blue-600 hover:underline">GitHub</a>`)

    if (socials.length > 0) {
      finalBio += `<br><br><p><strong>Socials:</strong> ${socials.join(' | ')}</p>`
    }

    // 2. Create the payload
    const payload = {
      ...form.value,
      bio: finalBio // Sending the modified bio!
    }
    
    // Clean up the temporary frontend fields before sending
    delete payload.linkedin
    delete payload.github
    delete payload.stackInput
    delete payload.videoInput

    await $fetch(`/api/admin/people/${id}`, {
      method: 'PUT',
      body: payload
    })
    
    showToast('Profile Updated Successfully!', 'success')
    setTimeout(() => router.push('/admin/people'), 1200)
  } catch (e: any) {
    showToast(e.data?.statusMessage || 'Error updating profile', 'error')
  } finally {
    isLoading.value = false
  }
}

const labelClass = 'text-xs font-bold uppercase tracking-wide text-black'
const companyOptions = computed(() => [
  { label: 'Freelance / Independent', value: null },
  ...(companies.value ?? []).map((c: any) => ({ label: c.name, value: c.id })),
])
</script>

<template>
  <div class="page-root max-w-2xl mx-auto">
    
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="toast.show"
        :class="[
          'fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-semibold border',
          toast.type === 'success' && 'bg-white text-gray-900 border-gray-200',
          toast.type === 'error'   && 'bg-red-50 text-red-700 border-red-200',
          toast.type === 'info'    && 'bg-blue-50 text-blue-700 border-blue-200',
        ]"
      >
        <span v-if="toast.type === 'success'" class="w-2 h-2 rounded-full bg-green-500 shrink-0" />
        <span v-if="toast.type === 'error'"   class="w-2 h-2 rounded-full bg-red-500 shrink-0" />
        <span v-if="toast.type === 'info'"    class="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
        {{ toast.message }}
        <button class="ml-2 text-gray-400 hover:text-gray-700 transition-colors font-black" @click="toast.show = false">×</button>
      </div>
    </Transition>

    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-black text-gray-900">Edit Person</h1>
      <div class="flex gap-3">
         <UButton variant="ghost" color="neutral" to="/admin/people">Cancel</UButton>
         <UButton 
            color="black"
            :loading="isLoading"
            @click="handleUpdate"
         >
            Save Changes
         </UButton>
      </div>
    </div>

    <div v-if="pending" class="py-20 flex justify-center">
       <div class="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin"></div>
    </div>

    <form v-else @submit.prevent="handleUpdate" class="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">
      
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Full Name" :ui="{ label: labelClass }">
          <UInput v-model="form.name" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
        <UFormField label="Slug" :ui="{ label: labelClass }">
          <UInput v-model="form.slug" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
      </div>

      <ImageUpload v-model="form.avatar" label="Profile Picture" />

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Role / Title" :ui="{ label: labelClass }">
          <USelectMenu
            v-model="form.role"
            :options="ROLES_LIST"
            searchable
            class="w-full"
            :ui="{ base: 'bg-gray-50 text-black' }"
          />
        </UFormField>
        <UFormField label="Company" :ui="{ label: labelClass }">
          <USelect
            v-model="form.companyId"
            :items="companyOptions"
            :loading="companiesPending"
            value-key="value"
            label-key="label"
            class="w-full"
            :ui="{ base: 'bg-gray-50 text-black' }"
          />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Email (Public)" :ui="{ label: labelClass }">
          <UInput v-model="form.email" type="email" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
        <UFormField label="Website / Portfolio" :ui="{ label: labelClass }">
          <UInput v-model="form.website" type="url" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="LinkedIn URL" :ui="{ label: labelClass }">
          <UInput v-model="form.linkedin" type="url" placeholder="https://linkedin.com/in/..." class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
        <UFormField label="GitHub URL" :ui="{ label: labelClass }">
          <UInput v-model="form.github" type="url" placeholder="https://github.com/..." class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
      </div>

      <UFormField label="Location" :ui="{ label: labelClass }">
        <UInput v-model="form.location" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
      </UFormField>

      <div>
        <label :class="labelClass + ' block mb-2'">Skills / Stack</label>
        <div class="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-black/20 focus-within:border-black transition-all min-h-[46px]">
          <span
            v-for="(tag, i) in form.stack"
            :key="i"
            class="bg-black text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1"
          >
            {{ tag }}
            <button type="button" class="hover:text-gray-300 font-mono" @click="removeTag(i)">×</button>
          </span>
          <input
            v-model="form.stackInput"
            type="text"
            class="outline-none text-sm grow min-w-[120px] bg-transparent text-black placeholder-gray-400"
            placeholder="Type & press Enter..."
            @keydown.enter.prevent="addTag"
            @keydown.backspace="form.stackInput === '' && form.stack.pop()"
          />
        </div>
      </div>

      <div>
        <label :class="labelClass + ' block mb-2'">YouTube Videos</label>
        <div class="flex gap-2 mb-3">
          <UInput
            v-model="form.videoInput"
            type="url"
            placeholder="Paste YouTube URL..."
            class="flex-1"
            :ui="{ base: 'bg-gray-50 text-black' }"
            @keydown.enter.prevent="addVideo"
          />
          <UButton variant="outline" color="neutral" type="button" @click="addVideo">Add</UButton>
        </div>

        <div v-if="form.videos.length > 0" class="space-y-2">
          <div v-for="(vid, i) in form.videos" :key="i" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div class="flex items-center gap-2 overflow-hidden">
              <svg class="w-4 h-4 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span class="text-xs text-gray-600 truncate">{{ vid }}</span>
            </div>
            <button type="button" class="text-red-500 hover:text-red-700 text-xs font-bold transition-colors shrink-0 ml-2" @click="removeVideo(i)">Remove</button>
          </div>
        </div>
      </div>

      <div>
        <label :class="labelClass + ' block mb-2'">Short Bio</label>
        <ClientOnly>
          <RichEditor v-model="form.bio" />
        </ClientOnly>
      </div>

      <div class="border-t border-gray-100 pt-5 space-y-4">
         <div class="flex items-center gap-3">
           <USwitch v-model="form.featured" color="neutral" />
           <label class="text-sm font-bold text-gray-900 cursor-pointer" @click="form.featured = !form.featured">
             Featured Solver
           </label>
         </div>
         
         <UFormField label="Account Status" :ui="{ label: labelClass }">
           <USelect
             v-model="form.status"
             :items="[{label: 'Pending', value: 'pending'}, {label: 'Approved', value: 'approved'}, {label: 'Rejected', value: 'rejected'}]"
             value-key="value"
             label-key="label"
             class="w-48"
             :ui="{ base: 'bg-white text-black' }"
           />
         </UFormField>
      </div>

    </form>
  </div>
</template>

<style scoped>
.page-root {
  --ui-primary: var(--color-neutral-900);
  --ui-primary-50: var(--color-neutral-50);
  --ui-primary-100: var(--color-neutral-100);
  --ui-primary-200: var(--color-neutral-200);
  --ui-primary-300: var(--color-neutral-300);
  --ui-primary-400: var(--color-neutral-400);
  --ui-primary-500: var(--color-neutral-900);
  --ui-primary-600: var(--color-neutral-800);
  --ui-primary-700: var(--color-neutral-700);
  --ui-primary-800: var(--color-neutral-800);
  --ui-primary-900: var(--color-neutral-900);
  --ui-primary-950: var(--color-neutral-950);
}

.page-root :deep([data-variant="ghost"]:hover),
.page-root :deep([data-variant="ghost"]:focus-visible) {
  background-color: #f9fafb;
}
</style>