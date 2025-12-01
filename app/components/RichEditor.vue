<script setup lang="ts">
import { onMounted, onBeforeUnmount, shallowRef, watch } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'

const config = useRuntimeConfig()

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)
const editor = shallowRef<Editor>()

// CONFIG
const CLOUD_NAME = config.public.cloudinaryCloudName
const UPLOAD_PRESET = config.public.cloudinaryUploadPreset

const btnBase = "p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase min-w-[32px] transition-colors flex items-center justify-center"
const btnActive = "bg-black text-white hover:bg-gray-800"

onMounted(() => {
  if (!import.meta.client) return

  try {
    editor.value = new Editor({
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
          class: `prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[400px] max-w-none p-6`
        }
      },
      onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
      }
    })
  } catch (e) {
    console.error("Failed to initialize Tiptap:", e)
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// Watch for external changes (e.g. loading draft)
watch(() => props.modelValue, (newValue) => {
  if (!editor.value) return
  const isSame = editor.value.getHTML() === newValue
  if (isSame) return
  editor.value.commands.setContent(newValue, false)
})

// --- ACTIONS ---
const setLink = () => {
  if (!editor.value) return
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)
  if (url === null) return
  if (url === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

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
      editor.value.chain().focus().setImage({ src: data.secure_url }).run()
    } else {
      alert('Image upload failed: ' + (data.error?.message || 'Unknown error'))
    }
  } catch (e) {
    alert('Network error')
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm group focus-within:ring-2 focus-within:ring-black/5 transition-all">
    
    <!-- TOOLBAR -->
    <div class="flex flex-wrap items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/80 backdrop-blur sticky top-0 z-10 min-h-[42px]" v-if="editor">
      
      <button @click.prevent="editor.chain().focus().undo().run()" :class="btnBase" title="Undo">↩</button>
      <button @click.prevent="editor.chain().focus().redo().run()" :class="btnBase" title="Redo">↪</button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <button @click.prevent="editor.chain().focus().toggleBold().run()" :class="[btnBase, editor.isActive('bold') ? btnActive : '']"><strong>B</strong></button>
      <button @click.prevent="editor.chain().focus().toggleItalic().run()" :class="[btnBase, editor.isActive('italic') ? btnActive : '']"><em>i</em></button>
      <button @click.prevent="editor.chain().focus().toggleUnderline().run()" :class="[btnBase, editor.isActive('underline') ? btnActive : '']"><u>U</u></button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="[btnBase, editor.isActive('heading', { level: 2 }) ? btnActive : '']">H2</button>
      <button @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="[btnBase, editor.isActive('heading', { level: 3 }) ? btnActive : '']">H3</button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

      <button @click.prevent="editor.chain().focus().toggleBulletList().run()" :class="[btnBase, editor.isActive('bulletList') ? btnActive : '']">
         <!-- List Icon -->
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <button @click.prevent="editor.chain().focus().toggleOrderedList().run()" :class="[btnBase, editor.isActive('orderedList') ? btnActive : '']">
         <!-- Ordered List Icon -->
         <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h12M7 12h12M7 17h12M3 7h.01M3 12h.01M3 17h.01"></path></svg>
      </button>
      <button @click.prevent="editor.chain().focus().toggleBlockquote().run()" :class="[btnBase, editor.isActive('blockquote') ? btnActive : '']">”</button>
      <div class="w-px h-4 bg-gray-300 mx-1"></div>

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

    <!-- EDITOR CONTENT -->
    <div v-if="editor" class="min-h-[400px]">
       <editor-content :editor="editor" />
    </div>
    
    <div v-else class="p-12 text-center text-gray-400 bg-gray-50 min-h-[400px] flex items-center justify-center">
      <span>Loading Editor...</span>
    </div>

  </div>
</template>

<style scoped>
/* Tiptap Placeholder Styling */
:deep(.tiptap p.is-editor-empty:first-child::before) {
  color: #9ca3af;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>