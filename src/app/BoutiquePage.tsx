// src/app/BoutiquePage.tsx
// The route for one boutique: loads its details (config.ts) and the design its
// page is drawn in (src/designs/), applies its colours and fonts, and renders
// the page.
//
// Which design: the one named in the address (/<slug>/d/<design>, used by the
// card wall) or, on the boutique's own address, the one settled for it in
// src/designs/catalog.ts.

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { BoutiqueConfig } from '../types/boutique'
import { designFor, isDesign, loadDesign, type IDesignModule } from '../designs'
import { themeStyle } from '../theme/theme'
import SmoothScroll from '../motion/SmoothScroll'
import { BoutiqueProvider } from './BoutiqueContext'
import { loadBoutique, photoUrl } from './registry'

type IState =
  | { status: 'loading' }
  | { status: 'missing'; reason: string }
  | { status: 'ready'; boutique: BoutiqueConfig; design: IDesignModule }

export default function BoutiquePage({ slug: fixedSlug }: { slug?: string }) {
  const params = useParams()
  const slug = fixedSlug ?? params.slug ?? ''
  const asked = params.design
  const design = isDesign(asked) ? asked : designFor(slug)
  const [state, setState] = useState<IState>({ status: 'loading' })

  useEffect(() => {
    let cancelled = false
    Promise.all([loadBoutique(slug), loadDesign(design)]).then(([boutique, module]) => {
      if (cancelled) return
      if (!boutique) setState({ status: 'missing', reason: `src/sites/${slug}/ has no config.ts. Run: npm run config -- ${slug}` })
      else if (!module) setState({ status: 'missing', reason: `There is no design called "${design}" in src/designs/.` })
      else setState({ status: 'ready', boutique, design: module })
    })
    return () => {
      cancelled = true
    }
  }, [slug, design])

  const ready = state.status === 'ready' ? state : null

  // Search visibility, fonts and tab icon live in <head>, outside React's tree.
  // The tab title is set per page by SiteShell.
  useEffect(() => {
    if (!ready) return
    const { boutique, design: module } = ready
    const robots = document.querySelector('meta[name="robots"]')
    robots?.setAttribute('content', boutique.demo.noindex ? 'noindex, nofollow' : 'index, follow')

    const fonts = document.createElement('link')
    fonts.rel = 'stylesheet'
    fonts.href = module.fonts.href
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
      <main className="grid min-h-screen place-items-center bg-[#faf7f2] px-5 text-center font-app text-neutral-900">
        <div>
          <h1 className="font-app-display text-4xl tracking-tight">No site at /{slug} yet</h1>
          <p className="mt-2 text-neutral-600">{state.reason}</p>
          <Link to="/" className="mt-6 inline-block underline">
            See all demos
          </Link>
        </div>
      </main>
    )
  }

  const { boutique, design: module } = state
  const Design = module.default
  // Links inside the site stay on whichever address the visitor arrived at:
  // its own domain, its demo address, or one design's preview.
  const base = fixedSlug ? '' : isDesign(asked) ? `/${slug}/d/${asked}` : `/${slug}`

  return (
    <BoutiqueProvider boutique={boutique} base={base}>
      <div className="boutique" style={themeStyle(boutique.brand.colors, module.fonts)}>
        <SmoothScroll>
          <Design />
        </SmoothScroll>
      </div>
    </BoutiqueProvider>
  )
}
