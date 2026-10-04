// src/sections/footer/ThreadFooter.tsx
// The footer's top edge is a running stitch sewn right across the page,
// with a needle at its end; beneath it the name, contacts, pages and
// credit on paper. (Lab: footer V, "Thread edge".)
//
// Motion: the stitch sews itself across once as the footer comes into
// view. Reduced motion: already sewn.

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { IconNeedle } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'
import { draw } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function ThreadFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const root = useRef<HTMLElement>(null)
  const branch = boutique.branches[0]

  useMotion(root, () => {
    draw('[data-thread]', { trigger: root.current, from: 'start' })
  })

  return (
    <footer ref={root} className="bg-paper pb-10 text-ink">
      <div data-thread aria-hidden="true" className="flex items-center pt-6">
        <span className="flex-1 border-t-2 border-dashed border-thread" />
        <IconNeedle size={20} stroke={1.75} className="-ml-1 mr-4 shrink-0 rotate-45 text-thread" />
      </div>
      <div className="mx-auto max-w-[1200px] px-5 pt-12 md:px-10">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="flex items-center gap-4 md:col-span-5">
            <Logo className="h-12 w-12 shrink-0" />
            <p className="t-2 text-balance text-primary-ink">{boutique.brand.name}</p>
          </div>
          <div className="space-y-1 md:col-span-4">
            {branch && (
              <p className="text-muted">
                {branch.address}, {branch.city} {branch.pincode}
              </p>
            )}
            <p>
              <a href={telLink(boutique.contact.phone)} className="link-stitch tabular-nums">
                {boutique.contact.phone}
              </a>
              <span className="text-muted"> · </span>
              <a href={whatsappLink(boutique)} target="_blank" rel="noopener noreferrer" className="link-stitch">
                WhatsApp
              </a>
            </p>
          </div>
          {pages.length > 1 && (
            <nav aria-label="Pages" className="md:col-span-3">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:flex-col">
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
        </div>
        <Credit className="mt-12 justify-between border-t border-ink/10 pt-6" />
      </div>
    </footer>
  )
}
