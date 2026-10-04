// src/sections/saree/NeedsSaree.tsx
// "What does your saree need?" Their saree services as a tick list (fall
// and pico, pre-pleating, kuchu…); she ticks what she wants and sends it in
// one message. (Lab: saree M, "What does it need?", without the lab's
// per-service times: TimesSaree shows those, from the shop's own numbers.)
//
// The list is their own services that mention a saree job; hides with
// fewer than two. No motion.

import { useState } from 'react'
import { IconBrandWhatsapp, IconCheck } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { joinList } from '../../app/text'
import Button from '../../components/Button'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel|petticoat/i

export default function NeedsSaree() {
  const { boutique } = useBoutique()
  const services = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((item) => SAREE.test(item)))]
  const [ticked, setTicked] = useState<string[]>([])

  if (services.length < 2) return null

  const toggle = (item: string) => setTicked(ticked.includes(item) ? ticked.filter((t) => t !== item) : [...ticked, item])
  const message = ticked.length
    ? `Hi ${boutique.brand.name}, I'd like these done for my saree: ${joinList(ticked, true).toLowerCase()}.`
    : `Hi ${boutique.brand.name}, I have a saree that needs some work.`

  return (
    <section id="saree" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[12ch] text-balance">What does your saree need?</h2>
          <p className="mt-5 max-w-[34ch] text-muted">Tick everything you want done and send it in one message.</p>
        </div>

        <div className="md:col-span-7">
          <ul className="border-t border-ink/15" role="group" aria-label="Saree services">
            {services.map((item) => {
              const on = ticked.includes(item)
              return (
                <li key={item} className="border-b border-ink/15">
                  <button
                    type="button"
                    onClick={() => toggle(item)}
                    aria-pressed={on}
                    className="group flex min-h-16 w-full cursor-pointer items-center gap-4 py-4 text-left"
                  >
                    <span
                      aria-hidden="true"
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-colors duration-200 ease-stitch ${
                        on ? 'border-primary-ink bg-primary-ink text-on-primary-ink' : 'border-ink/30 group-hover:border-ink'
                      }`}
                    >
                      {on && <IconCheck size={16} stroke={2} />}
                    </span>
                    <span className="t-3">{item}</span>
                  </button>
                </li>
              )
            })}
          </ul>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, message)} variant="primary" icon={IconBrandWhatsapp}>
              {ticked.length ? `Send ${ticked.length} on WhatsApp` : 'Ask on WhatsApp'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
