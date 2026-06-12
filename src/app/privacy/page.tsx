import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PRIVACY_CONTENT } from '@/lib/privacyContent'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Sound English',
  description: 'Политика обработки персональных данных Sound English — детской студии английского языка в Воронеже.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-[--muted] hover:text-[--brand-navy] transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Link>
          </div>

          <div className="prose-brand">
            <h1 style={{ fontFamily: 'var(--font-fredoka)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 600, color: 'var(--ink)', marginBottom: '0.5rem' }}>
              {PRIVACY_CONTENT.title}
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', marginBottom: '2.5rem' }}>
              Дата последнего обновления: {PRIVACY_CONTENT.lastUpdated}
            </p>

            {PRIVACY_CONTENT.sections.map((section, i) => (
              <div key={i} className="mb-8">
                <h2 style={{
                  fontFamily: 'var(--font-fredoka)',
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  marginBottom: '0.75rem',
                  marginTop: '2rem',
                }}>
                  {section.title}
                </h2>
                <div
                  style={{ color: 'var(--muted)', lineHeight: '1.7', fontSize: '0.9375rem' }}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-[--border] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-[--muted]">
              Последнее обновление: {PRIVACY_CONTENT.lastUpdated}
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[--brand-navy] text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-[--brand-blue] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              На главную
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
