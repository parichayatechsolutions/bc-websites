// src/sections/kids/FabricsKids.tsx
// Soft on little skin: the fabrics that suit children, in ruled rows, each
// with a fine line showing how soft it is and what it's good for.
// (Lab: kids T, "Soft on little skin".)
//
// General guidance, true of the cloth, not a list of their stock. Needs a
// Kids group in their services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

// Softness out of 5, and a note.
const FABRICS = [
  { name: 'Mul cotton', soft: 5, note: 'The softest cotton; for babies and summer.' },
  { name: 'Cotton', soft: 4, note: 'Breathes and washes well; for every day.' },
  { name: 'Linen', soft: 3, note: 'Cool in the heat; softens with each wash.' },
  { name: 'Silk, lined in cotton', soft: 3, note: 'For festivals; the lining keeps it gentle on skin.' },
  { name: 'Net, lined in cotton', soft: 2, note: 'For party frocks; never against the skin unlined.' },
]

export default function FabricsKids() {
  const { boutique } = useBoutique()
  const hasKids = boutique.services.groups.some((g) => /^kid|child/i.test(g.title))
  if (!hasKids) return null

  return (
    <section id="kids-fabrics" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Soft on little skin</h2>
        <ul className="mt-10 border-t border-ink/15">
          {FABRICS.map((f) => (
            <li key={f.name} className="grid gap-2 border-b border-ink/15 py-5 md:grid-cols-12 md:items-center md:gap-8">
              <p className="t-3 md:col-span-4">{f.name}</p>
              <div className="md:col-span-3">
                <span className="block h-1 rounded-full bg-ink/10" aria-hidden="true">
                  <span className="block h-full rounded-full bg-primary-ink" style={{ width: `${f.soft * 20}%` }} />
                </span>
                <span className="sr-only">Softness {f.soft} of 5</span>
              </div>
              <p className="text-muted md:col-span-5">{f.note}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, which fabric would you suggest for my child's outfit?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask which suits
          </Button>
        </div>
      </div>
    </section>
  )
}
