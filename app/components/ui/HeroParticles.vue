<script setup lang="ts">
/**
 * HeroParticles - Floating particles animation for Hero section
 * Lightweight CSS-only animation with scroll parallax
 */

interface Particle {
  id: number
  size: number
  x: number
  y: number
  delay: number
  duration: number
  opacity: number
  color: string
  speed: number
}

const particleCount = 35

// Color palette - warm accent colors
const colors = [
  '#C4A77D', // Gold/tan
  '#7C8B9A', // Slate blue
  '#8B9A7C', // Sage green
  '#1A1A1A', // Black
  '#A08060', // Bronze
]

// Generate particles only on client to avoid hydration mismatch
const particles = ref<Particle[]>([])
const scrollY = ref(0)
const containerRef = ref<HTMLElement | null>(null)

function handleScroll() {
  scrollY.value = window.scrollY
}

onMounted(() => {
  particles.value = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: 3 + Math.random() * 5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 10 + Math.random() * 8,
    opacity: 0.12 + Math.random() * 0.15,
    color: colors[Math.floor(Math.random() * colors.length)]!,
    speed: 0.2 + Math.random() * 0.6,
  }))

  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div
    ref="containerRef"
    class="absolute inset-0 overflow-hidden pointer-events-none z-0"
  >
    <div
      v-for="particle in particles"
      :key="particle.id"
      class="particle absolute rounded-full animate-fade-in"
      :style="{
        'width': `${particle.size}px`,
        'height': `${particle.size}px`,
        'left': `${particle.x}%`,
        'top': `${particle.y}%`,
        '--particle-opacity': particle.opacity,
        'backgroundColor': particle.color,
        'animationDelay': `${particle.delay * 0.3}s, ${particle.delay}s`,
        'animationDuration': `1.2s, ${particle.duration}s`,
        'transform': `translateY(${scrollY * particle.speed}px)`,
      } as any"
    />
  </div>
</template>

<style scoped>
.particle {
  animation: fade-in 1.5s ease-out forwards, float-drift ease-in-out infinite;
  animation-delay: inherit;
  opacity: 0;
}

.animate-fade-in {
  animation: fade-in 1.5s ease-out forwards, float-drift ease-in-out infinite;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: var(--particle-opacity, 0.2);
    transform: scale(1);
  }
}

@keyframes float-drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(15px, -20px) scale(1.1);
  }
  50% {
    transform: translate(-10px, -35px) scale(0.9);
  }
  75% {
    transform: translate(20px, -15px) scale(1.05);
  }
}
</style>
