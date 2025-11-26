import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger)

  // Create Lenis instance
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 2,
  })

  // Sync Lenis with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  // Add Lenis to GSAP ticker for smooth sync
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Disable lag smoothing for better performance
  gsap.ticker.lagSmoothing(0)

  // Set ScrollTrigger defaults
  ScrollTrigger.defaults({
    invalidateOnRefresh: true,
  })

  return {
    provide: {
      lenis,
    },
  }
})
