<script setup lang="ts">
import { ref } from 'vue'
import { signIn } from '~/utils/auth-client'
import { useRouter, useRoute } from 'vue-router'

definePageMeta({
  layout: 'login'
})

const router = useRouter()
const route = useRoute()
const isLoading = ref(false)
const errorMsg = ref('')

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  isLoading.value = true
  errorMsg.value = ''

  try {
    await signIn.email({
      email: form.value.email,
      password: form.value.password,
      // Remove callbackURL here so we can handle it manually
    }, {
      onSuccess: () => {
         // FORCE RELOAD to ensure cookies are set and middleware reads them correctly
         // Check if there was a redirect param (e.g. ?redirect=/admin/dashboard)
         const target = (route.query.redirect as string) || '/admin/dashboard'
         window.location.href = target
      },
      onError: (ctx) => {
         errorMsg.value = ctx.error.message || "Invalid credentials."
         isLoading.value = false
      }
    })
  } catch (err) {
    errorMsg.value = "Connection error. Please try again."
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-8">
      
      <div class="text-center mb-8">
        <div class="w-10 h-10 bg-black rounded-full mx-auto mb-4"></div>
        <h1 class="text-xl font-black tracking-tight text-gray-900 mb-2">
          OPS Admin.
        </h1>
        <p class="text-xs text-gray-500 font-mono">
          Authorized Personnel Only.
        </p>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        
        <div>
          <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Email</label>
          <input v-model="form.email" type="email" required class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-black focus:outline-none transition-colors bg-gray-50 focus:bg-white" placeholder="admin@ops.com" />
        </div>

        <div>
          <label class="block text-[10px] font-bold uppercase text-gray-400 mb-1">Password</label>
          <input v-model="form.password" type="password" required class="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-black focus:outline-none transition-colors bg-gray-50 focus:bg-white" placeholder="••••••••" />
        </div>

        <div v-if="errorMsg" class="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">
          {{ errorMsg }}
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="w-full py-3 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Authenticating...' : 'Enter Dashboard' }}
        </button>

      </form>

      <div class="mt-8 text-center">
        <NuxtLink to="/" class="text-xs font-bold text-gray-400 hover:text-black transition-colors">
          &larr; Back to Platform
        </NuxtLink>
      </div>

    </div>
  </div>
</template>