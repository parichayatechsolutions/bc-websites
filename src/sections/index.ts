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
export { default as DockNav } from './nav/DockNav' // Floating pill bar on computers; on phones a bottom dock with WhatsApp, Call, Menu (no sticky WhatsApp with it)
export { default as MenuNav } from './nav/MenuNav' // Logo, WhatsApp and a Menu pill on every screen; full-screen menu with hours; best for long names
export { default as MastheadNav } from './nav/MastheadNav' // Newspaper masthead: dateline, name large and centred, pages in a sticky ruled row
export { default as ShrinkNav } from './nav/ShrinkNav' // Tall sign-like bar with a large logo that shrinks to compact on scroll
export { default as LocalNav } from './nav/LocalNav' // Dark strip with the name in their own script above a clean bar (needs brand.localName for the strip)

// Footer (pick one)
export { default as BrandFooter } from './footer/BrandFooter' // Brand colour, huge name, pages, contact icons
export { default as ColumnsFooter } from './footer/ColumnsFooter' // Dark, four columns: about, pages, branches, contact
export { default as MinimalFooter } from './footer/MinimalFooter' // Light and centred: logo, pages, icons; for pages that end strong
export { default as SignoffFooter } from './footer/SignoffFooter' // Dark and centred: name at full size, zari rule, WhatsApp, Call, Directions, back to top
export { default as InviteFooter } from './footer/InviteFooter' // Brand-colour "Planning something? Let's talk." block over a compact logo, pages, icons row
export { default as OutlineFooter } from './footer/OutlineFooter' // Dark compact footer ending in the name edge to edge in outlined letters
export { default as StripFooter } from './footer/StripFooter' // A strip of work photos, then logo, pages and icons on light

// Page openers
export { default as ArchHero } from './hero/ArchHero' // Name over a temple-arch window that opens to full screen (pinned; page needs overlay)
export { default as VitrineOpener } from './hero/VitrineOpener' // One photograph edge to edge, name small in the corner (not pinned; opens a lookbook)
export { default as SplitHero } from './hero/SplitHero' // Light and editorial: name and invitation left, one tall photo right (not pinned)
export { default as PosterHero } from './hero/PosterHero' // Name framed over a full-bleed photo like a printed invitation (not pinned)
export { default as LedgerHero } from './hero/LedgerHero' // Name across the full width like a masthead, letterbox photo opening under it (not pinned)
export { default as MastheadHero } from './hero/MastheadHero' // No photo: the name as big as it fits on the brand colour, facts under a rule (not pinned)
export { default as SareeHero } from './hero/SareeHero' // Photo on top, zari border, name on a brand-colour band like a pallu (not pinned)
export { default as MosaicHero } from './hero/MosaicHero' // Six work photos in a grid with the name in a dark tile; shows range at once (not pinned)
export { default as ChatHero } from './hero/ChatHero' // Name beside a WhatsApp-style chat; quick replies write her first message (not pinned)
export { default as MonumentHero } from './hero/MonumentHero' // Dark: work in a tall arch, the name large beside it, gold rule (overlay-ready, not pinned)
export { default as MinimalHero } from './hero/MinimalHero' // Dark: just the name centred, tagline, one button, scroll cue; no photos (overlay-ready)
export { default as DoorsHero } from './hero/DoorsHero' // Dark: name above three arched doorways onto their work (overlay-ready, not pinned)
export { default as CoverHero } from './hero/CoverHero' // Magazine cover: name as masthead over a full photo, known-for cover lines (overlay-ready)
export { default as FullBleedHero } from './hero/FullBleedHero' // Full-screen photo under a veil, name large bottom-left (overlay-ready, not pinned)
export { default as WordsHero } from './hero/WordsHero' // The name in giant type with an arched photo set between its words (light)
export { default as PageHeader } from './header/PageHeader' // Inner-page title and intro from the page definition, no image

// Owner's story
export { default as InkStory } from './story/InkStory' // Owner's words ink in as you read; arch portrait
export { default as QuoteStory } from './story/QuoteStory' // The story's first line set large, small portrait or logo with name and year
export { default as EditorialStory } from './story/EditorialStory' // Dark: founding year faint behind, first sentence as headline, rest in columns with a drop cap
export { default as LetterStory } from './story/LetterStory' // The story as a signed letter on paper; only when written in their own voice
export { default as WorkroomStory } from './story/WorkroomStory' // Full-width workroom photo with the story on a card over its corner
export { default as CollageStory } from './story/CollageStory' // Story beside an overlapping collage: owner (with permission), workroom, close-up

// Their work
export { default as RailGallery } from './gallery/RailGallery' // "Known for" + work photos sliding sideways on scroll (pinned on desktop)
export { default as CategoryGrid } from './gallery/CategoryGrid' // Lookbook: an uneven grid with a category rail; choosing re-lays the grid (signature motion)
export { default as GridGallery } from './gallery/GridGallery' // Work in two quiet columns that drift at different speeds (not pinned)
export { default as FeatureGallery } from './gallery/FeatureGallery' // One piece large with "Ask about this piece", thumbnails to pick from
export { default as ColonnadeGallery } from './gallery/ColonnadeGallery' // One tall arch per photo category with its count, like a temple corridor
export { default as IndexGallery } from './gallery/IndexGallery' // Type-led rows per category (or known-for item) with a WhatsApp ask; fine with no photos
export { default as LightboxGallery } from './gallery/LightboxGallery' // Even grid; tap a photo to see it large with its note, previous and next
export { default as ZigzagGallery } from './gallery/ZigzagGallery' // One row per kind, photo and name alternating sides, with an ask per kind
export { default as WallGallery } from './gallery/WallGallery' // Salon-style wall of double-framed work on the brand colour

// How it's made
export { default as StickyProcess } from './process/StickyProcess' // Five making steps with a photo that follows the active step
export { default as ThreadProcess } from './process/ThreadProcess' // Round icon steps strung on a dashed thread that draws itself; no photos
export { default as DaysProcess } from './process/DaysProcess' // Steps as bars across their real delivery days (needs pricing.deliveryDays)
export { default as IndexProcess } from './process/IndexProcess' // Large thread-coloured numbers and steps in ruled rows; type-led
export { default as ArcadeProcess } from './process/ArcadeProcess' // Five line-drawn arches on the brand colour, one per step, Roman numerals
export { default as ViewerProcess } from './process/ViewerProcess' // One step at a time behind tabs, with a photo and "Next"

// What they stitch
export { default as ColumnServices } from './services/ColumnServices' // Services in grouped columns, optional starting prices
export { default as ListServices } from './services/ListServices' // The same list run full width as ruled rows, group name in the margin
export { default as MenuServices } from './services/MenuServices' // Dark, framed like a printed menu: prices with dotted leaders, groups, ask for a price
export { default as PriceServices } from './services/PriceServices' // The lowest starting price set enormous, the rest in a line (needs prices and permission)
export { default as KnownServices } from './services/KnownServices' // Their top three as big cards to ask about, everything else in compact groups
export { default as SearchServices } from './services/SearchServices' // "Do we make it?" search over everything they stitch; asks about what she typed
export { default as TabsServices } from './services/TabsServices' // Group tabs with the items large and a sticky brand-colour price card

// Reviews
export { default as RatingReviews } from './reviews/RatingReviews' // Google rating with stars, three quotes, stats (dark)
export { default as QuoteReviews } from './reviews/QuoteReviews' // One review set large, the rest beside it, rating as a plain line (light)
export { default as WallReviews } from './reviews/WallReviews' // Every review in columns on a warm ground, rating at the top (3+ reviews)
export { default as SealReviews } from './reviews/SealReviews' // Rating in a round double-ringed seal beside two reviews (needs the rating)
export { default as RuledReviews } from './reviews/RuledReviews' // Calm ruled rows: words left, name right; type-led
export { default as CentreReviews } from './reviews/CentreReviews' // One review at a time, centred under a big quote mark, previous/next
export { default as PhotoReviews } from './reviews/PhotoReviews' // Arched work photo with a brand-colour review card overlapping it

// Bridal (packages from bridalPackages; prices only with permission)
export { default as TierBridal } from './bridal/TierBridal' // Packages as equal cards: price, what's included, ask; consult button under them
export { default as TabBridal } from './bridal/TabBridal' // One package at a time behind name tabs; reads best on a phone
export { default as ConsultBridal } from './bridal/ConsultBridal' // Owner (or logo) beside an invitation to a bridal consult; needs no packages, only bridal work
export { default as PhotoBridal } from './bridal/PhotoBridal' // Arched bridal photo beside the packages as a ruled list
export { default as InviteBridal } from './bridal/InviteBridal' // A framed invitation card to a bridal consult; needs only bridal work

// Before and after (needs media.alterations: before-01.jpg with after-01.jpg)
export { default as SliderAlterations } from './alterations/SliderAlterations' // One large drag-to-compare photo, previous/next for more pairs
export { default as PairsAlterations } from './alterations/PairsAlterations' // Every pair side by side with its note; nothing to drag
export { default as ListAlterations } from './alterations/ListAlterations' // Their photo notes as a list beside one drag-to-compare photo
export { default as ToggleAlterations } from './alterations/ToggleAlterations' // One photo with a Before/After switch; easier than dragging on a phone
export { default as StackedAlterations } from './alterations/StackedAlterations' // Before above, after below, with an arrow; up to three pairs

// Offers (only offers running today; each hides on the day after its last day)
export { default as StripOffer } from './offer/StripOffer' // Band: one offer in brand colour with its last day and a WhatsApp link
export { default as PhotoOffer } from './offer/PhotoOffer' // The offer beside a work photo in an arch, with conditions and a WhatsApp button
export { default as CouponOffer } from './offer/CouponOffer' // Perforated coupon with the code to show at the counter; only for offers with a code
export { default as CardsOffer } from './offer/CardsOffer' // Two or three offers as cards with last day and ask
export { default as OverlayOffer } from './offer/OverlayOffer' // The offer over a full-width work photo under a dark veil

// Questions (their own from faq, then answers built from their data)
export { default as AccordionFaq } from './faq/AccordionFaq' // Questions that open one at a time, heading beside them
export { default as FactsFaq } from './faq/FactsFaq' // Price, delivery, express and payment as facts, then the questions
export { default as RowsFaq } from './faq/RowsFaq' // Every answer open in ruled rows, question left, answer right; type-led
export { default as ChatFaq } from './faq/ChatFaq' // Questions and answers as a WhatsApp conversation
export { default as PanelFaq } from './faq/PanelFaq' // Pick a question; its answer fills a brand-colour panel beside the list

// Trust (only facts from the boutique's data; each hides when the data is too thin)
export { default as StatTrust } from './trust/StatTrust' // Band: rating, years, their numbers and delivery in a ruled row; numbers count up
export { default as PromiseTrust } from './trust/PromiseTrust' // What a customer can count on (measure, delivery, handwork, payment, languages) beside the rating
export { default as LineTrust } from './trust/LineTrust' // Band: one slim line of proof on paper, for just under the hero
export { default as SealTrust } from './trust/SealTrust' // Their facts in round double-ringed seals; numbers count up
export { default as TimelineTrust } from './trust/TimelineTrust' // Milestones from their data on a dashed thread: opened, delivered, reviews, today

// Instagram (needs social.instagram; the posts are their work photos, linking to the profile)
export { default as GridInstagram } from './instagram/GridInstagram' // Profile row with logo, handle and Follow, over a three-across grid
export { default as StoriesInstagram } from './instagram/StoriesInstagram' // Ringed story circles from photo categories, then six pieces
export { default as FeatureInstagram } from './instagram/FeatureInstagram' // One piece large with its caption and four beside it; fine with five photos
export { default as ArchInstagram } from './instagram/ArchInstagram' // Their work in a row of arches linking to Instagram
export { default as TabsInstagram } from './instagram/TabsInstagram' // Instagram grid filtered by kind of work

// Contact
export { default as WhatsAppForm } from './contact/WhatsAppForm' // Enquiry form that opens WhatsApp with the details written out
export { default as PicksContact } from './contact/PicksContact' // Two taps, no typing: what and when, the message shown as it builds, send on WhatsApp
export { default as TrioContact } from './contact/TrioContact' // Three big cards: WhatsApp (filled), Call, Visit, with numbers in large type
export { default as FittingContact } from './contact/FittingContact' // Pick a day this week and a time of day; sends a fitting request on WhatsApp
export { default as DesignContact } from './contact/DesignContact' // "Saw a design you love?" dashed card to send the photo on WhatsApp
export { default as NumberContact } from './contact/NumberContact' // The WhatsApp number as the headline, with chat, call, directions, copy
export { default as StoreVisit } from './visit/StoreVisit' // Branches with address, hours, directions; WhatsApp and call
export { default as MapVisit } from './visit/MapVisit' // Wide live map with the address card over its corner; buttons switch branches
export { default as WaysVisit } from './visit/WaysVisit' // Three tappable cards (walk in, ask for the pin, call ahead) above the map
export { default as ShopfrontVisit } from './visit/ShopfrontVisit' // Storefront photo in an arch beside the map: "this is us" (first branch; needs media.storefront)
export { default as ArchVisit } from './visit/ArchVisit' // The map seen through an arch, with address, hours, WhatsApp and directions
export { default as FindVisit } from './visit/FindVisit' // "Find us." huge, the address beside it, the map full width beneath

// Always within reach (place one in a design beside SiteShell, not in a page; not with a nav that has a phone dock)
export { default as FloatingWhatsApp } from './contact/FloatingWhatsApp' // Round WhatsApp button in the bottom corner, after the hero
export { default as CallWhatsAppBar } from './contact/CallWhatsAppBar' // Phones only: Call and WhatsApp halves across the bottom, after the hero
export { default as DockWhatsApp } from './contact/DockWhatsApp' // Floating button opening WhatsApp, call and directions (place beside SiteShell)
export { default as LanguageWhatsApp } from './contact/LanguageWhatsApp' // Floating WhatsApp pill greeting in their language, listing the languages they speak

// Wrappers
export { default as StitchLine } from '../motion/StitchLine' // Running stitch sewn down the left of the sections it wraps

// Speciality (each shows only when their services say they do this work)
export { default as BuilderBlouse } from './blouse/BuilderBlouse' // Pick neck, back and sleeves; live front and back drawings; send the design on WhatsApp
export { default as NecksBlouse } from './blouse/NecksBlouse' // Every neckline as a drawn card with what it suits, then back and sleeves
export { default as StepsBlouse } from './blouse/StepsBlouse' // Design a blouse one question at a time, with progress and live drawings
export { default as GuideBlouse } from './blouse/GuideBlouse' // Neckline guide: each neck drawn, what it suits, what to wear with it
export { default as GuideMeasure } from './measure/GuideMeasure' // The ten blouse measurements; the drawing shows where the tape goes
export { default as FormMeasure } from './measure/FormMeasure' // Fill in measurements (inches or cm) and send them on WhatsApp
export { default as ChartMeasure } from './measure/ChartMeasure' // General blouse size chart in inches or cm, labelled as starting points
export { default as TipsMeasure } from './measure/TipsMeasure' // What you need and five tips before measuring
export { default as NeedsSaree } from './saree/NeedsSaree' // Tick the saree work you need (their own saree services) and send it in one message
export { default as IndexMen } from './men/IndexMen' // Every men's piece as a ruled index row with a WhatsApp ask
export { default as RowsHandwork } from './handwork/RowsHandwork' // The handwork they list, each explained: what it is and what it suits
export { default as SpreadLookbook } from './lookbook/SpreadLookbook' // Lookbook in chapters by occasion: one tall photo and two small (look-<occasion>-NN.jpg)
export { default as OccasionLookbook } from './lookbook/OccasionLookbook' // Occasion chips filter a grid of looks, each with "Ask for this look"
export { default as ViewerLookbook } from './lookbook/ViewerLookbook' // Large look photo beside the list of looks
export { default as FilmLookbook } from './lookbook/FilmLookbook' // Dark wide viewer with a thumbnail strip, previous/next
export { default as DrapesSaree } from './saree/DrapesSaree' // A photo row per saree drape with its note and a booking link (drape-<style>.jpg)
export { default as LengthsSaree } from './saree/LengthsSaree' // Saree lengths as bars: body, pallu, blouse piece
export { default as AskSaree } from './saree/AskSaree' // "I need…" lines, one WhatsApp ask per saree service
export { default as GroomMen } from './men/GroomMen' // The groom's look for each function, in order (groom-<function>.jpg)
export { default as EditMen } from './men/EditMen' // Their men's work (work-men-NN.jpg) in alternating rows on dark
export { default as DressMen } from './men/DressMen' // What to wear for office, wedding guest, groom, reception (needs a Men group)
export { default as PlainHandwork } from './handwork/PlainHandwork' // The same blouse plain and with handwork, with a switch (plain-NN + worked-NN)
export { default as ZonesHandwork } from './handwork/ZonesHandwork' // Where the work goes: neckline, sleeves, back, all over, lit on the drawing
export { default as CompareHandwork } from './handwork/CompareHandwork' // Hand or machine compared; needs both in their services
export { default as CornerKids } from './kids/CornerKids' // Kids' services, the ages they stitch for and their kids' work
export { default as MatchingKids } from './kids/MatchingKids' // Matching outfits as arched pairs: mother and daughter, siblings (match-NN-a + b)
export { default as IndexKids } from './kids/IndexKids' // Kids' pieces as a typeset index with ages and an ask per row
export { default as EditKids } from './kids/EditKids' // Their kids' work in alternating photo rows with notes
export { default as RateAlterations } from './alterations/RateAlterations' // Printed rate card of their alteration prices (needs prices permission)
export { default as EstimateAlterations } from './alterations/EstimateAlterations' // Tick alterations, see the estimate from their rates, send on WhatsApp
export { default as SearchAlterations } from './alterations/SearchAlterations' // Search their alteration rates; asks about what she typed
export { default as LadderAlterations } from './alterations/LadderAlterations' // Alteration rates as bars, cheapest first
export { default as BuilderGift } from './gift/BuilderGift' // Pick an amount and names; the voucher card fills in; request on WhatsApp
export { default as BuysGift } from './gift/BuysGift' // Each voucher amount beside what it covers at their starting prices
export { default as SentenceGift } from './gift/SentenceGift' // A voucher as one sentence with the blanks filled in place
export { default as OccasionGift } from './gift/OccasionGift' // Pick the occasion; the voucher wording changes to suit
export { default as RailRental } from './rental/RailRental' // Rental pieces hanging from a rail with swing tags and "Ask to rent"
export { default as AvailabilityRental } from './rental/AvailabilityRental' // Pick a rental piece and a date; asks on WhatsApp if it's free
export { default as IndexRental } from './rental/IndexRental' // Rental pieces as a list; the chosen one's photo, sizes and rent beside it
export { default as ShowroomRental } from './rental/ShowroomRental' // Dark showroom, one rental piece at a time in an arch
export { default as SwatchFabrics } from './fabric/SwatchFabrics' // Fabrics they stock as pinked swatches with what each is best for
export { default as BringFabric } from './fabric/BringFabric' // "Have your own fabric?" send-a-photo card, with their fabrics as quick links
export { default as GuideFabrics } from './fabric/GuideFabrics' // Fabric list beside a large swatch with what it's best for
export { default as IndexFabrics } from './fabric/IndexFabrics' // Fabrics as typeset rows with a round swatch and a WhatsApp ask
export { default as RosterTeam } from './team/RosterTeam' // The team as an editorial roster: name, role, years, a line (photos only with consent)
export { default as FounderTeam } from './team/FounderTeam' // The founder and their story, with the team named beneath
export { default as CraftTeam } from './team/CraftTeam' // Who does what: roles set large with names and years
export { default as OneTeam } from './team/OneTeam' // One team member at a time, portrait with consent or initials
export { default as CardsClasses } from './classes/CardsClasses' // Classes as cards: level, length, next batch, fee, ask to join
export { default as EnrolClasses } from './classes/EnrolClasses' // Name, class and age group written into a WhatsApp enrolment
export { default as BatchesClasses } from './classes/BatchesClasses' // Upcoming batches, soonest first, date set large
export { default as LevelsClasses } from './classes/LevelsClasses' // Classes in columns by level (needs two levels)
export { default as JournalPosts } from './posts/JournalPosts' // Style notes under a ruled masthead: the newest as lead, the rest listed
export { default as TipPosts } from './posts/TipPosts' // One style note at a time on the brand colour
export { default as NotebookPosts } from './posts/NotebookPosts' // Style notes as a dated notebook page
