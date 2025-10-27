<template>
  <div class="max-w-2xl mx-auto text-white space-y-10">
    
    <div>
      <h1 class="font-heading text-3xl mb-1">Profile</h1>
      <p class="text-gray-400 mb-6">Update your name and profile details.</p>

      <form @submit.prevent="handleUpdateProfile" class="space-y-4 p-6 bg-slate-900 border border-gray-800 rounded-lg">
        <div>
          <label for="email" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">Email</label>
          <input 
            type="email" 
            id="email"
            :value="user?.email"
            disabled
            class="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-400 cursor-not-allowed"
          />
        </div>
        
        <div>
          <label for="name" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">Full Name</label>
          <input 
            type="text" 
            id="name"
            v-model="profile.name"
            required
            class="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Your Full Name"
          />
        </div>

        <div v-if="profileSuccessMsg" class="text-green-400 text-sm">{{ profileSuccessMsg }}</div>
        <div v-if="profileErrorMsg" class="text-red-400 text-sm">{{ profileErrorMsg }}</div>

        <div class="pt-2">
          <button 
            type="submit"
            :disabled="profileLoading"
            class="px-6 py-3 rounded-lg font-bold font-ibm-plex-mono text-black bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50"
          >
            {{ profileLoading ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </form>
    </div>

    <div>
      <h2 class="font-heading text-2xl mb-1">Update Password</h2>
      <p class="text-gray-400 mb-6">Set a new password for your account.</p>

      <form @submit.prevent="handleUpdatePassword" class="space-y-4 p-6 bg-slate-900 border border-gray-800 rounded-lg">
        <div>
          <label for="password" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">New Password</label>
          <input 
            type="password" 
            id="password"
            v-model="password.new"
            required
            minlength="6"
            class="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label for="passwordConfirm" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">Confirm New Password</label>
          <input 
            type="password" 
            id="passwordConfirm"
            v-model="password.confirm"
            required
            class="w-full bg-slate-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="••••••••"
          />
        </div>
        
        <div v-if="passwordSuccessMsg" class="text-green-400 text-sm">{{ passwordSuccessMsg }}</div>
        <div v-if="passwordErrorMsg" class="text-red-400 text-sm">{{ passwordErrorMsg }}</div>

        <div class="pt-2">
          <button 
            type="submit"
            :disabled="passwordLoading"
            class="px-6 py-3 rounded-lg font-bold font-ibm-plex-mono text-black bg-yellow-400 hover:bg-yellow-300 transition-all duration-300 disabled:opacity-50"
          >
            {{ passwordLoading ? 'Updating...' : 'Update Password' }}
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
// 1. IMPORT YOUR COMPOSABLE
import { useWriterAuth } from '~/composables/useWriterAuth'

definePageMeta({
  layout: 'writer',
})

const supabase = useSupabaseClient()

// 2. USE THE COMPOSABLE TO GET THE STATE
// This state is guaranteed to be populated by your middleware
const { user, writerData, getUserId } = useWriterAuth()

// Profile Form
const profileLoading = ref(false)
const profileSuccessMsg = ref(null)
const profileErrorMsg = ref(null)
const profile = reactive({
  name: '',
})

// Password Form
const passwordLoading = ref(false)
const passwordSuccessMsg = ref(null)
const passwordErrorMsg = ref(null)
const password = reactive({
  new: '',
  confirm: '',
})

// 3. REMOVE THE REDUNDANT FETCHER
// DELETE THE 'fetchWriterName' function. It's not needed.

// 4. POPULATE THE FORM FROM THE GLOBAL STATE
// This watch will populate the form as soon as the 'writerData' state is available.
watch(writerData, (newData) => {
  if (newData && newData.name) {
    profile.name = newData.name
  }
}, { immediate: true })

// 5. FIX THE UPDATE HANDLER
const handleUpdateProfile = async () => {
  profileLoading.value = true
  profileSuccessMsg.value = null
  profileErrorMsg.value = null

  // Use the reliable getter from your composable
  const currentUserId = getUserId()

  if (!currentUserId) {
    profileErrorMsg.value = "User session not found or has expired. Please try again."
    console.error("handleUpdateProfile error: getUserId() returned null.")
    profileLoading.value = false
    return;
  }

  try {
    const { data, error } = await supabase
      .from('writers')
      .update({ name: profile.name })
      .eq('user_id', currentUserId) // Use the safe ID
      .select()
    
    if (error) throw error
    
    profileSuccessMsg.value = 'Profile updated successfully!'
    
    // 6. UPDATE THE GLOBAL STATE
    // This is the most important part!
    // This will automatically update your layout.
    if (data && data[0]) {
      writerData.value = { ...writerData.value, name: data[0].name }
    }
    
    // 7. REMOVE THE "HACKY" DOM MANIPULATION
    // You don't need 'document.querySelector' anymore
    // The layout will update automatically because it reads from 'writerData'.

  } catch (err) {
    profileErrorMsg.value = err.message
  } finally {
    profileLoading.value = false
  }
}

// ... handleUpdatePassword function is fine ...
const handleUpdatePassword = async () => {
  if (password.new !== password.confirm) {
    passwordErrorMsg.value = "Passwords do not match."
    return
  }
  if (password.new.length < 6) {
    passwordErrorMsg.value = "Password must be at least 6 characters."
    return
  }

  passwordLoading.value = true
  passwordSuccessMsg.value = null
  passwordErrorMsg.value = null

  try {
    const { error } = await supabase.auth.updateUser({
      password: password.new
    })
    
    if (error) throw error
    
    passwordSuccessMsg.value = 'Password updated successfully!'
    password.new = ''
    password.confirm = ''

  } catch (err) {
    passwordErrorMsg.value = err.message
  } finally {
    passwordLoading.value = false
  }
}
</script>