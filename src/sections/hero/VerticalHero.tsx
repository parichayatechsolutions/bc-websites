// src/sections/hero/VerticalHero.tsx
// The name runs up a strip of brand colour down the left edge, a photograph
// fills the rest of the screen, and a small card holds the invitation and
// the button. Unusual, and unmistakably theirs. (Lab: hero H, "Vertical
// name".)
//
// The name is sized by its length so a long one still fits the strip.
// Don't mark its page `overlay`.
//
// Motion: the photo settles once while the name rises. Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { rise, settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine } from './heroShared'

export default function VerticalHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    settle('[data-hero-photo]')
    rise('[data-hero-name]', { by: 'words', delay: 0.2 })
  })

  return (
    <section ref={root} id="top" className="page-top is-flush">
      <div className="grid h-[86svh] grid-cols-[4.5rem_1fr] md:grid-cols-[9rem_1fr]">
        <div className="flex items-end justify-center overflow-hidden bg-primary py-6 text-on-primary">
          <h1
            data-hero-name
            className="t-hero leading-none whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
            style={fitDisplay(brand.name, 6.5, 7.5, 2)}
          >
            {brand.name}
          </h1>
        </div>
        <div className="relative overflow-hidden bg-paper">
          <div data-hero-photo className="h-full w-full">
            <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
          </div>
          <div className="absolute right-4 bottom-4 left-4 max-w-sm bg-light p-6 text-ink md:right-auto md:bottom-8 md:left-8 md:p-8">
            {since && <p className="t-small text-muted">{since}</p>}
            {(boutique.highlight ?? brand.tagline) && <p className="t-3 mt-2">{boutique.highlight ?? brand.tagline}</p>}
            <div className="mt-5">
              <Magnetic>
                <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                  Book a fitting
                </Button>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
