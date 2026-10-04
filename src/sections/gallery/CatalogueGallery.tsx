// src/sections/gallery/CatalogueGallery.tsx
// A catalogue: their work in a grid, each piece with a brand-colour label
// (its kind, or its note) and its own WhatsApp button to ask for one like
// it. Turns browsing straight into asking. (Lab: gallery X, "Catalogue",
// without the item numbers, which aren't stock numbers they use.)
//
// Work photos, up to nine. Hides without any. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Media from '../../components/Media'

export default function CatalogueGallery() {
  const { boutique } = useBoutique()
  const photos = boutique.media.work.slice(0, 9)
  const captions = boutique.media.captions ?? {}
  if (!photos.length) return null

  return (
    <section id="work" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Pick a piece</h2>
        <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {photos.map((f) => {
            const kind = photoCategory(f)
            const note = captions[f]
            const what = note ?? (kind ? `a ${kind.toLowerCase().replace(/s$/, '')} like this one` : 'a piece like this one')
            return (
              <li key={f} className="flex flex-col">
                <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                  <Media file={f} alt={note ?? `Work by ${boutique.brand.name}`} />
                  {kind && <span className="t-small absolute top-3 left-3 bg-primary-ink px-2.5 py-1 text-on-primary-ink">{kind}</span>}
                </div>
                {note && <p className="mt-3 text-muted">{note}</p>}
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${what.charAt(0).toLowerCase()}${what.slice(1)}. Could you tell me more?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 w-fit items-center gap-2 font-semibold text-primary-ink"
                >
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                  <span className="link-stitch">Ask about this</span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
