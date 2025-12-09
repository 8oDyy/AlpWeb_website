<script setup lang="ts">
import gsap from 'gsap'

/**
 * MountainOverlay - Montagnes triangulaires stylisées
 * Animation d'apparition + parallax subtil
 */

interface Props {
  color?: string
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: '#1A1A1A',
  opacity: 0.12,
})

// Refs pour les couches de montagnes
const containerRef = ref<HTMLElement | null>(null)
const layer1Ref = ref<SVGPolygonElement | null>(null)
const layer2Ref = ref<SVGPolygonElement | null>(null)
const layer3Ref = ref<SVGPolygonElement | null>(null)
const layer4Ref = ref<SVGPolygonElement | null>(null)

let ctx: gsap.Context | null = null

function initAnimations() {
  if (import.meta.server || !containerRef.value) return

  ctx = gsap.context(() => {
    const tl = gsap.timeline({ delay: 1.5 })

    // Initial state - montagnes cachées en bas
    gsap.set([layer1Ref.value, layer2Ref.value, layer3Ref.value, layer4Ref.value], {
      y: 100,
      opacity: 0,
    })

    // Animation cascade - chaque montagne apparaît avec un délai
    // Couche arrière (la plus lointaine)
    tl.to(layer1Ref.value, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power3.out',
    })

    // Couche 2
    tl.to(layer2Ref.value, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
    }, '-=0.8')

    // Couche 3
    tl.to(layer3Ref.value, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
    }, '-=0.7')

    // Couche avant (la plus proche)
    tl.to(layer4Ref.value, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.6')
  }, containerRef.value)
}

onMounted(() => {
  nextTick(() => {
    initAnimations()
  })
})

onUnmounted(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <div
    ref="containerRef"
    class="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[45vh] overflow-hidden"
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 500"
      preserveAspectRatio="xMidYMax slice"
      class="absolute bottom-0 w-full h-full"
      :style="{ opacity: props.opacity }"
    >
      <!-- Couche 1 - Arrière plan (petites montagnes lointaines) -->
      <g
        ref="layer1Ref"
      >
        <polygon
          :fill="props.color"
          fill-opacity="0.25"
          points="0,500 100,380 180,420 280,350 380,400 500,500"
        />
        <polygon
          :fill="props.color"
          fill-opacity="0.25"
          points="900,500 1000,360 1100,400 1200,340 1300,380 1440,500"
        />
      </g>

      <!-- Couche 2 - Montagnes moyennes -->
      <g
        ref="layer2Ref"
      >
        <polygon
          :fill="props.color"
          fill-opacity="0.35"
          points="200,500 350,320 450,380 550,280 700,360 850,500"
        />
        <polygon
          :fill="props.color"
          fill-opacity="0.35"
          points="750,500 900,340 1050,420 1150,320 1300,400 1440,500"
        />
      </g>

      <!-- Couche 3 - Grandes montagnes -->
      <g
        ref="layer3Ref"
      >
        <polygon
          :fill="props.color"
          fill-opacity="0.5"
          points="0,500 150,350 300,420 500,250 650,350 800,500"
        />
        <polygon
          :fill="props.color"
          fill-opacity="0.5"
          points="600,500 800,380 950,300 1100,380 1250,320 1440,500"
        />
      </g>

      <!-- Couche 4 - Premier plan (montagnes proches) -->
      <g
        ref="layer4Ref"
      >
        <polygon
          :fill="props.color"
          fill-opacity="0.7"
          points="0,500 200,380 350,450 500,350 700,420 900,500"
        />
        <polygon
          :fill="props.color"
          fill-opacity="0.7"
          points="700,500 900,400 1050,450 1200,380 1350,430 1440,500"
        />
      </g>
    </svg>
  </div>
</template>
