// src/sections/alterations/OrNewAlterations.tsx
// Alter it, or stitch new? For each garment they list both ways, what an
// alteration costs set against what a new one starts at, side by side,
// and she decides. (Lab: alter O, "Alter or new?".)
//
// Pairs an alteration rate with a starting price when both name the same
// garment (blouse, kurti, lehenga…). Only with permission to show prices,
// and only the garments with both; hides without any. Just the figures:
// no advice on which to choose. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

const GARMENTS = ['blouse', 'kurti', 'kurta', 'lehenga', 'salwar', 'churidar', 'gown', 'frock', 'saree', 'pant', 'shirt']

export default function OrNewAlterations() {
  const { boutique } = useBoutique()
  const show = boutique.permissions.showPrices
  const rates = show ? (boutique.alterationPrices ?? []) : []
  const starting = show ? (boutique.pricing?.startingAt ?? []) : []

  const rows = GARMENTS.flatMap((g) => {
    const match = new RegExp(`\\b${g}`, 'i')
    const alter = rates.filter((r) => match.test(r.item)).sort((a, b) => a.price - b.price)[0]
    const fresh = starting.filter((s) => match.test(s.item)).sort((a, b) => a.price - b.price)[0]
    return alter && fresh ? [{ garment: g.charAt(0).toUpperCase() + g.slice(1), alter, fresh }] : []
  }).slice(0, 4)

  if (!rows.length) return null

  return (
    <section id="alter-or-new" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Alter it, or stitch new?</h2>
        <ul className="mt-12 space-y-4">
          {rows.map(({ garment, alter, fresh }) => (
            <li key={garment} className="grid gap-px overflow-hidden rounded-2xl border border-ink/15 bg-ink/15 sm:grid-cols-[10rem_1fr_1fr]">
              <p className="t-3 bg-light p-5 sm:flex sm:items-center">{garment}</p>
              <div className="bg-light p-5">
                <p className="t-small text-muted">Alter · {alter.item}</p>
                <p className="t-2 mt-1 tabular-nums text-primary-ink">{rupees(alter.price)}</p>
              </div>
              <div className="bg-paper p-5">
                <p className="t-small text-muted">Stitch new · {fresh.item}, from</p>
                <p className="t-2 mt-1 tabular-nums">{rupees(fresh.price)}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could I send you a photo to ask whether it can be altered?`)} variant="primary" icon={IconBrandWhatsapp}>
            Send a photo and ask
          </Button>
        </div>
      </div>
    </section>
  )
}
