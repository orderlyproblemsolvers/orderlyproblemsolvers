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
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column; background-color: #051C2C; color: #ffffff; position: relative; overflow: hidden;">
    
    <div style="position: absolute; top: -100px; right: -100px; width: 900px; height: 900px; background: radial-gradient(circle, rgba(0, 169, 244, 0.25) 0%, transparent 70%); filter: blur(60px); opacity: 0.8;"></div>
    <div style="position: absolute; bottom: -200px; left: -200px; width: 800px; height: 800px; background: radial-gradient(circle, rgba(30, 58, 138, 0.4) 0%, transparent 70%); filter: blur(80px); opacity: 0.8;"></div>

    <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-image: radial-gradient(rgba(0, 169, 244, 0.3) 2px, transparent 2px); background-size: 50px 50px; opacity: 0.4;"></div>

    <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.2;" viewBox="0 0 1200 630">
      <path d="M100 100 L 300 250 L 500 150 L 800 400 L 1100 200" stroke="#00A9F4" stroke-width="2" fill="none" />
      <path d="M200 500 L 400 400 L 600 550 L 900 350" stroke="#00A9F4" stroke-width="1.5" fill="none" />
      <circle cx="300" cy="250" r="4" fill="#00A9F4" />
      <circle cx="500" cy="150" r="4" fill="#00A9F4" />
      <circle cx="800" cy="400" r="6" fill="#00A9F4" />
    </svg>

    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 80px; gap: 32px; position: relative; z-index: 10;">
      
      <div v-if="type === 'Story'" style="display: flex; flex-direction: column; gap: 24px;">
        <h1 style="font-size: 72px; font-weight: 900; letter-spacing: -0.03em; line-height: 1.1; margin: 0; color: #ffffff; text-shadow: 0 4px 20px rgba(0,0,0,0.3);">
          {{ title }}
        </h1>
        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="width: 6px; height: 60px; background: #00A9F4; border-radius: 3px; box-shadow: 0 0 15px rgba(0, 169, 244, 0.5);"></div>
          <p style="font-size: 32px; font-weight: 400; line-height: 1.4; max-width: 900px; margin: 0; color: #e2e8f0;">
            {{ description }}
          </p>
        </div>
      </div>

      <div v-else-if="type === 'Person'" style="display: flex; align-items: center; gap: 48px;">
        <div v-if="image" style="display: flex; position: relative;">
           <img 
             :src="image" 
             width="220"
             height="220"
             style="object-fit: cover; border-radius: 50%; border: 4px solid #00A9F4; box-shadow: 0 0 30px rgba(0, 169, 244, 0.3);"
           />
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <h1 style="font-size: 74px; font-weight: 900; letter-spacing: -0.04em; margin: 0; line-height: 1; color: #ffffff;">
              {{ title }}
            </h1>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="10" fill="#00A9F4"/>
               <path d="M8 12L11 15L16 9" stroke="#051C2C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <div style="display: flex; align-items: center; gap: 16px;">
             <p style="font-size: 32px; font-weight: 600; margin: 0; color: #cbd5e1;">
               {{ role }}
             </p>
             <p v-if="companyName" style="font-size: 32px; font-weight: 400; margin: 0; color: #94a3b8;">
               <span style="color: #00A9F4; font-weight: 600;">{{ companyName }}</span>
             </p>
             <div v-else style="padding: 6px 18px; border-radius: 8px; background: rgba(0, 169, 244, 0.1); border: 1px solid rgba(0, 169, 244, 0.3);">
               <span style="font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #00A9F4;">Freelance</span>
             </div>
          </div>
        </div>
      </div>

      <div v-else style="display: flex; align-items: center; gap: 48px;">
        <div v-if="image" style="display: flex;">
           <img 
             :src="image" 
             width="200"
             height="200"
             style="object-fit: cover; border-radius: 32px; border: 4px solid rgba(0, 169, 244, 0.3); box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.5);"
           />
        </div>
        <div style="display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <h1 style="font-size: 74px; font-weight: 900; letter-spacing: -0.04em; margin: 0; line-height: 1; color: #ffffff;">
              {{ title }}
            </h1>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="10" fill="#00A9F4"/>
               <path d="M8 12L11 15L16 9" stroke="#051C2C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <p style="font-size: 32px; font-weight: 500; margin: 0; max-width: 800px; line-height: 1.3; color: #cbd5e1;">
             {{ description }}
          </p>
        </div>
      </div>

    </div>

    <div style="display: flex; justify-content: space-between; align-items: flex-end; padding: 0 80px 60px 80px; margin-top: auto;">
      
      <div style="display: flex; align-items: center; gap: 16px;">
        <span style="font-size: 32px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; color: #ffffff;">OPS Index.</span>
        <img 
        src="/img/logo-sm.png" 
        width="60" 
        height="60" 
        style="object-fit: contain; filter: brightness(0) invert(1);" 
        />
      </div>
      
      <span style="font-size: 28px; font-weight: 600; letter-spacing: -0.02em; color: #00A9F4;">
        orderlyproblemsolvers.com
      </span>
    </div>

  </div>
</template>