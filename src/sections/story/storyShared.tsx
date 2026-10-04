// src/sections/story/storyShared.tsx
// What the story sections share: the owner's story split into its first
// sentence and the rest, whether it's written in their own voice, and their
// portrait (only with permission; their logo otherwise, and never a
// generated face).

import { useBoutique } from '../../app/BoutiqueContext'
import Logo from '../../components/Logo'
import Media from '../../components/Media'

export function useStory() {
  const { boutique } = useBoutique()
  const { owner, permissions, established } = boutique
  const story = owner.story?.trim() ?? ''
  const first = story.match(/^.*?[.!?](?=\s|$)/s)?.[0] ?? story
  return {
    owner,
    established,
    story,
    first,
    rest: story.slice(first.length).trim(),
    paragraphs: story.split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean),
    /**
     * Written as "I" or "we". Only then can it be shown in quotation marks
     * or as a letter; a story the team wrote about the owner can't be put in
     * the owner's mouth.
     */
    ownVoice: /\b(i|i'm|i’m|i've|i’ve|my|we|our|us)\b/i.test(story),
    portrait: permissions.showOwnerPhoto ? owner.photo : undefined,
  }
}

/** A small arched portrait, or the logo when there's no photo they've allowed. */
export function Portrait({ file, name, className = 'w-20' }: { file?: string; name: string; className?: string }) {
  if (!file) return <Logo className="h-16 w-16 shrink-0 rounded-full" />
  return (
    <div className={`arch aspect-[3/4] shrink-0 bg-paper ${className}`}>
      <Media file={file} alt={name} />
    </div>
  )
}
