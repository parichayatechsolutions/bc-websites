// src/sections/footer/ArchFooter.tsx
// The footer rises in a great temple arch of brand colour, the logo at its
// crown, the name, the pages and every way in beneath. The arch family's
// sign-off. (Lab: footer M, "Arch top".) No motion.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import SocialLinks from '../../components/SocialLinks'
import { fitDisplay } from '../../theme/theme'

export default function ArchFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { brand } = boutique

  return (
    <footer className="bg-light pt-16">
      <div className="mx-auto max-w-[1200px] px-3 md:px-10">
        <div className="arch flex flex-col items-center bg-primary px-6 pt-20 pb-10 text-center text-on-primary md:pt-28">
          <Logo className="h-16 w-16" />
          <p className="t-1 mt-6 max-w-[16ch] text-balance" style={fitDisplay(brand.name, 7, 5, 2.2)}>
            {brand.name}
          </p>
          {brand.localName && <p className="t-3 mt-2 opacity-80">{brand.localName}</p>}
          {pages.length > 1 && (
            <nav aria-label="Pages" className="mt-10">
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
          <SocialLinks on="primary" className="mt-8 justify-center" />
          <Credit className="mt-12 w-full justify-center border-t border-current/20 pt-6 md:justify-between" />
        </div>
      </div>
    </footer>
  )
}
