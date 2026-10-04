// src/sections/rental/IndexRental.tsx
// Everything they rent as a typeset list; choosing a piece shows its photo,
// sizes and rent beside the list, with a button to ask about it.
// (Lab: rental J, "Index".)
//
// From `rentals`; rent only with permission to show prices. Hides without
// pieces. The photo swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function IndexRental() {
  const { boutique } = useBoutique()
  const pieces = boutique.rentals ?? []
  const [index, setIndex] = useState(0)
  if (!pieces.length) return null
  const piece = pieces[index] ?? pieces[0]
  const rent = boutique.permissions.showPrices && piece.pricePerDay ? `${rupees(piece.pricePerDay)} a day` : undefined

  return (
    <section id="rental" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Outfits to rent</h2>
          <ul className="mt-10 border-t border-ink/15" role="group" aria-label="Rental pieces">
            {pieces.map((p, i) => (
              <li key={p.name} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-4 text-left transition-colors duration-200 ease-stitch aria-pressed:text-primary-ink"
                >
                  <span className="t-3">{p.name}</span>
                  <IconChevronRight size={18} stroke={1.5} aria-hidden="true" className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6">
          <div key={piece.photo} className="animate-[fade-in_700ms_var(--ease-stitch)]" aria-live="polite">
            <div className="arch aspect-[3/4] max-w-md bg-paper">
              <Media file={piece.photo} alt={piece.name} />
            </div>
            <p className="mt-5 text-muted">{[piece.sizes && `Sizes ${piece.sizes}`, rent].filter(Boolean).join(' · ')}</p>
          </div>
          <div className="mt-6">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${piece.name}.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask to rent this
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
