// src/designs/regal/Design.tsx
// "Regal": Assembled according to the boutique component lab specifications:
// 00. Navigation: Pill + thumb dock (DockNav - Variant C)
//     Updated pages: Home, Services, Craftmanship, About Us, Store, Contact us
// 01. Hero: Lookbook split with 3-photo collage and facts (SplitHero - Variant C)
// 02. Services: Comprehensive 3-column auto-rotating catalogue (ShowcaseServices)
// 03. Gallery: Coverflow 3D perspective viewer with 3-second auto-rotation (CoverflowGallery)
// 04. Craftsmanship:
//     - Interactive blouse designer with live auto-updating sketches (StitchBlouse)
//     - Bridal packages photo rail (RailBridal)
//     - Handwork and zari embroidery craft (ZariHandwork)
//     - Before & after alterations spotlight (SpotlightAlterations)
// 05. About Us: Master tailor & designer story (FounderTeam) & Timeline (DaysProcess)
// 06. Store: Studio location, hours, and parking (StoreVisit)
// 07. Reviews & FAQ: Customer testimonials (SpotlightReviews) & FAQ cards (CardsFaq)
// 08. Contact: Occasion consultation picker (OccasionContact)
// 09. Footer: Columns (ColumnsFooter - Variant B)
// 10. Floating Concierge: FloatingWhatsApp

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
  PageHeader,
  RailBridal,
  ShowcaseServices,
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
          <ShowcaseServices />
          <CoverflowGallery />
          <TilesServices id="services-prices" />
        </div>
        <div id="craftsmanship">
          <StitchBlouse />
          <RailBridal />
          <ZariHandwork />
          <SpotlightAlterations />
        </div>
        <div id="about">
          <FounderTeam />
          <DaysProcess />
        </div>
        <div id="store">
          <StoreVisit id="store" />
        </div>
        <div id="reviews">
          <CardsFaq />
          <SpotlightReviews />
        </div>
        <div id="contact">
          <OccasionContact />
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
          <ShowcaseServices />
          <CoverflowGallery />
          <TilesServices id="services-prices" />
        </div>
        <div id="contact">
          <OccasionContact />
          <StoreVisit />
        </div>
      </>
    ),
  },
  {
    path: 'craftsmanship',
    label: 'Craftmanship',
    intro: 'Handcrafted zardosi embroidery, bespoke necklines, structured armhole fits, and artisanal handwork perfected over years.',
    element: (
      <>
        <PageHeader />
        <div id="craftsmanship">
          <StitchBlouse />
          <RailBridal />
          <ZariHandwork />
          <SpotlightAlterations />
        </div>
        <FounderTeam />
        <div id="contact">
          <OccasionContact />
        </div>
      </>
    ),
  },
  {
    path: 'about',
    label: 'About Us',
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
    path: 'store',
    label: 'Store',
    intro: 'Visit our bespoke studio near Hoysala Circle, Kengeri Satellite Town. Free client parking and personal designer trials available.',
    element: (
      <>
        <PageHeader />
        <div id="store">
          <StoreVisit id="store" />
        </div>
        <DaysProcess />
        <CardsFaq />
        <div id="contact">
          <OccasionContact />
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
