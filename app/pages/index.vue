<template>
   <div>
    <AppHeader/>
    <HeroSection class="bg-gray-50"/>
    <FeatureDrop/>
    <EcosystemGrid/>
    <SolversStream/>
    <OPSSection/>
    <SubmissionCTA/>
    <AppFooter/>
   </div>
</template>

<script setup>
defineOgImageComponent('OpsTemplate', {
  title: 'Orderly Problem Solvers',
  description: 'The definitive index of the problem-solving economy. Discover verified agencies, experts, and the technology driving emerging markets.',
  image: '/img/logo-sm.png', // Uses your brand logo as the central visual
  type: 'Company', // We use the 'Company' layout because it frames the logo beautifully
  badge: 'The Ecosystem' // Appears in the top right pill
})
</script>