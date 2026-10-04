// src/sections/handwork/NamesHandwork.tsx
// Names in thread: dark, she types two names and the wedding date, and
// they appear written across the back of a drawn blouse in the accent
// colour, the way they'd be embroidered; the button asks about it.
// (Lab: emb U, "Names in thread".)
//
// A sketch of the idea, not a promise of the lettering. Needs a handwork
// item in their services. Nothing is stored. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'
import { BlouseFlat } from '../blouse/blouseDrawing'

const HANDWORK = /aari|maggam|zardosi|zardozi|embroider|handwork/i

export default function NamesHandwork() {
  const { boutique } = useBoutique()
  const [names, setNames] = useState('')
  const [date, setDate] = useState('')
  const doesHandwork = boutique.services.groups.flatMap((g) => g.items).some((i) => HANDWORK.test(i))
  if (!doesHandwork) return null
  const shown = names.trim() || 'Your names'

  return (
    <section id="handwork-names" className="section bg-dark text-light">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-6 md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Your names, in thread</h2>
          <div className="rounded-2xl bg-light p-6 text-ink">
            <div className="space-y-5">
              <Field label="Names" hint="For example, Priya & Arjun">
                {(props) => <input {...props} value={names} maxLength={32} onChange={(e) => setNames(e.target.value)} />}
              </Field>
              <Field label="Date">{(props) => <input {...props} value={date} maxLength={20} onChange={(e) => setDate(e.target.value)} />}</Field>
            </div>
          </div>
          <Button
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could you embroider "${shown}${date.trim() ? `, ${date.trim()}` : ''}" on the back of my blouse?`)}
            icon={IconBrandWhatsapp}
          >
            Ask about this
          </Button>
        </div>
        <figure className="rounded-2xl bg-light p-6 md:col-span-7 md:p-10">
          <div className="aspect-[5/4]">
            <BlouseFlat neck="u" sleeve="elbow" back>
              <text x={100} y={118} textAnchor="middle" fontSize={shown.length > 18 ? 8 : 10} fontStyle="italic" style={{ fill: 'var(--c-accent)', fontFamily: 'var(--font-display)' }}>
                {shown}
              </text>
              {date.trim() && (
                <text x={100} y={130} textAnchor="middle" fontSize={6} letterSpacing={1} style={{ fill: 'var(--c-accent)' }}>
                  {date.trim()}
                </text>
              )}
            </BlouseFlat>
          </div>
          <figcaption className="t-small mt-4 text-center text-muted">A sketch of the idea on the back of the blouse</figcaption>
        </figure>
      </div>
    </section>
  )
}
