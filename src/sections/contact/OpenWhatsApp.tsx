// src/sections/contact/OpenWhatsApp.tsx
// A floating WhatsApp pill that reads the shop's real hours: "Open now"
// with a filled dot while they're open, or when they open next while
// they're closed. Messages can be sent any time; it doesn't promise when
// they'll be answered. (Lab: wa G, "Open now".)
//
// The main branch's day-by-day hours (app/hours); without them it's a
// plain "Chat on WhatsApp" pill. Place it once in a design, beside
// SiteShell, not with another sticky WhatsApp control.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useOpenState } from '../../app/hours'
import { capitalise } from '../../app/text'
import { useShowAfterFirstScreen } from './stickyShared'

export default function OpenWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  const state = useOpenState(boutique.branches[0])
  useShowAfterFirstScreen(root)
  const [status, detail] = state ? state.label.split(' · ') : []

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      <a
        href={whatsappLink(boutique)}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex min-h-14 max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full bg-primary-ink py-2 pr-6 pl-2 text-on-primary-ink transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-on-primary-ink/15">
          <IconBrandWhatsapp size={22} stroke={1.75} aria-hidden="true" />
          {state && (
            <span
              aria-hidden="true"
              className={`absolute top-0.5 right-0.5 h-3 w-3 rounded-full ring-2 ring-primary-ink ${state.open ? 'bg-accent' : 'bg-on-primary-ink/40'}`}
            />
          )}
        </span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate font-semibold">{state ? status : 'Chat on WhatsApp'}</span>
          {detail && <span className="t-small block truncate opacity-85">{capitalise(detail)}</span>}
        </span>
      </a>
    </div>
  )
}
