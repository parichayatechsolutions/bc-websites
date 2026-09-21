// src/app/SiteContext.tsx
// The pages of the boutique's site, for navigation, footers and any component
// that links between pages. Filled in by SiteShell from the boutique's Site.tsx.

import { createContext, useContext, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export interface IPage {
  /** '' for the home page, otherwise one lowercase word: 'about', 'contact'. */
  path: string
  /** Name in the navigation, and the heading of PageHeader. */
  label: string
  /** One or two sentences under the heading of PageHeader. */
  intro?: string
  /**
   * The page opens with a full-screen dark hero, so a floating navigation can
   * sit on top of it, light on dark. Leave out for pages that start on the
   * light background.
   */
  overlay?: boolean
  element: ReactNode
}

interface ISiteContext {
  pages: IPage[]
  /** Link for a page path, correct in both demo (/<slug>/about) and live (/about) builds. */
  href: (path: string) => string
}

const SiteContext = createContext<ISiteContext>({ pages: [], href: (p) => `/${p}` })

export const SiteProvider = SiteContext.Provider

export function useSite() {
  const site = useContext(SiteContext)
  const { pathname } = useLocation()
  const current =
    site.pages.find((p) => p.path && site.href(p.path) === pathname.replace(/\/$/, '')) ??
    site.pages.find((p) => p.path === '')
  const find = (path: string) => site.pages.find((p) => p.path === path)
  return { ...site, current, find }
}

/** Joins the site's base ('' or '/<slug>') and a page path into a link. */
export function makeHref(base: string) {
  return (path: string) => [base, path].filter(Boolean).join('/') || '/'
}
