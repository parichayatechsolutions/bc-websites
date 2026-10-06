// src/designs/regal/Design.tsx
// "Regal": Assembled according to the boutique component lab specifications:
// 00. Navigation: Pill + thumb dock (DockNav - Variant C)
// 01. Hero: Lookbook split with 3-photo collage and facts (SplitHero - Variant C)
// 02. Gallery: Coverflow 3D perspective viewer (CoverflowGallery - Variant T)
// 03. Boutique Specialities:
//     - Interactive blouse designer with live auto-updating sketches (StitchBlouse - Variant V)
//     - Bridal packages photo rail (RailBridal - Variant I)
//     - Handwork and embroidery craft (ZariHandwork)
//     - Before & after alterations spotlight (SpotlightAlterations - Variant Z)
//     - Transparent alteration rates list (RateAlterations)
// 04. Services & Prices: Price tiles + accordion (TilesServices - Variant C)
// 05. Owner's Story: Designer card (CardStory - Variant Q)
// 06. Process & Timeline: Day-by-day order tracking timeline (DaysProcess & RingProcess)
// 07. FAQ: Card grid (CardsFaq - Variant E)
// 08. Location & Visit: Split details card (StoreVisit - Variant B)
// 09. Reviews & Testimonials: Spotlight (SpotlightReviews - Variant Z)
// 10. WhatsApp Contact: Occasion consultation picker (OccasionContact)
// 11. Footer: Columns (ColumnsFooter - Variant B)
// 12. Floating Concierge: FloatingWhatsApp

import { FONTS } from '../../theme/fonts'
import {
  CardsFaq,
  ColumnsFooter,
  CoverflowGallery,
  DaysProcess,
  DockNav,
  FloatingWhatsApp,
  FounderTeam,
  OccasionContact,
  OrNewAlterations,
  PageHeader,
  RailBridal,
  RingProcess,
  SiteShell,
  SplitHero,
  SpotlightAlterations,
  SpotlightReviews,
  StitchBlouse,
  StoreVisit,
  ThreadProcess,
  TilesServices,
  ZariHandwork,
  type IPage,
} from '../../sections'

export const fonts = FONTS.cormorantJost

const pages: IPage[] = [
  {
    path: '',
    label: 'Home',
    element: (
      <>
        <SplitHero />
        <div id="services">
          <CoverflowGallery />
          <StitchBlouse />
          <RailBridal />
          <ZariHandwork />
          <SpotlightAlterations />
          <OrNewAlterations />
          <TilesServices id="services-prices" />
        </div>
        <FounderTeam />
        <DaysProcess />
        <CardsFaq />
        <SpotlightReviews />
        <div id="contact">
          <OccasionContact />
          <StoreVisit />
        </div>
      </>
    ),
  },
  {
    path: 'about',
    label: 'About us',
    intro: 'Handcrafting bespoke bridal fashion, heirloom blouse embroidery, and personalized fit in Kengeri since 2019.',
    element: (
      <>
        <PageHeader />
        <FounderTeam />
        <ThreadProcess />
        <div id="services">
          <CoverflowGallery />
          <RailBridal />
          <ZariHandwork />
        </div>
        <SpotlightReviews />
        <div id="contact">
          <OccasionContact />
          <StoreVisit />
        </div>
      </>
    ),
  },
  {
    path: 'services',
    label: 'Services',
    intro: 'From bespoke bridal trousseau and handcrafted maggam blouses to swift alteration care, tailored to your exact measurements.',
    element: (
      <>
        <PageHeader />
        <div id="services">
          <TilesServices id="services-prices" />
          <CoverflowGallery />
          <StitchBlouse />
          <RailBridal />
          <ZariHandwork />
          <SpotlightAlterations />
          <OrNewAlterations />
        </div>
        <FounderTeam />
        <DaysProcess />
        <CardsFaq />
        <SpotlightReviews />
        <div id="contact">
          <OccasionContact />
          <StoreVisit />
        </div>
      </>
    ),
  },
  {
    path: 'reviews',
    label: 'Reviews',
    intro: 'Rated 4.9 stars by over 50 women across Bengaluru for perfect first-try fit, delicate embroidery, and on-time delivery.',
    element: (
      <>
        <PageHeader />
        <SpotlightReviews />
        <div id="services">
          <CoverflowGallery />
          <RailBridal />
          <ZariHandwork />
        </div>
        <FounderTeam />
        <div id="contact">
          <OccasionContact />
          <StoreVisit />
        </div>
      </>
    ),
  },
  {
    path: 'contact',
    label: 'Contact us',
    intro: 'Visit our studio near Hoysala Circle, chat directly with our designer on WhatsApp, or see our turnaround times.',
    element: (
      <>
        <PageHeader />
        <div id="contact">
          <OccasionContact />
          <StoreVisit />
        </div>
        <DaysProcess />
        <CardsFaq />
        <div id="services">
          <CoverflowGallery />
        </div>
        <SpotlightReviews />
      </>
    ),
  },
]

export default function Design() {
  return (
    <>
      <SiteShell nav={DockNav} footer={ColumnsFooter} pages={pages} />
      <FloatingWhatsApp />
    </>
  )
}
