// src/sections/wedding/DateWedding.tsx
// Save the date: on the brand colour, she types the two names and the
// date, and a save-the-date card fills in beside them; the button asks
// the boutique to start on the outfits for that date.
// (Lab: wed Z, "Save the date".)
//
// Nothing is stored. Shows only for a boutique that does bridal work. No
// motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Field from '../../components/Field'
import { useWedding } from './weddingShared'

const long = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function DateWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  const [names, setNames] = useState('')
  const [date, setDate] = useState('')
  if (!doesBridal) return null
  const shownNames = names.trim() || 'Your names'
  const shownDate = date ? long(date) : 'The date'

  return (
    <section id="wedding-date" className="section bg-primary text-on-primary">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-5 md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Save the date</h2>
          <div className="space-y-5 rounded-2xl bg-light p-6 text-ink">
            <Field label="Your names" hint="For example, Priya & Arjun">
              {(props) => <input {...props} value={names} maxLength={40} onChange={(e) => setNames(e.target.value)} />}
            </Field>
            <Field label="The date">{(props) => <input {...props} type="date" value={date} onChange={(e) => setDate(e.target.value)} />}</Field>
          </div>
          <a
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, ${names.trim() ? `${names.trim()} are` : "we're"} getting married${date ? ` on ${long(date)}` : ''}. Could we start planning the outfits?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-light px-7 font-semibold text-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
          >
            <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
            Start on the outfits
          </a>
        </div>
        <div className="md:col-span-7" aria-hidden="true">
          <div className="mx-auto max-w-md border-2 border-accent bg-light p-2 text-ink">
            <div className="border border-accent/60 px-6 py-14 text-center">
              <p className="t-small tracking-widest text-muted">Save the date</p>
              <p className="t-1 mt-6 font-display text-balance text-primary-ink italic">{shownNames}</p>
              <span className="zari mx-auto mt-6 block w-24" />
              <p className="t-3 mt-6">{shownDate}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
