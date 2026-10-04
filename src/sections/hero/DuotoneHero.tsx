// src/sections/hero/DuotoneHero.tsx
// The name stacked a word to a line on the brand colour, beside a photo of
// their work printed in the same colour as a duotone, so the page reads as
// one block of their colour. (Lab: hero J, "Duotone split".)
//
// The duotone is the photo in greyscale under a multiply of the brand
// colour; the photo keeps its own alt text.
//
// Motion: the name's words rise into place on arrival. Reduced motion: in
// place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine, VisitButton } from './heroShared'

export default function DuotoneHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)
  const longest = brand.name.split(' ').reduce((a, b) => (b.length > a.length ? b : a), '')

  useMotion(root, () => {
    rise('[data-name]', { by: 'words' })
  })

  return (
    <section ref={root} id="top" className="page-top is-flush bg-primary text-on-primary">
      <div className="grid md:min-h-[88svh] md:grid-cols-2">
        <div className="flex flex-col justify-end px-5 pt-24 pb-12 md:px-[6vw] md:pb-[10vh]">
          {since && <p className="t-small opacity-85">{since}</p>}
          <h1 data-name className="t-hero mt-4 leading-[0.95]" style={fitDisplay(longest, 11, 9)}>
            {brand.name.split(' ').map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic>
              <a
                href={whatsappLink(boutique)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
              >
                <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
                Book a fitting
              </a>
            </Magnetic>
            <VisitButton variant="link" />
          </div>
        </div>
        <div className="relative isolate min-h-[60svh] overflow-hidden bg-primary">
          <div className="absolute inset-0 grayscale contrast-125">
            <Media file={media.hero.poster ?? media.hero.src} alt={`Work by ${brand.name}`} priority />
          </div>
          <span aria-hidden="true" className="absolute inset-0 bg-primary mix-blend-multiply" />
        </div>
      </div>
    </section>
  )
}
