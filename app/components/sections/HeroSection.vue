<script setup lang="ts">
/**
 * Hero Section
 * - Fond avec montagnes en couches (crème/noir)
 * - Logo + baseline + CTA
 * - Animations à ajouter dans feat/hero-section
 */
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden bg-cream"
  >
    <!-- Mountain Layers Background (placeholder - will be SVG/canvas) -->
    <div class="absolute inset-0 pointer-events-none">
      <!-- Layer 4 - Furthest -->
      <div
        class="absolute bottom-0 left-0 right-0 h-[40%]"
        style="background: var(--color-mountain-4);"
      />
      <!-- Layer 3 -->
      <div
        class="absolute bottom-0 left-0 right-0 h-[35%]"
        style="background: var(--color-mountain-3);"
      />
      <!-- Layer 2 -->
      <div
        class="absolute bottom-0 left-0 right-0 h-[28%]"
        style="background: var(--color-mountain-2);"
      />
      <!-- Layer 1 - Closest -->
      <div
        class="absolute bottom-0 left-0 right-0 h-[20%]"
        style="background: var(--color-mountain-1);"
      />
    </div>

    <!-- Content -->
    <div class="container-alp relative z-10 text-center">
      <!-- Logo / Brand -->
      <div class="mb-8">
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-bold font-display text-alp-black">
          AlpWeb
        </h1>
      </div>

      <!-- Baseline -->
      <p class="text-lg md:text-xl text-alp-black-muted font-medium tracking-wide mb-12">
        Web Agency • Apps • Hosting
      </p>

      <!-- CTA -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          size="xl"
          color="neutral"
          variant="solid"
          class="bg-alp-black text-cream hover:bg-alp-black/90 px-8"
        >
          Parlons de votre projet
        </UButton>
        <UButton
          size="xl"
          variant="outline"
          class="border-alp-black text-alp-black hover:bg-alp-black/5 px-8"
        >
          Voir nos réalisations
        </UButton>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <div class="flex flex-col items-center gap-2 text-alp-black-muted">
        <span class="text-sm font-medium">Scroll</span>
        <Icon
          name="lucide:chevron-down"
          class="w-5 h-5 animate-bounce"
        />
      </div>
    </div>
  </section>
</template>
