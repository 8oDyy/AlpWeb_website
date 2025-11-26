<script setup lang="ts">
/**
 * Hero Section - AlpWeb
 * - Fond avec montagnes SVG en couches (crème/noir)
 * - Logo + baseline + CTA
 * - Prêt pour animations GSAP (feat/scroll-animations)
 */
</script>

<template>
  <section
    id="hero"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
  >
    <!-- Mountain Layers Background -->
    <UiMountainLayers class="z-0" />

    <!-- Content -->
    <div class="container-alp relative z-10 text-center pt-20">
      <!-- Eyebrow -->
      <div class="mb-6">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-alp-black/5 text-alp-black-soft text-sm font-medium">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Disponible pour nouveaux projets
        </span>
      </div>

      <!-- Logo / Brand -->
      <div class="mb-6">
        <h1 class="text-7xl md:text-8xl lg:text-[10rem] font-bold font-display text-alp-black leading-none tracking-tight">
          AlpWeb
        </h1>
      </div>

      <!-- Baseline -->
      <p class="text-lg md:text-xl lg:text-2xl text-alp-black-muted font-medium tracking-widest uppercase mb-12">
        Web Agency • Apps • Hosting
      </p>

      <!-- Description -->
      <p class="text-lg md:text-xl text-alp-black-soft max-w-2xl mx-auto mb-12 leading-relaxed">
        Nous créons des expériences digitales premium pour les entreprises ambitieuses.
        Sites vitrines, applications iOS, plateformes sur-mesure.
      </p>

      <!-- CTA -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          size="xl"
          color="neutral"
          variant="solid"
          class="bg-alp-black text-cream hover:bg-alp-black/90 px-8 py-4 text-base font-semibold shadow-lg shadow-black/10"
        >
          <Icon
            name="lucide:message-circle"
            class="w-5 h-5 mr-2"
          />
          Parlons de votre projet
        </UButton>
        <UButton
          size="xl"
          variant="ghost"
          class="text-alp-black hover:bg-alp-black/5 px-8 py-4 text-base font-semibold"
        >
          Voir nos réalisations
          <Icon
            name="lucide:arrow-down"
            class="w-5 h-5 ml-2"
          />
        </UButton>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <a
        href="#showcase"
        class="flex flex-col items-center gap-2 text-alp-black-muted hover:text-alp-black transition-colors"
      >
        <span class="text-xs font-medium uppercase tracking-widest">Découvrir</span>
        <div class="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
          <div class="w-1.5 h-3 rounded-full bg-current animate-bounce" />
        </div>
      </a>
    </div>
  </section>
</template>
