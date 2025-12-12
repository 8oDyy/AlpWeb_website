<script setup lang="ts">
/**
 * Default Layout
 * - Header fixe avec navigation
 * - Footer complet
 * - Design system AlpWeb (crème/noir)
 */
</script>

<template>
  <div class="min-h-screen flex flex-col bg-transparent">
    <!-- Skip to content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-alp-black focus:text-cream focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-cream"
    >
      Aller au contenu principal
    </a>

    <!-- Header -->
    <LayoutTheHeader />

    <!-- Main content -->
    <main
      id="main-content"
      class="flex-1"
      role="main"
    >
      <slot />
    </main>

    <!-- Footer -->
    <LayoutTheFooter />
  </div>
</template>
