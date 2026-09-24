// src/sections/hero/VitrineOpener.tsx
// One photograph, edge to edge, with the boutique's name and the name in
// their own language set over it, bounded below by a zari border — the woven
// edge of a saree, drawn as a rule. Opens a lookbook page, where everything
// underneath is the work itself.
//
// Motion: the photograph settles out of a slight scale while the name's words
// rise and the zari border draws itself across; after that the photograph
// drifts slowly against the page as you scroll, so the opening is never
// completely still.
//
// Reduced motion: the resting layout, which is the finished one.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategories } from '../../app/photos'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { fitDisplay } from '../../theme/theme'
import { DURATION, EASE, gsap, MEDIA, SCRUB, SplitText, STAGGER, useGSAP } from '../../motion/gsap'

export default function VitrineOpener() {
  const { boutique } = useBoutique()
  const { find, href } = useSite()
  const root = useRef<HTMLElement>(null)
  const { work, hero } = boutique.media
  const { brand, branches, social, established } = boutique

  // Their best piece leads; the hero image is the fallback when there's no work yet.
  const opening = work[0] ?? hero.src
  const kinds = photoCategories(work)
  const city = branches[0]?.city

  const facts = [
    established && `Stitching since ${established}`,
    city,
    social.googleRating && `${social.googleRating.toFixed(1)} on Google`,
  ].filter(Boolean)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        const split = SplitText.create('[data-opener-name]', { type: 'words', mask: 'words' })
        const tl = gsap.timeline()
        tl.from('[data-opener-photo]', { scale: 1.08, duration: 1.6, ease: EASE.enter })
          .from(split.words, { yPercent: 115, duration: DURATION.slow, ease: EASE.enter, stagger: STAGGER.words }, 0.25)
          .from('[data-opener-zari]', { scaleX: 0, duration: DURATION.slow, ease: EASE.enter }, 0.45)
          .from('[data-opener-line]', { autoAlpha: 0, y: 14, duration: DURATION.base, ease: EASE.settle, stagger: 0.08 }, 0.8)

        // The photograph keeps moving against the page, so the opening never
        // sits completely dead while the visitor reads.
        gsap.to('[data-opener-photo]', {
          yPercent: 9,
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
    <section ref={root} id="top" className="relative isolate flex h-[92svh] min-h-[560px] flex-col justify-end overflow-hidden bg-dark">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-opener-photo className="absolute inset-x-0 top-[-6%] h-[112%]">
          <Media file={opening} poster={hero.poster} alt={`Work by ${brand.name}`} priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/45 to-dark/10" aria-hidden="true" />
      </div>

      <div className="px-5 pb-10 md:px-10 md:pb-12">
        {brand.localName && (
          <p data-opener-line className="font-display text-2xl text-accent-on-dark md:text-3xl">
            {brand.localName}
          </p>
        )}

        <h1
          data-opener-name
          className="mt-2 max-w-[14ch] font-display leading-[0.95] text-light text-balance"
          style={fitDisplay(brand.name, 9, 7.5)}
        >
          {brand.name}
        </h1>

        <div data-opener-zari className="zari mt-7 origin-left" aria-hidden="true" />

        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <div data-opener-line className="min-w-0">
            {kinds.length > 0 && <p className="t-3 max-w-[30ch] text-light text-balance">{kinds.join(' · ')}</p>}
            {facts.length > 0 && <p className="t-small mt-2 text-light/70">{facts.join('  ·  ')}</p>}
          </div>

          <div data-opener-line className="flex flex-wrap gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Ask on WhatsApp
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
      </div>
    </section>
  )
}
