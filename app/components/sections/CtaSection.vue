<script setup lang="ts">
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * CTA Section
 * - Section simple, centrée
 * - Reveal animation
 */

const sectionRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (import.meta.server) return

  gsap.registerPlugin(ScrollTrigger)

  nextTick(() => {
    if (!sectionRef.value || !contentRef.value) return

    ctx = gsap.context(() => {
      const elements = contentRef.value!.querySelectorAll('[data-cta-animate]')
      gsap.from(elements, {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.value,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }, sectionRef.value)
  })
})

onUnmounted(() => {
  ctx?.revert()
})
</script>

<template>
  <section
    id="contact"
    ref="sectionRef"
    class="bg-alp-black section-padding"
  >
    <div class="container-alp">
      <div
        ref="contentRef"
        class="max-w-3xl mx-auto text-center"
      >
        <!-- Title -->
        <h2
          data-cta-animate
          class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-cream mb-6"
        >
          Prêt à lancer votre projet ?
        </h2>

        <!-- Subtitle -->
        <p
          data-cta-animate
          class="text-lg md:text-xl text-cream/70 mb-10 max-w-xl mx-auto"
        >
          Discutons de vos besoins et voyons comment AlpWeb peut vous accompagner.
        </p>

        <!-- CTA Buttons -->
        <div
          data-cta-animate
          class="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <UButton
            size="xl"
            color="neutral"
            variant="solid"
            class="bg-cream text-alp-black hover:bg-cream-dark px-8"
          >
            <Icon
              name="lucide:mail"
              class="w-5 h-5 mr-2"
            />
            Nous contacter
          </UButton>
          <UButton
            size="xl"
            variant="outline"
            class="border-cream/30 text-cream hover:bg-cream/10 px-8"
          >
            <Icon
              name="lucide:calendar"
              class="w-5 h-5 mr-2"
            />
            Prendre rendez-vous
          </UButton>
        </div>

        <!-- Contact Info -->
        <div
          data-cta-animate
          class="mt-12 pt-8 border-t border-cream/10"
        >
          <p class="text-cream/50 text-sm">
            Ou écrivez-nous directement à
            <a
              href="mailto:contact@alpweb.fr"
              class="text-cream hover:underline"
            >
              contact@alpweb.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
