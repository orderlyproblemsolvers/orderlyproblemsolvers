```vue
<template>
  <div class="default-layout overflow-x-hidden">
    <AppHeader class="sticky z-50" />

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1a1a;
}

.main-content {
  flex-grow: 1;
  width: 100%;
}
</style>