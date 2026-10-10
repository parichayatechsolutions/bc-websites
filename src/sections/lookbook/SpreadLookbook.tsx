// src/sections/lookbook/SpreadLookbook.tsx
// A lookbook told in chapters, one per occasion (haldi, sangeet, wedding,
// reception…): choosing a chapter lays out a magazine spread of one tall
// photo and two smaller, with the note for each. (Lab: look A, "Editorial
// spread".)
//
// Looks come from photos named look-<occasion>-<nn>.jpg, in the order the
// functions happen. Hides without any. Chapters show only when there are
// two or more occasions.
//
// Motion: the spread uncovers once as it comes into view; changing chapter
// swaps the photos with a CSS fade. Reduced motion: no uncovering.

import { useRef, useState } from 'react'
import { IconBrandWhatsapp, IconSparkles } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import { byFunction, photoCategory, photoTag } from '../../app/photos'
import Media from '../../components/Media'
import { wipe } from '../../motion/moves'
import { useMotion } from '../../motion/useMotion'

export default function SpreadLookbook() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const looks = (boutique.media.looks && boutique.media.looks.length > 0)
    ? byFunction(boutique.media.looks, 'look')
    : boutique.media.work
  const captions = boutique.media.captions ?? {}
  const chapters = [...new Set(looks.map((f) => photoTag(f, 'look') ?? photoCategory(f) ?? 'Couture'))]
  const [chapter, setChapter] = useState(chapters[0])

  useMotion(root, () => {
    wipe('[data-spread] > *', { trigger: root.current })
  })

  if (!looks.length) return null
  const shown = looks.filter((f) => (photoTag(f, 'look') ?? photoCategory(f) ?? 'Couture') === chapter).slice(0, 3)
  const [tall, ...small] = shown.length ? shown : looks.slice(0, 3)

  return (
    <section
      ref={root}
      id="lookbook"
      className="relative overflow-hidden bg-gradient-to-b from-[#FAF6EE] via-[#F4EFE6] to-[#FAF6EE] py-20 md:py-28 border-b border-accent/25"
    >
      {/* Background Soft Golden Ambient Glow */}
      <div
        className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-accent/15 blur-3xl opacity-60"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl opacity-50"
        aria-hidden="true"
      />

      <div className="wrap relative z-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-ink/10 pb-8">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-accent">
              <span className="h-[1.5px] w-6 bg-accent" />
              <span>EDITORIAL ARCHIVE</span>
            </div>
            <h2 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-ink">
              The lookbook <span className="italic text-accent font-serif">by occasion</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-muted">
              A curated visual anthology of heirloom wedding silhouettes, festive ensembles, and artisanal couture compositions.
            </p>
          </div>

          <div className="flex items-center gap-2 md:pb-1 text-xs font-mono uppercase tracking-widest text-muted">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-white/70 px-3.5 py-1 text-primary-ink shadow-2xs backdrop-blur-xs">
              <IconSparkles size={13} className="text-accent" />
              <span>HANDCRAFTED EDITIONS</span>
            </span>
          </div>
        </div>

        {/* Occasion Filter Chapters */}
        {chapters.length > 1 && (
          <div className="mt-8 flex flex-wrap items-center gap-2.5" role="group" aria-label="Occasion">
            {chapters.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setChapter(c)}
                aria-pressed={c === chapter}
                className="group inline-flex min-h-10 cursor-pointer items-center gap-2 rounded-full border border-ink/20 bg-white/75 px-5 py-2 text-xs md:text-sm font-medium tracking-wide text-ink backdrop-blur-xs transition-all duration-300 hover:border-accent hover:bg-white hover:text-accent aria-pressed:border-accent aria-pressed:bg-primary-ink aria-pressed:text-on-primary-ink aria-pressed:shadow-md"
              >
                <span>{c}</span>
              </button>
            ))}
          </div>
        )}

        {/* Editorial Spread Cards */}
        <div data-spread className="mt-10 grid gap-6 md:grid-cols-12 md:gap-8">
          {/* Main Tall Feature Card */}
          <figure className={`group relative flex flex-col overflow-hidden rounded-2xl border border-accent/25 bg-white/80 p-3 shadow-lg shadow-ink/5 backdrop-blur-xs transition-all duration-500 hover:border-accent hover:shadow-xl ${small.length ? 'md:col-span-7' : 'md:col-span-8'}`}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-paper">
              <div className="h-full w-full transition-transform duration-700 ease-stitch group-hover:scale-105">
                <Media
                  key={tall}
                  file={tall}
                  alt={captions[tall] ?? chapter}
                  className="h-full w-full object-cover animate-[fade-in_700ms_var(--ease-stitch)]"
                />
              </div>

              {/* Tag overlay */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-black/60 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-amber-200 backdrop-blur-md">
                  <IconSparkles size={11} className="text-amber-300" />
                  <span>{chapter}</span>
                </span>
              </div>

              {/* Inquiry Action Bar */}
              <div className="absolute inset-x-4 bottom-4 z-10 flex items-center justify-between opacity-95 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                <a
                  href={whatsappLink(
                    boutique,
                    `Hi ${boutique.brand.name}, I was browsing your lookbook (${chapter}) and fell in love with this design (${captions[tall] || tall}). Could you tell me about the price and customization options?`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-accent/60 bg-black/85 px-4 py-2 text-xs font-semibold text-white shadow-lg backdrop-blur-md transition-colors hover:bg-accent hover:text-black"
                >
                  <IconBrandWhatsapp size={15} className="text-[#25D366]" />
                  <span>Inquire About This Look</span>
                </a>
              </div>
            </div>

            {captions[tall] && (
              <figcaption className="mt-3.5 px-2 pb-1 text-xs md:text-sm text-ink/80 leading-relaxed font-sans">
                {captions[tall]}
              </figcaption>
            )}
          </figure>

          {/* Secondary Stack Cards */}
          {small.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-5 md:grid-cols-1 md:gap-8">
              {small.map((f) => (
                <figure
                  key={f}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-accent/25 bg-white/80 p-3 shadow-md shadow-ink/5 backdrop-blur-xs transition-all duration-500 hover:border-accent hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-paper">
                    <div className="h-full w-full transition-transform duration-700 ease-stitch group-hover:scale-105">
                      <Media
                        file={f}
                        alt={captions[f] ?? chapter}
                        className="h-full w-full object-cover animate-[fade-in_700ms_var(--ease-stitch)]"
                      />
                    </div>

                    {/* Inquiry button */}
                    <div className="absolute right-3 bottom-3 z-10 opacity-95 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                      <a
                        href={whatsappLink(
                          boutique,
                          `Hi ${boutique.brand.name}, I am interested in this lookbook piece (${captions[f] || f}) from your ${chapter} collection.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-black/80 px-3 py-1.5 text-[11px] font-semibold text-white shadow-md backdrop-blur-md transition-colors hover:bg-accent hover:text-black"
                      >
                        <IconBrandWhatsapp size={14} className="text-[#25D366]" />
                        <span>Inquire</span>
                      </a>
                    </div>
                  </div>

                  {captions[f] && (
                    <figcaption className="mt-2.5 px-2 pb-1 text-xs text-ink/75 leading-relaxed font-sans">
                      {captions[f]}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
