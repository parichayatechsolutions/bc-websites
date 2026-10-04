// src/sections/measure/SizeMeasure.tsx
// Size finder: tap her bust size and a card shows the usual under bust,
// shoulder, armhole and sleeve round for it, so she can check her own
// numbers or start from them. (Lab: measure Q, "Size finder".)
//
// The general chart from measureShared, labelled as starting points. Shows
// only for a boutique that stitches blouses. The card swaps with a CSS
// fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { useBlouse } from '../blouse/blouseShared'
import { SIZE_HEADS, SIZES } from './measureShared'

export default function SizeMeasure() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  const [index, setIndex] = useState(2)
  if (!stitchesBlouses) return null
  const size = SIZES[index]
  const message = `Hi ${boutique.brand.name}, my bust is about ${size[0]} inches. I'd like a blouse stitched; could we start from your usual sizes for that?`

  return (
    <section id="size-finder" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Find your size</h2>
        <p className="t-3 mt-10">Your bust, in inches</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Bust size">
          {SIZES.map((s, i) => (
            <button
              key={s[0]}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className="h-14 w-14 cursor-pointer rounded-full border border-ink/25 tabular-nums transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {s[0]}
            </button>
          ))}
        </div>
        <div key={index} className="mt-8 animate-[fade-in_700ms_var(--ease-stitch)] rounded-2xl bg-paper p-7 md:p-10" aria-live="polite">
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {SIZE_HEADS.slice(1).map((head, i) => (
              <div key={head} className="flex flex-col-reverse justify-end">
                <dt className="t-small mt-1 text-muted">{head}</dt>
                <dd className="t-2 tabular-nums text-primary-ink">{size[i + 1]}″</dd>
              </div>
            ))}
          </dl>
          <p className="t-small mt-6 text-muted">Usual sizes for a {size[0]}″ bust, as a starting point. Yours may differ, so measure if you can.</p>
        </div>
        <div className="mt-8">
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about my size
          </Button>
        </div>
      </div>
    </section>
  )
}
