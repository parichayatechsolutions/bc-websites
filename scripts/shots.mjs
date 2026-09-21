#!/usr/bin/env node
// scripts/shots.mjs
// Screenshots boutique pages down their full length, so a change can be
// judged by looking at it rather than by reading code.
//
//   npm run dev                      (in another terminal)
//   npm run shots                    → sample-boutique
//   npm run shots -- priya-boutique  → just that one
//   npm run shots -- priya-boutique/contact   → one page of it
//
// Writes .shots/<slug>/<view>-<nn>.png for three views: desktop (1440×900),
// mobile (390×844) and reduced-motion mobile. Also reports any page errors.
// Uses the installed Google Chrome; set CHROME_PATH if it lives elsewhere.

import { mkdirSync, rmSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer-core'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const base = process.env.SHOTS_URL ?? 'http://localhost:3000'
const chrome =
  process.env.CHROME_PATH ??
  {
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  }[process.platform] ??
  '/usr/bin/google-chrome'

const slugs = process.argv.slice(2).length ? process.argv.slice(2) : ['sample-boutique']

const VIEWS = [
  { name: 'desktop', width: 1440, height: 900, stops: 12 },
  { name: 'mobile', width: 390, height: 844, stops: 12 },
  { name: 'reduced', width: 390, height: 844, stops: 4, reducedMotion: true },
]

const wait = (ms) => new Promise((r) => setTimeout(r, ms))

try {
  await fetch(base)
} catch {
  console.error(`Nothing is running at ${base}. Start it with: npm run dev`)
  process.exit(1)
}

const browser = await puppeteer.launch({ executablePath: chrome, headless: true })
let failed = false

for (const slug of slugs) {
  const out = join(root, '.shots', slug.replace(/\//g, '--'))
  rmSync(out, { recursive: true, force: true })
  mkdirSync(out, { recursive: true })

  for (const view of VIEWS) {
    const page = await browser.newPage()
    const errors = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    await page.setViewport({ width: view.width, height: view.height })
    if (view.reducedMotion) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])

    await page.goto(`${base}/${slug}`, { waitUntil: 'networkidle0' })
    await wait(1800)

    // Scroll in small steps so scroll-driven sections play as they would for a visitor.
    const total = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight)
    for (let i = 0; i < view.stops; i++) {
      const y = Math.round((total * i) / (view.stops - 1))
      await page.evaluate((y) => window.scrollTo(0, y), y)
      await wait(900)
      await page.screenshot({ path: join(out, `${view.name}-${String(i).padStart(2, '0')}.png`) })
    }

    const horizontal = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)
    if (horizontal) errors.push('Page scrolls sideways: something is wider than the screen.')

    console.log(`${slug} ${view.name}: ${view.stops} shots${errors.length ? '' : ', no errors'}`)
    for (const e of errors) console.log(`  ✗ ${e}`)
    failed ||= errors.length > 0
    await page.close()
  }
  console.log(`  → .shots/${slug.replace(/\//g, '--')}/`)
}

await browser.close()
process.exit(failed ? 1 : 0)
