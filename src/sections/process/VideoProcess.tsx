// src/sections/process/VideoProcess.tsx
// Watch it being made: a clip of hands at work in their workroom, which
// plays only when she taps it, beside the making steps in a numbered list.
// (Lab: process S, "Video + steps".)
//
// Needs `media.workroomVideo` (workroom.mp4); hides without it. The steps
// are the built-in copy from steps.ts, numbered because they're a real
// sequence. The clip has the browser's controls and never loops.

import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { STEPS } from './steps'

export default function VideoProcess() {
  const { boutique } = useBoutique()
  const clip = boutique.media.workroomVideo
  if (!clip) return null
  const note = boutique.media.captions?.[clip]

  return (
    <section id="process" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <figure className="md:col-span-7">
          <div className="aspect-video overflow-hidden rounded-2xl bg-paper">
            <Media file={clip} poster={boutique.media.teamAtWork} alt={note ?? `Work in progress at ${boutique.brand.name}`} controls />
          </div>
          {note && <figcaption className="t-small mt-3 text-muted">{note}</figcaption>}
        </figure>
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">Watch it being made</h2>
          <ol className="mt-8 border-t border-ink/15">
            {STEPS.map(({ title, short }, i) => (
              <li key={title} className="grid grid-cols-[2rem_1fr] gap-x-3 border-b border-ink/15 py-4">
                <span className="t-3 text-thread">{i + 1}</span>
                <span>
                  <span className="block font-semibold">{title}</span>
                  <span className="t-small text-muted">{short}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
