<script setup lang="ts">
import { gsap } from 'gsap'

// Refs
const heroRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (import.meta.server) return
  
  // Intro Animation Simple
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  
  if (logoRef.value) {
    const logoText = logoRef.value.querySelector('.logo-text')
    if (logoText) {
      gsap.set(logoText, { strokeDasharray: 1000, strokeDashoffset: 1000, fill: 'transparent' })
      tl.to(logoText, { strokeDashoffset: 0, duration: 1.5 })
        .to(logoText, { fill: '#1A1A1A', duration: 1 }, '-=0.5')
    }
  }
  
  if (contentRef.value) {
    tl.from(contentRef.value.children, {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1
    }, '-=1')
  }
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center pointer-events-none"
  >
    <!-- Content - Pointer events auto to interact with buttons -->
    <div
      ref="contentRef"
      class="container-alp relative z-10 text-center pt-20 pointer-events-auto"
    >
      <!-- Eyebrow -->
      <div class="mb-6">
        <span class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream/50 backdrop-blur-sm border border-black/5 text-alp-black-soft text-sm font-medium">
          <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Disponible pour nouveaux projets
        </span>
      </div>

      <!-- Logo / Brand -->
      <div
        ref="logoRef"
        class="mb-6 relative"
      >
        <svg
          viewBox="0 0 600 150"
          class="w-full max-w-[600px] mx-auto h-auto overflow-visible"
        >
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            class="logo-text font-display font-bold text-8xl md:text-9xl tracking-tight fill-transparent stroke-alp-black stroke-2"
          >
            AlpWeb
          </text>
        </svg>
      </div>

      <!-- Baseline -->
      <p class="text-lg md:text-xl lg:text-2xl text-alp-black-muted font-medium tracking-widest uppercase mb-12 mix-blend-darken">
        Web Agency • Apps • Hosting
      </p>

      <!-- CTA -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <UButton
          size="xl"
          color="neutral"
          variant="solid"
          class="bg-alp-black text-cream hover:scale-105 transition-transform duration-300 shadow-2xl"
        >
          Parlons de votre projet
        </UButton>
      </div>
    </div>
  </section>
</template>
