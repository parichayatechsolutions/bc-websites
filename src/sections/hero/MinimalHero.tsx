// src/sections/hero/MinimalHero.tsx
// Almost nothing: the name, centred and as large as it fits on the dark
// ground, the tagline, one button, and a quiet cue to scroll. For a design
// whose signature comes further down the page, or a name that carries
// itself. (Lab: cine H, "Minimal", without the glow: no gradient washes.)
//
// Dark from the first pixel, so it pairs with a floating nav on a page
// marked `overlay`. Needs no photographs.
//
// Motion: the name rises once; the scroll cue is still (nothing loops).
// Reduced motion: in place.

import { useRef } from 'react'
import { IconArrowDown, IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Magnetic from '../../motion/Magnetic'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'

export default function MinimalHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand } = boutique

  useMotion(root, () => {
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters' })
  })

  return (
    <section ref={root} id="top" className="page-top relative flex min-h-svh flex-col items-center justify-center bg-dark pb-28 text-center text-light">
      <div className="wrap flex flex-col items-center">
        <h1 data-hero-name className="t-hero max-w-[14ch] text-balance" style={fitDisplay(brand.name, 13, 11)}>
          {brand.name}
        </h1>
        {brand.localName && <p className="t-2 mt-4 text-light/70">{brand.localName}</p>}
        {brand.tagline && <p className="t-lead mt-8 max-w-[30ch] text-light/80">{brand.tagline}</p>}
        <div className="mt-10">
          <Magnetic>
            <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
              Book a fitting
            </Button>
          </Magnetic>
        </div>
      </div>
      <p aria-hidden="true" className="t-small absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-light/60">
        Scroll
        <IconArrowDown size={18} stroke={1.5} />
      </p>
    </section>
  )
}
