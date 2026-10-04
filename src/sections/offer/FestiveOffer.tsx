// src/sections/offer/FestiveOffer.tsx
// A festival offer under a drawn marigold garland, with a row of small
// diyas beneath: the offer, its conditions, last day and code, and a
// button to ask. (Lab: offer L, "Festive".)
//
// Only for an offer running today that names a festival (Diwali, Onam,
// Pongal, Eid, Navratri…), so the garland never decorates an ordinary
// sale. Hides otherwise. No motion: the diyas don't flicker.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { untilText, useOffers } from './offerShared'

const FESTIVAL = /diwali|deepavali|onam|pongal|sankranti|eid|ramzan|ramadan|navratri|dussehra|durga|ugadi|vishu|holi|christmas|rakhi|karva|teej|festive|festival|wedding season/i

export default function FestiveOffer() {
  const { offers, ask } = useOffers()
  const offer = offers.find((o) => FESTIVAL.test(`${o.title} ${o.detail ?? ''}`))
  if (!offer) return null

  return (
    <section id="offers" className="section bg-paper">
      <div className="wrap text-center">
        <svg viewBox="0 0 400 40" aria-hidden="true" className="mx-auto block w-full max-w-2xl">
          <path d="M 0 4 Q 200 44 400 4" fill="none" strokeWidth={1.5} style={{ stroke: 'var(--c-thread)' }} />
          {Array.from({ length: 19 }, (_, i) => {
            const t = (i + 0.5) / 19
            const x = 400 * t
            const y = 4 + 40 * t * (1 - t) * 2 * 0.95
            return <circle key={i} cx={x} cy={y} r={6.5} style={{ fill: i % 2 ? '#e8a317' : '#d9741c' }} />
          })}
        </svg>
        <h2 className="t-1 mx-auto mt-8 max-w-[18ch] text-balance">{offer.title}</h2>
        {offer.detail && <p className="t-lead mx-auto mt-5 max-w-[44ch] text-muted">{offer.detail}</p>}
        <p className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {offer.until && <span>{untilText(offer.until)}</span>}
          {offer.code && (
            <span>
              Code <span className="rounded-full border border-dashed border-primary-ink px-3 py-1 font-semibold tracking-wide text-primary-ink">{offer.code}</span>
            </span>
          )}
        </p>
        <div className="mt-8">
          <Button href={ask(offer)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about this offer
          </Button>
        </div>
        <svg viewBox="0 0 200 24" aria-hidden="true" className="mx-auto mt-12 block w-48">
          {[20, 70, 120, 170].map((x) => (
            <g key={x}>
              <path d={`M ${x - 12} 14 Q ${x} 26 ${x + 12} 14 Z`} style={{ fill: '#b5643a' }} />
              <path d={`M ${x} 2 Q ${x + 4} 8 ${x} 13 Q ${x - 4} 8 ${x} 2 Z`} style={{ fill: '#e8a317' }} />
            </g>
          ))}
        </svg>
      </div>
    </section>
  )
}
