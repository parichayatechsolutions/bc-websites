// src/sections/gallery/GridGallery.tsx
// Their finished work as a quiet two-column grid on the page's own
// background. Nothing pins and nothing slides sideways, so it suits a design
// whose signature motion is elsewhere; the only movement is the right column
// drifting a little slower than the left as you scroll, which keeps the grid
// from reading as a flat contact sheet.
//
// Reduced motion: an ordinary grid.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { EASE, gsap, MEDIA, SCRUB, useGSAP } from '../../motion/gsap'

// Heights alternate down each column so the two sides never line up.
const SHAPES = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[3/4]']

export default function GridGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const work = boutique.media.work
  const { featured } = boutique.services

  const columns = [work.filter((_, i) => i % 2 === 0), work.filter((_, i) => i % 2 === 1)]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MEDIA.motion} and ${MEDIA.desktop}`, () => {
        gsap.to('[data-grid-slow]', {
          yPercent: -7,
          ease: EASE.scroll,
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: SCRUB.soft },
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  if (!work.length) return null

  return (
    <section ref={root} className="section bg-light">
      <div className="wrap">
        <h2 className="t-1 max-w-[16ch] text-balance">Their work</h2>
        {featured.length > 0 && <p className="t-lead mt-5 max-w-[34ch] text-muted">{featured.join(' · ')}</p>}

        <div className="mt-14 grid gap-5 md:grid-cols-2 md:gap-8">
          {columns.map((column, c) => (
            <div key={c} data-grid-slow={c === 1 ? '' : undefined} className={`grid gap-5 md:gap-8 ${c === 1 ? 'md:pt-16' : ''}`}>
              {column.map((file, i) => (
                <figure
                  key={file}
                  className={`group overflow-hidden ${SHAPES[(c * 2 + i) % SHAPES.length]} ${c === 0 && i === 0 ? 'arch' : ''}`}
                >
                  <div className="h-full w-full transition-transform duration-700 ease-stitch group-hover:scale-[1.04]">
                    <Media file={file} alt={`${boutique.brand.name}, finished work ${c + i * 2 + 1}`} />
                  </div>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
