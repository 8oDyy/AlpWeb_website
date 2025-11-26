<script setup lang="ts">
import { useSectionReveal } from '~/composables/useSectionReveal'
import { useMicroInteractions } from '~/composables/useMicroInteractions'

/**
 * Services Section
 * - Cartes crème/noir avec reveal animation
 * - Hover effects premium
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

// Refs
const sectionRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

// Animations
const { revealText, revealCards, destroy: destroyReveal } = useSectionReveal()
const { initCardHover, destroy: destroyMicro } = useMicroInteractions()

onMounted(() => {
  nextTick(() => {
    // Reveal animations
    if (sectionRef.value) {
      revealText(sectionRef)
    }
    if (gridRef.value) {
      revealCards(gridRef)
      // Hover effects
      const cards = gridRef.value.querySelectorAll('.service-card')
      initCardHover(cards)
    }
  })
})

onUnmounted(() => {
  destroyReveal()
  destroyMicro()
})
</script>

<template>
  <section
    id="services"
    ref="sectionRef"
    class="bg-cream section-padding"
  >
    <div class="container-alp">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-6">
          Nos services
        </h2>
        <p class="text-lg text-alp-black-muted max-w-2xl mx-auto">
          Une expertise complète pour donner vie à vos projets digitaux.
        </p>
      </div>

      <!-- Services Grid -->
      <div
        ref="gridRef"
        class="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <article
          v-for="service in services"
          :key="service.id"
          class="service-card card-premium p-8 cursor-pointer"
        >
          <!-- Icon -->
          <div class="w-14 h-14 rounded-2xl bg-cream-dark flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
            <Icon
              :name="service.icon"
              class="w-7 h-7 text-alp-black"
            />
          </div>

          <!-- Content -->
          <h3 class="text-2xl font-semibold font-display text-alp-black mb-4">
            {{ service.title }}
          </h3>
          <p class="text-alp-black-muted mb-6">
            {{ service.description }}
          </p>

          <!-- Features -->
          <ul class="space-y-2">
            <li
              v-for="feature in service.features"
              :key="feature"
              class="flex items-center gap-2 text-alp-black-soft"
            >
              <Icon
                name="lucide:check"
                class="w-4 h-4 text-green-600"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
