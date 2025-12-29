<script setup lang="ts">
// No complex data needed, just pure layout
</script>

<template>
  <section 
    class="relative py-28 bg-white dark:bg-[#051C2C] border-t border-gray-200 dark:border-gray-800 transition-colors duration-500 overflow-hidden"
    aria-labelledby="cta-heading"
  >
    <div class="absolute top-0 right-0 w-1/3 h-full border-l border-gray-100 dark:border-white/5 pointer-events-none hidden lg:block"></div>
    <div class="absolute top-0 right-24 w-px h-full bg-gray-100 dark:bg-white/5 pointer-events-none hidden lg:block"></div>

    <div class="relative max-w-7xl mx-auto px-6 lg:px-12">
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        <div>
          <div class="mb-6">
            <span class="inline-block py-1 px-3 border border-gray-900 dark:border-white/30 rounded-full text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">
               Open Call
            </span>
          </div>

          <h2 
            id="cta-heading" 
            class="text-5xl md:text-7xl font-serif text-[#051C2C] dark:text-white tracking-tight leading-[1] mb-8"
          >
            Are you solving<br/>
            <span class="text-[#00A9F4] italic">the hard problems?</span>
          </h2>
          
          <p class="text-xl font-light text-gray-600 dark:text-gray-300 max-w-md leading-relaxed mb-10">
            The ecosystem is incomplete without you. Join the definitive directory of verified innovators and gain visibility where it matters.
          </p>

          <div class="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
             <NuxtLink 
               to="/submit-solution" 
               class="group relative inline-flex items-center justify-center px-8 py-4 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:bg-[#00A9F4] dark:hover:bg-[#00A9F4] hover:text-white dark:hover:text-white shadow-xl"
             >
               <span class="relative z-10 flex items-center gap-3">
                 Submit Solution
                 <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7-7 7"></path></svg>
               </span>
             </NuxtLink>
             
             <span class="text-xs font-medium text-gray-400 dark:text-gray-500">
                Takes approx 3 mins.<br/>Verified by OPS.
             </span>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-[#0A253A] p-8 md:p-12 border border-gray-200 dark:border-gray-700">
           <h3 class="text-lg font-bold text-[#051C2C] dark:text-white mb-8">
             Membership Benefits
           </h3>

           <ul class="space-y-0">
             <li class="group flex items-start gap-6 py-6 border-b border-gray-200 dark:border-gray-600">
               <span class="text-[#00A9F4] font-serif text-2xl italic opacity-50 group-hover:opacity-100 transition-opacity">01</span>
               <div>
                 <h4 class="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#00A9F4] transition-colors">Global Visibility</h4>
                 <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                   Get seen by international investors and partners explicitly scouting for emerging market solutions.
                 </p>
               </div>
             </li>

             <li class="group flex items-start gap-6 py-6 border-b border-gray-200 dark:border-gray-600">
               <span class="text-[#00A9F4] font-serif text-2xl italic opacity-50 group-hover:opacity-100 transition-opacity">02</span>
               <div>
                 <h4 class="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#00A9F4] transition-colors">Sector Authority</h4>
                 <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                   Position your brand alongside the top 100 verified innovators. Badges included.
                 </p>
               </div>
             </li>
             
             <li class="group flex items-start gap-6 pt-6">
               <span class="text-[#00A9F4] font-serif text-2xl italic opacity-50 group-hover:opacity-100 transition-opacity">03</span>
               <div>
                 <h4 class="text-base font-bold text-gray-900 dark:text-white mb-1 group-hover:text-[#00A9F4] transition-colors">Talent Magnet</h4>
                 <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                   Attract high-quality engineers and designers who want to work on hard problems.
                 </p>
               </div>
             </li>
           </ul>
        </div>

      </div>
    </div>
  </section>
</template>