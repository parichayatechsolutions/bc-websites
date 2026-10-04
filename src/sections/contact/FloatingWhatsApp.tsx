// src/sections/contact/FloatingWhatsApp.tsx
// A round WhatsApp button that stays in the bottom corner on every page, so
// a chat is never more than a thumb away. (Lab: wa A, "Classic", without its
// pulse: nothing loops.)
//
// Place it once in a design, beside SiteShell, not inside a page. Don't
// pair it with a navigation that already has a phone dock with WhatsApp.
//
// No shadow (DESIGN.md); a ring in the page colour keeps it distinct over
// photos and over a footer of the same brand colour. It sits under the
// navigation and its phone menu.
//
// Motion: rises in once the visitor is past the hero (stickyShared.ts).
// Reduced motion: always there.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useShowAfterFirstScreen } from './stickyShared'

export default function FloatingWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  useShowAfterFirstScreen(root)

  return (
    <div
      ref={root}
      className="pointer-events-none fixed right-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6"
    >
      <a
        href={whatsappLink(boutique)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="pointer-events-auto grid h-14 w-14 place-items-center rounded-full bg-primary-ink text-on-primary-ink ring-2 ring-light transition-[translate,background-color] duration-300 ease-stitch hover:-translate-y-1 hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)] active:translate-y-0"
      >
        <IconBrandWhatsapp size={28} stroke={1.75} aria-hidden="true" />
      </a>
    </div>
  )
}
