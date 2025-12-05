<script setup lang="ts">
// No complex data needed, just pure layout
</script>

<template>
  <section 
    class="py-24 bg-white dark:bg-slate-950 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300"
    aria-labelledby="cta-heading"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div class="lg:col-span-7">
          <h2 
            id="cta-heading" 
            class="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter leading-[0.9] mb-8 transition-colors"
          >
            MAKE YOUR <br/>
            <span class="text-gray-300 dark:text-slate-700 transition-colors">MARK.</span>
          </h2>
          <p class="text-xl md:text-2xl font-medium text-gray-900 dark:text-gray-200 max-w-lg leading-tight transition-colors">
            The ecosystem is incomplete without you. Join the definitive directory of problem solvers.
          </p>
        </div>

        <div class="lg:col-span-5 flex flex-col justify-between h-full pt-2 lg:pt-4">
          
          <div class="space-y-6 mb-12">
            <div class="flex items-start gap-4 group">
              <div class="mt-1 w-2 h-2 bg-blue-600 dark:bg-blue-500 rounded-full shrink-0 transition-colors"></div>
              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-1 transition-colors">Visibility</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 transition-colors">Get seen by investors and partners scouting for solutions.</p>
              </div>
            </div>
            <div class="flex items-start gap-4 group">
              <div class="mt-1 w-2 h-2 bg-gray-300 dark:bg-slate-700 rounded-full group-hover:bg-blue-600 dark:group-hover:bg-blue-500 transition-colors shrink-0"></div>
              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-1 transition-colors">Authority</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 transition-colors">Position your brand alongside the top 100 innovators in your region.</p>
              </div>
            </div>
          </div>

          <div>
            <NuxtLink 
              to="/submit-solution" 
              class="group block w-full bg-black dark:bg-white text-white dark:text-black p-6 rounded-none text-left hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
              aria-label="Submit your solution to the directory"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-blue-200 dark:group-hover:text-blue-100 transition-colors">Start Submission</span>
                <svg class="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </div>
              <span class="text-2xl font-bold block">Submit your solution</span>
            </NuxtLink>
            <p class="mt-4 text-xs text-gray-400 dark:text-gray-500 font-medium transition-colors">
              Takes approx 3 minutes • Verified by OPS Team
            </p>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>