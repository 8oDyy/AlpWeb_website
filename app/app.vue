<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const TheExperience = defineAsyncComponent(() => import('~/components/canvas/TheExperience.vue'))

/**
 * App Root
 * Animations seront initialisées dans feat/scroll-animations
 */
</script>

<template>
  <div>
    <ClientOnly>
      <TheExperience />
    </ClientOnly>
    
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
