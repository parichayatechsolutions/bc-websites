// src/sections/footer/NumbersFooter.tsx
// Dark: the page ends on their numbers as stat cards (the rating, years,
// their own stats, usual delivery), then the name, pages, contacts and
// credit. (Lab: footer J, "Numbers".)
//
// Only facts from the config (trustFacts); without two, the cards drop
// away and it's a plain dark footer. No motion.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import SocialLinks from '../../components/SocialLinks'
import { trustFacts } from '../trust/trustFacts'

export default function NumbersFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const facts = trustFacts(boutique)

  return (
    <footer className="bg-dark pt-16 pb-10 text-light">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        {facts.length >= 2 && (
          <dl className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-col-reverse justify-end rounded-2xl border border-light/15 p-6">
                <dt className="t-small mt-2 text-light/70">{f.label}</dt>
                <dd className="font-display text-4xl leading-none tabular-nums text-accent-on-dark">{f.value}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="t-3">{boutique.brand.name}</p>
          <SocialLinks on="dark" />
        </div>
        {pages.length > 1 && (
          <nav aria-label="Pages" className="mt-8">
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
        <Credit className="mt-10 justify-between border-t border-light/15 pt-6" />
      </div>
    </footer>
  )
}
