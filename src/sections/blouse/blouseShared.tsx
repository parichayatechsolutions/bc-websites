// src/sections/blouse/blouseShared.tsx
// What the blouse designers share: whether the boutique stitches blouses at
// all, the price line (only with permission), the WhatsApp message, and the
// pill buttons for each choice.

import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import { describe, type IOption } from './blouseDrawing'

/** Four classic combinations of neck, back and sleeves, with when each works: styling guidance, true of the cuts. */
export const CLASSICS = [
  { name: 'The everyday classic', neck: 'round', back: 'u', sleeve: 'elbow', note: 'Goes with any saree, from cotton to silk.' },
  { name: 'The bridal back', neck: 'sweet', back: 'vb', sleeve: 'elbow', note: 'A soft front and a deep back for a tie or embroidery.' },
  { name: 'Light for summer', neck: 'boat', back: 'win', sleeve: 'cap', note: 'Wide and airy, with a little coverage at the back.' },
  { name: 'Clean and modern', neck: 'square', back: 'sq', sleeve: 'three', note: 'Straight lines that frame a necklace and back work.' },
]

export function useBlouse() {
  const { boutique } = useBoutique()
  const items = [...boutique.services.featured, ...boutique.services.groups.flatMap((g) => g.items)]
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []) : []
  const blousePrices = prices.filter((p) => /blouse/i.test(p.item))

  return {
    stitchesBlouses: items.some((item) => /blouse/i.test(item)),
    priceLine: blousePrices.map((p) => `${p.item} from ${rupees(p.price)}`).join(' · '),
    send: (neck: string, back: string, sleeve: string) =>
      whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a blouse with ${describe(neck, back, sleeve)}. Could you tell me more?`),
  }
}

/** One row of choices: a label and a pill per option. */
export function Choices({ label, options, value, onChange }: { label: string; options: IOption[]; value: string; onChange: (id: string) => void }) {
  return (
    <div role="group" aria-label={label}>
      <p className="t-small text-muted">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={o.id === value}
            className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
          >
            {o.name}
          </button>
        ))}
      </div>
    </div>
  )
}
