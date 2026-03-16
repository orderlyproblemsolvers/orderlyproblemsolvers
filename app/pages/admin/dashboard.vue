<script setup lang="ts">
import { computed } from 'vue'
import { useAuthSession } from '@/utils/auth-client'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

const sessionState = useAuthSession()

// Safe display name — fallback to 'there' if name is missing
const displayName = computed(() => sessionState.data?.user?.name || 'there')

// FETCH STATS
const { data: stats, pending: statsLoading, refresh } = await useFetch('/api/admin/stats')

// Safe pending count check — avoids false green dot during loading
const hasPending = computed(() => (stats.value?.pending ?? 0) > 0)
</script>

<template>
  <div>

    <!-- ── HEADER ─────────────────────────────────────────────── -->
    <div class="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-gray-900 mb-1">Dashboard</h1>
        <p class="text-gray-500">Welcome back, {{ displayName }}. System is operational.</p>
      </div>
      <UButton
        variant="outline"
        color="neutral"
        icon="i-lucide-refresh-cw"
        size="sm"
        :loading="statsLoading"
        @click="refresh()"
      >
        Refresh
      </UButton>
    </div>

    <!-- ── STATS GRID ─────────────────────────────────────────── -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">

      <!-- Skeleton while loading -->
      <template v-if="statsLoading">
        <div v-for="i in 4" :key="i" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-pulse">
          <div class="h-3 w-24 bg-gray-100 rounded mb-4" />
          <div class="h-8 w-16 bg-gray-200 rounded" />
        </div>
      </template>

      <template v-else>
        <!-- Total Solvers -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Solvers</p>
            <UIcon name="i-lucide-users" class="w-4 h-4 text-gray-300" />
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats?.people ?? 0 }}</p>
          <NuxtLink to="/admin/people" class="text-[10px] text-gray-400 hover:text-black transition-colors mt-2 inline-block">
            View all →
          </NuxtLink>
        </div>

        <!-- Companies -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Companies</p>
            <UIcon name="i-lucide-building-2" class="w-4 h-4 text-gray-300" />
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats?.companies ?? 0 }}</p>
          <NuxtLink to="/admin/companies" class="text-[10px] text-gray-400 hover:text-black transition-colors mt-2 inline-block">
            View all →
          </NuxtLink>
        </div>

        <!-- Published Stories -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Published Stories</p>
            <UIcon name="i-lucide-newspaper" class="w-4 h-4 text-gray-300" />
          </div>
          <p class="text-3xl font-black text-gray-900">{{ stats?.articles ?? 0 }}</p>
          <NuxtLink to="/admin/stories" class="text-[10px] text-gray-400 hover:text-black transition-colors mt-2 inline-block">
            View all →
          </NuxtLink>
        </div>

        <!-- Pending Review -->
        <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div class="flex items-center justify-between mb-2">
            <p class="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Review</p>
            <UIcon name="i-lucide-clipboard-list" class="w-4 h-4 text-gray-300" />
          </div>
          <div class="flex items-center gap-2">
            <p class="text-3xl font-black text-gray-900">{{ stats?.pending ?? 0 }}</p>
            <span
              :class="[
                'w-2 h-2 rounded-full shrink-0',
                hasPending ? 'bg-orange-500 animate-pulse' : 'bg-green-500'
              ]"
            />
          </div>
          <NuxtLink to="/admin/submissions" class="text-[10px] text-gray-400 hover:text-black transition-colors mt-2 inline-block">
            View all →
          </NuxtLink>
        </div>
      </template>

    </div>

    <!-- ── QUICK ACTIONS ──────────────────────────────────────── -->
    <h2 class="text-xs font-bold text-gray-900 uppercase tracking-widest mb-5">Quick Actions</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

      <NuxtLink
        to="/admin/companies/new"
        class="group p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-md transition-all"
      >
        <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
          <UIcon name="i-lucide-plus" class="w-5 h-5" />
        </div>
        <h3 class="font-bold text-gray-900 mb-1">Add Company</h3>
        <p class="text-xs text-gray-500">Create a new entity profile manually.</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/people/new"
        class="group p-6 bg-white border border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-md transition-all"
      >
        <div class="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
          <UIcon name="i-lucide-user-plus" class="w-5 h-5" />
        </div>
        <h3 class="font-bold text-gray-900 mb-1">Add Person</h3>
        <p class="text-xs text-gray-500">Add an innovator to the directory.</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/stories/new"
        class="group p-6 bg-white border border-gray-200 rounded-xl hover:border-orange-400 hover:shadow-md transition-all"
      >
        <div class="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
          <UIcon name="i-lucide-pencil-line" class="w-5 h-5" />
        </div>
        <h3 class="font-bold text-gray-900 mb-1">Write Story</h3>
        <p class="text-xs text-gray-500">Draft a new article or case study.</p>
      </NuxtLink>

      <NuxtLink
        to="/admin/submissions"
        class="group p-6 bg-white border border-gray-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all"
      >
        <div class="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform relative">
          <UIcon name="i-lucide-clipboard-list" class="w-5 h-5" />
          <!-- Badge if there are pending items -->
          <span
            v-if="hasPending"
            class="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[9px] font-black rounded-full flex items-center justify-center"
          >
            {{ stats?.pending }}
          </span>
        </div>
        <h3 class="font-bold text-gray-900 mb-1">Submissions</h3>
        <p class="text-xs text-gray-500">Review pending entries from the public.</p>
      </NuxtLink>

    </div>

  </div>
</template>