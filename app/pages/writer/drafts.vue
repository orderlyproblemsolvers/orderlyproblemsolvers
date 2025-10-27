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

    <div v-if="loading" class="text-center text-gray-400">Loading drafts...</div>
    
    <div v-else-if="errorMsg" class="text-red-400 bg-red-900/50 border border-red-800 rounded-lg p-4">
      {{ errorMsg }}
    </div>

    <div v-else-if="drafts.length === 0" class="text-center text-gray-400 border-2 border-dashed border-gray-700 rounded-lg p-12">
      <p class="font-heading text-xl mb-2">No drafts found.</p>
      <p class="font-ibm-plex-mono">You haven't saved any drafts yet.</p>
    </div>
    
    <div v-else>
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
            <tr v-for="post in drafts" :key="post.id" class="hover:bg-slate-800/50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="font-bold text-white">{{ post.title }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300 font-ibm-plex-mono">{{ post.tag || 'N/A' }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{{ new Date(post.created_at).toLocaleDateString() }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <a href="#" class="text-yellow-400 hover:text-yellow-300">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="md:hidden space-y-4">
        <div 
          v-for="post in drafts" 
          :key="post.id" 
          class="bg-slate-900 border border-gray-800 rounded-lg p-4"
        >
          <div class="flex justify-between items-start gap-3">
            <h3 class="font-bold text-white text-lg leading-tight">{{ post.title }}</h3>
            <a href="#" class="flex-shrink-0 text-sm text-yellow-400 hover:text-yellow-300 font-medium">Edit</a>
          </div>
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm mt-3">
            <span class="text-gray-300 font-ibm-plex-mono">{{ post.tag || 'N/A' }}</span>
            <span class="text-gray-400 ml-auto">Saved: {{ new Date(post.created_at).toLocaleDateString() }}</span>
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
const drafts = ref([]) // Renamed from posts
const loading = ref(true)
const errorMsg = ref(null)

const fetchDrafts = async (userId) => {
  try {
    loading.value = true
    errorMsg.value = null

    // First, get the writer's ID
    const { data: writerData, error: writerError } = await supabase
      .from('writers')
      .select('id')
      .eq('user_id', userId)
      .single()

    if (writerError) throw new Error(`Could not find writer profile: ${writerError.message}`)
    
    // Now fetch posts using the writer's profile ID
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, status, tag, created_at')
      .eq('author_id', writerData.id)
      .eq('status', 'draft') // <-- The key change is here
      .order('created_at', { ascending: false })
      
    if (error) throw error
    drafts.value = data // Renamed from posts

  } catch (err) {
    errorMsg.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Use the safe watch pattern
watch(user, (currentUser) => {
  if (currentUser && currentUser.id) {
    fetchDrafts(currentUser.id)
  }
}, { immediate: true })
</script>