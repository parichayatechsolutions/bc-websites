// src/sections/hero/PosterHero.tsx
// The boutique's name set inside a drawn frame over one full-bleed photo, the
// way a wedding invitation or a shop's printed poster is set. Formal and
// still: it doesn't pin and it doesn't move with the scroll, so it belongs in
// a design that wants its ceremony at the top and its motion further down.
//
// The one moment is the frame drawing itself around the name, line by line,
// as the letters rise.
//
// Reduced motion: the frame and the name are already in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { fitDisplay } from '../../theme/theme'
import { DURATION, EASE, gsap, MEDIA, SplitText, STAGGER, useGSAP } from '../../motion/gsap'

export default function PosterHero() {
  const { boutique } = useBoutique()
  const { find, href } = useSite()
  const root = useRef<HTMLElement>(null)
  const { hero } = boutique.media
  const city = boutique.branches[0]?.city

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        const split = SplitText.create('[data-hero-name]', { type: 'words,chars', mask: 'chars' })
        const tl = gsap.timeline({ defaults: { ease: EASE.enter } })

        tl.from('[data-rule-x]', { scaleX: 0, duration: DURATION.slow, stagger: 0.1 }, 0)
          .from('[data-rule-y]', { scaleY: 0, duration: DURATION.slow, stagger: 0.1 }, 0.1)
          .from(split.chars, { yPercent: 110, duration: DURATION.slow, stagger: STAGGER.letters }, 0.35)
          .from('[data-poster-line]', { autoAlpha: 0, y: 14, duration: DURATION.base, ease: EASE.settle, stagger: 0.08 }, 0.8)

        return () => {
          tl.kill()
          split.revert()
        }
      })

      return () => mm.revert()
    },
    { scope: root },
  )

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-dark text-light">
      <div className="absolute inset-0 -z-10">
        <Media file={hero.src} poster={hero.poster} priority />
        <div className="absolute inset-0 bg-dark/55" aria-hidden="true" />
      </div>

      <div className="mx-auto w-full max-w-[1100px] px-5 py-24 md:px-10">
        {/* The frame: two rules across, two down, drawn around the name. */}
        <div className="relative px-6 py-14 text-center md:px-16 md:py-20">
          <span data-rule-x className="absolute inset-x-0 top-0 h-px origin-left bg-light/45" aria-hidden="true" />
          <span data-rule-x className="absolute inset-x-0 bottom-0 h-px origin-right bg-light/45" aria-hidden="true" />
          <span data-rule-y className="absolute inset-y-0 left-0 w-px origin-top bg-light/45" aria-hidden="true" />
          <span data-rule-y className="absolute inset-y-0 right-0 w-px origin-bottom bg-light/45" aria-hidden="true" />

          {city && (
            <p data-poster-line className="t-small text-light/70">
              {city}
            </p>
          )}
          <h1
            data-hero-name
            className="t-hero mx-auto mt-5 max-w-[13ch] text-balance"
            style={fitDisplay(boutique.brand.name, 11, 9)}
          >
            {boutique.brand.name}
          </h1>
          {boutique.brand.tagline && (
            <p data-poster-line className="mx-auto mt-6 max-w-[34ch] text-lg text-light/85">
              {boutique.brand.tagline}
            </p>
          )}
        </div>

        <div data-poster-line className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
              Book a fitting
            </Button>
          </Magnetic>
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
    </section>
  )
}
