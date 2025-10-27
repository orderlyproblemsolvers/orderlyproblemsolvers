<template>
  <div class="min-h-screen bg-slate-950 flex">
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-gray-800 transition-transform duration-300 lg:translate-x-0"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex flex-col h-full">
        <div class="h-16 flex items-center px-6 border-b border-gray-800">
          <NuxtLink to="/writer" class="flex items-center gap-3">
            <img src="/img/logo.png" alt="OPS Logo" class="h-8 w-auto" />
          </NuxtLink>
        </div>

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
              @click="sidebarOpen = false" 
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

        <div class="p-4 border-t border-gray-800">
          <div class="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-800">
            <div class="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center">
              <span class="font-heading font-bold text-black text-sm">
                {{ writerInitials }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-ibm-plex-mono font-bold text-white text-sm truncate">
                {{ writerName || 'Loading...' }}
              </p>
              <p class="text-xs text-gray-400 truncate">Writer</p>
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

    <div class="flex-1 lg:ml-64">
      <header class="sticky top-0 z-40 h-16 bg-slate-900/95 backdrop-blur-sm border-b border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8">
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

        <h1 class="font-heading font-bold text-white text-xl hidden sm:block">
          {{ currentPageTitle }}
        </h1>

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
            to="/writer/new"
            class="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-lg font-ibm-plex-mono font-bold text-sm hover:bg-yellow-300 transition-colors duration-300"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            New Post
          </NuxtLink>
        </div>
      </header>

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
import { ref, computed, watch } from 'vue' // Removed onMounted
import { useRoute, useRouter } from 'vue-router'

const supabase = useSupabaseClient()
const router = useRouter()
const route = useRoute()
const user = useSupabaseUser()

const sidebarOpen = ref(false)
const writerName = ref('')

// Compute initials from name
const writerInitials = computed(() => {
  if (!writerName.value) return '...'
  return writerName.value
    .split(' ')
    .map(n => n[0]?.toUpperCase())
    .join('')
})

// Fetch writer name from Supabase
const fetchWriterName = async ()=> {
  // Guard clause is still here for safety
  if (!user.value || !user.value.id) {
    console.warn("fetchWriterName skipped: user.value.id is not available.")
    return 
  }

  const { data, error } = await supabase
    .from('writers')
    .select('name')
    .eq('user_id', user.value.id)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching writer name:', error.message)
    return
  }
  writerName.value = data?.name || 'Writer'
}

// --- THIS IS THE CORRECTED LOGIC ---
// This watcher now also handles authentication
watch(user, (currentUser) => {
  if (currentUser && currentUser.id) {
    // Case 1: User is logged in and has an ID. Fetch name.
    fetchWriterName()
  } else if (currentUser === null) {
    // Case 2: The watcher has confirmed the user is logged out.
    // Redirect them to your login page.
    console.log('No user session in layout, redirecting to login.')
    
    // --- IMPORTANT ---
    // Change '/login' if your login page is at a different path
    router.push('/') 
  }
  // Case 3 (Implicit): currentUser is not null but has no ID.
  // This means the session is still hydrating. We wait.
  // The watcher will run again when the state settles.
}, { immediate: true }) // { immediate: true } runs this check on load

// ROUTES
const DashboardIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>` }
const PostsIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h6M7 8h6"/></svg>` }
const DraftsIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>` }
const PublishedIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>` }
const ProfileIcon = { template: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>` }
const SettingsIcon = { template: `<svg classs="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>` }


const routes = ref([
  { name: 'Dashboard', path: '/writer', icon: DashboardIcon, badge: 0 },
  { name: 'All Posts', path: '/writer/posts', icon: PostsIcon, badge: 0 },
  { name: 'Drafts', path: '/writer/drafts', icon: DraftsIcon, badge: 0 },
  { name: 'Published', path: '/writer/published', icon: PublishedIcon, badge: 0 },
  { name: 'Profile', path: '/writer/profile', icon: ProfileIcon, badge: 0 },
  { name: 'Settings', path: '/writer/settings', icon: SettingsIcon, badge: 0 },
])

const isActive = (path) => {
  if (path === '/writer') return route.path === '/writer'
  return route.path === path || route.path.startsWith(path + '/')
}

const currentPageTitle = computed(() => routes.value.find(r => isActive(r.path))?.name || 'Writer Dashboard')

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