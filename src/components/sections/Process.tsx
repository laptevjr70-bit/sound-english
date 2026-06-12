'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Photo } from '@/components/shared/Photo'
import { PROCESS_STEPS } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function Process() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const cards = ref.current.querySelectorAll('[data-step]')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    cards.forEach((card, i) => {
      const num = card.querySelector('[data-num]')
      const tl = gsap.timeline({
        scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        delay: reduce ? 0 : i * 0.08,
      })
      tl.fromTo(
        card,
        { opacity: 0, y: reduce ? 0 : 28 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
      )
      if (num && !reduce) {
        tl.fromTo(
          num,
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' },
          '-=0.35'
        )
      }
    })
  }, { scope: ref })

  return (
    <Section id="process" variant="white">
      <SectionHeading
        eyebrow="Как проходят занятия"
        h2="Путь от первого урока до свободной речи"
      />

      {/* Реальное фото: занятие у доски */}
      <Photo
        src="/photos/class.jpg"
        alt="Занятие английским в студии Sound English"
        aspect="aspect-[16/9] sm:aspect-[21/9]"
        sizes="(max-width: 1200px) 92vw, 1136px"
        className="mb-12 md:mb-14"
      />

      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.num}
            data-step
            className="relative p-6 rounded-2xl border border-[var(--border)] bg-white transition-transform duration-200 hover:-translate-y-1"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div
              data-num
              className="text-5xl font-bold mb-4 leading-none inline-block origin-left"
              style={{
                fontFamily: 'var(--font-fredoka)',
                color: 'var(--brand-sky)',
                WebkitTextStroke: '2px var(--brand-blue)',
              }}
              aria-hidden="true"
            >
              {step.num}
            </div>
            <h3
              className="font-semibold text-[var(--ink)] mb-2"
              style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.1rem' }}
            >
              {step.title}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
