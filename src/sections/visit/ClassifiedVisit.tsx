// src/sections/visit/ClassifiedVisit.tsx
// Where to find them as a newspaper classified: a double-ruled box with
// the name, address, landmark, hours and number set tight, beside the map
// printed in grey. For the type-led designs. (Lab: map P, "Classified".)
//
// With more than one branch, buttons switch the box and map. The map
// takes its colour back on hover, since it's the thing to use. No motion.

import { IconDirections } from '@tabler/icons-react'
import { telLink, useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function ClassifiedVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">{branches.length > 1 ? 'Our branches' : 'Find us'}</h2>
          <BranchPicker branches={branches} index={index} onPick={setIndex} />
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <div className="border-4 border-double border-ink p-6 md:col-span-5 md:p-8">
            <p className="t-3 text-primary-ink">{boutique.brand.name}</p>
            {branches.length > 1 && <p className="font-semibold">{branch.name}</p>}
            <p className="mt-4">
              {branch.address}, {branch.city} {branch.pincode}.
            </p>
            {branch.landmark && <p className="mt-1 text-muted">{branch.landmark}.</p>}
            {branch.hours && <p className="mt-4">Open {branch.hours}.</p>}
            <p className="mt-4">
              <span className="text-muted">Phone </span>
              <a href={telLink(boutique.contact.phone)} className="link-stitch font-semibold tabular-nums">
                {boutique.contact.phone}
              </a>
            </p>
            <div className="mt-8">
              <Button href={branch.mapsUrl} variant="outline-dark" icon={IconDirections}>
                Directions
              </Button>
            </div>
          </div>
          <div className="aspect-[4/3] bg-paper grayscale transition-[filter] duration-700 ease-stitch hover:grayscale-0 md:col-span-7 md:aspect-auto md:min-h-80">
            <MapFrame branch={branch} />
          </div>
        </div>
      </div>
    </section>
  )
}
