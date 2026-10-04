// src/sections/gift/SliderGift.tsx
// Any amount: a slider from ₹500 to ₹20,000, the amount set large as it
// moves, and what that would cover at their own starting prices, then a
// button to ask for it. (Lab: gift D, "Any amount".)
//
// Needs `giftVouchers`. "What it covers" needs starting prices with
// permission, and is labelled as starting prices. No motion.

import { useId, useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

const MIN = 500
const MAX = 20000
const STEP = 500

export default function SliderGift() {
  const { boutique } = useBoutique()
  const id = useId()
  const [amount, setAmount] = useState(2500)
  if (!boutique.giftVouchers) return null
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []) : []
  const covers = prices.filter((p) => p.price <= amount)

  return (
    <section id="gift" className="section bg-paper">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">A voucher for any amount</h2>
        <label htmlFor={id} className="sr-only">
          Voucher amount
        </label>
        <p className="t-hero mt-8 tabular-nums text-primary-ink" aria-live="polite">
          {rupees(amount)}
        </p>
        <input
          id={id}
          type="range"
          min={MIN}
          max={MAX}
          step={STEP}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-6 h-11 w-full cursor-pointer accent-[var(--c-primary-ink)]"
        />
        <div className="t-small flex justify-between text-muted" aria-hidden="true">
          <span>{rupees(MIN)}</span>
          <span>{rupees(MAX)}</span>
        </div>
        {prices.length > 0 && (
          <p className="mt-8">
            {covers.length
              ? `Enough for: ${covers.map((p) => `${p.item.toLowerCase()} (from ${rupees(p.price)})`).join(', ')}.`
              : 'Towards an order.'}
          </p>
        )}
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a ${rupees(amount)} gift voucher. How do I pay?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for this voucher
          </Button>
        </div>
      </div>
    </section>
  )
}
