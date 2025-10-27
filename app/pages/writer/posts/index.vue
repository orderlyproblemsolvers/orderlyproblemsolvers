<template>
  <div class="text-white w-full">
    <div class="flex flex-wrap gap-3 sm:gap-4 justify-between items-center mb-6 sm:mb-8">
      <h1 class="font-heading text-2xl sm:text-3xl">All Posts</h1>
      <NuxtLink 
        to="/writer/new"
        class="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-ibm-plex-mono font-bold text-sm hover:bg-yellow-300 transition-colors duration-300"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        <span>New Post</span>
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center text-gray-400 py-8">Loading posts...</div>
    
    <div v-else-if="errorMsg" class="text-red-400 bg-red-900/50 border border-red-800 rounded-lg p-4">
      {{ errorMsg }}
    </div>

    <div v-else-if="posts.length === 0" class="text-center text-gray-400 border-2 border-dashed border-gray-700 rounded-lg p-8 sm:p-12">
      <p class="font-heading text-xl mb-2">No posts found.</p>
      <p class="font-ibm-plex-mono">Click "New Post" to get started.</p>
    </div>
    
    <div v-else class="w-full">
      <!-- Desktop Table -->
      <div class="hidden lg:block bg-slate-900 border border-gray-800 rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-slate-800">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Title</th>
                <th class="px-4 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th class="px-4 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Tag</th>
                <th class="px-4 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Created</th>
                <th class="px-4 py-3 text-right text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-800">
              <tr v-for="post in posts" :key="post.id" class="hover:bg-slate-800/50">
                <td class="px-4 py-4">
                  <NuxtLink :to="`/writer/posts/${post.slug}`" class="font-bold text-white hover:text-yellow-400 transition-colors line-clamp-2">
                    {{ post.title }}
                  </NuxtLink>
                </td>
                <td class="px-4 py-4 whitespace-nowrap">
                  <span 
                    class="px-3 py-1 text-xs font-bold rounded-full inline-block"
                    :class="post.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'"
                  >
                    {{ post.status.charAt(0).toUpperCase() + post.status.slice(1) }}
                  </span>
                </td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-300 font-ibm-plex-mono">{{ post.tag }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{{ new Date(post.created_at).toLocaleDateString() }}</td>
                <td class="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end gap-4">
                    <NuxtLink :to="`/writer/edit/${post.id}`" class="text-yellow-400 hover:text-yellow-300 transition-colors">Edit</NuxtLink>
                    <button 
                      @click="deletePost(post)" 
                      class="text-red-500 hover:text-red-400 transition-colors" 
                      :disabled="isDeleting(post.id)"
                    >
                      {{ isDeleting(post.id) ? 'Deleting...' : 'Delete' }}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Mobile Cards -->
      <div class="lg:hidden space-y-4">
        <div 
          v-for="post in posts" 
          :key="post.id" 
          class="bg-slate-900 border border-gray-800 rounded-lg p-4"
        >
          <div class="mb-3">
            <NuxtLink :to="`/writer/posts/${post.slug}`" class="block">
              <h3 class="font-bold text-white text-lg leading-tight hover:text-yellow-400 transition-colors break-words">
                {{ post.title }}
              </h3>
            </NuxtLink>
          </div>
          
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span 
              class="px-3 py-1 text-xs font-bold rounded-full"
              :class="post.status === 'published' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'"
            >
              {{ post.status.charAt(0).toUpperCase() + post.status.slice(1) }}
            </span>
            <span class="text-gray-300 font-ibm-plex-mono text-sm">{{ post.tag }}</span>
          </div>
          
          <div class="flex items-center justify-between gap-3 text-sm">
            <span class="text-gray-400">{{ new Date(post.created_at).toLocaleDateString() }}</span>
            <div class="flex items-center gap-3">
              <NuxtLink :to="`/writer/edit/${post.id}`" class="text-yellow-400 hover:text-yellow-300 font-medium">Edit</NuxtLink>
              <button 
                @click="deletePost(post)" 
                class="text-red-500 hover:text-red-400 font-medium" 
                :disabled="isDeleting(post.id)"
              >
                {{ isDeleting(post.id) ? 'Deleting...' : 'Delete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useWriterAuth } from '~/composables/useWriterAuth'

definePageMeta({
  layout: 'writer',
})

const supabase = useSupabaseClient()
const { isReady, getWriterId } = useWriterAuth()

const posts = ref([])
const loading = ref(true)
const errorMsg = ref(null)
const deletingPostId = ref(null)

const isDeleting = (id) => deletingPostId.value === id

const fetchPosts = async () => {
  const writerId = getWriterId()
  if (!writerId) {
    errorMsg.value = "Could not verify writer profile."
    loading.value = false
    return
  }

  try {
    loading.value = true
    errorMsg.value = null
    
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, status, tag, created_at, slug, image_url')
      .eq('author_id', writerId)
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
    const { error: postError } = await supabase
      .from('posts')
      .delete()
      .eq('id', post.id)
    
    if (postError) throw postError

    if (post.image_url) {
      try {
        const urlParts = post.image_url.split('/post_images/')
        const imagePath = urlParts[urlParts.length - 1]
        
        if (imagePath) {
          const { error: storageError } = await supabase.storage
            .from('post_images')
            .remove([imagePath])
          
          if (storageError) {
            console.warn('Post deleted, but failed to delete image from storage:', storageError.message)
          }
        }
      } catch (e) {
        console.warn('Error parsing image path for deletion:', e.message)
      }
    }

    posts.value = posts.value.filter(p => p.id !== post.id)

  } catch (err) {
    errorMsg.value = `Failed to delete post: ${err.message}`
    console.error(err)
  } finally {
    deletingPostId.value = null
  }
}

watch(isReady, (ready) => {
  if (ready) {
    fetchPosts()
  }
}, { immediate: true })
</script>