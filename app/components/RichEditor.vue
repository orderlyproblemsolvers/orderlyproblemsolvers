<script setup lang="ts">
import { ref, computed } from 'vue'
import { Extension } from '@tiptap/core'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import type { EditorCustomHandlers, EditorToolbarItem } from '@nuxt/ui'
import type { Editor } from '@tiptap/vue-3'

// --- CUSTOM FONT SIZE EXTENSION ---
const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return { types: ['textStyle'] }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize || null,
            renderHTML: attributes => {
              if (!attributes.fontSize) return {}
              return { style: `font-size: ${attributes.fontSize}` }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: any) =>
          chain().setMark('textStyle', { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }: any) =>
          chain().setMark('textStyle', { fontSize: null }).run(),
    }
  },
})

// --- PROPS & EMITS ---
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

// --- CLOUDINARY CONFIG ---
const config = useRuntimeConfig()
const CLOUD_NAME = config.public.cloudinaryCloudName
const UPLOAD_PRESET = config.public.cloudinaryUploadPreset

// --- REFS ---
const editorRef = useTemplateRef<{ editor: Editor | undefined }>('editorRef')
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)

// --- CUSTOM HANDLERS ---
const customHandlers = {
  imageUpload: {
    canExecute: () => !isUploading.value,
    execute: (editor: Editor) => {
      fileInput.value?.click()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: () => isUploading.value,
  },
} satisfies EditorCustomHandlers

// --- IMAGE UPLOAD HANDLER ---
const handleFile = async (event: Event) => {
  const target = event.target as HTMLInputElement
  if (!target.files?.length) return

  const editor = editorRef.value?.editor
  if (!editor) return

  isUploading.value = true
  const formData = new FormData()
  formData.append('file', target.files[0]!)
  formData.append('upload_preset', UPLOAD_PRESET)

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    )
    const data = await res.json()
    if (data.secure_url) {
      editor.chain().focus().setImage({ src: data.secure_url }).run()
    } else {
      console.error('Upload failed:', data.error?.message)
    }
  } catch (e) {
    console.error('Network error during upload', e)
  } finally {
    isUploading.value = false
    target.value = ''
  }
}

// --- TOOLBAR ITEMS ---
const toolbarItems = computed(
  () =>
    [
      [
        { kind: 'undo', icon: 'i-lucide-undo-2' },
        { kind: 'redo', icon: 'i-lucide-redo-2' },
      ],
      [
        { kind: 'mark', mark: 'bold', icon: 'i-lucide-bold' },
        { kind: 'mark', mark: 'italic', icon: 'i-lucide-italic' },
        { kind: 'mark', mark: 'underline', icon: 'i-lucide-underline' },
      ],
      [
        {
          icon: 'i-lucide-heading',
          content: { align: 'start' },
          items: [
            { kind: 'heading', level: 2, icon: 'i-lucide-heading-2', label: 'Heading 2' },
            { kind: 'heading', level: 3, icon: 'i-lucide-heading-3', label: 'Heading 3' },
          ],
        },
      ],
      [
        { kind: 'bulletList', icon: 'i-lucide-list' },
        { kind: 'orderedList', icon: 'i-lucide-list-ordered' },
      ],
      [
        { kind: 'blockquote', icon: 'i-lucide-quote' },
        { kind: 'codeBlock', icon: 'i-lucide-square-code' },
      ],
      [
        { kind: 'link', icon: 'i-lucide-link' },
        {
          kind: 'imageUpload',
          icon: isUploading.value ? 'i-lucide-loader-circle' : 'i-lucide-image',
        },
      ],
    ] satisfies EditorToolbarItem<typeof customHandlers>[][]
)
</script>

<template>
  <!--
    min-w-0: prevents this component from forcing its grid/flex
    parent wider than the viewport on mobile.
  -->
  <div class="min-w-0 w-full border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all">
    <UEditor
      ref="editorRef"
      v-slot="{ editor }"
      :model-value="modelValue"
      content-type="html"
      :extensions="[Underline, TextStyle, Color, FontSize]"
      :handlers="customHandlers"
      :starter-kit="{
        heading: { levels: [2, 3] },
        dropcursor: { color: 'var(--ui-primary)', width: 2 },
        link: { openOnClick: false },
      }"
      :placeholder="{ placeholder: 'Start writing your story...', mode: 'firstLine' }"
      :ui="{ base: 'focus:outline-none min-h-[300px] sm:min-h-[400px] max-w-none p-4 sm:p-6' }"
      @update:model-value="emit('update:modelValue', $event as string)"
    >
      <!--
        Toolbar wrapper:
        - overflow-x-auto: lets the toolbar scroll horizontally on small
          screens instead of blowing out the page width
        - min-w-0: same containment fix as the outer wrapper
      -->
      <div class="min-w-0 overflow-x-auto border-b border-gray-100 bg-white sticky top-0 z-10">
        <div class="flex items-center gap-1 p-2 min-h-[42px] w-max min-w-full">
          <UEditorToolbar :editor="editor" :items="toolbarItems" />

          <!-- Color Picker -->
          <div
            class="toolbar-color-btn relative flex items-center justify-center p-2 rounded cursor-pointer shrink-0"
            title="Text Color"
          >
            <span
              class="font-bold text-xs select-none"
              :style="{ color: editor.getAttributes('textStyle').color || '#000000' }"
            >A</span>
            <input
              type="color"
              class="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              :value="editor.getAttributes('textStyle').color || '#000000'"
              @input="editor.chain().focus().setColor(($event.target as HTMLInputElement).value).run()"
            />
          </div>

          <!-- Font Size -->
          <select
            class="shrink-0 h-8 text-xs text-gray-800 border border-gray-200 rounded bg-white px-1 outline-none hover:bg-gray-100 cursor-pointer"
            @change="(editor as any).chain().focus().setFontSize(($event.target as HTMLSelectElement).value).run()"
          >
            <option value="" disabled selected>Size</option>
            <option value="12px">Small</option>
            <option value="16px">Normal</option>
            <option value="20px">Large</option>
            <option value="28px">Huge</option>
          </select>
        </div>
      </div>
    </UEditor>

    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFile" />
  </div>
</template>

<style scoped>
/* ── Toolbar buttons: black on white ───────────────────────── */

:deep([role="toolbar"] button) {
  color: #111111;
  background-color: transparent;
}

:deep([role="toolbar"] button:hover) {
  background-color: #f3f4f6;
  color: #000000;
}

:deep([role="toolbar"] button[data-active="true"]),
:deep([role="toolbar"] button[aria-pressed="true"]) {
  background-color: #111111;
  color: #ffffff;
}

:deep([role="toolbar"] button:disabled) {
  color: #d1d5db;
}

:deep([role="toolbar"] [data-slot="separator"]) {
  background-color: #e5e7eb;
}

.toolbar-color-btn:hover {
  background-color: #f3f4f6;
}

/* ── Code block: dark terminal ─────────────────────────────── */
:deep(.tiptap pre) {
  background: #0d0d0d;
  color: #fff;
  font-family: 'JetBrainsMono', monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  margin: 1.5rem 0;
}

:deep(.tiptap code) {
  color: inherit;
  padding: 0;
  background: none;
  font-size: 0.8rem;
}
</style>