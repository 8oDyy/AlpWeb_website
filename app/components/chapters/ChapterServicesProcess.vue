<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Services + Process Combined Section
 * - Horizontal transition between Services and Process
 * - Services slides out to the left
 * - Process slides in from the right with horizontal scroll
 */

// ============================================
// SERVICES DATA
// ============================================
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

// ============================================
// PROCESS DATA
// ============================================
interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
  icon: string
  details: string[]
}

const steps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Découverte',
    description: 'On échange sur votre projet, vos objectifs, votre cible. On définit ensemble le périmètre et les fonctionnalités clés.',
    icon: 'lucide:search',
    details: ['Brief & objectifs', 'Analyse concurrentielle', 'Définition du scope', 'Planning prévisionnel'],
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description: 'Création des maquettes et prototypes. Validation de l\'identité visuelle, de l\'UX et du parcours utilisateur.',
    icon: 'lucide:palette',
    details: ['Wireframes', 'Maquettes UI', 'Prototypes interactifs', 'Design system'],
  },
  {
    id: 'development',
    number: '03',
    title: 'Développement',
    description: 'Intégration et développement itératif. Tests continus, ajustements, optimisations performances.',
    icon: 'lucide:code',
    details: ['Sprints agiles', 'Tests continus', 'Code review', 'Optimisation'],
  },
  {
    id: 'deployment',
    number: '04',
    title: 'Déploiement & Suivi',
    description: 'Mise en production, formation, documentation. Suivi post-lancement et maintenance évolutive.',
    icon: 'lucide:rocket',
    details: ['Mise en prod', 'Formation', 'Documentation', 'Support continu'],
  },
]

// ============================================
// REFS
// ============================================
const wrapperRef = ref<HTMLElement | null>(null)
const horizontalContainerRef = ref<HTMLElement | null>(null)
const servicesPanelRef = ref<HTMLElement | null>(null)
const processPanelRef = ref<HTMLElement | null>(null)
const processSlideRefs = ref<HTMLElement[]>([])
const progressLineRef = ref<HTMLElement | null>(null)

// Services refs for animations
const servicesTitleRef = ref<HTMLElement | null>(null)
const servicesLineRef = ref<HTMLElement | null>(null)
const servicesSubtitleRef = ref<HTMLElement | null>(null)
const serviceCardRefs = ref<HTMLElement[]>([])
const serviceIconRefs = ref<HTMLElement[]>([])
const serviceContentRefs = ref<HTMLElement[]>([])

// State
const activeStep = ref(0)
const currentSection = ref<'services' | 'process'>('services')

let ctx: gsap.Context | null = null

onMounted(() => {
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)

  setTimeout(() => {
    ScrollTrigger.refresh()

    const wrapper = wrapperRef.value
    const horizontalContainer = horizontalContainerRef.value
    const servicesPanel = servicesPanelRef.value
    const processPanel = processPanelRef.value
    const processSlides = processSlideRefs.value
    const progressLine = progressLineRef.value
    const servicesTitle = servicesTitleRef.value
    const servicesLine = servicesLineRef.value
    const servicesSubtitle = servicesSubtitleRef.value
    const serviceCards = serviceCardRefs.value
    const serviceIcons = serviceIconRefs.value
    const serviceContents = serviceContentRefs.value

    if (!wrapper || !horizontalContainer || !servicesPanel || !processPanel) return

    ctx = gsap.context(() => {
      // Total scroll distance: Services scrollytelling (5 scenes) + Transition (0.5) + Process steps (4)
      // Services: intro + 4 card focuses = ~4 screens
      const totalScrollScreens = 4 + 0.5 + steps.length

      // ============================================
      // SERVICES INITIAL STATES
      // ============================================
      if (servicesTitle) gsap.set(servicesTitle, { opacity: 0, y: 30 })
      if (servicesLine) gsap.set(servicesLine, { scaleX: 0 })
      if (servicesSubtitle) gsap.set(servicesSubtitle, { opacity: 0, x: -20, filter: 'blur(4px)' })
      serviceCards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 50, scale: 0.9, filter: 'blur(4px)' })
      })
      serviceIcons.forEach((icon) => {
        gsap.set(icon, { y: 0, rotation: 0, scale: 1 })
      })
      serviceContents.forEach((content) => {
        gsap.set(content, { opacity: 0.7, y: 10 })
      })

      // Set initial states for Process
      gsap.set(processPanel, { opacity: 0.5 })
      processSlides.forEach((slide, index) => {
        if (index > 0) {
          gsap.set(slide, { opacity: 0.3, scale: 0.95 })
        }
      })

      // Main horizontal timeline
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${window.innerHeight * totalScrollScreens}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress

            // Services: 0% - 50% | Transition: 50% - 65% | Process: 65% - 100%
            if (progress < 0.5) {
              currentSection.value = 'services'
              activeStep.value = 0
            }
            else {
              currentSection.value = 'process'
              const processProgress = (progress - 0.65) / 0.35
              activeStep.value = Math.min(
                Math.max(Math.floor(processProgress * steps.length), 0),
                steps.length - 1,
              )
            }
          },
        },
      })

      // ============================================
      // SERVICES SCROLLYTELLING (0% - 50%)
      // 5 scenes: intro + 4 card focuses
      // ============================================

      // --- SCENE 0: Introduction (0% - 10%) ---
      if (servicesTitle) {
        mainTl.to(servicesTitle, { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' }, 0)
      }
      if (servicesLine) {
        mainTl.to(servicesLine, { scaleX: 1, duration: 0.05, ease: 'power2.out' }, 0.03)
      }
      if (servicesSubtitle) {
        mainTl.to(servicesSubtitle, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.05, ease: 'power2.out' }, 0.05)
      }
      // All cards appear dimmed
      if (serviceCards.length > 0) {
        mainTl.to(serviceCards, {
          opacity: 0.4, y: 0, scale: 0.95, filter: 'blur(2px)',
          duration: 0.05, stagger: 0.01, ease: 'power2.out',
        }, 0.06)
      }

      // --- SCENE 1: Card 1 Focus (10% - 20%) ---
      if (serviceCards[0]) {
        const others1 = serviceCards.filter((_, i) => i !== 0)
        mainTl.to(serviceCards[0], {
          opacity: 1, scale: 1.02, filter: 'blur(0px)', zIndex: 10,
          duration: 0.08, ease: 'power2.out',
        }, 0.1)
        mainTl.to(others1, {
          opacity: 0.25, scale: 0.92, filter: 'blur(3px)',
          duration: 0.08, ease: 'power2.out',
        }, 0.1)
        if (serviceIcons[0]) {
          mainTl.to(serviceIcons[0], { y: -8, rotation: 2, duration: 0.08, ease: 'power1.out' }, 0.12)
        }
        if (serviceContents[0]) {
          mainTl.to(serviceContents[0], { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.14)
        }
      }

      // --- SCENE 2: Card 2 Focus (20% - 30%) ---
      if (serviceCards[1]) {
        // Reset card 1
        if (serviceCards[0]) {
          mainTl.to(serviceCards[0], { opacity: 0.25, scale: 0.92, filter: 'blur(3px)', zIndex: 1, duration: 0.08, ease: 'power2.inOut' }, 0.2)
        }
        if (serviceIcons[0]) {
          mainTl.to(serviceIcons[0], { y: 0, rotation: 0, duration: 0.08, ease: 'power2.out' }, 0.2)
        }
        // Focus card 2
        mainTl.to(serviceCards[1], {
          opacity: 1, scale: 1.02, filter: 'blur(0px)', zIndex: 10,
          duration: 0.08, ease: 'power2.out',
        }, 0.2)
        if (serviceIcons[1]) {
          mainTl.to(serviceIcons[1], { y: -8, rotation: -2, duration: 0.08, ease: 'power1.out' }, 0.22)
        }
        if (serviceContents[1]) {
          mainTl.to(serviceContents[1], { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.24)
        }
      }

      // --- SCENE 3: Card 3 Focus (30% - 40%) ---
      if (serviceCards[2]) {
        // Reset card 2
        if (serviceCards[1]) {
          mainTl.to(serviceCards[1], { opacity: 0.25, scale: 0.92, filter: 'blur(3px)', zIndex: 1, duration: 0.08, ease: 'power2.inOut' }, 0.3)
        }
        if (serviceIcons[1]) {
          mainTl.to(serviceIcons[1], { y: 0, rotation: 0, duration: 0.08, ease: 'power2.out' }, 0.3)
        }
        // Focus card 3
        mainTl.to(serviceCards[2], {
          opacity: 1, scale: 1.02, filter: 'blur(0px)', zIndex: 10,
          duration: 0.08, ease: 'power2.out',
        }, 0.3)
        if (serviceIcons[2]) {
          mainTl.to(serviceIcons[2], { y: -8, rotation: 2, duration: 0.08, ease: 'power1.out' }, 0.32)
        }
        if (serviceContents[2]) {
          mainTl.to(serviceContents[2], { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.34)
        }
      }

      // --- SCENE 4: Card 4 Focus (40% - 50%) ---
      if (serviceCards[3]) {
        // Reset card 3
        if (serviceCards[2]) {
          mainTl.to(serviceCards[2], { opacity: 0.25, scale: 0.92, filter: 'blur(3px)', zIndex: 1, duration: 0.08, ease: 'power2.inOut' }, 0.4)
        }
        if (serviceIcons[2]) {
          mainTl.to(serviceIcons[2], { y: 0, rotation: 0, duration: 0.08, ease: 'power2.out' }, 0.4)
        }
        // Focus card 4
        mainTl.to(serviceCards[3], {
          opacity: 1, scale: 1.02, filter: 'blur(0px)', zIndex: 10,
          duration: 0.08, ease: 'power2.out',
        }, 0.4)
        if (serviceIcons[3]) {
          mainTl.to(serviceIcons[3], { y: -8, rotation: -2, duration: 0.08, ease: 'power1.out' }, 0.42)
        }
        if (serviceContents[3]) {
          mainTl.to(serviceContents[3], { opacity: 1, y: 0, duration: 0.05, ease: 'power2.out' }, 0.44)
        }
      }

      // ============================================
      // TRANSITION Services -> Process (50% - 65%)
      // Plus lente et progressive
      // ============================================
      // Reset all cards before transition
      mainTl.to(serviceCards, {
        opacity: 1, scale: 1, filter: 'blur(0px)', zIndex: 1,
        duration: 0.05, ease: 'power2.out',
      }, 0.48)

      // Slide horizontal progressif (50% - 65%)
      mainTl.to(horizontalContainer, {
        xPercent: -50,
        ease: 'none', // Linéaire pour suivre le scroll
        duration: 0.15,
      }, 0.5)

      // Services fade out progressif
      mainTl.to(servicesPanel, {
        opacity: 0.3,
        scale: 0.95,
        ease: 'power2.in',
        duration: 0.12,
      }, 0.52)

      // Process fade in
      mainTl.to(processPanel, {
        opacity: 1,
        ease: 'power2.out',
        duration: 0.1,
      }, 0.58)

      // ============================================
      // PROCESS HORIZONTAL SCROLL (65% - 100%)
      // ============================================
      const processContainer = processPanel.querySelector('.process-slides-container')
      if (processContainer) {
        mainTl.to(processContainer, {
          xPercent: -75,
          ease: 'none',
          duration: 0.35, // 65% -> 100%
        }, 0.65)
      }

      if (progressLine) {
        mainTl.to(progressLine, {
          scaleX: 1,
          ease: 'none',
          duration: 0.35,
        }, 0.65)
      }

      // Animate individual process slides
      processSlides.forEach((slide, index) => {
        if (index === 0) return

        // Process slides animate from 65% to 100% (0.35 duration)
        const slideStart = 0.65 + (index / steps.length) * 0.35

        mainTl.to(slide, {
          opacity: 1,
          scale: 1,
          duration: 0.06,
          ease: 'power2.out',
        }, slideStart - 0.02)

        if (index > 0) {
          const prevSlide = processSlides[index - 1]
          if (prevSlide) {
            mainTl.to(prevSlide, {
              opacity: 0.3,
              scale: 0.95,
              duration: 0.06,
              ease: 'power2.in',
            }, slideStart)
          }
        }
      })
    }, wrapper)
  }, 400)
})

onUnmounted(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section
    id="services-process"
    ref="wrapperRef"
    class="relative overflow-hidden"
  >
    <!-- Horizontal scroll container -->
    <div
      ref="horizontalContainerRef"
      class="flex h-screen"
      style="width: 200%;"
    >
      <!-- ============================================ -->
      <!-- PANEL 1: SERVICES -->
      <!-- ============================================ -->
      <div
        id="services"
        ref="servicesPanelRef"
        class="w-1/2 h-full bg-cream flex items-center justify-center relative"
      >
        <div class="container-alp max-w-6xl py-20">
          <!-- Section Header -->
          <div class="text-center mb-12">
            <h2
              ref="servicesTitleRef"
              class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-4"
            >
              Nos services
            </h2>
            <div
              ref="servicesLineRef"
              class="w-20 h-0.5 bg-alp-black/30 mx-auto mb-6 origin-center"
            />
            <p
              ref="servicesSubtitleRef"
              class="text-lg md:text-xl text-alp-black-muted max-w-2xl mx-auto"
            >
              Une expertise complète pour donner vie à vos projets digitaux.
            </p>
          </div>

          <!-- Services Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <article
              v-for="(service, index) in services"
              :key="service.id"
              :ref="(el) => { if (el) serviceCardRefs[index] = el as HTMLElement }"
              class="service-card relative bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-black/5"
            >
              <!-- Icon -->
              <div
                :ref="(el) => { if (el) serviceIconRefs[index] = el as HTMLElement }"
                class="w-14 h-14 rounded-2xl bg-cream flex items-center justify-center mb-5"
              >
                <Icon
                  :name="service.icon"
                  class="w-7 h-7 text-alp-black"
                />
              </div>

              <!-- Content -->
              <div :ref="(el) => { if (el) serviceContentRefs[index] = el as HTMLElement }">
                <h3 class="text-xl lg:text-2xl font-semibold font-display text-alp-black mb-3">
                  {{ service.title }}
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

          <!-- Scroll hint -->
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-alp-black/40">
            <span class="text-xs uppercase tracking-widest">Continuer</span>
            <Icon
              name="lucide:arrow-right"
              class="w-4 h-4"
            />
          </div>
        </div>
      </div>

      <!-- ============================================ -->
      <!-- PANEL 2: PROCESS (Horizontal Scroll) -->
      <!-- ============================================ -->
      <div
        id="process"
        ref="processPanelRef"
        class="w-1/2 h-full bg-cream-dark relative overflow-hidden"
      >
        <!-- Fixed header -->
        <div class="absolute top-0 left-0 right-0 z-20 pt-8 pb-4 bg-cream-dark/80 backdrop-blur-sm">
          <div class="container-alp">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-2xl md:text-3xl font-bold font-display text-alp-black">
                  Notre méthode
                </h2>
                <p class="text-sm text-alp-black-muted mt-1 hidden md:block">
                  Un process éprouvé en 4 étapes
                </p>
              </div>

              <div class="flex items-center gap-4">
                <div class="hidden md:flex items-center gap-2">
                  <span
                    v-for="(step, index) in steps"
                    :key="step.id"
                    class="text-xs font-medium transition-all duration-500"
                    :class="activeStep >= index ? 'text-alp-black' : 'text-alp-black/30'"
                  >
                    {{ step.number }}
                  </span>
                </div>
                <div class="text-sm font-medium text-alp-black">
                  <span>{{ String(activeStep + 1).padStart(2, '0') }}</span>
                  <span class="text-alp-black/30"> / {{ String(steps.length).padStart(2, '0') }}</span>
                </div>
              </div>
            </div>

            <!-- Progress bar -->
            <div class="mt-4 h-0.5 bg-alp-black/10 rounded-full overflow-hidden">
              <div
                ref="progressLineRef"
                class="h-full bg-alp-black origin-left scale-x-0"
              />
            </div>
          </div>
        </div>

        <!-- Process slides container -->
        <div
          class="process-slides-container flex h-full pt-24"
          style="width: 400%;"
        >
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            :ref="(el) => { if (el) processSlideRefs[index] = el as HTMLElement }"
            class="process-slide w-1/4 h-full flex items-center justify-center px-8"
          >
            <div class="max-w-4xl w-full">
              <div class="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                <!-- Content -->
                <div>
                  <div class="flex items-center gap-4 mb-6">
                    <span class="text-6xl lg:text-7xl font-bold font-display text-alp-black/10">
                      {{ step.number }}
                    </span>
                    <div class="w-12 h-12 rounded-2xl bg-alp-black flex items-center justify-center">
                      <Icon
                        :name="step.icon"
                        class="w-6 h-6 text-cream"
                      />
                    </div>
                  </div>

                  <h3 class="text-3xl lg:text-4xl font-bold font-display text-alp-black mb-4">
                    {{ step.title }}
                  </h3>

                  <p class="text-lg text-alp-black-muted mb-6 leading-relaxed">
                    {{ step.description }}
                  </p>

                  <ul class="space-y-2">
                    <li
                      v-for="detail in step.details"
                      :key="detail"
                      class="flex items-center gap-3 text-alp-black-soft"
                    >
                      <div class="w-1.5 h-1.5 rounded-full bg-alp-black" />
                      <span>{{ detail }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Visual -->
                <div class="hidden md:flex justify-center">
                  <div class="relative">
                    <div class="w-40 h-40 lg:w-52 lg:h-52 rounded-3xl bg-cream flex items-center justify-center shadow-lg">
                      <Icon
                        :name="step.icon"
                        class="w-20 h-20 lg:w-24 lg:h-24 text-alp-black/20"
                      />
                    </div>
                    <div class="absolute -top-3 -right-3 w-14 h-14 rounded-xl bg-alp-black flex items-center justify-center shadow-xl">
                      <span class="text-xl font-bold font-display text-cream">{{ step.number }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation dots (mobile) -->
        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="activeStep === index ? 'bg-alp-black w-6' : 'bg-alp-black/30'"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-slide {
  will-change: transform, opacity;
}
</style>
