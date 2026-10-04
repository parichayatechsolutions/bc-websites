// src/sections/bridal/TierBridal.tsx
// Bridal packages side by side, each with its starting price, what's
// included and a button to ask about it. (Lab: bridal A, "Three tiers".)
//
// All cards are equal: the lab raised the middle one as "Most chosen",
// which is a claim nobody made. Prices only with the boutique's permission;
// without packages in the config it hides (ConsultBridal needs none).
//
// Motion: the cards uncover in turn as they come into view.
// Reduced motion: the cards in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconCheck, IconMessageCircle } from '@tabler/icons-react'
import { capitalise } from '../../app/text'
import Button from '../../components/Button'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useBridal } from './bridalShared'

const COLUMNS = { 1: 'md:max-w-xl', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' } as Record<number, string>

export default function TierBridal() {
  const { packages, price, pricesShown, ask, consult } = useBridal()
  const root = useRef<HTMLElement>(null)

  useMotion(root, () => {
    wipe('[data-card]', { trigger: root.current })
  })

  if (!packages.length) return null

  return (
    <section ref={root} id="bridal" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Bridal packages</h2>

        <ul className={`mt-12 grid gap-4 ${COLUMNS[Math.min(packages.length, 3)]}`}>
          {packages.map((p) => (
            <li key={p.name} data-card className="flex flex-col rounded-2xl border border-ink/15 p-7 md:p-8">
              <h3 className="t-3 text-primary-ink">{p.name}</h3>
              {price(p) && <p className="t-2 mt-3">{price(p)}</p>}
              {p.includes.length > 0 && (
                <ul className="mt-6 mb-8 space-y-3 border-t border-ink/15 pt-6">
                  {p.includes.map((item) => (
                    <li key={item} className="grid grid-cols-[1.25rem_1fr] gap-3">
                      <IconCheck size={20} stroke={1.75} className="mt-1 text-primary-ink" aria-hidden="true" />
                      {capitalise(item)}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-auto">
                <Button href={ask(p)} variant="outline-dark" icon={IconMessageCircle}>
                  Ask about {p.name}
                </Button>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          {pricesShown && <p className="max-w-[44ch] text-muted">Starting prices. The final price depends on your design and fabric.</p>}
          <Button href={consult} variant="primary" icon={IconBrandWhatsapp}>
            Book a bridal consult
          </Button>
        </div>
      </div>
    </section>
  )
}
