// src/sections/rental/ArchRental.tsx
// Each rental piece inside a tall temple arch, with its name, sizes and
// rent per day beneath and a link to ask about renting it. The arch
// family's rentals. (Lab: rental K, "Arches".)
//
// Pieces from `rentals`; photos rental-<nn>.jpg. Rent only with permission
// to show prices. Hides without pieces.
//
// Motion: the arches uncover in turn as they come into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function ArchRental() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const pieces = boutique.rentals ?? []
  const showPrices = boutique.permissions.showPrices

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (!pieces.length) return null

  return (
    <section ref={root} id="rental" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">To rent</h2>
        <ul className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {pieces.map((p) => (
            <li key={p.name} className="text-center">
              <div data-arch className="arch aspect-[2/3] border-2 border-accent/50 bg-paper p-1.5">
                <div className="arch h-full w-full">
                  <Media file={p.photo} alt={p.name} />
                </div>
              </div>
              <p className="t-3 mt-4 text-balance">{p.name}</p>
              <p className="t-small mt-1 text-muted">
                {[p.sizes && `Sizes ${p.sizes}`, showPrices && p.pricePerDay && `${rupees(p.pricePerDay)} a day`].filter(Boolean).join(' · ')}
              </p>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent the ${p.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
              >
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Ask to rent</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
