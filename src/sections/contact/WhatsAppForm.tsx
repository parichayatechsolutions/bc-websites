// src/sections/contact/WhatsAppForm.tsx
// A short enquiry form that sends through WhatsApp. The visitor fills in who
// they are and what they need; "Send on WhatsApp" opens a chat with the
// boutique with all of it written out as the message. WhatsApp doesn't let a
// website send on anyone's behalf, so they tap send there, and the form says
// so. Nothing is stored on the site and there's no server to run.

import { useState, type FormEvent } from 'react'
import { IconBrandWhatsapp, IconCircleCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

type IErrors = Partial<Record<'name' | 'phone', string>>

/** 10-digit Indian mobile, with or without +91 / 0 in front. */
function cleanPhone(value: string) {
  let digits = value.replace(/\D/g, '')
  if (digits.length === 12 && digits.startsWith('91')) digits = digits.slice(2)
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1)
  return digits
}

export default function WhatsAppForm() {
  const { boutique } = useBoutique()
  const { services, branches } = boutique
  const [errors, setErrors] = useState<IErrors>({})
  const [sentTo, setSentTo] = useState<string | null>(null)

  // What they can ask for: the headline items first, then everything else, once each.
  const options = [...new Set([...services.featured, ...services.groups.flatMap((g) => g.items)])]
  const today = new Date().toISOString().slice(0, 10)

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const get = (key: string) => String(form.get(key) ?? '').trim()

    const name = get('name')
    const phone = cleanPhone(get('phone'))
    const found: IErrors = {}
    if (!name) found.name = 'Please write your name.'
    if (phone.length !== 10) found.phone = 'Please write a 10-digit mobile number.'
    setErrors(found)
    if (found.name || found.phone) {
      const first = e.currentTarget.elements.namedItem(found.name ? 'name' : 'phone')
      if (first instanceof HTMLElement) first.focus()
      return
    }

    const date = get('date')
    const details = [
      `Name: ${name}`,
      `Phone: +91 ${phone.slice(0, 5)} ${phone.slice(5)}`,
      get('need') && `Looking for: ${get('need')}`,
      date && `Needed by: ${new Date(`${date}T00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`,
      get('branch') && `Branch: ${get('branch')}`,
    ].filter(Boolean)
    const message = get('message')
    const text = [`Hi ${boutique.brand.name}, I'd like to enquire.`, '', ...details, ...(message ? ['', message] : [])].join('\n')

    const url = whatsappLink(boutique, text)
    // Opening from the submit is a direct tap, so browsers allow the new tab.
    // (Not 'noopener' in the features: that makes window.open return null,
    // which would look like a blocked tab.) If a browser does block it, go
    // there in this tab instead.
    const tab = window.open(url, '_blank')
    if (tab) tab.opener = null
    else window.location.href = url
    setSentTo(url)
  }

  return (
    <section className="section pt-0">
      <div className="wrap grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h2 className="t-2 max-w-[18ch]">Tell us what you need</h2>
          <p className="mt-4 max-w-[38ch] text-muted">
            Fill this in and tap send. WhatsApp opens with your details written out, ready to send to us.
          </p>
          <p className="t-small mt-6 max-w-[38ch] text-muted">Your details go straight to WhatsApp. This website doesn't keep them.</p>
        </div>

        <div className="md:col-span-7">
          {sentTo ? (
            <div className="rounded-2xl border border-ink/10 bg-white/60 p-8" role="status">
              <IconCircleCheck size={36} stroke={1.5} className="text-primary-ink" aria-hidden="true" />
              <p className="t-3 mt-4">WhatsApp is open with your message</p>
              <p className="mt-2 text-muted">Tap send in WhatsApp to reach us. If it didn't open, use the button below.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={sentTo} variant="primary" icon={IconBrandWhatsapp}>
                  Open WhatsApp again
                </Button>
                <button type="button" onClick={() => setSentTo(null)} className="link-stitch cursor-pointer px-2">
                  Write another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
              <Field label="Your name" required error={errors.name}>
                {(p) => <input {...p} name="name" autoComplete="name" />}
              </Field>
              <Field label="Mobile number" required error={errors.phone}>
                {(p) => <input {...p} name="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="98765 43210" />}
              </Field>

              {options.length > 0 && (
                <Field label="What do you need?">
                  {(p) => (
                    <select {...p} name="need" defaultValue="">
                      <option value="">Choose one</option>
                      {options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                      <option>Something else</option>
                    </select>
                  )}
                </Field>
              )}
              <Field label="Needed by">
                {(p) => <input {...p} name="date" type="date" min={today} />}
              </Field>

              {branches.length > 1 && (
                <div className="sm:col-span-2">
                  <Field label="Which branch?">
                    {(p) => (
                      <select {...p} name="branch" defaultValue="">
                        <option value="">Any branch</option>
                        {branches.map((b) => (
                          <option key={b.name}>{b.name}</option>
                        ))}
                      </select>
                    )}
                  </Field>
                </div>
              )}

              <div className="sm:col-span-2">
                <Field label="Anything else" hint="Design ideas, measurements, the occasion…">
                  {(p) => <textarea {...p} name="message" rows={4} />}
                </Field>
              </div>

              <div className="sm:col-span-2">
                <Button type="submit" variant="primary" icon={IconBrandWhatsapp}>
                  Send on WhatsApp
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
