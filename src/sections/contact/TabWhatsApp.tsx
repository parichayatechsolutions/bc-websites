// src/sections/contact/TabWhatsApp.tsx
// A slim tab on the right edge of the screen, halfway down, reading
// "WhatsApp us" upwards beside the icon: always there, never covering the
// content. (Lab: wa H, "Side tab".)
//
// Place it once in a design, beside SiteShell, not with another sticky
// WhatsApp control.
//
// Motion: appears once past the hero (stickyShared). Reduced motion:
// always there.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useShowAfterFirstScreen } from './stickyShared'

export default function TabWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  useShowAfterFirstScreen(root)

  return (
    <div ref={root} className="pointer-events-none fixed top-1/2 right-0 z-40 -translate-y-1/2">
      <a
        href={whatsappLink(boutique)}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex flex-col items-center gap-3 rounded-l-2xl bg-primary-ink px-3 py-5 font-semibold text-on-primary-ink transition-[padding] duration-300 ease-stitch hover:pr-5"
      >
        <IconBrandWhatsapp size={22} stroke={1.75} aria-hidden="true" />
        <span className="rotate-180 [writing-mode:vertical-rl]">WhatsApp us</span>
      </a>
    </div>
  )
}
