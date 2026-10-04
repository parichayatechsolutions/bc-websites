// src/sections/rental/RailRental.tsx
// Their rental pieces hanging from a thread rail, each with a swing tag
// carrying its name, sizes and rent per day, and a link to ask about
// renting it. (Lab: rental A, "Hanger rail".)
//
// Pieces from `rentals`; photos rental-<nn>.jpg. Rent shows only with the
// boutique's permission to show prices. Hides without pieces. Pieces wrap
// into rows on a phone rather than scroll sideways.
//
// Motion: the pieces settle from a small swing as they come into view.
// Reduced motion: hanging still.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Media from '../../components/Media'
import { sway } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function RailRental() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const pieces = boutique.rentals ?? []
  const showPrices = boutique.permissions.showPrices

  useMotion(root, () => {
    sway('[data-piece]', { trigger: root.current })
  })

  if (!pieces.length) return null

  return (
    <section ref={root} id="rental" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Rent an outfit</h2>
        <div className="relative mt-14">
          <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden border-t-2 border-thread md:block" />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4">
            {pieces.map((p) => (
              <li key={p.name} data-piece className="flex flex-col items-center">
                <span aria-hidden="true" className="hidden h-6 w-px bg-thread md:block" />
                <div className="arch aspect-[2/3] w-full bg-paper">
                  <Media file={p.photo} alt={p.name} />
                </div>
                <div className="-mt-4 w-[85%] border border-ink/15 bg-light p-4 text-center">
                  <p className="font-semibold">{p.name}</p>
                  {p.sizes && <p className="t-small mt-1 text-muted">Sizes {p.sizes}</p>}
                  {showPrices && p.pricePerDay && <p className="t-small mt-1 text-primary-ink">{rupees(p.pricePerDay)} a day</p>}
                </div>
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${p.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
                >
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                  <span className="link-stitch">Ask to rent</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
