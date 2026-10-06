// src/sections/hero/SplitHero.tsx
// Lookbook split: name, tagline, WhatsApp CTA and stats on the left;
// three-photo collage on the right with temple arches and closeups.
// (Lab: hero C, "Lookbook split".)

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import Magnetic from '../../motion/Magnetic'
import { rise, wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { fitDisplay } from '../../theme/theme'

export default function SplitHero() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const { brand, media, stats } = boutique
  const city = boutique.branches[0]?.city ?? 'Bengaluru'
  const since = boutique.established

  // Photos for the 3-image collage:
  // 1: Hero bridal piece (tall arch)
  // 2: Square detail / blouse
  // 3: Second arched piece / lehenga
  const photo1 = media.work.find((f) => f.includes('bridal')) ?? media.hero.src
  const photo2 = media.closeups?.[0] ?? media.work.find((f) => f.includes('blouse')) ?? media.hero.src
  const photo3 = media.work.find((f) => f.includes('lehenga') || f.includes('saree')) ?? media.work[1] ?? media.hero.src

  useMotion(root, () => {
    rise('[data-hero-text]', { by: 'words', delay: 0.1 })
    wipe('[data-hero-collage]', { delay: 0.2 })
  })

  return (
    <section ref={root} id="top" className="relative overflow-hidden bg-paper pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="wrap flex flex-wrap items-center gap-10 lg:flex-nowrap lg:gap-16">
        {/* Left Column: Facts & Branding */}
        <div className="flex-1 min-w-[320px]">
          <p data-hero-text className="text-sm font-medium tracking-wide text-muted">
            Tailoring in {city} {since && `since ${since}`}
          </p>

          <h1
            data-hero-text
            className="t-hero mt-3 text-balance text-primary-ink"
            style={fitDisplay(brand.name, 10, 8, 3.2)}
          >
            {brand.name}
          </h1>

          {brand.tagline && (
            <p data-hero-text className="mt-5 text-xl font-light leading-relaxed text-ink/85 md:text-2xl">
              {brand.tagline}
            </p>
          )}

          <div data-hero-text className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Book a fitting
              </Button>
            </Magnetic>
            <a
              href="#work"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-ink/30 px-7 font-semibold text-ink transition-colors duration-200 hover:border-ink hover:bg-ink/5"
            >
              See our work
            </a>
          </div>

          {stats && stats.length > 0 && (
            <dl data-hero-text className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/15 pt-6">
              {stats.slice(0, 3).map((st) => (
                <div key={st.label} className="flex flex-col-reverse">
                  <dt className="text-xs text-muted md:text-sm">{st.label}</dt>
                  <dd className="font-display text-2xl font-normal leading-tight text-primary-ink md:text-3xl">
                    {st.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Right Column: Three-photo collage */}
        <div data-hero-collage className="flex-1 min-w-[300px] grid grid-cols-[1.3fr_1fr] items-end gap-3.5 md:gap-5">
          {/* Main tall arch */}
          <div className="relative aspect-[3/4.4] overflow-hidden rounded-t-full bg-light shadow-xl">
            <Media file={photo1} alt={`Bespoke bridal work by ${brand.name}`} priority />
          </div>

          {/* Side stacked column */}
          <div className="grid gap-3.5 md:gap-5">
            {/* Square detail photo */}
            <div className="relative aspect-square overflow-hidden rounded-xl bg-light shadow-md">
              <Media file={photo2} alt={`Embroidery detail by ${brand.name}`} priority />
            </div>

            {/* Smaller arch photo */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full bg-light shadow-md">
              <Media file={photo3} alt={`Custom tailoring by ${brand.name}`} priority />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
