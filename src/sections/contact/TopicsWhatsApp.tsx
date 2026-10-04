// src/sections/contact/TopicsWhatsApp.tsx
// "What do you need?" A floating WhatsApp button that opens a short list
// of topics (what they're known for, alterations, something else); each
// opens WhatsApp with a message already written for it.
// (Lab: wa F, "What do you need?".)
//
// Place it once in a design, beside SiteShell, not with another sticky
// WhatsApp control. The list closes on Escape, a tap outside, or choosing.
//
// Motion: rises in once past the hero (stickyShared); the list fades in.
// Reduced motion: always there.

import { useEffect, useRef, useState } from 'react'
import { IconBrandWhatsapp, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useShowAfterFirstScreen } from './stickyShared'

export default function TopicsWhatsApp() {
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

  const name = boutique.brand.name
  const items = boutique.services.groups.flatMap((g) => g.items)
  const topics = [
    ...boutique.services.featured.slice(0, 3).map((f) => ({ label: f, message: `Hi ${name}, I'd like to ask about ${f.charAt(0).toLowerCase()}${f.slice(1)}.` })),
    ...(items.some((i) => /alteration/i.test(i)) ? [{ label: 'Alterations', message: `Hi ${name}, I have something that needs altering.` }] : []),
    { label: 'Something else', message: `Hi ${name}, I have a question.` },
  ]

  return (
    <div ref={root} className="fixed right-0 bottom-0 z-40 flex flex-col items-end gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      {open && (
        <div id="topics-dock" className="w-72 animate-[fade-in_200ms_var(--ease-stitch)] rounded-2xl border border-ink/15 bg-light p-4 text-ink">
          <p className="t-small px-1 text-muted">What do you need?</p>
          <ul className="mt-2 space-y-1">
            {topics.map((t) => (
              <li key={t.label}>
                <a
                  href={whatsappLink(boutique, t.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-full px-3 transition-colors duration-200 ease-stitch hover:bg-ink/5"
                >
                  {t.label}
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
        aria-controls="topics-dock"
        aria-label={open ? 'Close' : 'Chat on WhatsApp'}
        className="grid h-14 w-14 cursor-pointer place-items-center rounded-full bg-primary-ink text-on-primary-ink ring-2 ring-light transition-[translate,background-color] duration-300 ease-stitch hover:-translate-y-1 hover:bg-[color-mix(in_oklab,var(--c-primary-ink)_85%,black)] active:translate-y-0"
      >
        {open ? <IconX size={26} stroke={1.75} aria-hidden="true" /> : <IconBrandWhatsapp size={28} stroke={1.75} aria-hidden="true" />}
      </button>
    </div>
  )
}
