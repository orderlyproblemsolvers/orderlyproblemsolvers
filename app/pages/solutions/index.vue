<script setup lang="ts">
// 1. FETCH GROUPED DATA
const { data: solutionsGroups, status, error, refresh } = await useFetch('/api/solutions')

// Helper to pick diverse icons based on keywords
// (Logic retained from your original code)
const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase()
  if (cat.includes('energy') || cat.includes('sustain') || cat.includes('power')) return 'M13 10V3L4 14h7v7l9-11h-7z' 
  if (cat.includes('health') || cat.includes('bio') || cat.includes('med')) return 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' 
  if (cat.includes('finance') || cat.includes('money') || cat.includes('pay')) return 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' 
  if (cat.includes('logistic') || cat.includes('transport') || cat.includes('supply')) return 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0'
  if (cat.includes('agri') || cat.includes('food')) return 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064'
  return 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A253A] pt-32 pb-12 transition-colors duration-500">
       <div class="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
             <div>
                <span class="block text-xs font-bold uppercase tracking-[0.2em] text-[#00A9F4] mb-3">
                   Capabilities & Stacks
                </span>
                <h1 class="text-5xl md:text-6xl font-serif text-[#051C2C] dark:text-white tracking-tight leading-none">
                   The Solutions Index<span class="text-[#00A9F4]">.</span>
                </h1>
             </div>
             
             <div class="hidden lg:block text-right">
                <p class="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1">
                   // Total Categories
                </p>
                <p class="text-3xl font-serif text-[#051C2C] dark:text-white">
                   {{ solutionsGroups ? Object.keys(solutionsGroups).length : 0 }}
                </p>
             </div>
          </div>

       </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 lg:px-12 py-16">
       
       <div v-if="status === 'pending'" class="space-y-16">
          <div v-for="i in 3" :key="i">
             <div class="h-6 w-48 bg-gray-100 dark:bg-[#0A253A] mb-8"></div>
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-200 dark:border-gray-800">
                <div v-for="j in 4" :key="j" class="h-40 bg-gray-50 dark:bg-[#0A253A] border-b border-r border-gray-200 dark:border-gray-800 animate-pulse"></div>
             </div>
          </div>
       </div>

       <div v-else-if="error" class="p-12 border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/10 text-center">
          <p class="font-mono text-red-600 dark:text-red-400 mb-4">ERROR: Unable to retrieve index.</p>
          <button @click="refresh()" class="text-xs font-bold uppercase tracking-widest border-b border-red-500 text-red-500">Retry Connection</button>
       </div>

       <div v-else-if="solutionsGroups && Object.keys(solutionsGroups).length > 0">
          
          <div v-for="(items, category) in solutionsGroups" :key="category" class="mb-24 last:mb-0">
             
             <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                <div class="flex items-center gap-4">
                   <div class="w-10 h-10 border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#051C2C] flex items-center justify-center text-[#00A9F4]">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" :d="getCategoryIcon(category)"></path></svg>
                   </div>
                   <h3 class="text-2xl font-serif text-[#051C2C] dark:text-white">
                      {{ category }}
                   </h3>
                </div>
                <span class="font-mono text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-[#0A253A] px-3 py-1">
                   Records: {{ items.length }}
                </span>
             </div>
             
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-gray-200 dark:border-gray-800">
                
                <NuxtLink 
                  v-for="item in items" 
                  :key="item.name" 
                  :to="`/solutions/${item.slug}`"
                  class="group relative bg-white dark:bg-[#051C2C] border-b border-r border-gray-200 dark:border-gray-800 p-8 hover:bg-gray-50 dark:hover:bg-[#0A253A] transition-colors duration-300 flex flex-col h-full min-h-[180px]"
                >
                   <div class="absolute top-0 left-0 w-0 h-0.5 bg-[#00A9F4] group-hover:w-full transition-all duration-500"></div>

                   <div class="flex items-start justify-between mb-4">
                      <h4 class="text-lg font-bold text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors">
                         {{ item.name }}
                      </h4>
                      <svg class="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-[#00A9F4] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                   </div>
                   
                   <div class="mt-auto">
                      <div class="flex items-center gap-2">
                         <span class="w-1.5 h-1.5 bg-[#00A9F4] opacity-50 group-hover:opacity-100 transition-opacity"></span>
                         <p class="font-mono text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                            {{ item.count }} Verified Users
                         </p>
                      </div>
                   </div>

                </NuxtLink>

             </div>
          </div>

       </div>

       <div v-else class="py-24 border border-dashed border-gray-300 dark:border-gray-700 text-center">
          <h3 class="text-xl font-serif text-[#051C2C] dark:text-white mb-2">Index Empty</h3>
          <p class="text-gray-500 font-mono text-xs mb-8">No solutions have been categorized yet.</p>
          <NuxtLink to="/submit-solution" class="px-6 py-3 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-xs font-bold uppercase tracking-widest hover:opacity-90">
             Submit Entry
          </NuxtLink>
       </div>

    </div>

  </div>
</template>