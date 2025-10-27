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

        <div v_if="profileSuccessMsg" class="text-green-400 text-sm">{{ profileSuccessMsg }}</div>
        <div v_if="profileErrorMsg" class="text-red-400 text-sm">{{ profileErrorMsg }}</div>

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

        <div v_if="passwordSuccessMsg" class="text-green-400 text-sm">{{ passwordSuccessMsg }}</div>
        <div v_if="passwordErrorMsg" class="text-red-400 text-sm">{{ passwordErrorMsg }}</div>

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

definePageMeta({
  layout: 'writer',
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

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

// Fetch initial profile name
const fetchWriterName = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('writers')
      .select('name')
      .eq('user_id', userId)
      .single()
    
    if (error) throw error
    if (data) {
      profile.name = data.name
    }
  } catch (err) {
    profileErrorMsg.value = `Error loading profile: ${err.message}`
  }
}

// Watch user and fetch data
watch(user, (currentUser) => {
  if (currentUser && currentUser.id) {
    fetchWriterName(currentUser.id)
  }
}, { immediate: true })



// Handle profile update
const handleUpdateProfile = async () => {
  profileLoading.value = true
  profileSuccessMsg.value = null
  profileErrorMsg.value = null

  // --- THIS IS THE FIX ---
  // Add a guard clause to ensure the user ID is available
  if (!user.value || !user.value.id) {
    profileErrorMsg.value = "User session not found or has expired. Please try again."
    console.error("handleUpdateProfile error: user.value.id is null or undefined.")
    profileLoading.value = false // Stop loading
    return; // Stop the function
  }
  // --- END OF FIX ---

  try {
    const { data, error } = await supabase
      .from('writers')
      .update({ name: profile.name })
      .eq('user_id', user.value.id) // This line is now safe
      .select()
    
    if (error) throw error
    
    profileSuccessMsg.value = 'Profile updated successfully!'
    
    if (data && data[0]) {
      // Find the layout's name element and update it (hacky but works)
      const layoutName = document.querySelector('.font-ibm-plex-mono.font-bold.text-white.text-sm.truncate')
      if (layoutName) layoutName.textContent = data[0].name

      // Also update the initials
      const initialsEl = document.querySelector('.font-heading.font-bold.text-black.text-sm')
      if (initialsEl) {
        initialsEl.textContent = data[0].name
          .split(' ')
          .map(n => n[0]?.toUpperCase())
          .join('')
      }
    }

  } catch (err) {
    profileErrorMsg.value = err.message
  } finally {
    profileLoading.value = false
  }
}

// Handle password update
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