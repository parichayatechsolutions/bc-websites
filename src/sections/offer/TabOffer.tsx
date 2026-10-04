// src/sections/offer/TabOffer.tsx
// An "Offers" tab on the left edge of the screen; tapping it slides a
// panel out with every offer running today, each with its last day and a
// link to ask. (Lab: offer S, "Side tab".)
//
// Only offers running today (offerShared); renders nothing without one.
// Place it once in a design, beside SiteShell. The panel slides with a CSS
// transition that reduced motion turns off; Escape closes it.
//
// Motion: the tab appears once past the hero (stickyShared). Reduced
// motion: always there.

import { useEffect, useRef, useState } from 'react'
import { IconBrandWhatsapp, IconGift, IconX } from '@tabler/icons-react'
import { useShowAfterFirstScreen } from '../contact/stickyShared'
import { untilText, useOffers } from './offerShared'

export default function TabOffer() {
  const { offers, ask } = useOffers()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  useShowAfterFirstScreen(root)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div ref={root} className="pointer-events-none fixed top-1/2 left-0 z-40 -translate-y-1/2">
      {offers.length > 0 && (
        <div className="flex items-center">
          <aside
            aria-label="Offers"
            inert={!open}
            className={`pointer-events-auto w-[min(20rem,calc(100vw-4rem))] rounded-r-2xl bg-light p-6 text-ink ring-1 ring-ink/15 transition-[translate,visibility] duration-500 ease-stitch ${open ? 'visible translate-x-0' : 'invisible -translate-x-full'}`}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="t-3">Offers</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close offers" className="-mt-2 -mr-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full hover:bg-ink/5">
                <IconX size={20} stroke={1.75} aria-hidden="true" />
              </button>
            </div>
            <ul className="mt-2">
              {offers.map((o) => (
                <li key={o.title} className="border-t border-ink/15 py-4">
                  <p className="font-semibold">{o.title}</p>
                  {o.until && <p className="t-small text-muted">{untilText(o.until)}</p>}
                  <a href={ask(o)} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink">
                    <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                    <span className="link-stitch">Ask about it</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className={`pointer-events-auto flex flex-col items-center gap-2 rounded-r-2xl bg-primary-ink px-2.5 py-4 font-semibold text-on-primary-ink transition-[translate] duration-500 ease-stitch ${open ? 'translate-x-0' : '-translate-x-[min(20rem,calc(100vw-4rem))]'}`}
          >
            <IconGift size={20} stroke={1.75} aria-hidden="true" />
            <span className="rotate-180 [writing-mode:vertical-rl]">Offers</span>
          </button>
        </div>
      )}
    </div>
  )
}
