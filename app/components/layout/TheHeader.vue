<script setup lang="ts">
import type Lenis from 'lenis'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Réalisations', href: '#showcase' },
  { label: 'Process', href: '#process' },
  { label: 'Stack', href: '#stack' },
]

const isMobileMenuOpen = ref(false)

// Header states
const showFullHeader = ref(true)
const showCompactHeader = ref(false)

// Use Lenis for smooth scroll detection
const { $lenis } = useNuxtApp()
const lenis = $lenis as Lenis | undefined

onMounted(() => {
  // Get hero section height
  const getHeroHeight = () => {
    const hero = document.getElementById('hero') || document.querySelector('[class*="ChapterHero"]')
    return hero?.offsetHeight || window.innerHeight
  }

  if (lenis) {
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      const heroHeight = getHeroHeight()
      const heroThreshold = heroHeight * 0.7 // 70% du hero

      // Full header visible only at top of page
      showFullHeader.value = scroll < heroThreshold

      // Compact header appears after hero section
      showCompactHeader.value = scroll >= heroHeight
    })
  }
  else {
    // Fallback for non-Lenis scroll
    const handleScroll = () => {
      const heroHeight = getHeroHeight()
      const heroThreshold = heroHeight * 0.7
      const scroll = window.scrollY

      showFullHeader.value = scroll < heroThreshold
      showCompactHeader.value = scroll >= heroHeight
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })
  }
})
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50">
    <!-- Full navbar (visible dans le Hero) -->
    <div
      class="header-full absolute inset-0 bg-cream/80 backdrop-blur-md border-b border-cream-dark transition-all duration-500 ease-out"
      :class="{
        'opacity-100 translate-y-0': showFullHeader,
        'opacity-0 -translate-y-full pointer-events-none': !showFullHeader,
      }"
    >
      <nav class="container-alp py-4">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/"
            class="flex items-center gap-2"
          >
            <span class="text-2xl font-bold font-display text-alp-black">
              AlpWeb
            </span>
          </NuxtLink>

          <div class="hidden md:flex items-center gap-8">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.href"
              :to="link.href"
              class="text-alp-black-soft hover:text-alp-black transition-colors font-medium"
            >
              {{ link.label }}
            </NuxtLink>
          </div>

          <div class="hidden md:block">
            <UiAlpButton
              size="md"
              variant="primary"
            >
              Parlons de votre projet
            </UiAlpButton>
          </div>

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
              class="text-alp-black-soft hover:text-alp-black transition-colors font-medium py-2"
              @click="isMobileMenuOpen = false"
            >
              {{ link.label }}
            </NuxtLink>
            <UiAlpButton
              size="md"
              variant="primary"
              class="w-full mt-2"
            >
              Parlons de votre projet
            </UiAlpButton>
          </div>
        </div>
      </nav>
    </div>

    <!-- Compact navbar (visible après le Hero) -->
    <div
      class="header-compact absolute inset-x-0 top-0 transition-all duration-500 ease-out"
      :class="{
        'opacity-100 translate-y-0': showCompactHeader,
        'opacity-0 -translate-y-4 pointer-events-none': !showCompactHeader,
      }"
    >
      <div class="container-alp">
        <nav class="py-3 px-6 bg-cream/70 backdrop-blur-md rounded-b-2xl shadow-sm">
          <div class="flex items-center justify-between">
            <!-- Logo plus visible -->
            <NuxtLink
              to="/"
              class="group"
            >
              <span class="text-base font-semibold font-display text-alp-black/80 hover:text-alp-black transition-colors duration-300">
                AlpWeb
              </span>
            </NuxtLink>

            <!-- Navigation links -->
            <div class="hidden md:flex items-center gap-6">
              <NuxtLink
                v-for="link in navLinks"
                :key="link.href"
                :to="link.href"
                class="nav-link relative text-sm text-alp-black/50 hover:text-alp-black transition-colors duration-300"
              >
                {{ link.label }}
                <span class="nav-underline" />
              </NuxtLink>
            </div>

            <!-- CTA discret -->
            <div class="hidden md:block">
              <NuxtLink
                to="#contact"
                class="text-sm font-medium text-alp-black/60 hover:text-alp-black border border-alp-black/20 hover:border-alp-black/40 px-4 py-1.5 rounded-full transition-all duration-300"
              >
                Nous contacter
              </NuxtLink>
            </div>

            <button
              class="md:hidden p-2"
              aria-label="Menu"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <Icon
                :name="isMobileMenuOpen ? 'lucide:x' : 'lucide:menu'"
                class="w-5 h-5 text-alp-black/50"
              />
            </button>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  position: relative;
}

.nav-underline {
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transform-origin: right center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-link:hover .nav-underline {
  transform: scaleX(1);
  transform-origin: left center;
}

/* Fade transition for CTA/Contact switch */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(5px);
}
</style>
