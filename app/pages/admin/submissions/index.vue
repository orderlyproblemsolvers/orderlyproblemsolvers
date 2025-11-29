<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'admin'
})

// 1. FETCH PENDING ITEMS
// This calls the API that merges pending Companies and People into one list
const { data: pendingItems, refresh, status, error } = await useFetch('/api/admin/submissions/pending')

const processingId = ref<number | null>(null)

// 2. HANDLE DECISION (Approve/Reject)
const handleDecision = async (id: number, type: 'company' | 'person', decision: 'approved' | 'rejected') => {
  processingId.value = id
  
  try {
    await $fetch('/api/admin/submissions/decide', {
      method: 'POST',
      body: { id, type, status: decision }
    })
    
    // Reload the list to remove the processed item
    await refresh()
    
  } catch (e: any) {
    alert('Error processing submission: ' + e.message)
  } finally {
    processingId.value = null
  }
}
</script>

<template>
  <div class="max-w-5xl mx-auto">
    
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-gray-900 mb-1">Incoming Queue</h1>
        <p class="text-sm text-gray-500">Review and verify community submissions.</p>
      </div>
      <div class="bg-white px-4 py-2 rounded-lg border border-gray-200 text-xs font-bold shadow-sm">
         {{ pendingItems?.length || 0 }} Pending
      </div>
    </div>

    <!-- LOADING STATE -->
    <div v-if="status === 'pending'" class="space-y-4">
       <div v-for="i in 3" :key="i" class="h-48 bg-gray-100 rounded-xl animate-pulse border border-gray-200"></div>
    </div>

    <!-- ERROR STATE -->
    <div v-else-if="error" class="p-8 bg-red-50 text-red-600 rounded-xl border border-red-100">
       <p class="font-bold">Failed to load submissions.</p>
       <p class="text-sm mt-1">{{ error.message }}</p>
    </div>

    <!-- EMPTY STATE -->
    <div v-else-if="!pendingItems || pendingItems.length === 0" class="py-24 text-center bg-white rounded-xl border border-dashed border-gray-300">
       <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
       </div>
       <p class="text-gray-900 font-bold text-lg">All caught up!</p>
       <p class="text-sm text-gray-500">No pending submissions waiting for review.</p>
    </div>

    <!-- QUEUE LIST -->
    <div v-else class="space-y-6">
       
       <div v-for="item in pendingItems" :key="item.id + item.type" class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm transition-all hover:shadow-md hover:border-blue-200 group">
          
          <!-- Card Top: Type & Date -->
          <div class="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
             <div class="flex items-center gap-3">
                <span 
                  class="px-2.5 py-1 text-[10px] font-bold uppercase rounded border tracking-wider"
                  :class="item.type === 'company' ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-purple-50 text-purple-700 border-purple-100'"
                >
                  {{ item.type }}
                </span>
                <span class="text-xs font-mono text-gray-400">
                   ID: #{{ item.id }}
                </span>
             </div>
             <span class="text-xs font-bold text-gray-400">
                {{ new Date(item.createdAt).toLocaleDateString() }}
             </span>
          </div>

          <!-- Card Content -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
             
             <!-- Main Info -->
             <div class="md:col-span-8">
                <h3 class="text-xl font-black text-gray-900 mb-1">{{ item.name }}</h3>
                <p class="text-sm font-bold text-gray-500 mb-4">{{ item.info }}</p>
                
                <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 leading-relaxed border border-gray-100 font-medium">
                   "{{ item.description }}"
                </div>
             </div>

             <!-- Actions -->
             <div class="md:col-span-4 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
                <button 
                  @click="handleDecision(item.id, item.type, 'approved')"
                  :disabled="processingId === item.id"
                  class="w-full py-3 bg-black text-white text-xs font-bold rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <span v-if="processingId === item.id" class="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Approve & Publish
                </button>
                
                <button 
                  @click="handleDecision(item.id, item.type, 'rejected')"
                  :disabled="processingId === item.id"
                  class="w-full py-3 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors disabled:opacity-50"
                >
                  Reject
                </button>
             </div>

          </div>

       </div>

    </div>
  </div>
</template>