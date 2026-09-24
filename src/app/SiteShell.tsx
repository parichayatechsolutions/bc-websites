// src/app/SiteShell.tsx
// Turns a boutique's Site.tsx into a working site: the chosen navigation on
// top, the page for the current address in the middle, the chosen footer at
// the bottom. Handles what every page change needs: back to the top, the
// browser tab title, and re-measuring scroll animations.

import { useEffect, useLayoutEffect, type ComponentType } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { useLenis } from '../motion/SmoothScroll'
import { ScrollTrigger } from '../motion/gsap'
import { useBoutique } from './BoutiqueContext'
import { SiteProvider, makeHref, useSite, type INav, type IPage } from './SiteContext'

function PageEffects() {
  const { boutique } = useBoutique()
  const { current } = useSite()
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  // New page: start at the top (or at the #section asked for), then let
  // scroll animations measure the new layout.
  useLayoutEffect(() => {
    const target = hash ? document.querySelector<HTMLElement>(hash) : null
    if (lenis) lenis.scrollTo(target ?? 0, { immediate: true, force: true })
    else if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, lenis])

  useEffect(() => {
    const name = boutique.brand.name
    document.title =
      current && current.path
        ? `${current.label} | ${name}`
        : boutique.brand.tagline
          ? `${name} | ${boutique.brand.tagline}`
          : name
  }, [current, boutique])

  return null
}

function PageNotFound({ home }: { home: string }) {
  return (
    <main className="page-top section pt-0">
      <div className="wrap">
        <h1 className="t-1">This page doesn't exist</h1>
        <p className="mt-4 text-muted">The link may be old or mistyped.</p>
        <Link to={home} className="link-stitch mt-8 inline-block">
          Go to the home page
        </Link>
      </div>
    </main>
  )
}

export default function SiteShell({
  nav: Nav,
  footer: Footer,
  pages,
}: {
  nav: INav
  footer: ComponentType
  /** In navigation order. The first is usually Home (path ''). */
  pages: IPage[]
}) {
  const href = makeHref(useBoutique().base)

  return (
    <SiteProvider value={{ pages, href }}>
      <div data-nav={Nav.floating ? 'floating' : 'in-flow'}>
        <PageEffects />
        <Nav />
        <Routes>
          {pages.map((page) =>
            page.path ? (
              <Route key={page.path} path={page.path} element={<main>{page.element}</main>} />
            ) : (
              <Route key="home" index element={<main>{page.element}</main>} />
            ),
          )}
          <Route path="*" element={<PageNotFound home={href('')} />} />
        </Routes>
        <Footer />
      </div>
    </SiteProvider>
  )
}
