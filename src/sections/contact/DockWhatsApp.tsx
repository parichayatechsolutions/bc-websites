// src/sections/contact/DockWhatsApp.tsx
// One round button in the bottom corner that opens a small menu of three
// ways in: WhatsApp, a call, directions. For a site that wants calls and
// visits as close as chats. (Lab: wa L, "Contact dock".)
//
// Place it once in a design, beside SiteShell. Don't pair it with another
// sticky WhatsApp control or a nav with a phone dock. The menu closes on
// Escape, a tap outside, or choosing.
//
// Motion: rises in once the visitor is past the hero (stickyShared); the
// menu opens with a CSS fade. Reduced motion: always there.

import { useEffect, useRef, useState } from 'react'
import { IconBrandWhatsapp, IconDirections, IconMessageCircle, IconPhone, IconX } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useShowAfterFirstScreen } from './stickyShared'

export default function DockWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  useShowAfterFirstScreen(root)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onDown)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  const branch = boutique.branches[0]
  const ways = [
    { label: 'Chat on WhatsApp', href: whatsappLink(boutique), icon: IconBrandWhatsapp },
    { label: `Call ${boutique.contact.phone}`, href: telLink(boutique.contact.phone), icon: IconPhone },
    ...(branch ? [{ label: 'Get directions', href: branch.mapsUrl, icon: IconDirections }] : []),
  ]

  return (
    <div ref={root} className="fixed right-0 bottom-0 z-40 flex flex-col items-end gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      {open && (
        <ul id="contact-dock" className="flex animate-[fade-in_200ms_var(--ease-stitch)] flex-col gap-2">
          {ways.map(({ label, href, icon: WayIcon }) => (
            <li key={label}>
              <a
                href={href}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center gap-3 rounded-full border border-ink/15 bg-light py-2 pr-5 pl-3 font-semibold text-ink transition-colors duration-200 ease-stitch hover:border-ink"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full bg-primary-ink text-on-primary-ink">
                  <WayIcon size={18} stroke={1.75} aria-hidden="true" />
                </span>
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="contact-dock"
        aria-label={open ? 'Close contact options' : 'Contact us'}
        className="grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-primary-ink text-on-primary-ink ring-2 ring-light transition-[translate,background-color] duration-300 ease-stitch hover:-translate-y-1 hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)] active:translate-y-0"
      >
        {open ? <IconX size={26} stroke={1.75} aria-hidden="true" /> : <IconMessageCircle size={26} stroke={1.75} aria-hidden="true" />}
      </button>
    </div>
  )
}
