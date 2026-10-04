// src/sections/men/CollarMen.tsx
// A collar guide: spread, button-down, mandarin and cutaway drawn as
// simple line art; tapping one picks it, says what it suits, and the
// button asks for a shirt with it. (Lab: men A, "Collar guide".)
//
// The notes are general shirt-making knowledge. Shows only when their Men
// group lists shirts. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

// Each collar on a 100 × 80 grid: the left leaf, mirrored for the right.
const COLLARS = [
  { id: 'spread', name: 'Spread', note: 'Points set wide apart. Made for a tie, smart without one.', leaf: 'M 50 34 L 33 16 L 20 38 Z' },
  { id: 'button', name: 'Button-down', note: 'Points buttoned to the shirt. Relaxed, for every day.', leaf: 'M 50 34 L 36 16 L 33 50 Z', button: true },
  { id: 'mandarin', name: 'Mandarin', note: 'A short standing band, no points. Pairs well with a kurta-style look.', band: true },
  { id: 'cutaway', name: 'Cutaway', note: 'Points cut back almost to the shoulders. Sharp, for a wide knot.', leaf: 'M 50 34 L 30 16 L 12 30 Z' },
]

function Collar({ c }: { c: (typeof COLLARS)[number] }) {
  return (
    <svg viewBox="0 0 100 80" aria-hidden="true" className="block h-full w-full" fill="none" strokeWidth={1.8} strokeLinejoin="round" style={{ stroke: 'var(--c-primary-ink)' }}>
      <path d="M 18 78 L 24 26 Q 50 40 76 26 L 82 78" style={{ fill: 'color-mix(in oklab, var(--c-primary) 10%, var(--c-light))' }} />
      <path d="M 50 34 L 50 78" strokeDasharray="3 3" />
      <circle cx={50} cy={56} r={1.6} style={{ fill: 'var(--c-primary-ink)' }} />
      <circle cx={50} cy={70} r={1.6} style={{ fill: 'var(--c-primary-ink)' }} />
      {c.band ? (
        <path d="M 30 16 Q 50 28 70 16 L 70 25 Q 50 38 30 25 Z" style={{ fill: 'var(--c-light)' }} />
      ) : (
        <>
          <path d="M 30 18 Q 50 28 70 18" />
          <path d={c.leaf} style={{ fill: 'var(--c-light)' }} />
          <path d={c.leaf} transform="matrix(-1 0 0 1 100 0)" style={{ fill: 'var(--c-light)' }} />
          {c.button && (
            <>
              <circle cx={35} cy={46} r={1.6} style={{ fill: 'var(--c-primary-ink)' }} />
              <circle cx={65} cy={46} r={1.6} style={{ fill: 'var(--c-primary-ink)' }} />
            </>
          )}
        </>
      )}
    </svg>
  )
}

export default function CollarMen() {
  const { boutique } = useBoutique()
  const stitchesShirts = (boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []).some((i) => /shirt/i.test(i))
  const [index, setIndex] = useState(0)
  if (!stitchesShirts) return null
  const collar = COLLARS[index]

  return (
    <section id="men-collar" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Pick your collar</h2>
        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4" role="group" aria-label="Collar">
          {COLLARS.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                className="group w-full cursor-pointer rounded-2xl border border-ink/15 p-4 transition-[border-color,background-color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-paper"
              >
                <span className="block aspect-[5/4]">
                  <Collar c={c} />
                </span>
                <span className="mt-3 block text-center group-aria-pressed:font-semibold group-aria-pressed:text-primary-ink">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-ink/15 pt-8" aria-live="polite">
          <div>
            <p className="t-3">{collar.name}</p>
            <p className="mt-1 max-w-[48ch] text-muted">{collar.note}</p>
          </div>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a shirt stitched with a ${collar.name.toLowerCase()} collar.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for this collar
          </Button>
        </div>
      </div>
    </section>
  )
}
