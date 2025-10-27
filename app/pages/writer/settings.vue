<template>
  <div class="max-w-2xl mx-auto text-white space-y-10">
    
    <div>
      <h1 class="font-heading text-3xl mb-1 text-red-500">Danger Zone</h1>
      <p class="text-gray-400 mb-6">These actions are permanent and cannot be undone.</p>

      <div class="space-y-6 p-6 bg-slate-900 border border-red-800/50 rounded-lg">
        <div>
          <h3 class="font-ibm-plex-mono font-bold text-lg text-white">Delete Account</h3>
          <p class="text-gray-400 mt-1 mb-4 text-sm">
            This will permanently delete your writer profile, all of your posts, and all associated images. 
            Your login will remain, but it will no longer be associated with any content.
          </p>
        </div>

        <div>
          <label for="confirm" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
            To confirm, type "DELETE" in the box
          </label>
          <input 
            type="text" 
            id="confirm"
            v-model="confirmText"
            class="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="DELETE"
          />
        </div>

        <div v-if="errorMsg" class="text-red-400 text-sm">{{ errorMsg }}</div>
        <div v-if="successMsg" class="text-green-400 text-sm">{{ successMsg }}</div>

        <div class="pt-2">
          <button 
            @click="handleDeleteAccount"
            :disabled="loading || confirmText !== 'DELETE'"
            class="w-full px-6 py-3 rounded-lg font-bold font-ibm-plex-mono text-white bg-red-600 hover:bg-red-500 transition-all duration-300 disabled:opacity-50 disabled:bg-gray-600"
          >
            {{ loading ? 'Deleting Account...' : 'Permanently Delete My Account' }}
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({
  layout: 'writer',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const loading = ref(false)
const errorMsg = ref(null)
const successMsg = ref(null)
const confirmText = ref('')

// Helper to get writer ID
const getWriterId = async (userId) => {
  const { data, error } = await supabase
    .from('writers')
    .select('id')
    .eq('user_id', userId)
    .single()
  
  if (error || !data) {
    throw new Error('Could not find writer profile.')
  }
  return data.id
}

// Handle Account Deletion
const handleDeleteAccount = async ()=> {
  if (confirmText.value !== 'DELETE') {
    errorMsg.value = 'Confirmation text does not match.'
    return
  }

  loading.value = true
  errorMsg.value = null
  successMsg.value = null

  try {
    // 1. Check for user
    if (!user.value || !user.value.id) {
      throw new Error('User session not found. Please log out and back in.')
    }
    const userId = user.value.id
    
    // 2. Get the writer ID
    const writerId = await getWriterId(userId)

    // 3. Delete all posts
    const { error: postError } = await supabase
      .from('posts')
      .delete()
      .eq('author_id', writerId)
    
    if (postError) throw new Error(`Failed to delete posts: ${postError.message}`)

    // 4. Delete all images from storage
    // 4a. List all files in the writer's folder
    const { data: fileList, error: listError } = await supabase.storage
      .from('post_images')
      .list(writerId) // Assumes images are in a folder named after the writer's ID
      
    if (listError) throw new Error(`Failed to list images: ${listError.message}`)
    
    // 4b. Remove the files
    if (fileList && fileList.length > 0) {
      const filePaths = fileList.map(file => `${writerId}/${file.name}`)
      const { error: removeError } = await supabase.storage
        .from('post_images')
        .remove(filePaths)
        
      if (removeError) throw new Error(`Failed to remove images: ${removeError.message}`)
    }

    // 5. Delete the writer profile
    // (This requires the RLS policy you added)
    const { error: writerError } = await supabase
      .from('writers')
      .delete()
      .eq('id', writerId)

    if (writerError) throw new Error(`Failed to delete writer profile: ${writerError.message}`)

    // 6. Sign out and redirect
    successMsg.value = 'Account deleted successfully. Redirecting...'
    
    // Clear user and sign out
    const { error: signOutError } = await supabase.auth.signOut()
    const user = useSupabaseUser()
    user.value = null
    
    if (signOutError) {
      // Still redirect even if sign out fails
      console.error('Sign out error after delete:', signOutError.message)
    }

    // Redirect to home page
    await router.push('/')

  } catch (err) {
    errorMsg.value = err.message
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>