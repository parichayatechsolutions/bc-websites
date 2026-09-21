// src/sections/footer/BrandFooter.tsx
// A bold sign-off on the brand colour: the boutique's name once more at full
// size, the pages, every way to reach them, and the credit line.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import SocialLinks from '../../components/SocialLinks'
import { fitDisplay } from '../../theme/theme'

export default function BrandFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { brand } = boutique

  return (
    <footer className="bg-primary pb-10 pt-24 text-on-primary">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <Logo className="h-14 w-14" />
        <p className="t-hero mt-8 max-w-[14ch] text-balance" style={fitDisplay(brand.name, 10, 9)}>
          {brand.name}
        </p>
        {brand.localName && <p className="t-2 mt-3 opacity-80">{brand.localName}</p>}

        {pages.length > 1 && (
          <nav aria-label="Pages" className="mt-14">
            <ul className="t-3 flex flex-wrap gap-x-10 gap-y-3">
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

        <SocialLinks on="primary" className="mt-10" />
        <Credit className="mt-16 justify-between border-t border-current/20 pt-6" />
      </div>
    </footer>
  )
}
