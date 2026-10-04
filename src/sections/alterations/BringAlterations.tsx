// src/sections/alterations/BringAlterations.tsx
// What to bring for an alteration, four numbered things (the garment, one
// that fits you well, the shoes you'll wear, what you'll wear under it),
// beside a short line on why. (Lab: alter M, "Bring these".)
//
// General fitting advice, true anywhere. Needs an alteration item in
// their services. No motion.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'

const THINGS = [
  { title: 'The garment', note: 'Clean and pressed, so the fit shows true.' },
  { title: 'One that fits you well', note: 'A blouse or kurti you love the fit of, to copy from.' },
  { title: 'The shoes you’ll wear', note: 'For anything long: the hem depends on the heel.' },
  { title: 'What goes under it', note: 'The bra or inner you’ll wear changes the fit.' },
]

export default function BringAlterations() {
  const { boutique } = useBoutique()
  const alters = boutique.services.groups.flatMap((g) => g.items).some((i) => /alter/i.test(i))
  if (!alters) return null

  return (
    <section id="alteration-bring" className="section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-4">
          <h2 className="t-1 max-w-[10ch] text-balance">What to bring</h2>
          <p className="mt-5 max-w-[30ch] text-muted">A fitting goes quicker, and the result fits better, with these.</p>
          <div className="mt-8">
            <Button href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to bring something in to be altered. When can I come?`)} variant="primary" icon={IconBrandWhatsapp}>
              Ask when to come
            </Button>
          </div>
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 md:col-span-8">
          {THINGS.map((t, i) => (
            <li key={t.title} className="rounded-2xl bg-paper p-6">
              <span className="font-display text-4xl leading-none text-thread" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="t-3 mt-4">
                <span className="sr-only">{i + 1}. </span>
                {t.title}
              </h3>
              <p className="mt-1 text-muted">{t.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
