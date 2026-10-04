// src/sections/visit/SlimVisit.tsx
// The address in one line with directions beside it, over a slim strip of
// map. For a page that only needs to say where, without a whole section of
// it. (Lab: map Y, "Slim line".)
//
// The first branch only (more branches belong in a fuller visit section).
// A band rather than a section. No motion.

import { IconDirections, IconMapPin } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { MapFrame } from './mapShared'

export default function SlimVisit() {
  const { boutique } = useBoutique()
  const branch = boutique.branches[0]
  if (!branch) return null

  return (
    <section id="visit" aria-label="Where to find us" className="band">
      <div className="wrap">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="flex min-w-0 gap-3">
            <IconMapPin size={22} stroke={1.5} className="mt-1 shrink-0 text-primary-ink" aria-hidden="true" />
            <span>
              {branch.address}, {branch.city} {branch.pincode}
              {branch.hours && <span className="block text-muted">{branch.hours}</span>}
            </span>
          </p>
          <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
            Get directions
          </Button>
        </div>
        <div className="mt-6 h-40 w-full overflow-hidden bg-paper md:h-48">
          <MapFrame branch={branch} />
        </div>
      </div>
    </section>
  )
}
