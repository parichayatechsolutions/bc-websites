// src/sections/lookbook/OffsetLookbook.tsx
// Looks in three columns with the middle one dropped lower, like a
// magazine spread, each with its occasion, note and a link to ask for it.
// (Lab: look H, "Offset grid".)
//
// Looks from photos look-<occasion>-<nn>.jpg; up to six. Hides without
// any. On a phone they run in a single column.
//
// Motion: the photos uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function OffsetLookbook() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const looks = byFunction(boutique.media.looks ?? [], 'look').slice(0, 6)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    wipe('[data-look]', { trigger: root.current })
  })

  if (!looks.length) return null

  return (
    <section ref={root} id="lookbook" className="section">
      <div className="wrap">
        <h2 className="t-1">The lookbook</h2>
        <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {looks.map((f, i) => (
            <li key={f} className={i % 3 === 1 ? 'md:translate-y-20' : ''}>
              <figure>
                <div data-look className="aspect-[3/4] overflow-hidden bg-paper">
                  <Media file={f} alt={captions[f] ?? ''} />
                </div>
                <figcaption className="mt-4">
                  <span className="t-small block text-primary-ink">{photoTag(f, 'look')}</span>
                  {captions[f] && <span className="mt-1 block">{captions[f]}</span>}
                </figcaption>
              </figure>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a look like this: ${captions[f] ?? `your ${photoTag(f, 'look')?.toLowerCase() ?? ''} look`}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
              >
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Ask for this look</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
