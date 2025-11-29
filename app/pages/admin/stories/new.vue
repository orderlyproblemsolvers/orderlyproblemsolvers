<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const router = useRouter()
const isLoading = ref(false)

// FORM DATA
const form = ref({
  title: '',
  slug: '',
  excerpt: '',
  content: '', 
  category: 'Spotlight',
  readTime: '5 min read',
  coverImage: '',
  // 1. AUTHOR: Simple Text Input
  authorName: 'OPS Admin', 
  // 2. FEATURED ENTITIES: Arrays of IDs
  featuredCompanyIds: [] as number[],
  featuredPersonIds: [] as number[],
  isPublished: true
})

// UI STATE FOR MULTI-SELECT (To show the chips)
const displayCompanies = ref<any[]>([])
const displayPeople = ref<any[]>([])

// SEARCH STATE
const companySearch = ref('')
const companyResults = ref<any[]>([])
const showCompanyList = ref(false)

const personSearch = ref('')
const personResults = ref<any[]>([])
const showPersonList = ref(false)

// --- SEARCH API CALL ---
const performSearch = async (query: string, type: 'person' | 'company') => {
  if (query.length < 2) return []
  try {
    // Fetch from global search API
    const data = await $fetch('/api/search', { query: { q: query } }) as any[]
    return data.filter((item: any) => item.type === type)
  } catch (e) {
    return []
  }
}

// --- COMPANY LOGIC ---
const searchCompanies = async () => {
  if (!companySearch.value) {
    companyResults.value = []
    return
  }
  companyResults.value = await performSearch(companySearch.value, 'company')
  showCompanyList.value = true
}

const addCompany = (comp: any) => {
  // Prevent duplicates
  if (!form.value.featuredCompanyIds.includes(comp.id)) {
    form.value.featuredCompanyIds.push(comp.id)
    displayCompanies.value.push(comp)
  }
  showCompanyList.value = false
  companySearch.value = ''
}

const removeCompany = (index: number) => {
  form.value.featuredCompanyIds.splice(index, 1)
  displayCompanies.value.splice(index, 1)
}

// --- PERSON LOGIC ---
const searchPeople = async () => {
  if (!personSearch.value) {
    personResults.value = []
    return
  }
  personResults.value = await performSearch(personSearch.value, 'person')
  showPersonList.value = true
}

const addPerson = (person: any) => {
  if (!form.value.featuredPersonIds.includes(person.id)) {
    form.value.featuredPersonIds.push(person.id)
    displayPeople.value.push(person)
  }
  showPersonList.value = false
  personSearch.value = ''
}

const removePerson = (index: number) => {
  form.value.featuredPersonIds.splice(index, 1)
  displayPeople.value.splice(index, 1)
}

// AUTO SLUG
watch(() => form.value.title, (newVal) => {
  form.value.slug = newVal.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
})

// SUBMIT
const handleSubmit = async () => {
  if (!form.value.title || !form.value.content) {
    alert('Title and Content are required')
    return
  }

  isLoading.value = true
  try {
    await $fetch('/api/stories', {
      method: 'POST',
      body: form.value
    })
    alert('Story Published Successfully!')
    router.push('/admin/dashboard')
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Error saving story')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto pb-20">
    
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-black text-gray-900 tracking-tight">Write Story</h1>
      <div class="flex gap-4">
        <NuxtLink to="/admin/dashboard" class="px-4 py-2 text-sm font-bold text-gray-500 hover:text-black transition-colors">Cancel</NuxtLink>
        <button 
          @click="handleSubmit" 
          :disabled="isLoading"
          class="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <span v-if="isLoading" class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          {{ isLoading ? 'Publishing...' : 'Publish Story' }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- LEFT SIDEBAR: METADATA -->
      <div class="lg:col-span-4 space-y-6 order-last lg:order-first">
        
        <!-- 1. Cover Image -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
           <ImageUpload v-model="form.coverImage" label="Cover Image" />
        </div>

        <!-- 2. Meta Fields -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           
           <!-- Category -->
           <div>
              <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Category</label>
              <select v-model="form.category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm bg-white h-10">
                 <option>Spotlight</option>
                 <option>Case Studies</option>
                 <option>Market Watch</option>
                 <option>Engineering</option>
                 <option>Opinion</option>
              </select>
           </div>

           <!-- AUTHOR (TEXT INPUT) -->
           <div>
              <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Author Name</label>
              <input 
                v-model="form.authorName" 
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm" 
                placeholder="e.g. OPS Admin"
              />
           </div>

           <!-- FEATURED COMPANIES (MULTI-SELECT) -->
           <div class="relative">
              <label class="block text-xs font-bold uppercase text-gray-500 mb-2">Featured Companies</label>
              
              <!-- Selected Chips -->
              <div v-if="displayCompanies.length > 0" class="flex flex-wrap gap-2 mb-3">
                 <div v-for="(c, i) in displayCompanies" :key="c.id" class="bg-blue-50 text-blue-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-blue-100">
                    {{ c.name }}
                    <button @click="removeCompany(i)" class="hover:text-red-600 ml-1 font-black">×</button>
                 </div>
              </div>

              <!-- Search Input -->
              <input 
                 v-model="companySearch" 
                 @input="searchCompanies"
                 type="text" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm" 
                 placeholder="Search to add company..." 
              />
              
              <!-- Results Dropdown -->
              <div v-if="showCompanyList && companyResults.length > 0" class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                 <div 
                   v-for="comp in companyResults" 
                   :key="comp.id" 
                   @click="addCompany(comp)"
                   class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                 >
                    <p class="text-sm font-bold text-gray-900">{{ comp.name }}</p>
                    <p class="text-[10px] text-gray-500 truncate">{{ comp.info }}</p>
                 </div>
              </div>
           </div>

           <!-- FEATURED PEOPLE (MULTI-SELECT) -->
           <div class="relative">
              <label class="block text-xs font-bold uppercase text-gray-500 mb-2">Featured People</label>
              
              <!-- Selected Chips -->
              <div v-if="displayPeople.length > 0" class="flex flex-wrap gap-2 mb-3">
                 <div v-for="(p, i) in displayPeople" :key="p.id" class="bg-purple-50 text-purple-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-purple-100">
                    {{ p.name }}
                    <button @click="removePerson(i)" class="hover:text-red-600 ml-1 font-black">×</button>
                 </div>
              </div>

              <!-- Search Input -->
              <input 
                 v-model="personSearch" 
                 @input="searchPeople"
                 type="text" 
                 class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm" 
                 placeholder="Search to add person..." 
              />
              
              <!-- Results Dropdown -->
              <div v-if="showPersonList && personResults.length > 0" class="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                 <div 
                   v-for="person in personResults" 
                   :key="person.id" 
                   @click="addPerson(person)"
                   class="px-3 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
                 >
                    <p class="text-sm font-bold text-gray-900">{{ person.name }}</p>
                    <p class="text-[10px] text-gray-500 truncate">{{ person.info }}</p>
                 </div>
              </div>
           </div>

           <div>
              <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Read Time</label>
              <input v-model="form.readTime" type="text" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-black outline-none text-sm" placeholder="e.g. 5 min read" />
           </div>
        </div>

      </div>

      <!-- RIGHT: CONTENT EDITOR -->
      <div class="lg:col-span-8 space-y-6">
         
         <div class="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <!-- Title Input -->
            <div>
               <input 
                 v-model="form.title" 
                 type="text" 
                 class="w-full py-2 border-none focus:ring-0 text-3xl md:text-4xl font-black placeholder-gray-300 outline-none text-gray-900" 
                 placeholder="Enter Title Here..." 
               />
            </div>

            <!-- Slug Preview -->
            <div class="flex items-center gap-2 text-xs text-gray-400 bg-gray-50 p-2 rounded border border-gray-100">
               <span class="font-bold uppercase tracking-wider">URL SLUG:</span>
               <span class="font-mono text-gray-600">/stories/{{ form.slug }}</span>
            </div>

            <!-- Excerpt -->
            <div>
               <label class="block text-xs font-bold uppercase text-gray-500 mb-2">Excerpt</label>
               <textarea 
                 v-model="form.excerpt" 
                 rows="2" 
                 class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-black outline-none text-sm leading-relaxed resize-none transition-colors" 
                 placeholder="A short summary that appears on the card..."
               ></textarea>
            </div>

            <!-- Rich Text Editor -->
            <div>
               <label class="block text-xs font-bold uppercase text-gray-500 mb-2">Story Content</label>
               
               <RichEditor v-model="form.content" />
               
            </div>
         </div>

      </div>

    </div>
  </div>
</template>