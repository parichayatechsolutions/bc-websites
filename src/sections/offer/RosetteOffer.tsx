// src/sections/offer/RosetteOffer.tsx
// A pleated rosette, like a prize ribbon, carrying the offer's last day,
// beside the offer itself, its conditions, its code and a button to ask.
// Any other offers running follow in a ruled list.
// (Lab: offer V, "Rosette seal".)
//
// Only offers running today (offerShared); hides without one. Without a
// last day the rosette just says "Offer". No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { untilText, useOffers } from './offerShared'

// A pleated edge: 32 points alternating between two radii, on a 200 grid.
const PLEATS = Array.from({ length: 64 }, (_, i) => {
  const r = i % 2 ? 88 : 100
  const a = (i / 64) * Math.PI * 2
  return `${(100 + r * Math.sin(a)).toFixed(1)},${(100 - r * Math.cos(a)).toFixed(1)}`
}).join(' ')

export default function RosetteOffer() {
  const { offers, ask } = useOffers()
  if (!offers.length) return null
  const [offer, ...more] = offers
  const until = untilText(offer.until)

  return (
    <section id="offers" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="relative mx-auto w-52 md:col-span-4 md:w-64" aria-hidden="true">
          <svg viewBox="0 -10 200 290" className="block w-full overflow-visible">
            <path d="M 70 170 L 50 275 L 75 258 L 92 280 L 100 180 Z" style={{ fill: 'var(--c-primary-ink)' }} />
            <path d="M 130 170 L 150 275 L 125 258 L 108 280 L 100 180 Z" style={{ fill: 'color-mix(in oklab, var(--c-primary-ink) 80%, black)' }} />
            <polygon points={PLEATS} style={{ fill: 'var(--c-accent)' }} />
            <circle cx={100} cy={100} r={70} style={{ fill: 'var(--c-primary-ink)' }} />
            <circle cx={100} cy={100} r={62} fill="none" strokeWidth={1.5} strokeDasharray="4 4" style={{ stroke: 'var(--c-on-primary-ink)' }} />
          </svg>
          <p className="absolute inset-x-0 top-[13%] mx-auto grid aspect-square w-[60%] place-content-center text-center leading-tight text-on-primary-ink">
            {until ? (
              <>
                <span className="t-small block">Until</span>
                <span className="t-3 block">{until.replace(/^Until /, '')}</span>
              </>
            ) : (
              <span className="t-3">Offer</span>
            )}
          </p>
        </div>
        <div className="md:col-span-8">
          <h2 className="t-1 max-w-[16ch] text-balance">{offer.title}</h2>
          {offer.detail && <p className="t-lead mt-5 max-w-[44ch] text-muted">{offer.detail}</p>}
          {until && <p className="sr-only">{until}</p>}
          {offer.code && (
            <p className="mt-6">
              <span className="text-muted">Code </span>
              <span className="rounded-full border border-dashed border-primary-ink px-3 py-1 font-semibold tracking-wide text-primary-ink">{offer.code}</span>
            </p>
          )}
          <div className="mt-8">
            <Button href={ask(offer)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about this offer
            </Button>
          </div>
          {more.length > 0 && (
            <ul className="mt-12 border-t border-ink/15">
              {more.map((o) => (
                <li key={o.title} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink/15 py-4">
                  <a href={ask(o)} target="_blank" rel="noopener noreferrer" className="link-stitch font-semibold">
                    {o.title}
                  </a>
                  {o.until && <span className="t-small text-muted">{untilText(o.until)}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
