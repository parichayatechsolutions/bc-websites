// src/sections/handwork/BorderHandwork.tsx
// Each kind of handwork they do as a long saree border: its stitch drawn
// as a texture between two gold rules, the name on the left and how long
// it usually takes on the right; each border asks about that work.
// (Lab: emb S, "Border strips", square-cornered and without a shadow.)
//
// From the handwork rows of `workTimes` (data sheet 6j), quickest first;
// needs two. The texture is the drawn idea of the stitch, not their work.
//
// Motion: the borders uncover from the left, one after another. Reduced
// motion: in place.

import { useRef } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { midSentence, usually } from '../../app/text'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { useHandworkTimes } from './handworkTimes'
import { STITCHES, Texture } from './stitchTextures'

export default function BorderHandwork() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const works = useHandworkTimes()

  useMotion(root, () => {
    wipe('[data-border]', { trigger: root.current, from: 'left' })
  })

  if (works.length < 2) return null

  return (
    <section ref={root} id="handwork-borders" className="section bg-paper">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Every border, and how long it takes</h2>
        <ul className="mt-12 space-y-3">
          {works.map(({ item, days }) => (
            <li key={item}>
              <a
                data-border
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${midSentence(item)}.`)}
                target="_blank"
                rel="noopener"
                className="group relative flex min-h-16 items-center justify-between gap-3 overflow-hidden px-3 py-3 outline-offset-4 md:min-h-20 md:px-4"
              >
                <span className="absolute inset-0 transition-[scale] duration-500 ease-stitch group-hover:scale-105" aria-hidden="true">
                  <Texture kind={STITCHES.find((s) => s.match.test(item))?.id ?? 'kantha'} size={22} />
                </span>
                <span className="absolute inset-x-0 top-2 h-0.5 bg-accent" aria-hidden="true" />
                <span className="absolute inset-x-0 bottom-2 h-0.5 bg-accent" aria-hidden="true" />
                <span className="relative inline-flex min-w-0 items-center gap-2 bg-light px-3 py-1.5 font-semibold">
                  <IconBrandWhatsapp size={18} stroke={1.75} className="shrink-0 text-primary-ink" aria-hidden="true" />
                  <span className="min-w-0 break-words">{item}</span>
                </span>
                <span className="t-small relative shrink-0 bg-light px-3 py-1.5 font-semibold whitespace-nowrap">{usually(days)}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="t-small mt-6 text-muted">Usual times. We confirm when we see your design.</p>
      </div>
    </section>
  )
}
