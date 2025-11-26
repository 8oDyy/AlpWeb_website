<script setup lang="ts">
/**
 * Mountain Layers SVG Component
 * Inspired by AlpWeb branding - layered mountain silhouettes
 * Each layer can be animated independently via refs
 * Design: Organic peaks with varying heights for depth
 */

defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="['absolute inset-0 overflow-hidden pointer-events-none', $props.class]">
    <svg
      class="absolute bottom-0 w-full h-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Gradient Definitions -->
      <defs>
        <linearGradient
          id="skyGradient"
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            style="stop-color: #FAF8F5"
          />
          <stop
            offset="60%"
            style="stop-color: #F5F0E8"
          />
          <stop
            offset="100%"
            style="stop-color: #EBE4D8"
          />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect
        width="100%"
        height="100%"
        fill="url(#skyGradient)"
      />

      <!-- Layer 5 - Furthest mountains (most faded) -->
      <path
        class="mountain-layer"
        d="M-100 900
           L-100 680
           C50 650, 150 620, 280 580
           C380 550, 450 540, 520 560
           C620 590, 700 550, 800 520
           C900 490, 1000 510, 1100 480
           C1200 450, 1300 470, 1400 500
           C1480 520, 1540 540, 1540 540
           L1540 900 Z"
        fill="#9A9A9A"
        opacity="0.3"
      />

      <!-- Layer 4 -->
      <path
        class="mountain-layer"
        d="M-100 900
           L-100 720
           C0 700, 100 660, 200 640
           C320 610, 400 630, 500 600
           C620 560, 720 580, 850 550
           C980 520, 1080 540, 1180 520
           C1280 500, 1380 530, 1540 560
           L1540 900 Z"
        fill="#787878"
        opacity="0.5"
      />

      <!-- Layer 3 -->
      <path
        class="mountain-layer"
        d="M-100 900
           L-100 750
           C50 720, 150 700, 280 680
           C400 660, 480 690, 600 660
           C720 630, 820 650, 950 620
           C1080 590, 1180 620, 1300 600
           C1400 580, 1540 610, 1540 610
           L1540 900 Z"
        fill="#5A5A5A"
        opacity="0.7"
      />

      <!-- Layer 2 -->
      <path
        class="mountain-layer"
        d="M-100 900
           L-100 780
           C0 760, 120 740, 250 720
           C380 700, 480 730, 620 700
           C760 670, 880 690, 1020 670
           C1160 650, 1280 680, 1400 660
           C1480 650, 1540 670, 1540 670
           L1540 900 Z"
        fill="#3D3D3D"
        opacity="0.85"
      />

      <!-- Layer 1 - Closest mountains (darkest, most defined) -->
      <path
        class="mountain-layer"
        d="M-100 900
           L-100 820
           C50 800, 150 780, 300 760
           C450 740, 550 770, 700 750
           C850 730, 950 755, 1100 740
           C1250 725, 1350 750, 1540 730
           L1540 900 Z"
        fill="#2A2A2A"
        opacity="1"
      />
    </svg>
  </div>
</template>

<style scoped>
.mountain-layer {
  transition: transform 0.5s ease-out;
}
</style>
