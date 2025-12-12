<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

// SEO
useSeo({
  title: 'Nos Services',
  description: 'Découvrez nos services : création de sites vitrines premium, applications iOS natives, dashboards sur-mesure et hébergement haute performance.',
})

// Schema.org - Multiple services
useSchemaService({
  name: 'Création de sites vitrines',
  description: 'Conception et développement de sites vitrines modernes, performants et optimisés SEO.',
  areaServed: 'France',
})

// Breadcrumb
useSchemaBreadcrumb({
  items: [
    { name: 'Accueil', url: 'https://alp-web.com/' },
    { name: 'Services', url: 'https://alp-web.com/services' },
  ],
})

const services = [
  {
    slug: 'sites-vitrines',
    title: 'Sites Vitrines Premium',
    description: 'Des sites web modernes, performants et optimisés pour le référencement naturel.',
    icon: 'lucide:globe',
    features: ['Design sur-mesure', 'Optimisation SEO', 'Performance optimale', 'Responsive design'],
  },
  {
    slug: 'applications-ios',
    title: 'Applications iOS',
    description: 'Applications natives pour iPhone et iPad, conçues avec les dernières technologies Apple.',
    icon: 'lucide:smartphone',
    features: ['SwiftUI', 'Design Apple', 'App Store ready', 'Maintenance incluse'],
  },
  {
    slug: 'dashboards',
    title: 'Dashboards Sur-Mesure',
    description: 'Tableaux de bord personnalisés pour piloter votre activité en temps réel.',
    icon: 'lucide:layout-dashboard',
    features: ['Données en temps réel', 'Visualisations', 'API intégrées', 'Sécurisé'],
  },
  {
    slug: 'hebergement',
    title: 'Hébergement & Maintenance',
    description: 'Solutions d\'hébergement haute performance avec maintenance proactive.',
    icon: 'lucide:server',
    features: ['Haute disponibilité', 'Sauvegardes', 'SSL inclus', 'Support réactif'],
  },
]
</script>

<template>
  <div class="container-alp py-32">
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-bold font-display mb-6">
        Nos Services
      </h1>
      <p class="text-xl text-alp-black-muted max-w-2xl mx-auto">
        Des solutions digitales sur-mesure pour propulser votre activité.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <NuxtLink
        v-for="service in services"
        :key="service.slug"
        :to="`/services/${service.slug}`"
        class="group p-8 bg-cream-light rounded-2xl border border-cream-dark hover:border-alp-black/20 transition-all duration-300"
      >
        <div class="flex items-start gap-4 mb-4">
          <div class="p-3 bg-alp-black/5 rounded-xl group-hover:bg-alp-black/10 transition-colors">
            <Icon
              :name="service.icon"
              class="w-6 h-6 text-alp-black"
            />
          </div>
          <div>
            <h2 class="text-xl font-semibold font-display mb-2">
              {{ service.title }}
            </h2>
            <p class="text-alp-black-muted">
              {{ service.description }}
            </p>
          </div>
        </div>

        <ul class="flex flex-wrap gap-2 mt-4">
          <li
            v-for="feature in service.features"
            :key="feature"
            class="text-sm px-3 py-1 bg-alp-black/5 rounded-full text-alp-black-soft"
          >
            {{ feature }}
          </li>
        </ul>

        <div class="mt-6 flex items-center text-sm font-medium text-alp-black group-hover:translate-x-1 transition-transform">
          En savoir plus
          <Icon
            name="lucide:arrow-right"
            class="w-4 h-4 ml-2"
          />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
