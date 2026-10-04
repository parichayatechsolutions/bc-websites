// src/sections/contact/PreviewContact.tsx
// A short form on one side and, on the other, the WhatsApp message building
// itself in a phone-style chat as she types, so she sees exactly what will
// be sent before she sends it. (Lab: contact B, "Live preview".)
//
// Nothing is stored on the site; the button opens WhatsApp with the
// message. Uses the shared Field. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'
import Logo from '../../components/Logo'

export default function PreviewContact() {
  const { boutique } = useBoutique()
  const [name, setName] = useState('')
  const [need, setNeed] = useState('')
  const [when, setWhen] = useState('')

  const message = [
    `Hi ${boutique.brand.name},`,
    name.trim() && `I'm ${name.trim()}.`,
    need.trim() ? `I'd like ${need.trim()}.` : `I'd like to ask about an order.`,
    when.trim() && `I need it by ${when.trim()}.`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <section id="contact" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-5 md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Tell us what you need</h2>
          <Field label="Your name">{(field) => <input {...field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} />}</Field>
          <Field label="What you’d like" hint="A bridal blouse, a lehenga, an alteration…">
            {(field) => <input {...field} value={need} onChange={(e) => setNeed(e.target.value)} maxLength={120} />}
          </Field>
          <Field label="When you need it" hint="A date or an occasion">
            {(field) => <input {...field} value={when} onChange={(e) => setWhen(e.target.value)} maxLength={60} />}
          </Field>
        </div>
        <div className="md:col-span-6">
          <div className="mx-auto max-w-sm rounded-2xl border border-ink/15 bg-paper p-4">
            <div className="flex items-center gap-3 border-b border-ink/10 pb-3">
              <Logo className="h-9 w-9 shrink-0 rounded-full" />
              <p className="min-w-0 truncate font-semibold">{boutique.brand.name}</p>
            </div>
            <p className="t-small mt-4 text-center text-muted">Your message</p>
            <p aria-live="polite" className="mt-3 ml-auto max-w-[90%] rounded-2xl rounded-tr-none bg-primary-ink p-4 text-on-primary-ink">
              {message}
            </p>
            <div className="mt-6 flex justify-center">
              <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
                Send on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
