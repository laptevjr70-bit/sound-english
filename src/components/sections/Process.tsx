'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { PROCESS_STEPS } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function Process() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('[data-step]'),
      { opacity: 0, x: -24 },
      {
        opacity: 1, x: 0,
        stagger: 0.12,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: ref })

  return (
    <Section id="process" variant="white">
      <SectionHeading
        eyebrow="Как проходят занятия"
        h2="Путь от первого урока до свободной речи"
      />
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROCESS_STEPS.map((step) => (
          <div
            key={step.num}
            data-step
            className="relative p-6 rounded-2xl border border-[--border] bg-white hover:-translate-y-1 transition-transform duration-250"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div
              className="text-5xl font-bold mb-4 leading-none"
              style={{ fontFamily: 'var(--font-fredoka)', color: 'var(--brand-sky)', WebkitTextStroke: '2px var(--brand-blue)' }}
              aria-hidden="true"
            >
              {step.num}
            </div>
            <h3
              className="font-semibold text-[--ink] mb-2"
              style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.1rem' }}
            >
              {step.title}
            </h3>
            <p className="text-sm text-[--muted] leading-relaxed">{step.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
