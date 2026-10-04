// src/sections/gift/BulkGift.tsx
// Vouchers by the dozen, for a wedding's return gifts or an office: pick
// an amount, count up how many, and the total adds itself up before she
// asks. (Lab: gift O, "Counter and total".)
//
// Amounts from `giftVouchers.amounts`; when they haven't listed any, a
// few round amounts (they sell vouchers of any amount). Needs
// `giftVouchers`. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconMinus, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

const ROUND_AMOUNTS = [500, 1000, 2000, 5000]
const MAX = 100

const PILL =
  'min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 tabular-nums transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink'
const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink'

export default function BulkGift() {
  const { boutique } = useBoutique()
  const listed = boutique.giftVouchers?.amounts ?? []
  const amounts = listed.length ? listed : ROUND_AMOUNTS
  const [amount, setAmount] = useState(amounts[1] ?? amounts[0])
  const [count, setCount] = useState(10)
  if (!boutique.giftVouchers) return null
  const total = amount * count

  return (
    <section id="gift-bulk" className="section bg-paper">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Vouchers for everyone</h2>
          <p className="t-lead mt-5 max-w-[34ch] text-muted">For return gifts, a team or the whole family.</p>
          <div className="mt-10" role="group" aria-label="Amount per voucher">
            <p className="t-small text-muted">Each voucher</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {amounts.map((a) => (
                <button key={a} type="button" onClick={() => setAmount(a)} aria-pressed={a === amount} className={PILL}>
                  {rupees(a)}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <p className="t-small text-muted">How many</p>
            <div className="mt-3 flex items-center gap-4">
              <button type="button" onClick={() => setCount(Math.max(1, count - 1))} disabled={count <= 1} aria-label="One fewer" className={ROUND}>
                <IconMinus size={22} stroke={1.75} aria-hidden="true" />
              </button>
              <span className="t-2 min-w-12 text-center tabular-nums" aria-live="polite">
                {count}
              </span>
              <button type="button" onClick={() => setCount(Math.min(MAX, count + 1))} disabled={count >= MAX} aria-label="One more" className={ROUND}>
                <IconPlus size={22} stroke={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        <div className="self-end md:col-span-6">
          <p className="t-small text-muted">
            {count} × {rupees(amount)}
          </p>
          <p className="t-hero tabular-nums text-primary-ink" aria-live="polite">
            {rupees(total)}
          </p>
          <div className="mt-8">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like ${count} gift voucher${count === 1 ? '' : 's'} of ${rupees(amount)} each (${rupees(total)} in all). How do I pay?`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Ask for these vouchers
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
