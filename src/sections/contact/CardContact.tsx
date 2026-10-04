// src/sections/contact/CardContact.tsx
// One store card holding everything: a small map with the pin, then the
// address, hours, phone and a Directions button, beside the WhatsApp
// invitation. (Lab: contact H, "Store card".)
//
// The first branch; with more, buttons switch the card. No motion.

import { IconBrandWhatsapp, IconClock, IconDirections, IconMapPin, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BranchPicker, MapFrame, useBranch } from '../visit/mapShared'

export default function CardContact() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="contact" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Talk to us</h2>
          <p className="t-lead mt-5 max-w-[30ch] text-muted">Send a photo of what you have in mind, or come and see us.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
              Chat on WhatsApp
            </Button>
          </div>
          <BranchPicker branches={branches} index={index} onPick={setIndex} />
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink/15 md:col-span-7">
          <div className="aspect-[16/9] bg-paper">
            <MapFrame branch={branch} />
          </div>
          <div className="space-y-3 p-6 md:p-8">
            <p className="t-3">{branches.length > 1 ? branch.name : boutique.brand.name}</p>
            <p className="flex gap-3">
              <IconMapPin size={20} stroke={1.5} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
              <span>
                {branch.address}, {branch.city} {branch.pincode}
              </span>
            </p>
            {branch.hours && (
              <p className="flex gap-3">
                <IconClock size={20} stroke={1.5} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
                {branch.hours}
              </p>
            )}
            <p className="flex gap-3">
              <IconPhone size={20} stroke={1.5} className="mt-0.5 shrink-0 text-primary-ink" aria-hidden="true" />
              <a href={telLink(boutique.contact.phone)} className="link-stitch tabular-nums">
                {boutique.contact.phone}
              </a>
            </p>
            <div className="pt-3">
              <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
                Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
