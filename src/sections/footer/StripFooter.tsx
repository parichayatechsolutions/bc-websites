// src/sections/footer/StripFooter.tsx
// A last look at their work: a strip of photos across the top of the
// footer, then the logo, the pages and every way to reach them on the light
// page colour. (Lab: footer W, "Photo strip".)
//
// The strip shows up to six work photos and drops away without any.
// No motion.

import { Link } from 'react-router-dom'
import { useBoutique } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import Media from '../../components/Media'
import SocialLinks from '../../components/SocialLinks'

export default function StripFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const strip = boutique.media.work.slice(0, 6)

  return (
    <footer className="bg-light pb-10 text-ink">
      {strip.length > 0 && (
        <div className="grid grid-cols-3 gap-1 md:grid-cols-6" aria-hidden="true">
          {strip.map((file) => (
            <div key={file} className="aspect-square overflow-hidden bg-paper">
              <Media file={file} alt="" />
            </div>
          ))}
        </div>
      )}
      <div className="mx-auto max-w-[1200px] px-5 pt-14 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <Link to={href('')} className="flex min-w-0 items-center gap-3">
            <Logo className="h-11 w-11 shrink-0" />
            <span className="line-clamp-2 font-display text-xl text-primary-ink">{boutique.brand.name}</span>
          </Link>
          {pages.length > 1 && (
            <nav aria-label="Pages">
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
          <SocialLinks on="light" />
        </div>
        <Credit className="mt-12 justify-between border-t border-ink/10 pt-6" />
      </div>
    </footer>
  )
}
