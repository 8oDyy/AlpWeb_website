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
 * - Texte stagger slide-up à l'entrée
 * - Parallax montagnes au scroll
 * - Fade out au scroll
 */
export function useHeroAnimations() {
  let ctx: gsap.Context | null = null

  function init(options: HeroAnimationOptions) {
    if (import.meta.server) return
    if (!options.heroRef.value) return

    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      const { heroRef, logoRef, contentRef, mountainLayers } = options

      // --- Intro Animation Timeline ---
      const enterTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // 1. Logo Stroke Drawing
      if (logoRef.value) {
        const logoText = logoRef.value.querySelector('.logo-text')
        if (logoText) {
          gsap.set(logoText, {
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            fill: 'transparent'
          })

          enterTl.to(logoText, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: 'power2.inOut'
          })
          .to(logoText, {
            fill: '#1A1A1A',
            duration: 1,
            ease: 'power2.out'
          }, '-=0.5')
        }
      }

      // 2. Content Stagger
      if (contentRef.value) {
        const elements = contentRef.value.querySelectorAll('[data-animate]')
        enterTl.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
        }, '-=1')
      }

      // --- Scroll Animations ---

      // 3. Parallax Montagnes
      if (mountainLayers.value.length > 0) {
        mountainLayers.value.forEach((layer, i) => {
          const speed = (i + 1) * 30
          
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

      // 4. Pin & Scale Down Exit Effect (Scrollytelling enhanced)
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.value,
          start: 'top top',
          end: '+=120%', // Longer pin for better storytelling
          pin: true,
          scrub: 0.5, // Add smoothness
          anticipatePin: 1,
        }
      })

      if (contentRef.value) {
        // Content scales down and moves up slightly, simulating depth
        exitTl.to(contentRef.value, {
          scale: 0.8,
          opacity: 0,
          y: -100,
          ease: 'power2.inOut',
          duration: 0.8 // Leaves a bit of time at the end
        }, 0)
      }

      if (mountainLayers.value.length > 0) {
        // Mountains separate: closest layers move down, furthest move up
        mountainLayers.value.forEach((layer, i) => {
          const direction = i % 2 === 0 ? 1 : -1
          const distance = 50 + (i * 20)
          
          exitTl.to(layer, {
            y: `+=${distance * direction}`,
            scale: 1.1,
            opacity: 0,
            ease: 'power1.inOut',
            duration: 1
          }, 0)
        })
      }

      // 5. Scroll Indicator Fade
      const scrollIndicator = heroRef.value?.querySelector('[data-scroll-indicator]')
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          scrollTrigger: {
            trigger: heroRef.value,
            start: 'top top',
            end: '10% top',
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
