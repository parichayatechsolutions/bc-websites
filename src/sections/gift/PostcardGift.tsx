// src/sections/gift/PostcardGift.tsx
// A gift voucher as a postcard: a message side and an address side split
// by a rule, their logo as the stamp in a perforated edge, and a round
// postmark with their city. (Lab: gift Y, "Postcard".)
//
// Needs `giftVouchers`; amounts only when they've listed some. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'
import Logo from '../../components/Logo'

export default function PostcardGift() {
  const { boutique } = useBoutique()
  if (!boutique.giftVouchers) return null
  const amounts = boutique.giftVouchers.amounts
  const city = boutique.branches[0]?.city

  return (
    <section id="gift" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Send a gift voucher</h2>
        <div className="mt-10 grid rounded-2xl border border-ink/15 bg-paper p-6 sm:grid-cols-2 md:p-10">
          <div className="pb-6 sm:border-r sm:border-ink/20 sm:pr-8 sm:pb-0">
            <p className="t-2 font-display text-primary-ink">A gift from {boutique.brand.name}</p>
            <p className="mt-4 text-muted">To be spent on anything she’d like stitched.</p>
            {amounts.length > 0 && (
              <p className="mt-6">
                <span className="text-muted">Vouchers of </span>
                <span className="font-semibold tabular-nums">{amounts.map(rupees).join(', ')}</span>
              </p>
            )}
          </div>
          <div className="relative border-t border-ink/20 pt-6 sm:border-t-0 sm:pt-0 sm:pl-8">
            <div className="flex items-start justify-end gap-4">
              {city && (
                <span aria-hidden="true" className="grid h-20 w-20 -rotate-12 place-content-center rounded-full border-2 border-ink/40 text-center text-[0.65rem] leading-tight font-semibold text-ink/60">
                  {city}
                </span>
              )}
              <span aria-hidden="true" className="border-[3px] border-dotted border-ink/40 bg-light p-2">
                <Logo className="h-14 w-12" />
              </span>
            </div>
            <div className="mt-8 space-y-6" aria-hidden="true">
              <span className="block border-b border-ink/30" />
              <span className="block border-b border-ink/30" />
              <span className="block border-b border-ink/30" />
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to send a gift voucher. How do I pay?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a voucher
          </Button>
        </div>
      </div>
    </section>
  )
}
