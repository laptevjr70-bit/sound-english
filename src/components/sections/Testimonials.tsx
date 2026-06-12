'use client'
import { useRef } from 'react'
import { motion } from 'motion/react'
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
        <motion.div
          className="flex items-center justify-center gap-1 mb-2"
          aria-label="Рейтинг 5 из 5 звёзд"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.15 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.3 },
                show: {
                  opacity: 1,
                  scale: [0.3, 1.25, 1],
                  transition: { duration: 0.45, ease: 'easeOut' },
                },
              }}
            >
              <Star className="w-7 h-7 fill-[var(--brand-gold)] text-[var(--brand-gold)]" aria-hidden="true" />
            </motion.span>
          ))}
        </motion.div>
        <p className="text-sm text-[var(--muted)]">5.0 · Отзывы родителей</p>
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
            className="bg-white rounded-2xl p-6 border border-[var(--border)] flex flex-col hover:-translate-y-1 transition-transform duration-250"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="flex gap-0.5 mb-4" aria-label={`${t.stars} звёзд из 5`}>
              {[...Array(t.stars)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[var(--brand-gold)] text-[var(--brand-gold)]" aria-hidden="true" />
              ))}
            </div>
            <p className="text-[var(--ink)] text-sm leading-relaxed flex-1 mb-4">«{t.text}»</p>
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border)]">
              <div
                className="w-10 h-10 rounded-full bg-[var(--brand-sky)] flex items-center justify-center text-[var(--brand-navy)] font-bold text-base shrink-0"
                aria-hidden="true"
              >
                {t.author[0]}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">{t.author}</p>
                <p className="text-xs text-[var(--muted)]">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
