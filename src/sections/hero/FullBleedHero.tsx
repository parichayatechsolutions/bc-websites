// src/sections/hero/FullBleedHero.tsx
// One photograph filling the screen under a dark veil, the name set large
// in the bottom corner with the invitation and one button beside it.
// Cinematic and quiet. (Lab: cine D, "Full bleed", without the brand-colour
// glow: no gradient washes.)
//
// Dark, so it pairs with a floating nav on a page marked `overlay`.
//
// Motion: the photo settles from slightly close while the name rises, once;
// then the photo drifts a little as the page scrolls. Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { drift, rise, settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine } from './heroShared'

export default function FullBleedHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    settle('[data-hero-photo]')
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters', delay: 0.2 })
    drift('[data-hero-drift]', { trigger: root.current, amount: 6 })
  })

  return (
    <section ref={root} id="top" className="relative isolate flex min-h-svh items-end overflow-hidden pb-14 text-light md:pb-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-drift className="absolute inset-x-0 -top-[6%] h-[112%]">
          <div data-hero-photo className="h-full w-full">
            <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
          </div>
        </div>
        <div className="absolute inset-0 bg-dark/50" aria-hidden="true" />
      </div>

      <div className="wrap grid w-full gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          {since && <p className="t-small text-light/75">{since}</p>}
          <h1 data-hero-name className="t-hero mt-4 max-w-[13ch] text-balance" style={fitDisplay(brand.name, 11, 9)}>
            {brand.name}
          </h1>
        </div>
        <div className="md:col-span-4">
          {(boutique.highlight ?? brand.tagline) && <p className="max-w-[34ch] text-light/85">{boutique.highlight ?? brand.tagline}</p>}
          <div className="mt-6">
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
