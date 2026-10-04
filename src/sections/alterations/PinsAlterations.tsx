// src/sections/alterations/PinsAlterations.tsx
// Tap the blouse: pins on a drawing of a blouse at the neck, sleeves,
// sides, hem and hooks; tapping one shows what fixing it costs.
// (Lab: alter G, "Tap the blouse", with plain pins rather than numbers,
// which aren't a sequence.)
//
// Rates from `alterationPrices`, only with permission; a pin appears only
// where one of their rates names that part. Needs two pins. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { BlouseFlat } from '../blouse/blouseDrawing'

// Where each part sits on the 200 × 160 drawing, as percentages.
const PARTS = [
  { id: 'neck', name: 'Neck', match: /neck/i, x: 50, y: 30 },
  { id: 'sleeve', name: 'Sleeves', match: /sleeve|arm/i, x: 20, y: 46 },
  { id: 'sides', name: 'Sides and fit', match: /side|loos|tight|fit|waist|bust|size/i, x: 66, y: 66 },
  { id: 'hem', name: 'Length', match: /length|hem|short|long/i, x: 50, y: 88 },
  { id: 'hooks', name: 'Hooks and zips', match: /hook|zip|button/i, x: 42, y: 62 },
]

export default function PinsAlterations() {
  const { boutique } = useBoutique()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  const pins = PARTS.map((p) => ({ ...p, rates: rates.filter((r) => p.match.test(r.item)) })).filter((p) => p.rates.length)
  const [index, setIndex] = useState(0)
  if (pins.length < 2) return null
  const pin = pins[index] ?? pins[0]

  return (
    <section id="alteration-prices" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="relative aspect-[5/4] bg-paper md:col-span-7">
          <div className="absolute inset-6 md:inset-10">
            <BlouseFlat neck="round" sleeve="elbow" />
            {pins.map((p, i) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={p.name}
                className="group absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span className="h-5 w-5 rounded-full border-2 border-light bg-primary-ink transition-[scale,background-color] duration-200 ease-stitch group-hover:scale-125 group-aria-pressed:scale-150 group-aria-pressed:bg-accent" />
              </button>
            ))}
          </div>
        </div>
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">What needs fixing?</h2>
          <p className="mt-4 text-muted">Tap a part of the blouse.</p>
          <div className="mt-8 border-t-2 border-ink" aria-live="polite">
            <p className="t-3 pt-4">{pin.name}</p>
            <dl className="mt-2">
              {pin.rates.map(({ item, price }) => (
                <div key={item} className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-3">
                  <dt>{item}</dt>
                  <dd className="shrink-0 tabular-nums text-primary-ink">{rupees(price)}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, my blouse needs fixing (${pin.name.toLowerCase()}).`)} variant="primary" icon={IconBrandWhatsapp}>
              Send a photo on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
