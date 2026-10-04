// src/sections/kids/WhenKids.tsx
// When to order, for parents: pick the day it's needed and see the latest
// day to order, from their usual delivery days, then a reminder that
// children grow, so a fitting close to the day helps.
// (Lab: kids S, "When to order".)
//
// Only the order-by date is worked out, from `pricing.deliveryDays`; no
// trial or pick-up dates are invented. Needs that and a Kids group. No
// motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

const long = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

export default function WhenKids() {
  const { boutique } = useBoutique()
  const hasKids = boutique.services.groups.some((g) => /^kid|child/i.test(g.title))
  const days = boutique.pricing?.deliveryDays
  const [date, setDate] = useState('')
  if (!hasKids || !days) return null

  const needed = date ? new Date(`${date}T00:00:00`) : undefined
  const orderBy = needed ? new Date(needed.getTime() - days * 24 * 60 * 60 * 1000) : undefined
  const today = new Date(new Date().toLocaleDateString('en-CA') + 'T00:00:00')
  const late = orderBy && orderBy < today

  return (
    <section id="kids-when" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">When to order</h2>
          <p className="mt-4 text-muted">Usually ready in {days} days.</p>
          <div className="mt-8 max-w-xs">
            <Field label="When is it for?" required>
              {(props) => <input {...props} type="date" value={date} onChange={(e) => setDate(e.target.value)} />}
            </Field>
          </div>
        </div>
        <div className="rounded-2xl bg-paper p-7 md:col-span-7 md:p-10" aria-live="polite">
          {orderBy ? (
            <>
              <p className="t-small text-muted">{late ? 'That’s sooner than our usual time' : 'Order by'}</p>
              <p className="t-1 mt-1 text-primary-ink">{late ? 'Ask us about express' : long(orderBy)}</p>
              <p className="mt-4 text-muted">Children grow fast, so a fitting close to the day helps it fit on the day.</p>
            </>
          ) : (
            <p className="t-3 text-muted">Pick the date to see when to order.</p>
          )}
          <div className="mt-8">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like an outfit stitched for my child${needed ? `, needed by ${long(needed)}` : ''}.`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
