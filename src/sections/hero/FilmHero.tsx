// src/sections/hero/FilmHero.tsx
// Dark: one large photograph with a strip of thumbnails beneath it, and
// tapping a thumbnail swaps the large picture. The name and invitation sit
// beside the strip, never over the photo. Nothing changes on its own.
// (Lab: hero O, "Filmstrip".)
//
// The hero photo, then up to three work photos. With only the hero photo
// there's no strip. The large photo swaps with a CSS fade.
//
// Motion: the large photo eases in from slightly near on arrival.
// Reduced motion: still.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'
import { sinceLine } from './heroShared'

export default function FilmHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media } = boutique
  const captions = media.captions ?? {}
  const frames = [media.hero.src, ...media.work.filter((f) => f !== media.hero.src).slice(0, 3)]
  const [index, setIndex] = useState(0)
  const since = sinceLine(boutique.established, boutique.branches[0]?.city)

  useMotion(root, () => {
    settle('[data-hero-img]')
  })

  return (
    <section ref={root} id="top" className="page-top bg-dark text-light">
      <div className="mx-auto max-w-[1400px] px-5 pb-14 md:px-10">
        <div className="aspect-[4/5] overflow-hidden bg-light/5 sm:aspect-[16/9]">
          <div data-hero-img className="h-full w-full">
            <Media
              key={index}
              file={frames[index]}
              poster={index === 0 ? media.hero.poster : undefined}
              alt={captions[frames[index]] ?? `Work by ${brand.name}`}
              priority={index === 0}
              className="animate-[fade-in_700ms_var(--ease-stitch)]"
            />
          </div>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            {since && <p className="t-small text-light/75">{since}</p>}
            <h1 className="t-hero mt-3 max-w-[14ch] text-balance" style={fitDisplay(brand.name, 8, 6)}>
              {brand.name}
            </h1>
            <div className="mt-8">
              <Magnetic>
                <Button href={whatsappLink(boutique)} icon={IconBrandWhatsapp}>
                  Book a fitting
                </Button>
              </Magnetic>
            </div>
          </div>
          {frames.length > 1 && (
            <ul className="grid grid-cols-4 gap-2 md:col-span-5" role="group" aria-label="Choose a photo">
              {frames.map((f, i) => (
                <li key={f}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-pressed={i === index}
                    aria-label={`Photo ${i + 1}`}
                    className="block aspect-square w-full cursor-pointer overflow-hidden opacity-60 outline-offset-2 transition-opacity duration-200 ease-stitch hover:opacity-100 aria-pressed:opacity-100 aria-pressed:outline-2 aria-pressed:outline-accent"
                  >
                    <Media file={i === 0 ? (media.hero.poster ?? f) : f} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
