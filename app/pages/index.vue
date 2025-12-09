<script setup lang="ts">
/**
 * Homepage - AlpWeb
 * Expérience Immersive "L'Ascension Digitale"
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
  <div class="relative">
    <!-- Chapitre 1 : L'Éveil - transparent to show 3D canvas behind -->
    <div class="relative z-0">
      <ChaptersChapterHero />
    </div>

    <!-- Chapitre 2 : L'Exploration (z-20) - Passe par dessus le Hero -->
    <div class="relative z-20">
      <ChaptersChapterShowcase />
    </div>

    <!-- Chapitre 3 : La Révélation (z-30) -->
    <div class="relative z-30">
      <ChaptersChapterServices />
    </div>

    <!-- Chapitre 4 : La Méthode (z-40) -->
    <div class="relative z-40">
      <ChaptersChapterProcess />
    </div>

    <!-- Chapitre 5 : Stack (z-50) -->
    <div class="relative z-50">
      <ChaptersChapterStack />
    </div>

    <!-- Chapitre 6 : L'Atterrissage (z-60) -->
    <div class="relative z-60">
      <ChaptersChapterCta />
    </div>
  </div>
</template>
