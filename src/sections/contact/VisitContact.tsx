// src/sections/contact/VisitContact.tsx
// Come and visit: dark, a grid of four tiles: whether they're open today,
// the address, the week's hours, and the map, with directions and WhatsApp
// beneath. (Lab: contact T, "Come and visit", without the glowing pin,
// which DESIGN.md forbids.)
//
// The main branch; the open tile only with day-by-day hours (app/hours),
// otherwise the hours tile shows them as written. No motion.

import { IconBrandWhatsapp, IconClock, IconDirections, IconMapPin } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useOpenState, weekRows } from '../../app/hours'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { MapFrame } from '../visit/mapShared'

export default function VisitContact() {
  const { boutique } = useBoutique()
  const branch = boutique.branches[0]
  const state = useOpenState(branch)
  if (!branch) return null

  return (
    <section id="visit" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Come and visit</h2>
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {state && (
            <div className="rounded-2xl border border-light/15 p-6" aria-live="polite">
              <p className="t-small text-light/70">Today</p>
              <p className="t-2 mt-2 flex items-center gap-2">
                <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${state.open ? 'bg-accent-on-dark' : 'border-2 border-light/60'}`} />
                {state.open ? 'Open now' : 'Closed now'}
              </p>
              <p className="t-small mt-2 text-light/75">{capitalise(state.label.split(' · ')[1] ?? state.today)}</p>
            </div>
          )}
          <div className="rounded-2xl border border-light/15 p-6">
            <p className="t-small flex items-center gap-2 text-light/70">
              <IconMapPin size={16} stroke={1.75} aria-hidden="true" />
              Address
            </p>
            <p className="mt-2">
              {branch.address}, {branch.city} {branch.pincode}
            </p>
            {branch.landmark && <p className="t-small mt-1 text-light/70">{branch.landmark}</p>}
          </div>
          {(branch.week || branch.hours) && (
            <div className="rounded-2xl border border-light/15 p-6">
              <p className="t-small flex items-center gap-2 text-light/70">
                <IconClock size={16} stroke={1.75} aria-hidden="true" />
                Hours
              </p>
              {branch.week ? (
                <dl className="mt-2 space-y-1">
                  {weekRows(branch.week).map((r) => (
                    <div key={r.days} className="flex justify-between gap-3">
                      <dt>{r.days}</dt>
                      <dd className="tabular-nums text-light/80">{r.hours}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-2">{branch.hours}</p>
              )}
            </div>
          )}
          <div className="min-h-48 overflow-hidden rounded-2xl bg-light/5">
            <MapFrame branch={branch} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={branch.mapsUrl} icon={IconDirections}>
            Directions
          </Button>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to visit the store.`)} variant="outline-light" icon={IconBrandWhatsapp}>
            Ask before you come
          </Button>
        </div>
      </div>
    </section>
  )
}
