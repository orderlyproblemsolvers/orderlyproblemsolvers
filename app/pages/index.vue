<template>
   <div>
    <AppHeader/>
    <LazyHeroSection/>
    <FeatureDrop/>
    <EcosystemGrid/>
    <SolversStream/>
    <OPSSection/>
    <SubmissionCTA/>
    <AppFooter/>
   </div>
</template>

<script setup>
useSeoMeta({
  title: 'Orderly Problem Solvers - The Ecosystem Index',
  description: 'The definitive directory of verified agencies, experts, and technology driving emerging markets. Find the solution before you build the software.',
  
  // Open Graph (Facebook, LinkedIn, WhatsApp)
  ogTitle: 'Orderly Problem Solvers',
  ogDescription: 'Discover the people and teams solving the world\'s hardest challenges.',
  ogImage: '/img/logo.png', // Fallback to logo if dynamic image fails
  ogUrl: 'https://orderlyproblemsolvers.com',
  ogType: 'website',

  // Twitter
  twitterCard: 'summary_large_image',
  twitterTitle: 'Orderly Problem Solvers',
  twitterDescription: 'The definitive index of the problem-solving economy.',
  twitterImage: '/img/logo.png',
})

definePageMeta({
  title: 'Orderly Problem Solvers - The Ecosystem Index',
  description: 'The definitive directory of verified agencies, experts, and technology driving emerging markets. Find the solution before you build the software.',
})

defineOgImageComponent('OpsTemplate', {
  title: 'Orderly Problem Solvers',
  description: 'The definitive index of the problem-solving economy. Discover verified agencies, experts, and the technology driving emerging markets.',
  image: '/img/logo-sm.png', // Uses your brand logo as the central visual
  type: 'Company', // We use the 'Company' layout because it frames the logo beautifully
  badge: 'The Ecosystem' // Appears in the top right pill
})

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