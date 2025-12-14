<script setup lang="ts">
import { ref } from 'vue'

const searchQuery = ref('')

// STATS TICKER DATA
const stats = [
  { label: 'Verified Solvers', value: '4,281' },
  { label: 'Total Companies', value: '1,094' },
  { label: 'Active Industries', value: '24' },
  { label: 'New This Week', value: '+32' },
]

// PILLARS DATA
const pillars = [
  {
    title: 'People',
    subtitle: 'The Talent',
    desc: 'Founders, CTOs, and Engineers.',
    count: '2.1k Profiles',
    link: '/people',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
  },
  {
    title: 'Companies',
    subtitle: 'The Entities',
    desc: 'Startups, Agencies, and Enterprises.',
    count: '1.2k Listed',
    link: '/companies',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
  },
  {
    title: 'Industries',
    subtitle: 'The Sectors',
    desc: 'FinTech, Health, Agri, Logistics.',
    count: '24 Sectors',
    link: '/industries',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
  },
  {
    title: 'Solutions',
    subtitle: 'The Tech',
    desc: 'Browse by Stack or Function.',
    count: '50+ Categories',
    link: '/solutions',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  }
]

// COLLECTIONS DATA
const collections = [
  {
    title: 'Fastest Growing Q4',
    count: '12 Companies',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'bg-green-100 text-green-700'
  },
  {
    title: 'The YC Alumni List',
    count: '45 Founders',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'bg-orange-100 text-orange-700'
  },
  {
    title: 'Women in Tech',
    count: '120 Leaders',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    color: 'bg-purple-100 text-purple-700'
  }
]

// RECENT ACTIVITY DATA
const recentActivity = [
  { time: '2m ago', name: 'Sarah Jenkins', type: 'Person', action: 'Verified Profile', location: 'Lagos' },
  { time: '14m ago', name: 'PayStack', type: 'Company', action: 'Posted Solution', location: 'Global' },
  { time: '1h ago', name: 'AgriSense', type: 'Company', action: 'Updated Stack', location: 'Nairobi' },
  { time: '3h ago', name: 'David Chen', type: 'Person', action: 'Joined', location: 'Remote' },
]

// TAG CLOUD
const tags = ['Vue.js', 'FinTech', 'Nuxt', 'Python', 'Logistics', 'HealthTech', 'Lagos', 'Remote', 'SaaS', 'B2B', 'Payments', 'AI', 'Rust', 'Design']
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-900 selection:bg-black selection:text-white">
    
    <!-- 1. HERO: COMMAND CENTER -->
    <div class="pt-32 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div class="max-w-7xl mx-auto text-center">
        
        <span class="inline-block border border-gray-200 rounded-full px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-6">
          System Status: Online
        </span>
        
        <h1 class="text-5xl md:text-8xl font-black tracking-tighter mb-4">
          THE INDEX.
        </h1>
        <p class="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
          Search 5,000+ verified solvers by stack, industry, or role.
        </p>

        <!-- Search Bar -->
        <div class="max-w-3xl mx-auto relative mb-16">
          <div class="relative group">
            <div class="absolute -inset-1 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg blur opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div class="relative flex items-center bg-white border border-gray-200 rounded-lg shadow-sm">
              <div class="pl-6 text-gray-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </div>
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Try 'Fintech companies in Nairobi'..." 
                class="w-full h-16 px-4 text-lg outline-none placeholder-gray-400 font-medium"
              />
              <div class="pr-2">
                 <button class="bg-black text-white px-6 py-2.5 rounded-md font-bold text-sm hover:bg-gray-800 transition-colors">
                   Search
                 </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Ticker -->
        <div class="flex flex-wrap justify-center gap-4 md:gap-12 border-t border-gray-100 pt-8">
           <div v-for="stat in stats" :key="stat.label" class="text-center">
              <p class="text-[10px] font-mono font-bold uppercase text-gray-400 tracking-wider mb-1">{{ stat.label }}</p>
              <p class="text-2xl font-black tracking-tight">{{ stat.value }}</p>
           </div>
        </div>

      </div>
    </div>

    <!-- 2. THE FOUR PILLARS -->
    <div class="border-b border-gray-100 bg-gray-50/50">
       <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
             
             <NuxtLink 
               v-for="pillar in pillars" 
               :key="pillar.title" 
               :to="pillar.link"
               class="group p-8 hover:bg-white transition-colors flex flex-col h-full min-h-[250px]"
             >
                <div class="mb-auto">
                   <div class="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-900 mb-6 group-hover:scale-110 transition-transform duration-300">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="pillar.icon"></path></svg>
                   </div>
                   <h3 class="text-2xl font-bold tracking-tight mb-1">{{ pillar.title }}</h3>
                   <p class="text-xs font-mono font-bold uppercase text-gray-400 mb-3">{{ pillar.subtitle }}</p>
                   <p class="text-sm text-gray-500 leading-relaxed">{{ pillar.desc }}</p>
                </div>
                
                <div class="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                   <span class="text-xs font-bold text-gray-900 bg-gray-100 px-2 py-1 rounded">{{ pillar.count }}</span>
                   <span class="text-gray-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
             </NuxtLink>

          </div>
       </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <!-- 3. LEFT COLUMN: COLLECTIONS & MATRIX (Span 8) -->
        <div class="lg:col-span-8 space-y-16">
           
           <!-- Collections -->
           <div>
              <div class="flex items-center justify-between mb-8">
                 <h3 class="text-lg font-black uppercase tracking-wide">Curated Collections</h3>
                 <a href="#" class="text-xs font-bold text-gray-400 hover:text-black">View All</a>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div v-for="col in collections" :key="col.title" class="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-100 aspect-video">
                    <img :src="col.image" class="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500" />
                    <div class="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-6">
                       <span :class="col.color" class="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 shadow-sm">{{ col.count }}</span>
                       <h4 class="text-xl font-bold text-white leading-tight group-hover:underline decoration-white/50 underline-offset-4">{{ col.title }}</h4>
                    </div>
                 </div>
              </div>
           </div>

           <!-- Matrix / Tag Cloud -->
           <div class="p-8 border border-gray-200 rounded-2xl bg-white shadow-sm">
              <h3 class="text-lg font-black uppercase tracking-wide mb-6">Ecosystem Matrix</h3>
              <div class="flex flex-wrap gap-2">
                 <button 
                   v-for="tag in tags" 
                   :key="tag"
                   class="px-4 py-2 border border-gray-200 rounded text-sm font-medium text-gray-600 hover:bg-black hover:text-white hover:border-black transition-colors"
                 >
                   {{ tag }}
                 </button>
                 <button class="px-4 py-2 border border-dashed border-gray-300 rounded text-sm font-medium text-gray-400 hover:text-gray-900 hover:border-gray-400">
                    + Explore All
                 </button>
              </div>
           </div>

        </div>

        <!-- 4. RIGHT COLUMN: LIVE FEED (Span 4) -->
        <div class="lg:col-span-4">
           <div class="sticky top-24">
              <div class="bg-gray-50 border border-gray-200 rounded-xl overflow-hidden">
                 <div class="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
                    <h3 class="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                       <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                       Live Feed
                    </h3>
                    <span class="text-[10px] font-mono text-gray-400">REALTIME</span>
                 </div>
                 
                 <div class="divide-y divide-gray-100">
                    <div v-for="(item, i) in recentActivity" :key="i" class="p-4 hover:bg-white transition-colors">
                       <div class="flex items-center justify-between mb-1">
                          <span class="text-[10px] font-mono text-gray-400">{{ item.time }}</span>
                          <span class="text-[10px] font-bold uppercase text-blue-600">{{ item.type }}</span>
                       </div>
                       <p class="text-sm font-bold text-gray-900">{{ item.name }}</p>
                       <p class="text-xs text-gray-500">{{ item.action }} in <span class="text-gray-700 font-medium">{{ item.location }}</span></p>
                    </div>
                 </div>

                 <div class="p-4 bg-gray-100 border-t border-gray-200 text-center">
                    <p class="text-xs text-gray-500 mb-3">Want to appear here?</p>
                    <NuxtLink to="/submit-solution" class="block w-full py-2 bg-white border border-gray-300 rounded shadow-sm text-xs font-bold uppercase hover:bg-black hover:text-white hover:border-black transition-colors">
                       Join The Index
                    </NuxtLink>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>

  </div>
</template>