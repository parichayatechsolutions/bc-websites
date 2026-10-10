// src/sections/gallery/FeatureGallery.tsx
// One piece large, with its note and a button to ask about that exact piece
// on WhatsApp; the rest as thumbnails underneath to pick from. For the
// customer who has seen something she wants. (Lab: gallery C, "Feature +
// strip".)
//
// The thumbnails wrap into rows rather than scrolling sideways. Hides
// without work photos.
//
// Motion: the large photo uncovers once as it comes into view; picking a
// thumbnail swaps it with a CSS fade. Reduced motion: no uncovering.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'
import { getPieceDetails } from './pieceDetails'

export default function FeatureGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)
  const rawWork = boutique.media.work
  const work = rawWork.length > 0 ? rawWork : [boutique.media.hero.src]

  useMotion(root, () => {
    wipe('[data-feature]', { trigger: root.current })
  })

  if (!work.length) return null
  const file = work[index] ?? work[0]
  const piece = getPieceDetails(file, boutique)
  const ask = whatsappLink(
    boutique,
    `Hi ${boutique.brand.name}, I saw the "${piece.title}" on your website and would like to inquire about getting something similar custom stitched.`,
  )

  return (
    <section
      ref={root}
      id="work"
      className="relative overflow-hidden py-16 md:py-24 border-t border-b border-accent/20 bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(253, 251, 247, 0.78), rgba(246, 240, 232, 0.85)), url('/botanical-luxe-bg.jpg')",
      }}
    >
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="t-1">Our work</h2>
          {work.length > 1 && (
            <p className="text-muted" aria-live="polite">
              {index + 1} of {work.length}
            </p>
          )}
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
          <div data-feature className="arch aspect-[4/5] w-full bg-paper md:col-span-6">
            <Media key={file} file={file} alt={piece.title} className="animate-[fade-in_700ms_var(--ease-stitch)]" />
          </div>
          <div key={file} className="animate-[fade-in_500ms_var(--ease-stitch)] md:col-span-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-block rounded-full bg-primary-ink/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-ink">
                {piece.category}
              </span>
              <span className="inline-block rounded-full border border-ink/15 px-3 py-1 text-xs font-medium text-muted">
                {piece.timeline}
              </span>
            </div>

            <h3 className="t-2 mt-3 font-display text-ink leading-tight">
              {piece.title}
            </h3>

            <p className="mt-3 text-base leading-relaxed text-muted">
              {piece.description}
            </p>

            <div className="mt-5 rounded-xl border border-ink/10 bg-paper/70 p-4 sm:p-5">
              <dl className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Handwork</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink">{piece.handwork}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Cut & Silhouette</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink">{piece.silhouette}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Ideal For</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink">{piece.occasion}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">Fabric Base</dt>
                  <dd className="mt-0.5 text-sm font-medium text-ink">{piece.fabric}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {piece.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-ink/5 px-2.5 py-0.5 text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <Button href={ask} variant="primary" icon={IconBrandWhatsapp}>
                Ask about this piece
              </Button>
              <span className="text-xs text-muted max-w-[28ch]">
                Send your reference or saree photo to customize this design.
              </span>
            </div>
          </div>
        </div>

        {work.length > 1 && (
          <div className="mt-10">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">
                Click any piece below to view details ({work.length} designs)
              </span>
              <span className="text-xs font-medium text-ink/80" aria-live="polite">
                Showing {index + 1} of {work.length}
              </span>
            </div>
            <ul data-gallery-strip className="grid grid-cols-5 gap-1.5 md:grid-cols-10 md:gap-2" aria-label="Choose a piece">
              {work.map((f, i) => {
                const itemPiece = getPieceDetails(f, boutique)
                const isSelected = i === index
                return (
                  <li key={f}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-pressed={isSelected}
                      title={itemPiece.title}
                      aria-label={`${itemPiece.title} (${i + 1} of ${work.length})`}
                      className={`group block aspect-square w-full cursor-pointer overflow-hidden rounded bg-paper transition-all duration-200 ease-stitch ${
                        isSelected
                          ? 'opacity-100 ring-2 ring-primary-ink ring-offset-2 ring-offset-paper scale-[1.03]'
                          : 'opacity-60 hover:opacity-100 hover:scale-[1.02]'
                      }`}
                    >
                      <Media file={f} alt="" className="h-full w-full object-cover transition-transform duration-700 ease-stitch group-hover:scale-105" />
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
