import { gsap } from 'gsap'

/**
 * Composable pour les micro-interactions premium
 * - Hover cards
 * - Boutons animés
 * - Liens avec underline
 */
export function useMicroInteractions() {
  const listeners: Array<{ el: HTMLElement, type: string, handler: EventListener }> = []

  function addListener(el: HTMLElement, type: string, handler: EventListener) {
    el.addEventListener(type, handler)
    listeners.push({ el, type, handler })
  }

  /**
   * Hover effect pour les cards
   */
  function initCardHover(cards: HTMLElement[] | NodeListOf<Element>) {
    if (import.meta.server) return

    cards.forEach((card) => {
      const el = card as HTMLElement

      const enterHandler = () => {
        gsap.to(el, {
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      const leaveHandler = () => {
        gsap.to(el, {
          scale: 1,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      addListener(el, 'mouseenter', enterHandler)
      addListener(el, 'mouseleave', leaveHandler)
    })
  }

  /**
   * Hover effect pour les boutons
   */
  function initButtonHover(buttons: HTMLElement[] | NodeListOf<Element>) {
    if (import.meta.server) return

    buttons.forEach((button) => {
      const el = button as HTMLElement

      const enterHandler = () => {
        gsap.to(el, {
          scale: 1.05,
          duration: 0.2,
          ease: 'power2.out',
        })
      }

      const leaveHandler = () => {
        gsap.to(el, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
      }

      addListener(el, 'mouseenter', enterHandler)
      addListener(el, 'mouseleave', leaveHandler)
    })
  }

  /**
   * Magnetic effect pour les boutons (suit légèrement le curseur)
   */
  function initMagneticButton(button: HTMLElement, strength: number = 0.3) {
    if (import.meta.server) return

    const moveHandler = (e: Event) => {
      const event = e as MouseEvent
      const rect = button.getBoundingClientRect()
      const x = event.clientX - rect.left - rect.width / 2
      const y = event.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const leaveHandler = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    addListener(button, 'mousemove', moveHandler)
    addListener(button, 'mouseleave', leaveHandler)
  }

  /**
   * Tilt 3D effect pour les cards
   */
  function initTiltEffect(cards: HTMLElement[] | NodeListOf<Element>, maxTilt: number = 5) {
    if (import.meta.server) return

    cards.forEach((card) => {
      const el = card as HTMLElement

      const moveHandler = (e: Event) => {
        const event = e as MouseEvent
        const rect = el.getBoundingClientRect()
        const x = (event.clientX - rect.left) / rect.width - 0.5
        const y = (event.clientY - rect.top) / rect.height - 0.5

        gsap.to(el, {
          rotateY: x * maxTilt,
          rotateX: -y * maxTilt,
          transformPerspective: 1000,
          duration: 0.3,
          ease: 'power2.out',
        })
      }

      const leaveHandler = () => {
        gsap.to(el, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      }

      addListener(el, 'mousemove', moveHandler)
      addListener(el, 'mouseleave', leaveHandler)
    })
  }

  /**
   * Stagger reveal pour les grilles
   */
  function staggerReveal(elements: HTMLElement[] | NodeListOf<Element>, options?: {
    y?: number
    stagger?: number
    duration?: number
  }) {
    if (import.meta.server) return

    const { y = 30, stagger = 0.05, duration = 0.5 } = options || {}

    gsap.from(elements, {
      opacity: 0,
      y,
      stagger,
      duration,
      ease: 'power2.out',
    })
  }

  function destroy() {
    listeners.forEach(({ el, type, handler }) => {
      el.removeEventListener(type, handler)
    })
    listeners.length = 0
  }

  return {
    initCardHover,
    initButtonHover,
    initMagneticButton,
    initTiltEffect,
    staggerReveal,
    destroy,
  }
}
