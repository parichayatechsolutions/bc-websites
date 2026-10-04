// src/sections/alterations/ReviewAlterations.tsx
// The drag-to-compare photo beside one of their real reviews about fit:
// the work and a customer's word for it, side by side.
// (Lab: alt W, "Slider + review".)
//
// The review is the first that mentions fit or alteration, quoted as
// written; without one the slider stands alone, since an unrelated review
// beside it would misrepresent what the customer praised. Needs
// before/after pairs; hides without them.
//
// Motion: the divider sweeps across and back once. Reduced motion: still.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { useMotion } from '../../motion/useMotion'
import { AskAboutAlterations, Compare, sweep, useAlterations } from './altShared'

export default function ReviewAlterations() {
  const { boutique } = useBoutique()
  const { pairs, caption } = useAlterations()
  const root = useRef<HTMLElement>(null)
  const reviews = boutique.reviews ?? boutique.testimonials ?? []
  const review = reviews.find((r) => /fit|alter|tight|loose|size/i.test(r.text))

  useMotion(root, () => {
    sweep(root.current)
  })

  if (!pairs.length) return null
  const pair = pairs[0]

  return (
    <section ref={root} id="alterations" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <Compare pair={pair} caption={caption(pair)} className="aspect-[4/5]" />
          <p className="t-small mt-3 text-muted">{caption(pair) ?? 'Drag across the photo to compare.'}</p>
        </div>
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Made to fit again</h2>
          {review && (
            <figure className="mt-8 border-l-2 border-thread pl-6">
              <blockquote className="t-3">“{review.text}”</blockquote>
              <figcaption className="mt-4 text-muted">{review.name}</figcaption>
            </figure>
          )}
          <AskAboutAlterations />
        </div>
      </div>
    </section>
  )
}
