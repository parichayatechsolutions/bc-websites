// src/app/Dropdown.tsx
// A dropdown for the demo directory's filters. A native <select> on macOS
// opens on top of the field, anchored to whichever option is picked, which
// hides the field and the fields beside it. This opens a panel directly below
// the button instead, so the chain of filters stays readable while choosing.
//
// Only used by our own pages, never by a boutique's site.

import { useEffect, useId, useRef, useState } from 'react'
import { IconCheck, IconChevronDown } from '@tabler/icons-react'

export default function Dropdown({
  label,
  value,
  options,
  onChange,
  display,
  anyLabel = 'All',
  className = '',
}: {
  /**
   * What this filters by: "State", "Rating". Shown in the button until
   * something is chosen, so the filters need no labels above them.
   */
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
  /** How an option reads, when that differs from its value ("4.5" → "4.5 and above"). */
  display?: (value: string) => string
  /** The first option, which clears this filter. */
  anyLabel?: string
  className?: string
}) {
  const id = useId()
  const root = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)
  const [open, setOpen] = useState(false)

  const items = ['', ...options]
  const read = (item: string) => (item ? (display ? display(item) : item) : anyLabel)
  const chosen = Math.max(items.indexOf(value), 0)
  const [active, setActive] = useState(chosen)

  // Clicking anywhere else, or pressing Escape, puts it away.
  useEffect(() => {
    if (!open) return
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', outside)
    return () => document.removeEventListener('pointerdown', outside)
  }, [open])

  // Keep the highlighted option in view when arrowing through a long list.
  useEffect(() => {
    if (!open) return
    list.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [open, active])

  function show() {
    setActive(chosen)
    setOpen(true)
  }

  function choose(next: string) {
    onChange(next)
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') return setOpen(false)
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        show()
      }
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, items.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Home') {
      e.preventDefault()
      setActive(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      setActive(items.length - 1)
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      choose(items[active])
    } else if (e.key === 'Tab') {
      setOpen(false)
    }
  }

  return (
    <div ref={root} className={`relative ${className}`}>
      <button
        type="button"
        role="combobox"
        aria-label={label}
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-activedescendant={open ? `${id}-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : show())}
        onKeyDown={onKeyDown}
        className={`flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-lg border bg-white px-3 text-left text-base transition-colors duration-200 hover:border-neutral-500 focus:outline-none ${
          value ? 'border-neutral-900 font-medium text-neutral-900' : 'border-neutral-300 text-neutral-500'
        }`}
      >
        <span className="truncate">{value ? read(value) : label}</span>
        <IconChevronDown
          size={18}
          stroke={1.75}
          aria-hidden="true"
          className={`shrink-0 text-neutral-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <ul
          ref={list}
          id={`${id}-list`}
          role="listbox"
          aria-label={label}
          className="absolute left-0 top-full z-30 mt-1 max-h-72 w-max min-w-full max-w-[min(22rem,80vw)] overflow-auto rounded-lg border border-neutral-300 bg-white py-1 shadow-lg"
        >
          {items.map((item, i) => (
            <li
              key={item || 'any'}
              id={`${id}-${i}`}
              role="option"
              aria-selected={item === value}
              data-active={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => choose(item)}
              className={`flex cursor-pointer items-center justify-between gap-3 px-3 py-2.5 text-base ${
                i === active ? 'bg-neutral-100' : ''
              } ${item === value ? 'text-neutral-900' : 'text-neutral-700'}`}
            >
              <span className="truncate">{read(item)}</span>
              {item === value && <IconCheck size={16} stroke={2} aria-hidden="true" className="shrink-0" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
