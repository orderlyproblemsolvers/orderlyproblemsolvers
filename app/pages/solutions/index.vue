<script setup lang="ts">
// 1. FETCH GROUPED DATA
// The API returns an object: { "Infrastructure": [...], "Digital": [...] }
const { data: solutionsGroups, status } = await useFetch('/api/solutions')

// Helper to pick diverse icons based on keywords in the category name
const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase()
  if (cat.includes('energy') || cat.includes('sustain') || cat.includes('power')) return 'M13 10V3L4 14h7v7l9-11h-7z' // Lightning
  if (cat.includes('health') || cat.includes('bio') || cat.includes('med')) return 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' // Heart
  if (cat.includes('finance') || cat.includes('money') || cat.includes('pay')) return 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' // Coin
  if (cat.includes('logistic') || cat.includes('transport') || cat.includes('supply')) return 'M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0zM13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0' // Truck
  if (cat.includes('agri') || cat.includes('food')) return 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064' // Leaf
  // Default: Chip/Tech
  return 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
}
</script>

<template>
   <AppHeader/>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    
    <!-- HERO -->
    <div class="bg-gray-50 border-b border-gray-200 pt-32 pb-16">
       <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-8">
             <div>
                <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">The Solutions Index</p>
                <h1 class="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter mb-4">
                  Systems & Tools.
                </h1>
                <p class="text-lg text-gray-500 max-w-xl">
                  Explore the methodologies, hardware, and software stacks powering the ecosystem.
                </p>
             </div>
             
             <!-- Visual Decoration -->
             <div class="hidden md:flex items-center gap-2 opacity-50">
                <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
             </div>
          </div>
       </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       
       <!-- LOADING STATE -->
       <div v-if="status === 'pending'" class="space-y-12">
          <div v-for="i in 3" :key="i">
             <div class="h-8 w-32 bg-gray-100 rounded mb-6 animate-pulse"></div>
             <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div v-for="j in 4" :key="j" class="h-24 bg-gray-100 rounded-xl animate-pulse"></div>
             </div>
          </div>
       </div>

       <!-- DYNAMIC CATEGORIES -->
       <div v-else-if="solutionsGroups && Object.keys(solutionsGroups).length > 0">
          
          <div v-for="(items, category) in solutionsGroups" :key="category" class="mb-20 last:mb-0">
             
             <!-- Category Header -->
             <div class="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
                <div class="p-2 bg-black text-white rounded-lg shadow-sm">
                   <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getCategoryIcon(category)"></path></svg>
                </div>
                <h3 class="text-2xl font-black text-gray-900 uppercase tracking-tight">
                   {{ category }}
                </h3>
             </div>
             
             <!-- Items Grid -->
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NuxtLink 
                  v-for="item in items" 
                  :key="item.name" 
                  :to="`/solutions/${item.slug}`"
                  class="group flex items-center justify-between p-5 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer bg-white shadow-sm hover:shadow-md"
                >
                   <div>
                      <h4 class="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{{ item.name }}</h4>
                      <p class="text-xs text-gray-500 mt-1 font-medium">{{ item.count }} Verified Users</p>
                   </div>
                   <div class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-blue-600 transition-colors border border-gray-100">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
                   </div>
                </NuxtLink>
             </div>
          </div>

       </div>

       <!-- EMPTY STATE -->
       <div v-else class="mt-10 p-16 bg-gray-900 rounded-2xl text-center text-white border border-gray-800">
          <div class="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-white/50">
             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
          </div>
          <h3 class="text-2xl font-bold mb-2">The Index is Empty</h3>
          <p class="text-gray-400 text-sm mb-8">No solutions have been categorized in the database yet.</p>
          <NuxtLink to="/submit-solution" class="px-8 py-4 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors uppercase tracking-widest">
             Add First Solution
          </NuxtLink>
       </div>

    </div>

  </div>
  <AppFooter/>
</template>