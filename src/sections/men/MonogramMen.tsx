// src/sections/men/MonogramMen.tsx
// A monogram: he types up to three initials and they appear stitched on a
// drawn shirt cuff; the button asks whether they can add it.
// (Lab: men I, "Monogram".)
//
// It asks rather than promises. Shows only when their Men group lists
// shirts. Nothing is stored. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

export default function MonogramMen() {
  const { boutique } = useBoutique()
  const stitchesShirts = (boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []).some((i) => /shirt/i.test(i))
  const [initials, setInitials] = useState('')
  if (!stitchesShirts) return null
  const shown = initials.toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3) || 'ABC'

  return (
    <section id="men-monogram" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-6 md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">His initials, on the cuff</h2>
          <Field label="Initials" hint="Up to three letters">
            {(props) => <input {...props} value={initials} maxLength={3} onChange={(e) => setInitials(e.target.value)} autoCapitalize="characters" />}
          </Field>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could you add the monogram "${shown}" to the cuff of a shirt?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about a monogram
          </Button>
        </div>
        <figure className="bg-paper p-6 md:col-span-7 md:p-10">
          <svg viewBox="0 0 300 160" aria-hidden="true" className="block w-full">
            <path d="M 10 30 L 230 30 Q 250 30 250 50 L 250 130 Q 250 150 230 150 L 10 150 Z" strokeWidth={2} style={{ fill: 'var(--c-light)', stroke: 'var(--c-primary-ink)' }} />
            <path d="M 10 30 L 10 150" strokeWidth={2} strokeDasharray="4 4" style={{ stroke: 'var(--c-primary-ink)' }} />
            <circle cx={225} cy={70} r={7} strokeWidth={1.5} style={{ fill: 'var(--c-paper)', stroke: 'var(--c-primary-ink)' }} />
            <circle cx={225} cy={110} r={7} strokeWidth={1.5} style={{ fill: 'var(--c-paper)', stroke: 'var(--c-primary-ink)' }} />
            <text x={110} y={102} textAnchor="middle" fontSize={34} letterSpacing={4} fontStyle="italic" style={{ fill: 'var(--c-accent)', fontFamily: 'var(--font-display)' }}>
              {shown}
            </text>
          </svg>
          <figcaption className="t-small mt-4 text-center text-muted">A sketch of the idea on the cuff</figcaption>
        </figure>
      </div>
    </section>
  )
}
