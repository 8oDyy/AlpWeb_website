import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface ShowcaseScrollerOptions {
  wrapperRef: Ref<HTMLElement | null>
  containerRef: Ref<HTMLElement | null>
  slidesRef: Ref<HTMLElement[]>
}

/**
 * Composable pour le scroll horizontal de la section Showcase
 * - Scroll horizontal via scroll vertical
 * - Slides avec fade-in + scale + rotation 3D
 * - Texte/tags en cascade
 */
export function useShowcaseScroller() {
  let ctx: gsap.Context | null = null
  let horizontalTween: gsap.core.Tween | null = null

  function init(options: ShowcaseScrollerOptions) {
    if (import.meta.server) return
    if (!options.wrapperRef.value || !options.containerRef.value) return

    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      const { wrapperRef, containerRef, slidesRef } = options
      const container = containerRef.value!
      const wrapper = wrapperRef.value!

      // Calculer la largeur de scroll
      const getScrollWidth = () => container.scrollWidth - window.innerWidth

      // Animation de scroll horizontal
      // We multiply the scroll width to make the scroll slower/longer
      horizontalTween = gsap.to(container, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          pin: true,
          scrub: 0.5, // Adjust scrub amount to slow down the horizontal scroll
          // Multiply by 2 to make it feel longer and more substantial
          end: () => `+=${getScrollWidth() * 2}`, 
          invalidateOnRefresh: true,
        },
      })

      // Animation des slides individuelles
      if (slidesRef.value.length > 0) {
        slidesRef.value.forEach((slide) => {
          // Slide reveal avec rotation 3D (Entrée)
          gsap.fromTo(slide, 
            {
              opacity: 0,
              scale: 0.9,
              rotateY: 8,
              transformOrigin: 'center center',
            },
            {
              opacity: 1,
              scale: 1,
              rotateY: 0,
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween!,
                start: 'left 100%', // Dès qu'il entre à droite
                end: 'center center', // Jusqu'au centre
                scrub: true,
              },
            }
          )

          // Slide exit (Sortie)
          gsap.to(slide, {
            opacity: 0,
            scale: 0.9,
            rotateY: -8,
            scrollTrigger: {
              trigger: slide,
              containerAnimation: horizontalTween!,
              start: 'center center', // Depuis le centre
              end: 'right 0%', // Jusqu'à la sortie à gauche
              scrub: true,
            },
          })

          // Internal Parallax for Content
          const innerContent = slide.querySelectorAll('.card-premium > div')
          if (innerContent.length > 0) {
             gsap.fromTo(innerContent, 
               { x: 40 },
               {
                 x: -40,
                 ease: 'none',
                 scrollTrigger: {
                   trigger: slide,
                   containerAnimation: horizontalTween!,
                   start: 'left right',
                   end: 'right left',
                   scrub: true,
                 }
               }
             )
          }
          
          // Contenu de la slide (titre, description, tags)
          const content = slide.querySelectorAll('[data-slide-content]')
          if (content.length > 0) {
            gsap.from(content, {
              opacity: 0,
              y: 30,
              stagger: 0.05,
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween!,
                start: 'left 70%',
                end: 'left 40%',
                scrub: true,
              },
            })
          }

          // Tags tech avec stagger
          const tags = slide.querySelectorAll('[data-tag]')
          if (tags.length > 0) {
            gsap.from(tags, {
              opacity: 0,
              scale: 0.8,
              stagger: 0.03,
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween!,
                start: 'left 60%',
                end: 'left 30%',
                scrub: true,
              },
            })
          }
        })
      }
    }, options.wrapperRef.value)
  }

  function destroy() {
    ctx?.revert()
    ctx = null
    horizontalTween = null
  }

  return {
    init,
    destroy,
  }
}
