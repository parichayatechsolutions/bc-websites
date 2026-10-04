// src/sections/men/FormMen.tsx
// His measurements: six fields for a shirt or kurta (chest, waist,
// shoulder, sleeve, length, neck), each with a line on how to take it,
// sent together on WhatsApp. Nothing is stored on the site.
// (Lab: men M, "His measurements".)
//
// Measuring guidance is general. Needs a Men group in their services.
// No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

const MEASURES = [
  { id: 'chest', name: 'Chest', how: 'Round the fullest part, under the arms.' },
  { id: 'waist', name: 'Waist', how: 'Round the natural waist, over a shirt.' },
  { id: 'shoulder', name: 'Shoulder', how: 'Across the back, from one shoulder tip to the other.' },
  { id: 'sleeve', name: 'Sleeve', how: 'From the shoulder tip to the wrist bone.' },
  { id: 'length', name: 'Length', how: 'From the base of the collar to where it should end.' },
  { id: 'neck', name: 'Neck', how: 'Round the base of the neck, one finger under the tape.' },
]

export default function FormMen() {
  const { boutique } = useBoutique()
  const [values, setValues] = useState<Record<string, string>>({})
  if (!boutique.services.groups.some((g) => /^men/i.test(g.title))) return null

  const lines = MEASURES.map((m) => `${m.name}: ${values[m.id]?.trim() ?? ''}`).join('\n')
  const message = `Hi ${boutique.brand.name}, here are his measurements (in inches):\n${lines}`

  return (
    <section id="men-measure" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="t-1 max-w-[10ch] text-balance">His measurements</h2>
          <p className="mt-5 max-w-[30ch] text-muted">In inches. Fill in what you have; leave the rest blank.</p>
        </div>
        <div className="md:col-span-8">
          <div className="grid gap-5 sm:grid-cols-2">
            {MEASURES.map((m) => (
              <Field key={m.id} label={m.name} hint={m.how} required>
                {(field) => <input {...field} type="number" inputMode="decimal" step="0.5" min="0" value={values[m.id] ?? ''} onChange={(e) => setValues({ ...values, [m.id]: e.target.value })} />}
              </Field>
            ))}
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Send his measurements
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
