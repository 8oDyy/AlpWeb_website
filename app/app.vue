<script setup lang="ts">
import { useGsap } from '~/composables/useGsap'

const { initScrollAnimations, killAll } = useGsap()

// Initialize scroll animations after page load
onMounted(() => {
  nextTick(() => {
    initScrollAnimations()
  })
})

// Cleanup on unmount
onUnmounted(() => {
  killAll()
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
