// src/sections/fabric/GuideFabrics.tsx
// A fabric guide: their fabrics as a list on one side, the chosen one as a
// large swatch on the other with its name, what it's best for and a button
// to ask about it. (Lab: fabric D, "Guide + detail".)
//
// From `fabrics`; hides without any. The swatch swaps with a CSS fade.

import { useState } from 'react'
import { IconBrandWhatsapp, IconChevronRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'

export default function GuideFabrics() {
  const { boutique } = useBoutique()
  const fabrics = boutique.fabrics ?? []
  const [index, setIndex] = useState(0)
  if (!fabrics.length) return null
  const fabric = fabrics[index] ?? fabrics[0]

  return (
    <section id="fabrics" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Our fabrics</h2>
          <ul className="mt-10 border-t border-ink/15" role="group" aria-label="Fabrics">
            {fabrics.map((f, i) => (
              <li key={f.name} className="border-b border-ink/15">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className="group flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-3 text-left transition-colors duration-200 ease-stitch aria-pressed:text-primary-ink"
                >
                  <span className="t-3">{f.name}</span>
                  <IconChevronRight size={18} stroke={1.5} aria-hidden="true" className="shrink-0 transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-7">
          <div key={fabric.photo} className="animate-[fade-in_700ms_var(--ease-stitch)]" aria-live="polite">
            <div className="aspect-[4/3] overflow-hidden bg-paper">
              <Media file={fabric.photo} alt={`${fabric.name} swatch`} />
            </div>
            <h3 className="t-2 mt-6">{fabric.name}</h3>
            {fabric.bestFor && <p className="mt-2 text-muted">Best for {fabric.bestFor}</p>}
          </div>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about your ${fabric.name}.`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask about this fabric
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
