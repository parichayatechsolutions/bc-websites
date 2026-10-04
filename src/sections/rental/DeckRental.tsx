// src/sections/rental/DeckRental.tsx
// Dark, the rental pieces as a stack of prints, the top one in full and
// two peeking out behind; previous and next deal the deck, and the top
// piece's name, sizes and rent sit beside it. Nothing deals on its own.
// (Lab: rental O, "Deck".)
//
// Pieces from `rentals`; rent only with permission. Hides without pieces.
// The cards move with a CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark'
const BEHIND = ['rotate-0', 'rotate-3 translate-x-3', '-rotate-3 -translate-x-3']

export default function DeckRental() {
  const { boutique } = useBoutique()
  const pieces = boutique.rentals ?? []
  const [top, setTop] = useState(0)
  if (!pieces.length) return null
  const piece = pieces[top] ?? pieces[0]
  const step = (by: number) => setTop((top + by + pieces.length) % pieces.length)
  const showPrices = boutique.permissions.showPrices

  return (
    <section id="rental" className="section overflow-x-clip bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm">
            {pieces.map((p, i) => {
              const place = (i - top + pieces.length) % pieces.length
              if (place > 2) return null
              return (
                <div
                  key={p.name}
                  aria-hidden={place !== 0}
                  className={`absolute inset-0 border-[6px] border-light bg-light transition-transform duration-500 ease-stitch ${BEHIND[place]}`}
                  style={{ zIndex: 10 - place }}
                >
                  <Media file={p.photo} alt={place === 0 ? p.name : ''} />
                </div>
              )
            })}
          </div>
        </div>
        <div className="md:col-span-6" aria-live="polite">
          <h2 className="t-1 max-w-[12ch] text-balance">Rent for your day</h2>
          <p className="t-2 mt-8 text-accent-on-dark">{piece.name}</p>
          <p className="mt-2 text-light/80">
            {[piece.sizes && `Sizes ${piece.sizes}`, showPrices && piece.pricePerDay && `${rupees(piece.pricePerDay)} a day`].filter(Boolean).join(' · ')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${piece.name}.`)} icon={IconBrandWhatsapp}>
              Ask to rent this
            </Button>
            {pieces.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous piece" className={ROUND}>
                  <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next piece" className={ROUND}>
                  <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
