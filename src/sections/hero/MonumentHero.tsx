// src/sections/hero/MonumentHero.tsx
// Dark and cinematic: one piece of their work in a tall temple arch, the
// name set large beside it, a short gold rule, the invitation and two ways
// in. (Lab: cine B, "Monument", without the lab's brand-colour glow: no
// gradient washes.)
//
// Dark from the first pixel, so it pairs with a floating nav on a page
// marked `overlay`.
//
// Motion: the photo settles inside its arch while the name rises, once.
// Reduced motion: everything in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { draw, rise, settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine, VisitButton } from './heroShared'

export default function MonumentHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    settle('[data-hero-photo]')
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters', delay: 0.15 })
    draw('[data-hero-rule]', { from: 'start', delay: 0.5 })
  })

  return (
    <section ref={root} id="top" className="page-top flex min-h-svh items-center bg-dark pb-16 text-light">
      <div className="wrap grid w-full items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="order-2 md:order-1 md:col-span-5">
          <div className="arch mx-auto aspect-[3/4] w-full max-w-sm bg-light/5 md:max-w-none">
            <div data-hero-photo className="h-full w-full">
              <Media file={media.hero.poster ?? media.hero.src} alt={`Work by ${brand.name}`} priority />
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 md:col-span-7">
          {since && <p className="t-small text-light/70">{since}</p>}
          <h1 data-hero-name className="t-hero mt-5 max-w-[12ch] text-balance" style={fitDisplay(brand.name, 10, 8.5)}>
            {brand.name}
          </h1>
          <span data-hero-rule aria-hidden="true" className="mt-8 block h-px w-24 bg-accent" />
          {(boutique.highlight ?? brand.tagline) && (
            <p className="t-lead mt-8 max-w-[30ch] text-light/85">{boutique.highlight ?? brand.tagline}</p>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Book on WhatsApp
              </Button>
            </Magnetic>
            <VisitButton variant="outline-light" />
          </div>
        </div>
      </div>
    </section>
  )
}
