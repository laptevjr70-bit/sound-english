'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from 'lenis/react'
import { Sun, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Mascot } from '@/components/shared/Mascot'
import { SUMMER } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function Summer() {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: ref })

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el && lenis) lenis.scrollTo(el, { offset: -80 })
  }

  return (
    <section
      id="summer"
      className="py-20 md:py-28 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--brand-navy) 0%, #1a4fa8 100%)' }}
      aria-label="Летняя программа НЕЛАГЕРЬ"
    >
      {/* Blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="blob absolute top-[-20%] right-[-10%] w-[500px] h-[500px] opacity-10" style={{ background: 'var(--brand-gold)' }} />
        <div className="blob absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] opacity-10" style={{ background: 'var(--brand-orange)' }} />
      </div>

      <div ref={ref} className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div data-reveal className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-[0.08em] rounded-full px-4 py-2 mb-6">
              <Sun className="w-3.5 h-3.5" />
              {SUMMER.eyebrow}
            </div>

            <p data-reveal className="text-[--brand-gold] text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-fredoka)' }}>
              {SUMMER.slogan}
            </p>

            <h2
              data-reveal
              className="text-white mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 700,
                fontFamily: 'var(--font-fredoka)',
                lineHeight: 1.1,
              }}
            >
              {SUMMER.h2}
            </h2>

            <p data-reveal className="text-white/70 text-lg mb-8 leading-relaxed">
              {SUMMER.subtitle}
            </p>

            <ul data-reveal className="space-y-3 mb-8">
              {SUMMER.activities.map((act) => (
                <li key={act} className="flex items-center gap-3 text-white/85">
                  <div className="w-6 h-6 rounded-full bg-[--brand-gold]/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-[--brand-gold]" />
                  </div>
                  <span className="text-base">{act}</span>
                </li>
              ))}
            </ul>

            <div data-reveal className="bg-white/10 rounded-2xl p-4 mb-8 border border-white/20">
              <p className="text-white/70 text-sm">{SUMMER.address}</p>
            </div>

            <div data-reveal>
              <Button
                className="bg-[--brand-gold] hover:bg-yellow-400 text-[--ink] font-bold shadow-lg"
                size="lg"
                onClick={scrollToContact}
              >
                {SUMMER.cta}
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="flex flex-col gap-6 items-center">
            {/* Photo collage placeholder */}
            {/* TODO: замените на реальные фото-коллаж из /public/photos/summer-*.jpg (~600×600px каждое) */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {['Опыты', 'Кулинария', 'Прогулки', 'Английский'].map((label) => (
                <div
                  key={label}
                  className="aspect-square rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center"
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2" aria-hidden="true">
                      {label === 'Опыты' ? '🔬' : label === 'Кулинария' ? '🍳' : label === 'Прогулки' ? '🌳' : '📚'}
                    </div>
                    <p className="text-white/60 text-xs">{label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <Mascot size={200} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
