<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useDebounceFn } from '@vueuse/core'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const isLoading = ref(false)
const metaOpen = ref(false)

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

// ── FORM DATA ───────────────────────────────────────────────────
const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  category: 'Spotlight',
  readTime: '5 min read',
  coverImage: '',
  authorName: 'OPS Admin',
  isPublished: true,
})

// ── FEATURED ENTITIES ────────────────────────────────────────────
const featuredCompanies = ref<any[]>([])
const featuredPeople = ref<any[]>([])

// ── SEARCH STATE ────────────────────────────────────────────────
const companySearch = ref('')
const companyResults = ref<any[]>([])
const showCompanyList = ref(false)
const companyRef = ref<HTMLElement | null>(null)

const personSearch = ref('')
const personResults = ref<any[]>([])
const showPersonList = ref(false)
const personRef = ref<HTMLElement | null>(null)

// ── CLICK OUTSIDE ───────────────────────────────────────────────
const handleClickOutside = (e: MouseEvent) => {
  if (companyRef.value && !companyRef.value.contains(e.target as Node)) showCompanyList.value = false
  if (personRef.value && !personRef.value.contains(e.target as Node)) showPersonList.value = false
}
onMounted(() => document.addEventListener('mousedown', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('mousedown', handleClickOutside))

// ── SEARCH API ──────────────────────────────────────────────────
const performSearch = async (query: string, type: 'person' | 'company') => {
  if (query.length < 2) return []
  try {
    const data = await $fetch('/api/search', { query: { q: query } }) as any[]
    return data.filter((item: any) => item.type === type)
  } catch { return [] }
}

const searchCompanies = useDebounceFn(async () => {
  if (!companySearch.value || companySearch.value.length < 2) {
    companyResults.value = []; showCompanyList.value = false; return
  }
  companyResults.value = await performSearch(companySearch.value, 'company')
  showCompanyList.value = true
}, 300)

const addCompany = (comp: any) => {
  if (!featuredCompanies.value.find(c => c.id === comp.id)) featuredCompanies.value.push(comp)
  showCompanyList.value = false; companySearch.value = ''; companyResults.value = []
}
const removeCompany = (index: number) => featuredCompanies.value.splice(index, 1)

const searchPeople = useDebounceFn(async () => {
  if (!personSearch.value || personSearch.value.length < 2) {
    personResults.value = []; showPersonList.value = false; return
  }
  personResults.value = await performSearch(personSearch.value, 'person')
  showPersonList.value = true
}, 300)

const addPerson = (person: any) => {
  if (!featuredPeople.value.find(p => p.id === person.id)) featuredPeople.value.push(person)
  showPersonList.value = false; personSearch.value = ''; personResults.value = []
}
const removePerson = (index: number) => featuredPeople.value.splice(index, 1)

// ── ESCAPE KEY ──────────────────────────────────────────────────
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') { showCompanyList.value = false; showPersonList.value = false }
}
onMounted(() => document.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', handleKeydown))

// ── AUTO SLUG ───────────────────────────────────────────────────
watch(() => form.value.title, (val) => {
  form.value.slug = val.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/--+/g, '-')
})

// ── VALIDATION ──────────────────────────────────────────────────
const validate = (): string | null => {
  if (!form.value.title.trim()) return 'Title is required'
  if (!form.value.slug.trim()) return 'Slug could not be generated — check your title'
  if (!form.value.excerpt.trim()) return 'Excerpt is required'
  if (!form.value.content.trim()) return 'Story content is required'
  if (!form.value.coverImage) return 'Cover image is required'
  return null
}

// ── SUBMIT ──────────────────────────────────────────────────────
const handleSubmit = async (publish: boolean) => {
  const error = validate()
  if (error) { showToast(error, 'error'); return }
  isLoading.value = true
  try {
    await $fetch('/api/stories', {
      method: 'POST',
      body: {
        ...form.value,
        isPublished: publish,
        featuredCompanyIds: featuredCompanies.value.map(c => c.id),
        featuredPersonIds: featuredPeople.value.map(p => p.id),
      }
    })
    showToast(publish ? 'Story published!' : 'Draft saved!', 'success')
    setTimeout(() => router.push('/admin/dashboard'), 1200)
  } catch (e: any) {
    showToast(e.data?.statusMessage || 'Something went wrong', 'error')
  } finally {
    isLoading.value = false
  }
}

const categoryItems = ['Spotlight', 'Case Studies', 'Market Watch', 'Engineering', 'Opinion']
</script>

<template>
  <div class="page-root min-h-screen bg-gray-50">

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

    <!-- ══ STICKY HEADER ════════════════════════════════════════ -->
    <div class="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">

      <!-- Row 1: Back + breadcrumb + actions -->
      <div class="flex items-center justify-between px-4 sm:px-6 h-14 gap-3">

        <!-- Left: back + breadcrumb -->
        <div class="flex items-center gap-2 min-w-0 flex-1">
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-lucide-arrow-left"
            size="sm"
            to="/admin/dashboard"
            class="shrink-0"
          />
          <div class="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
            <span class="shrink-0">Stories</span>
            <span class="shrink-0">/</span>
            <span class="text-gray-700 font-medium truncate">{{ form.title || 'New Story' }}</span>
          </div>
        </div>

        <!-- Right: meta toggle (mobile only) + action buttons -->
        <div class="flex items-center gap-2 shrink-0">
          <UButton
            variant="outline"
            color="neutral"
            size="sm"
            class="sm:hidden"
            :icon="metaOpen ? 'i-lucide-x' : 'i-lucide-sliders-horizontal'"
            @click="metaOpen = !metaOpen"
          />
          <UButton
            variant="outline"
            color="neutral"
            size="sm"
            :disabled="isLoading"
            @click="handleSubmit(false)"
          >
            <span class="hidden sm:inline">Save Draft</span>
            <span class="sm:hidden">Draft</span>
          </UButton>
          <UButton
            color="neutral"
            size="sm"
            :loading="isLoading"
            @click="handleSubmit(true)"
          >
            Publish
          </UButton>
        </div>
      </div>

      <!-- Row 2: Meta bar -->
      <!-- Desktop: always visible horizontal bar -->
      <div class="hidden sm:flex items-center divide-x divide-gray-200 border-t border-gray-100 bg-gray-50/50 overflow-x-auto">

        <div class="meta-cell group flex items-center gap-2 px-4 h-10 cursor-default hover:bg-gray-50 transition-colors shrink-0">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">Category</span>
          <USelect
            v-model="form.category"
            :items="categoryItems"
            size="xs"
            :ui="{ base: 'bg-transparent text-gray-800 hover:bg-gray-50 text-xs font-medium min-w-[110px] cursor-pointer' }"
          />
        </div>

        <div class="meta-cell group flex items-center gap-2 px-4 h-10 hover:bg-gray-50 transition-colors shrink-0">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">Author</span>
          <UInput
            v-model="form.authorName"
            size="xs"
            placeholder="Author name"
            :ui="{ base: 'bg-transparent text-gray-800 text-xs w-28' }"
          />
        </div>

        <div class="meta-cell group flex items-center gap-2 px-4 h-10 hover:bg-gray-50 transition-colors shrink-0">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">Read Time</span>
          <UInput
            v-model="form.readTime"
            size="xs"
            placeholder="5 min read"
            :ui="{ base: 'bg-transparent text-gray-800 text-xs w-20' }"
          />
        </div>

        <div class="meta-cell group flex items-center gap-2 px-4 h-10 hover:bg-gray-50 transition-colors shrink-0">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">Status</span>
          <USwitch v-model="form.isPublished" color="neutral" size="xs" />
          <span class="text-xs text-gray-600 whitespace-nowrap">{{ form.isPublished ? 'Published' : 'Draft' }}</span>
        </div>

        <div class="meta-cell group flex items-center gap-2 px-4 h-10 hover:bg-gray-50 transition-colors min-w-0 flex-1">
          <span class="text-[10px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">Slug</span>
          <span class="font-mono text-xs text-gray-500 truncate">/{{ form.slug || '—' }}</span>
        </div>

      </div>

      <!-- Mobile: collapsible meta panel using v-show -->
      <div v-show="metaOpen" class="sm:hidden border-t border-gray-100 bg-white">
        <div class="grid grid-cols-2 gap-4 p-4">

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Category</label>
            <USelect
              v-model="form.category"
              :items="categoryItems"
              size="sm"
              :ui="{ base: 'bg-gray-50 text-black' }"
            />
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Author</label>
            <UInput
              v-model="form.authorName"
              size="sm"
              placeholder="Author name"
              :ui="{ base: 'bg-gray-50 text-black' }"
            />
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Read Time</label>
            <UInput
              v-model="form.readTime"
              size="sm"
              placeholder="5 min read"
              :ui="{ base: 'bg-gray-50 text-black' }"
            />
          </div>

          <div>
            <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Status</label>
            <div class="flex items-center gap-2 h-9">
              <USwitch v-model="form.isPublished" color="neutral" />
              <span class="text-sm text-gray-600">{{ form.isPublished ? 'Published' : 'Draft' }}</span>
            </div>
          </div>

          <div class="col-span-2">
            <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Slug</label>
            <p class="font-mono text-xs text-gray-500 truncate bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
              /stories/{{ form.slug || '—' }}
            </p>
          </div>

        </div>
      </div>

    </div>
    <!-- ══ END HEADER ════════════════════════════════════════════ -->

    <!-- ══ MAIN CONTENT ═════════════════════════════════════════ -->
    <div class="max-w-5xl mx-auto w-full px-2 sm:px-2 py-6 sm:py-8 space-y-5">

      <!-- Cover Image -->
      <div class="w-full rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 bg-white hover:border-gray-300 transition-colors">
        <ImageUpload v-model="form.coverImage" label="" />
      </div>

      <!-- Writing surface -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

        <!-- Title -->
        <div class="px-5 sm:px-10 pt-7 sm:pt-8 pb-4 border-b border-gray-100">
          <input
            v-model="form.title"
            type="text"
            class="w-full border-none focus:ring-0 text-2xl sm:text-4xl font-black placeholder-gray-200 outline-none text-gray-900 bg-transparent leading-tight"
            placeholder="Story title..."
          />
        </div>

        <!-- Excerpt -->
        <div class="px-5 sm:px-10 py-4 border-b border-gray-100">
          <textarea
            v-model="form.excerpt"
            rows="2"
            class="w-full border-none focus:ring-0 resize-none outline-none text-sm sm:text-base text-gray-500 placeholder-gray-300 bg-transparent leading-relaxed"
            placeholder="Write a short excerpt that appears on the story card..."
          />
        </div>

        <!-- Rich Text Editor -->
        <div class="p-2 sm:p-4">
          <RichEditor v-model="form.content" />
        </div>

      </div>

      <!-- Featured entities -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6">
        <h3 class="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-5">Featured In This Story</h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

          <!-- Companies -->
          <div ref="companyRef" class="relative">
            <label class="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">Companies</label>
            <div v-if="featuredCompanies.length > 0" class="flex flex-wrap gap-2 mb-3">
              <div
                v-for="(c, i) in featuredCompanies" :key="c.id"
                class="bg-blue-50 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-blue-100"
              >
                {{ c.name }}
                <button class="hover:text-red-600 transition-colors font-black" @click="removeCompany(i)">×</button>
              </div>
            </div>
            <UInput
              v-model="companySearch"
              placeholder="Search companies..."
              :trailing-icon="companySearch.length >= 2 ? 'i-lucide-search' : undefined"
              :ui="{ base: 'bg-gray-50 text-black' }"
              @input="searchCompanies"
              @keydown.escape="showCompanyList = false"
            />
            <div v-if="showCompanyList && companyResults.length > 0" class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
              <div
                v-for="comp in companyResults" :key="comp.id"
                class="px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                @click="addCompany(comp)"
              >
                <p class="text-sm font-bold text-gray-900">{{ comp.name }}</p>
                <p class="text-[10px] text-gray-500 truncate">{{ comp.info }}</p>
              </div>
            </div>
            <p v-if="showCompanyList && companyResults.length === 0 && companySearch.length >= 2" class="text-xs text-gray-400 mt-1.5 px-1">No companies found</p>
          </div>

          <!-- People -->
          <div ref="personRef" class="relative">
            <label class="block text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">People</label>
            <div v-if="featuredPeople.length > 0" class="flex flex-wrap gap-2 mb-3">
              <div
                v-for="(p, i) in featuredPeople" :key="p.id"
                class="bg-purple-50 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-purple-100"
              >
                {{ p.name }}
                <button class="hover:text-red-600 transition-colors font-black" @click="removePerson(i)">×</button>
              </div>
            </div>
            <UInput
              v-model="personSearch"
              placeholder="Search people..."
              :trailing-icon="personSearch.length >= 2 ? 'i-lucide-search' : undefined"
              :ui="{ base: 'bg-gray-50 text-black' }"
              @input="searchPeople"
              @keydown.escape="showPersonList = false"
            />
            <div v-if="showPersonList && personResults.length > 0" class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
              <div
                v-for="person in personResults" :key="person.id"
                class="px-3 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                @click="addPerson(person)"
              >
                <p class="text-sm font-bold text-gray-900">{{ person.name }}</p>
                <p class="text-[10px] text-gray-500 truncate">{{ person.info }}</p>
              </div>
            </div>
            <p v-if="showPersonList && personResults.length === 0 && personSearch.length >= 2" class="text-xs text-gray-400 mt-1.5 px-1">No people found</p>
          </div>

        </div>
      </div>

      <!-- Mobile bottom action bar -->
      <div class="sm:hidden flex gap-3 pb-6">
        <UButton variant="outline" color="neutral" class="flex-1" :disabled="isLoading" @click="handleSubmit(false)">
          Save Draft
        </UButton>
        <UButton color="neutral" class="flex-1" :loading="isLoading" @click="handleSubmit(true)">
          Publish
        </UButton>
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
</style>