<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// Fetch Data
const { data: list, refresh, status } = await useFetch('/api/admin/people')
const deletingId = ref<number | null>(null)

const deleteItem = async (id: number) => {
  if (!confirm('Are you sure? This cannot be undone.')) return

  deletingId.value = id
  try {
    await $fetch(`/api/admin/people/${id}`, { method: 'DELETE' })
    await refresh() // Reload list
  } catch (e: any) {
    alert(e.data?.statusMessage || 'Error deleting item')
  } finally {
    deletingId.value = null
  }
}
</script>

<template>
  <div class="max-w-6xl mx-auto">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
      <h1 class="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">People</h1>
      <NuxtLink to="/admin/people/new" class="px-6 py-2 bg-black text-white text-sm font-bold rounded-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
        Add New
      </NuxtLink>
    </div>

    <!-- Loading -->
    <div v-if="status === 'pending'" class="space-y-4">
       <div v-for="i in 5" :key="i" class="h-16 sm:h-20 bg-gray-100 rounded-lg animate-pulse"></div>
    </div>

    <!-- Desktop Table View (hidden on mobile) -->
    <div v-else class="hidden md:block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Name</th>
              <th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Role / Company</th>
              <th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Location</th>
              <th class="px-6 py-4 text-xs font-bold uppercase text-gray-500">Status</th>
              <th class="px-6 py-4 text-xs font-bold uppercase text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in list" :key="item.id" class="group hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <img 
                    :src="item.avatar || `https://ui-avatars.com/api/?name=${item.name}&background=random`" 
                    class="w-8 h-8 rounded-full object-cover bg-gray-100 border border-gray-200 flex-shrink-0" 
                  />
                  <p class="text-sm font-bold text-gray-900">{{ item.name }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <div>
                  <p class="text-xs font-bold text-gray-900">{{ item.role }}</p>
                  <p class="text-xs text-gray-500">{{ item.companyName || 'Freelance' }}</p>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ item.location }}</td>
              <td class="px-6 py-4">
                <span 
                  class="text-[10px] font-bold uppercase px-2 py-1 rounded border whitespace-nowrap"
                  :class="item.status === 'approved' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'"
                >
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <NuxtLink 
                    :to="`/admin/people/${item.id}`" 
                    class="text-gray-400 hover:text-blue-600 transition-colors p-2 inline-block"
                    title="Edit"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                  </NuxtLink>
                  <button 
                    @click="deleteItem(item.id)" 
                    :disabled="deletingId === item.id"
                    class="text-gray-400 hover:text-red-600 transition-colors p-2 disabled:opacity-50"
                  >
                    <span v-if="deletingId === item.id" class="text-xs text-red-600">...</span>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        
        <!-- Empty State -->
        <div v-if="!list || list.length === 0" class="p-12 text-center">
          <p class="text-gray-400 text-sm">No people found. Add your first one!</p>
        </div>
      </div>
    </div>

    <!-- Mobile Card View (visible on mobile only) -->
    <div v-else class="md:hidden space-y-4">
      <div
        v-for="item in list"
        :key="item.id"
        class="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
      >
        <!-- Person Info with Avatar -->
        <div class="flex items-start gap-3 mb-4">
          <img 
            :src="item.avatar || `https://ui-avatars.com/api/?name=${item.name}&background=random`" 
            class="w-12 h-12 rounded-full object-cover bg-gray-100 border border-gray-200 flex-shrink-0" 
          />
          <div class="flex-1 min-w-0">
            <p class="text-base font-bold text-gray-900 mb-1">{{ item.name }}</p>
            <div class="text-sm">
              <p class="text-gray-900 font-medium">{{ item.role }}</p>
              <p class="text-gray-500 text-xs">{{ item.companyName || 'Freelance' }}</p>
            </div>
          </div>
          <span 
            class="text-[10px] font-bold uppercase px-2 py-1 rounded border whitespace-nowrap flex-shrink-0"
            :class="item.status === 'approved' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-orange-50 text-orange-700 border-orange-100'"
          >
            {{ item.status }}
          </span>
        </div>

        <!-- Location -->
        <div class="mb-4 pb-4 border-b border-gray-100">
          <div class="flex items-center gap-2 text-sm text-gray-500">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            {{ item.location }}
          </div>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-2">
          <NuxtLink 
            :to="`/admin/people/${item.id}`" 
            class="text-gray-400 hover:text-blue-600 transition-colors p-2"
            title="Edit"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
          </NuxtLink>
          <button 
            @click="deleteItem(item.id)" 
            :disabled="deletingId === item.id"
            class="text-gray-400 hover:text-red-600 transition-colors p-2 disabled:opacity-50"
          >
            <span v-if="deletingId === item.id" class="text-xs text-red-600">...</span>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      </div>

      <!-- Empty State for Mobile -->
      <div v-if="!list || list.length === 0" class="bg-white border border-gray-200 rounded-xl p-12 text-center">
        <p class="text-gray-400 text-sm">No people found. Add your first one!</p>
      </div>
    </div>

  </div>
</template>