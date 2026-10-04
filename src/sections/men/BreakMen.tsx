// src/sections/men/BreakMen.tsx
// The trouser break: no break, a half break and a full break, each drawn
// simply as the hem meets the shoe, with what it suits; pick one to ask
// for it. (Lab: men W, "Trouser break".)
//
// The notes are general tailoring knowledge. Shows only when their Men
// group lists trousers or pants. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

// The leg on a 100 × 120 grid, ending at the hem; the fold where it breaks.
const BREAKS = [
  { id: 'none', name: 'No break', note: 'The hem just touches the shoe. Clean and modern; shows the socks when you sit.', hem: 96, fold: undefined },
  { id: 'half', name: 'Half break', note: 'One soft fold at the front. The safe choice for suits and formal trousers.', hem: 102, fold: 'M 32 88 Q 50 94 68 88' },
  { id: 'full', name: 'Full break', note: 'A deeper fold that covers the top of the shoe. Classic and relaxed.', hem: 106, fold: 'M 31 82 Q 50 92 69 82 M 31 92 Q 50 100 69 92' },
]

function Leg({ hem, fold }: { hem: number; fold?: string }) {
  return (
    <svg viewBox="0 0 100 120" aria-hidden="true" className="block h-full w-full" fill="none" strokeWidth={1.8} strokeLinejoin="round" style={{ stroke: 'var(--c-primary-ink)' }}>
      <path d="M 22 104 Q 22 96 36 96 L 66 98 Q 84 100 86 108 L 86 112 L 22 112 Z" style={{ fill: 'var(--c-ink)', stroke: 'var(--c-ink)' }} />
      <path d={`M 34 2 L 30 ${hem} L 70 ${hem} L 66 2`} style={{ fill: 'color-mix(in oklab, var(--c-primary) 14%, var(--c-light))' }} />
      {fold && <path d={fold} />}
    </svg>
  )
}

export default function BreakMen() {
  const { boutique } = useBoutique()
  const stitchesTrousers = (boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []).some((i) => /trouser|pant/i.test(i))
  const [index, setIndex] = useState(1)
  if (!stitchesTrousers) return null
  const choice = BREAKS[index]

  return (
    <section id="men-break" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Where should the hem fall?</h2>
        <ul className="mt-12 grid grid-cols-3 gap-3 md:gap-6" role="group" aria-label="Trouser break">
          {BREAKS.map((b, i) => (
            <li key={b.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="group w-full cursor-pointer rounded-2xl border border-ink/15 p-3 transition-[border-color,background-color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-paper md:p-6"
              >
                <span className="mx-auto block aspect-[5/6] max-w-40">
                  <Leg hem={b.hem} fold={b.fold} />
                </span>
                <span className="mt-3 block text-center group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{b.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-8" aria-live="polite">
          <p className="max-w-[48ch] text-muted">{choice.note}</p>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like trousers stitched with a ${choice.name.toLowerCase()}.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for a {choice.name.toLowerCase()}
          </Button>
        </div>
      </div>
    </section>
  )
}
