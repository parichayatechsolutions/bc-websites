// src/sections/alterations/EstimateAlterations.tsx
// Tick the alterations you need and see the total from their own rates,
// then send the list on WhatsApp. Says plainly that it's an estimate: the
// shop sees the garment before it's final. (Lab: alter C, "Price estimate".)
//
// Rates from `alterationPrices`, only with permission to show prices;
// hides otherwise. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { joinList, rupees } from '../../app/text'
import Button from '../../components/Button'

export default function EstimateAlterations() {
  const { boutique } = useBoutique()
  const rates = boutique.permissions.showPrices ? (boutique.alterationPrices ?? []) : []
  const [ticked, setTicked] = useState<string[]>([])
  if (!rates.length) return null

  const chosen = rates.filter((r) => ticked.includes(r.item))
  const total = chosen.reduce((sum, r) => sum + r.price, 0)
  const toggle = (item: string) => setTicked(ticked.includes(item) ? ticked.filter((t) => t !== item) : [...ticked, item])
  const message = chosen.length
    ? `Hi ${boutique.brand.name}, I need these alterations: ${joinList(chosen.map((r) => r.item), true)}. Your rates come to about ${rupees(total)}.`
    : `Hi ${boutique.brand.name}, I have something that needs altering.`

  return (
    <section id="alteration-estimate" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">What needs fixing?</h2>
          <ul className="mt-10 border-t border-ink/15" role="group" aria-label="Alterations">
            {rates.map(({ item, price }) => {
              const on = ticked.includes(item)
              return (
                <li key={item} className="border-b border-ink/15">
                  <button type="button" onClick={() => toggle(item)} aria-pressed={on} className="group flex min-h-14 w-full cursor-pointer items-center gap-4 py-3 text-left">
                    <span
                      aria-hidden="true"
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ease-stitch ${
                        on ? 'border-primary-ink bg-primary-ink text-on-primary-ink' : 'border-ink/30 group-hover:border-ink'
                      }`}
                    >
                      {on && <IconCheck size={16} stroke={2} />}
                    </span>
                    <span className="flex-1">{item}</span>
                    <span className="shrink-0 text-muted">{rupees(price)}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="md:col-span-5 md:pt-24">
          <div className="rounded-2xl bg-paper p-6 md:p-8" aria-live="polite">
            <p className="t-small text-muted">{chosen.length ? `${chosen.length} alteration${chosen.length === 1 ? '' : 's'}` : 'Tick what you need'}</p>
            <p className="t-1 mt-2 text-primary-ink tabular-nums">{rupees(total)}</p>
            <p className="t-small mt-3 text-muted">An estimate from the rates above; the final price depends on the garment.</p>
            <div className="mt-8">
              <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
                Send on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
