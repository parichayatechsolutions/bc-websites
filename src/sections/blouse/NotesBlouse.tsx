// src/sections/blouse/NotesBlouse.tsx
// Blouse notes: a magazine page of four classic combinations of neck,
// back and sleeves, each drawn front and back with a line on when it
// works, and a link to ask for it. (Lab: blouse P, "Blouse notes", as
// classic combinations rather than "popular" ones, which would be a claim
// about their customers.)
//
// The notes are styling guidance, true of the cuts. Shows only for a
// boutique that stitches blouses. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { BlouseFlat } from './blouseDrawing'
import { CLASSICS as LOOKS, useBlouse } from './blouseShared'

export default function NotesBlouse() {
  const { stitchesBlouses, send } = useBlouse()
  if (!stitchesBlouses) return null

  return (
    <section id="blouse-notes" className="section">
      <div className="wrap">
        <div className="border-y-2 border-ink py-4">
          <h2 className="t-1">Blouse notes</h2>
        </div>
        <ul className="grid gap-x-12 md:grid-cols-2">
          {LOOKS.map((l) => (
            <li key={l.name} className="border-b border-ink/15 py-10">
              <div className="grid grid-cols-2 gap-3 bg-paper p-4">
                <div className="aspect-[5/4]">
                  <BlouseFlat neck={l.neck} sleeve={l.sleeve} />
                </div>
                <div className="aspect-[5/4]">
                  <BlouseFlat neck={l.back} sleeve={l.sleeve} back />
                </div>
              </div>
              <h3 className="t-2 mt-6">{l.name}</h3>
              <p className="mt-2 text-muted">{l.note}</p>
              <a href={send(l.neck, l.back, l.sleeve)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 font-semibold text-primary-ink">
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
                <span className="link-stitch">Ask for this one</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
