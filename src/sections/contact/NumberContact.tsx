// src/sections/contact/NumberContact.tsx
// The WhatsApp number as the headline, as large as it fits, with buttons to
// chat, call, get directions and copy the number. For customers who'd
// rather save the number than tap a link. (Lab: contact P, "Big number".)
//
// Needs no data beyond the contact details. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck, IconCopy, IconDirections, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { fitDisplay } from '../../theme/theme'

export default function NumberContact() {
  const { boutique } = useBoutique()
  const { contact, branches } = boutique
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.whatsapp)
      setCopied(true)
    } catch {
      // No clipboard here; the number is on screen to read.
    }
  }

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <p className="text-muted">Message us on WhatsApp</p>
        <h2 className="t-hero mt-3 break-words tabular-nums text-primary-ink" style={fitDisplay(contact.whatsapp, 9, 7, 2.2)}>
          <a href={whatsappLink(boutique)} target="_blank" rel="noopener noreferrer" className="link-stitch">
            {contact.whatsapp}
          </a>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
            Chat on WhatsApp
          </Button>
          <Button href={telLink(contact.phone)} variant="outline-dark" icon={IconPhone}>
            Call {contact.phone}
          </Button>
          {branches[0] && (
            <Button href={branches[0].mapsUrl} variant="outline-dark" icon={IconDirections}>
              Get directions
            </Button>
          )}
          <button
            type="button"
            onClick={copy}
            className="inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full border border-ink/30 px-7 font-semibold transition-[background-color,border-color,scale] duration-200 ease-stitch hover:border-ink hover:bg-ink/5 active:scale-[0.97]"
          >
            {copied ? <IconCheck size={20} stroke={1.75} aria-hidden="true" /> : <IconCopy size={20} stroke={1.75} aria-hidden="true" />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy the number'}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
