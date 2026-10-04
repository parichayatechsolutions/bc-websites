// src/sections/contact/FittingWhatsApp.tsx
// A floating "Book a fitting" pill that opens a small card of days (today
// and the six after); tapping a day opens WhatsApp asking for a fitting
// then. (Lab: wa M, "Book a fitting".)
//
// It asks for the day; the boutique confirms. Place it once in a design,
// beside SiteShell, not with another sticky WhatsApp control. Escape
// closes the card.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useEffect, useRef, useState } from 'react'
import { IconCalendarEvent, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useShowAfterFirstScreen } from './stickyShared'

export default function FittingWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  useShowAfterFirstScreen(root)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() + i)
    return {
      label: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' }),
      long: d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }),
    }
  })

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 flex flex-col items-end gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      {open && (
        <div role="dialog" aria-label="Pick a day" className="pointer-events-auto w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-ink/15 bg-light p-5 text-ink">
          <div className="flex items-start justify-between gap-4">
            <p className="t-3">Pick a day</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="-mt-2 -mr-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full hover:bg-ink/5">
              <IconX size={20} stroke={1.75} aria-hidden="true" />
            </button>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {days.map((d) => (
              <li key={d.long}>
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could I come for a fitting on ${d.long}? What time suits you?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-center rounded-full border border-ink/25 px-3 text-sm transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-primary-ink hover:bg-primary-ink hover:text-on-primary-ink"
                >
                  {d.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="pointer-events-auto flex min-h-14 cursor-pointer items-center gap-2 rounded-full bg-primary-ink px-6 font-semibold text-on-primary-ink transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        <IconCalendarEvent size={22} stroke={1.75} aria-hidden="true" />
        Book a fitting
      </button>
    </div>
  )
}
