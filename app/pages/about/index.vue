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
  scene.background = null // Transparent

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

  // Colors adapted for the dark container
  const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 })
  const materialInner = new THREE.LineBasicMaterial({ color: 0x00A9F4, transparent: true, opacity: 0.8 })

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
    opacity: 0.2
  })

  particles = new THREE.Points(particlesGeo, particlesMat)
  scene.add(particles)

  animate()
}

const animate = () => {
  animationId = requestAnimationFrame(animate)

  if (tesseract) {
    tesseract.rotation.x += 0.002
    tesseract.rotation.y += 0.002
  }

  if (particles) {
    particles.rotation.y -= 0.0005
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
  twitterCard: 'summary_large_image',
  ogUrl: 'https://orderlyproblemsolvers.com/about',
  canonical: 'https://orderlyproblemsolvers.com/about'
})

defineOgImageComponent('OpsTemplate', {
  title: 'The Curators of Order',
  description: 'We chronicle the Age of Solution.',
  type: 'General',
  badge: 'Manifesto'
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-[#051C2C] font-sans text-[#051C2C] dark:text-white transition-colors duration-500">

    <section class="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0A253A] pt-32 pb-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-12">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-black dark:border-white pt-8">
          
          <div class="lg:col-span-7">
             <span class="block text-xs font-bold tracking-[0.2em] uppercase mb-8 text-[#00A9F4]">
               The Manifesto
             </span>
             <h1 class="text-5xl md:text-7xl lg:text-8xl font-serif text-[#051C2C] dark:text-white tracking-tight leading-[0.9]">
               We chronicle <br/>
               the age of <br/>
               <span class="italic text-[#00A9F4]">solution.</span>
             </h1>
          </div>

          <div class="lg:col-span-5 flex flex-col justify-between border-l border-gray-300 dark:border-gray-600 pl-8 lg:pl-12 py-2">
             <p class="text-xl font-serif leading-relaxed text-[#051C2C] dark:text-gray-200 mb-8">
               In an industry saturated with hype and ephemeral trends, our mission is to distinguish genuine innovation from mere noise.
             </p>
             <div>
                <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6 font-light">
                  OPS started as a simple observation: for every problem we tried to solve, there was already a brilliant team somewhere in the world solving it. The problem wasn't a lack of innovation; it was a lack of <strong>Order</strong>.
                </p>
                <div class="flex items-center gap-4">
                   <div class="h-px w-8 bg-[#051C2C] dark:bg-white"></div>
                   <p class="text-xs font-bold uppercase tracking-widest text-[#051C2C] dark:text-white">Est. 2025</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>

    <section class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#051C2C]">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 border-x border-gray-200 dark:border-gray-800">

          <div v-for="pillar in pillars" :key="pillar.number" class="group relative p-12 hover:bg-[#051C2C] dark:hover:bg-white transition-colors duration-500 cursor-pointer min-h-[450px] flex flex-col justify-between">
            <div>
              <span class="block text-6xl font-serif font-black text-gray-200 dark:text-gray-800 mb-8 group-hover:text-white/20 dark:group-hover:text-[#051C2C]/20 transition-colors duration-300">
                {{ pillar.number }}
              </span>
              <h3 class="text-2xl font-bold tracking-tight mb-4 text-[#051C2C] dark:text-white group-hover:text-white dark:group-hover:text-[#051C2C] transition-colors">
                {{ pillar.title }}
              </h3>
              <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 dark:group-hover:text-gray-600 transition-colors">
                {{ pillar.desc }}
              </p>
            </div>

            <div class="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 group-hover:border-white/20 dark:group-hover:border-black/10 transition-colors">
              <NuxtLink :to="pillar.link" class="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-[#051C2C] dark:text-white group-hover:text-[#00A9F4] dark:group-hover:text-[#00A9F4] transition-colors">
                {{ pillar.label }} 
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </section>

    <section class="py-24 px-6 lg:px-12 bg-gray-50 dark:bg-[#0A253A] border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <div class="order-2 lg:order-1">
             <div class="inline-block px-3 py-1 border border-[#051C2C] dark:border-white rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 text-[#051C2C] dark:text-white">
               Internal Infrastructure
             </div>
             <h2 class="text-4xl md:text-6xl font-serif text-[#051C2C] dark:text-white tracking-tight mb-8 leading-[1]">
               We practice <br/>
               what we <span class="text-[#00A9F4]">preach.</span>
             </h2>
             <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-md border-l-2 border-[#00A9F4] pl-6">
               We don't just curate the ecosystem; we build the infrastructure. OPS Studio applies our philosophy of "Radical Order" to build scalable platforms for enterprise.
             </p>
             <NuxtLink to="/services" class="inline-flex items-center gap-2 px-8 py-4 bg-[#051C2C] dark:bg-white text-white dark:text-[#051C2C] font-bold text-xs uppercase tracking-widest hover:bg-[#00A9F4] dark:hover:bg-[#00A9F4] hover:text-white dark:hover:text-white transition-colors">
               View Capabilities
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="square" stroke-linejoin="miter" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
             </NuxtLink>
          </div>

          <div class="order-1 lg:order-2 relative w-full aspect-square bg-[#051C2C] border border-gray-800 overflow-hidden shadow-2xl">
            <div ref="canvasContainer" class="absolute inset-0 z-0 cursor-move"></div>
            
            <div class="absolute inset-0 z-10 pointer-events-none p-6 flex flex-col justify-between">
               <div class="flex justify-between items-start text-[10px] font-mono text-[#00A9F4]">
                  <div>
                    <p>VIEWPORT_01</p>
                    <p>FPS: 60</p>
                  </div>
                  <div class="text-right">
                    <p>X: 0.00</p>
                    <p>Y: 0.00</p>
                    <p>Z: 8.00</p>
                  </div>
               </div>
               
               <div class="flex justify-between items-end">
                  <div class="h-16 w-16 border-l border-b border-[#00A9F4]/50"></div>
                  <div class="text-[10px] font-mono text-white/50">OPS.ENGINE.CORE</div>
               </div>
            </div>
            
            <div class="absolute inset-0 z-0 opacity-10 pointer-events-none" style="background-image: linear-gradient(#00A9F4 1px, transparent 1px), linear-gradient(to right, #00A9F4 1px, transparent 1px); background-size: 40px 40px;"></div>
          </div>

        </div>
      </div>
    </section>

    <section class="py-24 px-6 lg:px-12 bg-white dark:bg-[#051C2C] border-b border-gray-200 dark:border-gray-800">
      <div class="max-w-7xl mx-auto">
        
        <div class="flex items-end justify-between mb-16 border-b border-black dark:border-gray-700 pb-4">
          <h2 class="text-3xl md:text-4xl font-serif text-[#051C2C] dark:text-white tracking-tight">The Board</h2>
          <p class="hidden sm:block text-xs font-bold uppercase tracking-widest text-gray-400">Curators of Order</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="member in team" :key="member.name" class="group">
            <div class="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 mb-6 border border-gray-200 dark:border-gray-800">
              <img 
                :src="member.image" 
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                :alt="member.name" 
              />
            </div>
            <div class="border-l-2 border-transparent group-hover:border-[#00A9F4] pl-3 transition-colors duration-300">
               <h3 class="text-lg font-serif font-bold text-[#051C2C] dark:text-white">{{ member.name }}</h3>
               <p class="text-xs font-mono font-medium text-gray-500 dark:text-gray-400 uppercase mt-1">{{ member.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 lg:px-12 bg-[#051C2C] dark:bg-black text-white text-center">
       <div class="max-w-4xl mx-auto">
          <p class="text-xs font-bold uppercase tracking-[0.2em] mb-8 text-[#00A9F4]">The Ecosystem is Waiting</p>
          <h2 class="text-5xl md:text-8xl font-serif mb-12 leading-none">
             Join the Order.
          </h2>
          <div class="flex flex-col sm:flex-row justify-center gap-6">
             <NuxtLink to="/submit-solution" class="px-10 py-4 bg-white text-[#051C2C] font-bold text-xs uppercase tracking-widest hover:bg-[#00A9F4] hover:text-white transition-colors">
               Submit Solution
             </NuxtLink>
             <NuxtLink to="/stories" class="px-10 py-4 border border-white/20 text-white font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-[#051C2C] transition-colors">
               Read Journal
             </NuxtLink>
          </div>
       </div>
    </section>

  </div>
</template>