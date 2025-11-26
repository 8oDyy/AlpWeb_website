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
  <div class="relative z-10">
    <!-- Chapitre 1 : L'Éveil -->
    <ChaptersChapterHero />

    <!-- Chapitre 2 : L'Exploration -->
    <ChaptersChapterShowcase />

    <!-- Chapitre 4 : La Révélation (Services) -->
    <ChaptersChapterServices />

    <!-- Chapitre 5 : La Méthode -->
    <ChaptersChapterProcess />

    <!-- Chapitre 5.5 : Stack (Peut être intégré ailleurs ou gardé) -->
    <ChaptersChapterStack />

    <!-- Chapitre 6 : L'Atterrissage -->
    <ChaptersChapterCta />
  </div>
</template>
