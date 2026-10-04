// src/sections/gallery/LightboxGallery.tsx
// An even grid of their work; tapping any photo opens it large with its
// note, previous and next, and a way to ask about it. The plain gallery
// people expect. (Lab: gallery N, "Lightbox grid".)
//
// The viewer is a native <dialog>: it traps focus, closes on Escape, and
// returns focus to the photo that opened it. Arrow keys step through.
// The page behind stops scrolling while it's open. Hides without photos.
//
// No scroll motion. Photos breathe on hover, as every photo does.

import { useEffect, useRef, useState } from 'react'
import { IconBrandWhatsapp, IconChevronLeft, IconChevronRight, IconX } from '@tabler/icons-react'
import { useBoutique, whatsappLink } from '../../app/BoutiqueContext'
import Button from '../../components/Button'
import Media from '../../components/Media'
import { useLenis } from '../../motion/SmoothScroll'

const ROUND =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-light/10 text-light transition-[background-color,translate] duration-300 ease-stitch hover:-translate-y-1 hover:bg-light/20 active:translate-y-0'

export default function LightboxGallery() {
  const { boutique } = useBoutique()
  const lenis = useLenis()
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState<number | null>(null)
  const work = boutique.media.work
  const captions = boutique.media.captions ?? {}

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (open !== null && !el.open) {
      el.showModal()
      lenis?.stop()
    } else if (open === null && el.open) {
      el.close()
    }
  }, [open, lenis])

  if (!work.length) return null

  const step = (by: number) => setOpen((i) => (i === null ? i : (i + by + work.length) % work.length))
  const file = open === null ? undefined : work[open]
  const note = file ? captions[file] : undefined

  return (
    <section id="work" className="section">
      <div className="wrap">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="t-1">Our work</h2>
          <p className="text-muted">Tap a photo to see it large.</p>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4 md:gap-2">
          {work.map((f, i) => (
            <li key={f}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Open ${captions[f] ?? `photo ${i + 1}`}`}
                className="group block aspect-square w-full cursor-pointer overflow-hidden bg-paper"
              >
                <Media file={f} alt="" className="transition-transform duration-700 ease-stitch group-hover:scale-[1.04]" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialog}
        aria-label="Photo viewer"
        onClose={() => {
          setOpen(null)
          lenis?.start()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        className="m-0 h-full max-h-none w-full max-w-none bg-dark p-0 text-light backdrop:bg-dark"
      >
        {file && (
          <div className="flex h-full flex-col gap-4 p-4 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <p className="t-small text-light/70" aria-live="polite">
                {open! + 1} of {work.length}
              </p>
              <button type="button" onClick={() => setOpen(null)} aria-label="Close" className={ROUND}>
                <IconX size={22} stroke={1.5} aria-hidden="true" />
              </button>
            </div>

            <div className="relative min-h-0 flex-1">
              <Media key={file} file={file} alt={note ?? ''} className="object-contain!" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={ROUND}>
                  <IconChevronLeft size={22} stroke={1.5} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className={ROUND}>
                  <IconChevronRight size={22} stroke={1.5} aria-hidden="true" />
                </button>
              </div>
              {note && <p className="order-first w-full text-light/85 md:order-none md:w-auto md:flex-1">{note}</p>}
              <Button
                href={whatsappLink(boutique, `Hi ${boutique.brand.name}, I'd like something like this: ${note ?? `photo ${open! + 1} on your website`}.`)}
                icon={IconBrandWhatsapp}
              >
                Ask about this piece
              </Button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
