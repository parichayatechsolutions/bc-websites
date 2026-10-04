// src/sections/gallery/AccordionGallery.tsx
// Dark, with one tall arched panel per kind of work side by side; choosing
// a panel widens it to show the piece and its name while the others narrow.
// On a phone the panels stack and the chosen one grows taller.
// (Lab: gallery K, "Accordion".)
//
// Kinds come from photo names; hides with fewer than two. Panels resize
// with a CSS transition that reduced motion turns off.

import { useState } from 'react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'

export default function AccordionGallery() {
  const { boutique } = useBoutique()
  const work = boutique.media.work
  const kinds = photoCategories(work)
    .slice(0, 5)
    .map((kind) => ({ kind, file: work.find((f) => photoCategory(f) === kind)!, count: work.filter((f) => photoCategory(f) === kind).length }))
  const [open, setOpen] = useState(0)
  if (kinds.length < 2) return null

  return (
    <section id="work" className="section bg-dark text-light">
      <div className="wrap">
        <h2 className="t-1">What we make</h2>
        <ul className="mt-12 flex flex-col gap-2 md:h-[70vh] md:flex-row" role="group" aria-label="Kind of work">
          {kinds.map(({ kind, file, count }, i) => {
            const isOpen = i === open
            return (
              <li
                key={kind}
                className={`relative overflow-hidden rounded-t-[999px] bg-light/5 transition-[flex-grow,height] duration-700 ease-stitch md:h-full ${
                  isOpen ? 'h-[60vh] md:flex-[5]' : 'h-20 md:flex-1'
                }`}
              >
                <button type="button" onClick={() => setOpen(i)} aria-expanded={isOpen} className="absolute inset-0 cursor-pointer text-left">
                  <Media file={file} alt="" />
                  <span className="absolute inset-x-0 bottom-0 bg-dark/70 px-4 py-3">
                    <span className="t-3 block truncate">{kind}</span>
                    {isOpen && <span className="t-small text-light/75">{count === 1 ? '1 piece' : `${count} pieces`}</span>}
                  </span>
                </button>
                {isOpen && (
                  <a
                    href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${kind.toLowerCase()}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-4 bottom-3 inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-semibold text-on-accent"
                  >
                    Ask
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
