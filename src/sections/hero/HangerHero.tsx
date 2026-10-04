// src/sections/hero/HangerHero.tsx
// The name above a thread rail with pieces of their work hanging from it
// on hooks, each with a small tag naming its kind. Suits rental and
// ready-to-wear boutiques. (Lab: hero V, "Hanger rail".)
//
// Work photos, up to four (two on a phone); the tag only on photos named
// by kind (work-<kind>-<nn>.jpg).
//
// Motion: the pieces settle from a small swing on arrival. Reduced
// motion: hanging still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { VisitButton } from './heroShared'

export default function HangerHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const pieces = [media.hero.poster ?? media.hero.src, ...media.work.filter((f) => f !== media.hero.src)].slice(0, 4)

  useMotion(root, () => {
    sway('[data-piece]')
  })

  return (
    <section ref={root} id="top" className="page-top bg-light">
      <div className="wrap pb-16 md:pb-24">
        <h1 className="t-hero max-w-[14ch] text-balance text-primary-ink" style={fitDisplay(brand.name, 9, 7)}>
          {brand.name}
        </h1>
        {(boutique.highlight ?? brand.tagline) && <p className="t-lead mt-5 max-w-[34ch] text-muted">{boutique.highlight ?? brand.tagline}</p>}
        <div className="relative mt-12">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1 rounded-full bg-thread" />
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {pieces.map((f, i) => (
              <li key={f} data-piece className={`flex flex-col items-center ${i > 1 ? 'hidden md:flex' : ''}`}>
                <span aria-hidden="true" className="h-8 w-4 rounded-t-full border-2 border-b-0 border-ink/50" />
                <div className="relative w-full">
                  <div className="arch aspect-[2/3] bg-paper">
                    <Media file={f} alt={i === 0 ? `Work by ${brand.name}` : ''} priority={i === 0} />
                  </div>
                  {photoCategory(f) && (
                    <span className="t-small absolute top-10 -right-1 rotate-6 rounded-sm bg-light px-2 py-1 ring-1 ring-ink/15">{photoCategory(f)}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
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
