// src/sections/footer/SignatureFooter.tsx
// A quiet sign-off: "Stitched in" their city, set in the display face
// between two lines of running stitch, then the pages, contacts and
// credit, centred. (Lab: footer O, "Signature", without "with care",
// which would be ours to say, not theirs.)
//
// The city of the first branch; without one, the boutique's name. No
// motion.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import SocialLinks from '../../components/SocialLinks'

const STITCH = 'block h-0 w-full border-t-2 border-dashed border-thread'

export default function SignatureFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const city = boutique.branches[0]?.city

  return (
    <footer className="border-t border-ink/10 bg-light pt-16 pb-10 text-ink">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-5 text-center md:px-10">
        <span aria-hidden="true" className={`${STITCH} max-w-md`} />
        <p className="t-1 my-8 font-display text-balance text-primary-ink italic">{city ? `Stitched in ${city}` : boutique.brand.name}</p>
        <span aria-hidden="true" className={`${STITCH} max-w-md`} />
        {city && <p className="t-3 mt-8">{boutique.brand.name}</p>}
        {pages.length > 1 && (
          <nav aria-label="Pages" className="mt-6">
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
