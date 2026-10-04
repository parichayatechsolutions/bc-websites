// src/sections/gift/BuilderGift.tsx
// A gift voucher she can picture: pick an amount, write who it's for and
// from, and the voucher card fills in live; one button sends the request on
// WhatsApp. No payment happens on the site; the shop arranges it in the
// chat. (Lab: gift A, "Voucher builder".)
//
// Needs `giftVouchers` in the config (they sell them). Uses their amounts,
// or a field for any amount when they gave none. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconGift } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Logo from '../../components/Logo'

export default function BuilderGift() {
  const { boutique } = useBoutique()
  const amounts = boutique.giftVouchers?.amounts ?? []
  const [amount, setAmount] = useState<number | undefined>(amounts[1] ?? amounts[0])
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  if (!boutique.giftVouchers) return null

  const message = `Hi ${boutique.brand.name}, I'd like a gift voucher${amount ? ` for ${rupees(amount)}` : ''}${to ? ` for ${to.trim()}` : ''}${from ? `, from ${from.trim()}` : ''}. How do I pay?`

  return (
    <section id="gift" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Give a gift voucher</h2>
          <p className="mt-5 max-w-[36ch] text-muted">For a wedding, a birthday or a new baby.</p>

          {amounts.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Amount">
              {amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(a)}
                  aria-pressed={a === amount}
                  className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 tabular-nums transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {rupees(a)}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-8 max-w-xs">
              <Field label="Amount, ₹">
                {(field) => <input {...field} type="number" inputMode="numeric" min="0" step="100" onChange={(e) => setAmount(Number(e.target.value) || undefined)} />}
              </Field>
            </div>
          )}

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <Field label="For">{(field) => <input {...field} value={to} onChange={(e) => setTo(e.target.value)} maxLength={40} />}</Field>
            <Field label="From">{(field) => <input {...field} value={from} onChange={(e) => setFrom(e.target.value)} maxLength={40} />}</Field>
          </div>
        </div>

        <div className="md:col-span-6 md:pt-12">
          <div className="flex aspect-[16/10] flex-col justify-between bg-primary p-6 text-on-primary md:p-8" aria-live="polite">
            <div className="flex items-start justify-between gap-4">
              <Logo className="h-11 w-11 shrink-0" />
              <IconGift size={28} stroke={1.5} aria-hidden="true" />
            </div>
            <div>
              <p className="t-small opacity-80">Gift voucher · {boutique.brand.name}</p>
              <p className="t-1 mt-1 tabular-nums">{amount ? rupees(amount) : 'Any amount'}</p>
              <p className="mt-2 opacity-90">
                {to ? `For ${to}` : 'For someone special'}
                {from && `, from ${from}`}
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for this voucher
            </Button>
          </div>
          <p className="t-small mt-4 text-muted">This sends a request on WhatsApp; payment is arranged there.</p>
        </div>
      </div>
    </section>
  )
}
