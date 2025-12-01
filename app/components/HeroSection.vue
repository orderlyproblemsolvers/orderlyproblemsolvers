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
let networkGroup: THREE.Group
let particles: THREE.Points
let lines: THREE.LineSegments

// QUICK TAGS
const quickTags = ['FinTech', 'Health', 'Logistics', 'Education']

// CONFIG
const PARTICLE_COUNT = 600
const GLOBE_RADIUS = 22
const CONNECTION_DISTANCE = 5

// INIT THREE.JS
const initThreeJS = () => {
  if (!canvasContainer.value) return

  // 1. SCENE
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)
  // Subtle fog to fade out the back of the globe
  scene.fog = new THREE.FogExp2(0xffffff, 0.02)

  // 2. CAMERA
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 0, 70)

  // 3. RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // 4. CREATE THE NETWORK GLOBE
  networkGroup = new THREE.Group()
  scene.add(networkGroup)

  // A. Generate Points (Fibonacci Sphere Algorithm for even distribution)
  const particleGeometry = new THREE.BufferGeometry()
  const positions = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * i

    const x = Math.cos(theta) * radius
    const z = Math.sin(theta) * radius

    positions.push(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS)
  }

  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  // B. Create Particles Material (The "Solvers")
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00000, // Brand Blue
    size: 0.4,
    transparent: true,
    opacity: 1.2,
  })
  
  particles = new THREE.Points(particleGeometry, particleMaterial)
  networkGroup.add(particles)

  // C. Create Connections (The "Order")
  // We verify distances between points to draw lines
  const lineGeometry = new THREE.BufferGeometry()
  const linePositions = []
  
  // Simple n^2 check (fine for < 1000 particles)
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x1 = positions[i * 3]
    const y1 = positions[i * 3 + 1]
    const z1 = positions[i * 3 + 2]

    // Check next few particles to find neighbors (Fibonacci spiral locality helps here)
    // We limit the inner loop to optimize performance
    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const x2 = positions[j * 3]
      const y2 = positions[j * 3 + 1]
      const z2 = positions[j * 3 + 2]

      const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2)

      if (dist < CONNECTION_DISTANCE) {
        linePositions.push(x1, y1, z1)
        linePositions.push(x2, y2, z2)
      }
    }
  }

  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))

  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xe5e7eb, // Very light gray (Tailwind gray-200)
    transparent: true,
    opacity: 1.0
  })

  lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  networkGroup.add(lines)

  animate()
}

// MOUSE INTERACTION
let mouseX = 0
let mouseY = 0
let targetRotationX = 0
let targetRotationY = 0

const onDocumentMouseMove = (event: MouseEvent) => {
  mouseX = (event.clientX - window.innerWidth / 2) * 0.0005
  mouseY = (event.clientY - window.innerHeight / 2) * 0.0005
}

// ANIMATION LOOP
const animate = () => {
  requestAnimationFrame(animate)

  if (networkGroup) {
    // Constant slow rotation (The world turning)
    networkGroup.rotation.y += 0.001

    // Mouse Interaction (Tilt)
    targetRotationX = mouseY * 0.5
    targetRotationY = mouseX * 0.5

    // Smooth easing
    networkGroup.rotation.x += 0.05 * (targetRotationX - networkGroup.rotation.x)
    networkGroup.rotation.z += 0.05 * (targetRotationY - networkGroup.rotation.z)
  }

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
  document.addEventListener('mousemove', onDocumentMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  document.removeEventListener('mousemove', onDocumentMouseMove)
  if(renderer) renderer.dispose()
})
</script>

<template>
  <div class="relative w-full h-[700px] overflow-hidden flex items-center justify-center bg-white">
    
    <!-- 3D BACKGROUND LAYER -->
    <div ref="canvasContainer" class="absolute inset-0 z-0 pointer-events-none"></div>

    <!-- CONTENT LAYER -->
    <div class="relative z-10 w-full max-w-5xl px-6 text-center">
      
      <!-- TAGLINE -->
      <div class="mb-6 inline-block">
        <span class="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100">
          The Problem Solving Ecosystem
        </span>
      </div>

      <!-- MAIN HEADLINE -->
      <h1 class="text-5xl md:text-7xl font-black text-gray-900 tracking-tight mb-6 leading-tight">
        Explore the minds and teams shaping the <span class="relative inline-block text-blue-600">
          future
          <!-- Hand-drawn style underline decoration -->
          <svg class="absolute w-full h-3 -bottom-1 left-0 text-blue-200" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
          </svg>
        </span> 
      </h1>

      <!-- SUBHEAD -->
      <p class="text-xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
        The curated directory of verified agencies, experts, and tools solving real problems in emerging markets.
      </p>

      <!-- MODERN SEARCH BAR (Apple Style) -->
      <div class="relative max-w-2xl mx-auto mb-10 shadow-2xl shadow-blue-900/10 rounded-2xl">
        <div class="flex items-center bg-white rounded-2xl border border-gray-200 overflow-hidden p-2 transition-all focus-within:ring-4 focus-within:ring-blue-50 focus-within:border-blue-400">
          
          <!-- Search Icon -->
          <div class="pl-4 pr-3 text-gray-400">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <!-- Input -->
          <input 
            v-model="searchQuery"
            @keydown.enter="handleSearch"
            type="text" 
            placeholder="Search innovators, industries, or stacks..." 
            class="w-full h-12 text-gray-900 text-lg placeholder-gray-400 focus:outline-none bg-transparent"
          />

          <!-- Action Button -->
          <button @click="handleSearch" class="bg-gray-900 text-white h-12 px-8 rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors shadow-lg">
            Find It
          </button>
        </div>
      </div>

      <!-- POPULAR CATEGORIES -->
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