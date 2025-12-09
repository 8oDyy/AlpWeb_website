import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ProcessTimelineOptions {
  sectionRef: Ref<HTMLElement | null>
  lineRef: Ref<HTMLElement | null>
  stepsRef: Ref<HTMLElement[]>
}

/**
 * Composable pour l'animation de la timeline du Process
 * - Ligne qui se remplit au scroll
 * - Étapes qui s'allument progressivement
 * - Icônes avec bounce discret
 */
export function useProcessTimeline() {
  let ctx: gsap.Context | null = null

  function init(options: ProcessTimelineOptions) {
    if (import.meta.server) return
    if (!options.sectionRef.value) return

    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      const { sectionRef, lineRef, stepsRef } = options

      // Animation de la ligne de timeline
      if (lineRef.value) {
        gsap.fromTo(lineRef.value,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.value,
              start: 'top 60%',
              end: 'bottom 40%',
              scrub: true,
            },
          },
        )
      }

      // Animation des étapes
      if (stepsRef.value.length > 0) {
        stepsRef.value.forEach((step) => {
          // Fade in + translate
          gsap.from(step, {
            opacity: 0.3,
            y: 30,
            duration: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          })

          // Numéro avec scale
          const number = step.querySelector('[data-step-number]')
          if (number) {
            gsap.from(number, {
              scale: 0.5,
              opacity: 0,
              duration: 0.4,
              delay: 0.1,
              ease: 'back.out(1.7)',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            })
          }

          // Icône avec bounce
          const icon = step.querySelector('[data-step-icon]')
          if (icon) {
            gsap.from(icon, {
              scale: 0,
              rotation: -15,
              duration: 0.5,
              delay: 0.2,
              ease: 'back.out(2)',
              scrollTrigger: {
                trigger: step,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            })
          }
        })
      }
    }, options.sectionRef.value)
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
