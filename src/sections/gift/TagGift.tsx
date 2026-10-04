// src/sections/gift/TagGift.tsx
// A kraft-paper gift tag on a string: she types who it's to and from, the
// names appear written on the tag, and the button asks for a voucher with
// them. (Lab: gift G, "Gift tag".)
//
// Needs `giftVouchers`; amounts to pick from only when they've listed
// some. Nothing is stored. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Field from '../../components/Field'

// Kraft paper's own colour, not the brand's.
const KRAFT = '#c9a77c'

export default function TagGift() {
  const { boutique } = useBoutique()
  const [to, setTo] = useState('')
  const [from, setFrom] = useState('')
  const [amount, setAmount] = useState<number>()
  if (!boutique.giftVouchers) return null
  const amounts = boutique.giftVouchers.amounts

  const message = `Hi ${boutique.brand.name}, I'd like a gift voucher${amount ? ` of ${rupees(amount)}` : ''}${to.trim() ? ` for ${to.trim()}` : ''}${from.trim() ? `, from ${from.trim()}` : ''}. How do I pay?`

  return (
    <section id="gift" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-6 md:col-span-6">
          <h2 className="t-1 max-w-[10ch] text-balance">Write the tag</h2>
          <Field label="To">{(props) => <input {...props} value={to} onChange={(e) => setTo(e.target.value)} />}</Field>
          <Field label="From">{(props) => <input {...props} value={from} onChange={(e) => setFrom(e.target.value)} />}</Field>
          {amounts.length > 0 && (
            <div role="group" aria-label="Amount">
              <p className="font-semibold">Amount</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {amounts.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAmount(a === amount ? undefined : a)}
                    aria-pressed={a === amount}
                    className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 tabular-nums transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                  >
                    {rupees(a)}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for this voucher
          </Button>
        </div>
        <div className="flex justify-center md:col-span-6" aria-hidden="true">
          <div className="flex flex-col items-center">
            <span className="h-16 w-px bg-ink/50" />
            <div
              className="relative w-60 rotate-3 px-7 pt-14 pb-10 text-[#3a2a17]"
              style={{ backgroundColor: KRAFT, clipPath: 'polygon(22% 0, 78% 0, 100% 16%, 100% 100%, 0 100%, 0 16%)' }}
            >
              <span className="absolute top-5 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-[#3a2a17]/50 bg-paper" />
              <p className="t-small">To</p>
              <p className="t-2 min-h-10 border-b border-[#3a2a17]/40 font-display italic">{to || '…'}</p>
              <p className="t-small mt-5">From</p>
              <p className="t-2 min-h-10 border-b border-[#3a2a17]/40 font-display italic">{from || '…'}</p>
              <p className="t-small mt-6">{amount ? `${rupees(amount)} gift voucher` : 'Gift voucher'}</p>
              <p className="font-semibold">{boutique.brand.name}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
