<template>
  <section
    class="relative w-full h-[80dvh] md:h-screen lg:h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black"
  >
    <div class="absolute inset-0">
      <canvas ref="canvasContainer" class="absolute top-0 left-0 w-full h-full"></canvas>

      <div class="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse"></div>
      <div 
        class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-8 text-center">
      <h1
        class="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 font-heading bg-gradient-to-r from-yellow-300 via-yellow-100 to-blue-300 bg-clip-text text-transparent p-4"
      >
        Custom Software Solutions For Your Business
      </h1>

      <p
        class="text-base sm:text-lg md:text-xl text-gray-300 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed font-ibm-plex-mono"
      >
        We create cutting-edge digital solutions that empower startups, and small
        to enterprise companies to achieve their business goals.
      </p>

      <button
        class="px-7 py-3 sm:px-8 sm:py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl font-ibm-plex-mono text-base sm:text-lg"
      >
        Start Your Journey
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvasContainer = ref(null)

let renderer
let scene
let camera
let gridHelper
let clock
let animationFrameId

const getGridValue = (screenWidth) => {
  let GridVal;
  
  switch (true) {
    case screenWidth < 640:
      GridVal = 43; // Mobile
      break;
    case screenWidth < 1024:
      GridVal = 30; // Tablet
      break;
    case screenWidth < 1280:
      GridVal = 30; // Small desktop
      break;
    default:
      GridVal = 30; // Large desktop
  }
  
  return GridVal;
}

onMounted(() => {
  const screenWidth = window.innerWidth;
  const GridVal = getGridValue(screenWidth);
  if (canvasContainer.value) {
    // 1. Basic Setup
    scene = new THREE.Scene()
    clock = new THREE.Clock()

    // 2. Camera
    const sizes = {
      width: canvasContainer.value.clientWidth,
      height: canvasContainer.value.clientHeight,
    }
    camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0, 0, 15) // Position camera to look at the grid
    scene.add(camera)

    // 3. Grid
    const gridColor = new THREE.Color('#60a5fa') // Blue from your gradient
    const centerColor = new THREE.Color('#facc15') // Yellow from your gradient
    
    // Create a large grid
    gridHelper = new THREE.GridHelper(100, GridVal, centerColor, gridColor)
    
    // Rotate the grid to be flat (like a wall) instead of a floor
    gridHelper.rotation.x = Math.PI / 2 

    // **Set material to be transparent for opacity animation**
    gridHelper.material.transparent = true
    gridHelper.material.opacity = 0.05 // Initial opacity
    scene.add(gridHelper)

    // 4. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvasContainer.value,
      alpha: true, // Transparent background
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // 5. Resize Listener
    const handleResize = () => {
      // Update sizes
      sizes.width = canvasContainer.value.clientWidth
      sizes.height = canvasContainer.value.clientHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    // 6. Animation Loop
    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      // **Here is the pulsing opacity animation**
      // Math.sin() creates a wave between -1 and 1.
      // We add 1 to make it 0 to 2, then divide by 2 to get 0 to 1.
      // This gives a smooth pulse from a min to max opacity.
      const pulse = (Math.sin(elapsedTime * 0.7) + 1) / 2
      gridHelper.material.opacity = 0.02 + pulse * 0.04 // Pulses between 0.15 and 0.65

      // Render the scene
      renderer.render(scene, camera)

      // Continue the loop
      animationFrameId = window.requestAnimationFrame(animate)
    }

    animate()

    // 7. Cleanup
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      window.cancelAnimationFrame(animationFrameId)
      if (renderer) {
        renderer.dispose()
      }
      if (gridHelper) {
        gridHelper.geometry.dispose()
        gridHelper.material.dispose()
      }
    })
  }
})
</script>

<style scoped>
/* Your existing styles are preserved */
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@700;800;900&display=swap');

.font-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.font-ibm-plex-mono {
  font-family: 'IBM Plex Mono', monospace;
}

/* Ensure canvas is properly positioned */
canvas {
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>