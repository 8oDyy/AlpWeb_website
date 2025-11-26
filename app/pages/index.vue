<script setup lang="ts">
/**
 * Homepage - AlpWeb
 * Structure complète sans animations (à ajouter dans feat/scroll-animations)
 */

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'AlpWeb - Agence Web Premium',
  description: 'AlpWeb, agence web spécialisée dans la création de sites vitrines haut de gamme, applications iOS et plateformes sur-mesure.',
  ogTitle: 'AlpWeb - Agence Web Premium',
  ogDescription: 'Création de sites vitrines premium, applications iOS et dashboards sur-mesure.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <div>
    <!-- Hero -->
    <SectionsHeroSection />

    <!-- Showcase / Scrollytelling -->
    <SectionsShowcaseSection />

    <!-- Services -->
    <SectionsServicesSection />

    <!-- Process -->
    <SectionsProcessSection />

    <!-- Stack -->
    <SectionsStackSection />

    <!-- CTA -->
    <SectionsCtaSection />
  </div>
</template>
