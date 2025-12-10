import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

interface ScrollytellingRefs {
  container: Ref<HTMLElement | null>
  header: Ref<HTMLElement | null>
  title: Ref<HTMLElement | null>
  subtitle: Ref<HTMLElement | null>
  titleLine: Ref<HTMLElement | null>
  cardsWrapper: Ref<HTMLElement | null>
  cards: Ref<HTMLElement[]>
  icons: Ref<HTMLElement[]>
  cardContents: Ref<HTMLElement[]>
}

interface LenisScrollData {
  velocity: number
  progress: number
  scroll: number
  direction: number
}

/**
 * Premium Scrollytelling for Services Section
 * - Lenis-driven narrative progression
 * - 5 scenes: intro + 4 service cards
 * - Scroll-synchronized animations
 * - Velocity-reactive micro-interactions
 */
export function useServicesScrollytelling() {
  const { $lenis } = useNuxtApp()
  const lenis = $lenis as Lenis | undefined

  let ctx: gsap.Context | null = null
  let mainTimeline: gsap.core.Timeline | null = null
  const triggers: ScrollTrigger[] = []

  // Reactive state
  const currentScene = ref(0)
  const scrollProgress = ref(0)
  const scrollVelocity = ref(0)
  const isInSection = ref(false)

  function init(refs: ScrollytellingRefs) {
    if (import.meta.server) return
    if (!refs.container.value) return

    gsap.registerPlugin(ScrollTrigger)

    // Delay initialization to ensure previous pinned sections (Showcase) are set up first
    setTimeout(() => {
      // Re-check container after timeout
      const container = refs.container.value
      if (!container) return

      // Refresh ScrollTrigger to get accurate positions after Showcase pin
      ScrollTrigger.refresh()

      ctx = gsap.context(() => {
        // Setup Lenis velocity tracking
        setupLenisTracking(refs)

        // Create the main scrollytelling timeline
        createScrollytellingTimeline(refs)

        // Setup velocity-reactive micro-interactions
        setupVelocityReactions(refs)
      }, container)
    }, 200)
  }

  function setupLenisTracking(refs: ScrollytellingRefs) {
    if (!lenis) return

    lenis.on('scroll', (data: LenisScrollData) => {
      scrollVelocity.value = data.velocity

      // Check if we're in the services section
      if (refs.container.value) {
        const rect = refs.container.value.getBoundingClientRect()
        isInSection.value = rect.top < window.innerHeight && rect.bottom > 0
      }
    })
  }

  function createScrollytellingTimeline(refs: ScrollytellingRefs) {
    if (!refs.container.value) return

    const container = refs.container.value
    const cards = refs.cards.value
    const icons = refs.icons.value
    const cardContents = refs.cardContents.value

    // Set initial states
    setInitialStates(refs)

    // Main timeline pinned to section
    // Start when section top reaches viewport top (after Showcase is fully scrolled past)
    mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${window.innerHeight * 3}`,
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgress.value = self.progress
          currentScene.value = Math.floor(self.progress * 5)
        },
      },
    })

    if (mainTimeline.scrollTrigger) {
      triggers.push(mainTimeline.scrollTrigger)
    }

    // ═══════════════════════════════════════════════════════
    // SCENE 0: Introduction (0% - 20%)
    // ═══════════════════════════════════════════════════════
    const title = refs.title.value
    const titleLine = refs.titleLine.value
    const subtitle = refs.subtitle.value

    if (title) {
      mainTimeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.15,
        ease: 'power2.out',
      }, 0)
    }

    if (titleLine) {
      mainTimeline.to(titleLine, {
        scaleX: 1,
        duration: 0.1,
        ease: 'power2.out',
      }, 0.05)
    }

    if (subtitle) {
      mainTimeline.to(subtitle, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        duration: 0.1,
        ease: 'power2.out',
      }, 0.08)
    }

    if (cards.length > 0) {
      mainTimeline.to(cards, {
        opacity: 0.4,
        y: 0,
        scale: 0.95,
        filter: 'blur(2px)',
        duration: 0.1,
        stagger: 0.02,
        ease: 'power2.out',
      }, 0.1)
    }

    // ═══════════════════════════════════════════════════════
    // SCENE 1: Card 1 Focus (20% - 40%)
    // ═══════════════════════════════════════════════════════
    if (cards[0]) {
      const card0 = cards[0] as HTMLElement
      const icon0 = icons[0]
      const content0 = cardContents[0]
      const others1 = [cards[1], cards[2], cards[3]].filter((el): el is HTMLElement => !!el)

      mainTimeline
        // Card 1 comes into focus
        .to(card0, {
          opacity: 1,
          scale: 1.02,
          filter: 'blur(0px)',
          zIndex: 10,
          duration: 0.15,
          ease: 'power2.out',
        }, 0.2)
        // Other cards shift and dim
        .to(others1, {
          opacity: 0.25,
          x: i => (i % 2 === 0 ? 20 : -20),
          scale: 0.92,
          filter: 'blur(3px)',
          duration: 0.15,
          ease: 'power2.out',
        }, 0.2)

      if (icon0) {
        mainTimeline.to(icon0, {
          y: -8,
          rotation: 2,
          duration: 0.15,
          ease: 'power1.out',
        }, 0.22)
      }

      if (content0) {
        mainTimeline.to(content0, {
          opacity: 1,
          y: 0,
          duration: 0.1,
          ease: 'power2.out',
        }, 0.25)
      }
    }

    // ═══════════════════════════════════════════════════════
    // SCENE 2: Card 2 Focus (40% - 60%)
    // ═══════════════════════════════════════════════════════
    if (cards[1]) {
      const card0 = cards[0]
      const icon0 = icons[0]
      const card1 = cards[1]
      const icon1 = icons[1]
      const content1 = cardContents[1]
      const others2 = [cards[2], cards[3]].filter((el): el is HTMLElement => !!el)

      if (card0) {
        mainTimeline.to(card0, {
          opacity: 0.25,
          scale: 0.92,
          filter: 'blur(3px)',
          x: -30,
          zIndex: 1,
          duration: 0.15,
          ease: 'power2.inOut',
        }, 0.4)
      }

      if (icon0) {
        mainTimeline.to(icon0, { y: 0, rotation: 0, duration: 0.1 }, 0.4)
      }

      if (card1) {
        mainTimeline.to(card1, {
          opacity: 1,
          scale: 1.02,
          filter: 'blur(0px)',
          x: 0,
          zIndex: 10,
          duration: 0.15,
          ease: 'power2.out',
        }, 0.4)
      }

      if (icon1) {
        mainTimeline.to(icon1, { y: -10, rotation: -2, duration: 0.15, ease: 'power1.out' }, 0.42)
      }

      if (content1) {
        mainTimeline.to(content1, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.45)
      }

      if (others2.length) {
        mainTimeline.to(others2, { x: 15, duration: 0.15 }, 0.4)
      }
    }

    // ═══════════════════════════════════════════════════════
    // SCENE 3: Card 3 Focus (60% - 80%)
    // ═══════════════════════════════════════════════════════
    if (cards[2]) {
      const card1 = cards[1]
      const icon1 = icons[1]
      const card2 = cards[2]
      const icon2 = icons[2]
      const content2 = cardContents[2]
      const card3 = cards[3]

      if (card1) {
        mainTimeline.to(card1, {
          opacity: 0.25,
          scale: 0.92,
          filter: 'blur(3px)',
          x: -30,
          zIndex: 1,
          duration: 0.15,
          ease: 'power2.inOut',
        }, 0.6)
      }

      if (icon1) {
        mainTimeline.to(icon1, { y: 0, rotation: 0, duration: 0.1 }, 0.6)
      }

      if (card2) {
        mainTimeline.to(card2, {
          opacity: 1,
          scale: 1.02,
          filter: 'blur(0px)',
          x: 0,
          zIndex: 10,
          duration: 0.15,
          ease: 'power2.out',
        }, 0.6)
      }

      if (icon2) {
        mainTimeline.to(icon2, { y: -12, rotation: 3, scale: 1.05, duration: 0.15, ease: 'power1.out' }, 0.62)
      }

      if (content2) {
        mainTimeline.to(content2, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.65)
      }

      if (card3) {
        mainTimeline.to(card3, { x: 10, opacity: 0.3, duration: 0.15 }, 0.6)
      }
    }

    // ═══════════════════════════════════════════════════════
    // SCENE 4: Card 4 Focus - Closing (80% - 100%)
    // ═══════════════════════════════════════════════════════
    if (cards[3]) {
      const card2 = cards[2]
      const icon2 = icons[2]
      const card3 = cards[3]
      const icon3 = icons[3]
      const content3 = cardContents[3]
      const underlineEl = card3?.querySelector('.card-underline') as HTMLElement | null

      if (card2) {
        mainTimeline.to(card2, {
          opacity: 0.25,
          scale: 0.92,
          filter: 'blur(3px)',
          x: -30,
          zIndex: 1,
          duration: 0.15,
          ease: 'power2.inOut',
        }, 0.8)
      }

      if (icon2) {
        mainTimeline.to(icon2, { y: 0, rotation: 0, scale: 1, duration: 0.1 }, 0.8)
      }

      if (card3) {
        mainTimeline.to(card3, {
          opacity: 1,
          scale: 1.03,
          filter: 'blur(0px) brightness(1.02)',
          x: 0,
          zIndex: 10,
          duration: 0.15,
          ease: 'power2.out',
        }, 0.8)
      }

      if (icon3) {
        mainTimeline.to(icon3, { y: -6, rotation: -1, duration: 0.15, ease: 'sine.out' }, 0.82)
      }

      if (content3) {
        mainTimeline.to(content3, { opacity: 1, y: 0, duration: 0.12, ease: 'power2.out' }, 0.85)
      }

      if (underlineEl) {
        mainTimeline.to(underlineEl, { scaleX: 1, duration: 0.1, ease: 'power2.out' }, 0.9)
      }
    }
  }

  function setInitialStates(refs: ScrollytellingRefs) {
    // Header elements - override CSS classes with GSAP for animation control
    if (refs.title.value) {
      gsap.set(refs.title.value, { opacity: 0, y: 30, clearProps: 'transform' })
    }
    if (refs.titleLine.value) {
      gsap.set(refs.titleLine.value, { scaleX: 0, transformOrigin: 'center center' })
    }
    if (refs.subtitle.value) {
      gsap.set(refs.subtitle.value, { opacity: 0, x: -20, filter: 'blur(4px)' })
    }

    // Cards - override CSS classes
    refs.cards.value.forEach((card) => {
      gsap.set(card, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        filter: 'blur(3px)',
        clearProps: 'transform',
      })
    })

    // Icons
    refs.icons.value.forEach((icon) => {
      gsap.set(icon, { y: 0, rotation: 0, scale: 1 })
    })

    // Card contents (for staggered reveal)
    refs.cardContents.value.forEach((content) => {
      gsap.set(content, { opacity: 0.8, y: 8 })
    })
  }

  function setupVelocityReactions(refs: ScrollytellingRefs) {
    // Watch velocity changes and apply micro-interactions
    watch(scrollVelocity, (velocity) => {
      if (!isInSection.value) return

      const absVelocity = Math.abs(velocity)
      const activeCardIndex = Math.min(Math.floor(scrollProgress.value * 4), 3)
      const activeIcon = refs.icons.value[activeCardIndex]

      if (activeIcon && absVelocity > 0.5) {
        // Velocity-reactive icon movement
        const intensityMultiplier = Math.min(absVelocity / 3, 1.5)

        gsap.to(activeIcon, {
          y: -8 * intensityMultiplier,
          rotation: velocity > 0 ? 2 * intensityMultiplier : -2 * intensityMultiplier,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      }
    })

    // On scroll stop - subtle breathing effect
    let scrollStopTimeout: ReturnType<typeof setTimeout> | null = null

    watch(scrollVelocity, (velocity) => {
      if (scrollStopTimeout) clearTimeout(scrollStopTimeout)

      if (Math.abs(velocity) < 0.1 && isInSection.value) {
        scrollStopTimeout = setTimeout(() => {
          const activeCardIndex = Math.min(Math.floor(scrollProgress.value * 4), 3)
          const activeIcon = refs.icons.value[activeCardIndex]
          const activeCard = refs.cards.value[activeCardIndex]

          if (activeIcon) {
            gsap.to(activeIcon, {
              scale: 1.03,
              duration: 1.2,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: 1,
            })
          }

          if (activeCard) {
            gsap.to(activeCard, {
              filter: 'blur(0px) brightness(1.03)',
              duration: 0.8,
              ease: 'sine.inOut',
              yoyo: true,
              repeat: 1,
            })
          }
        }, 200)
      }
    })
  }

  function destroy() {
    // Kill all ScrollTriggers
    triggers.forEach(trigger => trigger.kill())
    triggers.length = 0

    // Kill timeline
    mainTimeline?.kill()
    mainTimeline = null

    // Kill context
    ctx?.revert()
    ctx = null
  }

  return {
    init,
    destroy,
    currentScene: readonly(currentScene),
    scrollProgress: readonly(scrollProgress),
    isInSection: readonly(isInSection),
  }
}
