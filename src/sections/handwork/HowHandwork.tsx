// src/sections/handwork/HowHandwork.tsx
// How handwork is done: the four stages every piece of hand embroidery
// goes through (the design traced, the fabric framed, the stitching, the
// finish), joined by a thread, then the kinds of work they do.
// (Lab: emb V, "How it is done".)
//
// The stages are true of the craft itself, a real sequence, so they're
// numbered; no times, which differ by work. Needs at least one handwork
// item in their services.
//
// Motion: the thread draws across once. Reduced motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp, IconFrame, IconIroning, IconNeedleThread, IconPencil } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

const HANDWORK = /aari|maggam|zardosi|zardozi|mirror|bead|stone|hand embroidery|kantha|chikan/i

const STAGES = [
  { title: 'Traced', body: 'The design is drawn and traced onto the fabric.', icon: IconPencil },
  { title: 'Framed', body: 'The fabric is stretched tight on a wooden frame.', icon: IconFrame },
  { title: 'Stitched', body: 'Thread, zari, beads or stones are worked in by hand.', icon: IconNeedleThread },
  { title: 'Finished', body: 'Backed, trimmed and pressed before it is stitched up.', icon: IconIroning },
]

export default function HowHandwork() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const works = boutique.services.groups.flatMap((g) => g.items).filter((i) => HANDWORK.test(i))

  useMotion(root, ({ desktop }) => {
    draw('[data-thread]', { trigger: root.current, from: desktop ? 'start' : 'top' })
  })

  if (!works.length) return null

  return (
    <section ref={root} id="handwork-how" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">How handwork is done</h2>
        <div className="relative mt-14">
          <span
            data-thread
            aria-hidden="true"
            className="absolute top-7 bottom-7 left-7 border-l-2 border-dashed border-thread md:right-[12.5%] md:bottom-auto md:left-[12.5%] md:border-t-2 md:border-l-0"
          />
          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            {STAGES.map(({ title, body, icon: Icon }, i) => (
              <li key={title} className="grid grid-cols-[3.5rem_1fr] gap-x-5 md:block md:text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-thread bg-light text-primary-ink md:mx-auto">
                  <Icon size={24} stroke={1.5} aria-hidden="true" />
                </span>
                <div className="md:mt-5">
                  <h3 className="t-3">
                    <span className="text-thread">{i + 1}. </span>
                    {title}
                  </h3>
                  <p className="mt-2 text-muted md:mx-auto md:max-w-[22ch]">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-ink/15 pt-8">
          <p className="max-w-[48ch]">
            <span className="text-muted">The work we do: </span>
            {works.join(' · ')}
          </p>
          <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about handwork.`)} variant="primary" icon={IconBrandWhatsapp}>
            Ask about handwork
          </Button>
        </div>
      </div>
    </section>
  )
}
