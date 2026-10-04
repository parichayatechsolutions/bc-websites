// src/sections/footer/HoursFooter.tsx
// The page ends on the hours board: whether the shop is open right now and
// the week's hours, beside the logo, name and a WhatsApp button; then the
// pages and the credit. (Lab: footer G, "Hours board".)
//
// The main branch's day-by-day hours (app/hours); without them the hours
// show as written and the status is left out. No motion.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useOpenState, weekRows } from '../../app/hours'
import { useSite } from '../../app/SiteContext'
import Button from '../../components/Button'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'

export default function HoursFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const branch = boutique.branches[0]
  const state = useOpenState(branch)

  return (
    <footer className="border-t border-ink/10 bg-paper pt-16 pb-10 text-ink">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <Logo className="h-14 w-14" />
            <p className="t-2 mt-4 text-balance text-primary-ink">{boutique.brand.name}</p>
            {branch && (
              <p className="mt-2 text-muted">
                {branch.address}, {branch.city}
              </p>
            )}
            <div className="mt-6">
              <Button href={whatsappLink(boutique)} variant="primary" icon={IconBrandWhatsapp}>
                Chat on WhatsApp
              </Button>
            </div>
          </div>
          <div className="md:col-span-7">
            {state && (
              <p className="t-3 flex items-center gap-2" aria-live="polite">
                <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${state.open ? 'bg-primary-ink' : 'border-2 border-ink/50'}`} />
                {state.label}
              </p>
            )}
            {branch?.week ? (
              <dl className="mt-4 border-t border-ink/15">
                {weekRows(branch.week).map((r) => (
                  <div key={r.days} className={`flex justify-between gap-4 border-b border-ink/15 py-3 ${state && r.indices.includes(state.todayIndex) ? 'font-semibold text-primary-ink' : ''}`}>
                    <dt>{r.days}</dt>
                    <dd className="tabular-nums">{r.hours}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              branch?.hours && <p className="mt-4">{branch.hours}</p>
            )}
          </div>
        </div>
        {pages.length > 1 && (
          <nav aria-label="Pages" className="mt-12 border-t border-ink/15 pt-6">
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              {pages.map((p) => (
                <li key={p.path}>
                  <Link to={href(p.path)} className="link-stitch is-quiet">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <Credit className="mt-8 justify-between" />
      </div>
    </footer>
  )
}
