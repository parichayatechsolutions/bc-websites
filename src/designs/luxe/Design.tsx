// src/designs/luxe/Design.tsx
// "Luxe": Dark luxury / cream couture showcase assembled according to the user's
// exact 23 component selections and navigation flow:
// Navigation flow: Home · About · Stitching · Craftsmanship · Services · Careers · FAQ · Contact
//
// 01. Navigation: Dark Luxe (U) - Hide on scroll down (LuxeNav)
// 02. Hero: Magazine Cover (I) - Photo settles (CoverHero)
// 03. Gallery (Our Work): Feature + strip (C) - Cards fade up (FeatureGallery)
// 04. Testimonials: Initial Cards (N) - Cards fade up (InitialsReviews)
// 05. WhatsApp Contact: How ordering works (K) - Cards fade up (StepsContact)
// 06. Services & prices: Known For (N) - Wipe in (KnownServices)
// 07. Owner's story: Story tabs (S) - Wipe in (TabsStory)
// 08. About them: Thread Line (B) - Threads draws (ThreadProcess)
// 09. FAQ: Topic Tabs (C) - Tap demo (TopicsFaq)
// 10. Instagram feed: Profile + Grid - Wipe in (GridInstagram)
// 11. Bridal Packages: Package tabs - Wipe in (TabBridal)
// 12. Before / after alterations: Pair deck (O) - Slider sweep (DeckAlterations)
// 13. Offers banner: Photocard (C) - Wipe in (PhotoOffer)
// 14. Trust badges: Rating Card (H) - Wipe in (RatingTrust)
// 15. Location map: Split details (B) - Wipe in (StoreVisit)
// 16. Footer: Double zari (H) - Zari draws (ZariFooter)
// 17. Fabric Swatches: Fabric notes - Wipe in (NotesFabrics)
// 18. Blouse Design Picker: Sticky Preview (S) - Wipe in (StickyBlouse)
// 19. Lookbook: Editorial spread - Wipe in (SpreadLookbook)
// 20. Embroidery types: Eight kinds of handwork - Wipe in (RowsHandwork)
// 21. Trial & delivery tracker: Progress bar (A) - Wipe in (ProgressBarTracker)
// 22. Team / tailors: Editorial Roster (A) - Wipe in (RosterTeam)
// 23. Sticky WhatsApp button: Gold ring (I) - Wipe in (RingWhatsApp)

import { FONTS } from '../../theme/fonts'
import {
  CoverHero,
  DeckAlterations,
  FeatureGallery,
  GridInstagram,
  InitialsReviews,
  KnownServices,
  LuxeNav,
  NotesFabrics,
  PageHeader,
  ProgressBarTracker,
  RingWhatsApp,
  RosterTeam,
  RowsHandwork,
  SiteShell,
  SpreadLookbook,
  StepsContact,
  StickyBlouse,
  StoreVisit,
  TabBridal,
  TabsStory,
  ThreadProcess,
  TopicsFaq,
  ZariFooter,
  type IPage,
} from '../../sections'

export const fonts = FONTS.cormorantJost

function ChapterHeader({
  chapter,
  title,
  subtitle,
}: {
  chapter: string
  title: string
  subtitle: string
}) {
  return (
    <div className="wrap mb-4 md:mb-8 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/5 px-4 py-1 text-xs font-mono uppercase tracking-[0.25em] text-accent">
        <span>{chapter}</span>
      </div>
      <h2 className="t-1 mt-3 font-display text-ink text-balance">{title}</h2>
      <p className="mt-2 text-muted max-w-2xl mx-auto text-base md:text-lg text-balance leading-relaxed">
        {subtitle}
      </p>
      <div className="zari mx-auto mt-4 max-w-xs opacity-40" />
    </div>
  )
}

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    overlay: true,
    element: (
      <>
        {/* 02. Hero: Magazine Cover (I) */}
        <CoverHero />

        {/* ── 01. About Section ── */}
        <section id="about" className="scroll-mt-24 border-t border-ink/10">
          {/* 07. Owner's story: Story tabs (S) */}
          <TabsStory />
        </section>

        {/* ── 02. Stitching Atelier Section ── */}
        <section id="stitching" className="scroll-mt-24 border-t border-ink/10">
          {/* 18. Blouse Design Picker: Sticky Preview (S) */}
          <StickyBlouse />

          {/* 12. Before / after alterations: Pair deck (O) */}
          <DeckAlterations />

          {/* 21. Trial & delivery tracker: Progress bar (A) */}
          <ProgressBarTracker />
        </section>

        {/* ── 03. Craftsmanship Section ── */}
        <section id="craftsmanship" className="scroll-mt-24 border-t border-ink/10 pt-12 md:pt-16">
          <ChapterHeader
            chapter="Chapter 03 · Art & Technique"
            title="Artisanal Craftsmanship"
            subtitle="From our 5-step bespoke tailoring process to 8 traditional handwork techniques and curated silk fabrics."
          />
          {/* 08. About them / Making Process: Thread Line (B) */}
          <ThreadProcess />

          {/* 20. Embroidery types: Eight kinds of handwork */}
          <RowsHandwork />

          {/* 17. Fabric Swatches: Fabric notes */}
          <NotesFabrics />
        </section>

        {/* ── 04. Services & Collections Section ── */}
        <section id="services" className="scroll-mt-24 border-t border-ink/10 pt-12 md:pt-16">
          <ChapterHeader
            chapter="Chapter 04 · Collections & Packages"
            title="Services & Bridal Suites"
            subtitle="Signature tailoring services, curated bridal packages, our featured blouse portfolio, and editorial lookbook spreads."
          />
          {/* 06. Services & prices: Known For (N) */}
          <KnownServices />

          {/* 11. Bridal Packages: Package tabs */}
          <TabBridal />

          {/* 03. Gallery (Our Work): Feature + strip (C) */}
          <FeatureGallery />

          {/* 19. Lookbook: Editorial spread */}
          <SpreadLookbook />
        </section>

        {/* ── 05. Careers / Team Section ── */}
        <section id="careers" className="scroll-mt-24 border-t border-ink/10 pt-12 md:pt-16">
          <ChapterHeader
            chapter="Chapter 05 · Our Master Artisans"
            title="Careers & Atelier Team"
            subtitle="Meet the master tailors, pattern cutting masters, and aari karigars dedicated to crafting each garment."
          />
          {/* 22. Team / tailors: Editorial Roster (A) */}
          <RosterTeam />
        </section>

        {/* ── 06. FAQ & Testimonials Section ── */}
        <section id="faq" className="scroll-mt-24 border-t border-ink/10 pt-12 md:pt-16">
          <ChapterHeader
            chapter="Chapter 06 · Guidance & Reviews"
            title="FAQ & Client Testimonials"
            subtitle="Transparent answers regarding pricing, delivery schedules, and verified testimonials from Bangalore brides."
          />
          {/* 09. FAQ: Topic Tabs (C) */}
          <TopicsFaq />

          {/* 04. Testimonials: Initial Cards (N) */}
          <InitialsReviews />
        </section>

        {/* ── 07. Contact & Visit Section ── */}
        <section id="contact" className="scroll-mt-24 border-t border-ink/10 pt-12 pb-12 md:pt-16 md:pb-16">
          <ChapterHeader
            chapter="Chapter 07 · Atelier Visit & Orders"
            title="Contact & Atelier Visit"
            subtitle="How ordering works via WhatsApp, visit our boutique, and explore our live workroom updates."
          />
          {/* 05. WhatsApp Contact: How ordering works (K) */}
          <StepsContact />

          {/* 15. Location map: Split details (B) */}
          <StoreVisit />

          {/* 10. Instagram feed: Profile + Grid */}
          <GridInstagram />
        </section>
      </>
    ),
  },
  {
    path: 'about',
    label: 'About',
    intro: 'Handcrafted couture precision, artisanal embroidery heritage, and our founder’s story.',
    element: (
      <>
        <PageHeader />
        <TabsStory />
      </>
    ),
  },
  {
    path: 'stitching',
    label: 'Stitching',
    intro: 'Interactive custom blouse studio, precision fit alterations, and real-time trial tracking.',
    element: (
      <>
        <PageHeader />
        <StickyBlouse />
        <DeckAlterations />
        <ProgressBarTracker />
      </>
    ),
  },
  {
    path: 'craftsmanship',
    label: 'Craftsmanship',
    intro: 'The five-step bespoke tailoring process, eight traditional handwork techniques, and curated fabric notes.',
    element: (
      <>
        <PageHeader />
        <ThreadProcess />
        <RowsHandwork />
        <NotesFabrics />
      </>
    ),
  },
  {
    path: 'services',
    label: 'Services',
    intro: 'Bespoke bridal blouses, festive lehengas, bridal packages, and lookbook spreads.',
    element: (
      <>
        <PageHeader />
        <KnownServices />
        <TabBridal />
        <FeatureGallery />
        <SpreadLookbook />
      </>
    ),
  },
  {
    path: 'careers',
    label: 'Careers',
    intro: 'Meet our master tailors, pattern cutting artisans, and zardosi craftsmen behind every garment.',
    element: (
      <>
        <PageHeader />
        <RosterTeam />
      </>
    ),
  },
  {
    path: 'faq',
    label: 'FAQ',
    intro: 'Answers to all your questions about timings, pricing, trial fittings, and client reviews.',
    element: (
      <>
        <PageHeader />
        <TopicsFaq />
        <InitialsReviews />
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact',
    intro: 'Visit our studio for personal design consultations, fabric selection, and bespoke measurements.',
    element: (
      <>
        <PageHeader />
        <StepsContact />
        <StoreVisit />
        <GridInstagram />
      </>
    ),
  },
]

export default function Design() {
  return (
    <div className="luxe-theme min-h-screen">
      {/* 01. Navigation: Dark Luxe (U) | 16. Footer: Double zari (H) */}
      <SiteShell nav={LuxeNav} footer={ZariFooter} pages={pages} />

      {/* 23. Sticky WhatsApp button: Gold ring (I) */}
      <RingWhatsApp />
    </div>
  )
}
