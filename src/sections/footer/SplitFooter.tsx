// src/sections/footer/SplitFooter.tsx
// Two halves: a block of brand colour with the logo, name and tagline, and
// a light half with the pages, where to find them and every way in.
// (Lab: footer N, "Split".) No motion.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import SocialLinks from '../../components/SocialLinks'

export default function SplitFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { brand, branches } = boutique
  const branch = branches[0]

  return (
    <footer className="grid md:grid-cols-2">
      <div className="flex flex-col justify-between gap-10 bg-primary px-5 py-14 text-on-primary md:px-10 md:py-20">
        <Logo className="h-14 w-14" />
        <div>
          <p className="t-2 max-w-[16ch] text-balance">{brand.name}</p>
          {brand.tagline && <p className="mt-3 max-w-[30ch] opacity-85">{brand.tagline}</p>}
        </div>
      </div>
      <div className="bg-light px-5 py-14 text-ink md:px-10 md:py-20">
        <div className="grid gap-10 sm:grid-cols-2">
          {pages.length > 1 && (
            <nav aria-label="Pages">
              <ul className="space-y-2">
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
          {branch && (
            <p className="text-muted">
              {branch.address}, {branch.city}
              {branch.hours && <span className="mt-2 block">{branch.hours}</span>}
            </p>
          )}
        </div>
        <SocialLinks on="light" className="mt-10" />
        <Credit className="mt-12 justify-between border-t border-ink/10 pt-6" />
      </div>
    </footer>
  )
}
