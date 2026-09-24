// src/app/Directory.tsx
// Our own landing page for the demos, not a boutique's. Find a boutique by
// where it is — state, then city, then pincode, then area — or by typing part
// of its name, and open its wall of designs.
//
// The four levels are always shown, so the way the list is organised is
// visible. A level with only one value left is shown as that value rather
// than as a dropdown with one option in it, so the chain reads as
// "Karnataka › Bengaluru › 560060 › Kengeri Satellite Town". Choosing
// narrows the list as you go; there's nothing to submit.

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DESIGNS, designFor } from '../designs'
import Dropdown from './Dropdown'
import { DIRECTORY } from './directory-data'
import type { IDirectoryEntry, IPlace } from './directory-types'

type ILevel = keyof Pick<IPlace, 'state' | 'city' | 'pincode' | 'area'>

const LEVELS: { key: ILevel; label: string }[] = [
  { key: 'state', label: 'State' },
  { key: 'city', label: 'City' },
  { key: 'pincode', label: 'Pincode' },
  { key: 'area', label: 'Area' },
]

const FIELD =
  'min-h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-base text-neutral-900 transition-colors duration-200 hover:border-neutral-500 focus:border-neutral-900 focus:outline-none'

const sorted = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b))

/** Does this branch sit inside everything chosen above `upTo`? */
const placeMatches = (place: IPlace, chosen: Partial<Record<ILevel, string>>, upTo = LEVELS.length) =>
  LEVELS.slice(0, upTo).every(({ key }) => !chosen[key] || place[key] === chosen[key])

export default function Directory() {
  const [chosen, setChosen] = useState<Partial<Record<ILevel, string>>>({})
  const [query, setQuery] = useState('')

  // Each level offers only what the levels above it leave, so a pincode never
  // lists areas from another city.
  const options = useMemo(() => {
    const all = DIRECTORY.flatMap((b) => b.places)
    return LEVELS.map(({ key }, i) => ({
      key,
      values: sorted(all.filter((p) => placeMatches(p, chosen, i)).map((p) => p[key])),
    }))
  }, [chosen])

  const results = useMemo(() => {
    const words = query.trim().toLowerCase()
    return DIRECTORY.filter((b) => {
      if (!b.places.some((p) => placeMatches(p, chosen))) return false
      if (!words) return true
      const haystack = [b.name, b.slug, ...b.places.flatMap((p) => [p.area, p.city, p.pincode])].join(' ').toLowerCase()
      return haystack.includes(words)
    }).sort((a, b) => a.name.localeCompare(b.name))
  }, [chosen, query])

  // Choosing a level clears the narrower ones, which may no longer apply.
  function choose(level: ILevel, value: string) {
    setChosen((previous) => {
      const next: Partial<Record<ILevel, string>> = { ...previous }
      if (value) next[level] = value
      else delete next[level]
      LEVELS.slice(LEVELS.findIndex((l) => l.key === level) + 1).forEach((l) => delete next[l.key])
      return next
    })
  }

  const filtered = Object.keys(chosen).length > 0 || query.trim() !== ''
  const where = LEVELS.map((l) => chosen[l.key]).filter(Boolean).at(-1)

  return (
    <main className="min-h-screen bg-[#faf7f2] px-5 py-14 font-app text-neutral-900 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="max-w-2xl">
          <p className="text-sm tracking-wide text-neutral-500">Parichaya Tech Solutions</p>
          <h1 className="mt-3 font-app-display text-5xl leading-[1.05] tracking-tight md:text-6xl">Boutique demos</h1>
          <p className="mt-4 text-lg text-neutral-600">
            Every boutique we've prepared a site for. Narrow down to an area, then open a boutique to see it in each of
            our {DESIGNS.length} designs.
          </p>
        </header>

        {/* Where */}
        <section aria-label="Find a boutique" className="mt-12 rounded-2xl border border-neutral-900/10 bg-white p-5 md:p-6">
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 md:flex md:flex-wrap md:items-end">
            {options.map(({ key, values }, i) => {
              const { label } = LEVELS[i]
              const value = chosen[key] ?? ''
              const only = values.length === 1 && !value ? values[0] : null

              return (
                <div key={key} className="contents md:flex md:items-end md:gap-3">
                  {i > 0 && (
                    <span className="hidden pb-3 text-neutral-300 md:inline" aria-hidden="true">
                      ›
                    </span>
                  )}
                  <div className="min-w-0 md:w-44">
                    <span className="block text-xs text-neutral-500">{label}</span>
                    {only ? (
                      // Nothing to choose between: say what it is.
                      <span className="mt-1 flex min-h-11 items-center px-0.5 text-base md:px-1">{only}</span>
                    ) : (
                      <Dropdown
                        label={label}
                        value={value}
                        options={values}
                        onChange={(next) => choose(key, next)}
                        className="mt-1"
                      />
                    )}
                  </div>
                </div>
              )
            })}

            <div className="col-span-2 md:ml-auto">
              <label htmlFor="q" className="block text-xs text-neutral-500">
                Name
              </label>
              <input
                id="q"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search boutiques"
                className={`mt-1 md:w-56 ${FIELD}`}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-900/10 pt-4">
            <p className="text-neutral-600">
              <span className="text-neutral-900">{results.length}</span>{' '}
              {results.length === 1 ? 'boutique' : 'boutiques'}
              {where ? ` in ${where}` : ''}
            </p>
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setChosen({})
                  setQuery('')
                }}
                className="cursor-pointer text-neutral-500 underline underline-offset-4 transition-colors duration-200 hover:text-neutral-900"
              >
                Clear
              </button>
            )}
          </div>
        </section>

        {/* Who */}
        {results.length === 0 ? (
          <p className="mt-16 text-lg text-neutral-600">
            No boutique here yet. Try a wider area, or clear the filters.
          </p>
        ) : (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((b) => (
              <li key={b.slug}>
                <BoutiqueCard boutique={b} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

function BoutiqueCard({ boutique }: { boutique: IDirectoryEntry }) {
  const place = boutique.places[0]
  const design = DESIGNS.find((d) => d.id === designFor(boutique.slug))

  return (
    <Link
      to={`/${boutique.slug}/designs`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-900/10 bg-white transition-colors duration-200 hover:border-neutral-900/30"
    >
      {/* Their colours, so a wall of cards doesn't look like one boutique. */}
      <span className="flex h-1.5 shrink-0" aria-hidden="true">
        <span className="w-2/3" style={{ background: boutique.colors.primary }} />
        <span className="w-1/3" style={{ background: boutique.colors.accent }} />
      </span>

      <div className="flex flex-1 flex-col p-5">
        <h2 className="font-app-display text-2xl font-medium leading-[1.15] tracking-tight">{boutique.name}</h2>

        {place && (
          <p className="mt-2 text-neutral-600">
            {place.area}, {place.city} {place.pincode}
            {boutique.places.length > 1 && ` · ${boutique.places.length} branches`}
          </p>
        )}

        {boutique.featured.length > 0 && <p className="mt-4 text-sm text-neutral-500">{boutique.featured.join(' · ')}</p>}

        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6 text-sm">
          <span className="text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition-colors duration-200 group-hover:decoration-neutral-900">
            See the designs
          </span>
          {design && <span className="text-neutral-500">Opens in {design.name}</span>}
          {boutique.rating && <span className="ml-auto text-neutral-500">{boutique.rating.toFixed(1)} ★</span>}
        </div>
      </div>
    </Link>
  )
}
