<script setup lang="ts">
import { useShowcaseScroller } from '~/composables/useShowcaseScroller'

/**
 * Showcase Section - Scrollytelling horizontal
 * - 3 slides : Site vitrine | App iOS | Dashboard
 * - Scroll horizontal contrôlé par ScrollTrigger
 * - Animations : fade, scale, rotation 3D, stagger tags
 */

interface ShowcaseItem {
  id: string
  title: string
  subtitle: string
  description: string
  stack: string[]
  icon: string
  gradient: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'site-vitrine',
    title: 'Sites vitrines',
    subtitle: 'Premium & Performants',
    description: 'Des sites web élégants qui convertissent vos visiteurs en clients. Design sur-mesure, SEO optimisé, performances maximales.',
    stack: ['Nuxt', 'Vue', 'Tailwind', 'Vercel'],
    icon: 'lucide:globe',
    gradient: 'from-blue-500/10 to-purple-500/10',
  },
  {
    id: 'app-ios',
    title: 'Apps iOS',
    subtitle: 'Natives & Fluides',
    description: 'Des applications natives pensées pour l\'écosystème Apple. Interface fluide, expérience utilisateur premium.',
    stack: ['SwiftUI', 'Swift', 'CloudKit', 'TestFlight'],
    icon: 'lucide:smartphone',
    gradient: 'from-orange-500/10 to-red-500/10',
  },
  {
    id: 'dashboard',
    title: 'Plateformes',
    subtitle: 'Sur-mesure & Scalables',
    description: 'Des outils métier sur-mesure pour piloter votre activité. Tableaux de bord, gestion de données, automatisations.',
    stack: ['Nuxt', 'Supabase', 'PostgreSQL', 'Stripe'],
    icon: 'lucide:layout-dashboard',
    gradient: 'from-green-500/10 to-teal-500/10',
  },
]

// Refs
const wrapperRef = ref<HTMLElement | null>(null)
const containerRef = ref<HTMLElement | null>(null)
const slidesRef = ref<HTMLElement[]>([])

// Animations
const { init: initScroller, destroy: destroyScroller } = useShowcaseScroller()

function setSlidesRef(el: HTMLElement | null, index: number) {
  if (el) slidesRef.value[index] = el
}

onMounted(() => {
  nextTick(() => {
    initScroller({
      wrapperRef,
      containerRef,
      slidesRef,
    })
  })
})

onUnmounted(() => {
  destroyScroller()
})
</script>

<template>
  <section
    id="showcase"
    ref="wrapperRef"
    class="bg-cream-dark overflow-hidden"
  >
    <!-- Section Header (fixed during scroll) -->
    <div class="container-alp pt-24 pb-12">
      <div class="text-center">
        <h2
          data-slide-content
          class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-6"
        >
          Ce qu'on construit pour vous
        </h2>
        <p
          data-slide-content
          class="text-lg text-alp-black-muted max-w-2xl mx-auto"
        >
          Des solutions digitales sur-mesure, pensées pour votre réussite.
        </p>
      </div>
    </div>

    <!-- Horizontal Scroll Container -->
    <div
      ref="containerRef"
      class="flex gap-8 px-8 pb-24 will-change-transform"
    >
      <!-- Spacer for initial centering -->
      <div class="shrink-0 w-[10vw]" />

      <!-- Slides -->
      <article
        v-for="(item, index) in showcaseItems"
        :key="item.id"
        :ref="(el) => setSlidesRef(el as HTMLElement, index)"
        class="showcase-slide shrink-0 w-[80vw] md:w-[60vw] lg:w-[50vw] perspective-1000"
      >
        <div class="card-premium p-8 md:p-12 h-full flex flex-col">
          <!-- Icon + Gradient Background -->
          <div
            :class="['w-20 h-20 rounded-2xl bg-linear-to-br flex items-center justify-center mb-8', item.gradient]"
          >
            <Icon
              :name="item.icon"
              class="w-10 h-10 text-alp-black"
            />
          </div>

          <!-- Content -->
          <div class="flex-1">
            <p
              data-slide-content
              class="text-sm font-medium text-alp-black-muted uppercase tracking-widest mb-2"
            >
              {{ item.subtitle }}
            </p>
            <h3
              data-slide-content
              class="text-3xl md:text-4xl font-bold font-display text-alp-black mb-6"
            >
              {{ item.title }}
            </h3>
            <p
              data-slide-content
              class="text-lg text-alp-black-soft leading-relaxed mb-8"
            >
              {{ item.description }}
            </p>
          </div>

          <!-- Stack Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in item.stack"
              :key="tech"
              data-tag
              class="px-4 py-2 text-sm font-medium bg-cream-dark rounded-full text-alp-black-soft"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </article>

      <!-- Spacer for end -->
      <div class="shrink-0 w-[10vw]" />
    </div>
  </section>
</template>

<style scoped>
.showcase-slide {
  transform-style: preserve-3d;
}

.perspective-1000 {
  perspective: 1000px;
}
</style>
