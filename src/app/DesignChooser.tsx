// src/app/DesignChooser.tsx
// One boutique, in every design we have. Each card is the real site running
// at a desktop width and scaled down, so what the owner sees on the card is
// exactly what opens when they tap it. Opening a card goes to
// /<slug>/d/<design>, which is a working site they can be sent a link to.

import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { DESIGNS, designFor, type IDesignMeta } from '../designs'
import { DIRECTORY } from './directory-data'

// The width the preview is rendered at before it's scaled down: a laptop, so
// the desktop layout is what's shown rather than the phone one.
const PREVIEW = { width: 1440, height: 900 }

export default function DesignChooser() {
  const { slug = '' } = useParams()
  const boutique = DIRECTORY.find((b) => b.slug === slug)
  const theirs = designFor(slug)

  useEffect(() => {
    document.title = boutique ? `${boutique.name} · designs` : 'Designs'
  }, [boutique])

  if (!boutique) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#faf7f2] px-5 text-center font-app text-neutral-900">
        <div>
          <h1 className="font-app-display text-4xl tracking-tight">No boutique called "{slug}"</h1>
          <Link to="/" className="mt-6 inline-block underline underline-offset-4">
            See all boutiques
          </Link>
        </div>
      </main>
    )
  }

  const place = boutique.places[0]

  return (
    <main className="min-h-screen bg-[#faf7f2] px-5 py-14 font-app text-neutral-900 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        <Link to="/" className="text-neutral-500 underline underline-offset-4 transition-colors duration-200 hover:text-neutral-900">
          ← All boutiques
        </Link>

        <header className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="font-app-display text-5xl leading-[1.05] tracking-tight md:text-6xl">{boutique.name}</h1>
            {place && (
              <p className="mt-3 text-lg text-neutral-600">
                {place.area}, {place.city} {place.pincode}
              </p>
            )}
            <p className="mt-5 text-lg text-neutral-600">
              The same boutique — their name, colours, work and words — drawn {DESIGNS.length} different ways. Open one
              to walk through the whole site.
            </p>
          </div>
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-8 w-8 rounded-full" style={{ background: boutique.colors.primary }} />
            <span className="h-8 w-8 rounded-full" style={{ background: boutique.colors.accent }} />
          </span>
        </header>

        <ul className="mt-14 grid gap-8 md:grid-cols-2">
          {DESIGNS.map((design) => (
            <li key={design.id}>
              <DesignCard slug={slug} design={design} theirs={design.id === theirs} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}

function DesignCard({ slug, design, theirs }: { slug: string; design: IDesignMeta; theirs: boolean }) {
  return (
    <Link
      to={`/${slug}/d/${design.id}`}
      className="group block rounded-2xl border border-neutral-900/10 bg-white p-4 transition-colors duration-200 hover:border-neutral-900/30"
    >
      <Preview src={`/${slug}/d/${design.id}`} />

      <div className="flex items-start justify-between gap-4 px-2 pb-1 pt-5">
        <div>
          <h2 className="font-app-display text-2xl font-medium leading-[1.15] tracking-tight">
            <span className="underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-neutral-900">
              {design.name}
            </span>
          </h2>
          <p className="mt-2 max-w-[46ch] text-neutral-600">{design.description}</p>
        </div>
        {theirs && (
          <span className="shrink-0 rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">Their site</span>
        )}
      </div>
    </Link>
  )
}

/**
 * The live site at laptop width, scaled to fit the card. It's the real page,
 * not a screenshot, so it can never show a design we've since changed.
 */
function Preview({ src }: { src: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const element = box.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / PREVIEW.width))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={box} className="relative aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100">
      {scale > 0 && (
        <iframe
          src={src}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          loading="lazy"
          scrolling="no"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{ width: PREVIEW.width, height: PREVIEW.height, transform: `scale(${scale})` }}
        />
      )}
    </div>
  )
}
