// src/sections/saree/DoctorSaree.tsx
// The saree doctor: pick what's wrong (the edge is fraying, the hem drags,
// the pleats won't sit, the pallu end looks bare) and see what fixes it,
// with a button to ask for that fix. (Lab: saree T, "Saree doctor".)
//
// Only problems whose fix is one of their own services are offered; needs
// two or more. The explanations are general. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const PROBLEMS = [
  { problem: 'The edge is fraying', fix: 'Pico', match: /pico/i, why: 'A pico finish rolls and stitches the raw edge so it can’t fray.' },
  { problem: 'The hem drags and wears out', fix: 'A fall', match: /fall/i, why: 'A fall is a strip stitched inside the hem; it gives weight and takes the wear.' },
  { problem: 'The pleats won’t sit', fix: 'Pre-pleating', match: /pleat|drap/i, why: 'The pleats are set, pressed and pinned, so they fall straight on the day.' },
  { problem: 'The pallu end looks bare', fix: 'Kuchu or tassels', match: /kuchu|tassel/i, why: 'Knotted or beaded tassels finish the pallu and give it a little swing.' },
]

export default function DoctorSaree() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.flatMap((g) => g.items)
  const offered = PROBLEMS.filter((p) => items.some((i) => p.match.test(i)))
  const [index, setIndex] = useState(0)
  if (offered.length < 2) return null
  const current = offered[index] ?? offered[0]

  return (
    <section id="saree-doctor" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">What’s wrong with your saree?</h2>
          <ul className="mt-10 border-t border-ink/15" role="group" aria-label="Problem">
            {offered.map((p, i) => (
              <li key={p.problem} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="flex min-h-14 w-full cursor-pointer items-center py-4 text-left transition-colors duration-200 ease-stitch hover:text-primary-ink aria-pressed:font-semibold aria-pressed:text-primary-ink"
                >
                  {p.problem}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-6 md:self-end">
          <div key={current.fix} className="animate-[fade-in_700ms_var(--ease-stitch)] rounded-2xl bg-paper p-7 md:p-10" aria-live="polite">
            <p className="t-small text-muted">The fix</p>
            <p className="t-1 mt-2 text-primary-ink">{current.fix}</p>
            <p className="t-lead mt-4">{current.why}</p>
            <div className="mt-8">
              <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, ${current.problem.toLowerCase()}. Could you do ${current.fix.toLowerCase()} for my saree?`)} variant="primary" icon={IconBrandWhatsapp}>
                Ask about this fix
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
