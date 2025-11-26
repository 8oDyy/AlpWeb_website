<script setup lang="ts">
const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#showcase' },
  { label: 'Process', href: '#process' },
  { label: 'Stack', href: '#stack' },
]

const isMobileMenuOpen = ref(false)
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <div class="bg-cream/80 backdrop-blur-md border-b border-(--color-cream-dark)">
      <nav class="container-alp py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <NuxtLink
            to="/"
            class="flex items-center gap-2"
          >
            <span class="text-2xl font-bold font-display text-alp-black">
              AlpWeb
            </span>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center gap-8">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.href"
              :to="link.href"
              class="text-alp-black-soft hover:text-alp-black transition-colors font-medium link-animated"
            >
              {{ link.label }}
            </NuxtLink>
          </div>

          <!-- CTA Button -->
          <div class="hidden md:block">
            <UButton
              color="neutral"
              variant="solid"
              class="bg-alp-black text-cream hover:bg-linear-to-br hover:from-alp-black hover:to-alp-black-soft transition-all duration-300"
            >
              Parlons de votre projet
            </UButton>
          </div>

          <!-- Mobile Menu Button -->
          <button
            class="md:hidden p-2"
            aria-label="Menu"
            @click="isMobileMenuOpen = !isMobileMenuOpen"
          >
            <Icon
              :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
              class="w-6 h-6 text-alp-black"
            />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div
          v-if="isMobileMenuOpen"
          class="md:hidden pt-4 pb-2"
        >
          <div class="flex flex-col gap-4">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.href"
              :to="link.href"
              class="text-alp-black-soft hover:text-alp-black transition-colors font-medium py-2 link-animated w-fit"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <UButton
              color="neutral"
              variant="solid"
              class="bg-alp-black text-cream hover:bg-alp-black/90 w-full mt-2"
            >
              Parlons de votre projet
            </UButton>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>
