<template>
  <div class="text-white">
    <div class="flex flex-wrap gap-4 justify-between items-center mb-8">
      <h1 class="font-heading text-3xl">Drafts</h1>
      <NuxtLink 
        to="/writer/new"
        class="flex-shrink-0 flex items-center gap-2 p-2 sm:px-4 sm:py-2 bg-yellow-400 text-black rounded-lg font-ibm-plex-mono font-bold text-sm hover:bg-yellow-300 transition-colors duration-300"
      >
        <svg class="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
        <span class="hidden sm:inline">New Post</span>
      </NuxtLink>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      <p class="mt-4 text-gray-400 font-ibm-plex-mono">Loading drafts...</p>
    </div>
    
    <div v-else-if="errorMsg" class="text-red-400 bg-red-900/50 border border-red-800 rounded-lg p-4">
      {{ errorMsg }}
    </div>

    <div v-else-if="drafts.length === 0" class="text-center text-gray-400 border-2 border-dashed border-gray-700 rounded-lg p-12">
      <svg class="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
      </svg>
      <p class="font-heading text-xl mb-2">No drafts found.</p>
      <p class="font-ibm-plex-mono text-sm">You haven't saved any drafts yet.</p>
      <NuxtLink 
        to="/writer/new"
        class="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-yellow-400 text-black rounded-lg font-ibm-plex-mono font-bold hover:bg-yellow-300 transition-colors duration-300"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
        </svg>
        Create Your First Draft
      </NuxtLink>
    </div>
    
    <div v-else>
      <!-- Desktop Table View -->
      <div class="hidden md:block bg-slate-900 border border-gray-800 rounded-lg overflow-x-auto">
        <table class="w-full min-w-full divide-y divide-gray-800">
          <thead class="bg-slate-800">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Title</th>
              <th class="px-6 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Tag</th>
              <th class="px-6 py-3 text-left text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Last Saved</th>
              <th class="px-6 py-3 text-right text-xs font-ibm-plex-mono font-bold text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-800">
            <tr v-for="post in drafts" :key="post.id" class="hover:bg-slate-800/50 transition-colors">
              <td class="px-6 py-4">
                <NuxtLink 
                  :to="`/writer/edit/${post.id}`"
                  class="font-bold text-white hover:text-yellow-400 transition-colors"
                >
                  {{ post.title }}
                </NuxtLink>
                <p v-if="post.description" class="text-sm text-gray-400 mt-1 line-clamp-1">{{ post.description }}</p>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 text-xs font-ibm-plex-mono font-bold bg-slate-800 text-gray-300 rounded">
                  {{ post.tag || 'N/A' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-ibm-plex-mono">
                {{ formatDate(post.updated_at || post.created_at) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center justify-end gap-3">
                  <NuxtLink 
                    :to="`/writer/edit/${post.id}`"
                    class="text-yellow-400 hover:text-yellow-300 font-ibm-plex-mono font-bold transition-colors"
                  >
                    Edit
                  </NuxtLink>
                  <button
                    @click="deletePost(post.id)"
                    class="text-red-400 hover:text-red-300 font-ibm-plex-mono font-bold transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Card View -->
      <div class="md:hidden space-y-4">
        <div 
          v-for="post in drafts" 
          :key="post.id" 
          class="bg-slate-900 border border-gray-800 rounded-lg p-4"
        >
          <div class="flex justify-between items-start gap-3 mb-3">
            <NuxtLink 
              :to="`/writer/edit/${post.id}`"
              class="font-bold text-white text-lg leading-tight hover:text-yellow-400 transition-colors flex-1"
            >
              {{ post.title }}
            </NuxtLink>
          </div>
          
          <p v-if="post.description" class="text-sm text-gray-400 mb-3 line-clamp-2">
            {{ post.description }}
          </p>
          
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-3">
              <span class="px-2 py-1 text-xs font-ibm-plex-mono font-bold bg-slate-800 text-gray-300 rounded">
                {{ post.tag || 'N/A' }}
              </span>
              <span class="text-gray-400 font-ibm-plex-mono">
                {{ formatDate(post.updated_at || post.created_at) }}
              </span>
            </div>
            
            <div class="flex items-center gap-3">
              <NuxtLink 
                :to="`/writer/edit/${post.id}`"
                class="text-yellow-400 hover:text-yellow-300 font-ibm-plex-mono font-bold"
              >
                Edit
              </NuxtLink>
              <button
                @click="deletePost(post.id)"
                class="text-red-400 hover:text-red-300 font-ibm-plex-mono font-bold"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Footer -->
      <div class="mt-6 text-center text-sm text-gray-400 font-ibm-plex-mono">
        Showing {{ drafts.length }} draft{{ drafts.length !== 1 ? 's' : '' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'writer',
})

const supabase = useSupabaseClient()
const { isReady, waitForAuth, getWriterId } = useWriterAuth()

const drafts = ref([])
const loading = ref(true)
const errorMsg = ref(null)

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now - date
  const diffInHours = diffInMs / (1000 * 60 * 60)
  
  if (diffInHours < 24) {
    const hours = Math.floor(diffInHours)
    if (hours === 0) return 'Just now'
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  }
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined 
  })
}

const fetchDrafts = async () => {
  try {
    loading.value = true
    errorMsg.value = null

    const writerId = getWriterId()
    if (!writerId) {
      throw new Error('Could not find writer profile.')
    }
    
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, description, status, tag, created_at, updated_at')
      .eq('author_id', writerId)
      .eq('status', 'draft')
      .order('updated_at', { ascending: false })
      
    if (error) throw error
    
    drafts.value = data || []

  } catch (err) {
    errorMsg.value = err.message
    console.error('Error fetching drafts:', err)
  } finally {
    loading.value = false
  }
}

const deletePost = async (postId) => {
  if (!confirm('Are you sure you want to delete this draft? This action cannot be undone.')) {
    return
  }

  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId)
      .eq('author_id', getWriterId()) // Ensure only the author can delete

    if (error) throw error

    // Remove from local array
    drafts.value = drafts.value.filter(post => post.id !== postId)
    
  } catch (err) {
    console.error('Error deleting post:', err)
    alert('Failed to delete post: ' + err.message)
  }
}

onMounted(async () => {
  await waitForAuth()
  
  if (isReady.value) {
    await fetchDrafts()
  } else {
    errorMsg.value = "Authentication failed. Please refresh the page."
    loading.value = false
  }
})
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>