// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/eslint',
    '@tresjs/nuxt',
    'nuxt-site-config',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],

  // Site configuration (for sitemap & SEO)
  site: {
    url: 'https://alp-web.com',
    name: 'AlpWeb',
  },

  // Sitemap configuration
  sitemap: {
    exclude: [
      '/admin/**',
      '/login',
      '/dashboard/**',
      '/debug/**',
    ],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    },
  },

  // Robots configuration
  robots: {
    disallow: ['/admin', '/login', '/dashboard', '/debug', '/api'],
  },

  devtools: { enabled: true },

  // App configuration
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      titleTemplate: '%s | AlpWeb - Agence Web Premium',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'AlpWeb - Agence web spécialisée dans la création de sites vitrines premium, applications iOS et plateformes sur-mesure.' },
        { name: 'theme-color', content: '#1a1a1a' },
        { name: 'author', content: 'AlpWeb' },
        { name: 'robots', content: 'index, follow' },
        { name: 'apple-mobile-web-app-title', content: 'AlpWeb' },
        // OpenGraph defaults
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'AlpWeb' },
        { property: 'og:locale', content: 'fr_FR' },
        { property: 'og:image', content: 'https://alp-web.com/og-image.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        // Twitter defaults
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@alpweb' },
        { name: 'twitter:image', content: 'https://alp-web.com/og-image.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },

  // CSS
  css: ['~/assets/css/main.css'],

  // Runtime config - values are overridden by env variables at runtime
  runtimeConfig: {
    public: {
      siteName: 'AlpWeb',
      siteUrl: 'https://alp-web.com',
      siteDescription: 'Agence web spécialisée dans la création de sites vitrines premium, applications iOS et plateformes sur-mesure.',
      analyticsProvider: '', // 'gtag' | 'plausible' | '' (disabled)
      gtagId: '',
      plausibleDomain: '',
      env: 'production', // 'production' | 'preview' | 'development'
    },
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  // Nitro configuration for headers
  nitro: {
    routeRules: {
      // Cache static assets
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=86400, s-maxage=86400' } },
      // No index for preview environments
      '/**': {
        headers: process.env.NUXT_PUBLIC_ENV === 'preview'
          ? { 'X-Robots-Tag': 'noindex, nofollow' }
          : {},
      },
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
