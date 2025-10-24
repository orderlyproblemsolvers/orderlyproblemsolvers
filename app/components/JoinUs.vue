<template>
  <section class="w-full py-16 md:py-24 px-4 sm:px-8 bg-slate-950 relative overflow-hidden">
    <!-- Three.js Globe Container -->
    <div 
      ref="globeContainer" 
      class="absolute inset-0 opacity-30 md:opacity-20"
      :class="{ 'md:left-0 md:right-1/2': true }"
    ></div>

    <!-- Gradient Overlay for better text readability -->
    <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/90 md:from-slate-950/60 md:via-transparent md:to-slate-950/95"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        
        <!-- Left Content -->
        <div class="text-center md:text-left">
          <div class="inline-block mb-4 md:mb-6">
            <span class="px-4 py-2 bg-yellow-400 text-black font-ibm-plex-mono font-bold text-xs rounded-full">
              PARTNER WITH US
            </span>
          </div>

          <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 md:mb-6 leading-tight">
            Join Our Team of <span class="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-300">Problem Solvers</span>
          </h2>

          <p class="text-base md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed">
            At Orderly Problem Solvers, we bring together brilliant minds from all fields of technology. Whether you're a designer, developer, marketer, or data scientist—if you're passionate about creating solutions that matter, we want to hear from you.
          </p>

          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3 text-gray-300">
              <span class="text-yellow-400 font-bold text-xl mt-1">✓</span>
              <span class="text-sm md:text-base">Remote-first culture with flexible hours</span>
            </div>
            <div class="flex items-start gap-3 text-gray-300">
              <span class="text-yellow-400 font-bold text-xl mt-1">✓</span>
              <span class="text-sm md:text-base">Work on cutting-edge projects with global impact</span>
            </div>
            <div class="flex items-start gap-3 text-gray-300">
              <span class="text-yellow-400 font-bold text-xl mt-1">✓</span>
              <span class="text-sm md:text-base">Continuous learning and growth opportunities</span>
            </div>
          </div>
        </div>

        <!-- Right Form -->
        <div class="relative">
          <!-- Form Card -->
          <div class="bg-slate-900 rounded-2xl p-6 md:p-8 border border-gray-800 shadow-2xl backdrop-blur-sm">
            <h3 class="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
              Start Your Journey
            </h3>
            <p class="text-gray-400 font-ibm-plex-mono text-sm mb-6">
              Fill out the form below and let's talk
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Name Input -->
              <div class="relative">
                <label for="name" class="block text-sm font-ibm-plex-mono font-bold text-gray-200 mb-2">
                  Full Name <span class="text-yellow-400">*</span>
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  placeholder="John Doe"
                  class="w-full px-4 py-3 bg-slate-950 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors duration-300"
                />
              </div>

              <!-- Email Input -->
              <div class="relative">
                <label for="email" class="block text-sm font-ibm-plex-mono font-bold text-gray-200 mb-2">
                  Email Address <span class="text-yellow-400">*</span>
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  class="w-full px-4 py-3 bg-slate-950 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors duration-300"
                />
              </div>

              <!-- Profession Input -->
              <div class="relative">
                <label for="profession" class="block text-sm font-ibm-plex-mono font-bold text-gray-200 mb-2">
                  Your Profession <span class="text-yellow-400">*</span>
                </label>
                <input
                  id="profession"
                  v-model="formData.profession"
                  type="text"
                  required
                  placeholder="e.g. Frontend Developer, UX Designer"
                  class="w-full px-4 py-3 bg-slate-950 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors duration-300"
                />
              </div>

              <!-- Message Textarea -->
              <div class="relative">
                <label for="message" class="block text-sm font-ibm-plex-mono font-bold text-gray-200 mb-2">
                  Tell Us About Yourself
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="4"
                  placeholder="Share your experience, skills, or why you want to join us..."
                  class="w-full px-4 py-3 bg-slate-950 border-2 border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-colors duration-300 resize-none"
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting || submitted"
                class="group relative w-full px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-heading font-bold rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
              >
                <span class="relative z-10 flex items-center justify-center gap-2">
                  {{ submitted ? 'Application Sent! ✓' : isSubmitting ? 'Sending...' : 'Submit Application' }}
                  <span v-if="!submitted && !isSubmitting" class="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
                
                <!-- Animated background -->
                <div class="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <!-- Success Message -->
              <transition name="fade">
                <div v-if="submitted" class="text-center text-green-400 font-ibm-plex-mono text-sm">
                  Thanks for applying! We'll be in touch soon.
                </div>
              </transition>
            </form>
          </div>

          <!-- Decorative Elements -->
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div class="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" style="animation-delay: 1s;"></div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const globeContainer = ref(null)
const formData = ref({
  name: '',
  email: '',
  profession: '',
  message: ''
})
const isSubmitting = ref(false)
const submitted = ref(false)

let scene, camera, renderer, particles, animationId

onMounted(() => {
  if (!globeContainer.value) return

  // Scene setup
  scene = new THREE.Scene()
  
  const width = globeContainer.value.clientWidth
  const height = globeContainer.value.clientHeight
  
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 300

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(window.devicePixelRatio)
  globeContainer.value.appendChild(renderer.domElement)

  // Create particle globe
  const geometry = new THREE.BufferGeometry()
  const particleCount = 3000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  const radius = 120
  
  for (let i = 0; i < particleCount * 3; i += 3) {
    // Sphere distribution using spherical coordinates
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos((Math.random() * 2) - 1)
    
    const x = radius * Math.sin(phi) * Math.cos(theta)
    const y = radius * Math.sin(phi) * Math.sin(theta)
    const z = radius * Math.cos(phi)
    
    positions[i] = x
    positions[i + 1] = y
    positions[i + 2] = z

    // Color gradient from yellow to cyan
    const colorMix = Math.random()
    colors[i] = 0.96 * colorMix + 0.02 * (1 - colorMix)     // R
    colors[i + 1] = 0.62 * colorMix + 0.71 * (1 - colorMix) // G
    colors[i + 2] = 0.04 * colorMix + 0.83 * (1 - colorMix) // B
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  // Create particle material
  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // Add connecting lines
  const lineGeometry = new THREE.BufferGeometry()
  const linePositions = []
  
  for (let i = 0; i < 500; i++) {
    const idx1 = Math.floor(Math.random() * particleCount) * 3
    const idx2 = Math.floor(Math.random() * particleCount) * 3
    
    linePositions.push(
      positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
      positions[idx2], positions[idx2 + 1], positions[idx2 + 2]
    )
  }
  
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
  
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.15
  })
  
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
  scene.add(lines)

  // Animation loop
  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    particles.rotation.y += 0.001
    particles.rotation.x += 0.0005
    lines.rotation.y += 0.001
    lines.rotation.x += 0.0005
    
    renderer.render(scene, camera)
  }
  
  animate()

  // Handle resize
  const handleResize = () => {
    if (!globeContainer.value) return
    
    const width = globeContainer.value.clientWidth
    const height = globeContainer.value.clientHeight
    
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }
  
  window.addEventListener('resize', handleResize)
  
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  
  if (renderer) {
    renderer.dispose()
  }
  
  if (globeContainer.value && renderer) {
    globeContainer.value.removeChild(renderer.domElement)
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  isSubmitting.value = false
  submitted.value = true
  
  // Reset form after 3 seconds
  setTimeout(() => {
    formData.value = {
      name: '',
      email: '',
      profession: '',
      message: ''
    }
    submitted.value = false
  }, 3000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@700;800;900&display=swap');

.font-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  letter-spacing: -0.03em;
}

.font-ibm-plex-mono {
  font-family: 'IBM Plex Mono', monospace;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
  }
}

.animate-pulse {
  animation: pulse 3s ease-in-out infinite;
}
</style>