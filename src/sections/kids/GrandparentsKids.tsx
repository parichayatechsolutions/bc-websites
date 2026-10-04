// src/sections/kids/GrandparentsKids.tsx
// From grandparents: a letter-style order for a grandchild's outfit, with
// "From" and "For" written in and the occasion, sent on WhatsApp as a
// gift order. (Lab: kids O, "From grandparents".)
//
// Needs a Kids group in their services. Nothing is stored. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Field from '../../components/Field'

export default function GrandparentsKids() {
  const { boutique } = useBoutique()
  const hasKids = boutique.services.groups.some((g) => /^kid|child/i.test(g.title))
  const [from, setFrom] = useState('')
  const [child, setChild] = useState('')
  const [occasion, setOccasion] = useState('')
  if (!hasKids) return null

  const message = `Hi ${boutique.brand.name}, I'd like to gift an outfit${child.trim() ? ` for ${child.trim()}` : ' for my grandchild'}${occasion.trim() ? `, for ${occasion.trim()}` : ''}.${from.trim() ? ` It's from ${from.trim()}.` : ''} Could you help?`

  return (
    <section id="kids-gift" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-5 md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">From grandparents, with love</h2>
          <Field label="From">{(props) => <input {...props} value={from} onChange={(e) => setFrom(e.target.value)} />}</Field>
          <Field label="For">{(props) => <input {...props} value={child} onChange={(e) => setChild(e.target.value)} />}</Field>
          <Field label="The occasion">{(props) => <input {...props} value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="Her first birthday" />}</Field>
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Send the order
          </Button>
        </div>
        <div className="md:col-span-7" aria-hidden="true">
          <div className="mx-auto max-w-md rotate-1 bg-paper p-8 ring-1 ring-ink/10 md:p-10">
            <p className="t-small text-muted">{boutique.brand.name}</p>
            <p className="t-2 mt-6 font-display italic">Dear {boutique.brand.name},</p>
            <p className="mt-4 font-display text-lg leading-relaxed italic">
              Please stitch something lovely for <span className="text-primary-ink">{child.trim() || 'our grandchild'}</span>
              {occasion.trim() && (
                <>
                  , for <span className="text-primary-ink">{occasion.trim()}</span>
                </>
              )}
              .
            </p>
            <p className="mt-8 font-display text-lg italic">
              With love,
              <br />
              <span className="text-primary-ink">{from.trim() || '…'}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
