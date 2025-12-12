<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

// SEO
useSeo({
  title: 'À Propos',
  description: 'Découvrez AlpWeb, agence web spécialisée dans la création de sites vitrines premium et d\'applications sur-mesure. Notre histoire, nos valeurs, notre équipe.',
})

// Schema.org
useSchemaOrganization()
useSchemaWebPage({
  name: 'À Propos d\'AlpWeb',
  description: 'Présentation de l\'agence web AlpWeb.',
})

// Breadcrumb
useSchemaBreadcrumb({
  items: [
    { name: 'Accueil', url: 'https://alp-web.com/' },
    { name: 'À Propos', url: 'https://alp-web.com/a-propos' },
  ],
})

const values = [
  {
    icon: 'lucide:gem',
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque projet, avec une attention particulière aux détails.',
  },
  {
    icon: 'lucide:users',
    title: 'Collaboration',
    description: 'Nous travaillons en étroite collaboration avec nos clients pour comprendre leurs besoins.',
  },
  {
    icon: 'lucide:zap',
    title: 'Performance',
    description: 'Nous optimisons chaque aspect technique pour des sites rapides et efficaces.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Fiabilité',
    description: 'Nous livrons dans les délais et assurons un suivi de qualité après livraison.',
  },
]
</script>

<template>
  <div class="container-alp py-32">
    <!-- Hero -->
    <div class="max-w-3xl mb-20">
      <h1 class="text-4xl md:text-5xl font-bold font-display mb-6">
        À Propos d'AlpWeb
      </h1>
      <p class="text-xl text-alp-black-muted">
        Nous sommes une agence web passionnée par la création d'expériences digitales exceptionnelles.
        Notre mission : transformer vos idées en solutions web performantes et élégantes.
      </p>
    </div>

    <!-- Story -->
    <section class="mb-20">
      <h2 class="text-2xl font-semibold font-display mb-6">
        Notre Histoire
      </h2>
      <div class="prose prose-lg max-w-none">
        <p class="text-alp-black-muted">
          <!-- TODO: Remplir avec l'histoire réelle de l'entreprise -->
          Fondée en [TODO: Année], AlpWeb est née de la volonté de créer des sites web qui allient
          esthétique moderne et performance technique. Nous accompagnons les entreprises dans leur
          transformation digitale avec des solutions sur-mesure.
        </p>
        <p class="text-alp-black-muted mt-4">
          Basés en France, nous travaillons avec des clients de tous secteurs, des startups aux
          entreprises établies, en leur apportant notre expertise technique et notre vision créative.
        </p>
      </div>
    </section>

    <!-- Values -->
    <section class="mb-20">
      <h2 class="text-2xl font-semibold font-display mb-8">
        Nos Valeurs
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="value in values"
          :key="value.title"
          class="p-6 bg-cream-light rounded-2xl border border-cream-dark"
        >
          <div class="p-3 bg-alp-black/5 rounded-xl w-fit mb-4">
            <Icon
              :name="value.icon"
              class="w-6 h-6 text-alp-black"
            />
          </div>
          <h3 class="text-lg font-semibold font-display mb-2">
            {{ value.title }}
          </h3>
          <p class="text-sm text-alp-black-muted">
            {{ value.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- Team -->
    <section class="mb-20">
      <h2 class="text-2xl font-semibold font-display mb-6">
        L'Équipe
      </h2>
      <p class="text-alp-black-muted max-w-2xl">
        <!-- TODO: Ajouter les membres de l'équipe -->
        Notre équipe est composée de développeurs passionnés, de designers créatifs et d'experts SEO.
        Ensemble, nous mettons notre expertise au service de vos projets.
      </p>
    </section>

    <!-- CTA -->
    <div class="p-8 bg-alp-black text-cream rounded-2xl text-center">
      <h2 class="text-2xl font-semibold font-display mb-4">
        Envie de travailler avec nous ?
      </h2>
      <p class="text-cream/70 mb-6 max-w-xl mx-auto">
        Discutons de votre projet et voyons comment nous pouvons vous aider à atteindre vos objectifs.
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
