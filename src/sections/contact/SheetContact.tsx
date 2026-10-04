// src/sections/contact/SheetContact.tsx
// Dark, one "Contact us" button; tapping it slides up a phone-style sheet
// of four ways in: WhatsApp, a call, directions and Instagram, each one
// tap. (Lab: contact G, "Bottom sheet".)
//
// Instagram only with a handle. The sheet is a dialog: Escape or the
// backdrop closes it. It slides with a CSS transition that reduced motion
// turns off.

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { IconBrandInstagram, IconBrandWhatsapp, IconDirections, IconMessageCircle, IconPhone, type Icon } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useInstagram } from '../instagram/igShared'

export default function SheetContact() {
  const { boutique } = useBoutique()
  const ig = useInstagram()
  const [open, setOpen] = useState(false)
  const branch = boutique.branches[0]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const ways = [
    { label: 'Chat on WhatsApp', href: whatsappLink(boutique), icon: IconBrandWhatsapp, external: true },
    { label: `Call ${boutique.contact.phone}`, href: telLink(boutique.contact.phone), icon: IconPhone, external: false },
    branch && { label: 'Directions', href: branch.mapsUrl, icon: IconDirections, external: true },
    ig && { label: `Instagram ${ig.handle}`, href: ig.href, icon: IconBrandInstagram, external: true },
  ].filter(Boolean) as { label: string; href: string; icon: Icon; external: boolean }[]

  return (
    <section id="contact" className="section bg-dark text-light">
      <div className="wrap text-center">
        <h2 className="t-1 mx-auto max-w-[14ch] text-balance">Talk to us, your way</h2>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="mt-10 inline-flex min-h-14 cursor-pointer items-center gap-2.5 rounded-full bg-light px-8 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
        >
          <IconMessageCircle size={22} stroke={1.75} aria-hidden="true" />
          Contact us
        </button>
      </div>
      {createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Contact us"
          inert={!open}
          className={`fixed inset-0 z-[60] flex items-end justify-center transition-[visibility] duration-500 ${open ? 'visible' : 'invisible'}`}
        >
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className={`absolute inset-0 cursor-default bg-dark/60 transition-opacity duration-500 ease-stitch ${open ? 'opacity-100' : 'opacity-0'}`}
          />
          <div
            className={`relative w-full max-w-md rounded-t-3xl bg-light px-5 pt-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-ink transition-transform duration-500 ease-stitch ${open ? 'translate-y-0' : 'translate-y-full'}`}
          >
            <span aria-hidden="true" className="mx-auto block h-1.5 w-12 rounded-full bg-ink/20" />
            <p className="t-3 mt-4 px-2">{boutique.brand.name}</p>
            <ul className="mt-3">
              {ways.map(({ label, href, icon: WayIcon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex min-h-14 items-center gap-4 rounded-2xl px-2 transition-colors duration-200 ease-stitch hover:bg-ink/5"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-ink text-on-primary-ink">
                      <WayIcon size={22} stroke={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-semibold">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => setOpen(false)} className="mt-3 min-h-12 w-full cursor-pointer rounded-full border border-ink/20 font-semibold hover:bg-ink/5">
              Close
            </button>
          </div>
        </div>,
        document.querySelector('.boutique') ?? document.body,
      )}
    </section>
  )
}
