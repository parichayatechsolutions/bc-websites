// src/sections/hero/FounderHero.tsx
// The person first: the owner in a tall arch beside the first line of
// their story in their own words, signed with their name, and the
// boutique's name above. For a boutique that is its owner. (Lab: cine G,
// "Founder".)
//
// The portrait only with permission (their logo otherwise, never a
// generated face); the quote only when the story is in their own voice,
// otherwise their invitation line. Dark, so it suits a page marked
// `overlay`.
//
// Motion: the portrait settles and the quote's words come into focus, once.
// Reduced motion: still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Logo from '../../components/Logo'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { blurIn, settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useStory } from '../story/storyShared'

export default function FounderHero() {
  const { boutique } = useBoutique()
  const { owner, first, ownVoice, portrait } = useStory()
  const root = useRef<HTMLElement>(null)
  const line = ownVoice && first ? `“${first}”` : (boutique.highlight ?? boutique.brand.tagline)

  useMotion(root, () => {
    settle('[data-hero-photo]')
    blurIn('[data-hero-line]', { delay: 0.2 })
  })

  return (
    <section ref={root} id="top" className="page-top flex min-h-svh items-center bg-dark pb-16 text-light">
      <div className="wrap grid w-full items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          {portrait ? (
            <div className="arch aspect-[3/4] max-w-sm bg-light/5">
              <div data-hero-photo className="h-full w-full">
                <Media file={portrait} alt={owner.name} priority />
              </div>
            </div>
          ) : (
            <Logo className="h-28 w-28 rounded-full text-3xl md:h-40 md:w-40" />
          )}
        </div>
        <div className="md:col-span-7">
          <h1 className="t-2 text-accent-on-dark">{boutique.brand.name}</h1>
          {line && (
            <p data-hero-line className="t-1 mt-6 max-w-[20ch] text-balance">
              {line}
            </p>
          )}
          <p className="mt-8">
            <span className="t-3 block">{owner.name}</span>
            {owner.role && <span className="t-small text-light/70">{owner.role}</span>}
          </p>
          <div className="mt-10">
            <Magnetic>
              <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  )
}
