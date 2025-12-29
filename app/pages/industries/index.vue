<script setup lang="ts">
// --- Types ---
interface Industry {
  id: string;
  label: string;
  count: number | string;
  desc: string;
  link: string;
}

// --- Data Fetching ---
const { data: industries, status, error } = await useFetch<Industry[]>('/api/industries', {
  lazy: true,
});

useHead({
  title: 'Industries - Orderly Problem Solvers',
});
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div class="pt-24 pb-12 border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        <h1 class="text-5xl md:text-6xl font-serif tracking-tight text-[#051C2C] dark:text-white mb-4">
          Industries<span class="text-[#00A9F4]">.</span>
        </h1>
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl font-light">
           A directory of operational sectors and the entities solving problems within them.
        </p>
      </div>
    </div>

    <div v-if="status === 'pending'" class="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-8">
       <div v-for="n in 5" :key="n" class="h-24 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md w-full"></div>
    </div>

    <div v-else-if="error" class="py-24 text-center">
      <p class="text-red-500">Unable to load industries.</p>
    </div>

    <div v-else class="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      
      <div class="grid grid-cols-1 gap-0">
        <NuxtLink 
          v-for="industry in industries" 
          :key="industry.id"
          :to="industry.link"
          class="group block border-b border-gray-200 dark:border-gray-800 py-10 hover:bg-gray-50 dark:hover:bg-[#0A253A] transition-colors duration-300"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div class="md:w-2/3">
              <h3 class="text-3xl font-serif text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] transition-colors duration-300">
                {{ industry.label }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400 mt-2 text-base font-light max-w-lg">
                {{ industry.desc }}
              </p>
            </div>

            <div class="md:w-1/3 flex items-center justify-start md:justify-end gap-6">
               <div class="text-right">
                 <span class="block text-3xl font-light text-[#051C2C] dark:text-white">
                   {{ industry.count }}
                 </span>
                 <span class="text-xs uppercase tracking-widest text-gray-400">Entities</span>
               </div>
               
        
            </div>

          </div>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>