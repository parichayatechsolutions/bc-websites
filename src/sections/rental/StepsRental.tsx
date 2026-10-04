// src/sections/rental/StepsRental.tsx
// How renting works, in four steps joined by a thread (ask about your
// date, come and see it, pick it up, bring it back), then the first few
// pieces to rent. (Lab: rental C, "How it works", without a promised
// trial or deposit, which the config doesn't hold.)
//
// Pieces from `rentals`, up to four; rent only with permission. Hides
// without pieces.
//
// Motion: the thread draws across once. Reduced motion: in place.

import { useRef } from 'react'
import { IconArrowBack, IconBrandWhatsapp, IconCalendarQuestion, IconEye, IconShoppingBag } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const STEPS = [
  { title: 'Ask about your date', icon: IconCalendarQuestion },
  { title: 'Come and see it', icon: IconEye },
  { title: 'Pick it up', icon: IconShoppingBag },
  { title: 'Bring it back', icon: IconArrowBack },
]

export default function StepsRental() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const pieces = (boutique.rentals ?? []).slice(0, 4)
  const showPrices = boutique.permissions.showPrices

  useMotion(root, ({ desktop }) => {
    draw('[data-thread]', { trigger: root.current, from: desktop ? 'start' : 'top' })
  })

  if (!pieces.length) return null

  return (
    <section ref={root} id="rental" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">How renting works</h2>
        <div className="relative mt-12">
          <span
            data-thread
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-thread md:right-[12.5%] md:bottom-auto md:left-[12.5%] md:border-t-2 md:border-l-0"
          />
          <ol className="relative grid gap-6 md:grid-cols-4">
            {STEPS.map(({ title, icon: Icon }, i) => (
              <li key={title} className="flex items-center gap-5 md:flex-col md:text-center">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-thread bg-light text-primary-ink">
                  <Icon size={24} stroke={1.5} aria-hidden="true" />
                </span>
                <span className="t-3">
                  <span className="text-thread">{i + 1}. </span>
                  {title}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {pieces.map((p) => (
            <li key={p.name}>
              <div className="aspect-[3/4] overflow-hidden bg-paper">
                <Media file={p.photo} alt={p.name} />
              </div>
              <p className="t-3 mt-3">{p.name}</p>
              <p className="t-small text-muted">
                {[p.sizes && `Sizes ${p.sizes}`, showPrices && p.pricePerDay && `${rupees(p.pricePerDay)} a day`].filter(Boolean).join(' · ')}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to rent an outfit. My date is `)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about your date
          </Button>
        </div>
      </div>
    </section>
  )
}
