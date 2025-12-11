<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

/**
 * Stack Section - Premium Double Infinite Slider
 * - Two rows moving in opposite directions
 * - Scroll direction controls slider direction
 * - Scroll speed boosts slider speed
 */

interface TechItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'mobile' | 'infra'
}

const technologies: TechItem[] = [
  { name: 'Nuxt', icon: 'logos:nuxt-icon', category: 'frontend' },
  { name: 'Vue.js', icon: 'logos:vue', category: 'frontend' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', category: 'frontend' },
  { name: 'Tailwind', icon: 'logos:tailwindcss-icon', category: 'frontend' },
  { name: 'Supabase', icon: 'logos:supabase-icon', category: 'backend' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', category: 'backend' },
  { name: 'Stripe', icon: 'logos:stripe', category: 'backend' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', category: 'backend' },
  { name: 'Swift', icon: 'logos:swift', category: 'mobile' },
  { name: 'SwiftUI', icon: 'logos:swift', category: 'mobile' },
  { name: 'Vercel', icon: 'logos:vercel-icon', category: 'infra' },
  { name: 'Docker', icon: 'logos:docker-icon', category: 'infra' },
  { name: 'GitHub', icon: 'logos:github-icon', category: 'infra' },
  { name: 'Cloudflare', icon: 'logos:cloudflare-icon', category: 'infra' },
]

// Split technologies into two rows
const row1Techs = technologies.slice(0, 7)
const row2Techs = technologies.slice(7)

// Duplicate for seamless loop (3x for safety)
const duplicatedRow1 = [...row1Techs, ...row1Techs, ...row1Techs]
const duplicatedRow2 = [...row2Techs, ...row2Techs, ...row2Techs]

// Refs
const sectionRef = ref<HTMLElement | null>(null)
const sliderRef = ref<HTMLElement | null>(null)
const track1Ref = ref<HTMLElement | null>(null)
const track2Ref = ref<HTMLElement | null>(null)

// State
const isPaused = ref(false)
const baseSpeed = 0.3 // pixels per frame (slower base)
const scrollDirection = ref(1) // 1 = down, -1 = up
const scrollBoost = ref(0) // Additional speed from scrolling
let xPos1 = 0
let xPos2 = 0
let animationId: number | null = null
let singleSetWidth1 = 0
let singleSetWidth2 = 0

// Lenis integration
const { $lenis } = useNuxtApp()
const lenis = $lenis as Lenis | undefined

interface LenisScrollData {
  velocity: number
  direction: number
}

onMounted(() => {
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    initSlider()
    initScrollSync()
    initRevealAnimation()
  })
})

function initSlider() {
  if (!track1Ref.value || !track2Ref.value) return

  // Calculate widths for row 1
  const cards1 = track1Ref.value.querySelectorAll('.tech-card')
  if (cards1.length > 0) {
    const cardWidth = (cards1[0] as HTMLElement).offsetWidth
    const gap = 24
    singleSetWidth1 = (cardWidth + gap) * row1Techs.length
  }

  // Calculate widths for row 2
  const cards2 = track2Ref.value.querySelectorAll('.tech-card')
  if (cards2.length > 0) {
    const cardWidth = (cards2[0] as HTMLElement).offsetWidth
    const gap = 24
    singleSetWidth2 = (cardWidth + gap) * row2Techs.length
  }

  // Start row 2 offset so it starts from a different position
  xPos2 = -singleSetWidth2

  // Start animation loop
  startAnimation()
}

function startAnimation() {
  const animate = () => {
    if (!track1Ref.value || !track2Ref.value) return

    // Calculate current speed
    const pauseMultiplier = isPaused.value ? 0.1 : 1
    const totalSpeed = (baseSpeed + scrollBoost.value) * pauseMultiplier

    // Row 1: moves based on scroll direction (default: left when scrolling down)
    const speed1 = totalSpeed * scrollDirection.value
    xPos1 -= speed1

    // Row 2: moves opposite to row 1 (crossing effect)
    const speed2 = totalSpeed * scrollDirection.value
    xPos2 += speed2

    // Reset positions for seamless loop - Row 1
    if (xPos1 <= -singleSetWidth1) {
      xPos1 += singleSetWidth1
    }
    else if (xPos1 >= 0) {
      xPos1 -= singleSetWidth1
    }

    // Reset positions for seamless loop - Row 2
    if (xPos2 >= 0) {
      xPos2 -= singleSetWidth2
    }
    else if (xPos2 <= -singleSetWidth2 * 2) {
      xPos2 += singleSetWidth2
    }

    // Apply transforms
    track1Ref.value.style.transform = `translateX(${xPos1}px)`
    track2Ref.value.style.transform = `translateX(${xPos2}px)`

    // Gradually reduce scroll boost
    scrollBoost.value = gsap.utils.interpolate(scrollBoost.value, 0, 0.02)

    animationId = requestAnimationFrame(animate)
  }

  animationId = requestAnimationFrame(animate)
}

function initScrollSync() {
  if (!lenis) return

  lenis.on('scroll', (data: LenisScrollData) => {
    const velocity = data.velocity

    // Set direction based on scroll direction
    if (velocity > 0.1) {
      scrollDirection.value = 1 // Scrolling down
    }
    else if (velocity < -0.1) {
      scrollDirection.value = -1 // Scrolling up
    }

    // Boost speed based on scroll velocity
    const absVelocity = Math.abs(velocity)
    if (absVelocity > 0.1) {
      scrollBoost.value = Math.min(absVelocity * 0.8, 3)
    }
  })
}

function initRevealAnimation() {
  if (!sectionRef.value) return

  const title = sectionRef.value.querySelector('h2')
  const subtitle = sectionRef.value.querySelector('p')
  const slider = sliderRef.value

  // Initial states
  if (title) gsap.set(title, { opacity: 0, y: 30 })
  if (subtitle) gsap.set(subtitle, { opacity: 0, y: 20 })
  if (slider) gsap.set(slider, { opacity: 0 })

  // Reveal on scroll
  ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline()

      if (title) {
        tl.to(title, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
      }
      if (subtitle) {
        tl.to(subtitle, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      }
      if (slider) {
        tl.to(slider, { opacity: 1, duration: 1, ease: 'power2.out' }, '-=0.3')
      }
    },
  })
}

function onCardEnter(event: MouseEvent) {
  isPaused.value = true

  const card = event.currentTarget as HTMLElement
  gsap.to(card, {
    scale: 1.04,
    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
    duration: 0.3,
    ease: 'power2.out',
  })

  const icon = card.querySelector('.tech-icon')
  if (icon) {
    gsap.to(icon, {
      scale: 1.1,
      duration: 0.3,
      ease: 'power2.out',
    })
  }
}

function onCardLeave(event: MouseEvent) {
  isPaused.value = false

  const card = event.currentTarget as HTMLElement
  gsap.to(card, {
    scale: 1,
    boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
    duration: 0.4,
    ease: 'power2.out',
  })

  const icon = card.querySelector('.tech-icon')
  if (icon) {
    gsap.to(icon, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
  }
}

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <section
    id="stack"
    ref="sectionRef"
    class="bg-cream py-24 lg:py-32 overflow-hidden"
  >
    <!-- Section Header -->
    <div class="container-alp text-center mb-16">
      <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-6">
        Notre stack
      </h2>
      <p class="text-lg text-alp-black-muted max-w-2xl mx-auto">
        Des technologies modernes et éprouvées pour des projets robustes et performants.
      </p>
    </div>

    <!-- Double Infinite Slider -->
    <div
      ref="sliderRef"
      class="relative w-full space-y-6"
    >
      <!-- Gradient masks for fade effect -->
      <div class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cream to-transparent z-10 pointer-events-none" />
      <div class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cream to-transparent z-10 pointer-events-none" />

      <!-- Row 1: moves left when scrolling down -->
      <div class="overflow-hidden">
        <div
          ref="track1Ref"
          class="flex gap-6 will-change-transform"
        >
          <div
            v-for="(tech, index) in duplicatedRow1"
            :key="`row1-${tech.name}-${index}`"
            class="tech-card flex-shrink-0 w-36 md:w-44 bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-shadow duration-300"
            style="box-shadow: 0 4px 20px rgba(0,0,0,0.03);"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          >
            <Icon
              :name="tech.icon"
              class="tech-icon w-12 h-12 md:w-14 md:h-14"
            />
            <span class="text-sm font-medium text-alp-black-soft text-center whitespace-nowrap">
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>

      <!-- Row 2: moves right when scrolling down (opposite) -->
      <div class="overflow-hidden">
        <div
          ref="track2Ref"
          class="flex gap-6 will-change-transform"
        >
          <div
            v-for="(tech, index) in duplicatedRow2"
            :key="`row2-${tech.name}-${index}`"
            class="tech-card flex-shrink-0 w-36 md:w-44 bg-white rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer transition-shadow duration-300"
            style="box-shadow: 0 4px 20px rgba(0,0,0,0.03);"
            @mouseenter="onCardEnter"
            @mouseleave="onCardLeave"
          >
            <Icon
              :name="tech.icon"
              class="tech-icon w-12 h-12 md:w-14 md:h-14"
            />
            <span class="text-sm font-medium text-alp-black-soft text-center whitespace-nowrap">
              {{ tech.name }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Trust Badge -->
    <div class="container-alp mt-16 text-center">
      <p class="text-alp-black-muted">
        Et bien d'autres selon vos besoins...
      </p>
    </div>
  </section>
</template>

<style scoped>
.tech-card {
  border: 1px solid rgba(0, 0, 0, 0.04);
}
</style>
