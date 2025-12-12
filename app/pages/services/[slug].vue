<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const route = useRoute()
const slug = route.params.slug as string

// Service data - TODO: Move to a data file or CMS
const servicesData: Record<string, {
  title: string
  description: string
  longDescription: string
  icon: string
  features: string[]
  benefits: string[]
}> = {
  'sites-vitrines': {
    title: 'Sites Vitrines Premium',
    description: 'Conception et développement de sites vitrines modernes, performants et optimisés pour le référencement naturel.',
    longDescription: 'Nous créons des sites vitrines qui reflètent l\'excellence de votre marque. Chaque projet est conçu sur-mesure, avec une attention particulière portée à l\'expérience utilisateur, la performance et le référencement naturel.',
    icon: 'lucide:globe',
    features: [
      'Design sur-mesure et unique',
      'Optimisation SEO technique complète',
      'Performance optimale (Core Web Vitals)',
      'Responsive design (mobile-first)',
      'Animations fluides et modernes',
      'Intégration CMS si nécessaire',
    ],
    benefits: [
      'Augmentez votre visibilité en ligne',
      'Convertissez plus de visiteurs en clients',
      'Renforcez votre image de marque',
    ],
  },
  'applications-ios': {
    title: 'Applications iOS',
    description: 'Applications natives pour iPhone et iPad, conçues avec les dernières technologies Apple.',
    longDescription: 'Nous développons des applications iOS natives en SwiftUI, offrant une expérience utilisateur fluide et conforme aux standards Apple. De la conception à la publication sur l\'App Store.',
    icon: 'lucide:smartphone',
    features: [
      'Développement SwiftUI natif',
      'Design conforme aux Human Interface Guidelines',
      'Publication App Store',
      'Maintenance et mises à jour',
      'Intégration APIs et services',
      'Tests sur appareils réels',
    ],
    benefits: [
      'Présence sur l\'écosystème Apple',
      'Expérience utilisateur premium',
      'Performance native optimale',
    ],
  },
  'dashboards': {
    title: 'Dashboards Sur-Mesure',
    description: 'Tableaux de bord personnalisés pour piloter votre activité en temps réel.',
    longDescription: 'Nous concevons des dashboards sur-mesure qui centralisent vos données métier et vous permettent de prendre des décisions éclairées. Visualisations claires, données en temps réel, accès sécurisé.',
    icon: 'lucide:layout-dashboard',
    features: [
      'Données en temps réel',
      'Visualisations interactives',
      'Intégration multi-sources',
      'Authentification sécurisée',
      'Export de rapports',
      'Alertes personnalisées',
    ],
    benefits: [
      'Pilotez votre activité efficacement',
      'Gagnez du temps sur l\'analyse',
      'Prenez des décisions data-driven',
    ],
  },
  'hebergement': {
    title: 'Hébergement & Maintenance',
    description: 'Solutions d\'hébergement haute performance avec maintenance proactive.',
    longDescription: 'Nous proposons des solutions d\'hébergement optimisées pour la performance et la sécurité. Maintenance proactive, sauvegardes automatiques, support réactif.',
    icon: 'lucide:server',
    features: [
      'Hébergement haute disponibilité',
      'Sauvegardes automatiques quotidiennes',
      'Certificat SSL inclus',
      'CDN pour performance globale',
      'Monitoring 24/7',
      'Support technique réactif',
    ],
    benefits: [
      'Tranquillité d\'esprit',
      'Site toujours disponible',
      'Sécurité renforcée',
    ],
  },
}

const serviceData = servicesData[slug]

// 404 if service not found
if (!serviceData) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service non trouvé',
  })
}

// Service is guaranteed to exist after the check above
const service = serviceData

// SEO
useSeo({
  title: service.title,
  description: service.description,
})

// Schema.org
useSchemaService({
  name: service.title,
  description: service.description,
  url: `https://alp-web.com/services/${slug}`,
  areaServed: 'France',
})

// Breadcrumb
useSchemaBreadcrumb({
  items: [
    { name: 'Accueil', url: 'https://alp-web.com/' },
    { name: 'Services', url: 'https://alp-web.com/services' },
    { name: service.title, url: `https://alp-web.com/services/${slug}` },
  ],
})
</script>

<template>
  <div class="container-alp py-32">
    <!-- Header -->
    <div class="max-w-3xl mb-16">
      <NuxtLink
        to="/services"
        class="inline-flex items-center text-sm text-alp-black-muted hover:text-alp-black mb-6 transition-colors"
      >
        <Icon
          name="lucide:arrow-left"
          class="w-4 h-4 mr-2"
        />
        Retour aux services
      </NuxtLink>

      <div class="flex items-center gap-4 mb-6">
        <div class="p-4 bg-alp-black/5 rounded-2xl">
          <Icon
            :name="service.icon"
            class="w-8 h-8 text-alp-black"
          />
        </div>
        <h1 class="text-4xl md:text-5xl font-bold font-display">
          {{ service.title }}
        </h1>
      </div>

      <p class="text-xl text-alp-black-muted">
        {{ service.longDescription }}
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <!-- Features -->
      <div>
        <h2 class="text-2xl font-semibold font-display mb-6">
          Ce que nous proposons
        </h2>
        <ul class="space-y-4">
          <li
            v-for="feature in service.features"
            :key="feature"
            class="flex items-start gap-3"
          >
            <Icon
              name="lucide:check-circle"
              class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
            />
            <span class="text-alp-black-soft">{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Benefits -->
      <div>
        <h2 class="text-2xl font-semibold font-display mb-6">
          Les bénéfices pour vous
        </h2>
        <ul class="space-y-4">
          <li
            v-for="benefit in service.benefits"
            :key="benefit"
            class="flex items-start gap-3"
          >
            <Icon
              name="lucide:star"
              class="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0"
            />
            <span class="text-alp-black-soft">{{ benefit }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- CTA -->
    <div class="mt-16 p-8 bg-alp-black text-cream rounded-2xl text-center">
      <h2 class="text-2xl font-semibold font-display mb-4">
        Intéressé par ce service ?
      </h2>
      <p class="text-cream/70 mb-6 max-w-xl mx-auto">
        Discutons de votre projet et voyons comment nous pouvons vous aider.
      </p>
      <NuxtLink
        to="/contact"
        class="inline-flex items-center px-6 py-3 bg-cream text-alp-black font-medium rounded-full hover:bg-cream/90 transition-colors"
      >
        Nous contacter
        <Icon
          name="lucide:arrow-right"
          class="w-4 h-4 ml-2"
        />
      </NuxtLink>
    </div>
  </div>
</template>
