<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { useColorMode } from '@vueuse/core'

// REFS
const canvasContainer = ref<HTMLElement | null>(null)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const colorMode = useColorMode()
const isCanvasReady = ref(false)

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
const PARTICLE_COUNT = 450 
const GLOBE_RADIUS = 24 // Slightly larger for grander scale
const CONNECTION_DISTANCE = 6.0

// THEME COLORS (McKinsey Palette)
// Dark: Deep Navy (#051C2C) background, Electric Cyan (0x00A9F4) nodes
// Light: Stark White background, Deep Navy (0x051C2C) nodes
const COLORS = {
  light: { bg: 0xffffff, particles: 0x051C2C, lines: 0xe2e8f0 }, 
  dark: { bg: 0x051C2C, particles: 0x00A9F4, lines: 0x1e3a8a } 
}

const updateTheme = () => {
  if (!scene || !particles || !lines) return
  const isDark = colorMode.value === 'dark'
  const theme = isDark ? COLORS.dark : COLORS.light

  scene.background = new THREE.Color(theme.bg)
  // Subtle fog for depth
  scene.fog = new THREE.FogExp2(theme.bg, 0.025) 
  
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
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 200) // Lower FOV for "cinematic" look
  camera.position.set(0, 0, 85)

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
    size: 0.3, // Smaller, finer particles for elegance
    transparent: true,
    opacity: 0.9,
  })
  particles = new THREE.Points(particleGeometry, particleMaterial)
  networkGroup.add(particles)

  // 4. CONNECTION LOGIC
  const lineGeometry = new THREE.BufferGeometry()
  const linePositions: number[] = []
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
    opacity: 0.4 // Very subtle lines
  })
  lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  networkGroup.add(lines)

  updateTheme()
  animate()
  
  setTimeout(() => {
    isCanvasReady.value = true
  }, 100)
}

// MOUSE & ANIMATION
let mouseX = 0, mouseY = 0, targetRotationX = 0, targetRotationY = 0

const onDocumentMouseMove = (event: MouseEvent) => {
  mouseX = (event.clientX - window.innerWidth / 2) * 0.0002 // Slower mouse reaction for "heavy" feel
  mouseY = (event.clientY - window.innerHeight / 2) * 0.0002
}

const animate = () => {
  animationFrameId = requestAnimationFrame(animate)
  if (networkGroup) {
    networkGroup.rotation.y += 0.0005 // Very slow, majestic rotation
    targetRotationX = mouseY * 0.3
    targetRotationY = mouseX * 0.3
    networkGroup.rotation.x += 0.02 * (targetRotationX - networkGroup.rotation.x)
    networkGroup.rotation.z += 0.02 * (targetRotationY - networkGroup.rotation.z)
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
  <div class="relative w-full min-h-[85vh] overflow-hidden flex flex-col justify-center items-center bg-white dark:bg-[#051C2C] transition-colors duration-700">
    
    <div 
      ref="canvasContainer" 
      class="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out mix-blend-screen dark:mix-blend-normal"
      :class="isCanvasReady ? 'opacity-100' : 'opacity-0'"
      aria-hidden="true"
    ></div>

    <div class="relative z-10 w-full max-w-6xl px-8 md:px-12 text-center">
      
      <div class="mb-8">
        <span class="inline-block border-b border-black dark:border-blue-400 pb-1 text-xs font-bold tracking-[0.2em] uppercase text-gray-900 dark:text-blue-400">
          The Problem Solving Ecosystem
        </span>
      </div>

      <h1 class="text-6xl md:text-8xl font-serif text-gray-900 dark:text-white tracking-tight mb-8 leading-[0.95]">
        Think bigger.<br />
        <span class="italic font-light text-[#00A9F4]">Build stronger.</span>
      </h1>

      <p class="text-xl md:text-2xl font-light text-gray-600 dark:text-gray-300 mb-14 max-w-3xl mx-auto leading-relaxed">
        The curated directory of verified agencies, experts, and tools solving real problems in emerging markets.
      </p>

      <div class="relative max-w-xl mx-auto mb-12">
        <form @submit.prevent="handleSearch" role="search" class="group flex items-center bg-transparent border-b-2 border-gray-300 dark:border-gray-600 focus-within:border-black dark:focus-within:border-[#00A9F4] transition-colors duration-300 pb-2">
          
          <input 
            id="search-input" 
            ref="searchInput" 
            v-model="searchQuery" 
            type="search" 
            placeholder="Search innovators, industries, or stacks..." 
            class="w-full text-2xl font-serif bg-transparent border-none focus:ring-0 p-0 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" 
          />
          
          <button type="submit" class="ml-4 text-black dark:text-[#00A9F4] hover:opacity-70 transition-opacity">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </form>
      </div>

      <div class="flex flex-wrap justify-center gap-6 items-center">
        <span class="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Trending:</span>
        <button 
          v-for="tag in quickTags" 
          :key="tag" 
          @click="searchQuery = tag; handleSearch()" 
          class="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-[#00A9F4] underline decoration-transparent hover:decoration-current underline-offset-4 transition-all"
        >
          {{ tag }}
        </button>
      </div>

    </div>
  </div>
</template>