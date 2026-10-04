// src/sections/hero/SinceHero.tsx
// No photograph: the year they started set enormous, in the brand colour,
// with the name, their line and the invitation beneath. For a boutique
// whose years are its proof. (Lab: hero T, "Since year".)
//
// Needs `established`; without it the name takes the year's place, so the
// opener still stands.
//
// Motion: the year's figures rise into place on arrival. Reduced motion:
// in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Magnetic from '../../motion/Magnetic'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { VisitButton } from './heroShared'

export default function SinceHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, established } = boutique
  const city = boutique.branches[0]?.city
  const line = boutique.highlight ?? brand.tagline

  useMotion(root, () => {
    rise('[data-rise]')
  })

  return (
    <section ref={root} id="top" className="page-top bg-light">
      <div className="wrap pb-16 md:pb-24">
        {established ? (
          <>
            <p className="t-3 text-muted">Since</p>
            <p data-rise aria-hidden="true" className="font-display leading-[0.85] tabular-nums text-primary-ink" style={{ fontSize: 'clamp(7rem, 30vw, 22rem)' }}>
              {established}
            </p>
            <h1 className="t-1 mt-6 max-w-[18ch] text-balance">
              <span className="sr-only">Since {established}, </span>
              {brand.name}
            </h1>
          </>
        ) : (
          <h1 data-rise className="t-hero max-w-[12ch] text-balance text-primary-ink" style={fitDisplay(brand.name, 12, 10)}>
            {brand.name}
          </h1>
        )}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-8 border-t border-ink/15 pt-8">
          <div>
            {line && <p className="t-lead max-w-[34ch]">{line}</p>}
            {city && <p className="mt-2 text-muted">{city}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            <VisitButton />
          </div>
        </div>
      </div>
    </section>
  )
}
