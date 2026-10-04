// src/sections/visit/BleedVisit.tsx
// The map edge to edge across the page, with a card over its corner on a
// computer (beneath it on a phone) holding the address, hours and ways to
// come. (Lab: map C, "Full-bleed".)
//
// With more than one branch, buttons in the card switch the map and
// details. No motion.

import { IconBrandWhatsapp, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function BleedVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" className="relative">
      <div className="h-[55vh] min-h-80 bg-paper md:h-[80vh]">
        <MapFrame branch={branch} />
      </div>
      <div className="wrap md:pointer-events-none md:absolute md:inset-x-0 md:bottom-12">
        <div className="-mt-10 rounded-2xl border border-ink/15 bg-light p-7 md:pointer-events-auto md:mt-0 md:max-w-md md:p-9">
          <h2 className="t-2">{branches.length > 1 ? 'Find a branch' : 'Find us'}</h2>
          <BranchPicker branches={branches} index={index} onPick={setIndex} />
          <p className="mt-6">
            {branch.address}, {branch.city} {branch.pincode}
          </p>
          {branch.landmark && <p className="t-small mt-1 text-muted">{branch.landmark}</p>}
          {branch.hours && <p className="mt-3 text-muted">{branch.hours}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={branch.mapsUrl} variant="primary" icon={IconDirections}>
              Directions
            </Button>
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to visit your ${branch.area || branch.city} store.`)} variant="outline-dark" icon={IconBrandWhatsapp}>
              Ask first
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
