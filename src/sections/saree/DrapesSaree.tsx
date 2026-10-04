// src/sections/saree/DrapesSaree.tsx
// The ways they drape a saree, one photo each in alternating rows, with
// the drape's name, their note, and a link to book a draping.
// (Lab: saree A, "Six ways to wear it".)
//
// Drapes come from photos named drape-<style>.jpg (drape-nivi.jpg). Hides
// without any.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoTag } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function DrapesSaree() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const drapes = boutique.media.drapes ?? []
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-drape]', { trigger: root.current })
  })

  if (!drapes.length) return null

  return (
    <section ref={root} id="drapes" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Ways to wear your saree</h2>
        <ul className="mt-12 space-y-12 md:space-y-16">
          {drapes.map((f, i) => {
            const style = photoTag(f, 'drape') ?? 'Drape'
            return (
              <li key={f} className="grid items-center gap-6 md:grid-cols-12 md:gap-12">
                <div data-drape className={`arch aspect-[3/4] w-full max-w-sm bg-paper md:col-span-5 md:max-w-none ${i % 2 ? 'md:order-2 md:col-start-8' : ''}`}>
                  <Media file={f} alt={`${style} drape`} />
                </div>
                <div className={`md:col-span-6 ${i % 2 ? 'md:order-1 md:col-start-1' : 'md:col-start-7'}`}>
                  <h3 className="t-2">{style} drape</h3>
                  {captions[f] && <p className="mt-3 max-w-[36ch] text-muted">{captions[f]}</p>}
                  <a
                    href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like my saree draped in the ${style} style.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
                  >
                    <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                    <span className="link-stitch">Ask about this drape</span>
                  </a>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
