import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface HeroAnimationOptions {
  heroRef: Ref<HTMLElement | null>
  logoRef: Ref<HTMLElement | null>
  contentRef: Ref<HTMLElement | null>
  mountainLayers: Ref<HTMLElement[]>
}

/**
 * Composable pour les animations du Hero Section
 * - Logo stroke-drawing
 * - Texte stagger slide-up
 * - Parallax montagnes
 * - Pin + scale-down à la sortie
 */
export function useHeroAnimations() {
  let ctx: gsap.Context | null = null

  function init(options: HeroAnimationOptions) {
    if (import.meta.server) return
    if (!options.heroRef.value) return

    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      const { heroRef, logoRef, contentRef, mountainLayers } = options

      // Timeline d'entrée
      const enterTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // 1. Logo animation (fade + scale)
      if (logoRef.value) {
        enterTl.from(logoRef.value, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
        })
      }

      // 2. Content stagger (eyebrow, title, baseline, description, buttons)
      if (contentRef.value) {
        const elements = contentRef.value.querySelectorAll('[data-animate]')
        enterTl.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
        }, '-=0.5')
      }

      // 3. Parallax montagnes au scroll
      if (mountainLayers.value.length > 0) {
        mountainLayers.value.forEach((layer, i) => {
          const speed = (mountainLayers.value.length - i) * 30 // Plus proche = plus rapide
          gsap.to(layer, {
            y: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.value,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      }

      // 4. Hero pin + exit animation
      ScrollTrigger.create({
        trigger: heroRef.value,
        pin: true,
        start: 'top top',
        end: '+=30%',
        pinSpacing: true,
      })

      // 5. Scale-down + fade à la sortie
      gsap.to(heroRef.value, {
        scale: 0.95,
        opacity: 0.8,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'bottom bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // 6. Scroll indicator fade out
      const scrollIndicator = heroRef.value?.querySelector('[data-scroll-indicator]')
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          y: -20,
          scrollTrigger: {
            trigger: heroRef.value,
            start: 'top top',
            end: '+=100',
            scrub: true,
          },
        })
      }
    }, options.heroRef.value)
  }

  function destroy() {
    ctx?.revert()
    ctx = null
  }

  return {
    init,
    destroy,
  }
}
