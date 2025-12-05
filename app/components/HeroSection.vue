<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { useColorMode } from '@vueuse/core' // Or useNuxtApp() if using @nuxtjs/color-mode

// REFS
const canvasContainer = ref<HTMLElement | null>(null)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const colorMode = useColorMode() // Detects 'dark' or 'light' class on html

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
let animationFrameId: number

// QUICK TAGS
const quickTags = ['FinTech', 'Health', 'Logistics', 'Education']

// CONFIG
const PARTICLE_COUNT = 600
const GLOBE_RADIUS = 22
const CONNECTION_DISTANCE = 5

// THEME COLORS
const COLORS = {
  light: { bg: 0xffffff, particles: 0x2563eb, lines: 0xe5e7eb },
  dark: { bg: 0x0f172a, particles: 0x60a5fa, lines: 0x1e293b } // Slate-900, Blue-400, Slate-800
}

// UPDATE SCENE COLORS
const updateTheme = () => {
  if (!scene || !particles || !lines) return
  const isDark = colorMode.value === 'dark'
  const theme = isDark ? COLORS.dark : COLORS.light

  scene.background = new THREE.Color(theme.bg)
  scene.fog = new THREE.FogExp2(theme.bg, 0.02)
  
  // Update Materials
  ;(particles.material as THREE.PointsMaterial).color.setHex(theme.particles)
  ;(lines.material as THREE.LineBasicMaterial).color.setHex(theme.lines)
}

// WATCH FOR THEME CHANGES
watch(colorMode, () => {
  updateTheme()
})

// INIT THREE.JS
const initThreeJS = () => {
  if (!canvasContainer.value) return

  // 1. SCENE
  scene = new THREE.Scene()
  
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

  // A. Generate Points (Fibonacci Sphere Algorithm)
  const particleGeometry = new THREE.BufferGeometry()
  const positions = []
  const phi = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * i

    const x = Math.cos(theta) * radius
    const z = Math.sin(theta) * radius

    positions.push(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS)
  }

  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  // B. Create Particles Material
  const particleMaterial = new THREE.PointsMaterial({
    color: COLORS.light.particles, // Initial color, updated by theme
    size: 0.4,
    transparent: true,
    opacity: 1.2,
  })
  
  particles = new THREE.Points(particleGeometry, particleMaterial)
  networkGroup.add(particles)

  // C. Create Connections
  const lineGeometry = new THREE.BufferGeometry()
  const linePositions = []
  
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x1 = positions[i * 3]
    const y1 = positions[i * 3 + 1]
    const z1 = positions[i * 3 + 2]

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
    color: COLORS.light.lines,
    transparent: true,
    opacity: 1.0
  })

  lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  networkGroup.add(lines)

  // Apply initial theme correcty
  updateTheme()

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
  animationFrameId = requestAnimationFrame(animate)

  if (networkGroup) {
    networkGroup.rotation.y += 0.001

    targetRotationX = mouseY * 0.5
    targetRotationY = mouseX * 0.5

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
  
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<template>
  <div class="relative w-full h-[700px] overflow-hidden flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-500">
    
    <div 
      ref="canvasContainer" 
      class="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
      aria-hidden="true"
    ></div>

    <div class="relative z-10 w-full max-w-5xl px-6 text-center">
      
      <div class="mb-6 inline-block">
        <span class="bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-blue-100 dark:border-slate-700 transition-colors">
          The Problem Solving Ecosystem
        </span>
      </div>

      <h1 class="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight transition-colors">
        Explore the minds and teams shaping the <span class="relative inline-block text-blue-600 dark:text-blue-400">
          future
          <svg 
            class="absolute w-full h-3 -bottom-1 left-0 text-blue-200 dark:text-blue-900 opacity-50" 
            viewBox="0 0 100 10" 
            preserveAspectRatio="none"
            aria-hidden="true"
          >
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
          </svg>
        </span> 
      </h1>

      <p class="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium transition-colors">
        The curated directory of verified agencies, experts, and tools solving real problems in emerging markets.
      </p>

      <div class="relative max-w-2xl mx-auto mb-10 shadow-2xl shadow-blue-900/10 dark:shadow-black/50 rounded-2xl">
        <form 
          @submit.prevent="handleSearch"
          role="search"
          class="flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden p-2 transition-all focus-within:ring-4 focus-within:ring-blue-50 dark:focus-within:ring-blue-900/30 focus-within:border-blue-400 dark:focus-within:border-blue-500"
        >
          
          <div class="pl-4 pr-3 text-gray-400 dark:text-gray-500" aria-hidden="true">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          <label for="search-input" class="sr-only">Search innovators, industries, or stacks</label>
          <input 
            id="search-input"
            ref="searchInput"
            v-model="searchQuery"
            type="search" 
            placeholder="Search innovators, industries, or stacks..." 
            aria-label="Search innovators, industries, or stacks"
            class="w-full h-12 text-gray-900 dark:text-white text-lg placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none bg-transparent"
          />

          <button 
            type="submit"
            class="bg-gray-900 dark:bg-white text-white dark:text-black h-12 px-8 rounded-xl text-sm font-bold hover:bg-blue-600 dark:hover:bg-blue-300 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900"
            aria-label="Submit search"
          >
            Find It
          </button>
        </form>
      </div>

      <div class="flex flex-wrap justify-center gap-3 items-center">
        <span class="text-sm font-medium text-gray-400 dark:text-gray-500 py-2">Popular:</span>
        <button 
          v-for="tag in quickTags" 
          :key="tag"
          @click="searchQuery = tag; handleSearch()"
          :aria-label="`Search for ${tag}`"
          class="px-5 py-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-sm font-bold border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          {{ tag }}
        </button>
      </div>

    </div>
  </div>
</template>