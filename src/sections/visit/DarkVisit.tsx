// src/sections/visit/DarkVisit.tsx
// Dark, with the map in night tones (the live map, its colours inverted)
// inside a fine gold frame, the address, hours and ways to come beside it.
// For the darker designs. (Lab: map D, "Dark map".)
//
// With more than one branch, buttons switch the map and details. The map
// returns to its day colours on hover, since that's when it's being used.
// No motion.

import { IconBrandWhatsapp, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { MapFrame, useBranch } from './mapShared'

export default function DarkVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="border border-accent-on-dark/60 p-1.5 md:col-span-7">
          <div className="aspect-[4/3] bg-light/5 invert hue-rotate-180 transition-[filter] duration-700 ease-stitch hover:invert-0 hover:hue-rotate-0">
            <MapFrame branch={branch} />
          </div>
        </div>
        <div className="md:col-span-5">
          <h2 className="t-1">{branches.length > 1 ? 'Find a branch' : 'Find us'}</h2>
          {branches.length > 1 && (
            <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Choose a branch">
              {branches.map((b, i) => (
                <button
                  key={b.name + b.address}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="min-h-11 cursor-pointer rounded-full border border-light/30 px-4 transition-colors duration-200 ease-stitch hover:border-light aria-pressed:bg-light aria-pressed:text-ink"
                >
                  {b.area || b.city}
                </button>
              ))}
            </div>
          )}
          <p className="mt-6">
            {branch.address}, {branch.city} {branch.pincode}
          </p>
          {branch.landmark && <p className="t-small mt-1 text-light/70">{branch.landmark}</p>}
          {branch.hours && <p className="mt-3 text-accent-on-dark">{branch.hours}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={branch.mapsUrl} icon={IconDirections}>
              Directions
            </Button>
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to visit your ${branch.area || branch.city} store.`)} variant="outline-light" icon={IconBrandWhatsapp}>
              Ask first
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
