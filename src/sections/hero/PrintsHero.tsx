// src/sections/hero/PrintsHero.tsx
// Light: three photo prints laid loosely on the page, overlapping at
// small angles, beside the name and the invitation. Informal, like
// pictures spread on the cutting table. (Lab: hero L, "Prints".)
//
// The hero photo and two work photos; with fewer, fewer prints.
//
// Motion: the prints settle from a small swing on arrival. Reduced
// motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine, VisitButton } from './heroShared'

// Where each print lies in its box: position, width and turn.
const PLACES = [
  'left-[18%] top-[4%] w-[58%] -rotate-3 z-20',
  'left-0 top-[34%] w-[46%] rotate-[-8deg] z-10',
  'right-0 top-[40%] w-[44%] rotate-6 z-30',
]

export default function PrintsHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const prints = [media.hero.poster ?? media.hero.src, ...media.work.filter((f) => f !== media.hero.src).slice(0, 2)]
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)
  const line = boutique.highlight ?? brand.tagline

  useMotion(root, () => {
    sway('[data-print]')
  })

  return (
    <section ref={root} id="top" className="page-top overflow-hidden bg-paper">
      <div className="wrap grid items-center gap-10 pb-16 md:grid-cols-12 md:gap-12 md:pb-24">
        <div className="md:col-span-6">
          {since && <p className="t-small text-muted">{since}</p>}
          <h1 className="t-hero mt-4 max-w-[11ch] text-balance text-primary-ink" style={fitDisplay(brand.name, 10, 8)}>
            {brand.name}
          </h1>
          {line && <p className="t-lead mt-6 max-w-[30ch]">{line}</p>}
          <div className="mt-10 flex flex-wrap gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            <VisitButton />
          </div>
        </div>
        <div className="relative aspect-square md:col-span-6">
          {prints.map((f, i) => (
            <div key={f} data-print className={`absolute bg-light p-2 pb-6 ring-1 ring-ink/10 ${PLACES[i]}`}>
              <div className="aspect-[4/5] overflow-hidden bg-paper">
                <Media file={f} alt={i === 0 ? `Work by ${brand.name}` : ''} priority={i === 0} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
