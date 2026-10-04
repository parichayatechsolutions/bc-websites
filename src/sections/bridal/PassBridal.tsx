// src/sections/bridal/PassBridal.tsx
// Each bridal package as a ticket: the name, starting price and what's in
// it on the pass, a perforated line, and a stub with a button to ask
// about it. (Lab: bridal T, "Bridal pass", without the code and "Reserve",
// which would promise a booking the site can't make.)
//
// From `bridalPackages`; prices only with permission. Hides without
// packages. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { capitalise, joinList } from '../../app/text'
import { useBridal } from './bridalShared'

export default function PassBridal() {
  const { packages, price, ask } = useBridal()
  if (!packages.length) return null

  return (
    <section id="bridal" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Bridal packages</h2>
        <ul className="mt-12 space-y-5">
          {packages.map((p) => (
            <li key={p.name} className="grid overflow-hidden rounded-2xl border border-ink/20 sm:grid-cols-[1fr_12rem]">
              <div className="bg-paper p-6 md:p-8">
                <h3 className="t-2">{p.name}</h3>
                {price(p) && <p className="mt-1 font-semibold text-primary-ink">{price(p)}</p>}
                {p.includes.length > 0 && <p className="mt-4 max-w-[60ch] text-muted">{capitalise(joinList(p.includes, true))}.</p>}
              </div>
              <a
                href={ask(p)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-16 items-center justify-center gap-2 border-t-2 border-dashed border-ink/25 bg-primary-ink px-6 font-semibold text-on-primary-ink transition-colors duration-200 ease-stitch hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)] sm:border-t-0 sm:border-l-2"
              >
                <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
                Ask about it
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
