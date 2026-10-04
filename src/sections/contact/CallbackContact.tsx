// src/sections/contact/CallbackContact.tsx
// Rather talk? Her name, her number and a good time to call, sent to the
// boutique on WhatsApp as a call-back request, on their brand colour.
// Nothing is stored on the site. (Lab: contact O, "Call me back".)
//
// It sends a request; it doesn't promise a call at that time. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconPhone } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

const TIMES = ['Morning', 'Afternoon', 'Evening', 'Any time']

export default function CallbackContact() {
  const { boutique } = useBoutique()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [time, setTime] = useState(TIMES[3])

  const message = `Hi ${boutique.brand.name}, could you call me back?${name.trim() ? ` I'm ${name.trim()}.` : ''}${phone.trim() ? ` My number is ${phone.trim()}.` : ''} Best time: ${time.toLowerCase()}.`

  return (
    <section id="callback" className="section bg-primary text-on-primary">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Rather talk?</h2>
          <p className="t-lead mt-5 max-w-[30ch] opacity-90">Leave your number and a good time, and ask us to call you back.</p>
          <a href={telLink(boutique.contact.phone)} className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold">
            <IconPhone size={20} stroke={1.75} aria-hidden="true" />
            <span className="link-stitch">Or call {boutique.contact.phone}</span>
          </a>
        </div>
        <div className="space-y-6 rounded-2xl bg-light p-6 text-ink md:col-span-7 md:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name">{(field) => <input {...field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} />}</Field>
            <Field label="Your number" required>
              {(field) => <input {...field} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" maxLength={20} />}
            </Field>
          </div>
          <div role="group" aria-label="Best time to call">
            <p className="font-semibold">Best time to call</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  aria-pressed={t === time}
                  className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Send on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
