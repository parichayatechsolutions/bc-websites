// src/sections/contact/StatusWhatsApp.tsx
// A slim strip with the shop's open-now status and a WhatsApp link: "Open
// now · until 8:30pm" or "Closed now · opens tomorrow at 10:30am", the area
// and "Chat on WhatsApp". (Lab: wa U, "Top banner", as a band to place
// under the navigation rather than pinned over it, since the nav already
// holds the top of the screen.)
//
// The main branch's day-by-day hours (app/hours); hides without them. A
// band, not a full section. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useOpenState } from '../../app/hours'

export default function StatusWhatsApp() {
  const { boutique } = useBoutique()
  const branch = boutique.branches[0]
  const state = useOpenState(branch)
  if (!branch || !state) return null

  return (
    <aside aria-label="Opening hours" className="border-b border-ink/10 bg-paper">
      <div className="t-small mx-auto flex min-h-11 max-w-[1200px] flex-wrap items-center justify-between gap-x-6 gap-y-1 px-5 py-2 md:px-10">
        <p className="flex items-center gap-2" aria-live="polite">
          <span aria-hidden="true" className={`h-2 w-2 rounded-full ${state.open ? 'bg-primary-ink' : 'border border-ink/50'}`} />
          <span className="font-semibold">{state.label}</span>
          <span className="hidden text-muted sm:inline">· {branch.area || branch.city}</span>
        </p>
        <a href={whatsappLink(boutique)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary-ink">
          <span className="link-stitch">Chat on WhatsApp</span>
          <IconArrowRight size={16} stroke={1.75} aria-hidden="true" />
        </a>
      </div>
    </aside>
  )
}
