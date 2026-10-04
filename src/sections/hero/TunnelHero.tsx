// src/sections/hero/TunnelHero.tsx
// Dark: four temple arches drawn in gold thread, one inside the other,
// receding like a corridor, with their work in the innermost. The name and
// invitation beside it. (Lab: hero K, "Arch tunnel".)
//
// Motion: the work eases in from slightly near inside its arch on arrival.
// Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine, VisitButton } from './heroShared'

export default function TunnelHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)
  const line = boutique.highlight ?? brand.tagline

  useMotion(root, () => {
    settle('[data-hero-img]')
  })

  return (
    <section ref={root} id="top" className="page-top bg-dark text-light">
      <div className="wrap grid items-center gap-12 pb-16 md:grid-cols-12 md:gap-16 md:pb-24">
        <div className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none">
          <div className="arch aspect-[3/4] border border-accent-on-dark/30 p-[7%]">
            <div className="arch h-full border border-accent-on-dark/45 p-[8%]">
              <div className="arch h-full border border-accent-on-dark/65 p-[9%]">
                <div className="arch h-full overflow-hidden border-2 border-accent-on-dark">
                  <div data-hero-img className="h-full w-full">
                    <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          {since && <p className="t-small text-accent-on-dark">{since}</p>}
          <h1 className="t-hero mt-4 max-w-[12ch] text-balance" style={fitDisplay(brand.name, 9, 7)}>
            {brand.name}
          </h1>
          {line && <p className="t-lead mt-6 max-w-[32ch] text-light/80">{line}</p>}
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            <VisitButton variant="outline-light" />
          </div>
        </div>
      </div>
    </section>
  )
}
