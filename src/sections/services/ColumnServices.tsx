// src/sections/services/ColumnServices.tsx
// Everything they stitch, as a plain typographic list grouped the way a
// customer thinks: who it's for, then what else they can help with.

import { useBoutique } from '../../app/BoutiqueContext'

export default function ColumnServices() {
  const { boutique } = useBoutique()
  const { groups } = boutique.services
  const prices = boutique.permissions.showPrices ? boutique.pricing?.startingAt : undefined

  if (!groups.length) return null

  return (
    <section className="section border-t border-ink/10">
      <div className="wrap">
        <h2 className="t-1">What we stitch</h2>

        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            // A long list takes two grid cells and splits into two columns.
            <div key={group.title} className={group.items.length > 6 ? 'sm:col-span-2' : ''}>
              <h3 className="t-3 max-w-[20ch] text-primary-ink">{group.title}</h3>
              <ul className={`mt-5 ${group.items.length > 6 ? 'gap-x-12 sm:columns-2 [&>li]:mb-2.5 [&>li]:break-inside-avoid' : 'space-y-2.5'}`}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {prices && prices.length > 0 && (
          <dl className="mt-20 grid max-w-3xl gap-px overflow-hidden rounded-2xl bg-ink/10 sm:grid-cols-3">
            {prices.map(({ item, price }) => (
              <div key={item} className="bg-light p-6">
                <dt className="text-muted">{item}</dt>
                <dd className="t-2 mt-1">
                  <span className="t-small align-top text-muted">from </span>₹{price.toLocaleString('en-IN')}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  )
}
