<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const config = useRuntimeConfig()

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const quillRef = ref<any>(null) // Reference to the Quill wrapper
const editor = ref<any>(null)   // Reference to the internal Quill instance

// TRACK FORMATS (Replaces Tiptap's editor.isActive)
const activeFormats = ref<Record<string, boolean>>({
  bold: false,
  italic: false,
  underline: false,
  header2: false,
  header3: false,
  blockquote: false,
  listOrdered: false,
  listBullet: false,
  link: false
})

// CONFIG
const CLOUD_NAME = config.public.cloudinaryCloudName
const UPLOAD_PRESET = config.public.cloudinaryUploadPreset

// STYLING
const btnBase = "p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase min-w-[32px] transition-colors flex items-center justify-center"
const btnActive = "bg-black text-white hover:bg-gray-800"

// INIT
onMounted(() => {
  if (quillRef.value) {
    editor.value = quillRef.value.getQuill()
    
    // Listen for selection changes to update toolbar active states
    editor.value.on('editor-change', (eventName: string, ...args: any[]) => {
      if (eventName === 'selection-change') {
        updateActiveFormats()
      }
      if (eventName === 'text-change') {
        emit('update:modelValue', quillRef.value.getHTML())
      }
    })
  }
})

// SYNC FORMATS
const updateActiveFormats = () => {
  if (!editor.value) return
  const range = editor.value.getSelection()
  if (!range) return
  
  const formats = editor.value.getFormat(range)
  
  activeFormats.value = {
    bold: !!formats.bold,
    italic: !!formats.italic,
    underline: !!formats.underline,
    header2: formats.header === 2,
    header3: formats.header === 3,
    blockquote: !!formats.blockquote,
    listOrdered: formats.list === 'ordered',
    listBullet: formats.list === 'bullet',
    link: !!formats.link
  }
}

// --- ACTIONS ---

const toggleFormat = (format: string, value: any = true) => {
  if (!editor.value) return
  
  const currentFormat = editor.value.getFormat()
  // Toggle logic: If strictly equal to current value, turn off (clean), else set
  if (currentFormat[format] === value) {
    editor.value.format(format, false)
  } else {
    editor.value.format(format, value)
  }
  updateActiveFormats()
}

const toggleHeader = (level: number) => {
  if (!editor.value) return
  const current = editor.value.getFormat().header
  editor.value.format('header', current === level ? false : level)
  updateActiveFormats()
}

const setLink = () => {
  if (!editor.value) return
  const currentLink = editor.value.getFormat().link
  const url = window.prompt('URL', currentLink || '')
  
  if (url === null) return
  
  if (url === '') {
    editor.value.format('link', false)
  } else {
    editor.value.format('link', url)
  }
  updateActiveFormats()
}

// IMAGE UPLOAD
const triggerImageUpload = () => fileInput.value?.click()

const handleFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return
  const file = target.files[0]
  await uploadAndInsertImage(file)
  target.value = '' 
}

const uploadAndInsertImage = async (file: File) => {
  if (!editor.value) return
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
      // Insert image at current cursor position
      const range = editor.value.getSelection(true)
      editor.value.insertEmbed(range.index, 'image', data.secure_url)
      editor.value.setSelection(range.index + 1)
    } else {
      alert('Image upload failed: ' + (data.error?.message || 'Unknown error'))
    }
  } catch (e) {
    alert('Network error during upload')
  } finally {
    isUploading.value = false
  }
}

// External v-model Sync (if needed when loading data initially)
watch(() => props.modelValue, (newVal) => {
  if (quillRef.value && quillRef.value.getHTML() !== newVal) {
    quillRef.value.setHTML(newVal)
  }
})
</script>

<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm group focus-within:ring-2 focus-within:ring-black/5 transition-all rich-text-wrapper">
    
    <div class="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/80 backdrop-blur sticky top-0 z-10 min-h-[42px]">
      
      <button @click.prevent="toggleFormat('bold')" :class="[btnBase, activeFormats.bold ? btnActive : '']"><strong>B</strong></button>
      <button @click.prevent="toggleFormat('italic')" :class="[btnBase, activeFormats.italic ? btnActive : '']"><em>i</em></button>
      <button @click.prevent="toggleFormat('underline')" :class="[btnBase, activeFormats.underline ? btnActive : '']"><u>U</u></button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <button @click.prevent="toggleHeader(2)" :class="[btnBase, activeFormats.header2 ? btnActive : '']">H2</button>
      <button @click.prevent="toggleHeader(3)" :class="[btnBase, activeFormats.header3 ? btnActive : '']">H3</button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <button @click.prevent="toggleFormat('list', 'bullet')" :class="[btnBase, activeFormats.listBullet ? btnActive : '']">
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <button @click.prevent="toggleFormat('list', 'ordered')" :class="[btnBase, activeFormats.listOrdered ? btnActive : '']">
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h12M7 12h12M7 17h12M3 7h.01M3 12h.01M3 17h.01"></path></svg>
      </button>
      <button @click.prevent="toggleFormat('blockquote')" :class="[btnBase, activeFormats.blockquote ? btnActive : '']">”</button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <button @click.prevent="setLink" :class="[btnBase, activeFormats.link ? btnActive : '']">Link</button>
      
      <button 
        @click.prevent="triggerImageUpload" 
        :class="btnBase" 
        :disabled="isUploading"
      >
        <span v-if="isUploading" class="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
        <div v-else class="flex items-center gap-1">
           <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
           Img
        </div>
      </button>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFile" />
    </div>

    <ClientOnly>
      <QuillEditor 
        ref="quillRef"
        v-model:content="props.modelValue"
        content-type="html"
        theme="snow"
        :toolbar="false" 
        placeholder="Start writing your story..."
        class="min-h-[400px] max-w-none"
      />
    </ClientOnly>

  </div>
</template>

<style scoped>
/* Custom overrides for Quill to match previous Typography */
:deep(.ql-editor) {
  min-height: 400px;
  padding: 1.5rem; /* Match p-6 */
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.75;
}

:deep(.ql-editor h2) {
  font-size: 1.5em;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
}

:deep(.ql-editor h3) {
  font-size: 1.25em;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

:deep(.ql-editor blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563;
}

:deep(.ql-editor img) {
  border-radius: 0.75rem; /* rounded-xl */
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

:deep(.ql-container.ql-snow) {
  border: none;
}
</style>