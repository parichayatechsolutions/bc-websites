// src/sections/fabric/FinderFabrics.tsx
// Fabric finder: two taps (the occasion, then the feel she wants: light
// and flowing, crisp, or rich) and the fabrics of theirs that fit appear,
// each with an Ask button. (Lab: fabric Q, "Fabric finder".)
//
// From `fabrics`: the occasion from their own "best for" notes, the feel
// from the fabric's kind (fabricKinds). When nothing fits both, it says so
// and offers to ask. Needs two known fabrics. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { scaled, type Scale } from './fabricKinds'

const OCCASIONS = [
  { name: 'Any', match: /./ },
  { name: 'Wedding', match: /wedding|bridal|bride|muhurtham/i },
  { name: 'Party', match: /reception|party|evening|sangeet/i },
  { name: 'Festival', match: /festival|festive|pooja|puja/i },
  { name: 'Every day', match: /every ?day|daily|office|casual|summer/i },
]
const FEELS: { name: string; fits: (s: Scale) => boolean }[] = [
  { name: 'Light and flowing', fits: ([w, , d]) => w <= 2 && d >= 4 },
  { name: 'Crisp', fits: ([, , d]) => d <= 2 },
  { name: 'Rich', fits: ([w, s]) => w >= 3 && s >= 4 },
]

const PILL =
  'min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink'

export default function FinderFabrics() {
  const { boutique } = useBoutique()
  const fabrics = scaled(boutique.fabrics ?? [])
  const [occasion, setOccasion] = useState(0)
  const [feel, setFeel] = useState(0)
  if (fabrics.length < 2) return null

  const o = OCCASIONS[occasion]
  const matches = fabrics.filter((f) => (occasion === 0 || o.match.test(f.fabric.bestFor ?? '')) && FEELS[feel].fits(f.scale))

  return (
    <section id="fabric-finder" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Find your fabric</h2>
        <div className="mt-10" role="group" aria-label="Occasion">
          <p className="t-small text-muted">The occasion</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {OCCASIONS.map((x, i) => (
              <button key={x.name} type="button" onClick={() => setOccasion(i)} aria-pressed={i === occasion} className={PILL}>
                {x.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6" role="group" aria-label="Feel">
          <p className="t-small text-muted">The feel</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {FEELS.map((x, i) => (
              <button key={x.name} type="button" onClick={() => setFeel(i)} aria-pressed={i === feel} className={PILL}>
                {x.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-ink/15 pt-8" aria-live="polite">
          {matches.length ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {matches.map(({ fabric }) => (
                <li key={fabric.name} className="flex items-center gap-4 rounded-2xl bg-paper p-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden bg-light">
                    <Media file={fabric.photo} alt={`${fabric.name} swatch`} />
                  </div>
                  <div className="min-w-0">
                    <p className="t-3">{fabric.name}</p>
                    {fabric.bestFor && <p className="t-small text-muted">Best for {fabric.bestFor}</p>}
                    <a
                      href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your ${fabric.name}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-small mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-ink"
                    >
                      <IconBrandWhatsapp size={16} stroke={1.75} aria-hidden="true" />
                      <span className="link-stitch">Ask about it</span>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-wrap items-center justify-between gap-6">
              <p className="text-muted">Nothing on our list fits both. Ask us what would suit.</p>
              <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'm looking for a ${FEELS[feel].name.toLowerCase()} fabric${occasion ? ` for a ${o.name.toLowerCase()} outfit` : ''}.`)} variant="primary" icon={IconBrandWhatsapp}>
                Ask us
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
