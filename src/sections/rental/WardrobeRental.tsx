// src/sections/rental/WardrobeRental.tsx
// An open wardrobe: their rental pieces hang side by side as slim strips
// on a thread rod, and the one she taps opens wide with its name, sizes and
// rent per day beneath. (Lab: rental H, "Wardrobe".)
//
// Pieces from `rentals`, up to six; photos rental-<nn>.jpg. Rent shows only
// with permission to show prices. Hides without pieces. The strips open
// with a CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function WardrobeRental() {
  const { boutique } = useBoutique()
  const pieces = (boutique.rentals ?? []).slice(0, 6)
  const [active, setActive] = useState(0)
  if (!pieces.length) return null
  const piece = pieces[active] ?? pieces[0]
  const showPrices = boutique.permissions.showPrices

  return (
    <section id="rental" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">From our wardrobe</h2>
        <div className="mt-12 border-x-4 border-t-4 border-ink/80 bg-paper px-3 pt-6 md:px-6 md:pt-8">
          <span aria-hidden="true" className="block border-t-2 border-thread" />
          <ul className="flex h-[26rem] gap-2 md:h-[32rem] md:gap-3" role="group" aria-label="Rental pieces">
            {pieces.map((p, i) => {
              const on = i === active
              return (
                <li key={p.name} className={`min-w-10 transition-[flex-grow] duration-500 ease-stitch ${on ? 'grow-[8]' : 'grow'}`} style={{ flexBasis: 0 }}>
                  <button type="button" onClick={() => setActive(i)} aria-pressed={on} aria-label={p.name} className="flex h-full w-full cursor-pointer flex-col items-center">
                    <span aria-hidden="true" className="h-5 w-px bg-thread" />
                    <span className="block w-full flex-1 overflow-hidden bg-light">
                      <Media file={p.photo} alt="" />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-6 border-t-2 border-ink/80 pt-6" aria-live="polite">
          <div>
            <p className="t-2">{piece.name}</p>
            <p className="mt-1 text-muted">
              {[piece.sizes && `Sizes ${piece.sizes}`, showPrices && piece.pricePerDay && `${rupees(piece.pricePerDay)} a day`].filter(Boolean).join(' · ')}
            </p>
          </div>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${piece.name}.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask to rent this
          </Button>
        </div>
      </div>
    </section>
  )
}
