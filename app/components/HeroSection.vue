<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// REFS
const canvasContainer = ref<HTMLElement | null>(null)
const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim().length === 0) return
  const queryParam = encodeURIComponent(searchQuery.value.trim())
  window.location.href = `/search?q=${queryParam}`
}

// THREE.JS VARIABLES
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let shapes: THREE.Mesh[] = []

// QUICK TAGS
const quickTags = ['FinTech', 'Health', 'Logistics', 'Education']

// INIT THREE.JS
const initThreeJS = () => {
  if (!canvasContainer.value) return

  // 1. SCENE - Clean White/Off-White
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff) 
  // Optional: Add a subtle fog to blend objects into the distance
  scene.fog = new THREE.Fog(0xffffff, 10, 50)

  // 2. CAMERA
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 30)

  // 3. RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true // Enable shadows for depth
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  canvasContainer.value.appendChild(renderer.domElement)

  // 4. LIGHTING (Studio Setup)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
  scene.add(ambientLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(10, 20, 10)
  dirLight.castShadow = true
  scene.add(dirLight)
  
  const blueLight = new THREE.PointLight(0x3b82f6, 2, 50) // Blue accent light
  blueLight.position.set(-10, -10, 10)
  scene.add(blueLight)

  // 5. GEOMETRY (The "Solution Blocks")
  const geometries = [
    new THREE.IcosahedronGeometry(2, 0), // Geometric Ball
    new THREE.TorusGeometry(1.5, 0.5, 16, 100), // Ring
    new THREE.BoxGeometry(2, 2, 2), // Cube
    new THREE.OctahedronGeometry(1.5) // Diamond
  ]

  // MATERIAL (Ceramic / Matte Look)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf3f4f6, // Very light gray
    roughness: 0.2,  // Slightly shiny
    metalness: 0.1,
    clearcoat: 0.8,  // Polish layer
    clearcoatRoughness: 0.2,
  })

  // CREATE OBJECTS
  for (let i = 0; i < 12; i++) {
    const geometry = geometries[Math.floor(Math.random() * geometries.length)]
    const mesh = new THREE.Mesh(geometry, material)

    // Random Positions spread out
    mesh.position.x = (Math.random() - 0.5) * 40
    mesh.position.y = (Math.random() - 0.5) * 20
    mesh.position.z = (Math.random() - 0.5) * 20 - 5

    // Random Rotation
    mesh.rotation.x = Math.random() * Math.PI
    mesh.rotation.y = Math.random() * Math.PI

    mesh.castShadow = true
    mesh.receiveShadow = true

    shapes.push(mesh)
    scene.add(mesh)
  }

  animate()
}

// ANIMATION LOOP
const animate = () => {
  requestAnimationFrame(animate)

  // Floating Animation
  const time = Date.now() * 0.0005

  shapes.forEach((mesh, i) => {
    // Rotate slowly
    mesh.rotation.x += 0.002
    mesh.rotation.y += 0.003

    // Bob up and down gently (Sine wave)
    mesh.position.y += Math.sin(time + i) * 0.02
  })

  renderer.render(scene, camera)
}

// RESIZE HANDLER
const onWindowResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

// LIFECYCLE
onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', onWindowResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  if(renderer) renderer.dispose()
})
</script>

<template>
  <div class="relative w-full h-[700px] overflow-hidden flex items-center justify-center bg-white">
    
    <div ref="canvasContainer" class="absolute inset-0 z-0 pointer-events-none"></div>

    <div class="relative z-10 w-full max-w-5xl px-6 text-center">
      
      <div class="mb-6 inline-block">
        <span class="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100">
          The Problem Solving Ecosystem
        </span>
      </div>

      <h1 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
        Find the <span class="relative inline-block text-blue-600">
          solution
          <svg class="absolute w-full h-3 -bottom-1 left-0 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
          </svg>
        </span> 
        before you<br/>build the software.
      </h1>

      <p class="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
        OPS is the curated directory of the people, companies, and innovators solving the world's hardest challenges.
      </p>

      <div class="relative max-w-2xl mx-auto mb-10 shadow-2xl shadow-blue-900/10 rounded-2xl">
        <div class="flex items-center bg-white rounded-2xl border border-gray-200 overflow-hidden p-2 transition-all focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-400">
          
          <div class="pl-4 pr-3 text-gray-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search innovators, industries, or stacks..." 
            class="w-full h-12 text-gray-900 text-lg placeholder-gray-400 focus:outline-none bg-transparent"
          />

          <button @click="handleSearch" class="bg-gray-900 text-white h-12 px-8 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg">
            Find It
          </button>
        </div>
      </div>

      <div class="flex flex-wrap justify-center gap-3">
        <span class="text-sm font-medium text-gray-400 py-2">Popular:</span>
        <button 
          v-for="tag in quickTags" 
          :key="tag"
          class="px-5 py-2 rounded-lg bg-gray-50 text-gray-600 text-sm font-bold border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-white transition-all"
        >
          {{ tag }}
        </button>
      </div>

    </div>
  </div>
</template>