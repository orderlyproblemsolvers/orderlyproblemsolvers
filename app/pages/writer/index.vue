<template>
  <div>
    <h2 class="font-heading text-2xl text-white mb-6">
      Welcome, {{ writerName || 'Writer' }}
    </h2>
    
    <div v-if="loadingStats" class="text-gray-400 font-ibm-plex-mono">
      Loading stats...
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-slate-900 border border-gray-800 rounded-lg p-6">
        <p class="text-sm font-ibm-plex-mono text-gray-400">Total Posts</p>
        <p class="font-heading text-4xl text-white">{{ postStats.total }}</p>
      </div>
      
      <div class="bg-slate-900 border border-gray-800 rounded-lg p-6">
        <p class="text-sm font-ibm-plex-mono text-gray-400">Drafts</p>
        <p class="font-heading text-4xl text-white">{{ postStats.drafts }}</p>
      </div>

      <div class="bg-slate-900 border border-gray-800 rounded-lg p-6">
        <p class="text-sm font-ibm-plex-mono text-gray-400">Published</p>
        <p class="font-heading text-4xl text-white">{{ postStats.published }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue' // Removed unused onMounted

definePageMeta({
  layout: 'writer',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const writerName = ref('')
const loadingStats = ref(true)
const postStats = reactive({
  total: 0,
  drafts: 0,
  published: 0
})

const fetchWriterData = async () => {
  // 1. ADDED GUARD: Check for user.value.id
  if (!user.value || !user.value.id) {
    console.warn("fetchWriterData skipped: user.value.id is not available yet.")
    return
  }

  // 2. Fetch Writer Name
  try {
    const { data, error } = await supabase
      .from('writers')
      .select('name, id') // Also fetch the ID
      .eq('user_id', user.value.id)
      .single()
    
    if (error) throw error

    if (data) {
      writerName.value = data.name
      // 3. Fetch Post Stats *after* we have the writer ID
      await fetchPostStats(data.id)
    }
  } catch (error) {
    console.error('Error fetching writer name:', error.message)
  }
}

const fetchPostStats = async (writerId) => {
  loadingStats.value = true
  try {
    // RLS already ensures we only get this writer's posts,
    // but filtering by author_id is still good practice.
    const { data, error, count } = await supabase
      .from('posts')
      .select('status', { count: 'exact', head: false })
      .eq('author_id', writerId)

    if (error) throw error

    // Calculate stats
    postStats.total = count || 0
    postStats.drafts = data.filter(p => p.status === 'draft').length
    postStats.published = data.filter(p => p.status === 'published').length
    
  } catch (error) {
    console.error('Error fetching post stats:', error.message)
  } finally {
    loadingStats.value = false
  }
}

// 3. CLEANED UP WATCHER:
// This single watcher replaces both of your old ones and onMounted.
watch(user, (currentUser) => {
  if (currentUser && currentUser.id) {
    fetchWriterData()
  }
}, { immediate: true })
</script>