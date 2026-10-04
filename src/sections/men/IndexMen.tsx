// src/sections/men/IndexMen.tsx
// Men's tailoring as a typeset index: every piece they stitch for men in a
// ruled row, each one a link to ask about it on WhatsApp. Needs no photos.
// (Lab: men D, "Men's index", without its numbers, ready times and
// occasions: the rows aren't a sequence and the config doesn't hold times.)
//
// Hides without a Men group in their services. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

export default function IndexMen() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []
  if (!items.length) return null

  return (
    <section id="men" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">For men</h2>
          <p className="text-muted">{boutique.brand.name}</p>
        </div>
        <ul>
          {items.map((item) => (
            <li key={item} className="border-b border-ink/15">
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${item.charAt(0).toLowerCase()}${item.slice(1)}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center justify-between gap-6 py-5"
              >
                <span className="t-2">{item}</span>
                <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary-ink">
                  <span className="hidden sm:inline">Ask about it</span>
                  <IconArrowRight
                    size={20}
                    stroke={1.75}
                    aria-hidden="true"
                    className="transition-transform duration-300 ease-stitch group-hover:translate-x-1"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
