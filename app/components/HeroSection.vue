<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { useColorMode } from '@vueuse/core'

// REFS
const canvasContainer = ref<HTMLElement | null>(null)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const colorMode = useColorMode()
const isCanvasReady = ref(false) // ✅ NEW: Tracks if Three.js is ready

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
const PARTICLE_COUNT = 500 // ✅ OPTIMIZATION: Reduced slightly from 600 for faster init
const GLOBE_RADIUS = 22
const CONNECTION_DISTANCE = 5.5

// THEME COLORS
const COLORS = {
  light: { bg: 0xffffff, particles: 0x2563eb, lines: 0xe5e7eb },
  dark: { bg: 0x0f172a, particles: 0x60a5fa, lines: 0x1e293b }
}

const updateTheme = () => {
  if (!scene || !particles || !lines) return
  const isDark = colorMode.value === 'dark'
  const theme = isDark ? COLORS.dark : COLORS.light

  scene.background = new THREE.Color(theme.bg)
  scene.fog = new THREE.FogExp2(theme.bg, 0.02)
  ;(particles.material as THREE.PointsMaterial).color.setHex(theme.particles)
  ;(lines.material as THREE.LineBasicMaterial).color.setHex(theme.lines)
}

watch(colorMode, () => {
  updateTheme()
})

const initThreeJS = () => {
  if (!canvasContainer.value) return

  // 1. SCENE & CAMERA
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200)
  camera.position.set(0, 0, 70)

  // 2. RENDERER
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // 3. GEOMETRY GENERATION
  networkGroup = new THREE.Group()
  scene.add(networkGroup)

  const particleGeometry = new THREE.BufferGeometry()
  const positions: number[] = []
  const phi = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    const theta = phi * i
    positions.push(Math.cos(theta) * radius * GLOBE_RADIUS, y * GLOBE_RADIUS, Math.sin(theta) * radius * GLOBE_RADIUS)
  }
  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

  const particleMaterial = new THREE.PointsMaterial({
    color: COLORS.light.particles,
    size: 0.4,
    transparent: true,
    opacity: 1.2,
  })
  particles = new THREE.Points(particleGeometry, particleMaterial)
  networkGroup.add(particles)

  // 4. CONNECTION LOGIC (The Heavy Part)
  const lineGeometry = new THREE.BufferGeometry()
  const linePositions: number[] = []
  
  // Optimization: Pre-calculate square distance to avoid expensive Math.sqrt() inside loop
  const CONNECTION_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE 

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const i3 = i * 3
    const x1 = positions[i3], y1 = positions[i3 + 1], z1 = positions[i3 + 2]

    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const j3 = j * 3
      const dx = x1 - positions[j3]
      const dy = y1 - positions[j3 + 1]
      const dz = z1 - positions[j3 + 2]
      
      const distSq = dx*dx + dy*dy + dz*dz

      if (distSq < CONNECTION_DIST_SQ) {
        linePositions.push(x1, y1, z1, positions[j3], positions[j3+1], positions[j3+2])
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

  updateTheme()
  animate()
  
  // ✅ NEW: Signal that canvas is ready to fade in
  // Small timeout ensures the first frame is actually painted to the buffer
  setTimeout(() => {
    isCanvasReady.value = true
  }, 100)
}

// MOUSE & ANIMATION
let mouseX = 0, mouseY = 0, targetRotationX = 0, targetRotationY = 0

const onDocumentMouseMove = (event: MouseEvent) => {
  mouseX = (event.clientX - window.innerWidth / 2) * 0.0005
  mouseY = (event.clientY - window.innerHeight / 2) * 0.0005
}

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

const onWindowResize = () => {
  if (camera && renderer) {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}

// LIFECYCLE
onMounted(() => {
  window.addEventListener('resize', onWindowResize)
  document.addEventListener('mousemove', onDocumentMouseMove)

  // ✅ OPTIMIZATION: Defer Three.js init until after UI paint
  // This allows the HTML (Title, Search) to appear INSTANTLY.
  setTimeout(() => {
    requestAnimationFrame(initThreeJS)
  }, 50) 
})

onUnmounted(() => {
  window.removeEventListener('resize', onWindowResize)
  document.removeEventListener('mousemove', onDocumentMouseMove)
  if (animationFrameId) cancelAnimationFrame(animationFrameId)
  if (renderer) renderer.dispose()
})
</script>

<template>
  <div class="relative w-full py-4 overflow-hidden flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-500">
    
    <div 
      ref="canvasContainer" 
      class="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out"
      :class="isCanvasReady ? 'opacity-100' : 'opacity-0'"
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
          <svg class="absolute w-full h-3 -bottom-1 left-0 text-blue-200 dark:text-blue-900 opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" stroke-width="3" fill="none" />
          </svg>
        </span> 
      </h1>

      <p class="text-xl text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium transition-colors">
        The curated directory of verified agencies, experts, and tools solving real problems in emerging markets.
      </p>

      <div class="relative max-w-2xl mx-auto mb-10 shadow-2xl shadow-blue-900/10 dark:shadow-black/50 rounded-2xl">
        <form @submit.prevent="handleSearch" role="search" class="flex items-center bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden p-2 transition-all focus-within:ring-4 focus-within:ring-blue-50 dark:focus-within:ring-blue-900/30 focus-within:border-blue-400 dark:focus-within:border-blue-500">
          <div class="pl-4 pr-3 text-gray-400 dark:text-gray-500" aria-hidden="true">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <label for="search-input" class="sr-only">Search innovators, industries, or stacks</label>
          <input id="search-input" ref="searchInput" v-model="searchQuery" type="search" placeholder="Search innovators, industries, or stacks..." class="w-full h-12 text-gray-900 dark:text-white text-lg placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none bg-transparent" />
          <button type="submit" class="bg-gray-900 dark:bg-white text-white dark:text-black h-12 px-8 rounded-xl text-sm font-bold hover:bg-blue-600 dark:hover:bg-blue-300 transition-colors shadow-lg">Find It</button>
        </form>
      </div>

      <div class="flex flex-wrap justify-center gap-3 items-center">
        <span class="text-sm font-medium text-gray-400 dark:text-gray-500 py-2">Popular:</span>
        <button v-for="tag in quickTags" :key="tag" @click="searchQuery = tag; handleSearch()" class="px-5 py-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-sm font-bold border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-900 transition-all">
          {{ tag }}
        </button>
      </div>

    </div>
  </div>
</template>