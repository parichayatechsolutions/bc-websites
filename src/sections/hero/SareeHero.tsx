// src/sections/hero/SareeHero.tsx
// Built like the end of a saree: their work across the top like the body
// of the cloth, a woven zari border, then the name on a band of brand colour
// like the pallu, with a second border closing it. A new ornament beside the
// temple arch. (Lab: hero E, "Saree border".)
//
// Starts on a photograph and then the brand colour, so don't mark its page
// `overlay`.
//
// Motion: the photo opens from its base while the name rises; afterwards the
// photo drifts a little inside its frame as the page scrolls.
// Reduced motion: everything in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { drift, rise, wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine, VisitButton } from './heroShared'

export default function SareeHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    wipe('[data-hero-photo]')
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters', delay: 0.2 })
    drift('[data-hero-drift]', { trigger: root.current, amount: 6 })
  })

  return (
    <section ref={root} id="top" className="page-top">
      <figure data-hero-photo className="relative h-[46svh] overflow-hidden bg-paper md:h-[60vh]">
        <div data-hero-drift className="absolute inset-x-0 -top-[6%] h-[112%]">
          <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
        </div>
      </figure>

      <div className="zari" aria-hidden="true" />
      <div className="bg-primary py-12 text-on-primary md:py-16">
        <div className="wrap grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            {since && <p className="t-small opacity-80">{since}</p>}
            <h1 data-hero-name className="t-hero mt-4 max-w-[14ch] text-balance" style={fitDisplay(brand.name, 9, 8)}>
              {brand.name}
            </h1>
            {brand.tagline && <p className="t-lead mt-5 max-w-[30ch] opacity-90">{brand.tagline}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 md:col-span-4 md:justify-end">
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            <VisitButton variant="link" />
          </div>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
