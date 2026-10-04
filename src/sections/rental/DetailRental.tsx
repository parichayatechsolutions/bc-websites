// src/sections/rental/DetailRental.tsx
// One rental piece in detail: a large photo, its name, sizes and rent, and
// a button to check it's free, with the other pieces as thumbnails below to
// switch to. (Lab: rental G, "Item detail".)
//
// From `rentals`; rent only with permission. Hides without pieces. The
// photo swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function DetailRental() {
  const { boutique } = useBoutique()
  const pieces = boutique.rentals ?? []
  const [index, setIndex] = useState(0)
  if (!pieces.length) return null
  const piece = pieces[index] ?? pieces[0]

  return (
    <section id="rental" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <div className="aspect-[4/5] overflow-hidden bg-paper">
            <Media key={piece.photo} file={piece.photo} alt={piece.name} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
          {pieces.length > 1 && (
            <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="Other pieces">
              {pieces.map((p, i) => (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-pressed={i === index}
                    aria-label={p.name}
                    className="block aspect-square w-full cursor-pointer overflow-hidden bg-paper opacity-60 transition-opacity duration-200 ease-stitch hover:opacity-100 aria-pressed:opacity-100 aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-primary-ink"
                  >
                    <Media file={p.photo} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="md:col-span-5" aria-live="polite">
          <p className="t-small text-muted">To rent</p>
          <h2 className="t-1 mt-2 max-w-[14ch] text-balance">{piece.name}</h2>
          <dl className="mt-8 space-y-3 border-t border-ink/15 pt-6">
            {piece.sizes && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Sizes</dt>
                <dd>{piece.sizes}</dd>
              </div>
            )}
            {boutique.permissions.showPrices && piece.pricePerDay && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted">Rent</dt>
                <dd>{rupees(piece.pricePerDay)} a day</dd>
              </div>
            )}
          </dl>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, is the ${piece.name} free for my date?`)} variant="primary" icon={IconBrandWhatsapp}>
              Check if it’s free
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
