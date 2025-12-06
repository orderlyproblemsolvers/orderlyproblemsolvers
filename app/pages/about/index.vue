<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// TEAM DATA
const team = [
  { name: 'Inikori Efe', role: 'CEO & Founder', image: '/img/efe.png' },
  { name: 'Anita Olaleye', role: 'Head of Research & Curation', image: '/img/anita.jpg' },
  { name: 'Antony Idiata', role: 'Technical Director', image: '/img/anton.jpg' },
  { name: 'Marvella Nwaka', role: 'Design Lead', image: '/img/marvella.jpg' }
]

// TRINITY DATA
const pillars = [
  {
    number: '01',
    title: 'The Directory',
    desc: 'The raw data. A verified index of the companies, people, and stacks solving real problems.',
    link: '/discover',
    label: 'Browse Data'
  },
  {
    number: '02',
    title: 'The Journal',
    desc: 'The context. Deep-dive editorial that explains the "Why" and "How" behind the solutions.',
    link: '/stories',
    label: 'Read Stories'
  },
  {
    number: '03',
    title: 'The Studio',
    desc: 'The craft. Our in-house design & engineering arm building infrastructure for the future.',
    link: '/services',
    label: 'Hire OPS'
  }
]

// THREE.JS LOGIC
const canvasContainer = ref<HTMLElement | null>(null)
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let tesseract: THREE.Group
let particles: THREE.Points
let animationId: number

const initThreeJS = () => {
  if (!canvasContainer.value) return

  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight

  // Scene
  scene = new THREE.Scene()
  scene.background = null

  // Camera
  camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100)
  camera.position.z = 8

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  canvasContainer.value.appendChild(renderer.domElement)

  // Tesseract Group
  tesseract = new THREE.Group()
  scene.add(tesseract)

  const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
  const materialInner = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.8 })

  // Outer Cube
  const geometry1 = new THREE.BoxGeometry(3, 3, 3)
  const edges1 = new THREE.EdgesGeometry(geometry1)
  const line1 = new THREE.LineSegments(edges1, material)
  tesseract.add(line1)

  // Inner Cube
  const geometry2 = new THREE.BoxGeometry(1.5, 1.5, 1.5)
  const edges2 = new THREE.EdgesGeometry(geometry2)
  const line2 = new THREE.LineSegments(edges2, materialInner)
  tesseract.add(line2)

  // Connecting Lines
  const vertices = [
    new THREE.Vector3(1.5, 1.5, 1.5), new THREE.Vector3(0.75, 0.75, 0.75),
    new THREE.Vector3(-1.5, 1.5, 1.5), new THREE.Vector3(-0.75, 0.75, 0.75),
    new THREE.Vector3(1.5, -1.5, 1.5), new THREE.Vector3(0.75, -0.75, 0.75),
    new THREE.Vector3(-1.5, -1.5, 1.5), new THREE.Vector3(-0.75, -0.75, 0.75),
    new THREE.Vector3(1.5, 1.5, -1.5), new THREE.Vector3(0.75, 0.75, -0.75),
    new THREE.Vector3(-1.5, 1.5, -1.5), new THREE.Vector3(-0.75, 0.75, -0.75),
    new THREE.Vector3(1.5, -1.5, -1.5), new THREE.Vector3(0.75, -0.75, -0.75),
    new THREE.Vector3(-1.5, -1.5, -1.5), new THREE.Vector3(-0.75, -0.75, -0.75),
  ]
  const connectorGeo = new THREE.BufferGeometry().setFromPoints(vertices)
  const connectorLines = new THREE.LineSegments(connectorGeo, material)
  tesseract.add(connectorLines)

  // Particles
  const particlesGeo = new THREE.BufferGeometry()
  const count = 400
  const posArray = new Float32Array(count * 3)

  for(let i = 0; i < count * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 15
  }

  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
  const particlesMat = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xffffff,
    transparent: true,
    opacity: 0.4
  })

  particles = new THREE.Points(particlesGeo, particlesMat)
  scene.add(particles)

  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (tesseract) {
    tesseract.rotation.x += 0.005
    tesseract.rotation.y += 0.005
  }

  if (particles) {
    particles.rotation.y -= 0.001
  }

  renderer.render(scene, camera)
}

const onResize = () => {
  if (!canvasContainer.value || !camera || !renderer) return
  const width = canvasContainer.value.clientWidth
  const height = canvasContainer.value.clientHeight
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setSize(width, height)
}

onMounted(() => {
  initThreeJS()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  cancelAnimationFrame(animationId)
  if (renderer && canvasContainer.value) {
    canvasContainer.value.removeChild(renderer.domElement)
    renderer.dispose()
  }
})

useSeoMeta({
  title: 'About Us - The Curators of Order',
  description: 'We are chronicling the Age of Solution. OPS is a media platform and directory filtering the signal from the noise in the tech ecosystem.',
  ogTitle: 'About Orderly Problem Solvers',
  ogDescription: 'Meet the editorial board and engineering team behind the definitive index of problem solvers.',
  ogImage: '/img/logo-sm.png',
  twitterCard: 'summary_large_image'
})

defineOgImageComponent('OpsTemplate', {
  title: 'The Curators of Order',
  description: 'We chronicle the Age of Solution.',
  type: 'General',
  badge: 'Manifesto'
})
</script>

<template>
    
    <AppHeader/>
  <div class="min-h-screen bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">

    <section class="pt-20 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-900 dark:border-gray-700 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <span class="block text-xs font-bold tracking-[0.2em] uppercase mb-6 sm:mb-8 text-gray-900 dark:text-gray-100">The Manifesto</span>

        <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.85] mb-12 sm:mb-16 text-gray-900 dark:text-white">
          WE CHRONICLE <br class="hidden sm:inline"/>
          THE AGE OF <br class="hidden sm:inline"/>
          <span class="bg-linear-to-b from-gray-500 to-gray-900 dark:from-gray-400 dark:to-gray-100 bg-clip-text text-transparent">SOLUTION.</span>
        </h1>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 border-t border-gray-200 dark:border-gray-800 pt-8 sm:pt-12 transition-colors duration-300">
          <div class="lg:col-span-5">
            <p class="text-lg sm:text-xl md:text-2xl font-serif leading-relaxed text-gray-800 dark:text-gray-200">
              The tech world is drowning in noise. Vaporware, buzzwords, and wrappers. We exist to find the signal.
            </p>
          </div>
          <div class="lg:col-span-7 flex flex-col justify-between gap-6 sm:gap-8">
            <p class="text-gray-500 dark:text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl">
              OPS started as a simple observation: for every problem we tried to solve, there was already a brilliant team somewhere in the world solving it. The problem wasn't a lack of innovation; it was a lack of <strong>Order</strong>.
            </p>
            <p class="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-gray-300">Est. 2025 — Abuja / Global</p>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-gray-900 dark:border-gray-700 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-900 dark:divide-gray-700 transition-colors duration-300">

          <div v-for="pillar in pillars" :key="pillar.number" class="group relative p-6 sm:p-8 lg:p-12 flex flex-col justify-between min-h-80 sm:min-h-[400px] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer">
            <div>
              <span class="block text-5xl sm:text-6xl font-black text-gray-200 dark:text-gray-800 mb-6 sm:mb-8 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-500">{{ pillar.number }}</span>
              <h3 class="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4 text-gray-900 dark:text-white">{{ pillar.title }}</h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">{{ pillar.desc }}</p>
            </div>

            <div class="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100 dark:border-gray-800 group-hover:border-gray-900 dark:group-hover:border-gray-100 transition-colors">
              <NuxtLink :to="pillar.link" class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white group-hover:translate-x-2 transition-transform">
                {{ pillar.label }} &rarr;
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="bg-black text-white py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

          <div>
            <div class="inline-block px-3 py-1.5 border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 sm:mb-8">
              OPS Studio
            </div>
            <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 sm:mb-8 leading-tight">
              WE PRACTICE <br/>
              WHAT WE <br/>
              PREACH.
            </h2>
            <p class="text-gray-400 text-base sm:text-lg leading-relaxed mb-8 sm:mb-10 max-w-md">
              We don't just curate the ecosystem; we build the infrastructure. OPS Studio applies our philosophy of "Radical Order" to build scalable platforms for enterprise and government clients.
            </p>
            <NuxtLink to="/services" class="inline-block bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors">
              View Capabilities
            </NuxtLink>
          </div>

          <div class="relative w-full aspect-square lg:aspect-4/5 border border-white/20 rounded-lg overflow-hidden bg-black/50">

            <div ref="canvasContainer" class="absolute inset-0 z-0"></div>

            <div class="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 pointer-events-none z-10">
              <div class="text-xs font-mono text-gray-500">
                <p>ARCHITECTURE_V1.0</p>
                <p>STATUS: ONLINE</p>
                <p class="animate-pulse text-blue-500">>> RENDERING</p>
              </div>

              <div class="text-right">
                <p class="text-4xl sm:text-6xl font-black text-white/10">BUILD</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section class="py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div class="max-w-7xl mx-auto">
        <div class="mb-12 sm:mb-16 border-b border-gray-900 dark:border-gray-700 pb-4 sm:pb-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter uppercase text-gray-900 dark:text-white">The Editorial Board</h2>
          <p class="hidden sm:block text-xs font-bold uppercase tracking-widest whitespace-nowrap text-gray-900 dark:text-gray-300">Curators of Order</p>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div v-for="member in team" :key="member.name" class="group">
            <div class="aspect-3/4 overflow-hidden bg-gray-100 dark:bg-gray-800 mb-3 sm:mb-4 grayscale group-hover:grayscale-0 transition-all duration-500">
              <img :src="member.image" class="w-full h-full object-cover" alt="Team Member" />
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-bold uppercase tracking-tight text-gray-900 dark:text-white">{{ member.name }}</h3>
            <p class="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 text-center bg-white dark:bg-slate-950 transition-colors duration-300">
      <p class="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-bold uppercase tracking-widest mb-4 sm:mb-6">The Ecosystem is waiting</p>
      <h2 class="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 sm:mb-12 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-default text-gray-900 dark:text-white">
        JOIN THE<br/>
        ORDER.
      </h2>
      <div class="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
        <NuxtLink to="/submit-solution" class="px-6 sm:px-10 py-3 sm:py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-blue-600 dark:hover:bg-gray-200 transition-colors">
          Submit Solution
        </NuxtLink>
        <NuxtLink to="/stories" class="px-6 sm:px-10 py-3 sm:py-4 border border-gray-200 dark:border-gray-700 font-bold text-xs sm:text-sm uppercase tracking-widest hover:border-black dark:hover:border-white text-gray-900 dark:text-white transition-colors">
          Read The Journal
        </NuxtLink>
      </div>
    </section>

  </div>
  <AppFooter/>
</template>