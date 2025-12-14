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
  [{ 'header': [2, 3, false] }], // H2, H3, Normal
  ['bold', 'italic', 'underline', 'strike'], // Toggles
  [{ 'color': [] }, { 'background': [] }], // Text Color & Highlight
  ['blockquote', 'code-block'], // Quotes & Code
  [{ 'list': 'ordered'}, { 'list': 'bullet' }], // Lists
  ['link', 'image', 'clean'] // Media & Clear Formatting
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
/* --- 1. WRAPPER LAYOUT --- */
.rich-text-wrapper {
  border: 1px solid #e5e7eb; /* gray-200 */
  border-radius: 0.75rem;    /* rounded-xl */
  overflow: hidden;
  background-color: #ffffff;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.rich-text-wrapper:focus-within {
  border-color: #000000;
  box-shadow: 0 0 0 1px #000000;
}

/* --- 2. TOOLBAR CUSTOMIZATION --- */
:deep(.ql-toolbar.ql-snow) {
  border: none;
  border-bottom: 1px solid #f3f4f6; /* gray-100 */
  background-color: rgba(249, 250, 251, 0.8); /* gray-50 with opacity */
  backdrop-filter: blur(4px);
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 12px;
  font-family: inherit;
}

/* Dropdowns & Labels */
:deep(.ql-snow .ql-picker-label),
:deep(.ql-snow .ql-formats) {
  color: #6b7280; /* gray-500 */
  font-weight: 700;
  font-size: 0.75rem; /* text-xs */
  text-transform: uppercase;
}

/* Rename default 'Normal' dropdown text to 'Format' */
:deep(.ql-snow .ql-picker.ql-header .ql-picker-label::before) {
  content: 'Format'; 
  color: #6b7280;
}

/* Icon Colors */
:deep(.ql-snow .ql-stroke) {
  stroke: #6b7280;
  stroke-width: 2;
}
:deep(.ql-snow .ql-fill) {
  fill: #6b7280;
}

/* Hover States */
:deep(button:hover .ql-stroke),
:deep(.ql-picker:hover .ql-picker-label) {
  stroke: #000000;
  color: #000000;
}
:deep(button:hover .ql-fill) {
  fill: #000000;
}
:deep(button:hover) {
  background-color: #e5e7eb; /* gray-200 */
  border-radius: 4px;
}

/* Active States (Selected Buttons) */
:deep(button.ql-active .ql-stroke) {
  stroke: #2563eb; /* blue-600 */
}
:deep(button.ql-active .ql-fill) {
  fill: #2563eb;
}

/* --- 3. EDITOR AREA --- */
:deep(.ql-container.ql-snow) {
  border: none;
  font-family: inherit;
  font-size: 1rem;
  color: #111827; /* gray-900 */
}

:deep(.ql-editor) {
  min-height: 400px;
  padding: 1.5rem;
  line-height: 1.75;
}

/* --- 4. TYPOGRAPHY STYLING --- */
:deep(.ql-editor h2) {
  font-size: 1.5rem;
  font-weight: 900;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #111827;
}

:deep(.ql-editor h3) {
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #111827;
}

:deep(.ql-editor blockquote) {
  border-left: 4px solid #e5e7eb;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563; /* gray-600 */
  margin-top: 1rem;
  margin-bottom: 1rem;
}

:deep(.ql-editor pre.ql-syntax) {
  background-color: #111827; /* gray-900 */
  color: #f3f4f6; /* gray-100 */
  padding: 1rem;
  border-radius: 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

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
</style>