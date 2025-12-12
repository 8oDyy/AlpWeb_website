<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

// SEO
useSeo({
  title: 'Contact',
  description: 'Contactez AlpWeb pour discuter de votre projet web. Nous sommes à votre écoute pour créer votre site vitrine, application iOS ou dashboard sur-mesure.',
})

// Schema.org - LocalBusiness for contact page
useSchemaLocalBusiness({
  address: {
    addressLocality: 'France', // TODO: Update with real address
    addressCountry: 'FR',
  },
})

// Breadcrumb
useSchemaBreadcrumb({
  items: [
    { name: 'Accueil', url: 'https://alp-web.com/' },
    { name: 'Contact', url: 'https://alp-web.com/contact' },
  ],
})

// Form state
const form = reactive({
  name: '',
  email: '',
  company: '',
  phone: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const subjects = [
  'Site vitrine',
  'Application iOS',
  'Dashboard sur-mesure',
  'Hébergement & Maintenance',
  'Autre',
]

async function handleSubmit() {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // TODO: Implement form submission (API endpoint or email service)
    // For now, simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    isSubmitted.value = true
    // Reset form
    Object.assign(form, {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
    })
  }
  catch {
    errorMessage.value = 'Une erreur est survenue. Veuillez réessayer.'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="container-alp py-32">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold font-display mb-6">
          Contactez-nous
        </h1>
        <p class="text-xl text-alp-black-muted max-w-2xl mx-auto">
          Vous avez un projet en tête ? Parlons-en ! Nous vous répondons sous 24h.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <!-- Contact Info -->
        <div class="lg:col-span-1 space-y-8">
          <div>
            <h2 class="text-lg font-semibold font-display mb-4">
              Coordonnées
            </h2>
            <ul class="space-y-4 text-alp-black-muted">
              <li class="flex items-start gap-3">
                <Icon
                  name="lucide:mail"
                  class="w-5 h-5 mt-0.5 flex-shrink-0"
                />
                <a
                  href="mailto:contact@alpweb.fr"
                  class="hover:text-alp-black transition-colors"
                >
                  contact@alpweb.fr
                </a>
              </li>
              <li class="flex items-start gap-3">
                <Icon
                  name="lucide:map-pin"
                  class="w-5 h-5 mt-0.5 flex-shrink-0"
                />
                <span>France</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-lg font-semibold font-display mb-4">
              Suivez-nous
            </h2>
            <div class="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                class="p-2 bg-alp-black/5 rounded-lg hover:bg-alp-black/10 transition-colors"
              >
                <Icon
                  name="lucide:linkedin"
                  class="w-5 h-5"
                />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                class="p-2 bg-alp-black/5 rounded-lg hover:bg-alp-black/10 transition-colors"
              >
                <Icon
                  name="lucide:github"
                  class="w-5 h-5"
                />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                class="p-2 bg-alp-black/5 rounded-lg hover:bg-alp-black/10 transition-colors"
              >
                <Icon
                  name="lucide:twitter"
                  class="w-5 h-5"
                />
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-2">
          <div
            v-if="isSubmitted"
            class="p-8 bg-green-50 border border-green-200 rounded-2xl text-center"
          >
            <Icon
              name="lucide:check-circle"
              class="w-12 h-12 text-green-600 mx-auto mb-4"
            />
            <h3 class="text-xl font-semibold font-display mb-2">
              Message envoyé !
            </h3>
            <p class="text-alp-black-muted">
              Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
            </p>
            <button
              class="mt-6 text-sm text-alp-black underline hover:no-underline"
              @click="isSubmitted = false"
            >
              Envoyer un autre message
            </button>
          </div>

          <form
            v-else
            class="space-y-6"
            @submit.prevent="handleSubmit"
          >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium mb-2"
                >
                  Nom complet <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  autocomplete="name"
                  class="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-alp-black/20 focus:border-alp-black transition-colors"
                  placeholder="Votre nom"
                >
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium mb-2"
                >
                  Email <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  autocomplete="email"
                  class="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-alp-black/20 focus:border-alp-black transition-colors"
                  placeholder="votre@email.com"
                >
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  for="company"
                  class="block text-sm font-medium mb-2"
                >
                  Entreprise
                </label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  autocomplete="organization"
                  class="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-alp-black/20 focus:border-alp-black transition-colors"
                  placeholder="Votre entreprise"
                >
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium mb-2"
                >
                  Téléphone
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  autocomplete="tel"
                  class="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-alp-black/20 focus:border-alp-black transition-colors"
                  placeholder="06 00 00 00 00"
                >
              </div>
            </div>

            <div>
              <label
                for="subject"
                class="block text-sm font-medium mb-2"
              >
                Sujet <span class="text-red-500">*</span>
              </label>
              <select
                id="subject"
                v-model="form.subject"
                required
                class="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-alp-black/20 focus:border-alp-black transition-colors"
              >
                <option
                  value=""
                  disabled
                >
                  Sélectionnez un sujet
                </option>
                <option
                  v-for="subject in subjects"
                  :key="subject"
                  :value="subject"
                >
                  {{ subject }}
                </option>
              </select>
            </div>

            <div>
              <label
                for="message"
                class="block text-sm font-medium mb-2"
              >
                Message <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                class="w-full px-4 py-3 bg-cream-light border border-cream-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-alp-black/20 focus:border-alp-black transition-colors resize-none"
                placeholder="Décrivez votre projet..."
              />
            </div>

            <div
              v-if="errorMessage"
              class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
              role="alert"
            >
              {{ errorMessage }}
            </div>

            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full px-6 py-4 bg-alp-black text-cream font-medium rounded-xl hover:bg-alp-black/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon
                v-if="isSubmitting"
                name="lucide:loader-2"
                class="w-5 h-5 animate-spin"
              />
              {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
            </button>

            <p class="text-xs text-alp-black-muted text-center">
              En soumettant ce formulaire, vous acceptez notre
              <NuxtLink
                to="/confidentialite"
                class="underline hover:no-underline"
              >
                politique de confidentialité
              </NuxtLink>.
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
