// src/sections/saree/ExpressSaree.tsx
// "Need it sooner?" set large, with their own express time beneath and
// the saree finishes they do as quick links: for the saree that has to be
// ready for a function this week. (Lab: saree L, "Need it tomorrow?",
// asked as "sooner" since the express time is theirs, not ours.)
//
// Needs `pricing.express` and at least one saree service; hides otherwise.
// No motion.

import { IconBrandWhatsapp, IconClockBolt } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const SAREE = /saree|sari|fall|pico|pleat|drap|kuchu|tassel|petticoat/i
const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

export default function ExpressSaree() {
  const { boutique } = useBoutique()
  const express = boutique.pricing?.express
  const services = [...new Set(boutique.services.groups.flatMap((g) => g.items).filter((i) => SAREE.test(i)))]
  if (!express || !services.length) return null

  return (
    <section id="saree-express" className="section bg-primary text-on-primary">
      <div className="wrap grid gap-10 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-7">
          <h2 className="t-hero max-w-[10ch] text-balance">Need it sooner?</h2>
          <p className="t-lead mt-8 flex max-w-[36ch] gap-3">
            <IconClockBolt size={28} stroke={1.5} className="mt-0.5 shrink-0 text-accent-on-dark" aria-hidden="true" />
            <span>Express: {express}</span>
          </p>
          <div className="mt-10">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need my saree done urgently. Can you do it on express?`)} variant="accent" icon={IconBrandWhatsapp}>
              Ask for express
            </Button>
          </div>
        </div>
        <ul className="self-end md:col-span-5">
          {services.map((s) => (
            <li key={s} className="border-b border-on-primary/25">
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I need ${lower(s)} for my saree on express.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-between gap-4 py-3"
              >
                <span className="link-stitch">{s}</span>
                <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" className="shrink-0 opacity-80" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
