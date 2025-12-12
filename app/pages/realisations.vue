<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

// SEO
useSeo({
  title: 'Nos Réalisations',
  description: 'Découvrez nos projets : sites vitrines premium, applications iOS et dashboards sur-mesure réalisés pour nos clients.',
})

// Schema.org
useSchemaWebPage({
  name: 'Nos Réalisations',
  description: 'Portfolio des projets réalisés par AlpWeb.',
})

// Breadcrumb
useSchemaBreadcrumb({
  items: [
    { name: 'Accueil', url: 'https://alp-web.com/' },
    { name: 'Réalisations', url: 'https://alp-web.com/realisations' },
  ],
})

// TODO: Replace with real projects data
const projects = [
  {
    id: 1,
    title: 'Projet Client A',
    category: 'Site Vitrine',
    description: 'Site vitrine premium pour une entreprise du secteur luxe.',
    image: '/images/projects/placeholder-1.jpg',
    tags: ['Nuxt 3', 'TailwindCSS', 'SEO'],
  },
  {
    id: 2,
    title: 'Projet Client B',
    category: 'Application iOS',
    description: 'Application native pour la gestion de réservations.',
    image: '/images/projects/placeholder-2.jpg',
    tags: ['SwiftUI', 'iOS', 'API REST'],
  },
  {
    id: 3,
    title: 'Projet Client C',
    category: 'Dashboard',
    description: 'Tableau de bord analytics pour une startup SaaS.',
    image: '/images/projects/placeholder-3.jpg',
    tags: ['Vue.js', 'Charts', 'Real-time'],
  },
  {
    id: 4,
    title: 'Projet Client D',
    category: 'Site Vitrine',
    description: 'Site vitrine avec animations 3D pour une agence créative.',
    image: '/images/projects/placeholder-4.jpg',
    tags: ['Three.js', 'GSAP', 'WebGL'],
  },
]

const categories = ['Tous', 'Site Vitrine', 'Application iOS', 'Dashboard']
const selectedCategory = ref('Tous')

const filteredProjects = computed(() => {
  if (selectedCategory.value === 'Tous') return projects
  return projects.filter(p => p.category === selectedCategory.value)
})
</script>

<template>
  <div class="container-alp py-32">
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold font-display mb-6">
        Nos Réalisations
      </h1>
      <p class="text-xl text-alp-black-muted max-w-2xl mx-auto">
        Découvrez une sélection de projets que nous avons réalisés pour nos clients.
      </p>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap justify-center gap-3 mb-12">
      <button
        v-for="category in categories"
        :key="category"
        class="px-4 py-2 rounded-full text-sm font-medium transition-all"
        :class="selectedCategory === category
          ? 'bg-alp-black text-cream'
          : 'bg-cream-light text-alp-black-soft hover:bg-cream-dark'"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <article
        v-for="project in filteredProjects"
        :key="project.id"
        class="group bg-cream-light rounded-2xl overflow-hidden border border-cream-dark hover:border-alp-black/20 transition-all duration-300"
      >
        <!-- Image placeholder -->
        <div class="aspect-video bg-gradient-to-br from-alp-black/5 to-alp-black/10 flex items-center justify-center">
          <Icon
            name="lucide:image"
            class="w-12 h-12 text-alp-black/20"
          />
          <!-- TODO: Replace with NuxtImg when images are available -->
          <!-- <NuxtImg
            :src="project.image"
            :alt="project.title"
            class="w-full h-full object-cover"
            loading="lazy"
          /> -->
        </div>

        <div class="p-6">
          <span class="text-sm text-alp-black-muted">{{ project.category }}</span>
          <h2 class="text-xl font-semibold font-display mt-1 mb-2">
            {{ project.title }}
          </h2>
          <p class="text-alp-black-muted mb-4">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="text-xs px-2 py-1 bg-alp-black/5 rounded-full text-alp-black-soft"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <!-- CTA -->
    <div class="mt-16 text-center">
      <p class="text-alp-black-muted mb-6">
        Vous avez un projet en tête ?
      </p>
      <NuxtLink
        to="/contact"
        class="inline-flex items-center px-6 py-3 bg-alp-black text-cream font-medium rounded-full hover:bg-alp-black/90 transition-colors"
      >
        Discutons de votre projet
        <Icon
          name="lucide:arrow-right"
          class="w-4 h-4 ml-2"
        />
      </NuxtLink>
    </div>
  </div>
</template>
