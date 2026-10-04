// src/sections/visit/MedallionVisit.tsx
// The map as a round medallion inside a gold ring, the address, hours and
// ways to come beside it. (Lab: map H, "Round medallion".)
//
// With more than one branch, buttons switch the map and details.
// No motion.

import { IconBrandWhatsapp, IconClock, IconDirections, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function MedallionVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="mx-auto aspect-square w-full max-w-sm rounded-full border-2 border-accent p-2 md:col-span-5">
          <div className="h-full w-full overflow-hidden rounded-full border border-accent/50 bg-paper">
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
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={branch.mapsUrl} variant="primary" icon={IconDirections}>
              Directions
            </Button>
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to visit your ${branch.area || branch.city} store.`)} variant="outline-dark" icon={IconBrandWhatsapp}>
              Ask before you come
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
