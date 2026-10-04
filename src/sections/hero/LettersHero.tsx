// src/sections/hero/LettersHero.tsx
// Dark, with the boutique's name set so large that a photograph of their
// work shows through the letters. Their work, literally in their name.
// (Lab: hero U, "Photo in letters".)
//
// The letters are real text (the photo is a background clipped to them),
// so it reads to screen readers and search. Without a photo, where clipping
// isn't supported, or if the photo fails to load, the name is in the accent
// colour. Sized by length; overlay-ready.
//
// Motion: the name rises once. Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Magnetic from '../../motion/Magnetic'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine } from './heroShared'

export default function LettersHero() {
  const { boutique, photo } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const src = photo(media.hero.poster ?? media.hero.src) ?? photo(media.work[0])
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    rise('[data-hero-name]', { by: 'words' })
  })

  return (
    <section ref={root} id="top" className="page-top flex min-h-svh flex-col justify-center bg-dark pb-16 text-light">
      <div className="wrap">
        {since && <p className="t-small text-light/70">{since}</p>}
        <h1
          data-hero-name
          className={`t-hero mt-4 bg-cover bg-center text-balance text-accent-on-dark ${src ? 'supports-[background-clip:text]:bg-clip-text supports-[background-clip:text]:text-transparent' : ''}`}
          // The accent colour under the photo keeps the letters readable if the photo fails to load.
          style={{ ...fitDisplay(brand.name, 16, 13), lineHeight: 0.88, ...(src ? { backgroundImage: `url(${src})`, backgroundColor: 'var(--c-accent-on-dark)' } : {}) }}
        >
          {brand.name}
        </h1>
        {(boutique.highlight ?? brand.tagline) && <p className="t-lead mt-8 max-w-[30ch] text-light/85">{boutique.highlight ?? brand.tagline}</p>}
        <div className="mt-10">
          <Magnetic>
            <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
              Book a fitting
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
