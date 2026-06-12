'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { useLenis } from 'lenis/react'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Mascot } from '@/components/shared/Mascot'
import { HERO } from '@/lib/content'

export function Hero() {
  const lenis = useLenis()
  const [showMobileCta, setShowMobileCta] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el && lenis) lenis.scrollTo(el, { offset: -80 })
    else el?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileCta(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 } as const,
    animate: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.6, ease: [0.25, 0, 0, 1] as const, delay },
  })

  return (
    <>
      <section
        ref={heroRef}
        className="relative min-h-[90vh] flex items-center pt-20 pb-16 overflow-hidden bg-white"
        aria-label="Главный блок"
      >
        {/* Background blobs */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="blob absolute -top-40 -right-40 w-[600px] h-[600px] opacity-40"
            style={{ background: 'var(--brand-sky)' }}
          />
          <div
            className="blob absolute bottom-0 left-[-10%] w-[400px] h-[400px] opacity-30"
            style={{ background: '#E9F5FB' }}
          />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-[55fr_45fr] gap-12 items-center">
            {/* Text */}
            <div>
              <motion.div {...fadeUp(0)}>
                <span className="inline-block bg-[--brand-sky] text-[--brand-navy] text-xs font-semibold uppercase tracking-[0.08em] rounded-full px-4 py-2 mb-6">
                  {HERO.eyebrow}
                </span>
              </motion.div>

              <motion.h1
                {...fadeUp(0.1)}
                className="text-[--ink] mb-6"
                style={{
                  fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
                  lineHeight: 1.05,
                  fontWeight: 600,
                  fontFamily: 'var(--font-fredoka)',
                }}
              >
                {HERO.h1}
              </motion.h1>

              <motion.p
                {...fadeUp(0.2)}
                className="text-[--muted] text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
              >
                {HERO.subtitle}
              </motion.p>

              <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-3 mb-10">
                <Button
                  size="lg"
                  className="bg-[--brand-red] hover:bg-red-700 text-white shadow-md"
                  onClick={() => scrollTo('contact')}
                >
                  {HERO.ctaPrimary}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollTo('programs')}
                >
                  {HERO.ctaSecondary}
                </Button>
              </motion.div>

              {/* Trust badges */}
              <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3">
                {HERO.trustBadges.map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2 bg-[--brand-sky] rounded-full px-4 py-2"
                  >
                    <div className="w-2 h-2 rounded-full bg-[--brand-navy]" />
                    <span className="text-sm font-semibold text-[--brand-navy]">{badge.label}</span>
                    <span className="text-xs text-[--muted]">{badge.sub}</span>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="flex justify-center items-center relative"
            >
              {/* Photo placeholder */}
              {/* TODO: замените на реальное фото из /public/photos/hero.jpg (~1600×1200) */}
              <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-[--brand-sky] to-white border border-[--border] shadow-xl flex items-center justify-center">
                <div className="text-center text-[--muted] p-8">
                  <div className="text-6xl mb-4" aria-hidden="true">📸</div>
                  <p className="text-sm font-medium">Фото: дети на занятии</p>
                  <p className="text-xs mt-1 opacity-60">Рекомендуемый размер: 800×1000px</p>
                </div>

                {/* Mascot overlay */}
                <div className="absolute -bottom-4 -right-4 z-10">
                  <Mascot size={180} />
                </div>

                {/* UK flag speech bubble */}
                <div
                  className="absolute top-4 left-4 bg-white rounded-2xl shadow-md px-3 py-2 flex items-center gap-2"
                  aria-hidden="true"
                >
                  <span className="text-xl">🇬🇧</span>
                  <span className="text-xs font-semibold text-[--brand-navy]">English</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: showMobileCta ? 0 : 80, opacity: showMobileCta ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur border-t border-[--border] pb-safe"
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        aria-hidden={!showMobileCta}
      >
        <div className="flex gap-2 p-3">
          <a
            href="tel:+79204282912"
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-full border-2 border-[--border] font-semibold text-[--ink] text-sm hover:border-[--brand-navy] transition-colors"
          >
            <Phone className="w-4 h-4" />
            Позвонить
          </a>
          <button
            onClick={() => scrollTo('contact')}
            className="flex-1 flex items-center justify-center h-12 rounded-full bg-[--brand-red] text-white font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            Записаться
          </button>
        </div>
      </motion.div>
    </>
  )
}
