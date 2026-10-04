// src/sections/measure/ProfileMeasure.tsx
// A fit profile card: her name, then all ten measurements in a grid of
// small fields, a count of how many are filled with a thin line that
// grows, and a button to send the profile. (Lab: measure Y, "Fit
// profile".)
//
// Nothing is saved on the site; the button sends what's filled. Shows only
// for a boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'
import { useBlouse } from '../blouse/blouseShared'
import { MEASURES } from './measureShared'

export default function ProfileMeasure() {
  const { boutique } = useBoutique()
  const { stitchesBlouses } = useBlouse()
  const [name, setName] = useState('')
  const [values, setValues] = useState<Record<string, string>>({})
  if (!stitchesBlouses) return null

  const filled = MEASURES.filter((m) => values[m.id]?.trim()).length
  const lines = MEASURES.map((m) => `${m.name}: ${values[m.id]?.trim() || ''}`).join('\n')
  const message = `Hi ${boutique.brand.name}, here is my fit profile${name.trim() ? ` (${name.trim()})` : ''}, in inches:\n${lines}`

  return (
    <section id="measure" className="section">
      <div className="wrap max-w-3xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Your fit profile</h2>
        <div className="mt-10 rounded-2xl border border-ink/15 p-6 md:p-10">
          <Field label="Name">{(props) => <input {...props} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />}</Field>
          <div className="mt-8 flex items-baseline justify-between gap-4">
            <p className="font-semibold">Measurements, in inches</p>
            <p className="t-small tabular-nums text-muted" aria-live="polite">
              {filled} of {MEASURES.length} filled
            </p>
          </div>
          <div className="mt-2 h-0.5 bg-ink/10" aria-hidden="true">
            <div className="h-full bg-primary-ink transition-[width] duration-300 ease-stitch" style={{ width: `${(filled / MEASURES.length) * 100}%` }} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
            {MEASURES.map((m) => (
              // `required` only drops Field's "(optional)"; every field may be left blank.
              <Field key={m.id} label={m.name} required>
                {(props) => (
                  <input
                    {...props}
                    inputMode="decimal"
                    value={values[m.id] ?? ''}
                    onChange={(e) => setValues({ ...values, [m.id]: e.target.value })}
                    className={`${props.className} tabular-nums`}
                  />
                )}
              </Field>
            ))}
          </div>
          <div className="mt-10">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Send my profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
