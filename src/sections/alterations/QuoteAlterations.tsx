// src/sections/alterations/QuoteAlterations.tsx
// Ask for a quote in two taps: the garment, then what's wrong with it;
// the message writes itself as she picks and the button sends it with a
// photo to follow. (Lab: alter Q, "Quote builder".)
//
// Shows only when their services list alterations. No prices are shown;
// it asks. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const GARMENTS = ['Blouse', 'Kurti', 'Lehenga', 'Salwar', 'Saree', 'Pants', 'Kids’ wear']
const PROBLEMS = ['Too loose', 'Too tight', 'Too long', 'Sleeves', 'Neckline', 'Zip or hooks']

const PILL =
  'min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink'

export default function QuoteAlterations() {
  const { boutique } = useBoutique()
  const altersClothes = boutique.services.groups.flatMap((g) => g.items).some((i) => /alter/i.test(i))
  const [garment, setGarment] = useState('Blouse')
  const [problems, setProblems] = useState<string[]>(['Too loose'])
  if (!altersClothes) return null

  const toggle = (p: string) => setProblems(problems.includes(p) ? problems.filter((x) => x !== p) : [...problems, p])
  const what = problems.length ? problems.map((p) => p.toLowerCase()).join(', ') : 'needs altering'
  const message = `Hi ${boutique.brand.name}, I have a ${garment.toLowerCase()} that's ${what}. How much would it cost to fix? I'll send a photo.`

  return (
    <section id="alteration-quote" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Ask what it costs</h2>
        <div className="mt-10" role="group" aria-label="Garment">
          <p className="t-small text-muted">The garment</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {GARMENTS.map((g) => (
              <button key={g} type="button" onClick={() => setGarment(g)} aria-pressed={g === garment} className={PILL}>
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8" role="group" aria-label="What’s wrong">
          <p className="t-small text-muted">What’s wrong (pick any)</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {PROBLEMS.map((p) => (
              <button key={p} type="button" onClick={() => toggle(p)} aria-pressed={problems.includes(p)} className={PILL}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-10 max-w-[56ch] rounded-2xl rounded-br-sm bg-paper px-5 py-4" aria-live="polite">
          {message}
        </p>
        <div className="mt-8">
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Send on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
