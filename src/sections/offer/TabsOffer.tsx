// src/sections/offer/TabsOffer.tsx
// Several offers behind tabs: each tab an offer's short name, the panel
// with the offer in full, its conditions, last day and a WhatsApp button,
// beside a photo of their work. (Lab: offer X, "Offer tabs".)
//
// Only offers running today; needs two or more. Tabs follow the ARIA
// pattern (arrow keys). The panel swaps with a CSS fade.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { untilText, useOffers } from './offerShared'

const short = (title: string) => (title.length > 28 ? `${title.slice(0, 26).trimEnd()}…` : title)

export default function TabsOffer() {
  const { boutique } = useBoutique()
  const { offers, ask } = useOffers()
  const id = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  if (offers.length < 2) return null
  const offer = offers[active] ?? offers[0]
  const photo = boutique.media.work[active % Math.max(boutique.media.work.length, 1)]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    e.preventDefault()
    const next = (active + by + offers.length) % offers.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section aria-label="Offers" className="section">
      <div className="wrap">
        <h2 className="t-1">Offers right now</h2>
        <div role="tablist" aria-label="Offers" onKeyDown={onKey} className="mt-8 flex flex-wrap gap-2">
          {offers.map((o, i) => (
            <button
              key={o.title}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${id}-tab${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 text-left transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-selected:border-primary-ink aria-selected:bg-primary-ink aria-selected:text-on-primary-ink"
            >
              {short(o.title)}
            </button>
          ))}
        </div>
        <div
          key={active}
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab${active}`}
          className="mt-10 grid animate-[fade-in_700ms_var(--ease-stitch)] items-center gap-10 md:grid-cols-12 md:gap-16"
        >
          {photo && (
            <div className="arch aspect-[4/5] max-w-sm bg-paper md:col-span-5">
              <Media file={photo} alt="" />
            </div>
          )}
          <div className={photo ? 'md:col-span-7' : 'md:col-span-9'}>
            {offer.until && <p className="text-primary-ink">{untilText(offer.until)}</p>}
            <h3 className="t-2 mt-3 max-w-[22ch] text-balance">{offer.title}</h3>
            {offer.detail && <p className="mt-4 max-w-[44ch] text-muted">{offer.detail}</p>}
            {offer.code && <p className="mt-4 font-semibold tracking-wide">Code: {offer.code}</p>}
            <div className="mt-8">
              <Button href={ask(offer)} variant="primary" icon={IconBrandWhatsapp}>
                Ask about this offer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
