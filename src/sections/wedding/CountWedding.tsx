// src/sections/wedding/CountWedding.tsx
// Count the looks: a stepper for each person in the family (the bride,
// the groom, the mothers, sisters, brothers, the children) and the total
// number of outfits set huge beside them; the button sends the count.
// (Lab: wed E, "Count the looks".)
//
// Nothing is stored. Shows only for a boutique that does bridal work. No
// motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconMinus, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useWedding } from './weddingShared'

const PEOPLE = ['The bride', 'The groom', 'The mothers', 'Sisters', 'Brothers', 'The children']
const START = [5, 0, 2, 0, 0, 0]
const ROUND =
  'grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink'

export default function CountWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  const [counts, setCounts] = useState(START)
  if (!doesBridal) return null
  const total = counts.reduce((a, b) => a + b, 0)
  const set = (i: number, by: number) => setCounts(counts.map((c, j) => (j === i ? Math.min(Math.max(c + by, 0), 20) : c)))
  const lines = PEOPLE.map((p, i) => (counts[i] ? `${p}: ${counts[i]}` : '')).filter(Boolean).join(', ')

  return (
    <section id="wedding-count" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Count the looks</h2>
          <p className="mt-8 font-display leading-none tabular-nums text-primary-ink" style={{ fontSize: 'clamp(6rem, 20vw, 12rem)' }} aria-live="polite">
            {total}
          </p>
          <p className="t-3">{total === 1 ? 'outfit' : 'outfits'} in all</p>
        </div>
        <div className="md:col-span-7">
          <ul className="border-t border-ink/15">
            {PEOPLE.map((p, i) => (
              <li key={p} className="flex items-center justify-between gap-4 border-b border-ink/15 py-3">
                <span className="t-3">{p}</span>
                <span className="flex items-center gap-3">
                  <button type="button" onClick={() => set(i, -1)} disabled={counts[i] <= 0} aria-label={`One fewer for ${p.toLowerCase()}`} className={ROUND}>
                    <IconMinus size={18} stroke={1.75} aria-hidden="true" />
                  </button>
                  <span className="t-3 w-8 text-center tabular-nums">{counts[i]}</span>
                  <button type="button" onClick={() => set(i, 1)} disabled={counts[i] >= 20} aria-label={`One more for ${p.toLowerCase()}`} className={ROUND}>
                    <IconPlus size={18} stroke={1.75} aria-hidden="true" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, we're planning a wedding and need about ${total} outfits${lines ? ` (${lines})` : ''}. Could we talk?`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Send the count
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
