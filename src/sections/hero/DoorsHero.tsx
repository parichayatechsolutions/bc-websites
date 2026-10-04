// src/sections/hero/DoorsHero.tsx
// Dark and ceremonial: the name above three tall arched doorways, each
// opening onto a piece of their work, like the doors of a temple corridor.
// (Lab: hero G, "Temple doors".)
//
// Dark from the first pixel, so it pairs with a floating nav on a page
// marked `overlay`. Uses their first three work photos.
//
// Motion: the doorways open from the floor up, one after another, as the
// name rises. Reduced motion: open.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { rise, wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine, VisitButton } from './heroShared'

export default function DoorsHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const doors = media.work.slice(0, 3)
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters' })
    wipe('[data-door]', { delay: 0.2 })
  })

  return (
    <section ref={root} id="top" className="page-top bg-dark pb-16 text-center text-light md:pb-20">
      <div className="wrap flex flex-col items-center">
        {since && <p className="t-small text-light/70">{since}</p>}
        <h1 data-hero-name className="t-hero mt-5 max-w-[14ch] text-balance" style={fitDisplay(brand.name, 10, 8)}>
          {brand.name}
        </h1>
        {brand.tagline && <p className="t-lead mt-6 max-w-[30ch] text-light/80">{brand.tagline}</p>}

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Magnetic>
            <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
              Book a fitting
            </Button>
          </Magnetic>
          <VisitButton variant="outline-light" />
        </div>

        {doors.length > 0 && (
          <div className="mt-14 grid w-full max-w-4xl grid-cols-3 gap-3 md:gap-6">
            {doors.map((file, i) => (
              <div key={file} data-door className="arch aspect-[2/3] border border-accent-on-dark/40 bg-light/5 p-1.5">
                <div className="arch h-full w-full">
                  <Media file={file} alt="" priority={i === 1} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
