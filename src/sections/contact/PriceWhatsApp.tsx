// src/sections/contact/PriceWhatsApp.tsx
// A floating pill that joins their lowest starting price to a WhatsApp
// button: "Blouses from ₹450 · Ask us". The price answers the first
// question; the button asks the rest. (Lab: wa X, "Price + ask".)
//
// The price only with permission and a starting price in the config;
// otherwise the pill just says "Chat on WhatsApp". Place it once in a
// design, beside SiteShell, not with another sticky WhatsApp control.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import { useShowAfterFirstScreen } from './stickyShared'

export default function PriceWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  useShowAfterFirstScreen(root)
  const prices = boutique.permissions.showPrices ? (boutique.pricing?.startingAt ?? []) : []
  const cheapest = [...prices].sort((a, b) => a.price - b.price)[0]

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      <a
        href={whatsappLink(boutique, cheapest ? `Hi ${boutique.brand.name}, I'd like to know the price for ` : undefined)}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex min-h-14 items-center overflow-hidden rounded-full bg-light text-ink ring-2 ring-primary-ink transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        {cheapest && (
          <span className="px-5 py-2 leading-tight">
            <span className="t-small block text-muted">{cheapest.item} from</span>
            <span className="font-semibold tabular-nums">{rupees(cheapest.price)}</span>
          </span>
        )}
        <span className="flex h-14 items-center gap-2 bg-primary-ink px-5 font-semibold text-on-primary-ink">
          <IconBrandWhatsapp size={22} stroke={1.75} aria-hidden="true" />
          {cheapest ? 'Ask us' : 'Chat on WhatsApp'}
        </span>
      </a>
    </div>
  )
}
