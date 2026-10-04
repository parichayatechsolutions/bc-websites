// src/app/lab/catalog.ts
// The lab's list of components, read from the library's own catalog
// (src/sections/index.ts) so there's one list to keep up to date: each
// `export { default as Name } from './job/Name' // description` line becomes
// an entry, filed under the comment heading above it.

import source from '../../sections/index.ts?raw'

export interface ILabEntry {
  /** Export name, e.g. ArchHero. */
  name: string
  /** Folder in src/sections/, e.g. hero. */
  job: string
  /** Heading it sits under in the catalog, e.g. Page openers. */
  group: string
  description: string
}

function parse(text: string): ILabEntry[] {
  const entries: ILabEntry[] = []
  let group = ''
  for (const line of text.split('\n')) {
    const heading = line.match(/^\/\/ (.+)$/)
    if (heading) {
      group = heading[1].replace(/\s*\(.*\)$/, '')
      continue
    }
    const entry = line.match(/^export \{ default as (\w+) \} from '\.\/(\w+)\/\w+' \/\/ (.+)$/)
    if (entry) entries.push({ name: entry[1], job: entry[2], group, description: entry[3] })
  }
  return entries
}

export const LAB_ENTRIES = parse(source)
