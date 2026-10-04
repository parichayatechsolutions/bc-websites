// src/sections/rental/AvailabilityRental.tsx
// Is it free on my date? Pick a rental piece and the date of the function;
// WhatsApp opens asking exactly that. The site can't see their bookings,
// so it asks rather than answers. (Lab: rental E, "Check availability".)
//
// Pieces from `rentals`; hides without them. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Media from '../../components/Media'

export default function AvailabilityRental() {
  const { boutique } = useBoutique()
  const pieces = boutique.rentals ?? []
  const [index, setIndex] = useState(0)
  const [date, setDate] = useState('')
  if (!pieces.length) return null

  const piece = pieces[index] ?? pieces[0]
  const when = date ? new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }) : ''
  const message = `Hi ${boutique.brand.name}, is the ${piece.name} free to rent${when ? ` for ${when}` : ''}?`

  return (
    <section id="rental-check" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="arch aspect-[3/4] bg-paper">
            <Media key={piece.photo} file={piece.photo} alt={piece.name} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">Is it free on your date?</h2>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Outfit">
            {pieces.map((p, i) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 text-left transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {p.name}
              </button>
            ))}
          </div>
          <p className="mt-6 text-muted">
            {[piece.sizes && `Sizes ${piece.sizes}`, boutique.permissions.showPrices && piece.pricePerDay && `${rupees(piece.pricePerDay)} a day`].filter(Boolean).join(' · ')}
          </p>
          <div className="mt-8 max-w-xs">
            <Field label="Date of your function" required>
              {(field) => <input {...field} type="date" value={date} min={new Date().toLocaleDateString('en-CA')} onChange={(e) => setDate(e.target.value)} />}
            </Field>
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Ask if it’s free
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
