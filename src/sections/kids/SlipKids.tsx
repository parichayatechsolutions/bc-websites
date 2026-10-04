// src/sections/kids/SlipKids.tsx
// A kids' order slip: the child's name and age, the occasion, and what
// she'd like (from their kids' services), filled in and sent on WhatsApp.
// Nothing is stored on the site. (Lab: kids X, "Kids order slip".)
//
// Needs a Kids group in their services. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

const OCCASIONS = ['Birthday', 'Festival', 'Wedding in the family', 'School function', 'Other']

export default function SlipKids() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.find((g) => /^kid|child/i.test(g.title))?.items ?? []
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [occasion, setOccasion] = useState(OCCASIONS[0])
  const [item, setItem] = useState(items[0] ?? '')
  if (!items.length) return null

  const message = `Hi ${boutique.brand.name}, I'd like ${item ? item.charAt(0).toLowerCase() + item.slice(1) : 'something'} stitched for ${name.trim() || 'my child'}${age.trim() ? `, age ${age.trim()}` : ''}, for a ${occasion.toLowerCase()}.`

  return (
    <section id="kids-order" className="section">
      <div className="wrap">
        <div className="mx-auto max-w-2xl border border-ink/15 bg-paper px-6 pt-8 pb-10 md:px-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-4">
            <h2 className="t-2">Kids’ order</h2>
            <p className="t-small text-muted">{boutique.brand.name}</p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Child’s name">{(field) => <input {...field} value={name} onChange={(e) => setName(e.target.value)} maxLength={40} />}</Field>
            <Field label="Age">{(field) => <input {...field} value={age} onChange={(e) => setAge(e.target.value)} maxLength={10} inputMode="numeric" />}</Field>
            <Field label="Occasion" required>
              {(field) => (
                <select {...field} value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                  {OCCASIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              )}
            </Field>
            <Field label="What you’d like" required>
              {(field) => (
                <select {...field} value={item} onChange={(e) => setItem(e.target.value)}>
                  {items.map((i) => (
                    <option key={i}>{i}</option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Send this order
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
