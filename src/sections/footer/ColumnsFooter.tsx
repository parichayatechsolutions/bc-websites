// src/sections/footer/ColumnsFooter.tsx
// A compact, practical footer on the dark colour, in four columns: who they
// are, the pages, where to find them, and how to reach them. Suits boutiques
// with several branches or longer pages, where people look to the footer for
// details rather than a flourish.

import { Link } from 'react-router-dom'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import SocialLinks from '../../components/SocialLinks'

export default function ColumnsFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { brand, branches, contact } = boutique
  const heading = 'font-display text-lg text-accent-on-dark'

  return (
    <footer className="bg-dark pb-10 pt-20 text-light">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 sm:grid-cols-2 md:px-10 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo className="h-12 w-12" />
          <p className="t-3 mt-5">{brand.name}</p>
          {brand.tagline && <p className="mt-2 max-w-[30ch] text-light/70">{brand.tagline}</p>}
        </div>

        {pages.length > 1 && (
          <nav aria-label="Pages">
            <h2 className={heading}>Pages</h2>
            <ul className="mt-4 space-y-2.5">
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

        <div>
          <h2 className={heading}>{branches.length > 1 ? 'Our branches' : 'Visit us'}</h2>
          <ul className="mt-4 space-y-5 text-light/85">
            {branches.slice(0, 3).map((b) => (
              <li key={b.name + b.address}>
                {branches.length > 1 && <span className="block text-light">{b.name}</span>}
                <span className="block">
                  {b.address}, {b.city} {b.pincode}
                </span>
                {b.hours && <span className="block text-light/60">{b.hours}</span>}
                <a href={b.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-stitch mt-1 inline-block text-light">
                  Get directions
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>Get in touch</h2>
          <ul className="mt-4 space-y-2.5">
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
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="link-stitch is-quiet break-all">
                  {contact.email}
                </a>
              </li>
            )}
          </ul>
          <SocialLinks on="dark" className="mt-6" />
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-[1200px] px-5 md:px-10">
        <Credit className="justify-between border-t border-light/15 pt-6" />
      </div>
    </footer>
  )
}
