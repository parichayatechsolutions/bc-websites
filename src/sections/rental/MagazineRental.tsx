// src/sections/rental/MagazineRental.tsx
// "Rent the look", set as a magazine page: a ruled masthead, the first
// piece large with its sizes and rent, and the rest in a ruled list beside
// it, each with a link to ask. For the type-led designs.
// (Lab: rental P, "Rent the look".)
//
// Pieces from `rentals`; rent only with permission. Hides without pieces.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Media from '../../components/Media'
import type { RentalPiece } from '../../types/boutique'

export default function MagazineRental() {
  const { boutique } = useBoutique()
  const pieces = boutique.rentals ?? []
  if (!pieces.length) return null
  const [lead, ...rest] = pieces
  const showPrices = boutique.permissions.showPrices
  const details = (p: RentalPiece) => [p.sizes && `Sizes ${p.sizes}`, showPrices && p.pricePerDay && `${rupees(p.pricePerDay)} a day`].filter(Boolean).join(' · ')
  const ask = (p: RentalPiece) => whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${p.name}.`)

  return (
    <section id="rental" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-y-2 border-ink py-4">
          <h2 className="t-1">Rent the look</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <div className={`mt-10 grid gap-10 ${rest.length ? 'md:grid-cols-12 md:gap-14' : ''}`}>
          <article className={rest.length ? 'md:col-span-7' : 'max-w-xl'}>
            <div className="aspect-[4/5] overflow-hidden bg-paper">
              <Media file={lead.photo} alt={lead.name} />
            </div>
            <h3 className="t-2 mt-5">{lead.name}</h3>
            {details(lead) && <p className="mt-1 text-muted">{details(lead)}</p>}
            <a href={ask(lead)} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink">
              <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
              <span className="link-stitch">Ask to rent</span>
            </a>
          </article>
          {rest.length > 0 && (
            <ul className="border-t border-ink/15 md:col-span-5">
              {rest.map((p) => (
                <li key={p.name} className="flex items-center gap-4 border-b border-ink/15 py-4">
                  <div className="h-20 w-16 shrink-0 overflow-hidden bg-paper">
                    <Media file={p.photo} alt="" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="t-3">{p.name}</p>
                    {details(p) && <p className="t-small text-muted">{details(p)}</p>}
                  </div>
                  <a href={ask(p)} target="_blank" rel="noopener noreferrer" aria-label={`Ask to rent the ${p.name}`} className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-primary-ink transition-colors duration-200 ease-stitch hover:bg-primary-ink hover:text-on-primary-ink">
                    <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
