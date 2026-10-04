// src/sections/contact/FormWhatsApp.tsx
// A floating "Ask us" pill that opens a small card with two fields (her
// name and what she needs), building the WhatsApp message as she types;
// the send button opens WhatsApp with it. (Lab: wa S, "Quick form".)
//
// Nothing is stored on the site. Place it once in a design, beside
// SiteShell, not with another sticky WhatsApp control. Escape closes the
// card.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useEffect, useRef, useState } from 'react'
import { IconBrandWhatsapp, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Field from '../../components/Field'
import { useShowAfterFirstScreen } from './stickyShared'

export default function FormWhatsApp() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [need, setNeed] = useState('')
  useShowAfterFirstScreen(root)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const message = `Hi ${boutique.brand.name},${name.trim() ? ` I'm ${name.trim()}.` : ''} ${need.trim() || 'I have a question.'}`

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 flex flex-col items-end gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      {open && (
        <div role="dialog" aria-label="Message us" className="pointer-events-auto w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-ink/15 bg-light p-5 text-ink">
          <div className="flex items-start justify-between gap-4">
            <p className="t-3">Message us</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="-mt-2 -mr-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full hover:bg-ink/5">
              <IconX size={20} stroke={1.75} aria-hidden="true" />
            </button>
          </div>
          <div className="mt-3 space-y-4">
            <Field label="Your name">{(props) => <input {...props} value={name} onChange={(e) => setName(e.target.value)} autoComplete="given-name" />}</Field>
            <Field label="What do you need?" required>
              {(props) => <textarea {...props} rows={3} value={need} onChange={(e) => setNeed(e.target.value)} />}
            </Field>
          </div>
          <a
            href={whatsappLink(boutique, message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-primary-ink px-6 font-semibold text-on-primary-ink"
          >
            <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
            Send on WhatsApp
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="pointer-events-auto flex min-h-14 cursor-pointer items-center gap-2 rounded-full bg-primary-ink px-6 font-semibold text-on-primary-ink transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        <IconBrandWhatsapp size={22} stroke={1.75} aria-hidden="true" />
        Ask us
      </button>
    </div>
  )
}
