// src/sections/visit/StickyVisit.tsx
// A tall map down one side with the details beside it that stay in view
// as the map scrolls past on a computer: every branch with its address,
// landmark and hours, the one being shown highlighted.
// (Lab: map S, "Sticky details".)
//
// With more than one branch, tapping a branch moves the map to it. On a
// phone the map comes first, shorter. No motion.

import { IconBrandWhatsapp, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { MapFrame, useBranch } from './mapShared'

export default function StickyVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" className="section">
      <div className="wrap grid items-start gap-10 md:grid-cols-12 md:gap-16">
        <div className="h-[50vh] min-h-72 bg-paper md:col-span-7 md:h-[90vh]">
          <MapFrame branch={branch} />
        </div>
        <div className="md:sticky md:top-24 md:col-span-5">
          <h2 className="t-1">{branches.length > 1 ? 'Our branches' : 'Find us'}</h2>
          <ul className="mt-8 border-t border-ink/15">
            {branches.map((b, i) => (
              <li key={b.name + b.address} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  disabled={branches.length === 1}
                  className="w-full cursor-pointer py-5 text-left transition-colors duration-200 ease-stitch hover:text-primary-ink disabled:cursor-default disabled:hover:text-ink aria-pressed:text-primary-ink"
                >
                  <span className="t-3 block">{branches.length > 1 ? b.name : boutique.brand.name}</span>
                  <span className="mt-1 block text-ink">
                    {b.address}, {b.city} {b.pincode}
                  </span>
                  {b.landmark && <span className="t-small block text-muted">{b.landmark}</span>}
                  {b.hours && <span className="t-small mt-1 block text-muted">{b.hours}</span>}
                </button>
              </li>
            ))}
          </ul>
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
