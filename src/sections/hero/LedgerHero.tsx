// src/sections/hero/LedgerHero.tsx
// A type-led opening, like the masthead of a magazine: the boutique's name
// set across the full width of the page, a letterbox photo under it, and a
// line of plain facts along the bottom — years, city, rating, branches.
// Nothing pins, so it leaves the page's pinned moment to a section below.
//
// The one moment: the name's letters rise on arrival, and the letterbox
// opens from a slot to its full height over the first screen of scrolling.
//
// Reduced motion: the photo is already at full height and the name is set.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { fitDisplay } from '../../theme/theme'
import { DURATION, EASE, gsap, MEDIA, SCRUB, SplitText, STAGGER, useGSAP } from '../../motion/gsap'

export default function LedgerHero() {
  const { boutique } = useBoutique()
  const { find, href } = useSite()
  const root = useRef<HTMLElement>(null)
  const { hero } = boutique.media
  const { branches, social, established } = boutique

  // Only the facts this boutique actually gave us.
  const facts = [
    established && { label: 'Stitching since', value: String(established) },
    branches[0]?.city && { label: 'In', value: branches[0].city },
    social.googleRating && { label: 'On Google', value: `${social.googleRating} ★` },
    branches.length > 1 && { label: 'Branches', value: String(branches.length) },
  ].filter((f): f is { label: string; value: string } => Boolean(f))

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(MEDIA.motion, () => {
        const split = SplitText.create('[data-hero-name]', { type: 'words,chars', mask: 'chars' })
        const tl = gsap.timeline()
        tl.from(split.chars, { yPercent: 110, duration: DURATION.slow, ease: EASE.enter, stagger: STAGGER.letters })
          .from('[data-ledger-line]', { autoAlpha: 0, y: 14, duration: DURATION.base, ease: EASE.settle, stagger: 0.07 }, 0.6)

        // The slot widens into a full letterbox as the page starts moving.
        gsap.fromTo(
          '[data-ledger-slot]',
          { clipPath: 'inset(34% 0% 34% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: EASE.morph,
            scrollTrigger: { trigger: root.current, start: 'top top', end: '+=60%', scrub: SCRUB.soft },
          },
        )

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
    <section ref={root} id="top" className="page-top bg-light">
      <div className="px-5 md:px-10">
        <h1
          data-hero-name
          className="t-hero text-balance"
          style={fitDisplay(boutique.brand.name, 13, 12, 2.8)}
        >
          {boutique.brand.name}
        </h1>
      </div>

      <figure data-ledger-slot className="mt-8 h-[46vh] overflow-hidden md:mt-10 md:h-[64vh]">
        <Media file={hero.src} poster={hero.poster} alt={`Work by ${boutique.brand.name}`} priority />
      </figure>

      <div className="px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-8 border-b border-ink/15 py-8">
          <dl data-ledger-line className="flex flex-wrap gap-x-10 gap-y-5">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="t-small text-muted">{fact.label}</dt>
                <dd className="t-2 mt-1">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div data-ledger-line className="flex flex-wrap gap-3">
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

        {(boutique.highlight ?? boutique.brand.tagline) && (
          <p data-ledger-line className="t-lead max-w-[34ch] py-12 text-muted md:py-16">
            {boutique.highlight ?? boutique.brand.tagline}
          </p>
        )}
      </div>
    </section>
  )
}
