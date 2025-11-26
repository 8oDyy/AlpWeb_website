// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // Modules
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@tresjs/nuxt',
  ],
  devtools: { enabled: true },

  // App configuration
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      title: 'AlpWeb - Agence Web',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AlpWeb - Agence web spécialisée dans la création de sites vitrines modernes et performants.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // Runtime config - values are overridden by env variables at runtime
  // NUXT_PUBLIC_SITE_NAME and NUXT_PUBLIC_SITE_URL
  runtimeConfig: {
    public: {
      siteName: 'AlpWeb',
      siteUrl: 'https://alpweb.fr',
    },
  },
  compatibilityDate: '2025-07-15',

  // ESLint configuration
  eslint: {
    config: {
      stylistic: true,
    },
  },

  // Fonts configuration
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
      { name: 'Manrope', provider: 'google', weights: [300, 400, 500, 600, 700, 800] },
    ],
  },
})
