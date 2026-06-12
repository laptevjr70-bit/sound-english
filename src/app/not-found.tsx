import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--brand-sky)] px-4 text-center">
      <div className="relative w-40 h-40 mb-8">
        {/* TODO: замените на реального маскота /public/brand/mascot-fox.png */}
        <div className="w-40 h-40 rounded-full bg-[var(--brand-navy)]/10 flex items-center justify-center text-7xl">
          🦊
        </div>
      </div>
      <h1 className="text-h2 font-display text-[var(--brand-navy)] mb-4" style={{ fontFamily: 'var(--font-fredoka)' }}>
        Страница потерялась
      </h1>
      <p className="text-[var(--muted)] text-lg mb-8 max-w-sm">
        Кажется, эта страница уже выучила английский и уехала путешествовать.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[var(--brand-navy)] text-white rounded-full px-8 py-3 font-semibold hover:bg-[var(--brand-blue)] transition-colors"
      >
        ← На главную
      </Link>
    </main>
  )
}
