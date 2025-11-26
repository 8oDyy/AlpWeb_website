<script setup lang="ts">
/**
 * CTA Section
 * - Section simple, centrée
 * - Titre fort + bouton contact
 */
</script>

<template>
  <section
    id="contact"
    class="bg-alp-black section-padding"
  >
    <div class="container-alp">
      <div class="max-w-3xl mx-auto text-center">
        <!-- Title -->
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-cream mb-6">
          Prêt à lancer votre projet ?
        </h2>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-cream/70 mb-10 max-w-xl mx-auto">
          Discutons de vos besoins et voyons comment AlpWeb peut vous accompagner.
        </p>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
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
        <div class="mt-12 pt-8 border-t border-cream/10">
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
