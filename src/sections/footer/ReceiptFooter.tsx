// src/sections/footer/ReceiptFooter.tsx
// The page ends on a slip from the shop's bill book: their name and
// branches at the top, the pages as its lines, the number and WhatsApp at
// the foot, with a torn edge, laid on a dark ground with the credit
// beneath. (Lab: footer R, "Receipt".)
//
// Branches up to three on the slip. No motion.

import { Link } from 'react-router-dom'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { telLink, useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { useSite } from '../../app/SiteContext'
import Credit from '../../components/Credit'
import Logo from '../../components/Logo'

// A torn foot: small teeth along the bottom edge.
const TORN = `polygon(0 0, 100% 0, 100% 97%, ${Array.from({ length: 20 }, (_, i) => `${100 - (i + 0.5) * 5}% ${i % 2 ? 97 : 100}%`).join(', ')}, 0 97%)`

export default function ReceiptFooter() {
  const { boutique } = useBoutique()
  const { pages, href } = useSite()
  const branches = boutique.branches.slice(0, 3)

  return (
    <footer className="bg-dark px-5 pt-16 pb-10 text-light">
      <div className="mx-auto max-w-sm bg-light px-7 pt-8 pb-12 text-ink" style={{ clipPath: TORN }}>
        <div className="flex flex-col items-center border-b-2 border-dashed border-ink/30 pb-5 text-center">
          <Logo className="h-12 w-12" />
          <p className="t-3 mt-3 text-primary-ink">{boutique.brand.name}</p>
          {branches.map((b) => (
            <p key={b.name + b.address} className="t-small mt-1 text-muted">
              {b.address}, {b.city}
            </p>
          ))}
        </div>
        {pages.length > 1 && (
          <nav aria-label="Pages">
            <ul className="border-b-2 border-dashed border-ink/30 py-3">
              {pages.map((p) => (
                <li key={p.path}>
                  <Link to={href(p.path)} className="flex min-h-10 items-center justify-between gap-4 hover:text-primary-ink">
                    <span className="link-stitch is-quiet">{p.label}</span>
                    <span aria-hidden="true" className="text-muted">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="space-y-1 pt-4">
          <a href={telLink(boutique.contact.phone)} className="flex min-h-10 items-center justify-between gap-4">
            <span>Phone</span>
            <span className="link-stitch font-semibold tabular-nums">{boutique.contact.phone}</span>
          </a>
          <a href={whatsappLink(boutique)} target="_blank" rel="noopener noreferrer" className="flex min-h-10 items-center justify-between gap-4">
            <span>WhatsApp</span>
            <span className="inline-flex items-center gap-2 font-semibold text-primary-ink">
              <IconBrandWhatsapp size={18} stroke={1.75} aria-hidden="true" />
              <span className="link-stitch">Chat with us</span>
            </span>
          </a>
        </div>
      </div>
      <Credit className="mx-auto mt-12 max-w-[1200px] justify-center text-center" />
    </footer>
  )
}
