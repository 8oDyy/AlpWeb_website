<script setup lang="ts">
// Default layout with header and footer
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header slot for navigation -->
    <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <nav class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink
            to="/"
            class="text-2xl font-bold text-gray-900"
          >
            AlpWeb
          </NuxtLink>
          <div class="hidden md:flex items-center gap-8">
            <NuxtLink
              to="/"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Accueil
            </NuxtLink>
            <NuxtLink
              to="/services"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Services
            </NuxtLink>
            <NuxtLink
              to="/projets"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Projets
            </NuxtLink>
            <NuxtLink
              to="/contact"
              class="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </NuxtLink>
          </div>
          <UButton
            color="primary"
            class="hidden md:flex"
          >
            Devis gratuit
          </UButton>
        </div>
      </nav>
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">
              AlpWeb
            </h3>
            <p class="text-gray-400">
              Agence web spécialisée dans la création de sites vitrines modernes et performants.
            </p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">
              Navigation
            </h4>
            <ul class="space-y-2 text-gray-400">
              <li>
                <NuxtLink
                  to="/"
                  class="hover:text-white transition-colors"
                >Accueil</NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/services"
                  class="hover:text-white transition-colors"
                >Services</NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/projets"
                  class="hover:text-white transition-colors"
                >Projets</NuxtLink>
              </li>
              <li>
                <NuxtLink
                  to="/contact"
                  class="hover:text-white transition-colors"
                >Contact</NuxtLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">
              Services
            </h4>
            <ul class="space-y-2 text-gray-400">
              <li>Sites vitrines</li>
              <li>Design UI/UX</li>
              <li>SEO</li>
              <li>Maintenance</li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">
              Contact
            </h4>
            <ul class="space-y-2 text-gray-400">
              <li>contact@alpweb.fr</li>
              <li>+33 1 23 45 67 89</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} AlpWeb. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
