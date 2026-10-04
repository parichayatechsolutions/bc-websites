// src/sections/bridal/CeremonyBridal.tsx
// The bride's looks by ceremony: a tab for each function (engagement,
// haldi, mehendi, wedding, reception…), each showing her look for it with
// its note and a button to ask. (Lab: bridal X, "Ceremony tabs".)
//
// Looks from photos look-<function>-<nn>.jpg, in the order the functions
// happen; needs two functions. Shows only for a boutique that does bridal
// work. Tabs follow the ARIA tabs pattern; the photo swaps with a CSS
// fade.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoTag } from '../../app/photos'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { useBridal } from './bridalShared'

export default function CeremonyBridal() {
  const { boutique } = useBoutique()
  const { doesBridal } = useBridal()
  const id = useId()
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [index, setIndex] = useState(0)
  const captions = boutique.media.captions ?? {}
  const seen = new Set<string>()
  const looks = byFunction(boutique.media.looks ?? [], 'look')
    .filter((f) => {
      const tag = photoTag(f, 'look')
      if (!tag || seen.has(tag)) return false
      seen.add(tag)
      return true
    })
    .slice(0, 6)
  if (!doesBridal || looks.length < 2) return null
  const look = looks[index] ?? looks[0]
  const tag = photoTag(look, 'look')!

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    const next = (index + by + looks.length) % looks.length
    setIndex(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="bridal" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">A look for every ceremony</h2>
        <div role="tablist" aria-label="Ceremonies" className="mt-10 flex flex-wrap gap-2" onKeyDown={onKey}>
          {looks.map((f, i) => (
            <button
              key={f}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${id}-t${i}`}
              aria-selected={i === index}
              aria-controls={`${id}-p`}
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color] duration-200 ease-stitch hover:border-ink aria-selected:border-primary-ink aria-selected:bg-primary-ink aria-selected:text-on-primary-ink"
            >
              {photoTag(f, 'look')}
            </button>
          ))}
        </div>
        <div role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${index}`} className="mt-10 grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className="arch aspect-[3/4] w-full max-w-md bg-paper md:col-span-5">
            <Media key={look} file={look} alt={captions[look] ?? `${tag} look`} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
          <div className="md:col-span-7">
            <p className="t-1">{tag}</p>
            {captions[look] && <p className="t-lead mt-4 max-w-[36ch] text-muted">{captions[look]}</p>}
            <div className="mt-8">
              <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to talk about my ${tag.toLowerCase()} look.`)} variant="primary" icon={IconBrandWhatsapp}>
                Ask about this look
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
