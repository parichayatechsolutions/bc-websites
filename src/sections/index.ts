// src/sections/index.ts
// The component library. Every design in src/designs/ builds its pages from
// these, and every boutique can be shown in every design.
// Folders group components by the job they do; names describe the look, so a
// new variant sits next to its siblings (hero/ArchHero, hero/SplitHero…).
// Add every new component here with a one-line description.

// Site structure: every Design.tsx renders one SiteShell with a nav, a footer and its pages
export { default as SiteShell } from '../app/SiteShell'
export type { IPage } from '../app/SiteContext'

// Navigation (pick one; all have a full-screen menu on phones)
export { default as FloatingNav } from './nav/FloatingNav' // Transparent over a dark hero, solid after it; hides while scrolling down
export { default as BarNav } from './nav/BarNav' // Solid sticky bar: logo left, links and WhatsApp right; works on any page
export { default as CenteredNav } from './nav/CenteredNav' // Phone/city strip on top, logo centred with links either side; formal

// Footer (pick one)
export { default as BrandFooter } from './footer/BrandFooter' // Brand colour, huge name, pages, contact icons
export { default as ColumnsFooter } from './footer/ColumnsFooter' // Dark, four columns: about, pages, branches, contact
export { default as MinimalFooter } from './footer/MinimalFooter' // Light and centred: logo, pages, icons; for pages that end strong

// Page openers
export { default as ArchHero } from './hero/ArchHero' // Name over a temple-arch window that opens to full screen (pinned; page needs overlay)
export { default as VitrineOpener } from './hero/VitrineOpener' // One photograph edge to edge, name small in the corner (not pinned; opens a lookbook)
export { default as SplitHero } from './hero/SplitHero' // Light and editorial: name and invitation left, one tall photo right (not pinned)
export { default as PosterHero } from './hero/PosterHero' // Name framed over a full-bleed photo like a printed invitation (not pinned)
export { default as LedgerHero } from './hero/LedgerHero' // Name across the full width like a masthead, letterbox photo opening under it (not pinned)
export { default as PageHeader } from './header/PageHeader' // Inner-page title and intro from the page definition, no image

// Owner's story
export { default as InkStory } from './story/InkStory' // Owner's words ink in as you read; arch portrait

// Their work
export { default as RailGallery } from './gallery/RailGallery' // "Known for" + work photos sliding sideways on scroll (pinned on desktop)
export { default as CategoryGrid } from './gallery/CategoryGrid' // Lookbook: an uneven grid with a category rail; choosing re-lays the grid (signature motion)
export { default as GridGallery } from './gallery/GridGallery' // Work in two quiet columns that drift at different speeds (not pinned)

// How it's made
export { default as StickyProcess } from './process/StickyProcess' // Five making steps with a photo that follows the active step

// What they stitch
export { default as ColumnServices } from './services/ColumnServices' // Services in grouped columns, optional starting prices
export { default as ListServices } from './services/ListServices' // The same list run full width as ruled rows, group name in the margin

// Reviews
export { default as RatingReviews } from './reviews/RatingReviews' // Google rating with stars, three quotes, stats (dark)
export { default as QuoteReviews } from './reviews/QuoteReviews' // One review set large, the rest beside it, rating as a plain line (light)

// Contact
export { default as WhatsAppForm } from './contact/WhatsAppForm' // Enquiry form that opens WhatsApp with the details written out
export { default as StoreVisit } from './visit/StoreVisit' // Branches with address, hours, directions; WhatsApp and call

// Wrappers
export { default as StitchLine } from '../motion/StitchLine' // Running stitch sewn down the left of the sections it wraps
