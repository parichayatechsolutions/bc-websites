// src/sections/gift/BuysGift.tsx
// What a voucher buys: each of their voucher amounts beside what it covers
// at their own starting prices ("₹2,500: a designer blouse, from ₹1,200").
// Makes an amount easy to choose. (Lab: gift H, "What it buys".)
//
// Needs `giftVouchers` with amounts, and starting prices with permission
// to show them; hides otherwise. Only items whose starting price fits the
// amount are listed, and they're labelled as starting prices. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function BuysGift() {
  const { boutique } = useBoutique()
  const amounts = (boutique.giftVouchers?.amounts ?? []).slice(0, 4)
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []) : []
  if (!amounts.length || !prices.length) return null

  return (
    <section id="gift-buys" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">What a voucher buys</h2>
        <ul className="mt-12 border-b border-ink/15">
          {amounts.map((amount) => {
            const fits = prices.filter((p) => p.price <= amount)
            return (
              <li key={amount} className="grid gap-3 border-t border-ink/15 py-7 md:grid-cols-12 md:items-baseline md:gap-10">
                <p className="t-2 tabular-nums text-primary-ink md:col-span-3">{rupees(amount)}</p>
                <p className="md:col-span-6">
                  {fits.length
                    ? fits.map((p) => `${p.item} (from ${rupees(p.price)})`).join(', ')
                    : 'Towards an order'}
                </p>
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a ${rupees(amount)} gift voucher. How do I pay?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink md:col-span-3 md:justify-end"
                >
                  <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                  <span className="link-stitch">Ask for this one</span>
                </a>
              </li>
            )
          })}
        </ul>
        <p className="t-small mt-6 text-muted">Starting prices. The final price depends on the design and the handwork.</p>
        <div className="mt-8">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to buy a gift voucher.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about gift vouchers
          </Button>
        </div>
      </div>
    </section>
  )
}
