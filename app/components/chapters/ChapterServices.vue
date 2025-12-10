<script setup lang="ts">
import { useServicesScrollytelling } from '~/composables/useServicesScrollytelling'

/**
 * Services Section - Premium Scrollytelling
 * - Lenis-driven narrative progression
 * - 5 scenes: intro + 4 service cards
 * - Scroll-synchronized animations
 */

interface Service {
  id: string
  icon: string
  title: string
  description: string
  features: string[]
}

const services: Service[] = [
  {
    id: 'sites-web',
    icon: 'lucide:layout',
    title: 'Sites Web',
    description: 'Sites vitrines premium, landing pages, blogs. Design sur-mesure et performances optimales.',
    features: ['Design responsive', 'SEO optimisé', 'CMS intégré', 'Analytics'],
  },
  {
    id: 'applications',
    icon: 'lucide:smartphone',
    title: 'Applications',
    description: 'Applications iOS/iPadOS natives et web apps progressives pour vos utilisateurs.',
    features: ['iOS natif', 'PWA', 'Notifications', 'Offline-first'],
  },
  {
    id: 'backend-api',
    icon: 'lucide:server',
    title: 'Backend & API',
    description: 'Architecture serveur robuste, APIs RESTful, intégrations tierces.',
    features: ['API REST', 'Base de données', 'Authentification', 'Webhooks'],
  },
  {
    id: 'hebergement',
    icon: 'lucide:cloud',
    title: 'Hébergement',
    description: 'Hébergement haute disponibilité, maintenance proactive, support technique.',
    features: ['SSL inclus', 'Backups auto', 'Monitoring 24/7', 'Support'],
  },
]

// Refs for scrollytelling
const containerRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const subtitleRef = ref<HTMLElement | null>(null)
const titleLineRef = ref<HTMLElement | null>(null)
const cardsWrapperRef = ref<HTMLElement | null>(null)
const cardRefs = ref<HTMLElement[]>([])
const iconRefs = ref<HTMLElement[]>([])
const cardContentRefs = ref<HTMLElement[]>([])

// Scrollytelling system
const { init, destroy, currentScene } = useServicesScrollytelling()

onMounted(() => {
  nextTick(() => {
    init({
      container: containerRef,
      header: headerRef,
      title: titleRef,
      subtitle: subtitleRef,
      titleLine: titleLineRef,
      cardsWrapper: cardsWrapperRef,
      cards: cardRefs,
      icons: iconRefs,
      cardContents: cardContentRefs,
    })
  })
})

onUnmounted(() => {
  destroy()
})
</script>

<template>
  <section
    id="services"
    ref="containerRef"
    class="services-scrollytelling bg-cream min-h-screen relative overflow-hidden"
  >
    <!-- Progress indicator (subtle) -->
    <div class="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
      <div
        v-for="(_, index) in services"
        :key="index"
        class="w-1.5 h-8 rounded-full transition-all duration-500"
        :class="currentScene >= index + 1 ? 'bg-alp-black' : 'bg-alp-black/20'"
      />
    </div>

    <div class="container-alp h-screen flex flex-col justify-center py-20">
      <!-- Section Header -->
      <div
        ref="headerRef"
        class="text-center mb-12"
      >
        <h2
          ref="titleRef"
          class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-4 opacity-0"
        >
          Nos services
        </h2>
        <!-- Title underline -->
        <div
          ref="titleLineRef"
          class="w-20 h-0.5 bg-alp-black/30 mx-auto mb-6 scale-x-0"
        />
        <p
          ref="subtitleRef"
          class="text-lg md:text-xl text-alp-black-muted max-w-2xl mx-auto opacity-0"
        >
          Une expertise complète pour donner vie à vos projets digitaux.
        </p>
      </div>

      <!-- Services Grid - Scrollytelling Cards -->
      <div
        ref="cardsWrapperRef"
        class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 flex-1 max-h-[60vh]"
      >
        <article
          v-for="(service, index) in services"
          :key="service.id"
          :ref="(el) => { if (el) cardRefs[index] = el as HTMLElement }"
          class="service-card relative bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 transition-shadow duration-500 opacity-0 translate-y-12"
        >
          <!-- Icon Container -->
          <div
            :ref="(el) => { if (el) iconRefs[index] = el as HTMLElement }"
            class="service-icon w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-5"
          >
            <Icon
              :name="service.icon"
              class="w-7 h-7 text-alp-black"
            />
          </div>

          <!-- Card Content -->
          <div :ref="(el) => { if (el) cardContentRefs[index] = el as HTMLElement }">
            <h3 class="text-xl lg:text-2xl font-semibold font-display text-alp-black mb-3 relative">
              {{ service.title }}
              <!-- Decorative underline for last card -->
              <span
                v-if="index === services.length - 1"
                class="card-underline absolute -bottom-1 left-0 w-12 h-0.5 bg-alp-black/20 origin-left scale-x-0"
              />
            </h3>
            <p class="text-alp-black-muted mb-5 text-sm lg:text-base leading-relaxed">
              {{ service.description }}
            </p>

            <!-- Features -->
            <ul class="space-y-2">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-center gap-2 text-alp-black-soft text-sm"
              >
                <Icon
                  name="lucide:check"
                  class="w-4 h-4 text-green-600 flex-shrink-0"
                />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <!-- Scroll hint -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span class="text-xs text-alp-black-muted uppercase tracking-widest">Scroll</span>
        <div class="w-5 h-8 rounded-full border-2 border-alp-black/30 flex justify-center pt-1">
          <div class="w-1 h-2 bg-alp-black/40 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  </section>
</template>
