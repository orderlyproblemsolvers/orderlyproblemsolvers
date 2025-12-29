<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

// 1. FETCH REAL DATA
// Calls: server/api/solutions/[slug].get.ts
const { data: solution, error, status } = await useFetch(`/api/solutions/${slug}`)

// 2. HANDLE 404
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Solution Specification Not Found', fatal: true })
}
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">
    
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center font-mono text-xs uppercase tracking-widest text-gray-400">
       <div class="w-8 h-8 border-2 border-[#00A9F4] border-t-transparent rounded-full animate-spin mb-4"></div>
       <p>Loading Specification...</p>
    </div>

    <div v-else-if="solution">
      
      <div class="bg-[#051C2C] dark:bg-black text-white pt-32 pb-16 relative overflow-hidden">
        
        <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 24px 24px;"></div>

        <div class="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
           <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
              <div>
                 <div class="flex items-center gap-3 mb-6">
                    <span class="font-mono text-xs text-[#00A9F4] uppercase border border-[#00A9F4] px-2 py-0.5">
                      {{ solution.category || 'General' }}
                    </span>
                    <span class="font-mono text-xs text-gray-500">SPEC_ID: {{ solution.id }}</span>
                 </div>
                 
                 <h1 class="text-6xl md:text-8xl font-serif font-bold tracking-tight mb-8">
                   {{ solution.name }}<span class="text-[#00A9F4]">.</span>
                 </h1>
                 
                 <div class="flex gap-12 border-t border-white/20 pt-6">
                    <div>
                       <span class="block text-4xl font-mono font-bold">{{ solution.stats.companies }}</span>
                       <span class="text-[10px] uppercase tracking-widest text-gray-400">Implementations</span>
                    </div>
                    <div>
                       <span class="block text-4xl font-mono font-bold">{{ solution.stats.experts }}</span>
                       <span class="text-[10px] uppercase tracking-widest text-gray-400">Certified Experts</span>
                    </div>
                 </div>
              </div>

              <div class="hidden lg:block opacity-20">
                 
              </div>
           </div>
        </div>
      </div>

      <div class="border-b border-gray-200 dark:border-gray-800">
         <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200 dark:divide-gray-800 border-x border-gray-200 dark:border-gray-800">
               
               <div class="p-8 lg:p-12">
                  <h3 class="text-sm font-bold uppercase tracking-widest text-[#051C2C] dark:text-white mb-8 flex items-center gap-2">
                     <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                     Used By Organizations
                  </h3>
                  
                  <div v-if="solution.companies && solution.companies.length > 0" class="space-y-6">
                     <NuxtLink 
                       v-for="comp in solution.companies" 
                       :key="comp.slug" 
                       :to="`/companies/${comp.slug}`"
                       class="group flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                     >
                        <div class="w-12 h-12 bg-gray-100 dark:bg-white/10 flex items-center justify-center font-bold text-gray-400 dark:text-gray-500 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0">
                           <img v-if="comp.logo" :src="comp.logo" class="w-full h-full object-cover" />
                           <span v-else>{{ comp.name.charAt(0) }}</span>
                        </div>
                        <div>
                           <h4 class="text-lg font-serif font-bold text-[#051C2C] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {{ comp.name }}
                           </h4>
                           <p class="font-mono text-[10px] text-gray-400 uppercase mt-1">
                              {{ comp.industry }} • {{ comp.location }}
                           </p>
                        </div>
                     </NuxtLink>
                  </div>
                  
                  <div v-else class="py-12 text-center border border-dashed border-gray-200 dark:border-gray-800">
                     <span class="font-mono text-xs text-gray-400">NO_DATA_AVAILABLE</span>
                  </div>
               </div>

               <div class="p-8 lg:p-12 bg-gray-50 dark:bg-[#0A253A]">
                  <h3 class="text-sm font-bold uppercase tracking-widest text-[#051C2C] dark:text-white mb-8 flex items-center gap-2">
                     <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
                     Domain Experts
                  </h3>
                  
                  <div v-if="solution.experts && solution.experts.length > 0" class="space-y-6">
                     <NuxtLink 
                       v-for="person in solution.experts" 
                       :key="person.slug" 
                       :to="`/people/${person.slug}`"
                       class="group flex items-center gap-4 p-4 hover:bg-white dark:hover:bg-black/20 transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
                     >
                        <img 
                          :src="person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=random`" 
                          class="w-10 h-10 rounded-full grayscale group-hover:grayscale-0 transition-all"
                        />
                        <div>
                           <h4 class="text-base font-bold text-[#051C2C] dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {{ person.name }}
                           </h4>
                           <p class="font-mono text-[10px] text-gray-400 uppercase">
                              {{ person.role }}
                           </p>
                        </div>
                     </NuxtLink>
                  </div>
                  
                  <div v-else class="py-12 text-center border border-dashed border-gray-200 dark:border-gray-800">
                     <span class="font-mono text-xs text-gray-400">NO_EXPERTS_FOUND</span>
                  </div>
               </div>

            </div>
         </div>
      </div>

      <div class="bg-white dark:bg-[#051C2C] py-24 text-center">
         <h3 class="text-2xl font-serif font-bold text-[#051C2C] dark:text-white mb-2">Build with {{ solution.name }}?</h3>
         <p class="text-xs font-mono text-gray-400 uppercase tracking-widest mb-8">Verification Open for Q4</p>
         
         <NuxtLink to="/submit-solution" class="inline-block px-10 py-4 border-2 border-[#051C2C] dark:border-white text-[#051C2C] dark:text-white text-xs font-bold uppercase tracking-widest hover:bg-[#051C2C] hover:text-white dark:hover:bg-white dark:hover:text-[#051C2C] transition-colors">
            Register Usage
         </NuxtLink>
      </div>

    </div>
  </div>
</template>