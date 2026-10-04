// src/sections/handwork/DaysHandwork.tsx
// How long it takes: each kind of handwork they do as a bar as long as its
// usual days; tap one to pick it out and ask about it. (Lab: emb B, "How
// long it takes".)
//
// From the handwork rows of `workTimes` (data sheet 6j), quickest first;
// needs two. The times are the shop's own, said as "usually".
//
// Motion: the bars draw out from the left once. Reduced motion: in place.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { midSentence, usually } from '../../app/text'
import Button from '../../components/Button'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useHandworkTimes } from './handworkTimes'

export default function DaysHandwork() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const works = useHandworkTimes()
  const [picked, setPicked] = useState(0)

  useMotion(root, () => {
    draw('[data-bar]', { trigger: root.current, from: 'start' })
  })

  if (works.length < 2) return null
  const most = works[works.length - 1].days
  const work = works[Math.min(picked, works.length - 1)]

  return (
    <section ref={root} id="handwork-time" className="section">
      <div className="wrap max-w-5xl">
        <h2 className="t-1 max-w-[12ch] text-balance">How long it takes</h2>
        <ul className="mt-12 space-y-1">
          {works.map(({ item, days }, i) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => setPicked(i)}
                aria-pressed={work.item === item}
                className="group grid min-h-14 w-full cursor-pointer grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 py-2 text-left sm:grid-cols-[minmax(0,13rem)_1fr_auto]"
              >
                <span className="t-3 min-w-0 break-words text-muted transition-colors duration-200 ease-stitch group-hover:text-ink group-aria-pressed:text-ink">{item}</span>
                <span className="col-span-2 row-start-2 h-3 bg-ink/10 sm:col-span-1 sm:row-start-auto" aria-hidden="true">
                  <span
                    data-bar
                    className="block h-full bg-ink/30 transition-colors duration-200 ease-stitch group-aria-pressed:bg-primary-ink"
                    style={{ width: `${Math.max(8, (days / most) * 100)}%` }}
                  />
                </span>
                <span className="t-small col-start-2 row-start-1 text-right font-semibold whitespace-nowrap sm:col-start-3">{usually(days)}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="t-small mt-6 max-w-[52ch] text-muted">Usual times. Lighter designs are quicker and heavier ones take longer; we confirm when we see your design.</p>
        <div className="mt-10">
          <Button
            href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${midSentence(work.item)} for my design.`)}
            variant="primary"
            icon={IconBrandWhatsapp}
          >
            Ask about {midSentence(work.item)}
          </Button>
        </div>
      </div>
    </section>
  )
}
