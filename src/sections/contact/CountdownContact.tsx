// src/sections/contact/CountdownContact.tsx
// When's the wedding? She picks the date, a gold-edged seal shows how many
// weeks are left, and the button sends the date with her enquiry.
// (Lab: contact W, "Wedding countdown", without advice on what to do by
// when, which would be a schedule the boutique never set.)
//
// Shows only for a boutique that does bridal work. Nothing is stored. No
// motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'
import { useBridal } from '../bridal/bridalShared'

const DAY = 24 * 60 * 60 * 1000
const long = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function CountdownContact() {
  const { boutique } = useBoutique()
  const { doesBridal } = useBridal()
  const [date, setDate] = useState('')
  if (!doesBridal) return null

  const today = new Date(new Date().toLocaleDateString('en-CA') + 'T00:00:00')
  const days = date ? Math.round((new Date(`${date}T00:00:00`).getTime() - today.getTime()) / DAY) : undefined
  const weeks = days !== undefined && days >= 0 ? Math.floor(days / 7) : undefined
  const message = date
    ? `Hi ${boutique.brand.name}, my wedding is on ${long(date)}. I'd like to talk about my bridal outfits.`
    : `Hi ${boutique.brand.name}, I'd like to talk about my bridal outfits.`

  return (
    <section id="wedding" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">When’s the wedding?</h2>
          <div className="mt-8 max-w-xs">
            <Field label="Wedding date" required>
              {(props) => <input {...props} type="date" value={date} onChange={(e) => setDate(e.target.value)} />}
            </Field>
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Talk to us about it
            </Button>
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="mx-auto grid aspect-square w-full max-w-72 place-items-center rounded-full border-2 border-accent p-2" aria-live="polite">
            <div className="grid h-full w-full place-content-center rounded-full border border-dashed border-accent/70 bg-paper p-6 text-center">
              {weeks !== undefined ? (
                <>
                  <span className="font-display text-7xl leading-none tabular-nums text-primary-ink">{weeks}</span>
                  <span className="t-3 mt-2">{weeks === 1 ? 'week to go' : 'weeks to go'}</span>
                  {days !== undefined && days % 7 > 0 && <span className="t-small mt-1 text-muted">and {days % 7} {days % 7 === 1 ? 'day' : 'days'}</span>}
                </>
              ) : (
                <span className="t-3 text-muted">{date ? 'That date has passed' : 'Pick the date'}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
