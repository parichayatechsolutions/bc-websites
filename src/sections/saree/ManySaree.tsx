// src/sections/saree/ManySaree.tsx
// Many sarees at once: a counter for how many she's bringing and a tick
// for each saree service she needs, then one WhatsApp message with it all.
// For the wedding trunk of sarees. (Lab: saree X, "Many sarees".)
//
// Their own saree services; needs one. It asks rather than quotes. No
// motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck, IconMinus, IconPlus } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { joinList } from '../../app/text'
import Button from '../../components/Button'

const SAREE = /fall|pico|pleat|drap|kuchu|tassel|petticoat|polish|iron/i
const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/25 transition-[background-color,color] duration-200 ease-stitch hover:bg-ink hover:text-light disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-ink'

export default function ManySaree() {
  const { boutique } = useBoutique()
  const services = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => SAREE.test(i)))]
  const [count, setCount] = useState(5)
  const [picked, setPicked] = useState<string[]>(services.slice(0, 2))
  if (!services.length) return null
  const toggle = (s: string) => setPicked(picked.includes(s) ? picked.filter((p) => p !== s) : [...picked, s])
  const message = `Hi ${boutique.brand.name}, I have ${count} saree${count === 1 ? '' : 's'}${picked.length ? ` that need ${joinList(picked, true)}` : ''}. When could I bring them in?`

  return (
    <section id="saree-many" className="section">
      <div className="wrap max-w-4xl">
        <h2 className="t-1 max-w-[12ch] text-balance">Bringing a few?</h2>
        <div className="mt-10 flex items-center gap-5">
          <button type="button" onClick={() => setCount(count - 1)} disabled={count <= 1} aria-label="One fewer saree" className={ROUND}>
            <IconMinus size={22} stroke={1.75} aria-hidden="true" />
          </button>
          <p aria-live="polite">
            <span className="t-hero tabular-nums text-primary-ink">{count}</span>
            <span className="t-3 ml-3">{count === 1 ? 'saree' : 'sarees'}</span>
          </p>
          <button type="button" onClick={() => setCount(Math.min(count + 1, 50))} disabled={count >= 50} aria-label="One more saree" className={ROUND}>
            <IconPlus size={22} stroke={1.75} aria-hidden="true" />
          </button>
        </div>
        <ul className="mt-10 grid border-t border-ink/15 sm:grid-cols-2 sm:gap-x-10" role="group" aria-label="What they need">
          {services.map((s) => {
            const on = picked.includes(s)
            return (
              <li key={s} className="border-b border-ink/15">
                <button type="button" onClick={() => toggle(s)} aria-pressed={on} className="group flex min-h-14 w-full cursor-pointer items-center gap-4 py-3 text-left">
                  <span
                    aria-hidden="true"
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ease-stitch ${on ? 'border-primary-ink bg-primary-ink text-on-primary-ink' : 'border-ink/30 group-hover:border-ink'}`}
                  >
                    {on && <IconCheck size={16} stroke={2} />}
                  </span>
                  {s}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="mt-10">
          <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
            Send in one message
          </Button>
        </div>
      </div>
    </section>
  )
}
