// src/sections/saree/PleatSaree.tsx
// Pre-pleating, explained: a draped saree in an arch beside the three steps
// (pleats set, pallu folded, pressed and pinned), so a customer knows what
// she'll get back. (Lab: saree C, "Pre-pleating".)
//
// Shows only when their services include pre-pleating or draping. The photo
// is a drape photo, or their first saree piece. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'

const STEPS = [
  { title: 'The pleats are set', text: 'Measured to your height and folded evenly, so they fall straight.' },
  { title: 'The pallu is folded', text: 'Pleated or left open, the way you like to wear it.' },
  { title: 'Pressed and pinned', text: 'Ready to wrap and tuck in a few minutes on the day.' },
]

export default function PleatSaree() {
  const { boutique } = useBoutique()
  const offers = boutique.services.groups.flatMap((g) => g.items).some((i) => /pleat|drap/i.test(i))
  if (!offers) return null
  const photo = boutique.media.drapes?.[0] ?? boutique.media.work.find((f) => photoCategory(f) === 'Sarees')

  return (
    <section id="pre-pleating" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {photo && (
          <div className="arch aspect-[3/4] max-w-md bg-paper md:col-span-5">
            <Media file={photo} alt="A pre-pleated saree" />
          </div>
        )}
        <div className={photo ? 'md:col-span-7' : 'md:col-span-8'}>
          <h2 className="t-1 max-w-[12ch] text-balance">Pre-pleating</h2>
          <ol className="mt-10 space-y-6">
            {STEPS.map(({ title, text }, i) => (
              <li key={title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/15 pt-5">
                <span className="t-2 text-thread" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="t-3">{title}</h3>
                  <p className="mt-1 text-muted">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like my saree pre-pleated.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about pre-pleating
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
