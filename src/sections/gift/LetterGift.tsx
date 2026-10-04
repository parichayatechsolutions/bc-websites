// src/sections/gift/LetterGift.tsx
// A gift voucher as a letter: cream paper with the boutique's name at the
// head, a few lines saying a voucher is enclosed, and a wax seal bearing
// their initial. (Lab: gift L, "Wax-sealed letter".)
//
// The letter says only what a voucher is. Needs `giftVouchers`; amounts
// only when they've listed some. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

export default function LetterGift() {
  const { boutique } = useBoutique()
  if (!boutique.giftVouchers) return null
  const amounts = boutique.giftVouchers.amounts
  const initial = boutique.brand.name.trim().charAt(0).toUpperCase()

  return (
    <section id="gift" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">A gift, sealed</h2>
          {amounts.length > 0 && <p className="t-lead mt-5 tabular-nums text-muted">Vouchers of {amounts.map(rupees).join(', ')}</p>}
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a gift voucher. How do I pay?`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for a voucher
            </Button>
          </div>
        </div>
        <div className="md:col-span-7" aria-hidden="true">
          <div className="relative mx-auto max-w-md -rotate-1 bg-[#f4ecda] p-8 pb-16 text-[#3a2a17] ring-1 ring-ink/10 md:p-10 md:pb-20">
            <p className="t-3 border-b border-[#3a2a17]/25 pb-3 text-center">{boutique.brand.name}</p>
            <p className="mt-6 font-display text-lg leading-relaxed italic">Enclosed is a gift voucher, to be spent on anything you’d like stitched.</p>
            <p className="mt-4 font-display text-lg italic">With love,</p>
            <div className="mt-6 space-y-5">
              <span className="block border-b border-[#3a2a17]/30" />
              <span className="block border-b border-[#3a2a17]/30" />
            </div>
            <span className="absolute right-8 -bottom-6 grid h-20 w-20 place-items-center rounded-full bg-primary font-display text-3xl text-on-primary ring-4 ring-primary/40">
              {initial}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
