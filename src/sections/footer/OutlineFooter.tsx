// src/sections/footer/OutlineFooter.tsx
// A compact footer of pages and contact, ending with the boutique's name
// set edge to edge along the bottom in outlined letters, like a sign cut
// into the floor of the page. (Lab: footer I, "Outline name".)
//
// The outlined name is decoration (the name is already said in text above
// it), so it's hidden from screen readers. No motion.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import SocialLinks from '../../components/SocialLinks'
import { fitDisplay } from '../../theme/theme'

export default function OutlineFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const { brand, branches } = boutique
  const branch = branches[0]

  return (
    <footer className="overflow-hidden bg-dark pt-20 text-light">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="flex items-center gap-3 md:col-span-4">
            <Logo className="h-11 w-11 shrink-0" />
            <span className="line-clamp-2 font-display text-xl">{brand.name}</span>
          </div>
          {pages.length > 1 && (
            <nav aria-label="Pages" className="md:col-span-3">
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
          <div className="md:col-span-5">
            {branch && (
              <p className="text-light/80">
                {branch.address}, {branch.city}
                {branch.hours && <span className="block">{branch.hours}</span>}
              </p>
            )}
            <SocialLinks on="dark" className="mt-6" />
          </div>
        </div>
        <Credit className="mt-14 justify-between border-t border-light/15 pt-6" />
      </div>
      <p
        aria-hidden="true"
        className="t-hero mt-10 -mb-[0.18em] whitespace-nowrap px-2 text-center leading-none text-transparent select-none"
        style={{ ...fitDisplay(brand.name, 15, 14, 2.4), WebkitTextStroke: '1.5px var(--c-accent-on-dark)' }}
      >
        {brand.name}
      </p>
    </footer>
  )
}
