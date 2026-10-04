// src/sections/rental/BandRental.tsx
// On the brand colour between two zari borders, the rental pieces each in
// a fine double gold frame, with name, sizes and rent beneath and a link
// to ask. (Lab: rental I, "Brand band".)
//
// Pieces from `rentals`, up to four; rent only with permission. Hides
// without pieces. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Media from '../../components/Media'

export default function BandRental() {
  const { boutique } = useBoutique()
  const pieces = (boutique.rentals ?? []).slice(0, 4)
  if (!pieces.length) return null
  const showPrices = boutique.permissions.showPrices

  return (
    <section id="rental" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="section">
        <div className="wrap">
          <h2 className="t-1 max-w-[12ch] text-balance">Rent for the day</h2>
          <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {pieces.map((p) => (
              <li key={p.name}>
                <div className="border border-accent p-1">
                  <div className="border border-accent/60 p-1">
                    <div className="aspect-[3/4] overflow-hidden bg-paper">
                      <Media file={p.photo} alt={p.name} />
                    </div>
                  </div>
                </div>
                <p className="t-3 mt-4">{p.name}</p>
                <p className="t-small mt-1 opacity-85">
                  {[p.sizes && `Sizes ${p.sizes}`, showPrices && p.pricePerDay && `${rupees(p.pricePerDay)} a day`].filter(Boolean).join(' · ')}
                </p>
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${p.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold"
                >
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                  <span className="link-stitch">Ask to rent</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
