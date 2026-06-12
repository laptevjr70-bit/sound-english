import { MARQUEE_WORDS } from '@/lib/content'

const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS]

export function MarqueeSection() {
  return (
    <div
      className="py-6 bg-[var(--brand-navy)] overflow-hidden marquee-container"
      role="presentation"
    >
      {/* A11y: static list for screen readers */}
      <ul className="sr-only" aria-label="Слова на английском и русском">
        {MARQUEE_WORDS.map((w) => (
          <li key={w.en}>{w.en} — {w.ru}</li>
        ))}
      </ul>

      <div className="flex animate-marquee whitespace-nowrap" aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-6">
            <span className="text-white font-semibold text-base md:text-lg" style={{ fontFamily: 'var(--font-fredoka)' }}>
              {word.en}
            </span>
            <span className="text-white/50 text-sm">—</span>
            <span className="text-white/70 text-base md:text-lg">{word.ru}</span>
            <span className="text-white/30 mx-4">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
