// src/sections/instagram/DeckInstagram.tsx
// Their work as a stack of square prints, the top one in full and two
// peeking out behind it; previous and next deal the deck. Nothing deals on
// its own. Beside it, the handle and a button to follow.
// (Lab: ig V, "Photo deck".)
//
// Needs `social.instagram` and work photos; up to eight. Hides otherwise.
// The cards move with a CSS transition that reduced motion turns off.

import { useState } from 'react'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique } from '../../app/BoutiqueContext'
import { FollowButton, Post, useInstagram } from './igShared'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light'
// Where the cards behind sit: turned and nudged, so the deck reads as a deck.
const BEHIND = ['rotate-0', 'rotate-3 translate-x-3', '-rotate-3 -translate-x-3']

export default function DeckInstagram() {
  const { boutique } = useBoutique()
  const ig = useInstagram()
  const photos = boutique.media.work.slice(0, 8)
  const [top, setTop] = useState(0)
  if (!ig || !photos.length) return null
  const step = (by: number) => setTop((top + by + photos.length) % photos.length)

  return (
    <section id="instagram" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">More on Instagram</h2>
          <p className="t-lead mt-5 text-primary-ink">{ig.handle}</p>
          <div className="mt-8">
            <FollowButton href={ig.href} />
          </div>
        </div>
        <div className="md:col-span-7">
          <div className="relative mx-auto aspect-square w-full max-w-sm">
            {photos.map((f, i) => {
              const place = (i - top + photos.length) % photos.length
              if (place > 2) return null
              return (
                <div
                  key={f}
                  aria-hidden={place !== 0}
                  inert={place !== 0}
                  className={`absolute inset-0 border-[6px] border-light bg-light ring-1 ring-ink/10 transition-transform duration-500 ease-stitch ${BEHIND[place]}`}
                  style={{ zIndex: 10 - place }}
                >
                  <Post file={f} href={ig.href} />
                </div>
              )
            })}
          </div>
          {photos.length > 1 && (
            <div className="mt-8 flex justify-center gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
