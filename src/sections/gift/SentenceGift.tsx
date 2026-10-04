// src/sections/gift/SentenceGift.tsx
// A gift voucher as one sentence she fills in: "A ₹2,500 voucher for Priya,
// from Anu." The blanks are real fields inside the sentence; one button
// sends it on WhatsApp. (Lab: gift C, "In one sentence".)
//
// Needs `giftVouchers`; uses their amounts when they gave some, otherwise
// any amount. Payment is arranged in the chat. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

const BLANK =
  'mx-1 inline-block min-h-11 border-b-2 border-dashed border-primary-ink bg-transparent px-1 text-primary-ink outline-none placeholder:text-primary-ink/45 focus:border-solid'

export default function SentenceGift() {
  const { boutique } = useBoutique()
  const amounts = boutique.giftVouchers?.amounts ?? []
  const [amount, setAmount] = useState(String(amounts[1] ?? amounts[0] ?? ''))
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  if (!boutique.giftVouchers) return null

  const value = Number(amount) || 0
  const message = `Hi ${boutique.brand.name}, I'd like a gift voucher${value ? ` for ${rupees(value)}` : ''}${to.trim() ? ` for ${to.trim()}` : ''}${from.trim() ? `, from ${from.trim()}` : ''}. How do I pay?`

  return (
    <section id="gift" className="section bg-paper">
      <div className="wrap">
        <p className="t-1 max-w-[24ch] leading-snug">
          A
          {amounts.length ? (
            <select aria-label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} className={`${BLANK} cursor-pointer`}>
              {amounts.map((a) => (
                <option key={a} value={a}>
                  {rupees(a)}
                </option>
              ))}
            </select>
          ) : (
            <input aria-label="Amount in rupees" inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))} placeholder="₹ amount" className={`${BLANK} w-[5.5ch]`} />
          )}
          gift voucher for
          <input aria-label="Who it’s for" value={to} onChange={(e) => setTo(e.target.value)} placeholder="her name" maxLength={30} className={`${BLANK} w-[7ch]`} />
          , from
          <input aria-label="Who it’s from" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="yours" maxLength={30} className={`${BLANK} w-[6ch]`} />.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Send on WhatsApp
          </Button>
          <p className="t-small text-muted">Payment is arranged on WhatsApp.</p>
        </div>
      </div>
    </section>
  )
}
