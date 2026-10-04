// src/sections/visit/HoursVisit.tsx
// Open now and the week's hours beside a dark, night-toned map: whether
// they're open right now set large, the week grouped beneath, and
// directions. (Lab: map G, "Hours board".)
//
// Each branch's day-by-day hours (app/hours); buttons switch branches.
// Without day-by-day hours the hours show as written and the status is
// left out. The map takes its day colours back on hover. No motion.

import { IconDirections } from '@tabler/icons-react'
import { useOpenState, weekRows } from '../../app/hours'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { MapFrame, useBranch } from './mapShared'

export default function HoursVisit() {
  const { branches, branch, index, setIndex } = useBranch()
  const state = useOpenState(branch)
  if (!branch) return null

  return (
    <section id="visit" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
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
          {state && (
            <p className="t-2 mt-8 flex items-center gap-3 text-accent-on-dark" aria-live="polite">
              <span aria-hidden="true" className={`h-3 w-3 rounded-full ${state.open ? 'bg-accent-on-dark' : 'border-2 border-accent-on-dark'}`} />
              {state.label.split(' · ')[0]}
            </p>
          )}
          {state && <p className="mt-1 text-light/75">{capitalise(state.label.split(' · ')[1] ?? state.today)}</p>}
          {branch.week ? (
            <dl className="mt-6 border-t border-light/15">
              {weekRows(branch.week).map((r) => (
                <div key={r.days} className="flex justify-between gap-4 border-b border-light/15 py-3">
                  <dt>{r.days}</dt>
                  <dd className="tabular-nums">{r.hours}</dd>
                </div>
              ))}
            </dl>
          ) : (
            branch.hours && <p className="mt-6">{branch.hours}</p>
          )}
          <p className="t-small mt-6 text-light/70">
            {branch.address}, {branch.city} {branch.pincode}
          </p>
          <div className="mt-8">
            <Button href={branch.mapsUrl} icon={IconDirections}>
              Directions
            </Button>
          </div>
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-light/5 invert hue-rotate-180 transition-[filter] duration-700 ease-stitch hover:invert-0 hover:hue-rotate-0 md:col-span-7">
          <MapFrame branch={branch} />
        </div>
      </div>
    </section>
  )
}
