import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css' // Import the 'snow' theme CSS

export default defineNuxtPlugin((nuxtApp) => {
  // Registers the component globally
  nuxtApp.vueApp.component('QuillEditor', QuillEditor)
})