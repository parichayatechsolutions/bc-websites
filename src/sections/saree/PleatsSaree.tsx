// src/sections/saree/PleatsSaree.tsx
// How many pleats? Dark, plus and minus buttons beside a drawn fan of
// pleats that grows and shrinks, with a line on what fewer or more pleats
// do, and a button to ask for pre-pleating. (Lab: saree G, "How many
// pleats?".)
//
// General draping guidance. Shows only when their services list pleating
// or draping. The fan redraws with a CSS transition.

import { useState } from 'react'
import { IconBrandWhatsapp, IconMinus, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-light/40 transition-[background-color,color] duration-200 ease-stitch hover:bg-light hover:text-dark disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-light'

const note = (n: number) =>
  n <= 5 ? 'Fewer, wider pleats: a flatter front, suits heavier silks.' : n <= 8 ? 'The usual count: an even fall that walks easily.' : 'Many fine pleats: a fuller front, suits light chiffons and georgettes.'

export default function PleatsSaree() {
  const { boutique } = useBoutique()
  const offers = boutique.services.groups.flatMap((g) => g.items).some((i) => /pleat|drap/i.test(i))
  const [count, setCount] = useState(7)
  if (!offers) return null
  const spread = 70

  return (
    <section id="saree-pleats" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">How many pleats?</h2>
          <div className="mt-8 flex items-center gap-5">
            <button type="button" onClick={() => setCount(count - 1)} disabled={count <= 4} aria-label="One fewer pleat" className={ROUND}>
              <IconMinus size={22} stroke={1.75} aria-hidden="true" />
            </button>
            <p aria-live="polite">
              <span className="t-hero tabular-nums text-accent-on-dark">{count}</span>
              <span className="t-3 ml-2">pleats</span>
            </p>
            <button type="button" onClick={() => setCount(count + 1)} disabled={count >= 11} aria-label="One more pleat" className={ROUND}>
              <IconPlus size={22} stroke={1.75} aria-hidden="true" />
            </button>
          </div>
          <p className="mt-6 max-w-[34ch] text-light/80">{note(count)}</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like my saree pre-pleated, about ${count} pleats.`)} icon={IconBrandWhatsapp}>
              Ask for pre-pleating
            </Button>
          </div>
        </div>
        <figure className="rounded-2xl bg-light p-6 md:col-span-7 md:p-10">
          <svg viewBox="0 0 200 160" aria-hidden="true" className="block w-full">
            {Array.from({ length: count }, (_, i) => {
              const a = ((i - (count - 1) / 2) / Math.max(count - 1, 1)) * spread
              return (
                <path
                  key={i}
                  d="M 96 20 L 104 20 L 118 150 L 82 150 Z"
                  transform={`rotate(${a} 100 20)`}
                  strokeWidth={1}
                  className="transition-transform duration-300 ease-stitch"
                  style={{ fill: i % 2 ? 'var(--c-primary)' : 'color-mix(in oklab, var(--c-primary) 75%, var(--c-dark))', stroke: 'var(--c-accent)' }}
                />
              )
            })}
          </svg>
        </figure>
      </div>
    </section>
  )
}
