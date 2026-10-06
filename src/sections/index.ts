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
export { default as IconNav } from './nav/IconNav' // Pages as small icons with labels beside the logo and WhatsApp; compact and scannable
export { default as DrawerNav } from './nav/DrawerNav' // Menu button opens a side drawer on every screen: shop photo, pages, hours, WhatsApp
export { default as BrandNav } from './nav/BrandNav' // Solid brand-colour bar with a zari foot: logo and name, pages as chips, WhatsApp
export { default as ThreadNav } from './nav/ThreadNav' // Clean bar with a thread along its foot that sews across as she scrolls
export { default as CallNav } from './nav/CallNav' // Solid bar ending in one split pill: Call on one half, Book on WhatsApp on the other
export { default as SplitNav } from './nav/SplitNav' // Menu button on every screen; the menu slides in as half work photo, half pages
export { default as PillsNav } from './nav/PillsNav' // Solid bar with the pages in one segmented pill, the current page filled
export { default as CircleNav } from './nav/CircleNav' // Round menu button; the menu grows from it as a circle of brand colour
export { default as BandNav } from './nav/BandNav' // Solid bar over a brand band with the rating, usual delivery and Book a fitting
export { default as OutlineNav } from './nav/OutlineNav' // Clear over a dark hero: pages in one outlined pill, WhatsApp as an outlined circle
export { default as ArchNav } from './nav/ArchNav' // Slim bar with the logo and name hanging from its centre in an arch-shaped tab
export { default as OpenNav } from './nav/OpenNav' // Brand strip with open-now status and rating over a solid bar (reads branch hours)

// Footer (pick one)
export { default as BrandFooter } from './footer/BrandFooter' // Brand colour, huge name, pages, contact icons
export { default as ColumnsFooter } from './footer/ColumnsFooter' // Dark, four columns: about, pages, branches, contact
export { default as MinimalFooter } from './footer/MinimalFooter' // Light and centred: logo, pages, icons; for pages that end strong
export { default as SignoffFooter } from './footer/SignoffFooter' // Dark and centred: name at full size, zari rule, WhatsApp, Call, Directions, back to top
export { default as InviteFooter } from './footer/InviteFooter' // Brand-colour "Planning something? Let's talk." block over a compact logo, pages, icons row
export { default as OutlineFooter } from './footer/OutlineFooter' // Dark compact footer ending in the name edge to edge in outlined letters
export { default as StripFooter } from './footer/StripFooter' // A strip of work photos, then logo, pages and icons on light
export { default as SplitFooter } from './footer/SplitFooter' // Brand-colour half with logo and tagline, light half with pages and contact
export { default as SitemapFooter } from './footer/SitemapFooter' // Dark sitemap: about, pages, known for, prices, contact in columns
export { default as ArchFooter } from './footer/ArchFooter' // Footer rising in a brand-colour arch: logo at the crown, pages, contacts
export { default as TilesFooter } from './footer/TilesFooter' // Four big tiles (WhatsApp, Instagram, Google, call), then name and pages
export { default as ReceiptFooter } from './footer/ReceiptFooter' // Footer as a torn bill-book slip: name, branches, pages, phone and WhatsApp
export { default as CardFooter } from './footer/CardFooter' // Their visiting card front and back, then pages, contacts and credit
export { default as MapFooter } from './footer/MapFooter' // Dark: a map tile with the logo pinned, every contact detail beside
export { default as YearFooter } from './footer/YearFooter' // The founding year set huge beside the contact details
export { default as ZariFooter } from './footer/ZariFooter' // Paper between double zari borders: Visit, logo, Talk to us
export { default as CardsFooter } from './footer/CardsFooter' // Brand colour with Visit, Chat and Follow cards, then pages
export { default as NumbersFooter } from './footer/NumbersFooter' // Dark: their facts as stat cards, then name, pages, contacts
export { default as SignatureFooter } from './footer/SignatureFooter' // "Stitched in" their city between two running stitches, centred
export { default as ThumbFooter } from './footer/ThumbFooter' // Dark footer ending in a Call · Directions · WhatsApp bar
export { default as ThreadFooter } from './footer/ThreadFooter' // A running stitch sewn across the top with a needle, then the footer
export { default as HoursFooter } from './footer/HoursFooter' // Footer with open-now and the week beside the logo and WhatsApp

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
export { default as VerticalHero } from './hero/VerticalHero' // Name running up a brand-colour strip, photo filling the rest, invitation on a card (not pinned)
export { default as DiagonalHero } from './hero/DiagonalHero' // Brand colour with the photo cut in on a diagonal, name stacked a word a line (not pinned)
export { default as FounderHero } from './hero/FounderHero' // Dark: the owner in an arch beside their own first line (with permission); overlay-ready
export { default as FramedHero } from './hero/FramedHero' // Light: name left, work in a gold double-framed arch right (not pinned)
export { default as LettersHero } from './hero/LettersHero' // Dark, the name huge with a photo of their work showing through the letters
export { default as TagHero } from './hero/TagHero' // Full photo with a swing tag on a gold thread: name, rating, invitation
export { default as SinceHero } from './hero/SinceHero' // No photo: the year they started set enormous, name, line and invitation beneath
export { default as FilmHero } from './hero/FilmHero' // Dark: one large photo with a thumbnail strip to swap it; name beside the strip
export { default as TunnelHero } from './hero/TunnelHero' // Dark: four gold-thread arches receding, their work in the innermost
export { default as PrintsHero } from './hero/PrintsHero' // Three photo prints laid loosely beside the name
export { default as DuotoneHero } from './hero/DuotoneHero' // Name a word to a line on the brand colour beside a duotone photo
export { default as RingHero } from './hero/RingHero' // Round photo in a thread ring with the name and year written around it
export { default as JaaliHero } from './hero/JaaliHero' // Photo seen through a brand-colour lattice; name on an arch-topped panel
export { default as HangerHero } from './hero/HangerHero' // Name above a thread rail of work hanging on hooks, tagged by kind
export { default as SliderHero } from './hero/SliderHero' // Three photos stepped through with arrows; name on a solid panel
export { default as PageHeader } from './header/PageHeader' // Inner-page title and intro from the page definition, no image

// Owner's story
export { default as InkStory } from './story/InkStory' // Owner's words ink in as you read; arch portrait
export { default as QuoteStory } from './story/QuoteStory' // The story's first line set large, small portrait or logo with name and year
export { default as EditorialStory } from './story/EditorialStory' // Dark: founding year faint behind, first sentence as headline, rest in columns with a drop cap
export { default as LetterStory } from './story/LetterStory' // The story as a signed letter on paper; only when written in their own voice
export { default as WorkroomStory } from './story/WorkroomStory' // Full-width workroom photo with the story on a card over its corner
export { default as CollageStory } from './story/CollageStory' // Story beside an overlapping collage: owner (with permission), workroom, close-up
export { default as NumbersStory } from './story/NumbersStory' // The story beside a column of large facts from their data
export { default as YearStory } from './story/YearStory' // The founding year huge on a brand block beside the story (needs established)
export { default as CardStory } from './story/CardStory' // The owner as a designer ID card (portrait with permission) beside the story
export { default as TabsStory } from './story/TabsStory' // Three tabs: their story, what to count on, their workroom
export { default as PolaroidStory } from './story/PolaroidStory' // A tilted instant photo (portrait with permission) beside the story, known-for callout
export { default as WordsStory } from './story/WordsStory' // The story’s first sentence large, coming into focus word by word
export { default as JourneyStory } from './story/JourneyStory' // The start year, the story and today on a dashed thread (needs established)
export { default as ArchStory } from './story/ArchStory' // Arched photo with a name plate beside the story, numbers in a ruled row
export { default as ValuesStory } from './story/ValuesStory' // Three cards of what they stand by, from their data, under the story’s opening
export { default as ChaptersStory } from './story/ChaptersStory' // The story’s paragraphs as numbered chapters (needs two or more)
export { default as MakerStory } from './story/MakerStory' // A clip of the owner (tap to play) beside her story (needs maker.mp4 and permission)

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
export { default as TilesGallery } from './gallery/TilesGallery' // "What are you planning?" photo tiles per kind; choosing opens that kind below
export { default as StackGallery } from './gallery/StackGallery' // One full-width photo per kind stacked down the page, name and ask over each
export { default as AccordionGallery } from './gallery/AccordionGallery' // Dark arched panels per kind of work; the chosen one widens to show the piece
export { default as PinboardGallery } from './gallery/PinboardGallery' // Work as prints taped to a pinboard at slight angles, labelled by kind
export { default as SheetGallery } from './gallery/SheetGallery' // Work printed along dark film strips with sprocket edges, kinds in gold
export { default as CatalogueGallery } from './gallery/CatalogueGallery' // Catalogue grid: a kind label and an Ask about this link on every piece
export { default as CirclesGallery } from './gallery/CirclesGallery' // Round gold-ringed bubbles per kind of work; tap one for its grid
export { default as DiamondGallery } from './gallery/DiamondGallery' // On brand colour: work cut into gold-edged diamonds, like a jaali
export { default as DeckGallery } from './gallery/DeckGallery' // Dark: work as a stack of prints dealt with arrows, kind and note beside
export { default as SpreadGallery } from './gallery/SpreadGallery' // Kinds of work listed; choosing one lays out a three-photo spread
export { default as ClothesGallery } from './gallery/ClothesGallery' // Work hanging from a thread rail, kind chips change what hangs
export { default as CoverflowGallery } from './gallery/CoverflowGallery' // Dark: centre photo large, neighbours turned in 3D perspective with arrows (Lab: gallery T)

// How it's made
export { default as StickyProcess } from './process/StickyProcess' // Five making steps with a photo that follows the active step
export { default as ThreadProcess } from './process/ThreadProcess' // Round icon steps strung on a dashed thread that draws itself; no photos
export { default as DaysProcess } from './process/DaysProcess' // Steps as bars across their real delivery days (needs pricing.deliveryDays)
export { default as IndexProcess } from './process/IndexProcess' // Large thread-coloured numbers and steps in ruled rows; type-led
export { default as ArcadeProcess } from './process/ArcadeProcess' // Five line-drawn arches on the brand colour, one per step, Roman numerals
export { default as ViewerProcess } from './process/ViewerProcess' // One step at a time behind tabs, with a photo and "Next"
export { default as AccordionProcess } from './process/AccordionProcess' // Numbered steps that open one at a time
export { default as BringProcess } from './process/BringProcess' // Steps as a tick-list beside a "what to bring" card
export { default as ZigzagProcess } from './process/ZigzagProcess' // Making steps in alternating rows: photo one side, big step number the other
export { default as RingProcess } from './process/RingProcess' // Making steps around a progress ring; tap a dot to read the step in the middle
export { default as PatternProcess } from './process/PatternProcess' // Making steps as dashed pattern pieces on a gridded cutting mat
export { default as CalendarProcess } from './process/CalendarProcess' // Day 1, in between and the delivery day as calendar pages (needs deliveryDays)
export { default as GridProcess } from './process/GridProcess' // Making steps in a grid with large thread-colour numbers and icons
export { default as DarkProcess } from './process/DarkProcess' // Dark: making steps on a ruled grid with gold numerals
export { default as VideoProcess } from './process/VideoProcess' // A workroom clip (tap to play) beside the numbered steps (needs workroom.mp4)

// What they stitch
export { default as ColumnServices } from './services/ColumnServices' // Services in grouped columns, optional starting prices
export { default as ListServices } from './services/ListServices' // The same list run full width as ruled rows, group name in the margin
export { default as MenuServices } from './services/MenuServices' // Dark, framed like a printed menu: prices with dotted leaders, groups, ask for a price
export { default as PriceServices } from './services/PriceServices' // The lowest starting price set enormous, the rest in a line (needs prices and permission)
export { default as KnownServices } from './services/KnownServices' // Their top three as big cards to ask about, everything else in compact groups
export { default as SearchServices } from './services/SearchServices' // "Do we make it?" search over everything they stitch; asks about what she typed
export { default as TabsServices } from './services/TabsServices' // Group tabs with the items large and a sticky brand-colour price card
export { default as TimeServices } from './services/TimeServices' // Usual and express delivery as day bars, starting prices beneath (needs deliveryDays)
export { default as YesServices } from './services/YesServices' // "Yes, we do that": every service with a tick, plus an "ask anyway" card
export { default as TilesServices } from './services/TilesServices' // Starting prices as three brand tiles, then service groups that open
export { default as CloudServices } from './services/CloudServices' // Everything they stitch as tappable pills, featured ones larger; each a WhatsApp ask
export { default as BillServices } from './services/BillServices' // Dark: starting prices on a torn slip from their bill book (with permission)
export { default as MedallionServices } from './services/MedallionServices' // Starting prices in three gold-ringed medallions, groups in ruled columns
export { default as IconServices } from './services/IconServices' // Group tabs; each item an icon tile that asks its price on WhatsApp
export { default as QuestionsServices } from './services/QuestionsServices' // Prices and delivery as questions that open, from their data
export { default as BandServices } from './services/BandServices' // Brand band between zari borders of starting-price pills (with permission)
export { default as StickyServices } from './services/StickyServices' // Group cards of item chips beside a dark sticky price card
export { default as SwatchServices } from './services/SwatchServices' // Each service group on its own colour card, like a shade card
export { default as EstimateServices } from './services/EstimateServices' // Pick a garment, switch on express: a brand card shows the starting price and when it's ready (with permission)
export { default as AskServices } from './services/AskServices' // Garment, then handwork, then send: a price asked on WhatsApp in three taps; no prices needed

// Reviews
export { default as RatingReviews } from './reviews/RatingReviews' // Google rating with stars, three quotes, stats (dark)
export { default as QuoteReviews } from './reviews/QuoteReviews' // One review set large, the rest beside it, rating as a plain line (light)
export { default as WallReviews } from './reviews/WallReviews' // Every review in columns on a warm ground, rating at the top (3+ reviews)
export { default as SealReviews } from './reviews/SealReviews' // Rating in a round double-ringed seal beside two reviews (needs the rating)
export { default as RuledReviews } from './reviews/RuledReviews' // Calm ruled rows: words left, name right; type-led
export { default as CentreReviews } from './reviews/CentreReviews' // One review at a time, centred under a big quote mark, previous/next
export { default as PhotoReviews } from './reviews/PhotoReviews' // Arched work photo with a brand-colour review card overlapping it
export { default as ChatReviews } from './reviews/ChatReviews' // Reviews as incoming chat messages with initials
export { default as NumbersReviews } from './reviews/NumbersReviews' // Dark: rating, review count and garments set huge, one quote beneath
export { default as ArchReviews } from './reviews/ArchReviews' // One review at a time inside a tall brand-colour arch, with previous/next
export { default as NewspaperReviews } from './reviews/NewspaperReviews' // Reviews set as a newspaper page: headline quote, the rest in columns
export { default as ThreadReviews } from './reviews/ThreadReviews' // Reviews strung left and right of a dashed thread with gold knots
export { default as InitialsReviews } from './reviews/InitialsReviews' // Row of customers’ initials; tap one to read her review
export { default as NotesReviews } from './reviews/NotesReviews' // On brand colour: reviews as paper notes pinned at slight angles
export { default as PraiseReviews } from './reviews/PraiseReviews' // Tabs for the fit, handwork, on time, filled from what reviews actually say
export { default as GoogleReviews } from './reviews/GoogleReviews' // Initial-led review cards under the rating, with Read and Write a review
export { default as FramesReviews } from './reviews/FramesReviews' // On brand colour between zari borders: reviews in double gold frames
export { default as DeckReviews } from './reviews/DeckReviews' // Dark: reviews as a stack of cards dealt with arrows
export { default as SpotlightReviews } from './reviews/SpotlightReviews' // Dark stage; one review lit in the centre, customer names as chips

// Bridal (packages from bridalPackages; prices only with permission)
export { default as TierBridal } from './bridal/TierBridal' // Packages as equal cards: price, what's included, ask; consult button under them
export { default as TabBridal } from './bridal/TabBridal' // One package at a time behind name tabs; reads best on a phone
export { default as ConsultBridal } from './bridal/ConsultBridal' // Owner (or logo) beside an invitation to a bridal consult; needs no packages, only bridal work
export { default as PhotoBridal } from './bridal/PhotoBridal' // Arched bridal photo beside the packages as a ruled list
export { default as InviteBridal } from './bridal/InviteBridal' // A framed invitation card to a bridal consult; needs only bridal work
export { default as CompareBridal } from './bridal/CompareBridal' // Packages compared in a table of inclusions (needs two)
export { default as PricesBridal } from './bridal/PricesBridal' // Packages led by their starting prices, set large (needs prices permission)
export { default as ArchBridal } from './bridal/ArchBridal' // Each bridal package inside a gold-edged temple arch with what it includes
export { default as AccordionBridal } from './bridal/AccordionBridal' // Bridal packages as rows that open to what’s included
export { default as RailBridal } from './bridal/RailBridal' // Photo rail: sideways package cards with photos and horizontal scroll
export { default as MenuBridal } from './bridal/MenuBridal' // Dark framed menu card: packages with dotted leaders to their prices
export { default as IncludedBridal } from './bridal/IncludedBridal' // Package tabs over one list of everything, ticked or greyed per package
export { default as CeremonyBridal } from './bridal/CeremonyBridal' // Tabs per ceremony, each the bride’s look for it (look-<function>-NN.jpg)
export { default as EditBridal } from './bridal/EditBridal' // "The bridal edit": packages in magazine columns with a drop cap
export { default as PassBridal } from './bridal/PassBridal' // Each bridal package as a ticket with an Ask stub
export { default as DeckBridal } from './bridal/DeckBridal' // Bridal packages as a stack of cards dealt with arrows

// Before and after (needs media.alterations: before-01.jpg with after-01.jpg)
export { default as SliderAlterations } from './alterations/SliderAlterations' // One large drag-to-compare photo, previous/next for more pairs
export { default as PairsAlterations } from './alterations/PairsAlterations' // Every pair side by side with its note; nothing to drag
export { default as ListAlterations } from './alterations/ListAlterations' // Their photo notes as a list beside one drag-to-compare photo
export { default as ToggleAlterations } from './alterations/ToggleAlterations' // One photo with a Before/After switch; easier than dragging on a phone
export { default as StackedAlterations } from './alterations/StackedAlterations' // Before above, after below, with an arrow; up to three pairs
export { default as DarkAlterations } from './alterations/DarkAlterations' // The drag-to-compare photo on a dark ground
export { default as ArchesAlterations } from './alterations/ArchesAlterations' // Before and after in tall arches, side by side
export { default as DiagonalAlterations } from './alterations/DiagonalAlterations' // Before and after split on a diagonal in one frame; nothing to drag
export { default as ReviewAlterations } from './alterations/ReviewAlterations' // Drag-to-compare beside a real review about fit (only when one mentions it)
export { default as TapedAlterations } from './alterations/TapedAlterations' // Before/after pairs as prints taped to the page with written notes
export { default as ServicesAlterations } from './alterations/ServicesAlterations' // What they alter in a ruled list beside a sticky arched drag-to-compare
export { default as DeckAlterations } from './alterations/DeckAlterations' // Before/after pairs as a stack of prints dealt with arrows
export { default as BandAlterations } from './alterations/BandAlterations' // On brand colour between zari borders: pairs in gold frames
export { default as StoryAlterations } from './alterations/StoryAlterations' // "A second life": one pair large as a cover story, others small
export { default as SpotlightAlterations } from './alterations/SpotlightAlterations' // Dark stage, one pair lit at a time with pips

// Offers (only offers running today; each hides on the day after its last day)
export { default as StripOffer } from './offer/StripOffer' // Band: one offer in brand colour with its last day and a WhatsApp link
export { default as PhotoOffer } from './offer/PhotoOffer' // The offer beside a work photo in an arch, with conditions and a WhatsApp button
export { default as CouponOffer } from './offer/CouponOffer' // Perforated coupon with the code to show at the counter; only for offers with a code
export { default as CardsOffer } from './offer/CardsOffer' // Two or three offers as cards with last day and ask
export { default as OverlayOffer } from './offer/OverlayOffer' // The offer over a full-width work photo under a dark veil
export { default as ArchOffer } from './offer/ArchOffer' // The offer inside a tall brand-colour arch
export { default as BookByOffer } from './offer/BookByOffer' // "Book by" the offer's last day as a calendar tile with days left
export { default as AdOffer } from './offer/AdOffer' // The offer as a double-ruled newspaper advert with its last day
export { default as TabsOffer } from './offer/TabsOffer' // Several offers behind tabs beside a work photo (needs two or more)
export { default as BarOffer } from './offer/BarOffer' // Closable offer bar pinned to the foot of the screen (beside SiteShell, not with a floating button)
export { default as RosetteOffer } from './offer/RosetteOffer' // A pleated rosette with the last day beside the offer and its code
export { default as RevealOffer } from './offer/RevealOffer' // A gift card that slides open on tap to show the offer
export { default as BandOffer } from './offer/BandOffer' // Brand band between zari borders: the offer, last day and rating
export { default as TabOffer } from './offer/TabOffer' // An Offers tab on the left edge sliding out every offer (beside SiteShell)
export { default as FestiveOffer } from './offer/FestiveOffer' // A festival offer under a drawn marigold garland (only festival offers)

// Questions (their own from faq, then answers built from their data)
export { default as AccordionFaq } from './faq/AccordionFaq' // Questions that open one at a time, heading beside them
export { default as FactsFaq } from './faq/FactsFaq' // Price, delivery, express and payment as facts, then the questions
export { default as RowsFaq } from './faq/RowsFaq' // Every answer open in ruled rows, question left, answer right; type-led
export { default as ChatFaq } from './faq/ChatFaq' // Questions and answers as a WhatsApp conversation
export { default as PanelFaq } from './faq/PanelFaq' // Pick a question; its answer fills a brand-colour panel beside the list
export { default as TopicsFaq } from './faq/TopicsFaq' // Questions under topic tabs: prices, timing, ordering, visiting
export { default as StepFaq } from './faq/StepFaq' // One question at a time with a progress bar
export { default as ArchFaq } from './faq/ArchFaq' // Questions that open beside a tall arched photo of their work
export { default as CardsFaq } from './faq/CardsFaq' // Every question and answer on its own card, all open, in a grid
export { default as ChipsFaq } from './faq/ChipsFaq' // Every question as a chip; the answer shows on a card below
export { default as ColumnFaq } from './faq/ColumnFaq' // "Ask the tailor" newspaper column: questions and answers in two columns
export { default as BrandFaq } from './faq/BrandFaq' // Questions that open on the brand colour, gold edges, zari foot
export { default as ArchesFaq } from './faq/ArchesFaq' // Each question and answer inside a gold-edged temple arch
export { default as DarkFaq } from './faq/DarkFaq' // Dark: questions that open beside a WhatsApp button

// Trust (only facts from the boutique's data; each hides when the data is too thin)
export { default as StatTrust } from './trust/StatTrust' // Band: rating, years, their numbers and delivery in a ruled row; numbers count up
export { default as PromiseTrust } from './trust/PromiseTrust' // What a customer can count on (measure, delivery, handwork, payment, languages) beside the rating
export { default as LineTrust } from './trust/LineTrust' // Band: one slim line of proof on paper, for just under the hero
export { default as SealTrust } from './trust/SealTrust' // Their facts in round double-ringed seals; numbers count up
export { default as TimelineTrust } from './trust/TimelineTrust' // Milestones from their data on a dashed thread: opened, delivered, reviews, today
export { default as AccordionTrust } from './trust/AccordionTrust' // What you can count on, as rows that open to explain
export { default as BadgeTrust } from './trust/BadgeTrust' // Band: a single compact Google rating badge
export { default as StampsTrust } from './trust/StampsTrust' // Their facts as tilted round ink stamps
export { default as PhotoTrust } from './trust/PhotoTrust' // Their facts as solid cards over a full-width work photo
export { default as RatingTrust } from './trust/RatingTrust' // The Google rating as one big brand card, other facts in boxes beside (needs a rating)
export { default as ArchTrust } from './trust/ArchTrust' // Facts in a row of small temple arches, each with its icon
export { default as PaperTrust } from './trust/PaperTrust' // "By the numbers" newspaper columns of their facts
export { default as BandTrust } from './trust/BandTrust' // Brand band between zari borders of round fact badges
export { default as PromisesTrust } from './trust/PromisesTrust' // Up to six data-backed promises in an icon grid
export { default as CountersTrust } from './trust/CountersTrust' // Dark tiles of their facts, counting up once

// Instagram (needs social.instagram; the posts are their work photos, linking to the profile)
export { default as GridInstagram } from './instagram/GridInstagram' // Profile row with logo, handle and Follow, over a three-across grid
export { default as StoriesInstagram } from './instagram/StoriesInstagram' // Ringed story circles from photo categories, then six pieces
export { default as FeatureInstagram } from './instagram/FeatureInstagram' // One piece large with its caption and four beside it; fine with five photos
export { default as ArchInstagram } from './instagram/ArchInstagram' // Their work in a row of arches linking to Instagram
export { default as TabsInstagram } from './instagram/TabsInstagram' // Instagram grid filtered by kind of work
export { default as MasonryInstagram } from './instagram/MasonryInstagram' // Their work in mixed-height columns linking to Instagram
export { default as SingleInstagram } from './instagram/SingleInstagram' // One piece large beside an invitation to follow
export { default as PhoneInstagram } from './instagram/PhoneInstagram' // A drawn phone holding their profile and work grid, beside a follow invitation
export { default as PolaroidInstagram } from './instagram/PolaroidInstagram' // Work as tilted instant photos with notes, linking to Instagram
export { default as MagazineInstagram } from './instagram/MagazineInstagram' // "From our feed": ruled masthead with the handle, one large and four small
export { default as DeckInstagram } from './instagram/DeckInstagram' // Work as a stack of prints dealt with arrows, beside the handle and Follow
export { default as BandInstagram } from './instagram/BandInstagram' // On brand colour: framed gold-edged tiles and a zari foot
export { default as DarkInstagram } from './instagram/DarkInstagram' // Dark: a gapless three-by-three grid beside the handle and Follow
export { default as FilmInstagram } from './instagram/FilmInstagram' // Dark: their work along a film strip with sprocket holes

// Contact
export { default as WhatsAppForm } from './contact/WhatsAppForm' // Enquiry form that opens WhatsApp with the details written out
export { default as PicksContact } from './contact/PicksContact' // Two taps, no typing: what and when, the message shown as it builds, send on WhatsApp
export { default as TrioContact } from './contact/TrioContact' // Three big cards: WhatsApp (filled), Call, Visit, with numbers in large type
export { default as FittingContact } from './contact/FittingContact' // Pick a day this week and a time of day; sends a fitting request on WhatsApp
export { default as DesignContact } from './contact/DesignContact' // "Saw a design you love?" dashed card to send the photo on WhatsApp
export { default as NumberContact } from './contact/NumberContact' // The WhatsApp number as the headline, with chat, call, directions, copy
export { default as PanelsContact } from './contact/PanelsContact' // Two big panels: book on WhatsApp, see the work on Instagram
export { default as CallbackContact } from './contact/CallbackContact' // Name, number and a good time sent as a call-back request on WhatsApp
export { default as PreviewContact } from './contact/PreviewContact' // Short form beside a chat-style preview of the WhatsApp message as she types
export { default as WeddingContact } from './contact/WeddingContact' // "Planning a wedding?" band between zari borders, one button (needs bridal work)
export { default as StepsContact } from './contact/StepsContact' // How ordering works: send a photo, talk it through, be measured, on a thread
export { default as ChatContact } from './contact/ChatContact' // A drawn chat greeting with what they’re known for, quick replies to WhatsApp
export { default as OccasionContact } from './contact/OccasionContact' // Occasion tiles (wedding, festival, office…), each a ready-written WhatsApp
export { default as CountdownContact } from './contact/CountdownContact' // Pick the wedding date; a gold seal shows the weeks to go (needs bridal work)
export { default as CardContact } from './contact/CardContact' // One store card: map, address, hours, phone, directions, beside WhatsApp
export { default as PassContact } from './contact/PassContact' // Pick a day and time; a fitting pass fills in, then ask on WhatsApp
export { default as HoursContact } from './contact/HoursContact' // Dark hours board: open now set large, the week with today marked, WhatsApp and Call
export { default as VisitContact } from './contact/VisitContact' // Dark grid: open today, address, hours and the map, then directions
export { default as SheetContact } from './contact/SheetContact' // Dark: one Contact us button sliding up a sheet of four ways in
export { default as StoreVisit } from './visit/StoreVisit' // Branches with address, hours, directions; WhatsApp and call
export { default as MapVisit } from './visit/MapVisit' // Wide live map with the address card over its corner; buttons switch branches
export { default as WaysVisit } from './visit/WaysVisit' // Three tappable cards (walk in, ask for the pin, call ahead) above the map
export { default as ShopfrontVisit } from './visit/ShopfrontVisit' // Storefront photo in an arch beside the map: "this is us" (first branch; needs media.storefront)
export { default as ArchVisit } from './visit/ArchVisit' // The map seen through an arch, with address, hours, WhatsApp and directions
export { default as FindVisit } from './visit/FindVisit' // "Find us." huge, the address beside it, the map full width beneath
export { default as SlimVisit } from './visit/SlimVisit' // Band: one-line address and directions over a slim map strip
export { default as PostcardVisit } from './visit/PostcardVisit' // A postcard: invitation on one side, address and map stamp on the other
export { default as TabsVisit } from './visit/TabsVisit' // Map, hours and contact in three tabs (first branch)
export { default as ActionsVisit } from './visit/ActionsVisit' // Wide map with directions, WhatsApp and call cards over its foot
export { default as MedallionVisit } from './visit/MedallionVisit' // The map as a round medallion in a gold ring, address and hours beside
export { default as ClassifiedVisit } from './visit/ClassifiedVisit' // A double-ruled classified ad with the details beside a grey map
export { default as BleedVisit } from './visit/BleedVisit' // The map edge to edge with an address card over its corner
export { default as PassVisit } from './visit/PassVisit' // A ticket with the address and hours, the map as its stub
export { default as StickyVisit } from './visit/StickyVisit' // A tall map beside sticky branch details; tap a branch to move the map
export { default as BandVisit } from './visit/BandVisit' // Brand band between zari borders: address, hours and a map strip
export { default as DarkVisit } from './visit/DarkVisit' // Dark: the map in night tones in a gold frame, details beside
export { default as PhoneVisit } from './visit/PhoneVisit' // A drawn phone showing the map with a big Start button
export { default as HoursVisit } from './visit/HoursVisit' // Open now and the week beside a night-toned map, branch buttons
export { default as OpenVisit } from './visit/OpenVisit' // The map with an open-now badge pinned over its corner

// Always within reach (place one in a design beside SiteShell, not in a page; not with a nav that has a phone dock)
export { default as FloatingWhatsApp } from './contact/FloatingWhatsApp' // Round WhatsApp button in the bottom corner, after the hero
export { default as CallWhatsAppBar } from './contact/CallWhatsAppBar' // Phones only: Call and WhatsApp halves across the bottom, after the hero
export { default as DockWhatsApp } from './contact/DockWhatsApp' // Floating button opening WhatsApp, call and directions (place beside SiteShell)
export { default as LanguageWhatsApp } from './contact/LanguageWhatsApp' // Floating WhatsApp pill greeting in their language, listing the languages they speak
export { default as TopicsWhatsApp } from './contact/TopicsWhatsApp' // Floating button opening topics, each a ready-written WhatsApp message (beside SiteShell)
export { default as PriceWhatsApp } from './contact/PriceWhatsApp' // Floating pill joining their lowest price to a WhatsApp button (beside SiteShell)
export { default as RingWhatsApp } from './contact/RingWhatsApp' // Round WhatsApp button with a thread ring that closes as she scrolls (beside SiteShell)
export { default as ReviewWhatsApp } from './contact/ReviewWhatsApp' // WhatsApp pill with one short real review above it, closable (beside SiteShell)
export { default as OwnerWhatsApp } from './contact/OwnerWhatsApp' // Floating pill: the owner’s face (with permission) and "Chat with" her name (beside SiteShell)
export { default as PhotoWhatsApp } from './contact/PhotoWhatsApp' // Floating "Saw a design you love? Send the photo" pill (beside SiteShell)
export { default as NudgeWhatsApp } from './contact/NudgeWhatsApp' // Round WhatsApp button with a closable bubble naming what they’re known for
export { default as TabWhatsApp } from './contact/TabWhatsApp' // A slim "WhatsApp us" tab on the right edge (beside SiteShell)
export { default as FormWhatsApp } from './contact/FormWhatsApp' // Floating "Ask us" pill opening name and need fields (beside SiteShell)
export { default as FittingWhatsApp } from './contact/FittingWhatsApp' // Floating "Book a fitting" pill opening a week of days (beside SiteShell)
export { default as OpenWhatsApp } from './contact/OpenWhatsApp' // Floating WhatsApp pill reading the real hours: open now, or when it opens (beside SiteShell)
export { default as StatusWhatsApp } from './contact/StatusWhatsApp' // Slim band with open-now status and a WhatsApp link, for under the nav

// Wrappers
export { default as StitchLine } from '../motion/StitchLine' // Running stitch sewn down the left of the sections it wraps

// Speciality (each shows only when their services say they do this work)
export { default as BuilderBlouse } from './blouse/BuilderBlouse' // Pick neck, back and sleeves; live front and back drawings; send the design on WhatsApp
export { default as StitchBlouse } from './blouse/StitchBlouse' // Stitch line: four steps on a dashed thread; picked step opens below; live front and back drawings
export { default as NecksBlouse } from './blouse/NecksBlouse' // Every neckline as a drawn card with what it suits, then back and sleeves
export { default as StepsBlouse } from './blouse/StepsBlouse' // Design a blouse one question at a time, with progress and live drawings
export { default as GuideBlouse } from './blouse/GuideBlouse' // Neckline guide: each neck drawn, what it suits, what to wear with it
export { default as SlipBlouse } from './blouse/SlipBlouse' // A tailor's order slip with ticked options, sent on WhatsApp
export { default as OccasionBlouse } from './blouse/OccasionBlouse' // Pick the occasion to preset a design, then change any part
export { default as DialsBlouse } from './blouse/DialsBlouse' // Mix and match: neck, back and sleeve dials turned with arrows, live drawings
export { default as ExtrasBlouse } from './blouse/ExtrasBlouse' // Finishing touches (piping, tie, tassels, zari, their handwork) ticked onto the drawing
export { default as SpecBlouse } from './blouse/SpecBlouse' // Neck, back and sleeve choices read back on a dotted-leader spec sheet
export { default as ArchBlouse } from './blouse/ArchBlouse' // Every neckline drawn inside a temple arch; tap one for what it suits
export { default as TurnBlouse } from './blouse/TurnBlouse' // One large drawing with a Front/Back switch, choices beside
export { default as NotesBlouse } from './blouse/NotesBlouse' // Four classic neck, back and sleeve combinations, drawn, each with an ask
export { default as RoomBlouse } from './blouse/RoomBlouse' // Dark design room: large drawing in the middle, choices either side
export { default as ChatBlouse } from './blouse/ChatBlouse' // A scripted chat asks neck, back, sleeves; quick replies; drawing at the end
export { default as FaceBlouse } from './blouse/FaceBlouse' // Pick a face shape; the necklines to try and to skip, drawn
export { default as TabsBlouse } from './blouse/TabsBlouse' // Tabs per part with drawn option tiles, a summary card beside
export { default as MedallionBlouse } from './blouse/MedallionBlouse' // On brand colour between zari borders: necklines in gold-ringed rounds
export { default as SketchBlouse } from './blouse/SketchBlouse' // Graph paper, the blouse drawn at angles, notes written beside
export { default as DeckBlouse } from './blouse/DeckBlouse' // Dark: four classic combinations as a deck dealt with arrows
export { default as PhotoBlouse } from './blouse/PhotoBlouse' // One of their blouses beside the designer: start from it and change it
export { default as SendBlouse } from './blouse/SendBlouse' // "Saw a design you love?" photo card beside a three-tap builder
export { default as GuideMeasure } from './measure/GuideMeasure' // The ten blouse measurements; the drawing shows where the tape goes
export { default as FormMeasure } from './measure/FormMeasure' // Fill in measurements (inches or cm) and send them on WhatsApp
export { default as ChartMeasure } from './measure/ChartMeasure' // General blouse size chart in inches or cm, labelled as starting points
export { default as TipsMeasure } from './measure/TipsMeasure' // What you need and five tips before measuring
export { default as StepMeasure } from './measure/StepMeasure' // One measurement at a time with its tape line and a field
export { default as BringMeasure } from './measure/BringMeasure' // "Not sure?" bring a blouse that fits, or come in to be measured
export { default as KeyMeasure } from './measure/KeyMeasure' // All ten tape lines numbered on the front and back drawing, with a key
export { default as StepperMeasure } from './measure/StepperMeasure' // Set each measurement with big plus and minus buttons, then send
export { default as TapeMeasure } from './measure/TapeMeasure' // Dark: measurements as lengths of gold tape; tap one for its drawing
export { default as ProfileMeasure } from './measure/ProfileMeasure' // A fit profile card: name, ten fields, filled count, send on WhatsApp
export { default as SizeMeasure } from './measure/SizeMeasure' // Tap a bust size for the usual under bust, shoulder, armhole, sleeve
export { default as QuestionsMeasure } from './measure/QuestionsMeasure' // Questions about measuring yourself, answered (general advice)
export { default as CardsMeasure } from './measure/CardsMeasure' // A card per measurement with its drawing; tap for how to take it
export { default as DeckMeasure } from './measure/DeckMeasure' // Dark: measurement cards dealt one by one with drawing and how-to
export { default as BandMeasure } from './measure/BandMeasure' // On brand colour between zari borders: measurement chips and the drawing
export { default as NotesMeasure } from './measure/NotesMeasure' // "Fit notes": how to take each measurement in two magazine columns
export { default as NeedsSaree } from './saree/NeedsSaree' // Tick the saree work you need (their own saree services) and send it in one message
export { default as IndexMen } from './men/IndexMen' // Every men's piece as a ruled index row with a WhatsApp ask
export { default as RowsHandwork } from './handwork/RowsHandwork' // The handwork they list, each explained: what it is and what it suits
export { default as SpreadLookbook } from './lookbook/SpreadLookbook' // Lookbook in chapters by occasion: one tall photo and two small (look-<occasion>-NN.jpg)
export { default as OccasionLookbook } from './lookbook/OccasionLookbook' // Occasion chips filter a grid of looks, each with "Ask for this look"
export { default as ViewerLookbook } from './lookbook/ViewerLookbook' // Large look photo beside the list of looks
export { default as FilmLookbook } from './lookbook/FilmLookbook' // Dark wide viewer with a thumbnail strip, previous/next
export { default as ArchesLookbook } from './lookbook/ArchesLookbook' // Five looks in a row of arches with their occasions
export { default as AskLookbook } from './lookbook/AskLookbook' // One look with three ways to ask: same, my colours, something like it
export { default as FunctionsLookbook } from './lookbook/FunctionsLookbook' // A look per wedding function, in order, along a thread (look-<function>-NN.jpg)
export { default as OffsetLookbook } from './lookbook/OffsetLookbook' // Looks in three columns with the middle one dropped, each with an ask
export { default as ChaptersLookbook } from './lookbook/ChaptersLookbook' // Dark chapters: a wide photo per occasion with its name set large
export { default as CoverLookbook } from './lookbook/CoverLookbook' // Dark magazine cover beside the list of looks; pick one for the cover
export { default as BookLookbook } from './lookbook/BookLookbook' // Looks as an open book, two to a spread, arrows to turn
export { default as MoodLookbook } from './lookbook/MoodLookbook' // Looks taped to a mood board among their fabric swatches
export { default as DeckLookbook } from './lookbook/DeckLookbook' // Dark: looks as a stack of prints dealt with arrows
export { default as BandLookbook } from './lookbook/BandLookbook' // On brand colour between zari borders: looks in double gold frames
export { default as DrapesSaree } from './saree/DrapesSaree' // A photo row per saree drape with its note and a booking link (drape-<style>.jpg)
export { default as LengthsSaree } from './saree/LengthsSaree' // Saree lengths as bars: body, pallu, blouse piece
export { default as AskSaree } from './saree/AskSaree' // "I need…" lines, one WhatsApp ask per saree service
export { default as PleatSaree } from './saree/PleatSaree' // Pre-pleating explained in three steps beside a drape photo
export { default as DoctorSaree } from './saree/DoctorSaree' // Pick the saree problem; see the fix they offer
export { default as ExpressSaree } from './saree/ExpressSaree' // "Need it sooner?" with their express time and saree services (needs pricing.express)
export { default as DropSaree } from './saree/DropSaree' // Drop off, we finish, pick up: three steps with their branches and hours
export { default as PicoSaree } from './saree/PicoSaree' // A raw frayed edge beside a picoed one, drawn (needs pico)
export { default as FallSaree } from './saree/FallSaree' // Pick the saree colour; the drawing shows a matching fall (needs a fall service)
export { default as PalluSaree } from './saree/PalluSaree' // Kuchu, fringe, lace or plain: the pallu drawing changes (needs kuchu/tassels)
export { default as IndexSaree } from './saree/IndexSaree' // Sarees by kind with care and which of their services each often needs
export { default as CareSaree } from './saree/CareSaree' // Saree care cheat sheet: wash, iron and store per kind, in one table
export { default as ManySaree } from './saree/ManySaree' // Count the sarees and tick the services; one WhatsApp message
export { default as MapSaree } from './saree/MapSaree' // Tap body, border, pallu or blouse piece for their services on it
export { default as PleatsSaree } from './saree/PleatsSaree' // Dark: add or remove pleats; the drawn fan grows (needs pleating)
export { default as WeekSaree } from './saree/WeekSaree' // Mehendi to reception: the saree each day calls for and what it needs
export { default as DrapingSaree } from './saree/DrapingSaree' // Dark: pick a day and time to come in and be draped (needs draping)
export { default as SeasonSaree } from './saree/SeasonSaree' // Silk care in tabs: monsoon, after the rains, wedding season, summer
export { default as UnderSaree } from './saree/UnderSaree' // Petticoat, shapewear, fall, lining: what each does, theirs marked
export { default as RackSaree } from './saree/RackSaree' // Their drapes as strips hanging from a rod, names down the side
export { default as BothSaree } from './saree/BothSaree' // Bring the saree and its blouse piece together: two columns of services
export { default as WaysSaree } from './saree/WaysSaree' // One silk saree three ways: blouse, jewellery and drape for each
export { default as TimesSaree } from './saree/TimesSaree' // Each saree job with its usual days in ruled rows, each an ask (needs 6j work times)
export { default as GroomMen } from './men/GroomMen' // The groom's look for each function, in order (groom-<function>.jpg)
export { default as EditMen } from './men/EditMen' // Their men's work (work-men-NN.jpg) in alternating rows on dark
export { default as DressMen } from './men/DressMen' // What to wear for office, wedding guest, groom, reception (needs a Men group)
export { default as FormMen } from './men/FormMen' // His six measurements with how-to lines, sent on WhatsApp
export { default as FabricMen } from './men/FabricMen' // How much fabric each men's garment usually needs
export { default as ShirtMen } from './men/ShirtMen' // Build a shirt: collar, cuffs, pocket and fit, sent as a sentence (needs shirts)
export { default as EastWestMen } from './men/EastWestMen' // Ethnic and western men’s wear as two panels; needs both
export { default as CollarMen } from './men/CollarMen' // Four collars drawn as line art; pick one to ask for it (needs shirts)
export { default as BreakMen } from './men/BreakMen' // No, half or full trouser break drawn simply (needs trousers)
export { default as FitMen } from './men/FitMen' // Slim, regular, relaxed drawn as shirt shapes with the usual ease
export { default as SuitingMen } from './men/SuitingMen' // Suiting weaves drawn as swatches (pinstripe, herringbone…) to ask about
export { default as StepsMen } from './men/StepsMen' // Men’s tailoring in four steps on a thread, then their men’s pieces
export { default as AlterMen } from './men/AlterMen' // Six quick men’s alterations, each a WhatsApp ask
export { default as NotesMen } from './men/NotesMen' // Which cloth for what, for men, in ruled rows
export { default as MonogramMen } from './men/MonogramMen' // Type his initials; they appear on a drawn shirt cuff (needs shirts)
export { default as HeroMen } from './men/HeroMen' // Dark: a men’s work photo beside "Cut for you, not for a size"
export { default as PairMen } from './men/PairMen' // Pick kurta and jacket colours; a drawing shows the pair
export { default as PlainHandwork } from './handwork/PlainHandwork' // The same blouse plain and with handwork, with a switch (plain-NN + worked-NN)
export { default as ZonesHandwork } from './handwork/ZonesHandwork' // Where the work goes: neckline, sleeves, back, all over, lit on the drawing
export { default as CompareHandwork } from './handwork/CompareHandwork' // Hand or machine compared; needs both in their services
export { default as CareHandwork } from './handwork/CareHandwork' // Six care notes for embroidered pieces
export { default as ChooseHandwork } from './handwork/ChooseHandwork' // Two questions suggest one of the works they do
export { default as TextureHandwork } from './handwork/TextureHandwork' // Close-ups of the stitches in a tight grid (needs media.closeups)
export { default as HowHandwork } from './handwork/HowHandwork' // How handwork is done in four stages, then the work they do
export { default as MixHandwork } from './handwork/MixHandwork' // Pick two of their works and ask about combining them
export { default as MotifsHandwork } from './handwork/MotifsHandwork' // Six classic motifs in alternating rows, each with an ask
export { default as SpoolsHandwork } from './handwork/SpoolsHandwork' // A thread spool per kind of work they do; tap one to lift it and ask
export { default as ZariHandwork } from './handwork/ZariHandwork' // Dark: zari colours (antique gold, silver, copper…) to pick and ask
export { default as MaterialsHandwork } from './handwork/MaterialsHandwork' // Zari, sequins, beads, pearls, kundan, mirrors in a ruled list
export { default as NamesHandwork } from './handwork/NamesHandwork' // Dark: type names and date; they appear across a drawn blouse back
export { default as AddaHandwork } from './handwork/AddaHandwork' // A drawn adda frame; chips switch the stitch on the cloth
export { default as HeavyHandwork } from './handwork/HeavyHandwork' // Dark: light to bridal; the drawn texture gets denser
export { default as SamplerHandwork } from './handwork/SamplerHandwork' // A framed sampler cloth with a drawn square of each work they do
export { default as WeddingHandwork } from './handwork/WeddingHandwork' // Wedding scenes to work into a bridal blouse, each an ask
export { default as ColourHandwork } from './handwork/ColourHandwork' // Pick the fabric colour; thread colours that suit it appear
export { default as DaysHandwork } from './handwork/DaysHandwork' // Each handwork as a bar as long as its usual days; tap one to ask (needs 6j work times)
export { default as BorderHandwork } from './handwork/BorderHandwork' // Each handwork as a drawn saree border with its usual days, each an ask (needs 6j work times)
export { default as CornerKids } from './kids/CornerKids' // Kids' services, the ages they stitch for and their kids' work
export { default as MatchingKids } from './kids/MatchingKids' // Matching outfits as arched pairs: mother and daughter, siblings (match-NN-a + b)
export { default as IndexKids } from './kids/IndexKids' // Kids' pieces as a typeset index with ages and an ask per row
export { default as EditKids } from './kids/EditKids' // Their kids' work in alternating photo rows with notes
export { default as SizesKids } from './kids/SizesKids' // General children's size guide by age, labelled as a starting point
export { default as SlipKids } from './kids/SlipKids' // A kids' order slip: name, age, occasion, piece
export { default as FirstsKids } from './kids/FirstsKids' // A year of firsts: naming, first rice, birthday, festival, each an ask
export { default as ClotheslineKids } from './kids/ClotheslineKids' // Kids’ work pegged on a washing line (work-kids-NN.jpg)
export { default as MiniMeKids } from './kids/MiniMeKids' // Matching pairs big and small on one baseline (match-NN-a + b)
export { default as GrowthKids } from './kids/GrowthKids' // A measuring stick of ages; tap one for usual height, chest and length
export { default as BoothKids } from './kids/BoothKids' // Dark: kids’ work as two tilted photo-booth strips
export { default as OneKids } from './kids/OneKids' // Dark: one kids’ piece large with its note, arrows to step
export { default as FabricsKids } from './kids/FabricsKids' // Fabrics that suit children with a softness line (needs a Kids group)
export { default as InviteKids } from './kids/InviteKids' // A birthday invitation card on confetti with an RSVP on WhatsApp
export { default as GrandparentsKids } from './kids/GrandparentsKids' // A letter-style gift order from grandparents, From and For written in
export { default as WhenKids } from './kids/WhenKids' // Pick the day it’s needed; the order-by date from their delivery days
export { default as ThemesKids } from './kids/ThemesKids' // Party themes as colour strips; ask for an outfit in one
export { default as RateAlterations } from './alterations/RateAlterations' // Printed rate card of their alteration prices (needs prices permission)
export { default as EstimateAlterations } from './alterations/EstimateAlterations' // Tick alterations, see the estimate from their rates, send on WhatsApp
export { default as SearchAlterations } from './alterations/SearchAlterations' // Search their alteration rates; asks about what she typed
export { default as LadderAlterations } from './alterations/LadderAlterations' // Alteration rates as bars, cheapest first
export { default as ReceiptAlterations } from './alterations/ReceiptAlterations' // Alteration rates printed like a torn till receipt
export { default as FromAlterations } from './alterations/FromAlterations' // Alterations from their lowest price, set huge, beside every rate
export { default as BoardAlterations } from './alterations/BoardAlterations' // Alteration rates on a dark letter board in a frame (with permission)
export { default as OrNewAlterations } from './alterations/OrNewAlterations' // Alter or stitch new: rate against starting price per garment (with permission)
export { default as GarmentAlterations } from './alterations/GarmentAlterations' // Garments as large words; the fixes and prices for the one picked (with permission)
export { default as PinsAlterations } from './alterations/PinsAlterations' // Pins on a blouse drawing; tap one for that part’s prices (with permission)
export { default as GridAlterations } from './alterations/GridAlterations' // Every alteration rate in one table, grouped by garment (with permission)
export { default as QuoteAlterations } from './alterations/QuoteAlterations' // Garment and problem chips write the WhatsApp question
export { default as PhoneAlterations } from './alterations/PhoneAlterations' // Alteration rates as a drawn phone settings screen (with permission)
export { default as BringAlterations } from './alterations/BringAlterations' // Four numbered things to bring for an alteration
export { default as FixableAlterations } from './alterations/FixableAlterations' // "Is it fixable?": each rate as a question that opens, price in the row
export { default as ExpressAlterations } from './alterations/ExpressAlterations' // A Usual/Express switch over their rates (needs both times)
export { default as QuickAlterations } from './alterations/QuickAlterations' // Alterations with their usual days, sorted quickest or cheapest first (needs days in 6d)
export { default as ReadyAlterations } from './alterations/ReadyAlterations' // Tap a fix; a calendar tile shows the day it's usually ready if brought in today (needs days in 6d)
export { default as BuilderGift } from './gift/BuilderGift' // Pick an amount and names; the voucher card fills in; request on WhatsApp
export { default as BuysGift } from './gift/BuysGift' // Each voucher amount beside what it covers at their starting prices
export { default as SentenceGift } from './gift/SentenceGift' // A voucher as one sentence with the blanks filled in place
export { default as OccasionGift } from './gift/OccasionGift' // Pick the occasion; the voucher wording changes to suit
export { default as MessageGift } from './gift/MessageGift' // Pick a ready-made message for the voucher card, or write one
export { default as SliderGift } from './gift/SliderGift' // Slide to any amount; see what it covers at their starting prices
export { default as ServiceGift } from './gift/ServiceGift' // Gift a stitching: each service at its starting price as a voucher (with permission)
export { default as BulkGift } from './gift/BulkGift' // Pick an amount, count up vouchers, see the total; for return gifts
export { default as EnvelopeGift } from './gift/EnvelopeGift' // Tap the sealed envelope and the voucher slides out (needs giftVouchers)
export { default as PostcardGift } from './gift/PostcardGift' // A gift voucher as a postcard with their logo as the stamp
export { default as TagGift } from './gift/TagGift' // Type To and From; they appear on a kraft gift tag
export { default as NoteGift } from './gift/NoteGift' // Vouchers drawn as banknotes with guilloche lines, one per amount
export { default as CardGift } from './gift/CardGift' // Write a message; tap the folding card to see it inside
export { default as RibbonGift } from './gift/RibbonGift' // A brand band tied with a gold ribbon and bow: vouchers and amounts
export { default as LetterGift } from './gift/LetterGift' // A gift voucher as a cream letter sealed with their initial
export { default as AmmaGift } from './gift/AmmaGift' // "For Amma": a voucher for a mother beside an arched photo
export { default as DesignsGift } from './gift/DesignsGift' // Card designs named large; the card beside changes to the one picked
export { default as RailRental } from './rental/RailRental' // Rental pieces hanging from a rail with swing tags and "Ask to rent"
export { default as AvailabilityRental } from './rental/AvailabilityRental' // Pick a rental piece and a date; asks on WhatsApp if it's free
export { default as IndexRental } from './rental/IndexRental' // Rental pieces as a list; the chosen one's photo, sizes and rent beside it
export { default as ShowroomRental } from './rental/ShowroomRental' // Dark showroom, one rental piece at a time in an arch
export { default as CompareRental } from './rental/CompareRental' // Rent or stitch? compared from their own numbers
export { default as DetailRental } from './rental/DetailRental' // One rental piece in detail with thumbnails to switch
export { default as WardrobeRental } from './rental/WardrobeRental' // Rental pieces as strips in an open wardrobe; the tapped one opens wide (needs rentals)
export { default as PassRental } from './rental/PassRental' // Each rental piece as a ticket with a stub for rent per day (needs rentals)
export { default as ArchRental } from './rental/ArchRental' // Each rental piece in a gold-edged temple arch with an ask (needs rentals)
export { default as DeckRental } from './rental/DeckRental' // Dark: rental pieces as a stack dealt with arrows, details beside (needs rentals)
export { default as MagazineRental } from './rental/MagazineRental' // "Rent the look" magazine page: one piece large, the rest listed
export { default as BandRental } from './rental/BandRental' // On brand colour between zari borders: pieces in gold frames
export { default as StepsRental } from './rental/StepsRental' // How renting works in four steps, then the first pieces (needs rentals)
export { default as SwatchFabrics } from './fabric/SwatchFabrics' // Fabrics they stock as pinked swatches with what each is best for
export { default as BringFabric } from './fabric/BringFabric' // "Have your own fabric?" send-a-photo card, with their fabrics as quick links
export { default as GuideFabrics } from './fabric/GuideFabrics' // Fabric list beside a large swatch with what it's best for
export { default as IndexFabrics } from './fabric/IndexFabrics' // Fabrics as typeset rows with a round swatch and a WhatsApp ask
export { default as TagsFabrics } from './fabric/TagsFabrics' // Fabrics on punched swing tags that settle from a sway
export { default as ArchFabrics } from './fabric/ArchFabrics' // Each fabric in a gold-edged arch with an ask
export { default as FanFabrics } from './fabric/FanFabrics' // Fabrics fanned like a shade card; tap one to lift it and see its name (needs fabrics)
export { default as NotesFabrics } from './fabric/NotesFabrics' // "Know your fabric": swatch, name and use in two ruled columns (needs fabrics)
export { default as OccasionFabrics } from './fabric/OccasionFabrics' // Occasion chips show their fabrics whose notes suit it (needs fabrics)
export { default as CareFabrics } from './fabric/CareFabrics' // Tabs per fabric they stock with how to wash, iron and store it
export { default as RollFabrics } from './fabric/RollFabrics' // Each fabric as the round end of a rolled bolt (needs fabrics)
export { default as PinboardFabrics } from './fabric/PinboardFabrics' // Swatches taped to a workroom board with written names (needs fabrics)
export { default as CompareFabrics } from './fabric/CompareFabrics' // Pick two fabrics; weight, sheen and drape as dot scales
export { default as ShelfFabrics } from './fabric/ShelfFabrics' // Dark: fabric bolts on a gold shelf; tap one to lift it
export { default as BandFabrics } from './fabric/BandFabrics' // On brand colour between zari borders: swatches in double gold frames
export { default as ScaleFabrics } from './fabric/ScaleFabrics' // Their fabrics plotted light to heavy, matte to shiny
export { default as DeckFabrics } from './fabric/DeckFabrics' // Dark: swatch cards stacked and dealt with arrows
export { default as FinderFabrics } from './fabric/FinderFabrics' // Pick the occasion and feel; their fabrics that fit appear
export { default as RosterTeam } from './team/RosterTeam' // The team as an editorial roster: name, role, years, a line (photos only with consent)
export { default as FounderTeam } from './team/FounderTeam' // The founder and their story, with the team named beneath
export { default as CraftTeam } from './team/CraftTeam' // Who does what: roles set large with names and years
export { default as OneTeam } from './team/OneTeam' // One team member at a time, portrait with consent or initials
export { default as YearsTeam } from './team/YearsTeam' // Their combined years huge, each person's years on a dotted leader
export { default as MakersTeam } from './team/MakersTeam' // The designer on dark beside the makers on light
export { default as SignaturesTeam } from './team/SignaturesTeam' // Each person’s name over a signature line, role and years beneath (needs team)
export { default as QuoteTeam } from './team/QuoteTeam' // One person’s line as a pull quote, quoted only in their own voice (needs team)
export { default as AskTeam } from './team/AskTeam' // Pick what you need; the team member whose role covers it, with an ask
export { default as HandsTeam } from './team/HandsTeam' // The people a piece passes through, in order, on a thread (needs three)
export { default as ContributorsTeam } from './team/ContributorsTeam' // A magazine contributors page in two ruled columns
export { default as ColophonTeam } from './team/ColophonTeam' // "Designed by…, cut by…, stitched by…" as one credit band
export { default as NumbersTeam } from './team/NumbersTeam' // Dark band: people, years between them, year started, rating
export { default as GroupTeam } from './team/GroupTeam' // The team photo wide with everyone’s name and role beneath (needs teamAtWork)
export { default as CardsClasses } from './classes/CardsClasses' // Classes as cards: level, length, next batch, fee, ask to join
export { default as EnrolClasses } from './classes/EnrolClasses' // Name, class and age group written into a WhatsApp enrolment
export { default as BatchesClasses } from './classes/BatchesClasses' // Upcoming batches, soonest first, date set large
export { default as LevelsClasses } from './classes/LevelsClasses' // Classes in columns by level (needs two levels)
export { default as CalendarClasses } from './classes/CalendarClasses' // Upcoming batches with "Add to calendar" and "Ask for a seat"
export { default as CompareClasses } from './classes/CompareClasses' // Classes compared in a table: level, length, next batch, fee
export { default as PosterClasses } from './classes/PosterClasses' // Their next class as a workshop poster: name huge, level, length, date, fee
export { default as GlossaryClasses } from './classes/GlossaryClasses' // A tailoring glossary of words she’ll learn in class (needs classes)
export { default as TeacherClasses } from './classes/TeacherClasses' // Meet the teacher (a team member whose role teaches) and their classes
export { default as FinderClasses } from './classes/FinderClasses' // "How much have you stitched?" shows the classes at that level
export { default as HeroClasses } from './classes/HeroClasses' // Workroom photo with the next class on a card over its foot
export { default as TogetherClasses } from './classes/TogetherClasses' // "I’d like to join [class] with [− 2 +] friends", sent on WhatsApp
export { default as CampClasses } from './classes/CampClasses' // A summer or holiday camp beside a workroom photo (only a camp class)
export { default as JournalPosts } from './posts/JournalPosts' // Style notes under a ruled masthead: the newest as lead, the rest listed
export { default as TipPosts } from './posts/TipPosts' // One style note at a time on the brand colour
export { default as NotebookPosts } from './posts/NotebookPosts' // Style notes as a dated notebook page
export { default as ContentsPosts } from './posts/ContentsPosts' // Style notes with a two-column contents page linking down
export { default as SearchPosts } from './posts/SearchPosts' // Search the style notes; ask on WhatsApp when nothing matches
export { default as LongPosts } from './posts/LongPosts' // One style note as a long read with a drop capital; others listed to swap in
export { default as QuickPosts } from './posts/QuickPosts' // Style notes as short tip cards in a wrapping grid
export { default as EssayPosts } from './posts/EssayPosts' // Style notes with photos as alternating photo-and-text rows
export { default as LeadPosts } from './posts/LeadPosts' // The newest note as a large lead, the next three in ruled columns
export { default as StartPosts } from './posts/StartPosts' // "Start here": their first three notes kept in view beside the rest
export { default as ProgressPosts } from './posts/ProgressPosts' // The newest note as a long read with a sticky progress line and minutes left
export { default as TipsPosts } from './posts/TipsPosts' // Dark: one-minute tip clips as titled cards in a grid (needs tip-NN.mp4)

// Wedding planner (undated; each shows only for a boutique that does bridal work)
export { default as CardWedding } from './wedding/CardWedding' // The wedding wardrobe as an invitation: each function and what the bride often wears
export { default as CountWedding } from './wedding/CountWedding' // Steppers per family member; the total outfits set huge, sent on WhatsApp
export { default as FamilyWedding } from './wedding/FamilyWedding' // The bride with the family in a ring around her; tap one for what suits them
export { default as ColoursWedding } from './wedding/ColoursWedding' // A palette strip for each function, in order
export { default as BagWedding } from './wedding/BagWedding' // The wedding-day bag: a checklist of outfit savers to strike through
export { default as GroupWedding } from './wedding/GroupWedding' // A drawn family WhatsApp group with the boutique in it; ask them to join
export { default as SidesWedding } from './wedding/SidesWedding' // Bride’s side on paper, groom’s side on dark, from their services (needs a Men group)
export { default as GuestWedding } from './wedding/GuestWedding' // Going as a guest: each relation and what usually suits, each an ask
export { default as ReadyWedding } from './wedding/ReadyWedding' // How ready are you: an undated outfit checklist with a big percentage
export { default as DateWedding } from './wedding/DateWedding' // Save the date: type names and date; a card fills in; start on the outfits
export { default as CeremoniesWedding } from './wedding/CeremoniesWedding' // Tick the ceremonies; the bride’s outfit list and count update
export { default as PlanWedding } from './wedding/PlanWedding' // Pick the wedding date; each piece’s order-by date from their lead times (needs leadTimes)
export { default as MonthsWedding } from './wedding/MonthsWedding' // Three month calendars marking each order-by day and the wedding (needs leadTimes)
export { default as LeftWedding } from './wedding/LeftWedding' // Dark: days to go set huge with the next three pieces to order (needs leadTimes)
export { default as WhereWedding } from './wedding/WhereWedding' // Dark: slide weeks to go; what should be ordered by now and what’s next (needs leadTimes)
