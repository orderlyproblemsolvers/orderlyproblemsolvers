<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)

// CONFIG (Same as your ImageUpload component)
const CLOUD_NAME = 'dmevyf7jt' // Your Cloud Name
const UPLOAD_PRESET = 'ops_dir' // Your Preset

// 1. EDITOR SETUP
const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit.configure({
      heading: { levels: [2, 3] } // We only allow H2 and H3 for semantic safety
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
      // This class ensures lists, quotes, and headings look right immediately
      class: 'prose prose-lg max-w-none focus:outline-none min-h-[400px] p-6'
    }
  },
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML())
  }
})

// 2. LINK LOGIC
const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null) return

  // empty
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }

  // update
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

// 3. IMAGE UPLOAD LOGIC (Reused Cloudinary Logic)
const triggerImageUpload = () => {
  fileInput.value?.click()
}

const handleFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files || target.files.length === 0) return

  const file = target.files[0]
  await uploadAndInsertImage(file)
  
  // Reset input so we can select same file again if needed
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
      // Insert image into Tiptap
      editor.value?.chain().focus().setImage({ src: data.secure_url }).run()
    } else {
      alert('Image upload failed')
    }
  } catch (e) {
    console.error(e)
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
      <button @click.prevent="editor.chain().focus().undo().run()" class="btn-tool" title="Undo">↩</button>
      <button @click.prevent="editor.chain().focus().redo().run()" class="btn-tool" title="Redo">↪</button>
      <div class="divider"></div>

      <!-- Text Style -->
      <button @click.prevent="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }" class="btn-tool font-bold">B</button>
      <button @click.prevent="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }" class="btn-tool italic">i</button>
      <button @click.prevent="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }" class="btn-tool underline">U</button>
      <div class="divider"></div>

      <!-- Structure -->
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" class="btn-tool font-bold">H2</button>
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" class="btn-tool font-bold">H3</button>
      <div class="divider"></div>

      <!-- Lists & Quotes -->
      <button @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }" class="btn-tool">
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <button @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }" class="btn-tool">
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h12M7 12h12M7 17h12M3 7h.01M3 12h.01M3 17h.01"></path></svg>
      </button>
      <button @click.prevent="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }" class="btn-tool">”</button>
      <div class="divider"></div>

      <!-- Media -->
      <button @click.prevent="setLink" :class="{ 'is-active': editor.isActive('link') }" class="btn-tool text-xs font-bold">Link</button>
      
      <button 
        @click.prevent="triggerImageUpload" 
        class="btn-tool flex items-center gap-1 text-xs font-bold" 
        :disabled="isUploading"
      >
        <span v-if="isUploading" class="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        Img
      </button>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFile" />
    </div>

    <!-- EDITOR -->
    <editor-content :editor="editor" />
  </div>
</template>

<style scoped>
.btn-tool {
  @apply p-2 rounded hover:bg-gray-200 text-gray-500 min-w-[32px] flex items-center justify-center transition-colors;
}
.btn-tool.is-active {
  @apply bg-black text-white hover:bg-gray-800;
}
.divider {
  @apply w-px h-4 bg-gray-300 mx-1;
}
/* Custom Styles for the Editor Content to match OPS Brand */
:deep(.prose h2) {
  @apply text-2xl font-black mt-8 mb-4 text-gray-900 tracking-tight;
}
:deep(.prose h3) {
  @apply text-xl font-bold mt-6 mb-3 text-gray-900;
}
:deep(.prose p) {
  @apply mb-4 leading-relaxed text-gray-600;
}
:deep(.prose ul) {
  @apply list-disc pl-5 mb-4 text-gray-600;
}
:deep(.prose ol) {
  @apply list-decimal pl-5 mb-4 text-gray-600;
}
:deep(.prose blockquote) {
  @apply border-l-4 border-black pl-4 italic my-6 text-gray-800 bg-gray-50 py-2 pr-2 rounded-r;
}
:deep(.prose img) {
  @apply rounded-xl border border-gray-100;
}
:deep(.prose a) {
  @apply text-blue-600 underline decoration-blue-300 underline-offset-2 hover:text-blue-800;
}
/* Placeholder styling */
:deep(.tiptap p.is-editor-empty:first-child::before) {
  color: #9ca3af;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>