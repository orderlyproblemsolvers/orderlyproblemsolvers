<script setup lang="ts">
import { signOut } from '@/utils/auth-client'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = async () => {
  await signOut()
  router.push('/auth/sign-in')
}

const links = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { label: 'Companies', to: '/admin/companies', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
  { label: 'People', to: '/admin/people', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  { label: 'Stories', to: '/admin/stories', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { label: 'Submissions', to: '/admin/submissions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9 2 2 4-4' },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex">
    
    <!-- SIDEBAR -->
    <aside class="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden lg:flex flex-col">
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
           <div class="w-8 h-8 bg-black rounded-full"></div>
           <span class="font-black tracking-tight text-sm">OPS Admin</span>
        </div>
      </div>

      <nav class="flex-1 p-4 space-y-1">
        <NuxtLink 
          v-for="link in links" 
          :key="link.to" 
          :to="link.to"
          active-class="bg-gray-100 text-black font-bold"
          class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-50 hover:text-black transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="link.icon"></path></svg>
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <button @click="handleLogout" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 w-full transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 lg:ml-64">
      <div class="p-8">
        <slot />
      </div>
    </main>

  </div>
</template>