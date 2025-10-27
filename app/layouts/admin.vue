<template>
  <div class="min-h-screen bg-slate-950 flex">
    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-gray-800 transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex flex-col h-full">
        <!-- Logo -->
        <div class="h-16 flex items-center px-6 border-b border-gray-800">
          <NuxtLink to="/admin" class="flex items-center gap-3">
            <img src="/img/logo.png" alt="OPS Logo" class="h-8 w-auto" />
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="flex-1 px-4 py-6 overflow-y-auto">
          <div class="space-y-2">
            <NuxtLink
              v-for="route in routes"
              :key="route.path"
              :to="route.path"
              class="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group"
              :class="isActive(route.path) 
                ? 'bg-yellow-400 text-black' 
                : 'text-gray-400 hover:text-white hover:bg-slate-800'"
            >
              <component 
                :is="route.icon" 
                class="w-5 h-5 transition-colors duration-300"
                :class="isActive(route.path) ? 'text-black' : 'text-gray-400 group-hover:text-white'"
              />
              <span class="font-ibm-plex-mono font-bold text-sm">{{ route.name }}</span>

              <span 
                v-if="route.badge && route.badge > 0"
                class="ml-auto px-2 py-0.5 text-xs font-bold rounded-full"
                :class="isActive(route.path) 
                  ? 'bg-black text-yellow-400' 
                  : 'bg-yellow-400 text-black'"
              >
                {{ route.badge }}
              </span>
            </NuxtLink>
          </div>
        </nav>

        <!-- User Profile -->
        <div class="p-4 border-t border-gray-800">
          <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800">
            <div class="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
              <span class="font-heading font-bold text-black text-sm">
                {{ adminInitials }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-ibm-plex-mono font-bold text-white text-sm truncate">
                {{ adminName || 'Loading...' }}
              </p>
              <p class="text-xs text-gray-400 truncate">Admin</p>
            </div>
            <button 
              @click="logout"
              class="text-gray-400 hover:text-white transition-colors duration-300"
              aria-label="Logout"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 lg:ml-64">
      <!-- Top Bar -->
      <header class="sticky top-0 z-40 h-16 bg-slate-900/95 backdrop-blur-sm border-b border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <!-- Mobile Menu -->
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="lg:hidden text-gray-400 hover:text-white transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>

        <!-- Page Title -->
        <h1 class="font-heading font-bold text-white text-xl hidden sm:block">
          {{ currentPageTitle }}
        </h1>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <button class="relative text-gray-400 hover:text-white transition-colors duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002
                6.002 0 00-4-5.659V5a2 2 0 10-4
                0v.341C7.67 6.165 6 8.388 6 11v3.159c0
                .538-.214 1.055-.595 1.436L4 17h5m6
                0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span
              class="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-black text-xs font-bold">
              3
            </span>
          </button>

          <NuxtLink 
            to="/admin/settings"
            class="text-gray-400 hover:text-white transition-colors duration-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10.325 4.317c.426-1.756
                2.924-1.756 3.35 0a1.724 1.724 0
                002.573 1.066c1.543-.94 3.31.826
                2.37 2.37a1.724 1.724 0 001.065
                2.572c1.756.426 1.756 2.924 0
                3.35a1.724 1.724 0 00-1.066
                2.573c.94 1.543-.826 3.31-2.37
                2.37a1.724 1.724 0 00-2.572
                1.065c-.426 1.756-2.924 1.756-3.35
                0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724
                1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924
                0-3.35a1.724 1.724 0
                001.066-2.573c-.94-1.543.826-3.31
                2.37-2.37.996.608 2.296.07
                2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
          </NuxtLink>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-4 sm:p-6 lg:p-8">
        <slot />
      </main>
    </div>

    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-black/50 z-40 lg:hidden"
    ></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const user = useSupabaseUser()

const sidebarOpen = ref(false)
const adminName = ref('')

// Compute initials from name
const adminInitials = computed(() => {
  if (!adminName.value) return '...'
  return adminName.value
    .split(' ')
    .map(n => n[0]?.toUpperCase())
    .join('')
})

// Fetch admin name from Supabase
const fetchAdminName = async () => {
  if (!user.value) return
  const { data, error } = await supabase
    .from('admins')
    .select('name')
    .eq('user_id', user.value.id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching admin name:', error.message)
    return
  }
  adminName.value = data?.name || 'Admin'
}

watch(user, (newUser) => {
  if (newUser) fetchAdminName()
})

onMounted(() => {
  if (user.value) fetchAdminName()
})

// ROUTES
const BlogIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>` }
const ResearchIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>` }
const InquiriesIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>` }
const ClientsIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>` }
const PaymentsIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>` }
const AnalyticsIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>` }

const routes = ref([
  { name: 'Blog', path: '/admin/blog', icon: BlogIcon, badge: 0 },
  { name: 'Research', path: '/admin/research', icon: ResearchIcon, badge: 0 },
  { name: 'Inquiries', path: '/admin/inquiries', icon: InquiriesIcon, badge: 5 },
  { name: 'Clients', path: '/admin/clients', icon: ClientsIcon, badge: 0 },
  { name: 'Payments', path: '/admin/payments', icon: PaymentsIcon, badge: 2 },
  { name: 'Analytics', path: '/admin/analytics', icon: AnalyticsIcon, badge: 0 },
])

const isActive = (path) => route.path === path || route.path.startsWith(path + '/')
const currentPageTitle = computed(() => routes.value.find(r => isActive(r.path))?.name || 'Dashboard')

// Logout
const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    const user = useSupabaseUser()
    user.value = null
    await router.push('/')
  } catch (err) {
    console.error('Logout error:', err.message)
  }
}
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
</style>
