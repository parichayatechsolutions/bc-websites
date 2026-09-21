// src/sections/gallery/RailGallery.tsx
// Their finished work, on the brand's primary colour. On desktop the section
// pins and scrolling down slides the pieces sideways, each photo drifting
// inside its frame. On phones it's a swipeable row, which suits touch better
// than a pinned track.

import { useRef } from 'react'
import { useBoutique } from '../../app/BoutiqueContext'
import Media from '../../components/Media'
import { EASE, gsap, MEDIA, SCRUB, useGSAP } from '../../motion/gsap'

// Frames alternate so the row reads like a hanging rail, not a grid.
// Phones get one size; the arches carry through.
const FRAMES = [
  'arch md:h-[62vh] md:w-[40vh]',
  'md:h-[48vh] md:w-[38vh] md:self-end',
  'arch md:h-[56vh] md:w-[42vh] md:self-center',
  'md:h-[64vh] md:w-[46vh]',
  'md:h-[46vh] md:w-[36vh] md:self-end',
]

export default function RailGallery() {
  const { boutique } = useBoutique()
  const root = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const { featured } = boutique.services
  const work = boutique.media.work

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(`${MEDIA.motion} and ${MEDIA.desktop}`, () => {
        const rail = track.current!
        const distance = () => rail.scrollWidth - window.innerWidth

        const slide = gsap.to(rail, {
          x: () => -distance(),
          ease: EASE.scroll,
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: SCRUB.soft,
            invalidateOnRefresh: true,
          },
        })

        gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -8 },
            {
              xPercent: 8,
              ease: EASE.scroll,
              scrollTrigger: {
                trigger: img.parentElement,
                containerAnimation: slide,
                start: 'left right',
                end: 'right left',
                scrub: SCRUB.exact,
              },
            },
          )
        })
      })
      return () => mm.revert()
    },
    { scope: root },
  )

  if (!work.length) return null

  return (
    <section ref={root} className="overflow-hidden bg-primary text-on-primary">
      <div
        ref={track}
        className="flex h-auto snap-x snap-mandatory scroll-px-5 items-stretch gap-6 overflow-x-auto px-5 py-20 md:h-[100svh] md:snap-none md:gap-16 md:overflow-visible md:px-[8vw] md:py-[12vh] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-center md:w-[34vw]">
          <h2 className="t-1 text-balance">Known for</h2>
          <ul className="mt-8 space-y-3">
            {featured.map((item) => (
              <li key={item} className="t-3 opacity-90">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {work.map((file, i) => (
          <figure
            key={file}
            className={`group relative h-[52vh] w-[72vw] shrink-0 snap-center overflow-hidden ${FRAMES[i % FRAMES.length]}`}
          >
            <div data-drift className="absolute inset-y-0 -left-[10%] w-[120%]">
              <div className="h-full w-full transition-transform duration-700 ease-stitch group-hover:scale-[1.04]">
                <Media file={file} alt={`${boutique.brand.name}, finished work ${i + 1}`} />
              </div>
            </div>
          </figure>
        ))}

        <div className="w-px shrink-0 md:w-[4vw]" aria-hidden="true" />
      </div>
    </section>
  )
}
