<script setup lang="ts">
/**
 * Showcase Section - Scrollytelling horizontal
 * - 3 slides : Site vitrine | App iOS | Dashboard
 * - Scroll horizontal contrôlé par ScrollTrigger (à implémenter)
 */

interface ShowcaseItem {
  id: string
  title: string
  description: string
  stack: string[]
  image: string
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'site-vitrine',
    title: 'Sites vitrines haut de gamme',
    description: 'Des sites web élégants et performants qui convertissent vos visiteurs en clients. Design sur-mesure, SEO optimisé, performances maximales.',
    stack: ['Nuxt', 'Vue', 'Tailwind', 'Vercel'],
    image: '/images/showcase/site-vitrine.jpg',
  },
  {
    id: 'app-ios',
    title: 'Applications iOS / iPadOS',
    description: 'Des applications natives pensées pour l\'écosystème Apple. Interface fluide, expérience utilisateur premium, intégration parfaite.',
    stack: ['SwiftUI', 'Swift', 'CloudKit', 'TestFlight'],
    image: '/images/showcase/app-ios.jpg',
  },
  {
    id: 'dashboard',
    title: 'Plateformes & Dashboards',
    description: 'Des outils métier sur-mesure pour piloter votre activité. Tableaux de bord, gestion de données, automatisations.',
    stack: ['Nuxt', 'Supabase', 'PostgreSQL', 'Stripe'],
    image: '/images/showcase/dashboard.jpg',
  },
]
</script>

<template>
  <section
    id="showcase"
    class="bg-cream-dark section-padding"
  >
    <div class="container-alp">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-6">
          Ce qu'on construit pour vous
        </h2>
        <p class="text-lg text-alp-black-muted max-w-2xl mx-auto">
          Des solutions digitales sur-mesure, pensées pour votre réussite.
        </p>
      </div>

      <!-- Showcase Items (will become horizontal scroll) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <article
          v-for="item in showcaseItems"
          :key="item.id"
          class="card-premium p-8"
        >
          <!-- Placeholder Image -->
          <div class="aspect-video bg-cream-dark rounded-lg mb-6 flex items-center justify-center">
            <Icon
              name="lucide:image"
              class="w-12 h-12 text-alp-black-muted/30"
            />
          </div>

          <!-- Content -->
          <h3 class="text-xl md:text-2xl font-semibold font-display text-alp-black mb-4">
            {{ item.title }}
          </h3>
          <p class="text-alp-black-muted mb-6">
            {{ item.description }}
          </p>

          <!-- Stack Tags -->
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tech in item.stack"
              :key="tech"
              class="px-3 py-1 text-sm bg-cream-dark rounded-full text-alp-black-soft"
            >
              {{ tech }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
