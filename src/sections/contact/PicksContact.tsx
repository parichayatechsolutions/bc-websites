// src/sections/contact/PicksContact.tsx
// Two taps and no typing: what she's planning (from what they're known
// for) and when, then one button that opens WhatsApp with the message
// already written. The message is shown as it builds, so nothing is sent
// she hasn't read. (Lab: contact C, "Quick picks".)
//
// Choices are toggle buttons (one per row); nothing is required, and the
// button always works. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const WHEN = [
  { label: 'This week', text: 'and I need it this week' },
  { label: 'In 2–4 weeks', text: 'and I need it in 2–4 weeks' },
  { label: 'In 1–3 months', text: 'and I need it in 1–3 months' },
  { label: 'Just exploring', text: 'and I’m just exploring for now' },
]

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-ink/25 px-5 text-left transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
    >
      {on && <IconCheck size={18} stroke={1.75} aria-hidden="true" />}
      {children}
    </button>
  )
}

export default function PicksContact() {
  const { boutique } = useBoutique()
  const items = boutique.services.groups.flatMap((g) => g.items)
  const needs = [
    ...boutique.services.featured.slice(0, 4),
    ...(items.some((i) => /alteration/i.test(i)) ? ['Alterations'] : []),
    'Something else',
  ]
  const [need, setNeed] = useState<string | null>(null)
  const [when, setWhen] = useState<number | null>(null)

  const asking = need && need !== 'Something else' ? `I’m looking for ${need.charAt(0).toLowerCase()}${need.slice(1)}` : 'I have something in mind'
  const message = `Hi ${boutique.brand.name}, ${asking}${when !== null ? ` ${WHEN[when].text}` : ''}. Could you tell me more?`

  return (
    <section id="contact" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="t-1 max-w-[14ch] text-balance">What are you planning?</h2>
          <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="What you’re planning">
            {needs.map((n) => (
              <Chip key={n} on={need === n} onClick={() => setNeed(need === n ? null : n)}>
                {n}
              </Chip>
            ))}
          </div>

          <h3 className="t-3 mt-12">When do you need it?</h3>
          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="When you need it">
            {WHEN.map((w, i) => (
              <Chip key={w.label} on={when === i} onClick={() => setWhen(when === i ? null : i)}>
                {w.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 md:pt-4">
          <p className="t-small text-muted">Your message</p>
          <p aria-live="polite" className="mt-3 rounded-2xl rounded-tl-none bg-paper p-5">
            {message}
          </p>
          <div className="mt-6">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              Send on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
