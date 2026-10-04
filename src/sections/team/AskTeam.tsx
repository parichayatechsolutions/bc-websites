// src/sections/team/AskTeam.tsx
// Who to ask: pick what she needs (a design, handwork, the fit, an
// alteration, her order) and the person whose role covers it appears, with
// a button that asks for them on WhatsApp. (Lab: team Q, "Who to ask".)
//
// From `team`, matched by the words in each role; only needs someone covers
// appear, and it needs two. The person's photo only with their yes. The
// card swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

const NEEDS = [
  { label: 'A design', match: /design|stylist|creative/i, about: 'a design' },
  { label: 'Handwork', match: /embroider|aari|maggam|zardo|handwork|karigar/i, about: 'handwork' },
  { label: 'The fit', match: /cut|master|tailor|pattern/i, about: 'the fit' },
  { label: 'An alteration', match: /alter/i, about: 'an alteration' },
  { label: 'My order', match: /manager|front|desk|coordinat|owner|founder/i, about: 'my order' },
]

export default function AskTeam() {
  const { boutique } = useBoutique()
  const team = boutique.team ?? []
  const needs = NEEDS.map((n) => ({ ...n, person: team.find((p) => n.match.test(p.role)) })).filter((n) => n.person)
  const [index, setIndex] = useState(0)
  if (needs.length < 2) return null
  const need = needs[index] ?? needs[0]
  const person = need.person!
  const first = person.name.split(' ')[0]

  return (
    <section id="team" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Who to ask</h2>
        <p className="t-3 mt-10">What do you need help with?</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="What do you need help with?">
          {needs.map((n, i) => (
            <button
              key={n.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {n.label}
            </button>
          ))}
        </div>
        <div key={index} className="mt-8 flex animate-[fade-in_700ms_var(--ease-stitch)] flex-wrap items-center gap-6 rounded-2xl bg-paper p-6 md:p-8" aria-live="polite">
          {person.photo ? (
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-light">
              <Media file={person.photo} alt={person.name} />
            </div>
          ) : (
            <span aria-hidden="true" className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-light font-display text-4xl text-primary-ink">
              {first.charAt(0)}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="t-2">{person.name}</p>
            <p className="text-muted">
              {person.role}
              {person.years ? ` · ${person.years} years` : ''}
            </p>
          </div>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, could I speak to ${first} about ${need.about}?`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask for {first}
          </Button>
        </div>
      </div>
    </section>
  )
}
