// src/sections/hero/MosaicHero.tsx
// Six pieces of their work in a grid, with the name set into a dark tile of
// its own, so the first screen shows their range before anything is read.
// (Lab: hero F, "Mosaic".)
//
// Phones: the name tile across the top, the photos in pairs under it.
// Computers: two rows of about half a screen each (taller if a long name
// needs it), the name tile spanning two cells of four.
// Fewer than six photos leave the grid shorter; the placeholders of a
// half-filled demo are the team's shot list. Don't mark its page `overlay`.
//
// Motion: the name rises while the photos uncover in turn, once.
// Reduced motion: everything in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { rise, wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine } from './heroShared'

export default function MosaicHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const photos = media.work.slice(0, 6)
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)
  const captions = media.captions ?? {}

  useMotion(root, () => {
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters' })
    wipe('[data-tile]', { delay: 0.15 })
  })

  return (
    <section ref={root} id="top" className="page-top is-flush pb-1">
      <div className="grid grid-cols-2 gap-1 px-1 md:auto-rows-[minmax(18rem,42svh)] md:grid-cols-4">
        <div className="col-span-2 flex flex-col justify-between gap-8 bg-dark p-6 text-light md:p-10">
          {since && <p className="t-small text-light/70">{since}</p>}
          <div>
            <h1 data-hero-name className="t-hero max-w-[14ch] text-balance" style={fitDisplay(brand.name, 6, 5.5, 2.4)}>
              {brand.name}
            </h1>
            {brand.tagline && <p className="mt-4 max-w-[34ch] text-light/80">{brand.tagline}</p>}
          </div>
          <div>
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
          </div>
        </div>

        {photos.map((file, i) => (
          <div key={file} data-tile className="aspect-square overflow-hidden bg-paper md:aspect-auto">
            <Media file={file} alt={captions[file] ?? ''} priority={i < 2} />
          </div>
        ))}
      </div>
    </section>
  )
}
