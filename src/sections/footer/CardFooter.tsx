// src/sections/footer/CardFooter.tsx
// The page ends on their visiting card, front and back side by side: the
// logo, name and line on the brand-colour front; the owner, number,
// address and email on the paper back. Then the pages, the ways to reach
// them and the credit. (Lab: footer Y, "Visiting card".)
//
// The back shows the first branch. Rows without data drop away. No motion.

import { Link } from 'react-router-dom'
import { telLink, useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import SocialLinks from '../../components/SocialLinks'

export default function CardFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { brand, owner, contact } = boutique
  const branch = boutique.branches[0]
  const line = boutique.highlight ?? brand.tagline

  return (
    <footer className="border-t border-ink/10 bg-paper pt-16 pb-10 text-ink">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          <div className="flex aspect-[7/4] flex-col items-center justify-center gap-3 rounded-2xl bg-primary p-6 text-center text-on-primary">
            <Logo className="h-14 w-14 rounded-full bg-light" />
            <p className="t-3 text-balance">{brand.name}</p>
            {line && <p className="t-small max-w-[30ch] opacity-85">{line}</p>}
          </div>
          <div className="flex aspect-[7/4] flex-col justify-center rounded-2xl border border-ink/15 bg-light p-6">
            <p className="font-semibold">{owner.name}</p>
            {owner.role && <p className="t-small text-muted">{owner.role}</p>}
            <div className="t-small mt-4 space-y-1">
              <a href={telLink(contact.phone)} className="link-stitch block w-fit tabular-nums">
                {contact.phone}
              </a>
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="link-stitch block w-fit break-all">
                  {contact.email}
                </a>
              )}
              {branch && (
                <p className="text-muted">
                  {branch.address}, {branch.city}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center gap-8">
          {pages.length > 1 && (
            <nav aria-label="Pages">
              <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
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
          <SocialLinks on="light" className="justify-center" />
        </div>
        <Credit className="mt-12 justify-center border-t border-ink/10 pt-6 text-center" />
      </div>
    </footer>
  )
}
