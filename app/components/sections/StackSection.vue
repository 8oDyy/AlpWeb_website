<script setup lang="ts">
/**
 * Stack Section
 * - Logos/tags des technos
 * - Micro-animation au hover (à implémenter)
 */

interface TechItem {
  name: string
  icon: string
  category: 'frontend' | 'backend' | 'mobile' | 'infra'
}

const technologies: TechItem[] = [
  // Frontend
  { name: 'Nuxt', icon: 'logos:nuxt-icon', category: 'frontend' },
  { name: 'Vue.js', icon: 'logos:vue', category: 'frontend' },
  { name: 'TypeScript', icon: 'logos:typescript-icon', category: 'frontend' },
  { name: 'Tailwind', icon: 'logos:tailwindcss-icon', category: 'frontend' },
  // Backend
  { name: 'Supabase', icon: 'logos:supabase-icon', category: 'backend' },
  { name: 'PostgreSQL', icon: 'logos:postgresql', category: 'backend' },
  { name: 'Stripe', icon: 'logos:stripe', category: 'backend' },
  { name: 'Node.js', icon: 'logos:nodejs-icon', category: 'backend' },
  // Mobile
  { name: 'Swift', icon: 'logos:swift', category: 'mobile' },
  { name: 'SwiftUI', icon: 'logos:swift', category: 'mobile' },
  // Infra
  { name: 'Vercel', icon: 'logos:vercel-icon', category: 'infra' },
  { name: 'Docker', icon: 'logos:docker-icon', category: 'infra' },
  { name: 'GitHub', icon: 'logos:github-icon', category: 'infra' },
  { name: 'Cloudflare', icon: 'logos:cloudflare-icon', category: 'infra' },
]
</script>

<template>
  <section
    id="stack"
    class="bg-cream section-padding"
  >
    <div class="container-alp">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-alp-black mb-6">
          Notre stack
        </h2>
        <p class="text-lg text-alp-black-muted max-w-2xl mx-auto">
          Des technologies modernes et éprouvées pour des projets robustes et performants.
        </p>
      </div>

      <!-- Tech Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div
          v-for="tech in technologies"
          :key="tech.name"
          class="card-premium p-4 flex flex-col items-center justify-center gap-3 aspect-square"
        >
          <Icon
            :name="tech.icon"
            class="w-10 h-10"
          />
          <span class="text-sm font-medium text-alp-black-soft text-center">
            {{ tech.name }}
          </span>
        </div>
      </div>

      <!-- Trust Badge -->
      <div class="mt-16 text-center">
        <p class="text-alp-black-muted">
          Et bien d'autres selon vos besoins...
        </p>
      </div>
    </div>
  </section>
</template>
