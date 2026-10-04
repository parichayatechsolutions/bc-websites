// src/sections/visit/ArchVisit.tsx
// The map seen through a temple arch, with the address, hours and the ways
// to come beside it. The arch family's way to find the shop.
// (Lab: map E, "Arch window".)
//
// With more than one branch, buttons switch the map and details.
//
// Motion: the arch uncovers once as it comes into view.
// Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconClock, IconDirections, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function ArchVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-arch]', { trigger: root.current })
  })

  if (!branch) return null

  return (
    <section ref={root} id="visit" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div data-arch className="arch aspect-[3/4] w-full max-w-md border-2 border-accent/60 bg-paper p-2 md:col-span-5">
          <div className="arch h-full w-full">
            <MapFrame branch={branch} />
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="t-1">{branches.length > 1 ? 'Find a branch' : 'Find us'}</h2>
          <BranchPicker branches={branches} index={index} onPick={setIndex} />
          <div className="mt-8 space-y-4">
            <p className="flex gap-3">
              <IconMapPin size={22} stroke={1.5} className="mt-1 shrink-0 text-primary-ink" aria-hidden="true" />
              <span>
                {branch.address}, {branch.city} {branch.pincode}
                {branch.landmark && <span className="block text-muted">{branch.landmark}</span>}
              </span>
            </p>
            {branch.hours && (
              <p className="flex gap-3">
                <IconClock size={22} stroke={1.5} className="mt-1 shrink-0 text-primary-ink" aria-hidden="true" />
                {branch.hours}
              </p>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
              Chat on WhatsApp
            </Button>
            <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
              Get directions
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
