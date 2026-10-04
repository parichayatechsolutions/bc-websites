// src/sections/handwork/ChooseHandwork.tsx
// Which handwork suits her? Two questions (the occasion and how much time
// there is) suggest one of the works they actually do, with why, and a
// button to ask about it. (Lab: emb C, "Which work for you?".)
//
// Suggestions only from their own handwork services, using general craft
// knowledge; needs two or more kinds of work. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const OCCASIONS = ['Everyday', 'Festival or party', 'Wedding']
const TIMES = ['Under a week', 'One to three weeks', 'More than three weeks']

// What suits each answer, best first, with why.
const SUITS: { match: RegExp; why: string; occasions: number[]; minTime: number }[] = [
  { match: /maggam/i, why: 'Raised work with stones and zari: the bridal favourite, and it takes time.', occasions: [2], minTime: 1 },
  { match: /zardosi|zardozi/i, why: 'Rich metallic thread for the biggest days.', occasions: [2], minTime: 2 },
  { match: /aari/i, why: 'Fine and detailed, festive without being heavy.', occasions: [1, 2], minTime: 1 },
  { match: /mirror|bead|stone/i, why: 'Sparkle that catches the light, quick to add.', occasions: [1], minTime: 0 },
  { match: /hand embroider/i, why: 'Soft thread work by hand, easy to wear often.', occasions: [0, 1], minTime: 0 },
  { match: /machine embroider/i, why: 'Even patterns, quick and light on the budget.', occasions: [0, 1], minTime: 0 },
]

function Pick({ label, options, value, onChange }: { label: string; options: string[]; value: number; onChange: (i: number) => void }) {
  return (
    <div role="group" aria-label={label}>
      <p className="t-3">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(i)}
            aria-pressed={i === value}
            className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-pressed:border-primary-ink aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function ChooseHandwork() {
  const { boutique } = useBoutique()
  const [occasion, setOccasion] = useState(2)
  const [time, setTime] = useState(1)
  const items = boutique.services.groups.flatMap((g) => g.items)
  const offered = SUITS.map((s) => ({ ...s, item: items.find((i) => s.match.test(i)) })).filter((s): s is (typeof SUITS)[number] & { item: string } => Boolean(s.item))
  if (offered.length < 2) return null

  const fits = offered.filter((s) => s.occasions.includes(occasion) && s.minTime <= time)
  const best = fits[0] ?? offered.find((s) => s.minTime <= time) ?? offered[0]

  return (
    <section id="which-handwork" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="space-y-8 md:col-span-6">
          <h2 className="t-1 max-w-[12ch] text-balance">Which work suits you?</h2>
          <Pick label="What’s the occasion?" options={OCCASIONS} value={occasion} onChange={setOccasion} />
          <Pick label="How much time is there?" options={TIMES} value={time} onChange={setTime} />
        </div>
        <div className="md:col-span-6 md:self-end">
          <div className="bg-primary p-7 text-on-primary md:p-10" aria-live="polite">
            <p className="t-small opacity-80">We’d suggest</p>
            <p className="t-1 mt-2">{best.item}</p>
            <p className="t-lead mt-4 opacity-90">{best.why}</p>
            <div className="mt-8">
              <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${best.item.toLowerCase()} for a ${OCCASIONS[occasion].toLowerCase()} piece.`)} icon={IconBrandWhatsapp}>
                Ask about {best.item.toLowerCase()}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
