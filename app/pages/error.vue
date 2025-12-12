<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()

// SEO for error page
useSeoNoIndex('Erreur')
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-cream">
    <div class="container-alp text-center py-20">
      <div class="max-w-md mx-auto">
        <div class="text-8xl font-bold font-display text-alp-black/10 mb-4">
          {{ error.statusCode }}
        </div>

        <h1 class="text-3xl font-bold font-display mb-4">
          <template v-if="error.statusCode === 404">
            Page non trouvée
          </template>
          <template v-else>
            Une erreur est survenue
          </template>
        </h1>

        <p class="text-alp-black-muted mb-8">
          <template v-if="error.statusCode === 404">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </template>
          <template v-else>
            {{ error.message || 'Une erreur inattendue s\'est produite.' }}
          </template>
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink
            to="/"
            class="inline-flex items-center justify-center px-6 py-3 bg-alp-black text-cream font-medium rounded-full hover:bg-alp-black/90 transition-colors"
          >
            <Icon
              name="lucide:home"
              class="w-4 h-4 mr-2"
            />
            Retour à l'accueil
          </NuxtLink>

          <NuxtLink
            to="/contact"
            class="inline-flex items-center justify-center px-6 py-3 border border-alp-black text-alp-black font-medium rounded-full hover:bg-alp-black/5 transition-colors"
          >
            <Icon
              name="lucide:mail"
              class="w-4 h-4 mr-2"
            />
            Nous contacter
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
