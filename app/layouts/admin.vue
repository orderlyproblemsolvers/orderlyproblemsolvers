<script setup lang="ts">
import { ref } from 'vue'
import { signOut } from '@/utils/auth-client'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMobileMenuOpen = ref(false)

const handleLogout = async () => {
  await signOut()
  router.push('/auth/sign-in')
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
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
    
    <!-- MOBILE HEADER -->
    <div class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-20 flex items-center justify-between px-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-black rounded-full"></div>
        <span class="font-black tracking-tight text-sm">OPS Admin</span>
      </div>
      <button 
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="p-2 text-gray-600 hover:text-black transition-colors"
      >
        <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <!-- MOBILE MENU OVERLAY -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen" 
        @click="closeMobileMenu"
        class="lg:hidden fixed inset-0 bg-black/50 z-30"
      ></div>
    </Transition>

    <!-- MOBILE SIDEBAR -->
    <Transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside 
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 z-40 flex flex-col"
      >
        <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
          <NuxtLink 
            v-for="link in links" 
            :key="link.to" 
            :to="link.to"
            @click="closeMobileMenu"
            active-class="bg-gray-100 text-black font-bold"
            class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-50 hover:text-black transition-colors"
          >
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="link.icon"></path></svg>
            {{ link.label }}
          </NuxtLink>
        </nav>

        <div class="p-4 border-t border-gray-100">
          <button @click="handleLogout" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 w-full transition-colors">
            <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Sign Out
          </button>
        </div>
      </aside>
    </Transition>

    <!-- DESKTOP SIDEBAR -->
    <aside class="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden lg:flex flex-col">
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-center gap-3">
           <div class="w-8 h-8 bg-black rounded-full flex-shrink-0"></div>
           <span class="font-black tracking-tight text-sm">OPS Admin</span>
        </div>
      </div>

      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        <NuxtLink 
          v-for="link in links" 
          :key="link.to" 
          :to="link.to"
          active-class="bg-gray-100 text-black font-bold"
          class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-50 hover:text-black transition-colors"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="link.icon"></path></svg>
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="p-4 border-t border-gray-100">
        <button @click="handleLogout" class="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 w-full transition-colors">
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- MAIN CONTENT -->
    <main class="flex-1 lg:ml-64 pt-16 lg:pt-0">
      <div class="p-4 sm:p-6 md:p-8">
        <slot />
      </div>
    </main>

  </div>
</template>