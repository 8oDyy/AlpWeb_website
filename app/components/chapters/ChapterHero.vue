<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useHeroAnimations } from '~/composables/useHeroAnimations'

// Refs
const heroRef = ref<HTMLElement | null>(null)
const logoRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const eyebrowRef = ref<HTMLElement | null>(null)
const baselineRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)
// Mountains are handled by 3D scene now, but composable expects the ref
const mountainLayers = ref<HTMLElement[]>([])

// Animations
const { init: initAnimations, destroy: destroyAnimations } = useHeroAnimations()

let introCtx: gsap.Context | null = null

onMounted(() => {
  if (import.meta.server) return

  nextTick(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Initialize scroll animations
    initAnimations({
      heroRef,
      logoRef,
      contentRef,
      mountainLayers,
    })

    // Intro cascade animation
    introCtx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // 1. Eyebrow slide in + fade
      if (eyebrowRef.value) {
        gsap.set(eyebrowRef.value, { opacity: 0, y: 20 })
        tl.to(eyebrowRef.value, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      }

      // 2. Logo stroke animation (already set up in template)
      if (logoRef.value) {
        const logoText = logoRef.value.querySelector('.logo-text')
        if (logoText) {
          tl.to(logoText, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut',
          }, '-=0.4')

          // Fill in after stroke
          tl.to(logoText, {
            fill: '#1A1A1A',
            duration: 0.6,
            ease: 'power2.out',
          }, '-=0.3')
        }
      }

      // 3. Baseline fade + slide
      if (baselineRef.value) {
        gsap.set(baselineRef.value, { opacity: 0, y: 20 })
        tl.to(baselineRef.value, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.6')
      }

      // 4. CTA bounce in
      if (ctaRef.value) {
        gsap.set(ctaRef.value, { opacity: 0, y: 30, scale: 0.9 })
        tl.to(ctaRef.value, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }, '-=0.4')
      }
    }, heroRef.value || undefined)
  })
})

onUnmounted(() => {
  destroyAnimations()
  introCtx?.revert()
  introCtx = null
})
</script>

<template>
  <section
    id="hero"
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center pointer-events-none"
  >
    <!-- Subtle gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br from-cream via-cream-light to-cream-dark opacity-70 z-0" />
    <div class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#C4A77D]/15 z-0" />

    <!-- Floating particles background -->
    <UiHeroParticles />

    <!-- Content - Pointer events auto to interact with buttons -->
    <div
      ref="contentRef"
      class="container-alp relative z-10 text-center pt-20 pointer-events-auto"
    >
      <!-- Eyebrow -->
      <div
        ref="eyebrowRef"
        class="mb-6"
      >
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
            class="logo-text font-display font-bold text-8xl md:text-9xl tracking-tight"
            fill="transparent"
            stroke="#1A1A1A"
            stroke-width="2"
            stroke-dasharray="1000"
            stroke-dashoffset="1000"
          >
            AlpWeb
          </text>
        </svg>
      </div>

      <!-- Baseline -->
      <p
        ref="baselineRef"
        class="text-lg md:text-xl lg:text-2xl text-alp-black-muted font-medium tracking-widest uppercase mb-12 mix-blend-darken"
      >
        Web Agency • Apps • Hosting
      </p>

      <!-- CTA -->
      <div
        ref="ctaRef"
        class="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <UiAlpButton
          size="xl"
          variant="primary"
        >
          Parlons de votre projet
        </UiAlpButton>
      </div>
    </div>

    <!-- Mountain Overlay - only in Hero -->
    <UiMountainOverlay :opacity="0.15" />
  </section>
</template>
