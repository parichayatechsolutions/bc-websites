// src/sections/kids/InviteKids.tsx
// A birthday invitation: a card on a scatter of confetti, inviting her to
// plan the birthday outfit, with a photo of their children's work when
// there is one and an "RSVP" that asks on WhatsApp.
// (Lab: kids D, "Birthday invitation".)
//
// The confetti is fixed, not falling. Needs a Kids group; the photo from
// work-kids-<nn>.jpg. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategory } from '../../app/photos'
import Media from '../../components/Media'

// Confetti: [left %, top %, turn, colour role].
const CONFETTI: [number, number, number, string][] = [
  [6, 10, 20, 'var(--c-accent)'], [18, 78, -30, 'var(--c-primary)'], [30, 6, 45, 'var(--c-thread)'], [88, 14, -15, 'var(--c-primary)'],
  [94, 70, 30, 'var(--c-accent)'], [72, 90, 60, 'var(--c-thread)'], [4, 50, -50, 'var(--c-thread)'], [60, 4, 10, 'var(--c-accent)'],
  [45, 94, -20, 'var(--c-accent)'], [82, 44, 75, 'var(--c-thread)'], [12, 30, 5, 'var(--c-primary)'], [96, 34, -60, 'var(--c-primary)'],
]

export default function InviteKids() {
  const { boutique } = useBoutique()
  const hasKids = boutique.services.groups.some((g) => /^kid|child/i.test(g.title))
  const photo = boutique.media.work.find((f) => photoCategory(f) === 'Kids')
  if (!hasKids) return null

  return (
    <section id="kids-birthday" className="section">
      <div className="wrap">
        <div className="relative overflow-hidden rounded-2xl bg-paper px-5 py-14 md:py-20">
          {CONFETTI.map(([x, y, turn, colour], i) => (
            <span
              key={i}
              aria-hidden="true"
              className="absolute h-2.5 w-5 rounded-sm"
              style={{ left: `${x}%`, top: `${y}%`, transform: `rotate(${turn}deg)`, backgroundColor: colour }}
            />
          ))}
          <div className="relative mx-auto max-w-md border-2 border-accent bg-light p-2">
            <div className="border border-accent/60 px-6 py-8 text-center md:px-10">
              <h2 className="t-2 text-balance text-primary-ink">You’re invited to plan the birthday outfit</h2>
              {photo && (
                <div className="mx-auto mt-6 aspect-square w-40 overflow-hidden rounded-full bg-paper">
                  <Media file={photo} alt="Children’s wear we stitched" />
                </div>
              )}
              <p className="mt-6">Tell us the date and what they love, and talk through a design with us.</p>
              <p className="t-small mt-2 text-muted">{boutique.brand.name}</p>
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like a birthday outfit stitched for my child. The birthday is on `)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-primary-ink px-7 font-semibold text-on-primary-ink transition-[scale] duration-200 ease-stitch active:scale-[0.97]"
              >
                <IconBrandWhatsapp size={20} stroke={1.75} aria-hidden="true" />
                RSVP on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
