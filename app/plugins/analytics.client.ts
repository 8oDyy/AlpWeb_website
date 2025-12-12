/**
 * Analytics Plugin (Client-side only)
 * Loads analytics scripts conditionally based on environment variables
 * Supports: Google Analytics (gtag), Plausible
 */

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const provider = config.public.analyticsProvider as string
  const env = config.public.env as string

  // Don't load analytics in development or preview
  if (env === 'development' || env === 'preview') {
    console.log('[Analytics] Disabled in', env, 'environment')
    return
  }

  // No provider configured
  if (!provider) {
    return
  }

  switch (provider) {
    case 'gtag':
      loadGoogleAnalytics(config.public.gtagId as string)
      break
    case 'plausible':
      loadPlausible(config.public.plausibleDomain as string)
      break
    default:
      console.warn('[Analytics] Unknown provider:', provider)
  }
})

/**
 * Load Google Analytics (gtag.js)
 */
function loadGoogleAnalytics(gtagId: string) {
  if (!gtagId) {
    console.warn('[Analytics] GTAG ID not configured')
    return
  }

  // Load gtag.js script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  gtag('js', new Date())
  gtag('config', gtagId, {
    anonymize_ip: true, // GDPR compliance
    cookie_flags: 'SameSite=None;Secure',
  })

  // Make gtag available globally
  window.gtag = gtag

  console.log('[Analytics] Google Analytics loaded:', gtagId)
}

/**
 * Load Plausible Analytics
 */
function loadPlausible(domain: string) {
  if (!domain) {
    console.warn('[Analytics] Plausible domain not configured')
    return
  }

  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)

  console.log('[Analytics] Plausible loaded for:', domain)
}

// Type declarations for global window
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}
