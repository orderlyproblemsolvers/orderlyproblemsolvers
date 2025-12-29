<script setup lang="ts">
import { computed } from 'vue';

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

// Helper to determine the "Category" tag displayed at the top
const categoryLabel = computed(() => {
  if (props.type === 'Person') return 'Expert Profile'
  if (props.type === 'Company') return 'Solution Provider'
  if (props.type === 'Story') return 'Insight'
  return 'OPS Index'
})
</script>

<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column; background-color: #020617; color: #ffffff; position: relative; overflow: hidden; font-family: sans-serif;">
    
    <div style="position: absolute; top: -300px; left: 50%; transform: translateX(-50%); width: 1000px; height: 600px; background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%); filter: blur(80px);"></div>
    
    <div style="position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px); background-size: 60px 60px; mask-image: linear-gradient(to bottom, black 40%, transparent 100%);"></div>

    <div style="position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(to right, #3b82f6, #8b5cf6, #3b82f6);"></div>


    <div style="flex: 1; display: flex; flex-direction: column; padding: 64px; position: relative; z-index: 10;">
      
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: auto;">
        <div style="display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); padding: 8px 20px; border-radius: 99px;">
          <img src="/img/logo-sm.png" width="24" height="24" style="filter: brightness(0) invert(1);" />
          <span style="font-size: 18px; font-weight: 600; letter-spacing: 0.05em; color: #94a3b8; text-transform: uppercase;">
             OPS <span style="color: #475569; margin: 0 8px;">/</span> {{ categoryLabel }}
          </span>
        </div>
      </div>

      <div v-if="type === 'Story'" style="display: flex; flex-direction: column; gap: 32px; max-width: 1000px;">
        <h1 style="font-size: 80px; font-weight: 800; letter-spacing: -0.04em; line-height: 1.05; margin: 0; background: linear-gradient(to bottom right, #ffffff, #cbd5e1); background-clip: text; color: transparent;">
          {{ title }}
        </h1>
        <p style="font-size: 36px; line-height: 1.4; color: #94a3b8; font-weight: 400; border-left: 4px solid #3b82f6; padding-left: 32px;">
          {{ description }}
        </p>
      </div>

      <div v-else-if="type === 'Person'" style="display: flex; align-items: center; gap: 56px;">
        <div style="position: relative; display: flex;">
          <div style="position: absolute; inset: -4px; border-radius: 50%; background: linear-gradient(to bottom right, #3b82f6, #8b5cf6); opacity: 0.4; filter: blur(10px);"></div>
          <img 
            v-if="image"
            :src="image" 
            width="280" height="280"
            style="border-radius: 50%; object-fit: cover; border: 4px solid #1e293b; position: relative;"
          />
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
           <h1 style="font-size: 84px; font-weight: 900; letter-spacing: -0.04em; margin: 0; line-height: 1; color: white;">
             {{ title }}
           </h1>
           <div style="display: flex; align-items: center; gap: 16px;">
              <span style="font-size: 36px; font-weight: 500; color: #3b82f6;">{{ role }}</span>
              <span v-if="companyName" style="font-size: 36px; color: #475569;">at</span>
              <span v-if="companyName" style="font-size: 36px; font-weight: 600; color: #e2e8f0;">{{ companyName }}</span>
           </div>
           <div style="display: flex; gap: 12px; margin-top: 16px;">
              <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(255,255,255,0.1);"></div>
              <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(255,255,255,0.1);"></div>
              <div style="width: 40px; height: 40px; border-radius: 8px; background: rgba(255,255,255,0.1);"></div>
           </div>
        </div>
      </div>

      <div v-else style="display: flex; align-items: flex-start; gap: 48px;">
        <div style="display: flex; align-items: center; justify-content: center; width: 240px; height: 240px; background: linear-gradient(to bottom right, #1e293b, #0f172a); border: 1px solid rgba(255,255,255,0.1); border-radius: 48px; box-shadow: 0 24px 48px -12px rgba(0,0,0,0.5);">
          <img 
            v-if="image"
            :src="image" 
            width="140" height="140"
            style="object-fit: contain; border-radius: 12px;"
          />
        </div>

        <div style="display: flex; flex-direction: column; gap: 16px; padding-top: 16px;">
           <h1 style="font-size: 88px; font-weight: 900; letter-spacing: -0.05em; margin: 0; line-height: 1; color: white;">
             {{ title }}
           </h1>
           <p style="font-size: 32px; font-weight: 400; color: #94a3b8; max-width: 750px; line-height: 1.4;">
             {{ description }}
           </p>
           
           <div style="display: flex; align-items: center; gap: 12px; margin-top: 12px;">
             <div style="height: 1px; width: 40px; background: #3b82f6;"></div>
             <span style="font-size: 24px; font-weight: 600; color: #3b82f6; letter-spacing: 0.05em; text-transform: uppercase;">View Solution</span>
           </div>
        </div>
      </div>


      <div style="margin-top: auto; display: flex; justify-content: flex-end; align-items: flex-end;">
         <span style="font-size: 28px; font-weight: 600; color: #475569; letter-spacing: -0.02em;">
           orderlyproblemsolvers.com
         </span>
      </div>

    </div>
  </div>
</template>