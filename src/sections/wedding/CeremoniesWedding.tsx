// src/sections/wedding/CeremoniesWedding.tsx
// Your ceremonies: tick the functions in her wedding, and the outfit list
// beside updates with what a bride often wears to each and a running
// count; the button sends the list. (Lab: wed Q, "Your ceremonies".)
//
// General guidance (weddingShared), no dates. Shows only for a boutique
// that does bridal work. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import { FUNCTIONS, useWedding } from './weddingShared'

export default function CeremoniesWedding() {
  const { boutique } = useBoutique()
  const { doesBridal } = useWedding()
  const [picked, setPicked] = useState<string[]>(['Mehendi', 'Wedding', 'Reception'])
  if (!doesBridal) return null
  const toggle = (name: string) => setPicked(picked.includes(name) ? picked.filter((p) => p !== name) : [...picked, name])
  const chosen = FUNCTIONS.filter((f) => picked.includes(f.name))

  return (
    <section id="wedding-ceremonies" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Your ceremonies</h2>
          <p className="mt-4 text-muted">Tick the functions in your wedding.</p>
          <ul className="mt-8 border-t border-ink/15" role="group" aria-label="Ceremonies">
            {FUNCTIONS.map((f) => {
              const on = picked.includes(f.name)
              return (
                <li key={f.name} className="border-b border-ink/15">
                  <button type="button" onClick={() => toggle(f.name)} aria-pressed={on} className="group flex min-h-14 w-full cursor-pointer items-center gap-4 py-3 text-left">
                    <span
                      aria-hidden="true"
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ease-stitch ${on ? 'border-primary-ink bg-primary-ink text-on-primary-ink' : 'border-ink/30 group-hover:border-ink'}`}
                    >
                      {on && <IconCheck size={16} stroke={2} />}
                    </span>
                    <span className="t-3">{f.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="self-start rounded-2xl bg-paper p-7 md:sticky md:top-24 md:col-span-7 md:p-10" aria-live="polite">
          <p className="t-2">
            {chosen.length} {chosen.length === 1 ? 'outfit' : 'outfits'} for the bride
          </p>
          {chosen.length ? (
            <ol className="mt-6 space-y-4">
              {chosen.map((f) => (
                <li key={f.name} className="grid gap-1 border-t border-ink/15 pt-4 sm:grid-cols-[8rem_1fr] sm:gap-6">
                  <span className="font-semibold text-primary-ink">{f.name}</span>
                  <span className="text-muted">{f.wear}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-4 text-muted">Tick a ceremony to start the list.</p>
          )}
          <div className="mt-8">
            <Button
              href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'm planning my wedding outfits${chosen.length ? ` for ${chosen.map((f) => f.name.toLowerCase()).join(', ')}` : ''}. Could we talk?`)}
              variant="primary"
              icon={IconBrandWhatsapp}
            >
              Send my list
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
