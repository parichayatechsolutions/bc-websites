// src/sections/classes/CardsClasses.tsx
// The classes they teach, a card each: name, level, length, when the next
// batch starts and the fee, with a button to ask about joining.
// (Lab: class A, "Course cards".)
//
// From `classes`. A next batch that has already started isn't shown (the
// validator flags it); the fee only with permission to show prices. Hides
// without classes. No motion.

import { IconBrandWhatsapp, IconCalendarEvent, IconClock } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { rupees } from '../../app/text'
import Button from '../../components/Button'

const today = () => new Date().toLocaleDateString('en-CA')
const long = (date: string) => new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

export default function CardsClasses() {
  const { boutique } = useBoutique()
  const classes = boutique.classes ?? []
  if (!classes.length) return null

  return (
    <section id="classes" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">Learn to stitch</h2>
        <ul className={`mt-12 grid gap-4 ${classes.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-xl'}`}>
          {classes.map((c) => (
            <li key={c.name} className="flex flex-col rounded-2xl border border-ink/15 p-7 md:p-8">
              {c.level && <p className="t-small text-primary-ink">{c.level}</p>}
              <h3 className="t-3 mt-2">{c.name}</h3>
              <div className="mt-6 mb-8 space-y-2 text-muted">
                {c.length && (
                  <p className="flex gap-3">
                    <IconClock size={20} stroke={1.5} className="mt-1 shrink-0" aria-hidden="true" />
                    {c.length}
                  </p>
                )}
                {c.nextBatch && c.nextBatch >= today() && (
                  <p className="flex gap-3">
                    <IconCalendarEvent size={20} stroke={1.5} className="mt-1 shrink-0" aria-hidden="true" />
                    Next batch starts {long(c.nextBatch)}
                  </p>
                )}
              </div>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                {boutique.permissions.showPrices && c.fee ? <p className="t-2">{rupees(c.fee)}</p> : <span />}
                <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to join the ${c.name} class.`)} variant="outline-dark" icon={IconBrandWhatsapp}>
                  Ask to join
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
