<script setup lang="ts">
// Access the color mode state (provided by @nuxtjs/color-mode or @vueuse/nuxt)
const colorMode = useColorMode()

// Dynamically switch the indicator color based on the theme
// #000f00 = Dark/Black (for Light Mode)
// #60a5fa = Light Blue (for Dark Mode)
const indicatorColor = computed(() => {
  return colorMode.value === 'dark' ? '#60a5fa' : '#000f00'
})
</script>

<template>
  <div>
    <!-- The color prop is now bound to our computed property -->
    <NuxtLoadingIndicator :color="indicatorColor" :height="4" />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>