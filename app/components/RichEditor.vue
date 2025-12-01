<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)

// CONFIG
const CLOUD_NAME = 'dmevyf7jt' 
const UPLOAD_PRESET = 'ops_dir' 

// --- STYLING CONSTANTS ---
// Base button style to reuse without @apply
const btnBase = "p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase min-w-[32px] transition-colors flex items-center justify-center"
// Active state style
const btnActive = "bg-black text-white hover:bg-gray-800"

// EDITOR SETUP
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: { levels: [2, 3] } 
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' }
    }),
    Image.configure({
      HTMLAttributes: { class: 'rounded-xl shadow-md my-8 w-full object-cover max-h-[500px]' }
    }),
    Placeholder.configure({
      placeholder: 'Start writing your story...'
    })
  ],
  editorProps: {
    attributes: {
      // We use 'prose-X' modifiers to style elements inside the editor using Tailwind directly
      class: `
        prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[400px] max-w-none p-6
        
        prose-h2:text-2xl prose-h2:font-black prose-h2:mt-8 prose-h2:mb-4 prose-h2:text-gray-900 prose-h2:tracking-tight
        prose-h3:text-xl prose-h3:font-bold prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-gray-900
        prose-p:mb-4 prose-p:leading-relaxed prose-p:text-gray-600
        prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-4 prose-ul:text-gray-600
        prose-ol:list-decimal prose-ol:pl-5 prose-ol:mb-4 prose-ol:text-gray-600
        prose-blockquote:border-l-4 prose-blockquote:border-black prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-6 prose-blockquote:text-gray-800 prose-blockquote:bg-gray-50 prose-blockquote:py-2 prose-blockquote:pr-2 prose-blockquote:rounded-r
        prose-img:rounded-xl prose-img:border prose-img:border-gray-100
        prose-a:text-blue-600 prose-a:underline prose-a:decoration-blue-300 prose-a:underline-offset-2 hover:prose-a:text-blue-800
      `
    }
  },
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML())
  }
})

// LINK LOGIC
const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

// IMAGE LOGIC
const triggerImageUpload = () => fileInput.value?.click()

const handleFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return
  const file = target.files[0]
  await uploadAndInsertImage(file)
  target.value = '' 
}

const uploadAndInsertImage = async (file: File) => {
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
      editor.value?.chain().focus().setImage({ src: data.secure_url }).run()
    } else {
      alert('Image upload failed')
    }
  } catch (e) {
    alert('Network error')
  } finally {
    isUploading.value = false
  }
}

onBeforeUnmount(() => editor.value?.destroy())

watch(() => props.modelValue, (newValue) => {
  const isSame = editor.value?.getHTML() === newValue
  if (isSame) return
  editor.value?.commands.setContent(newValue, false)
})
</script>

<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm group focus-within:ring-2 focus-within:ring-black/5 transition-all">
    
    <!-- TOOLBAR -->
    <div class="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/80 backdrop-blur sticky top-0 z-10" v-if="editor">
      
      <!-- History -->
      <button @click.prevent="editor.chain().focus().undo().run()" :class="btnBase" title="Undo">↩</button>
      <button @click.prevent="editor.chain().focus().redo().run()" :class="btnBase" title="Redo">↪</button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <!-- Text Style -->
      <button @click.prevent="editor.chain().focus().toggleBold().run()" :class="[btnBase, editor.isActive('bold') ? btnActive : '']"><strong>B</strong></button>
      <button @click.prevent="editor.chain().focus().toggleItalic().run()" :class="[btnBase, editor.isActive('italic') ? btnActive : '']"><em>i</em></button>
      <button @click.prevent="editor.chain().focus().toggleUnderline().run()" :class="[btnBase, editor.isActive('underline') ? btnActive : '']"><u>U</u></button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <!-- Structure -->
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="[btnBase, editor.isActive('heading', { level: 2 }) ? btnActive : '']">H2</button>
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="[btnBase, editor.isActive('heading', { level: 3 }) ? btnActive : '']">H3</button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <!-- Lists & Quotes -->
      <button @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="[btnBase, editor.isActive('bulletList') ? btnActive : '']">
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <button @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="[btnBase, editor.isActive('orderedList') ? btnActive : '']">
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h12M7 12h12M7 17h12M3 7h.01M3 12h.01M3 17h.01"></path></svg>
      </button>
      <button @click.prevent="editor.chain().focus().toggleBlockquote().run()" :class="[btnBase, editor.isActive('blockquote') ? btnActive : '']">”</button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <!-- Media -->
      <button @click.prevent="setLink" :class="[btnBase, editor.isActive('link') ? btnActive : '']">Link</button>
      
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

    <!-- EDITOR -->
    <editor-content :editor="editor" />
  </div>
</template>

<style scoped>
/* Placeholder styling using standard CSS */
:deep(.tiptap p.is-editor-empty:first-child::before) {
  color: #9ca3af; /* Tailwind gray-400 */
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>