<script setup lang="ts">
// No complex data needed, just pure layout
</script>

<template>
  <section class="py-24 bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-7">
          <h2 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
            MAKE YOUR <br/>
            <span class="text-gray-300">MARK.</span>
          </h2>
          <p class="text-xl md:text-2xl font-medium text-gray-900 max-w-lg leading-tight">
            The ecosystem is incomplete without you. Join the definitive directory of problem solvers.
          </p>
        </div>

        <div class="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-4">
          
          <div class="space-y-6 mb-12">
            <div class="flex items-start gap-4 group">
              <div class="mt-1 w-2 h-2 bg-blue-600 rounded-full"></div>
              <div>
                <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Visibility</h4>
                <p class="text-sm text-gray-500">Get seen by investors and partners scouting for solutions.</p>
              </div>
            </div>
            <div class="flex items-start gap-4 group">
              <div class="mt-1 w-2 h-2 bg-gray-300 rounded-full group-hover:bg-blue-600 transition-colors"></div>
              <div>
                <h4 class="text-sm font-bold text-gray-900 uppercase tracking-wide mb-1">Authority</h4>
                <p class="text-sm text-gray-500">Position your brand alongside the top 100 innovators in your region.</p>
              </div>
            </div>
          </div>

          <div>
            <NuxtLink 
              to="/submit-solution" 
              class="group block w-full bg-black text-white p-6 rounded-none text-left hover:bg-blue-600 transition-colors duration-300"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-blue-200">Start Submission</span>
                <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
              <span class="text-2xl font-bold">Submit your solution</span>
            </NuxtLink>
            <p class="mt-4 text-xs text-gray-400 font-medium">
              Takes approx 3 minutes • Verified by OPS Team
            </p>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>