// src/sections/classes/FinderClasses.tsx
// Which class is for me? One question (how much has she stitched before)
// and the classes at that level appear, each with a button to ask.
// (Lab: class L, "Which class?", asked as one question: the config holds
// each class's level, not what it makes or how it's taught.)
//
// Needs classes at two or more levels (beginner, intermediate, advanced);
// hides otherwise. The answer swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

const ANSWERS = [
  { label: 'Never', match: /begin|basic|first|starter|intro/i },
  { label: 'A little', match: /intermediate|improver|medium/i },
  { label: 'Quite a lot', match: /advanc|expert|master|pro/i },
]

export default function FinderClasses() {
  const { boutique } = useBoutique()
  const classes = boutique.classes ?? []
  const answers = ANSWERS.map((a) => ({ ...a, classes: classes.filter((c) => a.match.test(c.level ?? '')) })).filter((a) => a.classes.length)
  const [index, setIndex] = useState(0)
  if (answers.length < 2) return null
  const answer = answers[index] ?? answers[0]

  return (
    <section id="classes" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Which class is for you?</h2>
        <p className="t-3 mt-10">How much have you stitched before?</p>
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="How much have you stitched before?">
          {answers.map((a, i) => (
            <button
              key={a.label}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
            >
              {a.label}
            </button>
          ))}
        </div>
        <ul key={index} className="mt-10 animate-[fade-in_700ms_var(--ease-stitch)] space-y-4" aria-live="polite">
          {answer.classes.map((c) => (
            <li key={c.name} className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-paper p-6 md:p-8">
              <div>
                <p className="t-small text-primary-ink">{c.level}</p>
                <p className="t-2 mt-1">{c.name}</p>
                {c.length && <p className="mt-1 text-muted">{c.length}</p>}
              </div>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to join the ${c.name} class.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink"
              >
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Ask to join</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
