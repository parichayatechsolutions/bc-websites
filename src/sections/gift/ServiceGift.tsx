// src/sections/gift/ServiceGift.tsx
// Gift a service, not an amount: each thing they stitch, at its starting
// price, as a voucher she can give, with a link to ask for that one.
// (Lab: gift J, "Gift a service".)
//
// Needs `giftVouchers`, and starting prices with permission to show them;
// the prices are labelled as starting prices. Hides otherwise. No motion.

import { IconGift } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'

export default function ServiceGift() {
  const { boutique } = useBoutique()
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []) : []
  if (!boutique.giftVouchers || !prices.length) return null

  return (
    <section id="gift" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Gift a stitching</h2>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {prices.map((p) => (
            <li key={p.item}>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a gift voucher for ${p.item.toLowerCase()} stitching. How do I pay?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-center gap-5 rounded-2xl border border-dashed border-primary-ink/50 p-6 transition-[border-color,background-color] duration-200 ease-stitch hover:border-solid hover:border-primary-ink hover:bg-paper"
              >
                <IconGift size={30} stroke={1.5} className="shrink-0 text-primary-ink" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="t-3 block">{p.item}</span>
                  <span className="t-small block text-muted">From {rupees(p.price)}</span>
                </span>
                <span className="link-stitch t-small shrink-0 font-semibold text-primary-ink">Gift it</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
