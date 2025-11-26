<script setup lang="ts">
/**
 * Services Section
 * - Cartes crème/noir
 * - Services : Sites web, Apps, Backend/API, Hébergement
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
</script>

<template>
  <section
    id="services"
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article
          v-for="service in services"
          :key="service.id"
          class="card-premium p-8"
        >
          <!-- Icon -->
          <div class="w-14 h-14 rounded-2xl bg-cream-dark flex items-center justify-center mb-6">
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
                class="w-4 h-4 text-brown"
              />
              <span>{{ feature }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
