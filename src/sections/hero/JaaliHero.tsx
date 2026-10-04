// src/sections/hero/JaaliHero.tsx
// A photograph of their work seen through a carved lattice in the brand
// colour, the openings showing the photo; the name and invitation on an
// arch-topped panel standing in front. (Lab: hero R, "Jaali screen".)
//
// The lattice is a repeating pattern over the photo, not cut from it, so
// the photo keeps its alt text. The panel is solid, so the name reads on
// any photo.
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
import { sinceLine } from './heroShared'

export default function JaaliHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const id = useId().replace(/:/g, '')
  const { brand, media } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    settle('[data-hero-img]')
  })

  return (
    <section ref={root} id="top" className="page-top is-flush relative isolate flex min-h-[90svh] items-end overflow-hidden bg-primary">
      <div className="absolute inset-0 -z-10">
        <div data-hero-img className="h-full w-full">
          <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
        </div>
      </div>
      {/* The lattice: a field of the brand colour with rounded quatrefoil openings. */}
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full">
        <defs>
          <pattern id={`jaali-${id}`} width="56" height="56" patternUnits="userSpaceOnUse">
            <path
              fillRule="evenodd"
              d="M0 0H56V56H0Z M28 6 C38 6 40 16 50 18 C50 28 40 30 40 28 C40 40 38 50 28 50 C18 50 16 40 16 28 C16 30 6 28 6 18 C16 16 18 6 28 6Z"
              style={{ fill: 'var(--c-primary)' }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#jaali-${id})`} />
      </svg>
      <div className="wrap pb-10 md:pb-16">
        <div className="arch max-w-md bg-light px-7 pt-14 pb-8 text-center text-ink md:px-10">
          {since && <p className="t-small text-muted">{since}</p>}
          <h1 className="t-1 mt-3 text-balance text-primary-ink" style={fitDisplay(brand.name, 7, 4.5, 2)}>
            {brand.name}
          </h1>
          {(boutique.highlight ?? brand.tagline) && <p className="mt-4">{boutique.highlight ?? brand.tagline}</p>}
          <div className="mt-6">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
