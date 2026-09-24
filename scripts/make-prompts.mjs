#!/usr/bin/env node
// scripts/make-prompts.mjs
// Writes boutiques/<slug>/photos/photos-prompt.md: the Gemini prompts for
// that boutique's photographs, built from their own data.md.
//
//   npm run prompts -- <slug>
//   npm run prompts -- --all
//
// Run it again after data.md changes; the file is generated, never edited.

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { allSlugs, dataDir, siteDir } from './lib/paths.mjs'
import { sheetFor } from './lib/photo-prompts.mjs'

const args = process.argv.slice(2)
const slugs = args.includes('--all') ? allSlugs() : args.filter((a) => !a.startsWith('--'))

if (!slugs.length) {
  console.error('Usage: npm run prompts -- <folder-name>   or   npm run prompts -- --all')
  process.exit(1)
}

let failed = false

for (const slug of slugs) {
  const configPath = join(siteDir(slug), 'config.ts')
  if (!existsSync(configPath)) {
    console.error(`✗ ${slug}: no config yet. Run: npm run config -- ${slug}`)
    failed = true
    continue
  }

  const config = (await import(`${pathToFileURL(configPath).href}?t=${Date.now()}`)).default
  const photos = join(dataDir(slug), 'photos')
  mkdirSync(photos, { recursive: true })
  writeFileSync(join(photos, 'photos-prompt.md'), sheetFor(config))
  console.log(`✓ ${slug}: wrote boutiques/${slug}/photos/photos-prompt.md`)
}

process.exit(failed ? 1 : 0)
