// src/sections/contact/ReviewWhatsApp.tsx
// A floating WhatsApp button with one short, real review above it, the
// customer's words and first name, so the reason to message sits beside
// the way to. The review can be closed; the button stays.
// (Lab: wa W, "Review + chat".)
//
// The shortest of their reviews, if one is under 110 characters; without
// one, just the button. Place it once in a design, beside SiteShell, not
// with another sticky WhatsApp control.
//
// Motion: rises in once past the hero (stickyShared). Reduced motion:
// always there.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useReviews } from '../reviews/reviewShared'
import { useShowAfterFirstScreen } from './stickyShared'

const SHORT = 110

export default function ReviewWhatsApp() {
  const { boutique } = useBoutique()
  const { reviews } = useReviews()
  const root = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(true)
  useShowAfterFirstScreen(root)
  const review = [...reviews].filter((r) => r.text.length <= SHORT).sort((a, b) => a.text.length - b.text.length)[0]

  return (
    <div ref={root} className="pointer-events-none fixed right-0 bottom-0 z-40 flex flex-col items-end gap-3 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:p-6">
      {review && open && (
        <figure className="pointer-events-auto relative w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-ink/15 bg-light p-4 pr-11 text-ink">
          <blockquote className="t-small">“{review.text}”</blockquote>
          <figcaption className="t-small mt-2 text-muted">{review.name.split(' ')[0]}</figcaption>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close review"
            className="absolute top-1 right-1 grid h-10 w-10 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 ease-stitch hover:bg-ink/5 hover:text-ink"
          >
            <IconX size={18} stroke={1.75} aria-hidden="true" />
          </button>
        </figure>
      )}
      <a
        href={whatsappLink(boutique)}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex min-h-14 items-center gap-2 rounded-full bg-primary-ink px-6 font-semibold text-on-primary-ink transition-[translate] duration-300 ease-stitch hover:-translate-y-1 active:translate-y-0"
      >
        <IconBrandWhatsapp size={22} stroke={1.75} aria-hidden="true" />
        Chat on WhatsApp
      </a>
    </div>
  )
}
