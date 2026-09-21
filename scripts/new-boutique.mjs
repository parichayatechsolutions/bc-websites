#!/usr/bin/env node
// scripts/new-boutique.mjs
// Sets up a new boutique:
//
//   npm run new-boutique "Sri Lakshmi Designers"
//   → boutiques/sri-lakshmi-designers/data.md + photos/   (for the team)
//   → src/sites/sri-lakshmi-designers/Site.tsx            (starter page)

import { cpSync, existsSync, mkdirSync, renameSync } from 'node:fs'
import { join } from 'node:path'
import { dataDir, dataRoot, siteDir, sitesRoot } from './lib/paths.mjs'

const name = process.argv.slice(2).join(' ').trim()

if (!name) {
  console.error('Usage: node scripts/new-boutique.mjs "Boutique Name"')
  process.exit(1)
}

const slug = name
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/&/g, ' and ')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

if (!slug) {
  console.error(`Could not make a folder name from "${name}". Use English letters.`)
  process.exit(1)
}

if (existsSync(dataDir(slug)) || existsSync(siteDir(slug))) {
  console.error(`${slug} already exists in boutiques/ or src/sites/. Nothing was changed.`)
  process.exit(1)
}

cpSync(join(dataRoot, '_template'), dataDir(slug), { recursive: true })
renameSync(join(dataDir(slug), 'sample-data-template.md'), join(dataDir(slug), 'data.md'))
mkdirSync(siteDir(slug), { recursive: true })
cpSync(join(sitesRoot, '_template', 'Site.tsx'), join(siteDir(slug), 'Site.tsx'))

console.log(`Created boutiques/${slug}/ and src/sites/${slug}/`)
console.log(`  1. Fill in boutiques/${slug}/data.md`)
console.log(`  2. Add the logo and photos to boutiques/${slug}/photos/`)
console.log(`  3. npm run config -- ${slug}     (makes src/sites/${slug}/config.ts and checks it)`)
console.log(`  4. Arrange src/sites/${slug}/Site.tsx to give it its own look`)
console.log(`  5. npm run dev, then open http://localhost:3000/${slug}`)
