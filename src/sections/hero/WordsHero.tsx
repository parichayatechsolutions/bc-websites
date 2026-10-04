// src/sections/hero/WordsHero.tsx
// The name in giant type split around one piece of their work: the first
// word, an arched photo, then the rest, so the work sits inside the name.
// Bold and typographic. (Lab: cine C, "Split words", with the boutique's own
// name instead of a fixed slogan, and an arch instead of a pill: pills are
// for buttons.)
//
// Light, so don't mark its page `overlay`. A one-word name keeps the photo
// after it.
//
// Motion: the words rise and the arch uncovers, once. Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { rise, wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { VisitButton } from './heroShared'

export default function WordsHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const [first, ...others] = brand.name.split(/\s+/)
  const rest = others.join(' ')

  useMotion(root, () => {
    rise('[data-hero-word]', { by: 'words' })
    wipe('[data-hero-photo]', { delay: 0.2 })
  })

  const photo = (
    <span data-hero-photo className="arch inline-block aspect-[3/4] w-[0.9em] translate-y-[0.08em] bg-paper align-baseline">
      <Media file={media.hero.poster ?? media.hero.src} alt="" priority />
    </span>
  )

  return (
    <section ref={root} id="top" className="page-top bg-light pb-16 md:pb-24">
      <div className="wrap">
        <h1 className="t-hero text-balance" style={fitDisplay(brand.name, 13, 11)} aria-label={brand.name}>
          <span data-hero-word aria-hidden="true">
            {first}
          </span>{' '}
          {rest ? photo : null}
          {rest ? ' ' : null}
          <span data-hero-word aria-hidden="true">
            {rest}
          </span>
          {!rest && <> {photo}</>}
        </h1>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          {(boutique.highlight ?? brand.tagline) && <p className="t-lead max-w-[30ch] text-muted md:col-span-6">{boutique.highlight ?? brand.tagline}</p>}
          <div className="flex flex-wrap gap-3 md:col-span-6 md:justify-end">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            <VisitButton />
          </div>
        </div>
      </div>
    </section>
  )
}
