// src/sections/contact/WeddingContact.tsx
// "Planning a wedding? Let's talk." A band of brand colour between two
// zari borders with one button. Short and warm, for between sections of a
// bridal page. (Lab: contact R, "Wedding banner".)
//
// Shows only for a boutique that does bridal work. A band, not a full
// section. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useBridal } from '../bridal/bridalShared'

export default function WeddingContact() {
  const { boutique } = useBoutique()
  const { doesBridal } = useBridal()
  if (!doesBridal) return null

  return (
    <aside aria-label="Bridal enquiries">
      <div className="zari" aria-hidden="true" />
      <div className="band bg-primary text-on-primary">
        <div className="wrap flex flex-wrap items-center justify-between gap-6">
          <p className="t-2 max-w-[20ch] text-balance">Planning a wedding? Let’s talk.</p>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'm planning a wedding and would like to talk about the outfits.`)} icon={IconBrandWhatsapp}>
            Chat on WhatsApp
          </Button>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </aside>
  )
}
