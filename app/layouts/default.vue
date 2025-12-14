<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
    <AppHeader />

    <main class="grow">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// No script needed here unless you have global layout logic
</script>