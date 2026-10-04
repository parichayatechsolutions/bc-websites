// src/sections/blouse/SlipBlouse.tsx
// A tailor's order slip: ruled lines on cream, a row each for the neck, the
// back and the sleeves with a box to tick for each option, and a button
// that sends the filled slip on WhatsApp. Familiar to anyone who has
// ordered a blouse. (Lab: blouse F, "Order slip".)
//
// The boxes are real radio buttons in labelled groups. Shows only for a
// boutique that stitches blouses. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import Button from '../../components/Button'
import { useBoutique } from '../../app/BoutiqueContext'
import { BACKS, NECKS, SLEEVES, type IOption } from './blouseDrawing'
import { useBlouse } from './blouseShared'

function Row({ name, label, options, value, onChange }: { name: string; label: string; options: IOption[]; value: string; onChange: (id: string) => void }) {
  return (
    <fieldset className="border-b border-ink/20 py-5">
      <legend className="float-left mb-3 w-full font-semibold sm:mb-0 sm:w-28">{label}</legend>
      <div className="flex flex-wrap gap-x-6 gap-y-3 sm:ml-28">
        {options.map((o) => (
          <label key={o.id} className="flex min-h-11 cursor-pointer items-center gap-2.5">
            <input type="radio" name={name} value={o.id} checked={o.id === value} onChange={() => onChange(o.id)} className="h-5 w-5 cursor-pointer accent-[var(--c-primary-ink)]" />
            {o.name}
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default function SlipBlouse() {
  const { boutique } = useBoutique()
  const { stitchesBlouses, send } = useBlouse()
  const [neck, setNeck] = useState('round')
  const [back, setBack] = useState('u')
  const [sleeve, setSleeve] = useState('elbow')
  if (!stitchesBlouses) return null

  return (
    <section id="blouse" className="section">
      <div className="wrap">
        <div className="mx-auto max-w-3xl border border-ink/15 bg-paper px-6 pt-8 pb-10 md:px-12">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 border-ink pb-4">
            <h2 className="t-2">Blouse order</h2>
            <p className="t-small text-muted">{boutique.brand.name}</p>
          </div>
          <Row name="neck" label="Neck" options={NECKS} value={neck} onChange={setNeck} />
          <Row name="back" label="Back" options={BACKS} value={back} onChange={setBack} />
          <Row name="sleeves" label="Sleeves" options={SLEEVES} value={sleeve} onChange={setSleeve} />
          <div className="mt-8">
            <Button href={send(neck, back, sleeve)} variant="primary" icon={IconBrandWhatsapp}>
              Send this slip
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
