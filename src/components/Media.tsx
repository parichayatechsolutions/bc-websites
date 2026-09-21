// src/components/Media.tsx
// A boutique photo or clip by file name. When the file isn't in photos/ yet,
// it shows a woven placeholder in the brand colours, labelled with the file
// the team still needs to add, so a half-filled demo still looks intentional.

import { useBoutique } from '../app/BoutiqueContext'
import type { PhotoFile } from '../types/boutique'

const isVideo = (file: string) => /\.(mp4|webm)$/i.test(file)

export default function Media({
  file,
  poster,
  alt = '',
  className = '',
  priority = false,
}: {
  file?: PhotoFile
  /** Still frame for a video, also shown when the video file is missing. */
  poster?: PhotoFile
  alt?: string
  className?: string
  priority?: boolean
}) {
  const { photo } = useBoutique()
  const src = photo(file)

  if (file && src && isVideo(file)) {
    return (
      <video
        className={`h-full w-full object-cover ${className}`}
        src={src}
        poster={photo(poster)}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    )
  }

  const imageSrc = file && src && !isVideo(file) ? src : photo(poster)
  if (imageSrc) {
    return (
      <img
        className={`h-full w-full object-cover ${className}`}
        src={imageSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    )
  }

  return (
    <div
      className={`relative h-full w-full ${className}`}
      style={{
        backgroundColor: 'color-mix(in oklab, var(--c-primary) 70%, var(--c-dark))',
        backgroundImage: `
          repeating-linear-gradient(0deg, color-mix(in oklab, var(--c-accent) 14%, transparent) 0 1px, transparent 1px 7px),
          repeating-linear-gradient(90deg, color-mix(in oklab, var(--c-dark) 30%, transparent) 0 1px, transparent 1px 5px)`,
      }}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
    >
      {file && (
        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-on-primary/60">Add photos/{file}</span>
      )}
    </div>
  )
}
