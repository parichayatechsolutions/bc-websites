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
//
// Under the place chain sit the two filters that aren't about place: how well
// the boutique is rated, and whether they've bought their site.

import { useMemo, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import { DESIGNS, designFor } from '../designs'
import Dropdown from './Dropdown'
import { DIRECTORY } from './directory-data'
import type { IDirectoryEntry, IPlace } from './directory-types'

type ILevel = keyof Pick<IPlace, 'state' | 'city' | 'pincode' | 'area'>

const LEVELS: { key: ILevel; label: string; anyLabel: string }[] = [
  { key: 'state', label: 'State', anyLabel: 'All states' },
  { key: 'city', label: 'City', anyLabel: 'All cities' },
  { key: 'pincode', label: 'Pincode', anyLabel: 'All pincodes' },
  { key: 'area', label: 'Area', anyLabel: 'All areas' },
]

/** Rating bands, widest last so "any" is the first choice. */
const RATINGS = [
  { id: '4.5', label: '4.5 and above', least: 4.5 },
  { id: '4.0', label: '4.0 and above', least: 4.0 },
  { id: '3.5', label: '3.5 and above', least: 3.5 },
]

const SOLD = [
  { id: 'sold', label: 'Sold' },
  { id: 'not', label: 'Not sold yet' },
]

const sorted = (values: string[]) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b))

/** Does this branch sit inside everything chosen above `upTo`? */
const placeMatches = (place: IPlace, chosen: Partial<Record<ILevel, string>>, upTo = LEVELS.length) =>
  LEVELS.slice(0, upTo).every(({ key }) => !chosen[key] || place[key] === chosen[key])

export default function Directory() {
  const [chosen, setChosen] = useState<Partial<Record<ILevel, string>>>({})
  const [rating, setRating] = useState('')
  const [sold, setSold] = useState('')
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
    const least = RATINGS.find((r) => r.id === rating)?.least
    return DIRECTORY.filter((b) => {
      if (!b.places.some((p) => placeMatches(p, chosen))) return false
      // A boutique with no rating yet isn't "above 4.5", so it drops out.
      if (least !== undefined && !(b.rating && b.rating >= least)) return false
      if (sold && b.sold !== (sold === 'sold')) return false
      if (!words) return true
      const haystack = [b.name, b.slug, ...b.places.flatMap((p) => [p.area, p.city, p.pincode])].join(' ').toLowerCase()
      return haystack.includes(words)
    }).sort((a, b) => a.name.localeCompare(b.name))
  }, [chosen, rating, sold, query])

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

  const filtered = Object.keys(chosen).length > 0 || rating !== '' || sold !== '' || query.trim() !== ''
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

        {/* Finding one */}
        <section aria-label="Find a boutique" className="mt-12 rounded-2xl border border-neutral-900/10 bg-white p-5 md:p-6">
          <div className="relative">
            <IconSearch
              size={19}
              stroke={1.75}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              id="q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by boutique name"
              aria-label="Search by boutique name"
              className="min-h-12 w-full rounded-lg border border-neutral-300 bg-white pl-12 pr-4 text-base text-neutral-900 transition-colors duration-200 placeholder:text-neutral-500 hover:border-neutral-500 focus:border-neutral-900 focus:outline-none"
            />
          </div>

          {/* Place narrows left to right; the last two aren't about place. */}
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {options.map(({ key, values }, i) => {
              const { label, anyLabel } = LEVELS[i]
              const value = chosen[key] ?? ''
              const only = values.length === 1 && !value ? values[0] : null

              // Nothing to choose between: show what it is, plainly locked.
              return only ? (
                <p
                  key={key}
                  title={label}
                  className="flex min-h-11 items-center truncate rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-base text-neutral-600"
                >
                  {only}
                </p>
              ) : (
                <Dropdown
                  key={key}
                  label={label}
                  value={value}
                  options={values}
                  onChange={(next) => choose(key, next)}
                  anyLabel={anyLabel}
                />
              )
            })}

            <Dropdown
              label="Rating"
              value={rating}
              options={RATINGS.map((r) => r.id)}
              display={(id) => RATINGS.find((r) => r.id === id)?.label ?? id}
              onChange={setRating}
              anyLabel="Any rating"
            />
            <Dropdown
              label="Website"
              value={sold}
              options={SOLD.map((s) => s.id)}
              display={(id) => SOLD.find((s) => s.id === id)?.label ?? id}
              onChange={setSold}
              anyLabel="Sold or not"
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-neutral-900/10 pt-4">
            <p className="text-neutral-600">
              <span className="font-medium text-neutral-900">{results.length}</span>{' '}
              {results.length === 1 ? 'boutique' : 'boutiques'}
              {where ? ` in ${where}` : ''}
            </p>
            {filtered && (
              <button
                type="button"
                onClick={() => {
                  setChosen({})
                  setRating('')
                  setSold('')
                  setQuery('')
                }}
                className="ml-auto cursor-pointer text-neutral-500 underline underline-offset-4 transition-colors duration-200 hover:text-neutral-900"
              >
                Clear filters
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
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-app-display text-2xl font-medium leading-[1.15] tracking-tight">{boutique.name}</h2>
          {boutique.sold && (
            <span className="mt-1 shrink-0 rounded-full bg-neutral-900 px-2.5 py-0.5 text-xs text-white">Sold</span>
          )}
        </div>

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
