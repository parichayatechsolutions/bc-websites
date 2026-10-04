// src/sections/hero/RingHero.tsx
// A round photograph inside a dashed thread ring, with the boutique's name
// and the year they started written around the ring, like the edge of a
// seal; the invitation beneath. (Lab: hero M, "Rangoli ring".)
//
// The text around the ring is decorative and repeated in the heading, so
// screen readers hear it once. Long names are shortened on the ring only.
//
// Motion: the photo eases in from slightly near on arrival. Reduced
// motion: still.

import { useId, useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { VisitButton } from './heroShared'

export default function RingHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const id = useId().replace(/:/g, '')
  const { brand, media, established } = boutique
  const ringName = brand.name.length > 34 ? brand.name.slice(0, 33) + '…' : brand.name
  const ring = [ringName, established && `Since ${established}`, boutique.branches[0]?.city].filter(Boolean).join('  ·  ')
  const line = boutique.highlight ?? brand.tagline

  useMotion(root, () => {
    settle('[data-hero-img]')
  })

  return (
    <section ref={root} id="top" className="page-top bg-light">
      <div className="wrap flex flex-col items-center pb-16 text-center md:pb-24">
        <div className="relative aspect-square w-full max-w-[26rem]">
          <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute inset-0 h-full w-full">
            <defs>
              <path id={`ring-${id}`} d="M 200 200 m -178 0 a 178 178 0 1 1 356 0 a 178 178 0 1 1 -356 0" />
            </defs>
            <circle cx={200} cy={200} r={160} fill="none" strokeWidth={2} strokeDasharray="6 5" style={{ stroke: 'var(--c-thread)' }} />
            <text fontSize={17} letterSpacing={3} style={{ fill: 'var(--c-primary-ink)' }}>
              <textPath href={`#ring-${id}`} startOffset="0">
                {`${ring}  ·  ${ring}  ·  `}
              </textPath>
            </text>
          </svg>
          <div className="absolute inset-[14%] overflow-hidden rounded-full bg-paper">
            <div data-hero-img className="h-full w-full">
              <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
            </div>
          </div>
        </div>
        <h1 className="t-hero mt-10 max-w-[14ch] text-balance text-primary-ink" style={fitDisplay(brand.name, 8, 6)}>
          {brand.name}
        </h1>
        {line && <p className="t-lead mt-5 max-w-[32ch] text-muted">{line}</p>}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
              Book a fitting
            </Button>
          </Magnetic>
          <VisitButton />
        </div>
      </div>
    </section>
  )
}
