// src/sections/footer/MinimalFooter.tsx
// A quiet, centred close on the page's light background: logo, name, the
// pages in one line, the contact icons and the credit. For pages that end on
// something strong (a contact form, a visit section) and don't need a second
// big moment.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import SocialLinks from '../../components/SocialLinks'

export default function MinimalFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()

  return (
    <footer className="border-t border-ink/10 bg-light pb-10 pt-16 text-ink">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 text-center md:px-10">
        <Logo className="h-12 w-12" />
        <p className="t-3 mt-4 text-primary-ink">{boutique.brand.name}</p>

        {pages.length > 1 && (
          <nav aria-label="Pages" className="mt-8">
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

        <SocialLinks on="light" className="mt-8 justify-center" />
        <Credit className="mt-12 justify-center" />
      </div>
    </footer>
  )
}
