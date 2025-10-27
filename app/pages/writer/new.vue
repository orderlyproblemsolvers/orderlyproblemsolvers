<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'writer',
})

const supabase = useSupabaseClient()
const router = useRouter()
const { isReady, waitForAuth, getWriterId, getUserId } = useWriterAuth()

const loading = ref(false)
const errorMsg = ref(null)
const imageFile = ref(null)
const imagePreview = ref(null)
const initializing = ref(true)

const post = ref({
  title: '',
  description: '',
  content: '',
  tag: null,
  image_url: null,
})

const tagOptions = [
  'technology', 'ai', 'science', 'news', 'networking', 
  'hardware', 'graphics', 'web', 'community'
]

onMounted(async () => {
  const ready = await waitForAuth()
  if (!ready) {
    errorMsg.value = 'Session timeout. Please refresh the page.'
  }
  initializing.value = false
})

const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  imageFile.value = file
  
  const reader = new FileReader()

  reader.onload = (event) => {
    imagePreview.value = event.target.result
  }
  reader.readAsDataURL(file)
}

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const handleSubmit = async (status) => {
  if (!post.value.title) {
    errorMsg.value = "Title is required."
    return
  }

  if (!isReady.value) {
    errorMsg.value = "Authentication not ready. Please wait a moment and try again."
    return
  }

  loading.value = true
  errorMsg.value = null

  try {
    const writerId = getWriterId()
    
    if (!writerId) {
      throw new Error("Could not find writer profile.")
    }
    
    // Upload image if one was selected
    if (imageFile.value) {
      const fileExt = imageFile.value.name.split('.').pop()
      const filePath = `${writerId}/${Date.now()}.${fileExt}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('post_images')
        .upload(filePath, imageFile.value)
        
      if (uploadError) throw uploadError
      
      const { data: urlData } = supabase.storage
        .from('post_images')
        .getPublicUrl(uploadData.path)
        
      post.value.image_url = urlData.publicUrl
    }

    const slug = createSlug(post.value.title)

    const { data: postData, error: postError } = await supabase
      .from('posts')
      .insert([
        {
          title: post.value.title,
          description: post.value.description,
          content: post.value.content,
          tag: post.value.tag,
          image_url: post.value.image_url,
          author_id: writerId,
          status: status,
          slug: slug,
        }
      ])
      .select()
      
    if (postError) {
      if (postError.code === '23505') {
        throw new Error('A post with this title (slug) already exists.')
      }
      throw postError
    }

    router.push('/writer/posts')
    
  } catch (err) {
    errorMsg.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto text-white">
    <h1 class="font-heading text-3xl mb-8">Create New Post</h1>
    
    <div v-if="initializing" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      <p class="mt-4 text-gray-400 font-ibm-plex-mono">Initializing...</p>
    </div>
    
    <form v-else @submit.prevent="handleSubmit('published')" class="space-y-6">
      
      <div>
        <label for="title" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">Title</label>
        <input 
          type="text" 
          id="title"
          v-model="post.title"
          required
          class="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="Your Post Title"
        />
      </div>

      <div>
        <label for="image" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">Featured Image</label>
        <input 
          type="file" 
          id="image"
          @change="handleImageUpload"
          accept="image/png, image/jpeg, image/webp"
          class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300 cursor-pointer"
        />
        <img v-if="imagePreview" :src="imagePreview" alt="Image preview" class="mt-4 rounded-lg max-h-60">
      </div>

      <div>
        <label for="description" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">Description (Excerpt)</label>
        <textarea 
          id="description"
          v-model="post.description"
          rows="3"
          class="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="A short summary of your post..."
        ></textarea>
      </div>

      <div>
        <label for="content" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">Content</label>
        <QuillEditor
          v-model:content="post.content"
          contentType="html"
          theme="snow"
          toolbar="full"
          placeholder="Write your post content here..."
          class="editor-container"
        />
      </div>

      <div>
        <label for="tag" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">Tag</label>
        <select 
          id="tag"
          v-model="post.tag"
          required
          class="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option :value="null" disabled>Select a tag</option>
          <option v-for="tag in tagOptions" :key="tag" :value="tag">
            {{ tag.charAt(0).toUpperCase() + tag.slice(1) }}
          </option>
        </select>
      </div>

      <div v-if="errorMsg" class="text-red-400 bg-red-900/50 border border-red-800 rounded-lg p-4">
        {{ errorMsg }}
      </div>

      <div class="flex items-center gap-4 pt-4 border-t border-gray-800">
        <button 
          type="submit"
          :disabled="loading || !isReady" 
          class="px-6 py-3 rounded-lg font-bold font-ibm-plex-mono text-black bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50"
        >
          {{ loading ? 'Publishing...' : 'Publish' }}
        </button>
        <button 
          type="button"
          @click="handleSubmit('draft')"
          :disabled="loading || !isReady" 
          class="px-6 py-3 rounded-lg font-bold font-ibm-plex-mono text-gray-300 bg-slate-800 hover:bg-slate-700 transition-all duration-300 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : 'Save Draft' }}
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.editor-container .ql-toolbar {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-color: #374151;
}
.editor-container .ql-container {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-color: #374151;
}
.editor-container .ql-editor {
  background-color: #1f2937;
  color: #d1d5db;
  min-height: 250px;
}
.editor-container .ql-editor.ql-blank::before {
  color: #6b7280;
  font-style: normal;
}
.editor-container .ql-snow .ql-stroke {
  stroke: #9ca3af;
}
.editor-container .ql-snow .ql-picker-label {
  color: #9ca3af;
}
</style>