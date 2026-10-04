// src/sections/kids/IndexKids.tsx
// Kids' wear as a typeset index: the ages they stitch for at the top, then
// every children's piece in a ruled row, each a link to ask about it.
// Needs no photographs. (Lab: kids I, "Kids index", without the lab's
// per-piece occasions, which the config doesn't hold.)
//
// Needs a Kids group in their services; hides without it. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

export default function IndexKids() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.find((g) => /^kid|child/i.test(g.title))?.items ?? []
  const ages = boutique.services.kidsAges
  if (!items.length) return null

  return (
    <section id="kids" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b-2 border-ink pb-4">
          <h2 className="t-1">For children</h2>
          {ages && <p className="text-muted">Ages {ages.replace(/^ages?\s*/i, '')}</p>}
        </div>
        <ul>
          {items.map((item) => (
            <li key={item} className="border-b border-ink/15">
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${item.charAt(0).toLowerCase()}${item.slice(1)} for my child.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center justify-between gap-6 py-5"
              >
                <span className="t-2">{item}</span>
                <span className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary-ink">
                  <span className="hidden sm:inline">Ask about it</span>
                  <IconArrowRight size={20} stroke={1.75} aria-hidden="true" className="transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
