<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    <!-- Animated Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="i in 3" 
        :key="i"
        class="absolute rounded-full blur-3xl animate-float"
        :style="{
          width: `${300 + i * 50}px`,
          height: `${300 + i * 50}px`,
          background: gradients[i - 1],
          opacity: 0.06,
          left: `${i * 25}%`,
          top: `${i % 2 === 0 ? '10%' : '60%'}`,
          animationDelay: `${i * 0.8}s`,
          animationDuration: `${12 + i}s`
        }"
      ></div>
    </div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <img src="/img/logo.png" alt="OPS Logo" class="h-16 md:h-20 mx-auto mb-6" />
        <h1 class="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
          Admin <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Portal</span>
        </h1>
        <p class="text-gray-400 font-ibm-plex-mono text-sm">
          Sign in to access the dashboard
        </p>
      </div>

      <!-- Login Form -->
      <div class="bg-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 shadow-2xl">
        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
        >
          <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
          <div class="flex-1">
            <p class="text-red-500 text-sm font-ibm-plex-mono">{{ errorMessage }}</p>
          </div>
          <button @click="errorMessage = ''" class="text-red-500 hover:text-red-400">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Success Message -->
        <div
          v-if="successMessage"
          class="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-3"
        >
          <svg class="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <p class="text-green-500 text-sm font-ibm-plex-mono flex-1">{{ successMessage }}</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
              Email Address
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <input
                type="email"
                id="email"
                v-model="email"
                required
                :disabled="loading"
                class="w-full pl-12 pr-4 py-3 bg-slate-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="admin@ops.com"
              />
            </div>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-ibm-plex-mono font-bold text-gray-300 mb-2">
              Password
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                :disabled="loading"
                class="w-full pl-12 pr-12 py-3 bg-slate-950 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-300"
                :disabled="loading"
              >
                <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Remember Me -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                v-model="rememberMe"
                :disabled="loading"
                class="w-4 h-4 rounded border-gray-700 bg-slate-950 text-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-0 focus:ring-offset-slate-950 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <span class="text-sm text-gray-400 font-ibm-plex-mono">Remember me</span>
            </label>

            <button
              type="button"
              class="text-sm text-yellow-400 hover:text-yellow-300 font-ibm-plex-mono font-bold transition-colors duration-300"
              :disabled="loading"
            >
              Forgot password?
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="group w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-heading font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-base overflow-hidden relative disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span class="relative z-10 flex items-center justify-center gap-3">
              <span v-if="!loading">Sign In</span>
              <span v-else class="flex items-center gap-2">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
              <svg v-if="!loading" class="w-5 h-5 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </span>
            
            <!-- Animated background -->
            <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-800"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-4 bg-slate-900/50 text-gray-500 font-ibm-plex-mono">Secure Login</span>
          </div>
        </div>

        <!-- Footer Info -->
        <div class="text-center">
          <p class="text-xs text-gray-500 font-ibm-plex-mono">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>

      <!-- Back to Site -->
      <div class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 font-ibm-plex-mono font-bold transition-colors duration-300"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back to website
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'login',
})

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form state
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const gradients = [
  'linear-gradient(135deg, #f59e0b, #d97706)',
  'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  'linear-gradient(135deg, #06b6d4, #0891b2)'
]

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    successMessage.value = ''

    // Initialize Supabase client
    const supabase = useSupabaseClient()

    // Authenticate user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (authError) {
      throw new Error(authError.message)
    }

    if (!authData.user) {
      throw new Error('Authentication failed. Please try again.')
    }

    // Check if authenticated user is in the admins table
    const { data: adminData, error: adminError } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', authData.user.id) // Link to auth user
      .eq('is_active', true)
      .single()

    if (adminError || !adminData) {
      // Sign out the user since they're not an admin
      await supabase.auth.signOut()
      throw new Error('Access denied. You do not have admin privileges.')
    }

    // Success - admin is verified
    successMessage.value = 'Login successful! Redirecting...'
    
    if (rememberMe.value) {
      localStorage.setItem('admin_email', email.value)
    }

    // Redirect to admin dashboard after short delay
    setTimeout(() => {
      router.push('/admin')
    }, 1000)

  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Login failed. Please check your credentials and try again.'
  } finally {
    loading.value = false
  }
}

// Optional: Check if user is already logged in on component mount
const checkExistingSession = async () => {
  const supabase = useSupabaseClient()
  const { data: { session } } = await supabase.auth.getSession()
  
  if (session?.user) {
    // Verify they're still an admin
    const { data: adminData } = await supabase
      .from('admins')
      .select('*')
      .eq('user_id', session.user.id)
      .eq('is_active', true)
      .single()
    
    if (adminData) {
      router.push('/admin')
    }
  }
}

// Check for remembered email
const loadRememberedEmail = () => {
  const rememberedEmail = localStorage.getItem('admin_email')
  if (rememberedEmail) {
    email.value = rememberedEmail
    rememberMe.value = true
  }
}

// Run on component mount
onMounted(() => {
  checkExistingSession()
  loadRememberedEmail()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@700;800;900&display=swap');

.font-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.font-ibm-plex-mono {
  font-family: 'IBM Plex Mono', monospace;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-float {
  animation: float infinite ease-in-out;
}
</style>