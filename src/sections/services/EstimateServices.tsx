// src/sections/services/EstimateServices.tsx
// Price estimate: pick the garment from their starting prices, switch on
// express if she's in a hurry, and a brand-colour card shows where the
// price starts and when it's usually ready, with a button to ask.
// (Lab: services Q, "Price estimate", without the dotted backdrop.)
//
// Needs starting prices and permission to show them; hides otherwise. The
// express switch shows only with `pricing.express`; its charge is added
// only when that line names one in rupees, and is otherwise shown as
// written. Always "from": the card never claims a final price. The figure
// changes with a CSS fade.

import { useState } from 'react'
import { IconBolt, IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import { PRICE_NOTE, useServices } from './servicesShared'

/** "48 hours, ₹300 extra" → 300; undefined when no rupee amount is written. */
function expressCharge(text?: string): number | undefined {
  const m = text?.match(/(?:₹|\brs\.?)\s*(\d[\d,]*)/i)
  return m ? Number(m[1].replace(/,/g, '')) : undefined
}

export default function EstimateServices() {
  const { boutique } = useBoutique()
  const { prices } = useServices()
  const express = boutique.pricing?.express
  const days = boutique.pricing?.deliveryDays
  const [picked, setPicked] = useState(0)
  const [fast, setFast] = useState(false)
  if (!prices.length) return null

  const choice = prices[Math.min(picked, prices.length - 1)]
  const charge = fast ? expressCharge(express) : undefined
  const total = choice.price + (charge ?? 0)
  const when = fast && express ? `Express: ${express}` : days ? `Usually ready in ${days} days` : undefined

  return (
    <section id="estimate" className="section bg-paper">
      <div className="wrap grid items-start gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">Price estimate</h2>
          <p className="mt-5 max-w-[40ch] text-muted">{PRICE_NOTE}</p>

          <h3 className="mt-10 font-semibold">1. Choose the garment</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2" role="group" aria-label="Garment">
            {prices.map(({ item, price }, i) => (
              <button
                key={item}
                type="button"
                onClick={() => setPicked(i)}
                aria-pressed={choice.item === item}
                className="flex min-h-16 cursor-pointer flex-col items-start justify-center rounded-full border border-ink/20 bg-light px-5 py-3 text-left transition-[background-color,color,border-color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                <span className="font-semibold">{item}</span>
                <span className="t-small">from {rupees(price)}</span>
              </button>
            ))}
          </div>

          {express && (
            <>
              <h3 className="mt-10 font-semibold">2. Need it fast?</h3>
              <button
                type="button"
                role="switch"
                aria-checked={fast}
                onClick={() => setFast(!fast)}
                className="group mt-4 flex min-h-14 w-full cursor-pointer items-center gap-4 text-left"
              >
                <span className="relative h-7 w-12 shrink-0 rounded-full bg-ink/20 transition-colors duration-200 ease-stitch group-aria-checked:bg-primary-ink" aria-hidden="true">
                  <span className="absolute top-1 left-1 h-5 w-5 rounded-full bg-light transition-[translate] duration-200 ease-stitch group-aria-checked:translate-x-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <IconBolt size={18} stroke={1.75} aria-hidden="true" />
                    Express stitching
                  </span>
                  <span className="t-small block text-muted">{express}</span>
                </span>
              </button>
            </>
          )}
        </div>

        <div className="bg-primary p-7 text-on-primary md:sticky md:top-24 md:col-span-5 md:p-9" aria-live="polite">
          <p className="t-small">Your estimate · {choice.item}</p>
          <p key={`${choice.item}-${fast}`} className="mt-3 animate-[fade-in_700ms_var(--ease-stitch)] font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-none break-words tabular-nums">
            {rupees(total)}
          </p>
          <p className="t-small mt-1">starting price{charge ? ', with express' : ''}</p>
          {when && <p className="mt-6 border-t border-on-primary/25 pt-5">{when}</p>}
          <div className="mt-8">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a price for this: ${choice.item}${fast ? ', on express' : ''}.`)}
              variant="accent"
              icon={IconBrandWhatsapp}
            >
              Ask for a price
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
