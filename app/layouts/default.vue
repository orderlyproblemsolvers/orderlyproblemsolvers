<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
    <AppHeader />

    <main class="grow">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
// No script needed here unless you have global layout logic
useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Orderly Problem Solvers',
  url: 'https://orderlyproblemsolvers.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://orderlyproblemsolvers.com/search?q={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}))
</script>