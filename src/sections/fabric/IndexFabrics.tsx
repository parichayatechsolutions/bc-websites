// src/sections/fabric/IndexFabrics.tsx
// Their fabrics as a typeset index: a small round swatch, the name large,
// what it's best for, and a WhatsApp button per row. Reads quickly and
// works even before the swatches are photographed. (Lab: fabric J, "Index".)
//
// From `fabrics`; hides without any. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Media from '../../components/Media'

export default function IndexFabrics() {
  const { boutique } = useBoutique()
  const fabrics = boutique.fabrics ?? []
  if (!fabrics.length) return null

  return (
    <section id="fabrics" className="section">
      <div className="wrap">
        <h2 className="t-1">Fabrics we stock</h2>
        <ul className="mt-12 border-b border-ink/15">
          {fabrics.map((f) => (
            <li key={f.name} className="flex items-center gap-4 border-t border-ink/15 py-5 md:gap-8">
              <span className="block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-paper md:h-14 md:w-14" aria-hidden="true">
                <Media file={f.photo} alt="" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="t-2 block break-words">{f.name}</span>
                {f.bestFor && <span className="t-small text-muted">Best for {f.bestFor}</span>}
              </span>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your ${f.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${f.name} on WhatsApp`}
                title={`Ask about ${f.name}`}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/25 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-primary-ink hover:text-on-primary-ink active:translate-y-0"
              >
                <IconBrandWhatsapp size={22} stroke={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
