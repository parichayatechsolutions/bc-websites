// src/sections/handwork/PlainHandwork.tsx
// Plain to precious: the same blouse photographed plain and again with
// their handwork, with a switch between the two, so a customer sees what
// the work adds. (Lab: emb K, "Plain to precious".)
//
// Pairs come from photos plain-<nn>.jpg with worked-<nn>.jpg; the note on
// the worked photo says what was done. More than one pair gives previous
// and next. Hides without a pair. The photos swap with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

const SIDES = ['Plain', 'With handwork'] as const

export default function PlainHandwork() {
  const { boutique } = useBoutique()
  const pairs = boutique.media.handworkPairs ?? []
  const captions = boutique.media.captions ?? {}
  const [index, setIndex] = useState(0)
  const [worked, setWorked] = useState(true)

  if (!pairs.length) return null
  const pair = pairs[index] ?? pairs[0]
  const file = worked ? pair.second : pair.first
  const note = captions[pair.second] ?? captions[pair.first]

  return (
    <section id="handwork-pairs" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden bg-paper">
            <Media key={file} file={file} alt={`${note ?? 'The blouse'}, ${worked ? 'with handwork' : 'plain'}`} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
        </div>
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">What handwork adds</h2>
          {note && <p className="mt-5 max-w-[36ch] text-muted">{note}</p>}

          <div className="mt-8 inline-flex rounded-full border border-ink/25 p-1" role="group" aria-label="Show">
            {SIDES.map((side, i) => (
              <button
                key={side}
                type="button"
                onClick={() => setWorked(i === 1)}
                aria-pressed={worked === (i === 1)}
                className="min-h-11 cursor-pointer rounded-full px-5 transition-[background-color,color] duration-200 ease-stitch aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
              >
                {side}
              </button>
            ))}
          </div>

          {pairs.length > 1 && (
            <div className="mt-6 flex gap-2">
              {pairs.map((p, i) => (
                <button
                  key={p.first}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  aria-label={`Blouse ${i + 1}`}
                  className="h-11 w-11 cursor-pointer rounded-full border border-ink/25 transition-colors duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like handwork on my blouse. Could you tell me more?`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about handwork
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
