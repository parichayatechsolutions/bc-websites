// src/sections/gift/AmmaGift.tsx
// For Amma: a gift voucher for a mother, with one of their pieces in a
// tall arch and a single warm line beside it, and a button to ask.
// (Lab: gift T, "For Amma".)
//
// The line is ours, an invitation, not a quote from anyone. Needs
// `giftVouchers`; the photo is their first work photo, when there is one.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function AmmaGift() {
  const { boutique } = useBoutique()
  if (!boutique.giftVouchers) return null
  const photo = boutique.media.work[0]

  return (
    <section id="gift-amma" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {photo && (
          <div className="arch aspect-[3/4] w-full max-w-sm bg-paper md:col-span-5">
            <Media file={photo} alt={boutique.media.captions?.[photo] ?? `Work by ${boutique.brand.name}`} />
          </div>
        )}
        <div className={photo ? 'md:col-span-7' : 'max-w-2xl'}>
          <h2 className="t-1 max-w-[14ch] text-balance">For Amma</h2>
          <p className="t-2 mt-6 max-w-[24ch] font-display text-balance text-primary-ink italic">Something stitched just for her, for once.</p>
          <p className="mt-6 max-w-[40ch] text-muted">A gift voucher she can spend on anything she’d like made.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a gift voucher for my mother. How do I pay?`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask for her voucher
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
