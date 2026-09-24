// src/sections/gallery/CategoryGrid.tsx
// The lookbook: everything a boutique makes, hung in an uneven grid on a
// ground warmed by their own brand colour, bounded top and bottom by a zari
// border. Categories come from the photo file names (work-bridal-01.jpg),
// never from the boutique's ticked service groups — those come out identical
// for every boutique, and identical categories would make five hundred
// identical grids.
//
// Motion, in two parts. The signature: choosing a category re-lays the grid,
// each piece travelling from where it was to where it now belongs. And
// underneath it, each column's photographs drift at a slightly different rate
// as the page scrolls, so the wall breathes instead of sitting still. Nothing
// pins, and no card fades up on its way in.
//
// Missing data: no categories in the file names hides the rail and shows
// everything as one set; no captions leaves the photographs to stand alone.

import { useLayoutEffect, useRef, useState } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import { photoCategories, photoCategory } from '../../app/photos'
import Media from '../../components/Media'
import { DURATION, EASE, Flip, gsap, MEDIA, SCRUB, useGSAP } from '../../motion/gsap'

const ALL = 'All'

// Heights repeat on a seven-cycle against two- and three-column grids, so no
// two columns ever line up and the wall reads as a hang, not a spreadsheet.
const SHAPES = ['aspect-[3/4]', 'aspect-[4/5]', 'aspect-square', 'aspect-[5/6]', 'aspect-[3/4]', 'aspect-[4/5]', 'aspect-square']

export default function CategoryGrid() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLDivElement>(null)
  const before = useRef<ReturnType<typeof Flip.getState> | null>(null)
  const [shown, setShown] = useState(ALL)

  const work = boutique.media.work
  const captions = boutique.media.captions ?? {}
  const kinds = photoCategories(work)
  const rail = kinds.length > 1 ? [ALL, ...kinds] : []

  const pieces = work.map((file, i) => ({
    file,
    kind: photoCategory(file),
    caption: captions[file],
    shape: SHAPES[i % SHAPES.length],
    // The first piece gets the temple arch, once, so the wall is unmistakably
    // a boutique's rather than a gallery's.
    arch: i === 0,
  }))

  function choose(next: string) {
    if (next === shown) return
    const moving = root.current?.querySelectorAll<HTMLElement>('[data-piece]')
    if (moving && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      before.current = Flip.getState(moving)
    }
    setShown(next)
  }

  useLayoutEffect(() => {
    const state = before.current
    before.current = null
    if (!state) return
    Flip.from(state, {
      duration: DURATION.base,
      ease: EASE.settle,
      absolute: true,
      scale: true,
      onEnter: (added) => gsap.fromTo(added, { autoAlpha: 0 }, { autoAlpha: 1, duration: DURATION.quick }),
      onLeave: (gone) => gsap.to(gone, { autoAlpha: 0, duration: DURATION.quick }),
    })
  }, [shown])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MEDIA.motion} and ${MEDIA.desktop}`, () => {
        // Each photograph drifts inside its own frame, by a different amount
        // per column, so the wall is never quite still while you read it.
        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((image, i) => {
          gsap.fromTo(
            image,
            { yPercent: -4 - (i % 3) * 1.5 },
            {
              yPercent: 4 + (i % 3) * 1.5,
              ease: EASE.scroll,
              scrollTrigger: { trigger: image.parentElement, start: 'top bottom', end: 'bottom top', scrub: SCRUB.soft },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root, dependencies: [shown] },
  )

  if (!work.length) return null

  return (
    <section className="section bg-paper">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
          <h2 className="t-1">Their work</h2>
          <p className="t-small text-muted">
            {work.length} {work.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        <div className="zari mt-8" aria-hidden="true" />

        {rail.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3" role="group" aria-label="Filter by kind">
            {rail.map((kind) => (
              <button
                key={kind}
                type="button"
                onClick={() => choose(kind)}
                aria-pressed={kind === shown}
                className={`link-stitch t-3 cursor-pointer pb-1 transition-colors duration-200 ease-stitch ${
                  kind === shown ? 'is-current text-primary-ink' : 'is-quiet text-muted hover:text-ink'
                }`}
              >
                {kind}
              </button>
            ))}
          </div>
        )}

        <div ref={root} className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-14 md:grid-cols-3 md:gap-x-7 md:gap-y-14">
          {pieces.map(({ file, kind, caption, shape, arch }) =>
            shown === ALL || kind === shown ? (
              <figure key={file} data-piece className="group">
                <div className={`relative overflow-hidden ${shape} ${arch ? 'arch' : ''}`}>
                  <div data-drift className="absolute inset-x-0 top-[-8%] h-[116%] transition-transform duration-700 ease-stitch group-hover:scale-[1.04]">
                    <Media file={file} alt={caption ?? `${boutique.brand.name}, finished work`} />
                  </div>
                </div>
                {caption && (
                  <figcaption className="mt-3">
                    <span className="t-small text-ink">{caption}</span>
                  </figcaption>
                )}
              </figure>
            ) : null,
          )}
        </div>

        <div className="zari mt-16" aria-hidden="true" />
      </div>
    </section>
  )
}
