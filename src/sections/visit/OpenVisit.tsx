// src/sections/visit/OpenVisit.tsx
// The map with a badge pinned over its corner saying whether the shop is
// open right now, and when it closes or opens next; the address and ways
// to come beneath. (Lab: map M, "Open-now pin".)
//
// Each branch's day-by-day hours (app/hours); without them, no badge.
// Buttons switch branches. No motion.

import { IconBrandWhatsapp, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useOpenState } from '../../app/hours'
import Button from '../../components/Button'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function OpenVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  const state = useOpenState(branch)
  if (!branch) return null

  return (
    <section id="visit" className="section">
      <div className="wrap">
        <h2 className="t-1">{branches.length > 1 ? 'Find a branch' : 'Find us'}</h2>
        <BranchPicker branches={branches} index={index} onPick={setIndex} />
        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-paper md:aspect-[21/9]">
          <MapFrame branch={branch} />
          {state && (
            <p
              className="pointer-events-none absolute top-4 left-4 flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-2xl bg-light px-4 py-3 text-ink ring-1 ring-ink/15"
              aria-live="polite"
            >
              <span aria-hidden="true" className={`h-2.5 w-2.5 shrink-0 rounded-full ${state.open ? 'bg-primary-ink' : 'border-2 border-ink/50'}`} />
              <span className="t-small font-semibold">{state.label}</span>
            </p>
          )}
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-[48ch]">
            {branch.address}, {branch.city} {branch.pincode}
            {branch.landmark && <span className="block text-muted">{branch.landmark}</span>}
          </p>
          <div className="flex flex-wrap gap-3">
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
