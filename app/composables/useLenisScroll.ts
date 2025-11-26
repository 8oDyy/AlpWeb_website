import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Composable pour gérer Lenis smooth scroll + sync ScrollTrigger
 */
export function useLenisScroll() {
  const lenis = ref<Lenis | null>(null)
  const isReady = ref(false)

  function init() {
    if (import.meta.server) return

    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)

    // Create Lenis instance
    lenis.value = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    // Sync Lenis with ScrollTrigger
    lenis.value.on('scroll', ScrollTrigger.update)

    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.value?.raf(time * 1000)
    })

    // Disable lag smoothing for better sync
    gsap.ticker.lagSmoothing(0)

    // Set ScrollTrigger defaults
    ScrollTrigger.defaults({
      invalidateOnRefresh: true,
    })

    isReady.value = true
  }

  function destroy() {
    if (lenis.value) {
      lenis.value.destroy()
      lenis.value = null
    }
    isReady.value = false
  }

  function scrollTo(target: string | number | HTMLElement, options?: { offset?: number, duration?: number }) {
    lenis.value?.scrollTo(target, {
      offset: options?.offset ?? 0,
      duration: options?.duration ?? 1.2,
    })
  }

  function stop() {
    lenis.value?.stop()
  }

  function start() {
    lenis.value?.start()
  }

  return {
    lenis: readonly(lenis),
    isReady: readonly(isReady),
    init,
    destroy,
    scrollTo,
    stop,
    start,
  }
}
