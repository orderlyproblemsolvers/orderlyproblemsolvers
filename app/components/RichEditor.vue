<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import { watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Link.configure({
      openOnClick: false,
      HTMLAttributes: { class: 'text-blue-600 underline cursor-pointer' }
    })
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[400px] max-w-none p-6'
    }
  },
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML())
  }
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

watch(() => props.modelValue, (newValue) => {
  const isSame = editor.value?.getHTML() === newValue
  if (isSame) return
  editor.value?.commands.setContent(newValue, false)
})
</script>

<template>
  <div class="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-shadow">
    
    <!-- TOOLBAR -->
    <div class="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50/50 overflow-x-auto" v-if="editor">
      
      <button 
        @click.prevent="editor.chain().focus().toggleBold().run()" 
        :class="{ 'bg-gray-200 text-black': editor.isActive('bold') }"
        class="p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase min-w-[32px]"
        title="Bold"
      >B</button>
      
      <button 
        @click.prevent="editor.chain().focus().toggleItalic().run()" 
        :class="{ 'bg-gray-200 text-black': editor.isActive('italic') }"
        class="p-2 rounded hover:bg-gray-200 text-gray-500 font-serif italic text-xs min-w-[32px]"
        title="Italic"
      >I</button>
      
      <div class="w-px h-4 bg-gray-300 mx-1"></div>
      
      <button 
        @click.prevent="editor.chain().focus().toggleHeading({ level: 2 }).run()" 
        :class="{ 'bg-gray-200 text-black': editor.isActive('heading', { level: 2 }) }"
        class="p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase"
      >H2</button>
      
      <button 
        @click.prevent="editor.chain().focus().toggleHeading({ level: 3 }).run()" 
        :class="{ 'bg-gray-200 text-black': editor.isActive('heading', { level: 3 }) }"
        class="p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase"
      >H3</button>
      
      <div class="w-px h-4 bg-gray-300 mx-1"></div>
      
      <button 
        @click.prevent="editor.chain().focus().toggleBulletList().run()" 
        :class="{ 'bg-gray-200 text-black': editor.isActive('bulletList') }"
        class="p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase"
      >List</button>
      
      <button 
        @click.prevent="editor.chain().focus().toggleBlockquote().run()" 
        :class="{ 'bg-gray-200 text-black': editor.isActive('blockquote') }"
        class="p-2 rounded hover:bg-gray-200 text-gray-500 font-bold text-xs uppercase"
      >Quote</button>
    </div>

    <!-- EDITOR AREA -->
    <editor-content :editor="editor" />
  </div>
</template>