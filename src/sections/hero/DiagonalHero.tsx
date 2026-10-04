// src/sections/hero/DiagonalHero.tsx
// Their brand colour with a photograph sliced in on a diagonal, and the
// name stacked a word to a line beside it: bold and modern. (Lab: hero Q,
// "Diagonal cut".)
//
// On a phone the photo sits on top, cut off at a slant above the name.
// Don't mark its page `overlay`.
//
// Motion: the words rise and the photo settles inside its cut, once.
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
import { VisitButton } from './heroShared'

export default function DiagonalHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const words = brand.name.split(/\s+/)
  const longest = words.reduce((a, w) => (w.length > a.length ? w : a), '')

  useMotion(root, () => {
    rise('[data-hero-name]', { by: 'words' })
    settle('[data-hero-img]', { delay: 0.15 })
  })

  return (
    <section ref={root} id="top" className="page-top is-flush relative overflow-hidden bg-primary text-on-primary">
      <div
        data-hero-photo
        className="h-[42svh] overflow-hidden [clip-path:polygon(0_0,100%_0,100%_82%,0_100%)] md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[55%] md:[clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)]"
      >
        <div data-hero-img className="h-full w-full">
          <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
        </div>
      </div>
      <div className="wrap relative py-12 md:flex md:min-h-[86svh] md:items-center md:py-20">
        <div className="md:max-w-[45%]">
          <h1 data-hero-name className="t-hero" style={fitDisplay(longest, 8, 8)}>
            {words.map((w, i) => (
              <span key={i} className="block">
                {w}
              </span>
            ))}
          </h1>
          {brand.tagline && <p className="t-lead mt-6 max-w-[26ch] opacity-90">{brand.tagline}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            <VisitButton variant="link" />
          </div>
        </div>
      </div>
    </section>
  )
}
