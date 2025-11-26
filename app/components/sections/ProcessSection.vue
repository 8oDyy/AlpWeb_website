<script setup lang="ts">
/**
 * Process Section
 * - 4 étapes : Découverte → Design → Dev/Test → Déploiement
 * - Timeline animée au scroll (à implémenter)
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
</script>

<template>
  <section
    id="process"
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
        <!-- Timeline Line (desktop) -->
        <div class="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-cream" />

        <!-- Steps -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="step in steps"
            :key="step.id"
            class="relative"
          >
            <!-- Step Card -->
            <div class="card-premium p-6 h-full">
              <!-- Number Badge -->
              <div class="w-12 h-12 rounded-full bg-alp-black text-cream flex items-center justify-center font-bold font-display text-lg mb-6">
                {{ step.number }}
              </div>

              <!-- Icon -->
              <div class="w-10 h-10 rounded-xl bg-cream-dark flex items-center justify-center mb-4">
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
