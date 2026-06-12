'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { TESTIMONIALS } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('[data-card]'),
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: ref })

  return (
    <Section id="testimonials" variant="sky">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-1 mb-2" aria-label="Рейтинг 5 из 5 звёзд">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 fill-[--brand-gold] text-[--brand-gold]" aria-hidden="true" />
          ))}
        </div>
        <p className="text-sm text-[--muted]">5.0 · Отзывы родителей</p>
      </div>
      <SectionHeading
        eyebrow="Отзывы"
        h2="Что говорят родители"
      />
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.author}
            data-card
            className="bg-white rounded-2xl p-6 border border-[--border] flex flex-col hover:-translate-y-1 transition-transform duration-250"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex gap-0.5 mb-4" aria-label={`${t.stars} звёзд из 5`}>
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[--brand-gold] text-[--brand-gold]" aria-hidden="true" />
              ))}
            </div>
            <p className="text-[--ink] text-sm leading-relaxed flex-1 mb-4">«{t.text}»</p>
            <div className="flex items-center gap-3 pt-4 border-t border-[--border]">
              <div
                className="w-10 h-10 rounded-full bg-[--brand-sky] flex items-center justify-center text-[--brand-navy] font-bold text-base shrink-0"
                aria-hidden="true"
              >
                {t.author[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-[--ink]">{t.author}</p>
                <p className="text-xs text-[--muted]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
