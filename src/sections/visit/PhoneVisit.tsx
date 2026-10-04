// src/sections/visit/PhoneVisit.tsx
// A drawn phone showing the live map, with a big Start button beneath it
// that opens directions, beside the address and hours: the way most people
// will actually find the shop. (Lab: map Q, "Phone map".)
//
// With more than one branch, buttons switch the map and details. No
// motion.

import { IconBrandWhatsapp, IconNavigation } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function PhoneVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <div className="mx-auto w-full max-w-[18rem] rounded-[2.5rem] border-[10px] border-dark bg-dark">
            <div className="overflow-hidden rounded-[1.75rem] bg-light">
              <div className="aspect-[9/14]">
                <MapFrame branch={branch} />
              </div>
              <div className="p-3">
                <a
                  href={branch.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary-ink font-semibold text-on-primary-ink"
                >
                  <IconNavigation size={20} stroke={1.75} aria-hidden="true" />
                  Start
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[12ch] text-balance">{branches.length > 1 ? 'Find a branch' : 'Find your way here'}</h2>
          <BranchPicker branches={branches} index={index} onPick={setIndex} />
          <p className="t-lead mt-8">
            {branch.address}, {branch.city} {branch.pincode}
          </p>
          {branch.landmark && <p className="mt-1 text-muted">{branch.landmark}</p>}
          {branch.hours && <p className="mt-3">{branch.hours}</p>}
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to visit your ${branch.area || branch.city} store.`)} variant="outline-dark" icon={IconBrandWhatsapp}>
              Ask before you come
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
