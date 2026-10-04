// src/sections/men/ShirtMen.tsx
// Build a shirt: collar, cuffs, pocket and fit as rows of choices, the
// picks read back as a sentence and sent on WhatsApp. (Lab: men F, "Shirt
// details".)
//
// The choices are standard shirt-making options, true of the craft; the
// message asks rather than promises. Shows only when their Men group lists
// shirts. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const DETAILS = [
  { id: 'collar', label: 'Collar', options: ['Spread', 'Button-down', 'Mandarin', 'Cutaway'] },
  { id: 'cuff', label: 'Cuffs', options: ['Single button', 'Two button', 'French'] },
  { id: 'pocket', label: 'Pocket', options: ['No pocket', 'One pocket', 'Two pockets'] },
  { id: 'fit', label: 'Fit', options: ['Regular', 'Slim', 'Relaxed'] },
] as const

const PILL =
  'min-h-11 cursor-pointer rounded-full border border-ink/25 px-4 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink'

export default function ShirtMen() {
  const { boutique } = useBoutique()
  const stitchesShirts = (boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []).some((i) => /shirt/i.test(i))
  const [picks, setPicks] = useState<Record<string, string>>({ collar: 'Spread', cuff: 'Single button', pocket: 'One pocket', fit: 'Regular' })
  if (!stitchesShirts) return null

  const sentence = `A ${picks.fit.toLowerCase()} fit shirt with a ${picks.collar.toLowerCase()} collar, ${picks.cuff.toLowerCase()} cuffs and ${picks.pocket.toLowerCase()}`

  return (
    <section id="men-shirt" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Build your shirt</h2>
        <div className="mt-10 space-y-8">
          {DETAILS.map((d) => (
            <div key={d.id} role="group" aria-label={d.label}>
              <p className="t-small text-muted">{d.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {d.options.map((o) => (
                  <button key={o} type="button" onClick={() => setPicks({ ...picks, [d.id]: o })} aria-pressed={picks[d.id] === o} className={PILL}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="t-lead mt-12 max-w-[40ch] border-t border-ink/15 pt-8" aria-live="polite">
          {sentence}.
        </p>
        <div className="mt-8">
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a shirt stitched: ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}.`)} variant="primary" icon={IconBrandWhatsapp}>
            Send my shirt
          </Button>
        </div>
      </div>
    </section>
  )
}
