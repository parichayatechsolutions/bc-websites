// src/sections/footer/YearFooter.tsx
// The page ends on the year they started, set huge in the brand colour,
// with the name, contact details and pages beside it.
// (Lab: footer X, "Since year".)
//
// Without `established` the name takes the year's place. No motion.

import { Link } from 'react-router-dom'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import SocialLinks from '../../components/SocialLinks'
import { fitDisplay } from '../../theme/theme'

export default function YearFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { brand, established, contact } = boutique
  const branch = boutique.branches[0]

  return (
    <footer className="border-t border-ink/10 bg-paper pt-16 pb-10 text-ink">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-16">
          <div className="md:col-span-7">
            {established ? (
              <p className="font-display leading-[0.85] tabular-nums text-primary-ink" style={{ fontSize: 'clamp(6rem, 22vw, 16rem)' }}>
                <span className="t-3 block text-muted">Since</span>
                {established}
              </p>
            ) : (
              <p className="t-hero text-balance text-primary-ink" style={fitDisplay(brand.name, 10, 8)}>
                {brand.name}
              </p>
            )}
          </div>
          <div className="md:col-span-5">
            {established && <p className="t-3">{brand.name}</p>}
            {branch && (
              <p className="mt-3 text-muted">
                {branch.address}, {branch.city} {branch.pincode}
              </p>
            )}
            <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1">
              <a href={telLink(contact.phone)} className="link-stitch tabular-nums">
                {contact.phone}
              </a>
              <a href={whatsappLink(boutique)} target="_blank" rel="noopener noreferrer" className="link-stitch">
                WhatsApp
              </a>
            </p>
            <SocialLinks on="light" className="mt-6" />
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
        <Credit className="mt-10 justify-between" />
      </div>
    </footer>
  )
}
