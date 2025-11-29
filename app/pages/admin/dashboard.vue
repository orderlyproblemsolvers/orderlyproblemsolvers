<script setup lang="ts">
import { useAuthSession } from '@/utils/auth-client'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const sessionState = useAuthSession()

// FETCH REAL STATS
const { data: stats, refresh } = await useFetch('/api/admin/stats')
</script>

<template>
  <div>
    
    <!-- HEADER -->
    <div class="mb-12 flex items-end justify-between">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-gray-900 mb-2">
          Dashboard
        </h1>
        <p class="text-gray-500">
          Welcome back, {{ sessionState.data?.user?.name }}. System is operational.
        </p>
      </div>
      <button @click="refresh()" class="text-sm font-bold text-blue-600 hover:underline">Refresh Data</button>
    </div>

    <!-- STATS GRID -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      
      <!-- PEOPLE -->
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Total Solvers</p>
        <p class="text-3xl font-black text-gray-900">{{ stats?.people || 0 }}</p>
      </div>

      <!-- COMPANIES -->
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Companies</p>
        <p class="text-3xl font-black text-gray-900">{{ stats?.companies || 0 }}</p>
      </div>

      <!-- STORIES -->
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Published Stories</p>
        <p class="text-3xl font-black text-gray-900">{{ stats?.articles || 0 }}</p>
      </div>

      <!-- PENDING -->
      <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Pending Review</p>
        <div class="flex items-center gap-2">
           <p class="text-3xl font-black text-gray-900">{{ stats?.pending || 0 }}</p>
           <span v-if="stats?.pending > 0" class="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
           <span v-else class="w-2 h-2 rounded-full bg-green-500"></span>
        </div>
      </div>

    </div>

    <!-- QUICK ACTIONS (Keep existing code below...) -->
    <h2 class="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Quick Actions</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <NuxtLink to="/admin/companies/new" class="group p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all">
        <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-1">Add Company</h3>
        <p class="text-xs text-gray-500">Create a new entity profile manually.</p>
      </NuxtLink>

      <NuxtLink to="/admin/people/new" class="group p-6 bg-white border border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all">
        <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-1">Add Person</h3>
        <p class="text-xs text-gray-500">Add an innovator to the directory.</p>
      </NuxtLink>

      <NuxtLink to="/admin/stories/new" class="group p-6 bg-white border border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-md transition-all">
        <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
        </div>
        <h3 class="font-bold text-gray-900 mb-1">Write Story</h3>
        <p class="text-xs text-gray-500">Draft a new article or case study.</p>
      </NuxtLink>

    </div>

  </div>
</template>