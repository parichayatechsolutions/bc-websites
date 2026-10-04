// src/sections/visit/PassVisit.tsx
// Where to find them as a ticket: the name, address, landmark and hours on
// the pass, a perforated line, and the map as its stub, with directions
// and WhatsApp beneath. (Lab: map R, "Visit pass".)
//
// With more than one branch, buttons switch the pass and map. On a phone
// the stub sits under the pass. No motion.

import { IconBrandWhatsapp, IconDirections } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { BranchPicker, MapFrame, useBranch } from './mapShared'

export default function PassVisit() {
  const { boutique } = useBoutique()
  const { branches, branch, index, setIndex } = useBranch()
  if (!branch) return null

  return (
    <section id="visit" className="section">
      <div className="wrap">
        <h2 className="t-1">{branches.length > 1 ? 'Find a branch' : 'Come and see us'}</h2>
        <BranchPicker branches={branches} index={index} onPick={setIndex} />
        <div className="mt-10 grid overflow-hidden rounded-2xl border border-ink/20 md:grid-cols-[1fr_22rem]">
          <div className="bg-paper p-7 md:p-10">
            <p className="t-2 text-primary-ink">{boutique.brand.name}</p>
            {branches.length > 1 && <p className="font-semibold">{branch.name}</p>}
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="t-small text-muted">Address</dt>
                <dd className="mt-1">
                  {branch.address}, {branch.city} {branch.pincode}
                </dd>
              </div>
              {branch.landmark && (
                <div>
                  <dt className="t-small text-muted">Landmark</dt>
                  <dd className="mt-1">{branch.landmark}</dd>
                </div>
              )}
              {branch.hours && (
                <div>
                  <dt className="t-small text-muted">Open</dt>
                  <dd className="mt-1">{branch.hours}</dd>
                </div>
              )}
            </dl>
          </div>
          <div className="aspect-square border-t-2 border-dashed border-ink/30 md:aspect-auto md:min-h-72 md:border-t-0 md:border-l-2">
            <MapFrame branch={branch} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={branch.mapsUrl} variant="primary" icon={IconDirections}>
            Directions
          </Button>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to visit your ${branch.area || branch.city} store.`)} variant="outline-dark" icon={IconBrandWhatsapp}>
            Ask before you come
          </Button>
        </div>
      </div>
    </section>
  )
}
