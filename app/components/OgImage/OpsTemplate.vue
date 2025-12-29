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

// Current Date for that "Daily Briefing" feel
const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
</script>

<template>
  <div style="width: 100%; height: 100%; display: flex; flex-direction: column; background-color: #0f172a; color: #ffffff; font-family: sans-serif; position: relative;">
    
    <div style="position: absolute; inset: 0; background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); background-size: 60px 60px;"></div>

    <div style="position: absolute; top: 0; left: 0; right: 0; height: 8px; background: #2563eb;"></div>

    <div style="flex: 1; display: flex; flex-direction: column; padding: 60px 80px; position: relative; z-index: 10;">

      <div style="display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid rgba(255,255,255,0.15); padding-bottom: 24px; margin-bottom: 48px;">
        
        <div style="display: flex; flex-direction: column; gap: 4px;">
           <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 24px; height: 24px; background: #2563eb;"></div>
              <span style="font-size: 20px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">OPS Index.</span>
           </div>
        </div>

        <span style="font-size: 20px; font-weight: 400; color: #94a3b8; font-family: serif; font-style: italic;">
          {{ type === 'General' ? 'Intelligence Brief' : type }} &mdash; {{ dateStr }}
        </span>
      </div>


      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
        
        <div v-if="type === 'Story'" style="display: flex; flex-direction: column; gap: 32px;">
          <h1 style="font-family: serif; font-size: 80px; font-weight: 400; line-height: 1.1; margin: 0; color: #ffffff;">
            {{ title }}
          </h1>
          <div style="width: 100px; height: 2px; background: #2563eb;"></div>
          <p style="font-size: 32px; line-height: 1.5; color: #cbd5e1; max-width: 900px;">
            {{ description }}
          </p>
        </div>

        <div v-else-if="type === 'Person'" style="display: flex; align-items: flex-start; gap: 60px;">
          <img 
            v-if="image"
            :src="image" 
            width="280" height="280"
            style="object-fit: cover; border: 1px solid rgba(255,255,255,0.2);"
          />
          
          <div style="display: flex; flex-direction: column; justify-content: center; padding-top: 10px;">
             <span style="font-size: 24px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: #2563eb; margin-bottom: 16px;">
               Expert Profile
             </span>
             <h1 style="font-family: serif; font-size: 72px; font-weight: 400; line-height: 1; margin: 0 0 16px 0; color: #ffffff;">
               {{ title }}
             </h1>
             <p style="font-size: 32px; color: #94a3b8; margin: 0;">
               {{ role }} <span v-if="companyName" style="color: #64748b; margin: 0 8px;">/</span> {{ companyName }}
             </p>
          </div>
        </div>

        <div v-else style="display: flex; align-items: center; gap: 60px;">
          <div style="display: flex; align-items: center; justify-content: center; width: 240px; height: 240px; background: #ffffff; border: 1px solid #e2e8f0;">
             <img 
               v-if="image"
               :src="image" 
               width="160" height="160"
               style="object-fit: contain;"
             />
             <div v-else style="color: #0f172a; font-weight: 900; font-size: 48px;">OPS</div>
          </div>

          <div style="display: flex; flex-direction: column; gap: 24px;">
             <div style="display: flex; align-items: center; gap: 16px;">
                <h1 style="font-family: serif; font-size: 80px; font-weight: 400; margin: 0; line-height: 1; color: #ffffff;">
                  {{ title }}
                </h1>
                <div style="padding: 4px 12px; border: 1px solid #2563eb; color: #2563eb; font-size: 18px; font-weight: 600; text-transform: uppercase;">
                  Listed
                </div>
             </div>
             <p style="font-size: 30px; font-weight: 400; color: #cbd5e1; max-width: 800px; line-height: 1.4;">
               {{ description }}
             </p>
          </div>
        </div>

      </div>


      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.15); padding-top: 24px; margin-top: 48px;">
         <span style="font-size: 24px; color: #64748b; font-weight: 500;">
           orderlyproblemsolvers.com
         </span>
         <span style="font-size: 24px; color: #2563eb; font-weight: 600;">
           &rarr; Read the analysis
         </span>
      </div>

    </div>
  </div>
</template>