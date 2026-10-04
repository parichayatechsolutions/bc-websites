// src/sections/visit/BandVisit.tsx
// A brand-colour band between two zari borders: the address and hours on
// one side, a slim strip of map on the other, and a Directions link. A
// band, not a full section. (Lab: map I, "Zari band".)
//
// The first branch; with more, buttons switch it. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { MapFrame, useBranch } from './mapShared'

export default function BandVisit() {
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" aria-label="Find us" className="bg-primary text-on-primary">
      <div className="zari" aria-hidden="true" />
      <div className="band">
        <div className="wrap grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="t-3">{branches.length > 1 ? branch.name : 'Find us'}</p>
            <p className="mt-2">
              {branch.address}, {branch.city} {branch.pincode}
            </p>
            {branch.hours && <p className="t-small mt-1 opacity-85">{branch.hours}</p>}
            {branches.length > 1 && (
              <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Choose a branch">
                {branches.map((b, i) => (
                  <button
                    key={b.name + b.address}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-pressed={i === index}
                    className="min-h-11 cursor-pointer rounded-full border border-on-primary/40 px-4 transition-colors duration-200 ease-stitch hover:border-on-primary aria-pressed:bg-on-primary/15"
                  >
                    {b.area || b.city}
                  </button>
                ))}
              </div>
            )}
            <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold">
              <span className="link-stitch">Directions</span>
              <IconArrowRight size={18} stroke={1.75} aria-hidden="true" />
            </a>
          </div>
          <div className="h-48 overflow-hidden rounded-2xl bg-light md:col-span-7 md:h-56">
            <MapFrame branch={branch} />
          </div>
        </div>
      </div>
      <div className="zari" aria-hidden="true" />
    </section>
  )
}
