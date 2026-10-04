// src/sections/contact/ChatContact.tsx
// A chat window that opens with a greeting naming what the boutique is
// known for, then quick replies: one per thing they're known for and
// "Something else". Each reply opens WhatsApp with the message written.
// (Lab: contact Q, "Chat window".)
//
// A drawing of a chat, not a live one: no online dot, no typing, no
// promised reply time. The greeting uses only `services.featured`.
// No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { joinList } from '../../app/text'
import Logo from '../../components/Logo'

export default function ChatContact() {
  const { boutique } = useBoutique()
  const known = boutique.services.featured.slice(0, 3)
  const lower = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)
  const replies = [
    ...known.map((k) => ({ label: k, message: `Hi ${boutique.brand.name}, I'd like to ask about ${lower(k)}.` })),
    { label: 'Something else', message: `Hi ${boutique.brand.name}, I have a question.` },
  ]

  return (
    <section id="contact" className="section">
      <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <h2 className="t-1 max-w-[10ch] text-balance">Say hello</h2>
          <p className="t-lead mt-5 max-w-[30ch] text-muted">Tap what you’re looking for and WhatsApp opens with the message written.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink/15 md:col-span-7">
          <div className="flex items-center gap-3 bg-primary-ink px-5 py-4 text-on-primary-ink">
            <Logo className="h-10 w-10 shrink-0 rounded-full bg-light" />
            <p className="min-w-0 truncate font-semibold">{boutique.brand.name}</p>
          </div>
          <div className="space-y-4 bg-paper p-5 md:p-8">
            <p className="max-w-[85%] rounded-2xl rounded-tl-sm bg-light px-4 py-3">
              Hello from {boutique.brand.name}.{known.length > 0 && ` We’re known for ${joinList(known, true)}.`} What are you looking for?
            </p>
            <ul className="flex flex-wrap justify-end gap-2 pt-2" aria-label="Quick replies">
              {replies.map((r) => (
                <li key={r.label}>
                  <a
                    href={whatsappLink(boutique, r.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary-ink bg-light px-4 font-semibold text-primary-ink transition-[background-color,color] duration-200 ease-stitch hover:bg-primary-ink hover:text-on-primary-ink"
                  >
                    <IconBrandWhatsapp size={16} stroke={1.75} aria-hidden="true" />
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
