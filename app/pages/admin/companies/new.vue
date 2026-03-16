<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { SOLUTION_CATEGORIES } from '~/utils/constants'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
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

// ── TYPES ───────────────────────────────────────────────────────
interface TechItem { name: string; category: string }

// ── FORM DATA ───────────────────────────────────────────────────
const form = ref({
  name: '',
  slug: '',
  headline: '',
  description: '',
  industry: 'FinTech',
  location: '',
  website: '',
  stage: 'Seed',
  logo: '',
  featured: false,
  stack: [] as TechItem[],
  currentTechCategory: SOLUTION_CATEGORIES[0] as string,
  currentTechName: '',
  videos: [] as string[],
  videoInput: '',
})

// ── AUTO SLUG ───────────────────────────────────────────────────
watch(() => form.value.name, (val) => {
  form.value.slug = val
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
})

// ── TECH STACK ──────────────────────────────────────────────────
const addTech = () => {
  const name = form.value.currentTechName.trim()
  const category = form.value.currentTechCategory
  if (!name) return

  const exists = form.value.stack.find(t => t.name.toLowerCase() === name.toLowerCase())
  if (exists) {
    showToast(`'${name}' is already added under ${exists.category}`, 'error')
    return
  }
  form.value.stack.push({ name, category })
  form.value.currentTechName = ''
}

const removeTech = (index: number) => form.value.stack.splice(index, 1)

// ── VIDEOS ──────────────────────────────────────────────────────
const addVideo = () => {
  const val = form.value.videoInput.trim()
  if (!val) return
  if (!val.includes('youtube.com') && !val.includes('youtu.be')) {
    showToast('Please enter a valid YouTube URL', 'error')
    return
  }
  form.value.videos.push(val)
  form.value.videoInput = ''
}

const removeVideo = (index: number) => form.value.videos.splice(index, 1)

// ── VALIDATION ──────────────────────────────────────────────────
const validate = (): string | null => {
  if (!form.value.name.trim()) return 'Company name is required'
  if (!form.value.slug.trim()) return 'Slug is required'
  if (!form.value.headline.trim()) return 'Headline is required'
  return null
}

// ── SUBMIT ──────────────────────────────────────────────────────
const handleSubmit = async () => {
  const error = validate()
  if (error) { showToast(error, 'error'); return }

  isLoading.value = true
  try {
    await $fetch('/api/companies', { method: 'POST', body: form.value })
    showToast('Company created successfully!', 'success')
    setTimeout(() => router.push('/admin/dashboard'), 1200)
  } catch (e: any) {
    showToast(e.data?.statusMessage || 'Error creating company', 'error')
  } finally {
    isLoading.value = false
  }
}

// ── SELECT OPTIONS ───────────────────────────────────────────────
const labelClass = 'text-xs font-bold uppercase tracking-wide text-black'

const industryItems = ['FinTech', 'HealthTech', 'AgriTech', 'Logistics', 'EdTech', 'Clean Energy', 'E-Commerce', 'Real Estate']
const stageItems = ['Seed', 'Series A', 'Series B', 'Series C+', 'IPO']
const categoryItems = computed(() => SOLUTION_CATEGORIES.map((c: string) => ({ label: c, value: c })))
</script>

<template>
  <div class="page-root max-w-3xl mx-auto">

    <!-- ── TOAST ─────────────────────────────────────────────── -->
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

    <!-- ── HEADER ─────────────────────────────────────────────── -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-black text-gray-900">New Company</h1>
        <p class="text-sm text-gray-500">Add an entity to the global index.</p>
      </div>
      <UButton variant="ghost" color="neutral" to="/admin/dashboard">Cancel</UButton>
    </div>

    <!-- ── FORM ───────────────────────────────────────────────── -->
    <div class="space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-gray-200 shadow-sm">

      <!-- Name + Slug -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Company Name" :ui="{ label: labelClass }">
          <UInput v-model="form.name" placeholder="PayFlow" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
        <UFormField label="Slug (URL)" :ui="{ label: labelClass }">
          <UInput v-model="form.slug" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
      </div>

      <!-- Logo -->
      <ImageUpload v-model="form.logo" label="Company Logo" />

      <!-- Headline -->
      <UFormField label="Headline (One Liner)" :ui="{ label: labelClass }">
        <UInput
          v-model="form.headline"
          placeholder="Simplifying cross-border payments."
          class="w-full"
          :ui="{ base: 'bg-gray-50 text-black' }"
        />
      </UFormField>

      <hr class="border-gray-100" />

      <!-- Industry + Stage -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Industry" :ui="{ label: labelClass }">
          <USelect
            v-model="form.industry"
            :items="industryItems"
            class="w-full"
            :ui="{ base: 'bg-gray-50 text-black' }"
          />
        </UFormField>
        <UFormField label="Stage" :ui="{ label: labelClass }">
          <USelect
            v-model="form.stage"
            :items="stageItems"
            class="w-full"
            :ui="{ base: 'bg-gray-50 text-black' }"
          />
        </UFormField>
      </div>

      <!-- Location + Website -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <UFormField label="Location" :ui="{ label: labelClass }">
          <UInput v-model="form.location" placeholder="Lagos, Nigeria" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
        <UFormField label="Website" :ui="{ label: labelClass }">
          <UInput v-model="form.website" type="url" placeholder="https://" class="w-full" :ui="{ base: 'bg-gray-50 text-black' }" />
        </UFormField>
      </div>

      <hr class="border-gray-100" />

      <!-- Tech Stack -->
      <div class="bg-gray-50 p-5 sm:p-6 rounded-xl border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <label :class="labelClass">Tech Stack & Solutions</label>
          <span class="text-[10px] text-gray-400 bg-white border border-gray-200 px-2 py-0.5 rounded-full">
            {{ form.stack.length }} added
          </span>
        </div>

        <!-- Category + Name + Add -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
          <USelect
            v-model="form.currentTechCategory"
            :items="categoryItems"
            value-key="value"
            label-key="label"
            class="w-full sm:w-1/2"
            :ui="{ base: 'bg-white text-black' }"
          />
          <div class="flex gap-2 w-full sm:w-1/2">
            <UInput
              v-model="form.currentTechName"
              placeholder="e.g. Stripe"
              class="flex-1"
              :ui="{ base: 'bg-white text-black' }"
              @keydown.enter.prevent="addTech"
            />
            <button
              type="button"
              class="shrink-0 px-4 py-2 bg-black text-white text-xs font-bold uppercase rounded-lg hover:bg-gray-900 transition-colors"
              @click="addTech"
            >
              Add
            </button>
          </div>
        </div>

        <!-- Stack chips -->
        <div v-if="form.stack.length > 0" class="flex flex-wrap gap-2">
          <div
            v-for="(item, i) in form.stack"
            :key="i"
            class="flex items-center gap-2 bg-white border border-gray-200 rounded-md pl-2.5 pr-1 py-1.5 shadow-sm"
          >
            <div class="flex flex-col leading-none pr-1">
              <span class="text-[9px] text-gray-400 uppercase font-bold mb-0.5">{{ item.category }}</span>
              <span class="text-xs font-bold text-gray-900">{{ item.name }}</span>
            </div>
            <button
              type="button"
              class="text-gray-300 hover:text-red-500 hover:bg-red-50 rounded p-1 transition-colors"
              @click="removeTech(i)"
            >
              <UIcon name="i-lucide-x" class="w-3 h-3" />
            </button>
          </div>
        </div>

        <div v-else class="text-center py-6 border border-dashed border-gray-300 rounded-lg">
          <p class="text-xs text-gray-400 italic">No technologies added yet.</p>
        </div>
      </div>

      <!-- YouTube Videos -->
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
          <div
            v-for="(vid, i) in form.videos"
            :key="i"
            class="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div class="flex items-center gap-2 overflow-hidden">
              <svg class="w-4 h-4 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span class="text-xs text-gray-600 truncate">{{ vid }}</span>
            </div>
            <button
              type="button"
              class="text-red-500 hover:text-red-700 text-xs font-bold transition-colors shrink-0 ml-2"
              @click="removeVideo(i)"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label :class="labelClass + ' block mb-2'">Full Description</label>
        <RichEditor v-model="form.description" />
      </div>

      <!-- Featured toggle -->
      <div class="flex items-center gap-3 border-t border-gray-100 pt-5">
        <USwitch v-model="form.featured" color="neutral" />
        <label
          class="text-sm font-bold text-gray-900 cursor-pointer"
          @click="form.featured = !form.featured"
        >
          Feature this company
        </label>
      </div>

      <!-- Submit -->
      <div class="pt-2">
        <button
          type="button"
          :disabled="isLoading"
          class="w-full py-3.5 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          @click="handleSubmit"
        >
          <span v-if="isLoading" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          {{ isLoading ? 'Saving...' : 'Create Company' }}
        </button>
      </div>

    </div>
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