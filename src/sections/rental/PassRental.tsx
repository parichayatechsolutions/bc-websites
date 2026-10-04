// src/sections/rental/PassRental.tsx
// Each rental piece as a ticket: the photo, its name and sizes, and a
// stub past a perforated line with the rent per day and a link to ask.
// (Lab: rental X, "Rental pass".)
//
// Pieces from `rentals`; photos rental-<nn>.jpg. Without permission to
// show prices the stub just asks. Hides without pieces. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Media from '../../components/Media'

export default function PassRental() {
  const { boutique } = useBoutique()
  const pieces = boutique.rentals ?? []
  if (!pieces.length) return null
  const showPrices = boutique.permissions.showPrices

  return (
    <section id="rental" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Rent for the day</h2>
        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {pieces.map((p) => (
            <li key={p.name} className="grid grid-cols-[6rem_1fr] overflow-hidden rounded-2xl border border-ink/20 sm:grid-cols-[7rem_1fr_auto]">
              <div className="row-span-2 bg-paper sm:row-span-1">
                <Media file={p.photo} alt={p.name} />
              </div>
              <div className="min-w-0 p-5">
                <p className="t-3 text-pretty">{p.name}</p>
                {p.sizes && <p className="t-small mt-1 text-muted">Sizes {p.sizes}</p>}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t-2 border-dashed border-ink/25 px-5 py-3 sm:flex-col sm:items-start sm:justify-center sm:border-t-0 sm:border-l-2 sm:py-5">
                {showPrices && p.pricePerDay && (
                  <p>
                    <span className="t-2 tabular-nums">{rupees(p.pricePerDay)}</span>
                    <span className="t-small text-muted"> a day</span>
                  </p>
                )}
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${p.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
                >
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                  <span className="link-stitch">Ask to rent</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
