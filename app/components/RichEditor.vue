<script setup lang="ts">
import { ref, computed } from 'vue'
import { Extension, Node } from '@tiptap/core'
import Underline from '@tiptap/extension-underline'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import { Plugin, PluginKey } from '@tiptap/pm/state'
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

// --- CUSTOM IFRAME NODE ---
const IframeNode = Node.create({
  name: 'iframe',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      width: { default: '560' },
      height: { default: '315' },
      frameborder: { default: '0' },
      allowfullscreen: { default: true },
      allow: { default: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share' },
      referrerpolicy: { default: 'strict-origin-when-cross-origin' },
      title: { default: null },
    }
  },

  parseHTML() {
    return [{ tag: 'iframe[src]' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      { class: 'iframe-wrapper', 'data-iframe-wrapper': '' },
      ['iframe', {
        ...HTMLAttributes,
        referrerpolicy: 'strict-origin-when-cross-origin',
        allowfullscreen: '',
      }],
    ]
  },

  addCommands() {
    return {
      insertIframe:
        (attrs: Record<string, any>) =>
        ({ commands }: any) =>
          commands.insertContent({ type: 'iframe', attrs }),
    } as any
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('iframePaste'),
        props: {
          handlePaste: (view, event) => {
            const html = event.clipboardData?.getData('text/html') || ''
            const text = event.clipboardData?.getData('text/plain')?.trim() || ''

            const iframeMatch = (html || text).match(/<iframe[^>]+src=["']([^"']+)["'][^>]*>/i)
            if (iframeMatch) {
              const src = iframeMatch[1]
              if (!src) return false
              const { dispatch, state } = view
              const node = state.schema.nodes.iframe?.create({ src })
              if (!node) return false
              dispatch(state.tr.replaceSelectionWith(node))
              return true
            }

            const ytId = extractYoutubeId(text)
            if (ytId) {
              const { dispatch, state } = view
              const node = state.schema.nodes.iframe?.create({
                src: `https://www.youtube.com/embed/${ytId}`,
                title: 'YouTube video player',
              })
              if (!node) return false
              dispatch(state.tr.replaceSelectionWith(node))
              return true
            }

            return false
          },
        },
      }),
    ]
  },
})

// --- YOUTUBE URL HELPER ---
const YT_REGEX = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch[?&]v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/

function extractYoutubeId(text: string): string | null {
  const match = text.match(YT_REGEX)
  return match ? match[1]! : null
}

function extractIframeSrc(raw: string): string | null {
  const match = raw.match(/src=["']([^"']+)["']/i)
  return match ? match[1]! : null
}

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const config = useRuntimeConfig()
const CLOUD_NAME = config.public.cloudinaryCloudName
const UPLOAD_PRESET = config.public.cloudinaryUploadPreset

const editorRef = useTemplateRef<{ editor: Editor | undefined }>('editorRef')
const fileInput = ref<HTMLInputElement | null>(null)
const isUploading = ref(false)

const showYoutubeDialog = ref(false)
const youtubeUrlInput = ref('')
const youtubeUrlError = ref('')

function openYoutubeDialog() {
  youtubeUrlInput.value = ''
  youtubeUrlError.value = ''
  showYoutubeDialog.value = true
}

function closeYoutubeDialog() {
  showYoutubeDialog.value = false
}

function commitYoutubeEmbed() {
  const raw = youtubeUrlInput.value.trim()
  if (!raw) {
    youtubeUrlError.value = 'Please enter an embed code or URL.'
    return
  }

  const editor = editorRef.value?.editor
  if (!editor) return

  if (raw.startsWith('<iframe') || raw.startsWith('<IFRAME')) {
    const src = extractIframeSrc(raw)
    if (!src) {
      youtubeUrlError.value = 'Could not find a src URL in that embed code.'
      return
    }
    ;(editor as any).chain().focus().insertIframe({ src, title: 'YouTube video player' }).run()
    closeYoutubeDialog()
    return
  }

  const videoId = extractYoutubeId(raw)
  if (!videoId) {
    youtubeUrlError.value = 'Paste the YouTube <iframe> embed code, or a youtube.com / youtu.be URL.'
    return
  }
  ;(editor as any).chain().focus().insertIframe({
    src: `https://www.youtube.com/embed/${videoId}`,
    title: 'YouTube video player',
  }).run()
  closeYoutubeDialog()
}

const showTableMenu = ref(false)
function closeTableMenu() {
  showTableMenu.value = false
}

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
  insertTable: {
    canExecute: (editor: Editor) => !editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => editor.isActive('table'),
  },
  addColumnBefore: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().addColumnBefore().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  addColumnAfter: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().addColumnAfter().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  deleteColumn: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().deleteColumn().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  addRowBefore: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().addRowBefore().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  addRowAfter: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().addRowAfter().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  deleteRow: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().deleteRow().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  deleteTable: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().deleteTable().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  mergeCells: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().mergeCells().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  splitCell: {
    canExecute: (editor: Editor) => editor.isActive('table'),
    execute: (editor: Editor) => {
      editor.chain().focus().splitCell().run()
      closeTableMenu()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: (editor: Editor) => !editor.isActive('table'),
  },
  insertYoutube: {
    canExecute: () => true,
    execute: (editor: Editor) => {
      openYoutubeDialog()
      return editor.chain()
    },
    isActive: () => false,
    isDisabled: () => false,
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
    }
  } catch (e) {
    // Fail silently
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
        { kind: 'insertYoutube', icon: 'i-lucide-youtube' },
      ],
    ] satisfies EditorToolbarItem<typeof customHandlers>[][]
)
</script>

<template>
  <div class="min-w-0 w-full border border-gray-200 rounded-xl bg-white shadow-sm focus-within:ring-2 focus-within:ring-black/5 transition-all text-gray-950">
    <UEditor
      ref="editorRef"
      v-slot="{ editor }"
      :model-value="modelValue"
      content-type="html"
      :extensions="[
        Underline,
        TextStyle,
        Color,
        FontSize,
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
        IframeNode,
      ]"
      :handlers="customHandlers"
      :starter-kit="{
        heading: { levels: [2, 3] },
        dropcursor: { color: 'var(--ui-primary)', width: 2 },
        link: { openOnClick: false },
      }"
      :placeholder="{ placeholder: 'Start writing your story...', mode: 'firstLine' }"
      :ui="{ base: 'custom-scrollbar focus:outline-none min-h-[300px] sm:min-h-[400px] max-h-[500px] overflow-y-auto max-w-none p-4 sm:p-6' }"
      @update:model-value="emit('update:modelValue', $event as string)"
    >
      <div 
        class="min-w-0 border-b border-gray-100 bg-white sticky top-0 z-20 shadow-sm rounded-t-xl"
        :class="showTableMenu ? 'overflow-visible' : 'overflow-x-auto'"
      >
        <div class="flex items-center gap-1 p-2 min-h-[42px] w-max min-w-full">
          <UEditorToolbar :editor="editor" :items="toolbarItems" />

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
              @input="(e) => {
                const val = (e.target as HTMLInputElement).value
                if (val === '#000000') {
                  editor.chain().focus().unsetColor().run()
                } else {
                  editor.chain().focus().setColor(val).run()
                }
              }"
            />
          </div>

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

          <div class="w-px h-5 bg-gray-200 shrink-0 mx-1" />

          <div class="relative shrink-0">
            <div
              v-if="showTableMenu"
              class="fixed inset-0 z-30 cursor-default"
              @click.stop="closeTableMenu"
            ></div>

            <button
              type="button"
              title="Table options"
              class="table-trigger relative z-40"
              :class="{ 'table-trigger--active': showTableMenu || editor.isActive('table') }"
              @click="showTableMenu = !showTableMenu"
            >
              <span class="i-lucide-table-2 w-4 h-4" />
              <span class="table-trigger-label">Table</span>
              <span
                class="i-lucide-chevron-down w-3 h-3 transition-transform duration-150"
                :class="{ 'rotate-180': showTableMenu }"
              />
            </button>

            <div v-if="showTableMenu" class="table-panel z-40">
              <div class="table-panel-section">
                <p class="table-panel-heading">Insert</p>
                <button type="button" class="table-action" @click="customHandlers.insertTable.execute(editor)">
                  <span class="table-action-icon bg-blue-50 text-blue-600">
                    <span class="i-lucide-table-2 w-3.5 h-3.5" />
                  </span>
                  <span class="flex flex-col items-start">
                    <strong class="text-gray-900 font-medium">New table</strong>
                    <span class="table-action-hint">3 × 3 with header row</span>
                  </span>
                </button>
              </div>

              <template v-if="editor.isActive('table')">
                <div class="table-panel-divider" />
                <div class="table-panel-section">
                  <p class="table-panel-heading">Columns</p>
                  <div class="table-icon-row">
                    <button type="button" class="table-icon-btn" title="Add column before" @click="customHandlers.addColumnBefore.execute(editor)">
                      <span class="i-lucide-arrow-left-to-line w-4 h-4" />
                      <span class="table-icon-label">Before</span>
                    </button>
                    <button type="button" class="table-icon-btn" title="Add column after" @click="customHandlers.addColumnAfter.execute(editor)">
                      <span class="i-lucide-arrow-right-to-line w-4 h-4" />
                      <span class="table-icon-label">After</span>
                    </button>
                    <button type="button" class="table-icon-btn table-icon-btn--danger" title="Delete column" @click="customHandlers.deleteColumn.execute(editor)">
                      <span class="i-lucide-trash-2 w-4 h-4" />
                      <span class="table-icon-label">Delete</span>
                    </button>
                  </div>
                </div>

                <div class="table-panel-section">
                  <p class="table-panel-heading">Rows</p>
                  <div class="table-icon-row">
                    <button type="button" class="table-icon-btn" title="Add row above" @click="customHandlers.addRowBefore.execute(editor)">
                      <span class="i-lucide-arrow-up-to-line w-4 h-4" />
                      <span class="table-icon-label">Above</span>
                    </button>
                    <button type="button" class="table-icon-btn" title="Add row below" @click="customHandlers.addRowAfter.execute(editor)">
                      <span class="i-lucide-arrow-down-to-line w-4 h-4" />
                      <span class="table-icon-label">Below</span>
                    </button>
                    <button type="button" class="table-icon-btn table-icon-btn--danger" title="Delete row" @click="customHandlers.deleteRow.execute(editor)">
                      <span class="i-lucide-trash-2 w-4 h-4" />
                      <span class="table-icon-label">Delete</span>
                    </button>
                  </div>
                </div>

                <div class="table-panel-section">
                  <p class="table-panel-heading">Cells</p>
                  <div class="table-icon-row">
                    <button type="button" class="table-icon-btn" title="Merge selected cells" @click="customHandlers.mergeCells.execute(editor)">
                      <span class="i-lucide-merge w-4 h-4" />
                      <span class="table-icon-label">Merge</span>
                    </button>
                    <button type="button" class="table-icon-btn" title="Split merged cell" @click="customHandlers.splitCell.execute(editor)">
                      <span class="i-lucide-split w-4 h-4" />
                      <span class="table-icon-label">Split</span>
                    </button>
                  </div>
                </div>

                <div class="table-panel-divider" />
                <div class="table-panel-section">
                  <button type="button" class="table-action table-action--danger" @click="customHandlers.deleteTable.execute(editor)">
                    <span class="table-action-icon bg-red-50 text-red-500">
                      <span class="i-lucide-trash-2 w-3.5 h-3.5" />
                    </span>
                    <span class="flex flex-col items-start">
                      <strong class="font-medium">Delete table</strong>
                      <span class="table-action-hint">Remove entire table</span>
                    </span>
                  </button>
                </div>
              </template>

              <template v-else>
                <div class="table-panel-divider" />
                <p class="table-no-table-hint">
                  <span class="i-lucide-info w-3.5 h-3.5 shrink-0" />
                  Click inside a table to see edit options
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </UEditor>

    <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFile" />
  </div>

  <Teleport to="body">
    <Transition name="yt-dialog">
      <div v-if="showYoutubeDialog" class="yt-overlay" @click.self="closeYoutubeDialog">
        <div class="yt-dialog" role="dialog" aria-modal="true" aria-label="Embed YouTube video">
          <div class="yt-dialog-header">
            <div class="yt-dialog-icon">
              <span class="i-lucide-youtube w-5 h-5 text-red-500" />
            </div>
            <div>
              <p class="yt-dialog-title">Embed YouTube video</p>
              <p class="yt-dialog-subtitle">Paste a YouTube URL to embed it in the editor</p>
            </div>
            <button type="button" class="yt-dialog-close" @click="closeYoutubeDialog">
              <span class="i-lucide-x w-4 h-4" />
            </button>
          </div>

          <div class="yt-dialog-body">
            <label class="yt-label" for="yt-url-input">Embed code or URL</label>
            <textarea
              id="yt-url-input"
              v-model="youtubeUrlInput"
              class="yt-input yt-textarea"
              :class="{ 'yt-input--error': youtubeUrlError }"
              placeholder='Paste the YouTube <iframe> embed code, or a youtube.com / youtu.be link'
              autocomplete="off"
              rows="3"
              @keydown.esc="closeYoutubeDialog"
              @input="youtubeUrlError = ''"
            />
            <p v-if="youtubeUrlError" class="yt-error">
              <span class="i-lucide-triangle-alert w-3.5 h-3.5" />
              {{ youtubeUrlError }}
            </p>
            <p v-else class="yt-hint">
              Accepts YouTube's official &lt;iframe&gt; embed code, or a watch / share URL
            </p>
          </div>

          <div class="yt-dialog-footer">
            <button type="button" class="yt-btn-cancel" @click="closeYoutubeDialog">Cancel</button>
            <button type="button" class="yt-btn-embed" @click="commitYoutubeEmbed">
              <span class="i-lucide-play w-3.5 h-3.5" />
              Embed video
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Styles remain unchanged */
:deep([role="toolbar"] button) { color: #111111; background-color: transparent; }
:deep([role="toolbar"] button:hover) { background-color: #f3f4f6; color: #000000; }
:deep([role="toolbar"] button[data-active="true"]),
:deep([role="toolbar"] button[aria-pressed="true"]) { background-color: #111111; color: #ffffff; }
:deep([role="toolbar"] button:disabled) { color: #d1d5db; }
:deep([role="toolbar"] [data-slot="separator"]) { background-color: #e5e7eb; }
.toolbar-color-btn:hover { background-color: #f3f4f6; }

.table-trigger { display: inline-flex; align-items: center; gap: 0.3rem; height: 2rem; padding: 0 0.5rem; font-size: 0.75rem; font-weight: 500; color: #374151; background: white; border: 1px solid #e5e7eb; border-radius: 0.375rem; cursor: pointer; transition: background 0.1s, border-color 0.1s, color 0.1s; white-space: nowrap; }
.table-trigger:hover { background: #f9fafb; border-color: #d1d5db; color: #111827; }
.table-trigger--active { background: #111827; border-color: #111827; color: #fff; }
.table-trigger-label { font-size: 0.75rem; }

.table-panel { position: absolute; left: 0; top: calc(100% + 6px); z-index: 50; background: white; border: 1px solid #e5e7eb; border-radius: 0.75rem; box-shadow: 0 8px 24px -4px rgba(0,0,0,0.12), 0 2px 8px -2px rgba(0,0,0,0.06); min-width: 200px; overflow: hidden; }
.table-panel-section { padding: 0.5rem 0.625rem; }
.table-panel-divider { height: 1px; background: #f3f4f6; margin: 0; }
.table-panel-heading { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: #9ca3af; margin-bottom: 0.375rem; padding: 0 0.25rem; }

.table-action { display: flex; align-items: center; gap: 0.625rem; width: 100%; padding: 0.375rem 0.375rem; border-radius: 0.5rem; cursor: pointer; background: transparent; border: none; text-align: left; transition: background 0.1s; }
.table-action:hover { background: #f3f4f6; }
.table-action--danger:hover { background: #fef2f2; }
.table-action--danger strong { color: #dc2626 !important; }
.table-action-icon { display: flex; align-items: center; justify-content: center; width: 2rem; height: 2rem; border-radius: 0.375rem; flex-shrink: 0; }
.table-action-hint { font-size: 0.65rem; color: #9ca3af; display: block; }

.table-icon-row { display: flex; gap: 0.25rem; }
.table-icon-btn { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; flex: 1; padding: 0.4rem 0.25rem; border-radius: 0.5rem; background: #f9fafb; border: 1px solid #f3f4f6; color: #374151; cursor: pointer; transition: background 0.1s, border-color 0.1s, color 0.1s; }
.table-icon-btn:hover { background: #e5e7eb; border-color: #d1d5db; color: #111827; }
.table-icon-btn--danger { color: #ef4444; background: #fff5f5; border-color: #fee2e2; }
.table-icon-btn--danger:hover { background: #fee2e2; border-color: #fca5a5; color: #dc2626; }
.table-icon-label { font-size: 0.6rem; font-weight: 500; letter-spacing: 0.02em; line-height: 1; }

.table-no-table-hint { display: flex; align-items: center; gap: 0.375rem; padding: 0.5rem 0.875rem 0.625rem; font-size: 0.7rem; color: #9ca3af; font-style: italic; }

:deep(.tiptap .iframe-wrapper) { position: relative; width: 100%; padding-top: 56.25%; border-radius: 0.625rem; overflow: hidden; margin: 1.25rem 0; background: #000; }
:deep(.tiptap .iframe-wrapper iframe) { position: absolute; inset: 0; width: 100% !important; height: 100% !important; border: none; }
.yt-textarea { height: auto !important; resize: none; padding: 0.625rem 0.75rem; line-height: 1.5; font-family: ui-monospace, monospace; font-size: 0.8rem !important; }
.yt-overlay { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); backdrop-filter: blur(3px); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 1rem; }
.yt-dialog { background: white; border-radius: 1rem; width: 100%; max-width: 440px; box-shadow: 0 24px 48px -8px rgba(0,0,0,0.2), 0 8px 16px -4px rgba(0,0,0,0.08); overflow: hidden; }
.yt-dialog-header { display: flex; align-items: flex-start; gap: 0.75rem; padding: 1.25rem 1.25rem 0; }
.yt-dialog-icon { display: flex; align-items: center; justify-content: center; width: 2.5rem; height: 2.5rem; background: #fef2f2; border-radius: 0.625rem; flex-shrink: 0; }
.yt-dialog-title { font-size: 0.9375rem; font-weight: 600; color: #111827; line-height: 1.3; }
.yt-dialog-subtitle { font-size: 0.75rem; color: #6b7280; margin-top: 0.125rem; }
.yt-dialog-close { margin-left: auto; display: flex; align-items: center; justify-content: center; width: 1.75rem; height: 1.75rem; border-radius: 0.375rem; background: transparent; border: none; color: #9ca3af; cursor: pointer; transition: background 0.1s, color 0.1s; flex-shrink: 0; }
.yt-dialog-close:hover { background: #f3f4f6; color: #374151; }
.yt-dialog-body { padding: 1rem 1.25rem; }
.yt-label { display: block; font-size: 0.75rem; font-weight: 600; color: #374151; margin-bottom: 0.375rem; }
.yt-input { display: block; width: 100%; height: 2.5rem; padding: 0 0.75rem; font-size: 0.875rem; color: #111827; background: white; border: 1.5px solid #e5e7eb; border-radius: 0.5rem; outline: none; transition: border-color 0.15s, box-shadow 0.15s; box-sizing: border-box; }
.yt-input:focus { border-color: #6b7280; box-shadow: 0 0 0 3px rgba(107,114,128,0.12); }
.yt-input--error { border-color: #ef4444 !important; box-shadow: 0 0 0 3px rgba(239,68,68,0.12) !important; }
.yt-error { display: flex; align-items: center; gap: 0.3rem; font-size: 0.72rem; color: #ef4444; margin-top: 0.375rem; }
.yt-hint { font-size: 0.7rem; color: #9ca3af; margin-top: 0.375rem; }
.yt-dialog-footer { display: flex; justify-content: flex-end; gap: 0.5rem; padding: 0.875rem 1.25rem 1.25rem; border-top: 1px solid #f3f4f6; }
.yt-btn-cancel { height: 2.25rem; padding: 0 1rem; font-size: 0.8125rem; font-weight: 500; color: #374151; background: white; border: 1px solid #e5e7eb; border-radius: 0.5rem; cursor: pointer; transition: background 0.1s; }
.yt-btn-cancel:hover { background: #f9fafb; }
.yt-btn-embed { display: flex; align-items: center; gap: 0.375rem; height: 2.25rem; padding: 0 1rem; font-size: 0.8125rem; font-weight: 600; color: white; background: #111827; border: none; border-radius: 0.5rem; cursor: pointer; transition: background 0.1s; }
.yt-btn-embed:hover { background: #1f2937; }

.yt-dialog-enter-active, .yt-dialog-leave-active { transition: opacity 0.2s ease; }
.yt-dialog-enter-active .yt-dialog, .yt-dialog-leave-active .yt-dialog { transition: transform 0.2s ease, opacity 0.2s ease; }
.yt-dialog-enter-from, .yt-dialog-leave-to { opacity: 0; }
.yt-dialog-enter-from .yt-dialog, .yt-dialog-leave-to .yt-dialog { transform: scale(0.96) translateY(8px); opacity: 0; }

:deep(.tiptap pre) { background: #0d0d0d; color: #fff; font-family: 'JetBrainsMono', monospace; padding: 0.75rem 1rem; border-radius: 0.5rem; margin: 1.5rem 0; }
:deep(.tiptap code) { color: inherit; padding: 0; background: none; font-size: 0.8rem; }
:deep(.tiptap table) { border-collapse: collapse; width: 100%; margin: 1rem 0; table-layout: fixed; overflow: hidden; }
:deep(.tiptap td), :deep(.tiptap th) { border: 1px solid #e5e7eb; padding: 0.5rem 0.75rem; min-width: 60px; vertical-align: top; position: relative; box-sizing: border-box; }
:deep(.tiptap th) { background-color: #f9fafb; font-weight: 600; font-size: 0.875rem; color: #111827; text-align: left; }
:deep(.tiptap td) { font-size: 0.875rem; color: #374151; }
:deep(.tiptap .selectedCell) { background-color: #eff6ff; }
:deep(.tiptap .column-resize-handle) { position: absolute; right: -2px; top: 0; bottom: -2px; width: 4px; background-color: #3b82f6; pointer-events: none; }
:deep(.tiptap.resize-cursor) { cursor: col-resize; }
:deep(.custom-scrollbar) { scrollbar-width: thin; scrollbar-color: #d1d5db transparent; }
:deep(.custom-scrollbar::-webkit-scrollbar) { width: 8px; height: 8px; }
:deep(.custom-scrollbar::-webkit-scrollbar-track) { background: transparent; }
:deep(.overflow-x-auto::-webkit-scrollbar) { display: none; }
:deep(.overflow-x-auto) { -ms-overflow-style: none; scrollbar-width: none; }

:deep(.tiptap h2) { font-size: 1.5rem; font-weight: 700; color: #111827; margin-top: 1.5rem; margin-bottom: 0.75rem; line-height: 1.3; }
:deep(.tiptap h3) { font-size: 1.25rem; font-weight: 600; color: #111827; margin-top: 1.25rem; margin-bottom: 0.5rem; line-height: 1.3; }
:deep(.tiptap p) { margin-bottom: 0.75rem; line-height: 1.6; }
:deep(.tiptap ul) { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 0.75rem; color: #374151; }
:deep(.tiptap ol) { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 0.75rem; color: #374151; }
:deep(.tiptap li) { margin-bottom: 0.25rem; }
:deep(.tiptap li p) { margin-top: 0; margin-bottom: 0; }
:deep(.tiptap blockquote) { border-left: 4px solid #e5e7eb; padding-left: 1rem; margin-left: 0; margin-right: 0; margin-bottom: 0.75rem; font-style: italic; color: #4b5563; }
:deep(.tiptap a) { color: #3b82f6; text-decoration: underline; text-underline-offset: 2px; cursor: pointer; }
:deep(.tiptap a:hover) { color: #2563eb; }
</style>