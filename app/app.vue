<script setup lang="ts">
// Access the color mode state (provided by @nuxtjs/color-mode or @vueuse/nuxt)
const colorMode = useColorMode()
colorMode.preference = 'dark'

// Dynamically switch the indicator color based on the theme
// #000f00 = Dark/Black (for Light Mode)
// #60a5fa = Light Blue (for Dark Mode)
// const indicatorColor = computed(() => {
//   return colorMode.value === 'dark' ? '#60a5fa' : '#000f00'
// })
</script>

<template>
  <UApp>
    <!-- The color prop is now bound to our computed property -->
    <NuxtLoadingIndicator color="#60a5fa" :height="4" />
    
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>