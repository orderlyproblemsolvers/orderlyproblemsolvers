<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
    
    <!-- TOP BAR -->
    <div class="p-8 flex justify-between items-center">
      <div class="flex items-center gap-2">
         <div class="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
         <span class="text-xs font-mono font-bold uppercase tracking-widest text-red-600">System Error</span>
      </div>
      <span class="text-xs font-mono font-bold text-gray-300">ERR_CODE_{{ error?.statusCode }}</span>
    </div>

    <!-- MAIN CONTENT -->
    <div class="flex-1 flex flex-col items-center justify-center px-4 text-center">
      
      <!-- The 404 Visual -->
      <div class="relative mb-8">
        <h1 class="text-[12rem] md:text-[16rem] font-black leading-none text-gray-50 select-none">
          {{ error?.statusCode }}
        </h1>
        <div class="absolute inset-0 flex items-center justify-center w-max">
           <div class="bg-white px-6 py-4 border border-gray-200 rounded-xl shadow-xl">
              <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <p class="font-bold text-lg">Data Not Found</p>
           </div>
        </div>
      </div>

      <h2 class="text-3xl md:text-4xl font-black tracking-tight mb-4">
        This page is not in the Index.
      </h2>
      
      <p class="text-gray-500 max-w-md mx-auto mb-12 text-lg">
        The URL you requested does not exist in our directory or has been moved to a different sector.
      </p>

      <div class="flex flex-col sm:flex-row gap-4">
        <button 
          @click="handleError"
          class="px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
        >
          Return Home
        </button>
        <NuxtLink 
          to="/search" 
          class="px-8 py-4 border border-gray-200 font-bold rounded-xl hover:border-black transition-colors"
        >
          Search Directory
        </NuxtLink>
      </div>

    </div>

    <!-- FOOTER DECORATION -->
    <div class="p-8 text-center">
      <p class="text-[10px] font-mono text-gray-300 uppercase tracking-[0.2em]">Orderly Problem Solvers</p>
    </div>

  </div>
</template>