<script setup lang="ts">
/**
 * Default Layout
 * - Header fixe avec navigation
 * - Footer complet
 * - Design system AlpWeb (crème/noir)
 */
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <LayoutTheHeader />

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <LayoutTheFooter />
  </div>
</template>
