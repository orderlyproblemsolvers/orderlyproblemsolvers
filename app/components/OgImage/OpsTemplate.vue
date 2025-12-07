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
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column; background: linear-gradient(to bottom right, #0f172a, #1e293b); color: #ffffff; position: relative; overflow: hidden;">
    
    <!-- BACKGROUND EFFECTS -->
    <!-- Subtle Grid -->
    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(rgba(148, 163, 184, 0.15) 1px, transparent 1px); background-size: 48px 48px; opacity: 0.5;"></div>
    
    <!-- Gradient Orbs -->
    <div style="position: absolute; top: -200px; right: -200px; width: 800px; height: 800px; background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%); border-radius: 50%;"></div>
    <div style="position: absolute; bottom: -250px; left: -250px; width: 700px; height: 700px; background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%); border-radius: 50%;"></div>

    <!-- MAIN CONTENT (Centered) -->
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 80px; gap: 32px; position: relative; z-index: 10;">
      
      <!-- 1. STORY VARIANT -->
      <div v-if="type === 'Story'" style="display: flex; flex-direction: column; gap: 24px;">
        <h1 style="font-size: 72px; font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; margin: 0; color: #ffffff;">
          {{ title }}
        </h1>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="width: 6px; height: 60px; background: linear-gradient(to bottom, #3b82f6, #8b5cf6); border-radius: 3px;"></div>
          <p style="font-size: 32px; font-weight: 500; line-height: 1.4; max-width: 900px; margin: 0; color: #cbd5e1;">
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
             style="object-fit: cover; border-radius: 50%; border: 5px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);"
           />
        </div>

        <!-- Text Stack -->
        <div style="display: flex; flex-direction: column; gap: 12px;">
          <!-- Name + Badge -->
          <div style="display: flex; align-items: center; gap: 16px;">
            <h1 style="font-size: 74px; font-weight: 900; letter-spacing: -0.04em; margin: 0; line-height: 1; color: #ffffff;">
              {{ title }}
            </h1>
            <!-- Gradient Badge -->
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <linearGradient id="badge-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                   <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                 </linearGradient>
               </defs>
               <circle cx="12" cy="12" r="10" fill="url(#badge-gradient)"/>
               <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <!-- Role -->
          <div style="display: flex; align-items: center; gap: 16px;">
             <p style="font-size: 32px; font-weight: 600; margin: 0; color: #cbd5e1;">
               {{ role }}
             </p>
             <p v-if="companyName" style="font-size: 32px; font-weight: 400; margin: 0; color: #94a3b8;">
               <span style="color: #3b82f6; font-weight: 600;">{{ companyName }}</span>
             </p>
             <div v-else style="padding: 6px 18px; border-radius: 8px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);">
               <span style="font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8;">Freelance</span>
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
             style="object-fit: cover; border-radius: 32px; border: 5px solid rgba(255, 255, 255, 0.1); box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);"
           />
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <h1 style="font-size: 74px; font-weight: 900; letter-spacing: -0.04em; margin: 0; line-height: 1; color: #ffffff;">
              {{ title }}
            </h1>
            <!-- Gradient Badge -->
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <defs>
                 <linearGradient id="badge-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
                   <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
                 </linearGradient>
               </defs>
               <circle cx="12" cy="12" r="10" fill="url(#badge-gradient-2)"/>
               <path d="M8 12L11 15L16 9" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p style="font-size: 32px; font-weight: 500; margin: 0; max-width: 800px; line-height: 1.3; color: #cbd5e1;">
             {{ description }}
          </p>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 80px 60px 80px; margin-top: auto;">
      
      <!-- Left: URL -->
      
      <!-- Right: Brand Logo + Text -->
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="font-size: 32px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; color: #ffffff;">OPS Index.</span>
        <img 
        src="/img/logo-sm.png" 
        width="80" 
        height="80" 
        style="object-fit: contain; filter: brightness(0) invert(1);" 
        />
      </div>
      
      <span style="font-size: 28px; font-weight: 600; letter-spacing: -0.02em; color: #64748b;">
        orderlyproblemsolvers.com
      </span>
    </div>

  </div>
</template>