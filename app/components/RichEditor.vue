<script setup lang="ts">
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])
const quillContent = ref(props.modelValue)

// SYNC CONTENT
watch(() => props.modelValue, (val) => {
  if (val !== quillContent.value) {
    quillContent.value = val
  }
})

const onUpdate = () => {
  emit('update:modelValue', quillContent.value)
}

// TOOLBAR CONFIGURATION
const toolbarOptions = [
  [{ 'header': [2, 3, false] }], 
  ['bold', 'italic', 'underline', 'strike'], 
  ['blockquote', 'code-block'], 
  [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
  ['link', 'image', 'clean'] 
]
</script>

<template>
  <div class="rich-text-wrapper">
    <ClientOnly>
      <QuillEditor 
        v-model:content="quillContent"
        contentType="html"
        theme="snow"
        :toolbar="toolbarOptions"
        placeholder="Share your solution details..."
        @textChange="onUpdate"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
/* 🎨 COLOR PALETTE & STRATEGY
   - Light Mode: White bg, Gray-900 text, Gray-200 borders
   - Dark Mode: Slate-950 bg, White text (Forced), Slate-800 borders
*/

/* --- 1. WRAPPER LAYOUT --- */
.rich-text-wrapper {
  border: 1px solid #e5e7eb; /* gray-200 */
  border-radius: 0.75rem;    
  overflow: hidden;
  background-color: #ffffff;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

/* Dark Mode Wrapper */
:global(.dark) .rich-text-wrapper {
  background-color: #020617; /* slate-950 */
  border-color: #1e293b;     /* slate-800 */
}

/* Focus State */
.rich-text-wrapper:focus-within {
  border-color: #000000;
  box-shadow: 0 0 0 1px #000000;
}
:global(.dark) .rich-text-wrapper:focus-within {
  border-color: #3b82f6; /* blue-500 */
  box-shadow: 0 0 0 1px #3b82f6;
}

/* --- 2. TOOLBAR CUSTOMIZATION --- */
:deep(.ql-toolbar.ql-snow) {
  border: none;
  border-bottom: 1px solid #f3f4f6; /* gray-100 */
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 12px;
}
:global(.dark) :deep(.ql-toolbar.ql-snow) {
  background-color: rgba(2, 6, 23, 0.95); /* slate-950 opacity */
  border-bottom-color: #1e293b;          /* slate-800 */
}

/* Dropdown Labels (Header/Format) */
:deep(.ql-snow .ql-picker-label),
:deep(.ql-snow .ql-formats) {
  color: #6b7280; /* gray-500 */
  font-weight: 700;
  font-size: 0.75rem; 
  text-transform: uppercase;
}
:global(.dark) :deep(.ql-snow .ql-picker-label) {
  color: #94a3b8; /* slate-400 */
}

/* Rename 'Normal' to 'Format' */
:deep(.ql-snow .ql-picker.ql-header .ql-picker-label::before) {
  content: 'Format'; 
  color: #6b7280;
}
:global(.dark) :deep(.ql-snow .ql-picker.ql-header .ql-picker-label::before) {
  color: #94a3b8;
}

/* --- ICONS (SVG STROKES & FILLS) --- */
:deep(.ql-snow .ql-stroke) { stroke: #6b7280; stroke-width: 2; }
:deep(.ql-snow .ql-fill) { fill: #6b7280; }

:global(.dark) :deep(.ql-snow .ql-stroke) { stroke: #94a3b8; } 
:global(.dark) :deep(.ql-snow .ql-fill) { fill: #94a3b8; }

/* Hover States */
:deep(button:hover .ql-stroke),
:deep(.ql-picker:hover .ql-picker-label) { stroke: #111827; color: #111827; }
:deep(button:hover .ql-fill) { fill: #111827; }
:deep(button:hover) { background-color: #f3f4f6; border-radius: 6px; }

:global(.dark) :deep(button:hover .ql-stroke),
:global(.dark) :deep(.ql-picker:hover .ql-picker-label) { stroke: #f8fafc; color: #f8fafc; }
:global(.dark) :deep(button:hover .ql-fill) { fill: #f8fafc; }
:global(.dark) :deep(button:hover) { background-color: #1e293b; }

/* Active States */
:deep(button.ql-active .ql-stroke) { stroke: #2563eb !important; }
:deep(button.ql-active .ql-fill) { fill: #2563eb !important; }

/* --- 3. DROPDOWN MENUS (The Popups) --- */
:deep(.ql-picker-options) {
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}
:global(.dark) :deep(.ql-picker-options) {
  background-color: #0f172a !important; /* slate-900 */
  border-color: #1e293b !important;
}
:global(.dark) :deep(.ql-picker-item) {
  color: #94a3b8 !important;
}
:global(.dark) :deep(.ql-picker-item:hover) {
  color: #fff !important;
  background-color: #1e293b !important;
}

/* --- 4. EDITOR CONTENT (The Main Fix) --- */
:deep(.ql-container.ql-snow) {
  border: none;
  font-family: inherit;
  font-size: 1rem;
}

:deep(.ql-editor) {
  min-height: 400px;
  padding: 1.5rem;
  line-height: 1.75;
  color: #111827; /* Light mode default */
}

/* 🚨 THE FIX: Force White Text on all elements in Dark Mode */
:global(.dark) :deep(.ql-editor),
:global(.dark) :deep(.ql-editor p),
:global(.dark) :deep(.ql-editor span),
:global(.dark) :deep(.ql-editor li) {
  color: #f8fafc !important; /* Pure White/Slate-50 */
}

/* Placeholder */
:deep(.ql-editor.ql-blank::before) {
  color: #9ca3af;
  font-style: normal;
}
:global(.dark) :deep(.ql-editor.ql-blank::before) {
  color: #475569 !important; /* slate-600 */
}

/* --- 5. TYPOGRAPHY ELEMENTS --- */
/* Headings */
:deep(.ql-editor h2) {
  font-size: 1.5rem;
  font-weight: 900;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #111827;
}
:global(.dark) :deep(.ql-editor h2) {
  color: #ffffff !important;
}

:deep(.ql-editor h3) {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #111827;
}
:global(.dark) :deep(.ql-editor h3) {
  color: #f1f5f9 !important; /* slate-100 */
}

/* Blockquotes */
:deep(.ql-editor blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563; /* gray-600 */
  margin-top: 1rem;
  margin-bottom: 1rem;
}
:global(.dark) :deep(.ql-editor blockquote) {
  border-color: #334155;
  color: #94a3b8 !important;
}

/* Code Blocks */
:deep(.ql-editor pre.ql-syntax) {
  background-color: #111827;
  color: #f3f4f6 !important;
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}
:global(.dark) :deep(.ql-editor pre.ql-syntax) {
  background-color: #020617; /* Darker black */
  border: 1px solid #1e293b;
}

/* Images */
:deep(.ql-editor img) {
  border-radius: 0.75rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
}
:global(.dark) :deep(.ql-editor img) {
  border-color: #1e293b;
  opacity: 0.9;
}
</style>