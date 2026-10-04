// src/sections/saree/AskSaree.tsx
// "I need…" in large type, one line per saree service they offer; each
// line is a link that opens WhatsApp asking for exactly that. One tap per
// need. (Lab: saree S, "Ask in one line".)
//
// Their own saree services; hides without any. No motion.

import { IconArrowRight } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel|petticoat/i

export default function AskSaree() {
  const { boutique } = useBoutique()
  const services = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => SAREE.test(i)))]
  if (!services.length) return null
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

  return (
    <section id="saree-ask" className="section">
      <div className="wrap">
        <h2 className="t-1">For your saree</h2>
        <ul className="mt-10">
          {services.map((s) => (
            <li key={s} className="border-b border-ink/15">
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need ${lower(s)} for my saree.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center justify-between gap-6 py-5"
              >
                <span className="t-2">
                  <span className="text-muted">I need </span>
                  {lower(s)}
                </span>
                <IconArrowRight size={24} stroke={1.5} aria-hidden="true" className="shrink-0 text-primary-ink transition-transform duration-300 ease-stitch group-hover:translate-x-1" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
