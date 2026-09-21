# bc-websites

One codebase for boutique demo websites. The design and motion are shared; each boutique is just a folder of data and photos.

## Running it

```bash
npm install
npm run dev            # http://localhost:3000 lists every demo
                       # http://localhost:3000/<folder-name> shows one
npm run build          # production build of all demos
VITE_TENANT=<folder-name> npm run build   # one boutique only, for its own domain
npm run config -- <folder-name>   # data.md → config.ts, then validates it
npm run validate       # check every boutique's data and photos
npm run check          # validate + type check + build
npm run shots          # screenshots into .shots/ (needs npm run dev running)
```

Before any design change, read [docs/DESIGN.md](docs/DESIGN.md).

Stack: React + Vite + Tailwind, with Lenis (smooth scrolling) and GSAP ScrollTrigger / SplitText (scroll-linked animation). Everything respects the visitor's reduced-motion setting.

## Structure

```
bc-websites/
├── boutiques/                 One folder per boutique (data only, no code)
│   ├── _template/             Starting point for every new boutique. Don't edit per boutique.
│   │   ├── sample-data-template.md   The data sheet the field team fills in
│   │   └── photos/
│   └── sample-boutique/       Worked example with made-up data → http://localhost:3000/sample-boutique
│       ├── data.md            Filled-in data sheet (team fills this)
│       └── photos/            Logo, storefront, work photos, clips
│
├── src/
│   ├── types/boutique.ts      The config shape every boutique follows
│   ├── app/                   Routing, boutique loading, demo list
│   ├── motion/                Smooth scroll, GSAP setup, the running-stitch line
│   ├── components/            Small shared pieces: Media (photo/video/placeholder), Button, Logo
│   ├── sections/              The component library, one folder per job
│   │   ├── index.ts           Catalog: every component with a one-line description
│   │   └── nav/ hero/ story/ gallery/ process/ services/ reviews/ visit/ footer/
│   ├── sites/                 One folder per boutique (code)
│   │   ├── _template/Site.tsx Starter page every new boutique gets
│   │   └── sample-boutique/
│   │       ├── config.ts      Generated from data.md by npm run config (don't edit by hand)
│   │       └── Site.tsx       This boutique's page: components from the library, in order
│   └── theme/                 Brand colours → safe palette (theme.ts), approved font pairs (fonts.ts)
│
├── docs/DESIGN.md             Design system: colours, type, motion, hover rules, definition of done
├── CLAUDE.md                  Rules loaded automatically by Claude Code in this repo
├── prompts/                   Gemini image and Veo video prompts
└── scripts/
    ├── new-boutique.mjs       Creates boutiques/<slug>/ and src/sites/<slug>/
    ├── build-config.mjs       data.md → src/sites/<slug>/config.ts (npm run config)
    ├── validate.mjs           Checks boutique data and photos (npm run validate)
    ├── lib/                   Data sheet parser and validation rules
    └── shots.mjs              Screenshots pages at desktop, mobile and reduced-motion sizes
```

## Adding a boutique

```bash
npm run new-boutique "Sri Lakshmi Designers"   # 1. creates boutiques/sri-lakshmi-designers/ and src/sites/sri-lakshmi-designers/
#                                                 2. the team fills in data.md and adds photos
npm run config -- sri-lakshmi-designers          # 3. makes config.ts from data.md and checks it
npm run dev                                      # 4. open http://localhost:3000/sri-lakshmi-designers
```

5. **Give it its own look** in `src/sites/sri-lakshmi-designers/Site.tsx`. It starts as a complete default page. Swap in other components from `src/sections/index.ts`, reorder them, and pick a font pair. The route `/sri-lakshmi-designers` exists automatically because the folder does.

The team only ever touches `boutiques/` (data and photos). All code, including each boutique's config and page, lives in `src/`.

**`data.md` is the source of truth.** To change anything about a boutique, edit its `data.md` and run `npm run config` again. The generated `config.ts` is overwritten each time. A `config.ts` written by hand is never overwritten unless you add `--force`.

`npm run config` refuses to make a config when required fields are missing, and explains what to fill in. It tidies what people actually write: phone numbers get +91, "same" for WhatsApp, `@handles` become links, colour names become colour codes (with a warning to check them), and "₹1,500 onwards" becomes 1500.

`npm run validate` checks every boutique (or `npm run validate -- <slug>` for one):

- **Errors** would break the site or misdirect customers: bad phone numbers, broken map links, wrong pincodes, iPhone HEIC photos. Fix these before showing a demo.
- **Warnings** make the site weaker: photos still to take, few reviews, heavy files.

Any photo the config names but that isn't in `photos/` yet shows on the site as a labelled placeholder ("Add photos/work-03.jpg"), so a demo works before every photo arrives. The validator lists them too, which gives the team its to-do list.

**Folder names** are lowercase with hyphens, no spaces: `Sri Lakshmi Designers` → `sri-lakshmi-designers`. The folder name becomes the demo link.

## Demo links

Unsold demos stay unlisted and `noindex` (`demo.noindex: true` in config) so they never appear on Google under the boutique's name. Share each link only with that boutique's owner.
