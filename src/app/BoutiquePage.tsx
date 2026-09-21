// src/app/BoutiquePage.tsx
// The route for one boutique: loads its config (data) and Site.tsx (page),
// applies its colours and fonts, and renders the page.

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { BoutiqueConfig } from '../types/boutique'
import { themeStyle } from '../theme/theme'
import SmoothScroll from '../motion/SmoothScroll'
import { BoutiqueProvider } from './BoutiqueContext'
import { loadBoutique, loadSite, photoUrl, type ISite } from './registry'

type IState =
  | { status: 'loading' }
  | { status: 'missing'; reason: string }
  | { status: 'ready'; boutique: BoutiqueConfig; site: ISite }

export default function BoutiquePage({ slug: fixedSlug }: { slug?: string }) {
  const params = useParams()
  const slug = fixedSlug ?? params.slug ?? ''
  const [state, setState] = useState<IState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    Promise.all([loadBoutique(slug), loadSite(slug)]).then(([boutique, site]) => {
      if (cancelled) return
      if (!boutique) setState({ status: 'missing', reason: `src/sites/${slug}/ has no config.ts. Run: npm run config -- ${slug}` })
      else if (!site) setState({ status: 'missing', reason: `src/sites/${slug}/ has no Site.tsx. Copy the one from src/sites/_template/.` })
      else setState({ status: 'ready', boutique, site })
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  const ready = state.status === 'ready' ? state : null

  // Search visibility, fonts and tab icon live in <head>, outside React's tree.
  // The tab title is set per page by SiteShell.
  useEffect(() => {
    if (!ready) return
    const { boutique, site } = ready
    const robots = document.querySelector('meta[name="robots"]')
    robots?.setAttribute('content', boutique.demo.noindex ? 'noindex, nofollow' : 'index, follow')

    const fonts = document.createElement('link')
    fonts.rel = 'stylesheet'
    fonts.href = site.fonts.href
    document.head.appendChild(fonts)

    const icon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    const defaultIcon = icon?.href
    const logo = photoUrl(boutique.slug, boutique.brand.logo)
    if (icon && logo) icon.href = logo

    return () => {
      fonts.remove()
      if (icon && defaultIcon) icon.href = defaultIcon
    }
  }, [ready])

  if (state.status === 'loading') return <div className="min-h-screen bg-white" />

  if (state.status === 'missing') {
    return (
      <main className="grid min-h-screen place-items-center bg-white px-5 text-center font-sans text-neutral-900">
        <div>
          <h1 className="text-2xl font-semibold">No site at /{slug} yet</h1>
          <p className="mt-2 text-neutral-600">{state.reason}</p>
          <Link to="/" className="mt-6 inline-block underline">
            See all demos
          </Link>
        </div>
      </main>
    )
  }

  const { boutique, site } = state
  const Site = site.default
  return (
    <BoutiqueProvider boutique={boutique} base={fixedSlug ? '' : `/${slug}`}>
      <div className="boutique" style={themeStyle(boutique.brand.colors, site.fonts)}>
        <SmoothScroll>
          <Site />
        </SmoothScroll>
      </div>
    </BoutiqueProvider>
  )
}
