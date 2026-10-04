// src/sections/rental/ShowroomRental.tsx
// A dark showroom: one rental piece at a time in a tall arch, its name,
// sizes and rent beside it, with previous and next to walk the room.
// Nothing moves on its own. (Lab: rental D, "Showroom", without the lit
// stage: no gradient glow.)
//
// From `rentals`; rent only with permission. Hides without pieces. The
// piece swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-light/10 text-light transition-[background-color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-light/20 active:translate-y-0'

export default function ShowroomRental() {
  const { boutique } = useBoutique()
  const pieces = boutique.rentals ?? []
  const [index, setIndex] = useState(0)
  if (!pieces.length) return null
  const piece = pieces[index] ?? pieces[0]
  const step = (by: number) => setIndex((index + by + pieces.length) % pieces.length)

  return (
    <section id="rental" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div key={piece.photo} className="arch aspect-[3/4] max-w-sm animate-[fade-in_700ms_var(--ease-stitch)] bg-light/5">
            <Media file={piece.photo} alt={piece.name} />
          </div>
        </div>
        <div className="md:col-span-7">
          <p className="t-small text-accent-on-dark">
            To rent · {index + 1} of {pieces.length}
          </p>
          <h2 className="t-1 mt-4 max-w-[16ch] text-balance" aria-live="polite">
            {piece.name}
          </h2>
          <p className="mt-5 text-light/80">
            {[piece.sizes && `Sizes ${piece.sizes}`, boutique.permissions.showPrices && piece.pricePerDay && `${rupees(piece.pricePerDay)} a day`].filter(Boolean).join(' · ')}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${piece.name}.`)} icon={IconBrandWhatsapp}>
              Ask to rent
            </Button>
            {pieces.length > 1 && (
              <div className="flex gap-3">
                <button type="button" onClick={() => step(-1)} aria-label="Previous piece" className={ROUND}>
                  <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next piece" className={ROUND}>
                  <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
