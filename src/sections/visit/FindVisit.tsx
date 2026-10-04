// src/sections/visit/FindVisit.tsx
// "Find us." set huge, the address and hours in a plain column beside it,
// and the map running full width beneath. Type-led, for the plain-spoken
// designs. (Lab: map L, "Find us.".)
//
// With more than one branch, buttons switch the details and map. No motion.

import { IconDirections } from '@tabler/icons-react'
import Button from '../../components/Button'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function FindVisit() {
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" className="section">
      <div className="wrap">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <h2 className="t-hero md:col-span-7">Find us.</h2>
          <div className="md:col-span-5">
            <BranchPicker branches={branches} index={index} onPick={setIndex} />
            <address className="t-lead mt-6 not-italic">
              {branch.address}
              <br />
              {branch.city} {branch.pincode}
            </address>
            {branch.landmark && <p className="mt-2 text-muted">{branch.landmark}</p>}
            {branch.hours && <p className="mt-4 text-muted">{branch.hours}</p>}
            <div className="mt-6">
              <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
                Get directions
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 aspect-[4/5] w-full overflow-hidden bg-paper sm:aspect-[16/9] md:aspect-[21/9]">
          <MapFrame branch={branch} />
        </div>
      </div>
    </section>
  )
}
