import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RevealOptions {
  trigger: HTMLElement
  elements: HTMLElement[] | NodeListOf<Element>
  stagger?: number
  y?: number
  scale?: number
  duration?: number
  start?: string
}

/**
 * Composable pour les animations de reveal des sections
 * - Fade + translateY + scale
 * - Stagger pour les éléments multiples
 */
export function useSectionReveal() {
  let ctx: gsap.Context | null = null
  const triggers: ScrollTrigger[] = []

  function reveal(options: RevealOptions) {
    if (import.meta.server) return
    if (!options.trigger) return

    gsap.registerPlugin(ScrollTrigger)

    const {
      trigger,
      elements,
      stagger = 0.1,
      y = 60,
      scale = 0.95,
      duration = 0.6,
      start = 'top 80%',
    } = options

    const tween = gsap.from(elements, {
      opacity: 0,
      y,
      scale,
      stagger,
      duration,
      ease: 'power2.out',
      scrollTrigger: {
        trigger,
        start,
        toggleActions: 'play none none reverse',
      },
    })

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger)
    }
  }

  function revealCards(containerRef: Ref<HTMLElement | null>, cardSelector: string = '.card-premium') {
    if (import.meta.server) return
    if (!containerRef.value) return

    gsap.registerPlugin(ScrollTrigger)

    const cards = containerRef.value.querySelectorAll(cardSelector)
    if (cards.length === 0) return

    const tween = gsap.from(cards, {
      opacity: 0,
      y: 50,
      scale: 0.95,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    if (tween.scrollTrigger) {
      triggers.push(tween.scrollTrigger)
    }
  }

  function revealText(containerRef: Ref<HTMLElement | null>) {
    if (import.meta.server) return
    if (!containerRef.value) return

    gsap.registerPlugin(ScrollTrigger)

    // Titre
    const title = containerRef.value.querySelector('h2')
    if (title) {
      gsap.from(title, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.value,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    // Sous-titre
    const subtitle = containerRef.value.querySelector('h2 + p')
    if (subtitle) {
      gsap.from(subtitle, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.value,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }
  }

  function destroy() {
    triggers.forEach(trigger => trigger.kill())
    triggers.length = 0
    ctx?.revert()
    ctx = null
  }

  return {
    reveal,
    revealCards,
    revealText,
    destroy,
  }
}
