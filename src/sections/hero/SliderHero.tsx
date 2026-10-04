// src/sections/hero/SliderHero.tsx
// Three full-width photographs of their work stepped through with arrows,
// never on their own, with the name and invitation on a solid panel that
// stays put. (Lab: hero Y, "Photo slider".)
//
// The hero photo, then two work photos; the photo's kind (from its name)
// shows on the panel. The photo swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { fitDisplay } from '../../theme/theme'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-light/90 text-ink transition-[background-color] duration-200 ease-stitch hover:bg-light'

export default function SliderHero() {
  const { boutique } = useBoutique()
  const { brand, media } = boutique
  const photos = [media.hero.src, ...media.work.filter((f) => f !== media.hero.src).slice(0, 2)]
  const [index, setIndex] = useState(0)
  const photo = photos[index]
  const step = (by: number) => setIndex((index + by + photos.length) % photos.length)
  const kind = photoCategory(photo)

  return (
    <section id="top" className="page-top is-flush relative isolate flex min-h-[90svh] items-end overflow-hidden bg-dark">
      <div className="absolute inset-0 -z-10">
        <Media
          key={photo}
          file={photo}
          poster={index === 0 ? media.hero.poster : undefined}
          alt={`Work by ${brand.name}`}
          priority={index === 0}
          className="animate-[fade-in_700ms_var(--ease-stitch)]"
        />
      </div>
      <div className="wrap flex w-full flex-wrap items-end justify-between gap-6 pb-10 md:pb-14">
        <div className="max-w-lg rounded-2xl bg-light p-7 text-ink md:p-9">
          {kind && <p className="t-small text-primary-ink">{kind}</p>}
          <h1 className="t-1 mt-1 text-balance" style={fitDisplay(brand.name, 7, 4.5, 2)}>
            {brand.name}
          </h1>
          <div className="mt-6">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
          </div>
        </div>
        {photos.length > 1 && (
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={ROUND}>
              <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
            </button>
            <span className="t-small rounded-full bg-light/90 px-3 py-1 tabular-nums text-ink">
              {index + 1} / {photos.length}
            </span>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className={ROUND}>
              <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
