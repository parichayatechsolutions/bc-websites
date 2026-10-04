// src/sections/gift/RibbonGift.tsx
// A brand-colour band tied up like a present: a gold ribbon crossing it
// with a bow, "Gift vouchers" and the amounts they sell, and a link to ask.
// A band, not a full section. (Lab: gift R, "Ribbon banner".)
//
// Needs `giftVouchers`; amounts only when they've listed some. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'

export default function RibbonGift() {
  const { boutique } = useBoutique()
  if (!boutique.giftVouchers) return null
  const amounts = boutique.giftVouchers.amounts

  return (
    <aside aria-label="Gift vouchers" className="relative overflow-hidden bg-primary text-on-primary">
      <span aria-hidden="true" className="absolute inset-y-0 left-[18%] w-4 bg-accent md:left-[12%]" />
      <svg viewBox="0 0 80 50" aria-hidden="true" className="absolute top-1/2 left-[18%] w-20 -translate-x-[calc(50%-0.5rem)] -translate-y-1/2 md:left-[12%]">
        <path d="M 40 25 C 20 5 4 10 8 25 C 4 40 20 45 40 25 Z M 40 25 C 60 5 76 10 72 25 C 76 40 60 45 40 25 Z" style={{ fill: 'var(--c-accent)' }} />
        <circle cx={40} cy={25} r={6} style={{ fill: 'color-mix(in oklab, var(--c-accent) 80%, black)' }} />
      </svg>
      <div className="band">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 pl-[30%] md:pl-[22%]">
          <div>
            <p className="t-2">Gift vouchers</p>
            {amounts.length > 0 && <p className="mt-1 tabular-nums opacity-85">{amounts.map(rupees).join(' · ')}</p>}
          </div>
          <a
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a gift voucher. How do I pay?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 font-semibold"
          >
            <span className="link-stitch">Ask for one</span>
            <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  )
}
