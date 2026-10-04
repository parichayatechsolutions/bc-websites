// src/sections/visit/MapVisit.tsx
// The map leads: a wide live map with the branch's address, hours and
// directions on a card over its corner. On phones the card sits under the
// map, just overlapping it, so it never covers the pin. With more than one
// branch, buttons above switch the map and card between them.
// (Lab: map A, "Map + card".)
//
// Motion: the map frame uncovers once as it comes into view.
// Reduced motion: the map in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconClock, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function MapVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-map]', { trigger: root.current })
  })

  if (!branch) return null

  return (
    <section ref={root} id="visit" className="section">
      <div className="wrap">
        <h2 className="t-1">{branches.length > 1 ? 'Find a branch' : 'Find us'}</h2>
        <BranchPicker branches={branches} index={index} onPick={setIndex} />

        <div className="relative mt-10 md:mt-14">
          <div data-map className="aspect-[4/5] w-full overflow-hidden bg-paper sm:aspect-[16/10] md:aspect-[16/8]">
            <MapFrame branch={branch} />
          </div>

          <div className="relative mx-4 -mt-16 rounded-2xl border border-ink/10 bg-light p-6 md:absolute md:bottom-8 md:left-8 md:mx-0 md:mt-0 md:w-[26rem] md:p-8">
            <h3 className="t-3 text-primary-ink">
              {branch.name}
              {branches.length > 1 && `, ${branch.city}`}
            </h3>
            <address className="mt-3 not-italic">
              {branch.address}
              <br />
              {branch.city} {branch.pincode}
            </address>
            {branch.landmark && <p className="text-muted">{branch.landmark}</p>}
            {branch.hours && (
              <p className="mt-4 flex gap-2 text-muted">
                <IconClock size={20} stroke={1.5} className="mt-1 shrink-0" aria-hidden="true" />
                {branch.hours}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Chat on WhatsApp
              </Button>
              <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
                Get directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
