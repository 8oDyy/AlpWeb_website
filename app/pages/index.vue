<script setup lang="ts">
// Homepage
definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: 'AlpWeb - Agence Web Créative',
  description: 'Création de sites vitrines modernes, performants et optimisés SEO. Transformez votre présence digitale avec AlpWeb.',
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="container mx-auto px-4 text-center">
        <h1
          data-animate="fade-up"
          class="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
        >
          Créons ensemble
          <span class="text-primary-500">votre site web</span>
        </h1>
        <p
          data-animate="fade-up"
          data-delay="0.2"
          class="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Agence web spécialisée dans la création de sites vitrines modernes, performants et optimisés SEO.
        </p>
        <div
          data-animate="fade-up"
          data-delay="0.4"
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <UButton
            size="xl"
            color="primary"
          >
            Voir nos réalisations
          </UButton>
          <UButton
            size="xl"
            variant="outline"
          >
            Nous contacter
          </UButton>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-24 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2
          data-animate="fade-up"
          class="text-4xl font-bold text-center text-gray-900 mb-16"
        >
          Nos services
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            data-animate="fade-up"
            data-delay="0.1"
            class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <Icon
                name="lucide:layout"
                class="w-6 h-6 text-primary-500"
              />
            </div>
            <h3 class="text-xl font-semibold mb-4">
              Sites Vitrines
            </h3>
            <p class="text-gray-600">
              Des sites web élégants et performants pour présenter votre activité et attirer de nouveaux clients.
            </p>
          </div>
          <div
            data-animate="fade-up"
            data-delay="0.2"
            class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <Icon
                name="lucide:palette"
                class="w-6 h-6 text-primary-500"
              />
            </div>
            <h3 class="text-xl font-semibold mb-4">
              Design UI/UX
            </h3>
            <p class="text-gray-600">
              Des interfaces modernes et intuitives conçues pour offrir la meilleure expérience utilisateur.
            </p>
          </div>
          <div
            data-animate="fade-up"
            data-delay="0.3"
            class="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
          >
            <div class="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <Icon
                name="lucide:search"
                class="w-6 h-6 text-primary-500"
              />
            </div>
            <h3 class="text-xl font-semibold mb-4">
              SEO & Performance
            </h3>
            <p class="text-gray-600">
              Optimisation pour les moteurs de recherche et performances maximales pour un meilleur référencement.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-primary-500">
      <div class="container mx-auto px-4 text-center">
        <h2
          data-animate="fade-up"
          class="text-4xl font-bold text-white mb-6"
        >
          Prêt à lancer votre projet ?
        </h2>
        <p
          data-animate="fade-up"
          data-delay="0.2"
          class="text-xl text-primary-100 mb-8 max-w-2xl mx-auto"
        >
          Contactez-nous pour discuter de votre projet et obtenir un devis gratuit.
        </p>
        <UButton
          data-animate="fade-up"
          data-delay="0.4"
          size="xl"
          color="white"
          variant="solid"
        >
          Demander un devis
        </UButton>
      </div>
    </section>
  </div>
</template>
