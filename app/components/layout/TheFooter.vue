<script setup lang="ts">
const currentYear = new Date().getFullYear()

const footerLinks = {
  navigation: [
    { label: 'Accueil', href: '/' },
    { label: 'Services', href: '#services' },
    { label: 'Réalisations', href: '#showcase' },
    { label: 'Contact', href: '#contact' },
  ],
  services: [
    { label: 'Sites vitrines', href: '#' },
    { label: 'Applications iOS', href: '#' },
    { label: 'Dashboards', href: '#' },
    { label: 'Hébergement', href: '#' },
  ],
  legal: [
    { label: 'Mentions légales', href: '/mentions-legales' },
    { label: 'Politique de confidentialité', href: '/confidentialite' },
  ],
}

const socialLinks = [
  { icon: 'lucide:linkedin', href: '#', label: 'LinkedIn' },
  { icon: 'lucide:github', href: '#', label: 'GitHub' },
  { icon: 'lucide:twitter', href: '#', label: 'Twitter' },
]
</script>

<template>
  <footer class="bg-alp-black text-cream">
    <div class="container-alp section-padding">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <h3 class="text-2xl font-bold font-display mb-4">
            AlpWeb
          </h3>
          <p class="text-cream/70 mb-6 max-w-xs">
            Agence web spécialisée dans la création de sites vitrines premium et d'applications sur-mesure.
          </p>
          <!-- Social Links -->
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :aria-label="social.label"
              class="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-cream/20 transition-colors"
            >
              <Icon
                :name="social.icon"
                class="w-5 h-5"
              />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h4 class="font-semibold font-display mb-4">
            Navigation
          </h4>
          <ul class="space-y-3">
            <li
              v-for="link in footerLinks.navigation"
              :key="link.label"
            >
              <NuxtLink
                :to="link.href"
                class="text-cream/70 hover:text-cream transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h4 class="font-semibold font-display mb-4">
            Services
          </h4>
          <ul class="space-y-3">
            <li
              v-for="link in footerLinks.services"
              :key="link.label"
            >
              <NuxtLink
                :to="link.href"
                class="text-cream/70 hover:text-cream transition-colors"
              >
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-semibold font-display mb-4">
            Contact
          </h4>
          <ul class="space-y-3 text-cream/70">
            <li class="flex items-center gap-2">
              <Icon
                name="lucide:mail"
                class="w-4 h-4"
              />
              <a
                href="mailto:contact@alpweb.fr"
                class="hover:text-cream transition-colors"
              >
                contact@alpweb.fr
              </a>
            </li>
            <li class="flex items-center gap-2">
              <Icon
                name="lucide:map-pin"
                class="w-4 h-4"
              />
              <span>France</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-cream/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-cream/50 text-sm">
          © {{ currentYear }} AlpWeb. Tous droits réservés.
        </p>
        <div class="flex gap-6">
          <NuxtLink
            v-for="link in footerLinks.legal"
            :key="link.label"
            :to="link.href"
            class="text-cream/50 text-sm hover:text-cream/70 transition-colors"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
