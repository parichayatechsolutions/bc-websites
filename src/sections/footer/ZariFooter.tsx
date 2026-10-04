// src/sections/footer/ZariFooter.tsx
// The page ends on paper between two zari borders, in three columns: where
// to visit, the logo and name in the middle, and how to talk to them; the
// pages and credit beneath. (Lab: footer H, "Double zari".)
//
// The first branch. No motion.

import { Link } from 'react-router-dom'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'

export default function ZariFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const branch = boutique.branches[0]
  const { contact } = boutique

  return (
    <footer className="bg-paper text-ink">
      <div className="zari" aria-hidden="true" />
      <div className="mt-1 zari" aria-hidden="true" />
      <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-10">
        <div className="grid gap-10 text-center md:grid-cols-3 md:items-center">
          <div className="md:text-left">
            <p className="t-3">Visit</p>
            {branch && (
              <>
                <p className="mt-2 text-muted">
                  {branch.address}, {branch.city} {branch.pincode}
                </p>
                {branch.hours && <p className="t-small mt-1 text-muted">{branch.hours}</p>}
                <a href={branch.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-stitch mt-2 inline-block min-h-11 py-2 font-semibold text-primary-ink">
                  Directions
                </a>
              </>
            )}
          </div>
          <div className="flex flex-col items-center">
            <Logo className="h-16 w-16" />
            <p className="t-2 mt-4 text-balance text-primary-ink">{boutique.brand.name}</p>
          </div>
          <div className="md:text-right">
            <p className="t-3">Talk to us</p>
            <p className="mt-2">
              <a href={telLink(contact.phone)} className="link-stitch tabular-nums">
                {contact.phone}
              </a>
            </p>
            <a href={whatsappLink(boutique)} target="_blank" rel="noopener noreferrer" className="link-stitch mt-1 inline-block min-h-11 py-2 font-semibold text-primary-ink">
              Chat on WhatsApp
            </a>
          </div>
        </div>
        {pages.length > 1 && (
          <nav aria-label="Pages" className="mt-12 border-t border-ink/15 pt-6">
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
        <Credit className="mt-8 justify-center text-center" />
      </div>
      <div className="zari" aria-hidden="true" />
      <div className="mt-1 zari" aria-hidden="true" />
    </footer>
  )
}
