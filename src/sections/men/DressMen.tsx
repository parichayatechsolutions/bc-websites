// src/sections/men/DressMen.tsx
// What to wear: tabs for the office, a wedding guest, the groom and the
// reception, each with a few lines of what suits it, and a button to ask
// about having it made. (Lab: men J, "Dress code".)
//
// General dressing guidance, true of the occasion rather than a claim about
// the boutique. Shows only with a Men group in their services. Tabs follow
// the ARIA pattern (arrow keys). No motion.

import { useId, useRef, useState, type KeyboardEvent } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const CODES = [
  { name: 'Office', wear: ['Shirts in cotton or linen, cut close but not tight', 'Trousers with a clean break at the shoe', 'A short kurta for Fridays and festivals'] },
  { name: 'Wedding guest', wear: ['A kurta with a contrast jacket', 'Silk or cotton silk in a colour that isn’t the groom’s', 'Churidar or straight pyjama to suit the kurta’s length'] },
  { name: 'Groom', wear: ['A sherwani or bandhgala, fitted at the shoulder', 'A stole or safa matched to the bride’s colours', 'A lighter kurta set for the haldi and mehendi'] },
  { name: 'Reception', wear: ['An Indo-western jacket or a dark suit', 'Richer fabric than the ceremony: velvet, brocade, raw silk', 'A shirt with a clean collar under the jacket'] },
]

export default function DressMen() {
  const { boutique } = useBoutique()
  const id = useId()
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const hasMen = boutique.services.groups.some((g) => /^men/i.test(g.title))
  if (!hasMen) return null
  const code = CODES[active]

  const onKey = (e: KeyboardEvent) => {
    const by = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!by) return
    e.preventDefault()
    const next = (active + by + CODES.length) % CODES.length
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="dress-code" className="section">
      <div className="wrap">
        <h2 className="t-1 max-w-[12ch] text-balance">What to wear</h2>
        <div role="tablist" aria-label="Occasion" onKeyDown={onKey} className="mt-8 flex flex-wrap gap-2">
          {CODES.map((c, i) => (
            <button
              key={c.name}
              ref={(el) => {
                tabs.current[i] = el
              }}
              type="button"
              role="tab"
              id={`${id}-tab${i}`}
              aria-selected={i === active}
              aria-controls={`${id}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className="min-h-11 cursor-pointer rounded-full border border-ink/25 px-5 transition-[background-color,border-color,color,scale] duration-200 ease-stitch hover:border-ink active:scale-[0.97] aria-selected:border-primary-ink aria-selected:bg-primary-ink aria-selected:text-on-primary-ink"
            >
              {c.name}
            </button>
          ))}
        </div>
        <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab${active}`} className="mt-10 grid gap-10 md:grid-cols-12">
          <ul className="space-y-4 md:col-span-8">
            {code.wear.map((line) => (
              <li key={line} className="t-lead border-t border-ink/15 pt-4">
                {line}
              </li>
            ))}
          </ul>
          <div className="md:col-span-4 md:self-end">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like an outfit for ${code.name === 'Groom' ? 'my wedding' : `a ${code.name.toLowerCase()}`}.`)} variant="primary" icon={IconBrandWhatsapp}>
              Have it made
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
