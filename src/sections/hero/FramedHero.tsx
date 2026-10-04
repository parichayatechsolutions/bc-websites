// src/sections/hero/FramedHero.tsx
// Light and composed: the name and invitation on the left, one piece of
// their work on the right in a temple arch inside a fine double frame of
// gold. The light counterpart of MonumentHero. (Lab: cine A, "Arch",
// without the open-now chip: their hours aren't structured enough to say.)
//
// Don't mark its page `overlay`.
//
// Motion: the frame draws and the photo settles while the name rises, once.
// Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { rise, settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine, VisitButton } from './heroShared'

export default function FramedHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters' })
    settle('[data-hero-photo]', { delay: 0.1 })
  })

  return (
    <section ref={root} id="top" className="page-top bg-light pb-16 md:pb-24">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          {since && <p className="t-small text-muted">{since}</p>}
          <h1 data-hero-name className="t-hero mt-5 max-w-[12ch] text-balance" style={fitDisplay(brand.name, 10, 8)}>
            {brand.name}
          </h1>
          {(boutique.highlight ?? brand.tagline) && <p className="t-lead mt-6 max-w-[30ch] text-muted">{boutique.highlight ?? brand.tagline}</p>}
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            <VisitButton />
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="arch mx-auto aspect-[3/4] max-w-sm border border-accent p-2">
            <div className="arch h-full w-full border border-accent/60 p-2">
              <div className="arch h-full w-full bg-paper">
                <div data-hero-photo className="h-full w-full">
                  <Media file={media.hero.poster ?? media.hero.src} alt={`Work by ${brand.name}`} priority />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
