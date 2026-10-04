// src/sections/hero/TagHero.tsx
// A full photograph with a garment's swing tag hanging over it on a gold
// thread: the boutique's name, its rating and the invitation written on the
// tag. (Lab: hero W, "Swing tag".)
//
// The photo sits under a light veil so the tag reads; dark text on a light
// tag, so it doesn't need `overlay`.
//
// Motion: the tag settles from a small swing once. Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconStarFilled } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'

export default function TagHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media, social } = boutique

  useMotion(root, () => {
    sway('[data-tag]')
  })

  return (
    <section ref={root} id="top" className="page-top is-flush relative isolate flex min-h-[90svh] items-start justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
      </div>
      <div data-tag className="mt-0 flex w-[min(22rem,86vw)] flex-col items-center">
        <span aria-hidden="true" className="h-24 w-px bg-accent md:h-32" />
        <div className="w-full rounded-2xl bg-light px-7 pt-5 pb-8 text-center text-ink">
          <span aria-hidden="true" className="mx-auto block h-4 w-4 rounded-full border-2 border-accent" />
          <h1 className="t-1 mt-5 text-balance text-primary-ink" style={fitDisplay(brand.name, 7, 4, 2)}>
            {brand.name}
          </h1>
          {social.googleRating && (
            <p className="t-small mt-3 flex items-center justify-center gap-1.5 text-muted">
              <IconStarFilled size={16} className="text-primary-ink" aria-hidden="true" />
              {social.googleRating.toFixed(1)} on Google
            </p>
          )}
          {(boutique.highlight ?? brand.tagline) && <p className="mt-4">{boutique.highlight ?? brand.tagline}</p>}
          <div className="mt-6">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
