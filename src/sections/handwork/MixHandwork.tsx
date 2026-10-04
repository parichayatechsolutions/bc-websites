// src/sections/handwork/MixHandwork.tsx
// Mix two works: tap any two kinds of handwork they do (aari with mirror,
// maggam with beads) and the button asks about that combination.
// (Lab: emb X, "Mix two works".)
//
// Only the works in their own services; needs two or more. A third tap
// replaces the older pick. It asks rather than promises. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const HANDWORK = /aari|maggam|zardosi|zardozi|zari|mirror|bead|stone|hand embroidery|machine embroidery|kantha|chikan|cutwork|sequin/i

export default function MixHandwork() {
  const { boutique } = useBoutique()
  const works = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => HANDWORK.test(i)))]
  const [picked, setPicked] = useState<string[]>(works.slice(0, 2))
  if (works.length < 2) return null

  const toggle = (w: string) => setPicked(picked.includes(w) ? picked.filter((p) => p !== w) : [...picked, w].slice(-2))
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)
  const message =
    picked.length === 2
      ? `Hi ${boutique.brand.name}, could you do ${lower(picked[0])} with ${lower(picked[1])} on the same piece?`
      : `Hi ${boutique.brand.name}, I'd like to ask about combining handwork.`

  return (
    <section id="handwork-mix" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Mix two works</h2>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Handwork">
          {works.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => toggle(w)}
              aria-pressed={picked.includes(w)}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {w}
            </button>
          ))}
        </div>
        <p className="t-2 mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-ink/15 pt-8" aria-live="polite">
          <span className={picked[0] ? 'text-primary-ink' : 'text-muted'}>{picked[0] ?? 'Pick one'}</span>
          <IconPlus size={28} stroke={1.5} className="text-thread" aria-hidden="true" />
          <span className="sr-only">with</span>
          <span className={picked[1] ? 'text-primary-ink' : 'text-muted'}>{picked[1] ?? 'and another'}</span>
        </p>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about this mix
          </Button>
        </div>
      </div>
    </section>
  )
}
