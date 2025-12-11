<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Showcase Section - Pinned section with card transitions
 * - Section pinnée pendant le scroll
 * - Les cartes se remplacent une par une avec une timeline
 * - Changement d'ambiance à chaque transition
 */

interface ShowcaseItem {
  id: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  icon: string
  bgColor: string
  accentColor: string
  textColor: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'site-vitrine',
    title: 'Sites vitrines',
    subtitle: 'Premium & Performants',
    description: 'Des sites web élégants qui convertissent vos visiteurs en clients. Design sur-mesure, SEO optimisé, performances maximales.',
    stack: ['Nuxt', 'Vue', 'Tailwind', 'Vercel'],
    icon: 'lucide:globe',
    bgColor: '#E8E4DC',
    accentColor: '#7C8B9A',
    textColor: '#2D2D2D',
  },
  {
    id: 'app-ios',
    title: 'Apps iOS',
    subtitle: 'Natives & Fluides',
    description: 'Des applications natives pensées pour l\'écosystème Apple. Interface fluide, expérience utilisateur premium.',
    stack: ['SwiftUI', 'Swift', 'CloudKit', 'TestFlight'],
    icon: 'lucide:smartphone',
    bgColor: '#F5F0E8',
    accentColor: '#C4A77D',
    textColor: '#1A1A1A',
  },
  {
    id: 'dashboard',
    title: 'Plateformes',
    subtitle: 'Sur-mesure & Scalables',
    description: 'Des outils métier sur-mesure pour piloter votre activité. Tableaux de bord, gestion de données, automatisations.',
    stack: ['Nuxt', 'Supabase', 'PostgreSQL', 'Stripe'],
    icon: 'lucide:layout-dashboard',
    bgColor: '#DED8CE',
    accentColor: '#8B9A7C',
    textColor: '#2D2D2D',
  },
]

// Refs
const sectionRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement[]>([])

// Current active card index
const activeIndex = ref(0)

let ctx: gsap.Context | null = null

function setCardRef(el: HTMLElement | null, index: number) {
  if (el) cardsRef.value[index] = el
}

onMounted(() => {
  if (import.meta.server) return

  // Small delay to ensure Hero section is rendered first
  setTimeout(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Refresh ScrollTrigger to recalculate positions
    ScrollTrigger.refresh()

    if (!sectionRef.value) return

    ctx = gsap.context(() => {
      const cards = cardsRef.value
      const totalCards = cards.length

      // Hide all cards except first
      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, { autoAlpha: 0, y: 60 })
        }
      })

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top top',
          end: () => `+=${window.innerHeight * (totalCards + 0.5)}`,
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            // Update active index based on progress
            const newIndex = Math.min(
              Math.floor(self.progress * totalCards),
              totalCards - 1,
            )
            if (newIndex !== activeIndex.value) {
              activeIndex.value = newIndex
            }
          },
        },
      })

      // Add card transitions to timeline
      cards.forEach((card, index) => {
        if (index === 0) return // First card is already visible

        const prevCard = cards[index - 1]
        if (!prevCard) return

        // Fade out previous card
        tl.to(prevCard, {
          autoAlpha: 0,
          y: -40,
          scale: 0.95,
          duration: 0.4,
          ease: 'power2.in',
        }, index - 0.4)

        // Fade in current card
        tl.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        }, index - 0.2)

        // Hold on this card
        tl.to({}, { duration: 0.6 })
      })
    }, sectionRef.value)
  }, 100) // 100ms delay
})

onUnmounted(() => {
  ctx?.revert()
  ctx = null
})

// Computed styles based on active card - always returns a valid item
const currentItem = computed((): ShowcaseItem => {
  const item = showcaseItems[activeIndex.value]
  return item !== undefined ? item : showcaseItems[0]!
})
</script>

<template>
  <section
    id="showcase"
    ref="sectionRef"
    class="relative h-screen w-full overflow-hidden transition-colors duration-700"
    :style="{
      backgroundColor: currentItem.bgColor,
      color: currentItem.textColor,
    }"
  >
    <!-- Accent glow (reactive to active card) -->
    <div
      class="absolute inset-0 opacity-30 pointer-events-none transition-all duration-700"
      :style="{
        background: `radial-gradient(circle at 30% 50%, ${currentItem.accentColor}40 0%, transparent 50%)`,
      }"
    />

    <!-- Progress indicator -->
    <div class="absolute top-8 right-8 flex flex-col gap-2 z-20">
      <div
        v-for="(item, index) in showcaseItems"
        :key="item.id"
        class="w-2 h-8 rounded-full transition-all duration-300"
        :style="{
          backgroundColor: index === activeIndex ? currentItem.accentColor : `${currentItem.textColor}20`,
        }"
      />
    </div>

    <!-- Stacked Cards Container -->
    <div class="absolute inset-0 flex items-center justify-center">
      <article
        v-for="(item, index) in showcaseItems"
        :key="item.id"
        :ref="(el) => setCardRef(el as HTMLElement, index)"
        class="showcase-card absolute inset-0 flex items-center justify-center"
      >
        <!-- Content -->
        <div class="card-content container-alp relative z-10 max-w-4xl mx-auto px-8">
          <!-- Number indicator -->
          <div
            class="text-[12rem] md:text-[16rem] font-bold font-display absolute -top-20 -left-8 opacity-[0.03] select-none pointer-events-none"
            :style="{ color: item.accentColor }"
          >
            0{{ index + 1 }}
          </div>

          <!-- Icon -->
          <div
            class="w-20 h-20 rounded-2xl flex items-center justify-center mb-8"
            :style="{ backgroundColor: `${item.accentColor}20` }"
          >
            <Icon
              :name="item.icon"
              class="w-10 h-10"
              :style="{ color: item.accentColor }"
            />
          </div>

          <!-- Text -->
          <p class="text-sm font-medium uppercase tracking-widest mb-4 opacity-60">
            {{ item.subtitle }}
          </p>
          <h3 class="text-5xl md:text-6xl lg:text-7xl font-bold font-display mb-8">
            {{ item.title }}
          </h3>
          <p class="text-xl md:text-2xl leading-relaxed opacity-80 max-w-2xl mb-12">
            {{ item.description }}
          </p>

          <!-- Stack Tags -->
          <div class="flex flex-wrap gap-3">
            <span
              v-for="tech in item.stack"
              :key="tech"
              class="tech-tag px-5 py-2.5 text-sm font-medium rounded-full border"
              :style="{
                borderColor: `${item.accentColor}40`,
                backgroundColor: `${item.accentColor}10`,
              }"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- Scroll hint -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-20">
      <span class="text-xs uppercase tracking-widest">Scroll pour explorer</span>
      <div class="w-px h-8 bg-current animate-pulse" />
    </div>
  </section>
</template>

<style scoped>
.showcase-card {
  transform: translateZ(0);
}
</style>
