// src/sections/men/StepsMen.tsx
// How men's tailoring works, in four steps on a dashed thread (measured,
// cut, tried on, finished), then the men's pieces they stitch and a
// button to ask. (Lab: men V, "How it works".)
//
// The steps are how made-to-measure tailoring goes anywhere, a real
// sequence, so numbered; no days, which the config holds only overall.
// Needs a Men group in their services.
//
// Motion: the thread draws across once. Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconHanger, IconNeedleThread, IconRulerMeasure, IconScissors } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const STEPS = [
  { title: 'Measured', body: 'Chest, waist, shoulders, sleeves and length, by hand.', icon: IconRulerMeasure },
  { title: 'Cut', body: 'A pattern drafted to his measurements, not a size.', icon: IconScissors },
  { title: 'Tried on', body: 'A fitting to check the fall and adjust.', icon: IconHanger },
  { title: 'Finished', body: 'Stitched up, buttoned and pressed.', icon: IconNeedleThread },
]

export default function StepsMen() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const items = boutique.services.groups.find((g) => /^men/i.test(g.title))?.items ?? []

  useMotion(root, ({ desktop }) => {
    draw('[data-thread]', { trigger: root.current, from: desktop ? 'start' : 'top' })
  })

  if (!items.length) return null

  return (
    <section ref={root} id="men-steps" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Made to his measure</h2>
        <div className="relative mt-12">
          <span
            data-thread
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-thread md:right-[12.5%] md:bottom-auto md:left-[12.5%] md:border-t-2 md:border-l-0"
          />
          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            {STEPS.map(({ title, body, icon: Icon }, i) => (
              <li key={title} className="grid grid-cols-[3.5rem_1fr] gap-x-5 md:block md:text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-thread bg-light text-primary-ink md:mx-auto">
                  <Icon size={24} stroke={1.5} aria-hidden="true" />
                </span>
                <div className="md:mt-5">
                  <h3 className="t-3">
                    <span className="text-thread">{i + 1}. </span>
                    {title}
                  </h3>
                  <p className="mt-2 text-muted md:mx-auto md:max-w-[24ch]">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/15 pt-8">
          <p className="max-w-[48ch] text-muted">{items.join(' · ')}</p>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something stitched for a man.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about men’s tailoring
          </Button>
        </div>
      </div>
    </section>
  )
}
