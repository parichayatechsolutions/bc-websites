// src/sections/bridal/EditBridal.tsx
// "The bridal edit", set as a magazine page: a ruled masthead, then each
// package as a column with its name, starting price and what's in it, the
// first opening with a drop capital. For the type-led designs.
// (Lab: bridal P, "The Bridal Edit".)
//
// From `bridalPackages`; prices only with permission. Hides without
// packages. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { capitalise, joinList } from '../../app/text'
import Button from '../../components/Button'
import { useBridal } from './bridalShared'

export default function EditBridal() {
  const { boutique } = useBoutique()
  const { packages, price, ask, consult } = useBridal()
  if (!packages.length) return null

  return (
    <section id="bridal" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-y-2 border-ink py-4">
          <h2 className="t-1">The bridal edit</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <div className="mt-10 gap-12 md:columns-2 lg:columns-3 md:[column-rule:1px_solid_color-mix(in_oklab,var(--c-ink)_15%,transparent)]">
          {packages.map((p, i) => (
            <article key={p.name} className="mb-10 break-inside-avoid">
              <h3 className="t-2">{p.name}</h3>
              {price(p) && <p className="mt-1 font-semibold text-primary-ink">{price(p)}</p>}
              {p.includes.length > 0 && (
                <p
                  className={`mt-4 ${
                    i === 0
                      ? 'first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-[3.2em] first-letter:leading-[0.85] first-letter:text-primary-ink'
                      : ''
                  }`}
                >
                  {capitalise(joinList(p.includes, true))}.
                </p>
              )}
              <a href={ask(p)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink">
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Ask about it</span>
              </a>
            </article>
          ))}
        </div>
        <div className="mt-4 border-t border-ink/15 pt-8">
          <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
            Book a bridal consult
          </Button>
        </div>
      </div>
    </section>
  )
}
