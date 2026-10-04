// src/sections/alterations/BandAlterations.tsx
// On the brand colour between two zari borders, before and after pairs
// side by side, each photo in a fine gold frame, with their notes.
// (Lab: alt I, "Brand band".)
//
// Needs before/after pairs; up to two. Hides without them. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { Label, useAlterations } from './altShared'

export default function BandAlterations() {
  const { boutique } = useBoutique()
  const { pairs, caption } = useAlterations()
  const shown = pairs.slice(0, 2)
  if (!shown.length) return null

  return (
    <section id="alterations" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="section">
        <div className="wrap">
          <h2 className="t-1 max-w-[10ch] text-balance">Before and after</h2>
          <ul className={`mt-12 grid gap-12 ${shown.length > 1 ? 'lg:grid-cols-2' : 'max-w-2xl'}`}>
            {shown.map((pair) => (
              <li key={pair.before}>
                <figure>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { file: pair.before, label: 'Before', side: 'left' as const },
                      { file: pair.after, label: 'After', side: 'right' as const },
                    ].map(({ file, label, side }) => (
                      <div key={label} className="border border-accent p-1">
                        <div className="relative aspect-[3/4] overflow-hidden bg-paper">
                          <Media file={file} alt={`${caption(pair) ?? 'The garment'}, ${label.toLowerCase()}`} />
                          <Label side={side}>{label}</Label>
                        </div>
                      </div>
                    ))}
                  </div>
                  {caption(pair) && <figcaption className="t-3 mt-4">{caption(pair)}</figcaption>}
                </figure>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have something that needs altering.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
          >
            <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
            Send a photo on WhatsApp
          </a>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
