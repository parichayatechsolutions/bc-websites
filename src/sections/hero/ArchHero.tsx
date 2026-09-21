// src/sections/hero/ArchHero.tsx
// The page's one orchestrated moment. The brand name rises letter by letter
// over a temple-arch window onto the boutique's work. Scrolling opens the
// arch until the photo or clip fills the screen, and the invitation to visit
// takes the name's place.
//
// Reduced motion: no pin, no scrub. The arch starts open, with the name and
// the buttons visible at once.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { fitDisplay } from '../../theme/theme'
import { DURATION, EASE, gsap, MEDIA, SCRUB, SplitText, STAGGER, useGSAP } from '../../motion/gsap'

// Arch window as an inset() clip: top and side insets in %, corner radius in
// vw. The radius is half the window's width, so the top is a true semicircle.
// Tweened as plain numbers because browsers rewrite clip-path strings in
// shorthand, which breaks GSAP's string interpolation.
type IArch = { top: number; side: number; radius: number }
const ARCH_DESKTOP: IArch = { top: 16, side: 32, radius: 18 }
const ARCH_MOBILE: IArch = { top: 20, side: 12, radius: 38 }
const OPEN: IArch = { top: 0, side: 0, radius: 0 }

const clip = ({ top, side, radius }: IArch) =>
  `inset(${top}% ${side}% 0% ${side}% round ${radius}vw ${radius}vw 0vw 0vw)`

export default function ArchHero() {
  const { boutique } = useBoutique()
  const { find, href } = useSite()
  const root = useRef<HTMLElement>(null)
  const { hero } = boutique.media
  const city = boutique.branches[0]?.city

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add({ motion: MEDIA.motion, desktop: MEDIA.desktop }, (ctx) => {
        const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean }
        const frame = root.current!.querySelector<HTMLElement>('[data-hero-window]')!
        // The markup's resting state is the reduced-motion layout.
        if (!motion) return

        const split = SplitText.create('[data-hero-name]', { type: 'words,chars', mask: 'chars' })
        gsap.from(split.chars, {
          yPercent: 110,
          duration: DURATION.slow,
          ease: EASE.enter,
          stagger: STAGGER.letters,
          delay: 0.15,
        })
        gsap.from('[data-hero-window]', { autoAlpha: 0, scale: 0.94, duration: DURATION.slow, ease: EASE.settle })
        gsap.from('[data-hero-sub]', { autoAlpha: 0, y: 16, duration: DURATION.base, delay: 0.7, ease: EASE.settle })

        const arch = { ...(desktop ? ARCH_DESKTOP : ARCH_MOBILE) }
        const draw = () => (frame.style.clipPath = clip(arch))
        draw()
        gsap.set('[data-hero-invite]', { autoAlpha: 0, y: 30 })

        gsap
          .timeline({
            scrollTrigger: { trigger: root.current, start: 'top top', end: '+=130%', pin: true, scrub: SCRUB.soft },
          })
          .to(arch, { ...OPEN, ease: EASE.morph, duration: 1, onUpdate: draw }, 0)
          .to('[data-hero-media]', { scale: 1, ease: EASE.scroll, duration: 1 }, 0)
          .to('[data-hero-title]', { yPercent: -60, autoAlpha: 0, ease: EASE.exit, duration: 0.55 }, 0)
          .to('[data-hero-shade]', { opacity: 1, duration: 0.5 }, 0.5)
          .to('[data-hero-invite]', { autoAlpha: 1, y: 0, duration: 0.35 }, 0.65)

        return () => split.revert()
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="relative h-[100svh] overflow-hidden bg-dark text-light">
      {/* The window onto their work */}
      <div data-hero-window className="absolute inset-0">
        <div data-hero-media className="h-full w-full scale-[1.12]">
          <Media file={hero.src} poster={hero.poster} priority />
        </div>
        <div
          data-hero-shade
          className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/10 opacity-60"
          aria-hidden="true"
        />
      </div>

      {/* Name over the arch */}
      <div data-hero-title className="pointer-events-none absolute inset-x-0 top-[34%] z-10 px-5 text-center md:top-[30%]">
        <h1
          data-hero-name
          className="t-hero mx-auto max-w-[12ch] text-balance [text-shadow:0_2px_40px_rgb(0_0_0/0.35)]"
          style={fitDisplay(boutique.brand.name)}
        >
          {boutique.brand.name}
        </h1>
        {boutique.brand.tagline && (
          <p data-hero-sub className="mx-auto mt-6 max-w-md text-lg text-light/85">
            {boutique.brand.tagline}
          </p>
        )}
      </div>

      {/* Revealed once the arch is fully open */}
      <div data-hero-invite className="absolute inset-x-0 bottom-0 z-10 pb-14 md:pb-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-10">
          {/* Without the scroll swap it would sit on top of the name */}
          <p className="t-1 max-w-[16ch] text-balance motion-reduce:hidden">
            {boutique.highlight ?? `Made to measure${city ? ` in ${city}` : ''}.`}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            {/* To the contact page when the site has one, else to the visit section on this page */}
            {find('contact') ? (
              <Button to={href('contact')} variant="outline-light" icon={IconMapPin}>
                Visit the store
              </Button>
            ) : (
              <Button href="#visit" variant="outline-light" icon={IconMapPin}>
                Visit the store
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
