// src/sections/men/AlterMen.tsx
// Quick alterations for men's clothes, six as rows (shorten trousers, take
// in the waist, taper the legs, shorten sleeves, take in a shirt, replace
// a zip), each a link that asks about it on WhatsApp.
// (Lab: men Z, "Alterations".)
//
// The common fixes, not a price list; it asks. Needs a Men group and an
// alteration item in their services. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

const FIXES = ['Shorten trousers', 'Take in the waist', 'Taper the legs', 'Shorten sleeves', 'Take in a shirt', 'Replace a zip']

export default function AlterMen() {
  const { boutique } = useBoutique()
  const groups = boutique.services.groups
  const forMen = groups.some((g) => /^men/i.test(g.title))
  const alters = groups.flatMap((g) => g.items).some((i) => /alter/i.test(i))
  if (!forMen || !alters) return null

  return (
    <section id="men-alterations" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Quick fixes for men</h2>
        <ul className="mt-10 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-10">
          {FIXES.map((fix) => (
            <li key={fix} className="border-b border-ink/15">
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need to ${fix.charAt(0).toLowerCase()}${fix.slice(1)}. How much would it be?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center justify-between gap-4 py-4"
              >
                <span className="t-3">{fix}</span>
                <IconArrowRight size={20} stroke={1.75} aria-hidden="true" className="shrink-0 text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
