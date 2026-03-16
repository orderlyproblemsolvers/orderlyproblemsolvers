<script setup lang="ts">
import { ref } from 'vue'
import { signIn } from '~/utils/auth-client'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'login'
})

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
    }, {
      onSuccess: () => {
        let target = route.query.redirect as string
        if (!target || !target.startsWith('/') || target.startsWith('//')) {
          target = '/admin/dashboard'
        }
        window.location.href = target
      },
      onError: (ctx) => {
        errorMsg.value = ctx.error.message || 'Invalid credentials.'
        isLoading.value = false
      }
    })
  } catch (err) {
    errorMsg.value = 'Connection error. Please try again.'
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-8">

      <!-- Logo + Title -->
      <div class="text-center mb-8">
        <div class="w-10 h-10 bg-black rounded-full mx-auto mb-4" />
        <h1 class="text-xl font-black tracking-tight text-gray-900 mb-2">OPS Admin.</h1>
        <p class="text-xs text-gray-500 font-mono">Authorized Personnel Only.</p>
      </div>

      <!-- Form -->
      <form class="space-y-4" @submit.prevent="handleLogin">

        <!-- Email -->
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="admin@ops.com"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 outline-none focus:bg-white focus:border-black transition-colors"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            required
            placeholder="••••••••"
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-300 outline-none focus:bg-white focus:border-black transition-colors"
          />
        </div>

        <!-- Error -->
        <div
          v-if="errorMsg"
          class="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100"
        >
          {{ errorMsg }}
        </div>

        <!-- Submit -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full mt-2 py-3 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <span
            v-if="isLoading"
            class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
          />
          {{ isLoading ? 'Signing in...' : 'Enter Dashboard' }}
        </button>

      </form>

      <!-- Back link -->
      <div class="mt-8 text-center">
        <NuxtLink to="/" class="text-xs font-bold text-gray-400 hover:text-black transition-colors">
          &larr; Back to Platform
        </NuxtLink>
      </div>

    </div>
  </div>
</template>