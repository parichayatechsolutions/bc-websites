// src/sections/lookbook/AskLookbook.tsx
// "Love this look?" One look large, with three ways to ask about it: the
// same design, the same design in her colours, or something like it. Each
// writes a different WhatsApp message. Previous and next change the look.
// (Lab: look W, "Love this look?".)
//
// Looks from photos look-<occasion>-<nn>.jpg; hides without any. The photo
// swaps with a CSS fade.

import { useState } from 'react'
import { IconArrowRight, IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Media from '../../components/Media'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-ink hover:text-light active:translate-y-0'

export default function AskLookbook() {
  const { boutique } = useBoutique()
  const looks = byFunction(boutique.media.looks ?? [], 'look')
  const captions = boutique.media.captions ?? {}
  const [index, setIndex] = useState(0)
  if (!looks.length) return null

  const file = looks[index] ?? looks[0]
  const what = captions[file] ?? `your ${photoTag(file, 'look')?.toLowerCase() ?? ''} look`
  const step = (by: number) => setIndex((index + by + looks.length) % looks.length)
  const asks = [
    { label: 'The same design', message: `I'd like this exact design: ${what}.` },
    { label: 'This design in my colours', message: `I'd like this design in my own colours: ${what}.` },
    { label: 'Something like it', message: `I'd like something like this: ${what}.` },
  ]

  return (
    <section id="lookbook" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-6">
          <div className="arch aspect-[3/4] max-w-md bg-paper">
            <Media key={file} file={file} alt={captions[file] ?? ''} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
          {looks.length > 1 && (
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => step(-1)} aria-label="Previous look" className={ROUND}>
                <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => step(1)} aria-label="Next look" className={ROUND}>
                <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
        <div className="md:col-span-6" aria-live="polite">
          <h2 className="t-1 max-w-[10ch] text-balance">Love this look?</h2>
          {captions[file] && <p className="mt-4 text-muted">{captions[file]}</p>}
          <ul className="mt-8 border-t border-ink/15">
            {asks.map(({ label, message }) => (
              <li key={label} className="border-b border-ink/15">
                <a
                  href={whatsappLink(boutique, `Hi ${boutique.brand.name}, ${message}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-16 items-center justify-between gap-4 py-4"
                >
                  <span className="t-3">{label}</span>
                  <IconArrowRight size={20} stroke={1.75} aria-hidden="true" className="shrink-0 text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
