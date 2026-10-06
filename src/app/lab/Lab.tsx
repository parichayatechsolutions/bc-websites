// src/app/lab/Lab.tsx
// The component lab, only in `npm run dev`, at /lab. Every component in the
// library, drawn for any boutique and font pair, in a phone frame and a
// desktop frame side by side. Use it to build and check a component before
// any design uses it, and to try one boutique's data against every look.
//
// The frames are live pages (/lab/<job>/<Name>/<slug>), so they scroll and
// animate as on a real site. The choice is kept in the address, so a link to
// the lab opens the same component, boutique and fonts.
//
// Only used by our own team, never by a boutique's site.

import { useEffect, useRef, useState } from 'react'
import { IconExternalLink, IconRefresh } from '@tabler/icons-react'
import { useSearchParams } from 'react-router-dom'
import { FONTS } from '../../theme/fonts'
import Dropdown from '../Dropdown'
import { boutiqueSlugs } from '../registry'
import { LAB_ENTRIES, type ILabEntry } from './catalog'

const DEFAULT_SLUG = 'sample-boutique'
const PHONE = { width: 390, height: 844 }
const DESKTOP = { width: 1440, height: 900 }

const keyOf = (entry: ILabEntry) => `${entry.job}/${entry.name}`
const fontName = (key: string) => {
  const pair = FONTS[key as keyof typeof FONTS]
  return pair ? `${pair.display} + ${pair.body}` : key
}

export default function Lab() {
  const [search, setSearch] = useSearchParams()
  const [replay, setReplay] = useState(0)

  const entry = LAB_ENTRIES.find((e) => keyOf(e) === search.get('c')) ?? LAB_ENTRIES[0]
  const asked = search.get('slug') ?? ''
  const slug = boutiqueSlugs.includes(asked) ? asked : DEFAULT_SLUG
  const font = search.get('font') ?? ''

  useEffect(() => {
    if (entry) {
      document.title = `${entry.name} · lab`
    }
  }, [entry])

  const choose = (key: string, value: string) =>
    setSearch(
      (previous) => {
        const next = new URLSearchParams(previous)
        if (value) next.set(key, value)
        else next.delete(key)
        return next
      },
      { replace: true },
    )

  if (!entry) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf7f2] font-app text-neutral-900">
        <p>No components found in the catalog.</p>
      </div>
    )
  }

  const src = `/lab/${entry.job}/${entry.name}/${slug}${font ? `?font=${font}` : ''}`
  const groups = [...new Set(LAB_ENTRIES.map((e) => e.group))]

  return (
    <div className="min-h-screen bg-[#faf7f2] font-app text-neutral-900 md:grid md:grid-cols-[17rem_1fr]">
      <aside className="border-b border-neutral-900/10 px-5 py-6 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:border-b-0 md:border-r">
        <h1 className="font-app-display text-2xl tracking-tight">Component lab</h1>
        <p className="mt-1 text-sm text-neutral-600">
          {LAB_ENTRIES.length} components in src/sections. The full plan is docs/COMPONENTS.md.
        </p>

        <Dropdown
          className="mt-5 md:hidden"
          label="Component"
          value={keyOf(entry)}
          options={LAB_ENTRIES.map(keyOf)}
          display={(key) => key.split('/')[1]}
          onChange={(key) => choose('c', key)}
          anyLabel={LAB_ENTRIES[0]?.name ?? ''}
        />

        <nav className="hidden md:block" aria-label="Components">
          {groups.map((group) => (
            <div key={group} className="mt-6">
              <h2 className="text-sm text-neutral-500">{group}</h2>
              <ul className="mt-1">
                {LAB_ENTRIES.filter((e) => e.group === group).map((e) => (
                  <li key={keyOf(e)}>
                    <button
                      type="button"
                      onClick={() => choose('c', keyOf(e))}
                      aria-current={e === entry ? 'page' : undefined}
                      className="block min-h-11 w-full rounded-lg px-3 text-left transition-colors duration-200 hover:bg-neutral-900/5 aria-[current=page]:bg-neutral-900 aria-[current=page]:text-white"
                    >
                      {e.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 px-5 py-8 md:px-8">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[60ch]">
            <p className="text-sm text-neutral-500">
              {entry.group} · src/sections/{entry.job}/{entry.name}.tsx
            </p>
            <h2 className="mt-1 font-app-display text-3xl tracking-tight">{entry.name}</h2>
            <p className="mt-2 text-neutral-600">{entry.description}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Dropdown
              label="Boutique"
              value={slug === DEFAULT_SLUG ? '' : slug}
              options={boutiqueSlugs.filter((s) => s !== DEFAULT_SLUG)}
              onChange={(value) => choose('slug', value)}
              anyLabel={DEFAULT_SLUG}
            />
            <Dropdown
              label="Fonts"
              value={font}
              options={Object.keys(FONTS)}
              display={fontName}
              onChange={(value) => choose('font', value)}
              anyLabel="Their design's fonts"
            />
            <button
              type="button"
              onClick={() => setReplay((n) => n + 1)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-900/15 bg-white px-4 transition-colors duration-200 hover:border-neutral-900/40"
            >
              <IconRefresh size={18} stroke={1.75} aria-hidden="true" />
              Replay
            </button>
            <a
              href={src}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-neutral-900/15 bg-white px-4 transition-colors duration-200 hover:border-neutral-900/40"
            >
              <IconExternalLink size={18} stroke={1.75} aria-hidden="true" />
              Open alone
            </a>
          </div>
        </header>

        <div className="mt-8 flex flex-col gap-8 xl:flex-row xl:items-start">
          <Frame key={`phone-${src}-${replay}`} label="Phone, 390 wide" size={PHONE} src={src} className="w-full max-w-[390px] shrink-0" />
          <Frame key={`desktop-${src}-${replay}`} label="Desktop, 1440 wide" size={DESKTOP} src={src} className="min-w-0 flex-1" />
        </div>
      </main>
    </div>
  )
}

/**
 * A live page at a real screen size, scaled down to fit its column, so the
 * component lays out exactly as it would on that screen.
 */
function Frame({ label, size, src, className }: { label: string; size: { width: number; height: number }; src: string; className: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const element = box.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / size.width)))
    observer.observe(element)
    return () => observer.disconnect()
  }, [size.width])

  return (
    <figure className={className}>
      <figcaption className="mb-2 text-sm text-neutral-500">{label}</figcaption>
      <div ref={box} className="relative overflow-hidden rounded-xl border border-neutral-900/10 bg-white" style={{ height: size.height * scale || undefined }}>
        {scale > 0 && (
          <iframe
            src={src}
            title={`${label} preview`}
            className="absolute left-0 top-0 origin-top-left border-0"
            style={{ width: size.width, height: size.height, transform: `scale(${scale})` }}
          />
        )}
      </div>
    </figure>
  )
}
