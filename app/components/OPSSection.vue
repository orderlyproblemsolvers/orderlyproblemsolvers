<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// SERVICES DATA
const services = [
  {
    title: 'Product Design',
    desc: 'UI/UX that prioritizes clarity over clutter.',
    icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
  },
  {
    title: 'Full-Stack Engineering',
    desc: 'Robust, scalable, and maintainable applications.',
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
  },
  {
    title: 'Consultancy',
    desc: 'Strategic guidance from ideation to launch.',
    icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3'
  }
]

// THREE.JS LOGIC
const canvasContainer = ref<HTMLElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let objects: THREE.Group

const initThreeJS = () => {
  if (!canvasContainer.value) return

  // 1. SCENE (Match bg-gray-900 hex code: #111827)
  scene = new THREE.Scene()
  // We leave background transparent so the CSS gradient shines through
  // scene.background = new THREE.Color(0x111827) 

  // 2. CAMERA
  camera = new THREE.PerspectiveCamera(50, canvasContainer.value.clientWidth / canvasContainer.value.clientHeight, 0.1, 100)
  camera.position.z = 20

  // 3. RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(canvasContainer.value.clientWidth, canvasContainer.value.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // 4. OBJECTS (Wireframe Blueprints)
  objects = new THREE.Group()
  scene.add(objects)

  // Material: Blue Wireframe
  const material = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.3 })
  const materialAccent = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.5 })

  // Shape 1: Big Icosahedron (The Core)
  const geo1 = new THREE.IcosahedronGeometry(6, 1)
  const wireframe1 = new THREE.WireframeGeometry(geo1)
  const line1 = new THREE.LineSegments(wireframe1, material)
  line1.position.set(8, 0, -5)
  objects.add(line1)

  // Shape 2: Cube (The Structure)
  const geo2 = new THREE.BoxGeometry(4, 4, 4)
  const wireframe2 = new THREE.WireframeGeometry(geo2)
  const line2 = new THREE.LineSegments(wireframe2, materialAccent)
  line2.position.set(-8, 5, -2)
  line2.rotation.z = Math.PI / 4
  objects.add(line2)

  // Shape 3: Torus (The Cycle)
  const geo3 = new THREE.TorusGeometry(3, 1, 8, 20)
  const wireframe3 = new THREE.WireframeGeometry(geo3)
  const line3 = new THREE.LineSegments(wireframe3, material)
  line3.position.set(-6, -6, -5)
  objects.add(line3)

  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  
  // Rotate the entire group slightly
  if (objects) {
    objects.rotation.y += 0.002
    objects.children.forEach((child, i) => {
       // Rotate individuals
       child.rotation.x += 0.001 * (i + 1)
       child.rotation.y += 0.002 * (i + 1)
    })
  }
  
  renderer.render(scene, camera)
}

// RESIZE
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
  <section class="relative py-24 bg-gray-900 overflow-hidden">
    
    <div ref="canvasContainer" class="absolute inset-0 z-0 opacity-60 pointer-events-none"></div>

    <div class="absolute inset-0 z-0 bg-linear-to-r from-gray-900 via-gray-900/90 to-transparent pointer-events-none"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
            <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            OPS Studio
          </div>

          <h2 class="text-4xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            We don't just chronicle the ecosystem. <br/>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
              We build it.
            </span>
          </h2>

          <p class="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl">
            OPS Studio is the premium design & development arm behind the platform. We help ambitious brands define their digital future with orderly code and timeless design.
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink 
              to="/services" 
              class="px-8 py-4 rounded-xl bg-white text-gray-900 font-bold hover:bg-blue-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)] text-center"
            >
              Hire OPS
            </NuxtLink>
          </div>
        </div>

        <div class="space-y-6">
          
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="group bg-gray-900/40 backdrop-blur-md border border-gray-700 p-6 rounded-2xl flex items-start gap-6 hover:bg-gray-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div class="shrink-0 w-12 h-12 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="service.icon"></path>
              </svg>
            </div>

            <div>
              <h3 class="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {{ service.title }}
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed">
                {{ service.desc }}
              </p>
            </div>
            
            <div class="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
               <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>