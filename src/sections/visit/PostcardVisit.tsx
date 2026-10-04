// src/sections/visit/PostcardVisit.tsx
// A postcard from the shop: on the left a line inviting her to visit, on
// the right the address written out like a postcard's, with the map as its
// stamp, then directions. Warm and a little playful.
// (Lab: map J, "Postcard".)
//
// The first branch only. No motion.

import { IconBrandWhatsapp, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { MapFrame } from './mapShared'

export default function PostcardVisit() {
  const { boutique } = useBoutique()
  const branch = boutique.branches[0]
  if (!branch) return null

  return (
    <section id="visit" className="section">
      <div className="wrap">
        <div className="grid border border-ink/15 bg-paper md:grid-cols-2">
          <div className="border-b border-dashed border-ink/25 p-8 md:border-r md:border-b-0 md:p-12">
            <h2 className="t-1 max-w-[10ch] text-balance">Come and see us</h2>
            <p className="t-lead mt-5 max-w-[26ch] text-muted">Bring your fabric, or just come and look at the work.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={branch.mapsUrl} variant="primary" icon={IconDirections}>
                Get directions
              </Button>
              <Button href={whatsappLink(boutique)} variant="outline-dark" icon={IconBrandWhatsapp}>
                WhatsApp us
              </Button>
            </div>
          </div>
          <div className="relative p-8 md:p-12">
            <div className="ml-auto aspect-[4/5] w-28 overflow-hidden border-4 border-light outline outline-1 outline-ink/20 md:w-36" aria-hidden="true">
              <MapFrame branch={branch} />
            </div>
            <address className="mt-8 space-y-3 not-italic">
              {[boutique.brand.name, branch.address, `${branch.city} ${branch.pincode}`, branch.landmark].filter(Boolean).map((line) => (
                <span key={line} className="block border-b border-ink/20 pb-2">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>
      </div>
    </section>
  )
}
