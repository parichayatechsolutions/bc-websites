// src/sections/gallery/IndexGallery.tsx
// What they make as a typeset index: one ruled row per kind, a few tiny
// thumbnails on a computer, the count, and a WhatsApp button to ask about
// that kind. Type carries it, so it works with three photos or none.
// (Lab: gallery J, "Index", without its numbers: categories aren't a
// sequence.)
//
// Rows are the photo categories (work-bridal-01.jpg) when there are at
// least two; otherwise the things they're known for, without thumbnails.
// No motion: it's read, not watched.

import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'

export default function IndexGallery() {
  const { boutique } = useBoutique()
  const work = boutique.media.work
  const kinds = photoCategories(work)

  const rows =
    kinds.length > 1
      ? kinds.map((kind) => {
          const files = work.filter((f) => photoCategory(f) === kind)
          return { name: kind, files: files.slice(0, 3), count: files.length }
        })
      : boutique.services.featured.map((name) => ({ name, files: [] as string[], count: 0 }))

  if (!rows.length) return null

  return (
    <section id="work" className="section">
      <div className="wrap">
        <h2 className="t-1">What we make</h2>
        <ul className="mt-12 border-b border-ink/15">
          {rows.map(({ name, files, count }) => (
            <li key={name} className="flex items-center gap-4 border-t border-ink/15 py-5 md:gap-8">
              <span className="t-2 min-w-0 flex-1 break-words">{name}</span>
              {files.length > 0 && (
                <span className="hidden gap-1 md:flex" aria-hidden="true">
                  {files.map((f) => (
                    <span key={f} className="block h-14 w-11 overflow-hidden bg-paper">
                      <Media file={f} alt="" />
                    </span>
                  ))}
                </span>
              )}
              {count > 0 && <span className="t-small shrink-0 text-muted">{count === 1 ? '1 piece' : `${count} pieces`}</span>}
              <a
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like to ask about ${name.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask about ${name} on WhatsApp`}
                title={`Ask about ${name}`}
                className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-ink/25 transition-[background-color,color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-primary-ink hover:text-on-primary-ink active:translate-y-0"
              >
                <IconBrandWhatsapp size={22} stroke={1.5} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
