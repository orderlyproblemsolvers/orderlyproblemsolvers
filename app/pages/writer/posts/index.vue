<template>
  <div class="text-white">
    <div class="flex flex-wrap gap-4 justify-between items-center mb-8">
      <h1 class="font-heading text-3xl">All Posts</h1>
      <NuxtLink 
        to="/writer/new"
        class="flex-shrink-0 flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-yellow-400 text-black rounded-lg font-ibm-plex-mono font-bold text-sm hover:bg-yellow-300 transition-colors duration-300"
      >
        <svg class="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        <span class="hidden sm:inline">New Post</span>
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center text-gray-400">Loading posts...</div>
    
    <div v-else-if="errorMsg" class="text-red-400 bg-red-900/50 border border-red-800 rounded-lg p-4">
      {{ errorMsg }}
    </div>

    <div v-else-if="posts.length === 0" class="text-center text-gray-400 border-2 border-dashed border-gray-700 rounded-lg p-12">
      <p class="font-heading text-xl mb-2">No posts found.</p>
      <p class="font-ibm-plex-mono">Click "New Post" to get started.</p>
    </div>
    
    <div v-else>
      <div class="hidden md:block bg-slate-900 border border-gray-800 rounded-lg overflow-x-auto">
        <table class="w-full min-w-full divide-y divide-gray-800">
          <thead class="bg-slate-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Tag</th>
              <th class="px-6 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-right text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr v-for="post in posts" :key="post.id" class="hover:bg-slate-800/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <NuxtLink :to="`/writer/posts/${post.slug}`" class="font-bold text-white hover:text-yellow-400 transition-colors">
                  {{ post.title }}
                </NuxtLink>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-3 py-1 text-xs font-bold rounded-full"
                  :class="post.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'"
                >
                  {{ post.status.charAt(0).toUpperCase() + post.status.slice(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-ibm-plex-mono">{{ post.tag }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{{ new Date(post.created_at).toLocaleDateString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                <NuxtLink :to="`/writer/edit/${post.id}`" class="text-yellow-400 hover:text-yellow-300 transition-colors">Edit</NuxtLink>
                <button 
                  @click="deletePost(post)" 
                  class="text-red-500 hover:text-red-400 transition-colors" 
                  :disabled="isDeleting(post.id)"
                >
                  {{ isDeleting(post.id) ? 'Deleting...' : 'Delete' }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="md:hidden space-y-4">
        <div 
          v-for="post in posts" 
          :key="post.id" 
          class="bg-slate-900 border border-gray-800 rounded-lg p-4"
        >
          <div class="flex justify-between items-start gap-3">
            <NuxtLink :to="`/writer/posts/${post.slug}`" class="flex-1">
              <h3 class="font-bold text-white text-lg leading-tight hover:text-yellow-400 transition-colors">{{ post.title }}</h3>
            </NuxtLink>
            <div class="flex-shrink-0 space-x-3">
              <NuxtLink :to="`/writer/edit/${post.id}`" class="text-sm text-yellow-400 hover:text-yellow-300 font-medium">Edit</NuxtLink>
              <button 
                @click="deletePost(post)" 
                class="text-sm text-red-500 hover:text-red-400 font-medium" 
                :disabled="isDeleting(post.id)"
              >
                {{ isDeleting(post.id) ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-3">
            <span 
              class="px-3 py-1 text-xs font-bold rounded-full"
              :class="post.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'"
            >
              {{ post.status.charAt(0).toUpperCase() + post.status.slice(1) }}
            </span>
            <span class="text-gray-300 font-ibm-plex-mono">{{ post.tag }}</span>
            <span class="text-gray-400 ml-auto">{{ new Date(post.created_at).toLocaleDateString() }}</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

definePageMeta({
  layout: 'writer',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const posts = ref([])
const loading = ref(true)
const errorMsg = ref(null)
const deletingPostId = ref(null)

const isDeleting = (id) => deletingPostId.value === id

const fetchPosts = async (userId) => {
  try {
    loading.value = true
    errorMsg.value = null

    const { data: writerData, error: writerError } = await supabase
      .from('writers')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (writerError) throw new Error(`Could not find writer profile: ${writerError.message}`)
    
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, status, tag, created_at, slug, image_url') // Added slug and image_url
      .eq('author_id', writerData.id)
      .order('created_at', { ascending: false })
      
    if (error) throw error
    posts.value = data

  } catch (err) {
    errorMsg.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deletePost = async (post) => {
  if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) {
    return
  }

  deletingPostId.value = post.id
  errorMsg.value = null

  try {
    // 1. Delete the post record
    const { error: postError } = await supabase
      .from('posts')
      .delete()
      .eq('id', post.id)
    
    if (postError) throw postError

    // 2. If post deletion was successful, try deleting the image
    if (post.image_url) {
      try {
        const imagePath = post.image_url.split('/post_images/')[1]
        if (imagePath) {
          const { error: storageError } = await supabase.storage
            .from('post_images')
            .remove([imagePath])
          
          if (storageError) {
            console.warn('Post deleted, but failed to delete image from storage:', storageError.message)
            // Don't throw, as the main record is gone. Just warn.
          }
        }
      } catch (e) {
        console.warn('Error parsing image path for deletion:', e.message)
      }
    }

    // 3. Update UI
    posts.value = posts.value.filter(p => p.id !== post.id)

  } catch (err) {
    errorMsg.value = `Failed to delete post: ${err.message}`
    console.error(err)
  } finally {
    deletingPostId.value = null
  }
}

// Replaced onMounted with the safer watch pattern
watch(user, (currentUser) => {
  if (currentUser && currentUser.id) {
    fetchPosts(currentUser.id)
  }
}, { immediate: true })
</script>