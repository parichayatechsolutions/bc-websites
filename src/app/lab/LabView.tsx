// src/app/lab/LabView.tsx
// One library component on its own, drawn for one boutique:
//   /lab/<job>/<Name>/<slug>[?font=<pair>]
// The lab shows it in phone and desktop frames; opened directly it's a normal
// page, so `npm run shots -- lab/hero/ArchHero/sample-boutique` screenshots it.
//
// The component gets what a real site gives it: the boutique, its colours, a
// font pair (its design's, unless ?font= names another), smooth scroll and a
// page list for navigation and footers. Plain space before or after it gives
// pinned and scroll-driven components room to play.

import { useEffect, useState, type ComponentType } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import * as catalog from '../../sections'
import { designFor, loadDesign } from '../../designs'
import SmoothScroll from '../../motion/SmoothScroll'
import { FONTS, type IFontPair } from '../../theme/fonts'
import { themeStyle } from '../../theme/theme'
import type { BoutiqueConfig } from '../../types/boutique'
import { BoutiqueProvider } from '../BoutiqueContext'
import { loadBoutique } from '../registry'
import { makeHref, SiteProvider, type INav, type IPage } from '../SiteContext'

const HOME: IPage = { path: '', label: 'Home', overlay: true, element: null }
const ABOUT: IPage = { path: 'about', label: 'About us', intro: 'Who we are, who stitches your clothes, and how a piece is made.', element: null }
const CONTACT: IPage = { path: 'contact', label: 'Contact us', intro: 'Come and see us at the store, or tell us what you need on WhatsApp.', element: null }

// The lab's address matches no page, so components see the first page as the
// current one. Page headers belong on inner pages, so for them that's About.
const pagesFor = (job: string): IPage[] => (job === 'header' ? [{ ...ABOUT, path: '' }, CONTACT] : [HOME, ABOUT, CONTACT])

const isFont = (key: string | null): key is keyof typeof FONTS => Boolean(key && key in FONTS)

export default function LabView() {
  const { job = '', name = '', slug = '' } = useParams()
  const [search] = useSearchParams()
  const fontKey = search.get('font')
  const [loaded, setLoaded] = useState<{ boutique: BoutiqueConfig | null; fonts: IFontPair } | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([loadBoutique(slug), isFont(fontKey) ? null : loadDesign(designFor(slug))]).then(([boutique, design]) => {
      if (!cancelled) setLoaded({ boutique, fonts: isFont(fontKey) ? FONTS[fontKey] : (design?.fonts ?? FONTS.rozhaMukta) })
    })
    return () => {
      cancelled = true
    }
  }, [slug, fontKey])

  useEffect(() => {
    if (!loaded) return
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = loaded.fonts.href
    document.head.appendChild(link)
    document.title = `${name} · ${slug} · lab`
    return () => link.remove()
  }, [loaded, name, slug])

  const Component = (catalog as Record<string, unknown>)[name] as (ComponentType & INav) | undefined

  if (!loaded) return <div className="min-h-screen bg-white" />
  if (!loaded.boutique) return <Problem text={`No boutique called "${slug}". Run: npm run config -- ${slug}`} />
  if (!Component || typeof Component !== 'function') return <Problem text={`src/sections/index.ts doesn't export "${name}".`} />

  const base = `/${slug}`
  const space = <Space label={`End of ${name}`} />

  return (
    <BoutiqueProvider boutique={loaded.boutique} base={base}>
      <div className="boutique" style={themeStyle(loaded.boutique.brand.colors, loaded.fonts)}>
        <SmoothScroll>
          <SiteProvider value={{ pages: pagesFor(job), href: makeHref(base) }}>
            <div data-nav={Component.floating ? 'floating' : 'in-flow'}>
              {job === 'footer' && space}
              <Component />
              {/* A floating navigation is drawn for a dark hero under it. */}
              {Component.floating && <div className="h-screen bg-dark" />}
              {job !== 'footer' && space}
            </div>
          </SiteProvider>
        </SmoothScroll>
      </div>
    </BoutiqueProvider>
  )
}

function Space({ label }: { label: string }) {
  return (
    <div className="grid min-h-[150vh] place-items-center bg-light">
      <p className="t-small text-muted">{label}</p>
    </div>
  )
}

function Problem({ text }: { text: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#faf7f2] px-5 text-center font-app text-neutral-900">
      <p className="max-w-[44ch] text-neutral-600">{text}</p>
    </main>
  )
}
