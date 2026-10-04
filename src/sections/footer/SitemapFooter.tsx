// src/sections/footer/SitemapFooter.tsx
// A full sitemap on dark: about them, the pages, what they're known for,
// starting prices and every way to reach them, in columns, then the credit
// line. For a site with a lot in it. (Lab: footer P, "Sitemap".)
//
// Columns without data drop away; prices only with permission. No motion.

import { Link } from 'react-router-dom'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import { rupees } from '../../app/text'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'

export default function SitemapFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { brand, branches, contact, services, pricing, permissions } = boutique
  const prices = permissions.showPrices ? (pricing?.startingAt ?? []) : []
  const branch = branches[0]
  const heading = 't-small font-semibold text-accent-on-dark'

  return (
    <footer className="bg-dark pt-20 pb-10 text-light">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Logo className="h-12 w-12" />
            <p className="t-3 mt-4">{brand.name}</p>
            {brand.tagline && <p className="t-small mt-2 text-light/70">{brand.tagline}</p>}
          </div>
          {pages.length > 1 && (
            <nav aria-label="Pages">
              <p className={heading}>Pages</p>
              <ul className="mt-4 space-y-2">
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
          {services.featured.length > 0 && (
            <div>
              <p className={heading}>Known for</p>
              <ul className="mt-4 space-y-2 text-light/80">
                {services.featured.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          )}
          {prices.length > 0 && (
            <div>
              <p className={heading}>Starting prices</p>
              <ul className="mt-4 space-y-2 text-light/80">
                {prices.map((p) => (
                  <li key={p.item}>
                    {p.item}, from {rupees(p.price)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <p className={heading}>Get in touch</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a href={whatsappLink(boutique)} target="_blank" rel="noopener noreferrer" className="link-stitch is-quiet">
                  WhatsApp {contact.whatsapp}
                </a>
              </li>
              <li>
                <a href={telLink(contact.phone)} className="link-stitch is-quiet">
                  Call {contact.phone}
                </a>
              </li>
              {branch && (
                <li>
                  <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-stitch is-quiet">
                    {branch.area || branch.city}: directions
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <Credit className="mt-16 justify-between border-t border-light/15 pt-6" />
      </div>
    </footer>
  )
}
