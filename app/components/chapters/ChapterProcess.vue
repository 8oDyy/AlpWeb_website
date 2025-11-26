<script setup lang="ts">
import { useProcessTimeline } from '~/composables/useProcessTimeline'
import { useSectionReveal } from '~/composables/useSectionReveal'

/**
 * Process Section
 * - 4 étapes : Découverte → Design → Dev/Test → Déploiement
 * - Timeline animée au scroll
 * - Étapes qui s'allument progressivement
 */

interface ProcessStep {
  id: string
  number: string
  title: string
  description: string
  icon: string
}

const steps: ProcessStep[] = [
  {
    id: 'discovery',
    number: '01',
    title: 'Découverte',
    description: 'On échange sur votre projet, vos objectifs, votre cible. On définit ensemble le périmètre et les fonctionnalités clés.',
    icon: 'lucide:search',
  },
  {
    id: 'design',
    number: '02',
    title: 'Design',
    description: 'Création des maquettes et prototypes. Validation de l\'identité visuelle, de l\'UX et du parcours utilisateur.',
    icon: 'lucide:palette',
  },
  {
    id: 'development',
    number: '03',
    title: 'Développement',
    description: 'Intégration et développement itératif. Tests continus, ajustements, optimisations performances.',
    icon: 'lucide:code',
  },
  {
    id: 'deployment',
    number: '04',
    title: 'Déploiement & Suivi',
    description: 'Mise en production, formation, documentation. Suivi post-lancement et maintenance évolutive.',
    icon: 'lucide:rocket',
  },
]

// Refs
const sectionRef = ref<HTMLElement | null>(null)
const lineRef = ref<HTMLElement | null>(null)
const stepsRef = ref<HTMLElement[]>([])

// Animations
const { init: initTimeline, destroy: destroyTimeline } = useProcessTimeline()
const { revealText, destroy: destroyReveal } = useSectionReveal()

function setStepRef(el: HTMLElement | null, index: number) {
  if (el) stepsRef.value[index] = el
}

onMounted(() => {
  nextTick(() => {
    // Header reveal
    if (sectionRef.value) {
      revealText(sectionRef)
    }

    // Timeline animation
    initTimeline({
      sectionRef,
      lineRef,
      stepsRef,
    })
  })
})

onUnmounted(() => {
  destroyTimeline()
  destroyReveal()
})
</script>

<template>
  <section
    id="process"
    ref="sectionRef"
    class="bg-cream-dark section-padding"
  >
    <div class="container-alp">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-6">
          Notre méthode
        </h2>
        <p class="text-lg text-alp-black-muted max-w-2xl mx-auto">
          Un process éprouvé pour des projets livrés dans les temps et les budgets.
        </p>
      </div>

      <!-- Process Timeline -->
      <div class="relative">
        <!-- Timeline Line (desktop) - animated -->
        <div class="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-cream overflow-hidden">
          <div
            ref="lineRef"
            class="absolute inset-0 bg-alp-black origin-left scale-x-0"
          />
        </div>

        <!-- Steps -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="step.id"
            :ref="(el) => setStepRef(el as HTMLElement, index)"
            class="relative process-step"
          >
            <!-- Step Card -->
            <div class="card-premium p-6 h-full">
              <!-- Number Badge -->
              <div
                data-step-number
                class="w-12 h-12 rounded-full bg-alp-black text-cream flex items-center justify-center font-bold font-display text-lg mb-6"
              >
                {{ step.number }}
              </div>

              <!-- Icon -->
              <div
                data-step-icon
                class="w-10 h-10 rounded-xl bg-cream-dark flex items-center justify-center mb-4"
              >
                <Icon
                  :name="step.icon"
                  class="w-5 h-5 text-alp-black"
                />
              </div>

              <!-- Content -->
              <h3 class="text-xl font-semibold font-display text-alp-black mb-3">
                {{ step.title }}
              </h3>
              <p class="text-alp-black-muted text-sm">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
