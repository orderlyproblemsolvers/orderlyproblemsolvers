<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useColorMode } from '@vueuse/core'

// SERVICES DATA
const services = [
  {
    id: '01',
    title: 'Product Design',
    desc: 'UI/UX that prioritizes clarity over clutter. We build design systems, not just screens.',
  },
  {
    id: '02',
    title: 'Full-Stack Engineering',
    desc: 'Robust, scalable architectures using Vue, Nuxt, and Edge computing.',
  },
  {
    id: '03',
    title: 'Strategic Consultancy',
    desc: 'From technical feasibility to market launch. We provide the roadmap.',
  }
]

// THREE.JS LOGIC
const canvasContainer = ref<HTMLElement | null>(null)
const colorMode = useColorMode()
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let objects: THREE.Group
let materialCyan: THREE.LineBasicMaterial
let materialSecondary: THREE.LineBasicMaterial

const initThreeJS = () => {
  if (!canvasContainer.value) return

  // 1. SCENE
  scene = new THREE.Scene()
  
  // 2. CAMERA
  camera = new THREE.PerspectiveCamera(45, canvasContainer.value.clientWidth / canvasContainer.value.clientHeight, 0.1, 100)
  camera.position.z = 30 // Moved back further for a more spacious feel

  // 3. RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // 4. OBJECTS GROUP
  objects = new THREE.Group()
  scene.add(objects)

  // Materials: Extremely subtle, almost ghost-like opacities
  materialCyan = new THREE.LineBasicMaterial({ color: 0x00A9F4, transparent: true, opacity: 0.15 })
  // Secondary color adapts to theme (dark gray in light mode, faint white in dark mode)
  materialSecondary = new THREE.LineBasicMaterial({ 
    color: colorMode.value === 'dark' ? 0xffffff : 0x1e293b, 
    transparent: true, 
    opacity: 0.05 
  })

  // Shape 1: Large, sparse Icosahedron
  const geo1 = new THREE.IcosahedronGeometry(10, 0) // Larger size
  const wireframe1 = new THREE.WireframeGeometry(geo1)
  const line1 = new THREE.LineSegments(wireframe1, materialCyan)
  line1.position.set(8, 2, -5)
  line1.rotation.z = Math.PI / 6
  objects.add(line1)

  // Shape 2: Removed the cube for simplicity.
  
  // Shape 3: Torus (The "Loop")
  const geo3 = new THREE.TorusGeometry(5, 0.1, 8, 30) // Thinner tube, fewer segments
  const wireframe3 = new THREE.WireframeGeometry(geo3)
  const line3 = new THREE.LineSegments(wireframe3, materialSecondary)
  line3.position.set(-8, -5, -8)
  line3.rotation.x = Math.PI / 3
  objects.add(line3)

  animate()
}

// Update secondary color on theme change for consistency
watch(colorMode, (newMode) => {
  if (materialSecondary) {
    materialSecondary.color.setHex(newMode === 'dark' ? 0xffffff : 0x1e293b)
  }
})

const animate = () => {
  requestAnimationFrame(animate)
  if (objects) {
    // Extremely slow, barely perceptible movement
    objects.rotation.y += 0.0002 
    objects.children.forEach((child, i) => {
       child.rotation.x += 0.0001 * (i + 1)
       child.rotation.y += 0.0002 * (i + 1)
    })
  }
  renderer.render(scene, camera)
}

const onResize = () => {
  if (!canvasContainer.value || !camera || !renderer) return
  camera.aspect = canvasContainer.value.clientWidth / canvasContainer.value.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
}

onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <section class="relative py-28 bg-slate-50 dark:bg-[#0A253A] border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-colors duration-500">
    
    <div ref="canvasContainer" class="absolute inset-0 z-0 pointer-events-none opacity-50 mix-blend-multiply dark:mix-blend-screen"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <div class="lg:col-span-5 pt-8">
          <div class="mb-8">
            <span class="inline-block border-b border-[#00A9F4] pb-1 text-xs font-bold uppercase tracking-[0.2em] text-gray-900 dark:text-white">
              OPS Studio
            </span>
          </div>

          <h2 class="text-5xl md:text-6xl font-serif text-gray-900 dark:text-white tracking-tight mb-8 leading-[1.1]">
            We don't just chronicle the ecosystem.<br/>
            <span class="text-[#00A9F4] italic">We build it.</span>
          </h2>

          <p class="text-lg text-gray-600 dark:text-gray-300 font-light leading-relaxed mb-10 border-l border-gray-300 dark:border-gray-700 pl-6">
            OPS Studio is the premium design & development arm behind the platform. We help ambitious brands define their digital future with orderly code and timeless design.
          </p>

          <NuxtLink 
            to="/services" 
            class="inline-flex items-center gap-3 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-[#00A9F4] dark:hover:bg-[#00A9F4] hover:text-white dark:hover:text-white transition-all duration-300 shadow-md"
          >
            Start a Project
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </NuxtLink>
        </div>

        <div class="lg:col-span-7">
           <div class="flex flex-col">
              
              <div 
                v-for="(service, index) in services" 
                :key="index"
                class="group relative border-t border-gray-200 dark:border-gray-800 py-10 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-500"
              >
                <div class="flex items-baseline justify-between mb-4">
                   <div class="flex items-baseline gap-6">
                      <span class="text-xs font-bold text-[#00A9F4] tracking-widest">{{ service.id }}</span>
                      <h3 class="text-3xl font-serif text-gray-900 dark:text-white group-hover:text-[#00A9F4] transition-colors duration-300">
                        {{ service.title }}
                      </h3>
                   </div>
                   
                   <svg class="w-6 h-6 text-gray-300 dark:text-gray-600 group-hover:text-[#00A9F4] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                   </svg>
                </div>

                <div class="pl-10 md:pl-12 max-w-lg">
                   <p class="text-gray-600 dark:text-gray-400 font-light text-base leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                     {{ service.desc }}
                   </p>
                </div>
              </div>

              <div class="border-t border-gray-200 dark:border-gray-800"></div>
           </div>
        </div>

      </div>
    </div>
  </section>
</template>