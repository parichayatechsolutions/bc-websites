// src/sections/hero/CoverHero.tsx
// A magazine cover: one full photograph, the boutique's name across the top
// as the masthead, and cover lines at the foot (what they're known for, the
// rating). (Lab: hero I, "Magazine cover".)
//
// Dark (the photo sits under a dark veil so the type reads), so it pairs
// with a floating nav on a page marked `overlay`.
//
// Motion: the name rises once. Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconStarFilled } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { rise } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'

export default function CoverHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media, social, services } = boutique

  useMotion(root, () => {
    rise('[data-hero-name]', { by: brand.name.length > 18 ? 'words' : 'letters' })
  })

  return (
    <section ref={root} id="top" className="page-top relative isolate flex min-h-svh flex-col justify-between overflow-hidden pb-12 text-white">
      <div className="absolute inset-0 -z-10">
        <Media file={media.hero.src} poster={media.hero.poster} alt={`Work by ${brand.name}`} priority />
        <div className="absolute inset-0 bg-dark/60" aria-hidden="true" />
      </div>

      <div className="wrap">
        <h1 data-hero-name className="t-hero text-balance text-white font-medium" style={fitDisplay(brand.name, 13, 10)}>
          {brand.name}
        </h1>
        {brand.tagline && <p className="t-lead mt-4 max-w-[30ch] text-white/90">{brand.tagline}</p>}
      </div>

      <div className="wrap mt-16 grid gap-8 md:grid-cols-12 md:items-end">
        <ul className="space-y-3 md:col-span-7">
          {services.featured.slice(0, 3).map((item) => (
            <li key={item} className="t-3 border-l-2 border-accent pl-4">
              {item}
            </li>
          ))}
          {social.googleRating && (
            <li className="flex items-center gap-2 border-l-2 border-accent pl-4">
              <IconStarFilled size={18} className="text-accent-on-dark" aria-hidden="true" />
              {social.googleRating.toFixed(1)} on Google
            </li>
          )}
        </ul>
        <div className="md:col-span-5 md:text-right">
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
