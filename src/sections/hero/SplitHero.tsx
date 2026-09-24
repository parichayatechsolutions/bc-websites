// src/sections/hero/SplitHero.tsx
// A calm, light opening: the boutique's name and invitation on the left, one
// tall photo of their work down the right, bleeding off the edge of the page.
// Nothing pins and nothing is covered up, so it suits a design whose signature
// motion belongs further down the page.
//
// The one moment is the arrival: the name's words rise into place while the
// photo opens from its base. Scrolling afterwards only drifts the photo
// inside its frame.
//
// Reduced motion: the resting layout, with the photo already open.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { fitDisplay } from '../../theme/theme'
import { DURATION, EASE, gsap, MEDIA, SCRUB, SplitText, STAGGER, useGSAP } from '../../motion/gsap'

export default function SplitHero() {
  const { boutique } = useBoutique()
  const { find, href } = useSite()
  const root = useRef<HTMLElement>(null)
  const { hero } = boutique.media
  const city = boutique.branches[0]?.city

  // "Stitching in Bengaluru since 1998", with whichever halves they gave us.
  const since = [city && `In ${city}`, boutique.established && `since ${boutique.established}`].filter(Boolean).join(' ')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        const split = SplitText.create('[data-hero-name]', { type: 'words', mask: 'words' })
        const tl = gsap.timeline()
        tl.from(split.words, { yPercent: 115, duration: DURATION.slow, ease: EASE.enter, stagger: STAGGER.words })
          .from('[data-hero-photo]', { clipPath: 'inset(100% 0% 0% 0%)', duration: DURATION.slow, ease: EASE.enter }, 0)
          .from('[data-hero-line]', { autoAlpha: 0, y: 14, duration: DURATION.base, ease: EASE.settle, stagger: 0.08 }, 0.5)

        // The photo drifts a little against the page as it scrolls by.
        gsap.to('[data-hero-drift]', {
          yPercent: -8,
          ease: EASE.scroll,
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: SCRUB.soft },
        })

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
    <section ref={root} id="top" className="page-top relative overflow-hidden bg-light">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 pb-16 md:grid-cols-12 md:gap-12 md:px-0 md:pb-[12vh] md:pl-[6vw]">
        <div className="md:col-span-6">
          {since && (
            <p data-hero-line className="t-small text-muted">
              {since}
            </p>
          )}
          <h1 data-hero-name className="t-hero mt-4 max-w-[11ch] text-balance" style={fitDisplay(boutique.brand.name, 10, 8)}>
            {boutique.brand.name}
          </h1>
          {(boutique.highlight ?? boutique.brand.tagline) && (
            <p data-hero-line className="t-lead mt-8 max-w-[30ch] text-muted">
              {boutique.highlight ?? boutique.brand.tagline}
            </p>
          )}
          <div data-hero-line className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            {find('contact') ? (
              <Button to={href('contact')} variant="outline-dark" icon={IconMapPin}>
                Visit the store
              </Button>
            ) : (
              <Button href="#visit" variant="outline-dark" icon={IconMapPin}>
                Visit the store
              </Button>
            )}
          </div>
        </div>

        <figure data-hero-photo className="relative h-[58vh] overflow-hidden md:col-span-6 md:h-[76vh]">
          <div data-hero-drift className="absolute inset-x-0 -top-[6%] h-[112%]">
            <Media file={hero.src} poster={hero.poster} alt={`Work by ${boutique.brand.name}`} priority />
          </div>
        </figure>
      </div>
    </section>
  )
}
