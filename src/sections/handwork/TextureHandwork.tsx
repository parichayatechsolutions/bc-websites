// src/sections/handwork/TextureHandwork.tsx
// Close enough to see the stitches: their close-up photos as a tight grid
// of squares, one large and the rest small, each with its note.
// (Lab: emb M, "Close-ups".)
//
// From `media.closeups`, up to five. Hides without any.
//
// Motion: each close-up eases in from slightly nearer as the grid comes
// into view. Reduced motion: still.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { settle } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function TextureHandwork() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const closeups = (boutique.media.closeups ?? []).slice(0, 5)
  const captions = boutique.media.captions ?? {}

  useMotion(root, () => {
    settle('[data-closeup]', { trigger: root.current })
  })

  if (!closeups.length) return null

  return (
    <section ref={root} id="handwork-closeups" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[14ch] text-balance">Every stitch, up close</h2>
        <ul className={`mt-12 grid grid-cols-2 gap-3 ${closeups.length > 2 ? 'md:grid-cols-4' : ''}`}>
          {closeups.map((f, i) => (
            <li key={f} className={i === 0 && closeups.length > 2 ? 'col-span-2 row-span-2' : ''}>
              <figure>
                <div className="aspect-square overflow-hidden bg-paper">
                  <div data-closeup className="h-full w-full">
                    <Media file={f} alt={captions[f] ?? 'Close-up of our handwork'} />
                  </div>
                </div>
                {captions[f] && <figcaption className="t-small mt-2 text-muted">{captions[f]}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
