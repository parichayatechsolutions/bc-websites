// src/sections/services/ListServices.tsx
// Everything they stitch, as one long ruled list running down the page: the
// group's name in the margin, its pieces set large beside it. Where
// ColumnServices packs the same list into tidy columns, this one gives it the
// whole width and reads like the page of a ledger.

import { useBoutique } from '../../app/BoutiqueContext'

export default function ListServices() {
  const { boutique } = useBoutique()
  const { groups } = boutique.services
  const prices = boutique.permissions.showPrices ? boutique.pricing?.startingAt : undefined

  if (!groups.length) return null

  return (
    <section className="section bg-light">
      <div className="wrap">
        <h2 className="t-1">What we stitch</h2>

        <div className="mt-14">
          {groups.map((group) => (
            <div key={group.title} className="grid gap-4 border-t border-ink/15 py-8 md:grid-cols-12 md:gap-8 md:py-10">
              <h3 className="t-3 text-primary-ink md:col-span-3">{group.title}</h3>
              <ul className="md:col-span-9">
                {group.items.map((item) => (
                  <li key={item} className="t-2 max-w-[24ch] leading-snug text-balance md:max-w-none">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {prices && prices.length > 0 && (
          <dl className="grid border-t border-ink/15 sm:grid-cols-3">
            {prices.map(({ item, price }) => (
              <div key={item} className="py-8">
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
