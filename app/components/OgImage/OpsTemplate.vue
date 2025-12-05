<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  description?: string
  image?: string
  type?: 'Person' | 'Company' | 'Story' | 'General'
  role?: string
  companyName?: string
}>(), {
  title: 'Orderly Problem Solvers',
  description: 'The definitive index of the problem-solving economy.',
  type: 'General'
})
</script>

<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column; background-color: #ffffff; color: #000000; position: relative; overflow: hidden;" class="bg-white dark:bg-slate-950 text-black dark:text-white transition-colors duration-300">
    
    <!-- BACKGROUND EFFECTS -->
    <!-- Grid -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(#e5e7eb 1px, transparent 1px); background-size: 40px 40px; opacity: 0.8;" class="dark:opacity-20 dark:invert"></div>
    <!-- Blue Glow (Top Right) -->
    <div style="position: absolute; top: -150px; right: -150px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(37, 99, 235, 0.06) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;" class="dark:from-blue-900/20 dark:to-transparent"></div>
    <!-- Purple Glow (Bottom Left) -->
    <div style="position: absolute; bottom: -150px; left: -150px; width: 600px; height: 600px; background: radial-gradient(circle, rgba(147, 51, 234, 0.05) 0%, rgba(255,255,255,0) 70%); border-radius: 50%;" class="dark:from-purple-900/20 dark:to-transparent"></div>


    <!-- MAIN CONTENT (Centered) -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 80px; gap: 32px; position: relative; z-index: 10;">
      
      <!-- 1. STORY VARIANT -->
      <div v-if="type === 'Story'" style="display: flex; flex-direction: column; gap: 24px;">
        <h1 style="font-size: 70px; font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; margin: 0;" class="text-black dark:text-white">
          {{ title }}
        </h1>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="width: 6px; height: 60px; background-color: #2563eb;"></div>
          <p style="font-size: 32px; font-weight: 500; line-height: 1.4; max-width: 900px; margin: 0;" class="text-gray-600 dark:text-gray-300">
            {{ description }}
          </p>
        </div>
      </div>

      <!-- 2. PERSON VARIANT -->
      <div v-else-if="type === 'Person'" style="display: flex; align-items: center; gap: 48px;">
        <!-- Avatar -->
        <div v-if="image" style="display: flex; position: relative;">
           <img 
             :src="image" 
             width="220"
             height="220"
             :style="{
               objectFit: 'cover', 
               borderRadius: '50%',
               border: '6px solid white',
               boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.1)'
             }"
             class="dark:border-slate-800 dark:shadow-black/50"
           />
        </div>

        <!-- Text Stack -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <!-- Name + Blue Tick -->
          <div style="display: flex; align-items: center; gap: 16px;">
            <h1 style="font-size: 72px; font-weight: 900; letter-spacing: -0.04em; margin: 0; line-height: 1;" class="text-black dark:text-white">
              {{ title }}
            </h1>
            <!-- The Blue Tick -->
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="10" fill="#2563eb"/>
               <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <!-- Role Logic -->
          <div style="display: flex; align-items: center; gap: 16px;">
             <p style="font-size: 32px; font-weight: 600; margin: 0;" class="text-gray-600 dark:text-gray-300">
               {{ role }}
             </p>
             <p v-if="companyName" style="font-size: 32px; font-weight: 400; margin: 0;" class="text-gray-400 dark:text-gray-500">
               at <span style="color: #2563eb; font-weight: 600;">{{ companyName }}</span>
             </p>
             <div v-else style="padding: 6px 16px; border-radius: 8px; display: flex;" class="bg-gray-100 dark:bg-slate-800">
               <span style="font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;" class="text-gray-500 dark:text-gray-400">Freelance</span>
             </div>
          </div>
        </div>
      </div>

      <!-- 3. COMPANY / DEFAULT VARIANT -->
      <div v-else style="display: flex; align-items: center; gap: 48px;">
        <!-- Logo -->
        <div v-if="image" style="display: flex;">
           <img 
             :src="image" 
             width="200"
             height="200"
             :style="{
               objectFit: 'cover', 
               borderRadius: '32px',
               border: '6px solid white',
               boxShadow: '0 20px 40px -5px rgba(0, 0, 0, 0.1)'
             }"
             class="dark:border-slate-800 dark:shadow-black/50"
           />
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <h1 style="font-size: 72px; font-weight: 900; letter-spacing: -0.04em; margin: 0; line-height: 1;" class="text-black dark:text-white">
              {{ title }}
            </h1>
            <!-- Blue Tick -->
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="10" fill="#2563eb"/>
               <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p style="font-size: 32px; font-weight: 500; margin: 0; max-width: 800px; line-height: 1.3;" class="text-gray-600 dark:text-gray-300">
             {{ description }}
          </p>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 80px 60px 80px; margin-top: auto;">
      
      <!-- Left: URL -->
      <span style="font-size: 28px; font-weight: 600; letter-spacing: -0.02em;" class="text-gray-400 dark:text-gray-500">
        orderlyproblemsolvers.com
      </span>

      <!-- Right: Brand Logo + Text -->
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="font-size: 32px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase;" class="text-slate-900 dark:text-white">OPS Index.</span>
        <img 
          src="/img/logo-sm.png" 
          width="80" 
          height="80" 
          style="object-fit: contain;" 
          class="dark:invert"
        />
      </div>

    </div>

  </div>
</template>