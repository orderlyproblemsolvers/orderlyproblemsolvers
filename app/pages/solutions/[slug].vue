<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = route.params.slug as string

// 1. FETCH REAL DATA
// Calls: server/api/solutions/[slug].get.ts
const { data: solution, error, status } = await useFetch(`/api/solutions/${slug}`)

// 2. HANDLE 404
if (error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Solution not found', fatal: true })
}
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900">
    
    <!-- LOADING STATE -->
    <div v-if="status === 'pending'" class="h-screen flex items-center justify-center">
       <div class="w-12 h-12 border-4 border-gray-100 border-t-black rounded-full animate-spin"></div>
    </div>

    <div v-else-if="solution">
      
      <!-- HERO SECTION -->
      <div class="bg-gray-900 text-white pt-32 pb-20 relative overflow-hidden">
        <!-- Abstract Background Pattern -->
        <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-500 to-transparent"></div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           <div class="flex flex-col md:flex-row md:items-start justify-between gap-8">
              <div>
                 <span class="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                    {{ solution.category || 'General Tech' }}
                 </span>
                 <h1 class="text-5xl md:text-7xl font-black tracking-tighter mb-8">{{ solution.name }}</h1>
                 
                 <!-- Stats -->
                 <div class="flex gap-8 text-sm font-mono text-gray-400 border-t border-white/10 pt-6 inline-flex">
                    <div>
                       <strong class="text-white text-lg block">{{ solution.stats.companies }}</strong>
                       <span>Organizations</span>
                    </div>
                    <div class="w-px bg-white/20 h-full"></div>
                    <div>
                       <strong class="text-white text-lg block">{{ solution.stats.experts }}</strong>
                       <span>Experts</span>
                    </div>
                 </div>
              </div>

              <!-- Dynamic Icon Block -->
              <div class="hidden md:flex w-32 h-32 bg-white/5 border border-white/10 rounded-3xl items-center justify-center backdrop-blur-sm transform rotate-3 hover:rotate-0 transition-transform">
                 <span class="text-5xl font-black text-white/20">{{ solution.name.charAt(0) }}</span>
              </div>
           </div>
        </div>
      </div>

      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
         
         <!-- SECTIONS GRID -->
         <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            <!-- LEFT: COMPANIES LIST -->
            <div>
               <h3 class="text-xl font-black text-gray-900 mb-8 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
                  Implemented By
               </h3>
               
               <div v-if="solution.companies && solution.companies.length > 0" class="space-y-4">
                  <NuxtLink 
                    v-for="comp in solution.companies" 
                    :key="comp.slug" 
                    :to="`/companies/${comp.slug}`"
                    class="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all bg-white group"
                  >
                     <div class="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors overflow-hidden shrink-0">
                        <img v-if="comp.logo && comp.logo.startsWith('http')" :src="comp.logo" class="w-full h-full object-cover" />
                        <span v-else class="text-sm uppercase">{{ comp.name.charAt(0) }}</span>
                     </div>
                     <div>
                        <h4 class="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{{ comp.name }}</h4>
                        <p class="text-xs text-gray-500">{{ comp.industry }} • {{ comp.location }}</p>
                     </div>
                  </NuxtLink>
               </div>
               
               <div v-else class="p-8 bg-gray-50 rounded-xl text-center border border-dashed border-gray-200">
                  <p class="text-sm font-bold text-gray-400">No organizations verified yet.</p>
               </div>
            </div>

            <!-- RIGHT: EXPERTS LIST -->
            <div>
               <h3 class="text-xl font-black text-gray-900 mb-8 flex items-center gap-2 border-b border-gray-100 pb-4">
                  <span class="w-2 h-2 bg-purple-600 rounded-full"></span>
                  Domain Experts
               </h3>
               
               <div v-if="solution.experts && solution.experts.length > 0" class="space-y-4">
                  <NuxtLink 
                    v-for="person in solution.experts" 
                    :key="person.slug" 
                    :to="`/people/${person.slug}`"
                    class="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-purple-500 hover:shadow-md transition-all bg-white group"
                  >
                     <img 
                       :src="person.avatar || `https://ui-avatars.com/api/?name=${person.name}&background=random`" 
                       class="w-12 h-12 rounded-full object-cover border border-gray-100 bg-gray-50 shrink-0"
                     />
                     <div>
                        <h4 class="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{{ person.name }}</h4>
                        <p class="text-xs text-gray-500">{{ person.role }}</p>
                     </div>
                  </NuxtLink>
               </div>
               
               <div v-else class="p-8 bg-gray-50 rounded-xl text-center border border-dashed border-gray-200">
                  <p class="text-sm font-bold text-gray-400">No experts listed yet.</p>
               </div>
            </div>

         </div>

         <!-- CTA FOOTER -->
         <div class="mt-24 p-10 bg-gray-100 rounded-3xl text-center border border-gray-200">
            <h3 class="text-2xl font-black mb-4">Do you work with {{ solution.name }}?</h3>
            <p class="text-gray-600 mb-8 max-w-md mx-auto">Add your profile to the index to be discovered by partners and clients looking for this expertise.</p>
            <NuxtLink to="/submit-solution" class="inline-block px-8 py-4 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
               Join the Index
            </NuxtLink>
         </div>

      </div>

    </div>
  </div>
</template>