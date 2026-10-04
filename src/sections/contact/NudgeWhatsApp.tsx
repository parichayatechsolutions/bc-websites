// src/sections/contact/NudgeWhatsApp.tsx
// The round floating WhatsApp button with a small speech bubble beside it
// naming the first thing they're known for ("Looking for bridal blouses?
// Ask us here."), which she can close; the button stays.
// (Lab: wa K, "Tooltip".)
//
// The bubble uses `services.featured`; without any it just says "Ask us
// here". Place it once in a design, beside SiteShell, not with another
// sticky WhatsApp control.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useShowAfterFirstScreen } from './stickyShared'

export default function NudgeWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(true)
  useShowAfterFirstScreen(root)
  const known = boutique.services.featured[0]
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 flex items-end gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      {open && (
        <p className="pointer-events-auto relative mb-2 max-w-[min(15rem,calc(100vw-7rem))] rounded-2xl rounded-br-sm border border-ink/15 bg-light py-3 pr-10 pl-4 text-ink">
          <span className="t-small block">{known ? `Looking for ${lower(known)}? Ask us here.` : 'Ask us here.'}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-0.5 right-0.5 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 ease-stitch hover:bg-ink/5 hover:text-ink"
          >
            <IconX size={16} stroke={1.75} aria-hidden="true" />
          </button>
        </p>
      )}
      <a
        href={whatsappLink(boutique, known ? `Hi ${boutique.brand.name}, I'd like to ask about ${lower(known)}.` : undefined)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary-ink text-on-primary-ink ring-2 ring-light transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        <IconBrandWhatsapp size={28} stroke={1.75} aria-hidden="true" />
      </a>
    </div>
  )
}
