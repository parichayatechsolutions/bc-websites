// src/sections/classes/EnrolClasses.tsx
// Enrol in three fields: her name, which class, and her age group, written
// into one WhatsApp message to send. Nothing is stored on the site.
// (Lab: class J, "Enrol".)
//
// From `classes`; hides without them. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

const AGES = ['Under 18', '18 to 30', '31 to 50', 'Over 50']

export default function EnrolClasses() {
  const { boutique } = useBoutique()
  const classes = boutique.classes ?? []
  const [name, setName] = useState('')
  const [course, setCourse] = useState(classes[0]?.name ?? '')
  const [age, setAge] = useState('')
  if (!classes.length) return null

  const message = `Hi ${boutique.brand.name}, I'd like to enrol in ${course || 'a class'}.${name ? ` My name is ${name.trim()}.` : ''}${age ? ` Age group: ${age}.` : ''}`

  return (
    <section id="enrol" className="section bg-paper">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Join a class</h2>
          <p className="mt-5 max-w-[34ch] text-muted">Fill this in and send it on WhatsApp.</p>
        </div>
        <div className="space-y-6 md:col-span-7">
          <Field label="Your name">{(field) => <input {...field} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={60} />}</Field>
          <Field label="Class" required>
            {(field) => (
              <select {...field} value={course} onChange={(e) => setCourse(e.target.value)}>
                {classes.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}
          </Field>
          <Field label="Age group">
            {(field) => (
              <select {...field} value={age} onChange={(e) => setAge(e.target.value)}>
                <option value="">Prefer not to say</option>
                {AGES.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
            )}
          </Field>
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Send on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  )
}
