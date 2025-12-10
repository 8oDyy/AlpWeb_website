<script setup lang="ts">
import { useServicesScrollytelling } from '~/composables/useServicesScrollytelling'

/**
 * Services Section
 * - Desktop: Premium Scrollytelling with pinned section
 * - Mobile: Classic scroll with simple animations
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

// Detect if desktop
const isDesktop = ref(false)

// Refs for scrollytelling (desktop only)
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
  // Check if desktop (md breakpoint = 768px)
  const checkDesktop = () => {
    isDesktop.value = window.innerWidth >= 768
  }

  checkDesktop()
  window.addEventListener('resize', checkDesktop)

  // Only init scrollytelling on desktop
  nextTick(() => {
    if (isDesktop.value) {
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
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkDesktop)
    destroy()
  })
})
</script>

<template>
  <!-- ============================================ -->
  <!-- DESKTOP VERSION - Scrollytelling -->
  <!-- ============================================ -->
  <section
    v-if="isDesktop"
    id="services"
    ref="containerRef"
    class="services-scrollytelling bg-cream min-h-screen relative overflow-hidden"
  >
    <!-- Progress indicator -->
    <div class="fixed top-1/2 right-8 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-2">
      <div
        v-for="(_, index) in services"
        :key="index"
        class="w-1.5 h-8 rounded-full transition-all duration-500"
        :class="currentScene >= index + 1 ? 'bg-alp-black' : 'bg-alp-black/20'"
      />
    </div>

    <div class="container-alp h-screen flex flex-col justify-start items-center py-20 pb-16">
      <!-- Section Header -->
      <div
        ref="headerRef"
        class="text-center mb-10 w-full"
      >
        <h2
          ref="titleRef"
          class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-2 opacity-0"
        >
          Nos services
        </h2>
        <div
          ref="titleLineRef"
          class="w-20 h-0.5 bg-alp-black/30 mx-auto mb-3 scale-x-0"
        />
        <p
          ref="subtitleRef"
          class="text-lg md:text-xl text-alp-black-muted max-w-2xl mx-auto opacity-0"
        >
          Une expertise complète pour donner vie à vos projets digitaux.
        </p>
      </div>

      <!-- Services Grid -->
      <div
        ref="cardsWrapperRef"
        class="grid grid-cols-2 gap-6 w-full max-w-5xl"
      >
        <article
          v-for="(service, index) in services"
          :key="service.id"
          :ref="(el) => { if (el) cardRefs[index] = el as HTMLElement }"
          class="service-card relative bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5 opacity-0 translate-y-12"
        >
          <div
            :ref="(el) => { if (el) iconRefs[index] = el as HTMLElement }"
            class="service-icon w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-5"
          >
            <Icon
              :name="service.icon"
              class="w-7 h-7 text-alp-black"
            />
          </div>

          <div :ref="(el) => { if (el) cardContentRefs[index] = el as HTMLElement }">
            <h3 class="text-xl lg:text-2xl font-semibold font-display text-alp-black mb-3 relative">
              {{ service.title }}
              <span
                v-if="index === services.length - 1"
                class="card-underline absolute -bottom-1 left-0 w-12 h-0.5 bg-alp-black/20 origin-left scale-x-0"
              />
            </h3>
            <p class="text-alp-black-muted mb-5 text-sm lg:text-base leading-relaxed">
              {{ service.description }}
            </p>

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
    </div>
  </section>

  <!-- ============================================ -->
  <!-- MOBILE VERSION - Classic scroll -->
  <!-- ============================================ -->
  <section
    v-else
    id="services"
    class="bg-cream py-16 px-4"
  >
    <div class="container-alp">
      <!-- Section Header -->
      <div class="text-center mb-10">
        <h2 class="text-3xl font-bold font-display text-alp-black mb-4">
          Nos services
        </h2>
        <div class="w-16 h-0.5 bg-alp-black/30 mx-auto mb-4" />
        <p class="text-base text-alp-black-muted max-w-md mx-auto">
          Une expertise complète pour donner vie à vos projets digitaux.
        </p>
      </div>

      <!-- Services Cards - Stacked on mobile -->
      <div class="flex flex-col gap-4">
        <article
          v-for="service in services"
          :key="service.id"
          class="bg-white rounded-2xl p-5 shadow-sm border border-black/5"
        >
          <div class="flex items-start gap-4">
            <!-- Icon -->
            <div class="w-12 h-12 rounded-xl bg-cream flex items-center justify-center flex-shrink-0">
              <Icon
                :name="service.icon"
                class="w-6 h-6 text-alp-black"
              />
            </div>

            <!-- Content -->
            <div class="flex-1">
              <h3 class="text-lg font-semibold font-display text-alp-black mb-2">
                {{ service.title }}
              </h3>
              <p class="text-alp-black-muted text-sm mb-3 leading-relaxed">
                {{ service.description }}
              </p>

              <!-- Features as tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="feature in service.features"
                  :key="feature"
                  class="text-xs bg-cream text-alp-black-soft px-2 py-1 rounded-full"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
