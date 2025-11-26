import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Composable for GSAP animations with ScrollTrigger
 */
export function useGsap() {
  // Initialize animations on elements with data-animate attribute
  function initScrollAnimations(container?: HTMLElement | string) {
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('[data-animate]')

      elements.forEach((el) => {
        const animation = el.dataset.animate
        const delay = parseFloat(el.dataset.delay || '0')
        const duration = parseFloat(el.dataset.duration || '1')

        const fromVars: gsap.TweenVars = {
          opacity: 0,
          duration,
          delay,
          ease: 'power3.out',
        }

        switch (animation) {
          case 'fade-up':
            fromVars.y = 50
            break
          case 'fade-down':
            fromVars.y = -50
            break
          case 'fade-left':
            fromVars.x = 50
            break
          case 'fade-right':
            fromVars.x = -50
            break
          case 'scale':
            fromVars.scale = 0.9
            break
        }

        gsap.from(el, {
          ...fromVars,
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, container)

    return ctx
  }

  // Create a pinned section
  function createPinnedSection(
    trigger: string | HTMLElement,
    options?: ScrollTrigger.Vars,
  ) {
    return ScrollTrigger.create({
      trigger,
      pin: true,
      start: 'top top',
      end: '+=100%',
      ...options,
    })
  }

  // Parallax effect
  function createParallax(
    element: string | HTMLElement,
    speed: number = 0.5,
  ) {
    return gsap.to(element, {
      y: () => window.innerHeight * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }

  // Cleanup function
  function killAll() {
    ScrollTrigger.getAll().forEach(st => st.kill())
  }

  return {
    gsap,
    ScrollTrigger,
    initScrollAnimations,
    createPinnedSection,
    createParallax,
    killAll,
  }
}
