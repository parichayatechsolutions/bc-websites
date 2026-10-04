// src/sections/alterations/GarmentAlterations.tsx
// Pick the garment: their garments set as large words in a row, and the
// fixes and prices for the one picked listed beneath.
// (Lab: alter K, "Pick the garment".)
//
// Rates from `alterationPrices`, only with permission, grouped by the
// garment named in each (anything unnamed goes under "Other"). Needs two
// groups; hides otherwise. The list swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

const GARMENTS = ['Blouse', 'Kurti', 'Kurta', 'Lehenga', 'Salwar', 'Churidar', 'Gown', 'Saree', 'Pant', 'Shirt', 'Frock']

export default function GarmentAlterations() {
  const { boutique } = useBoutique()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  const groups = [
    ...GARMENTS.map((g) => ({ name: g, rates: rates.filter((r) => new RegExp(`\\b${g}`, 'i').test(r.item)) })),
    { name: 'Other', rates: rates.filter((r) => !GARMENTS.some((g) => new RegExp(`\\b${g}`, 'i').test(r.item))) },
  ].filter((g) => g.rates.length)
  const [index, setIndex] = useState(0)
  if (groups.length < 2) return null
  const group = groups[index] ?? groups[0]

  return (
    <section id="alteration-prices" className="section">
      <div className="wrap">
        <h2 className="sr-only">Alteration prices</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-2" role="group" aria-label="Garment">
          {groups.map((g, i) => (
            <button
              key={g.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className="t-1 cursor-pointer text-ink/35 transition-colors duration-200 ease-stitch hover:text-ink aria-pressed:text-primary-ink"
            >
              {g.name}
            </button>
          ))}
        </div>
        <dl key={index} className="mt-10 max-w-2xl animate-[fade-in_700ms_var(--ease-stitch)] border-t-2 border-ink" aria-live="polite">
          {group.rates.map(({ item, price }) => (
            <div key={item} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-4">
              <dt>{item}</dt>
              <dd className="shrink-0 tabular-nums text-primary-ink">{rupees(price)}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I have a ${group.name === 'Other' ? 'garment' : group.name.toLowerCase()} that needs altering.`)} variant="primary" icon={IconBrandWhatsapp}>
            Send a photo on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
