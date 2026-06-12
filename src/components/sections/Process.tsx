'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
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

      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROCESS_STEPS.map((step) => (
          <motion.div
            key={step.num}
            data-step
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="relative p-6 rounded-2xl border border-[var(--border)] bg-white cursor-default"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <motion.div
              data-num
              className="text-5xl font-bold mb-4 leading-none inline-block origin-left"
              style={{
                fontFamily: 'var(--font-fredoka)',
                color: 'var(--brand-sky)',
                WebkitTextStroke: '2px var(--brand-blue)',
              }}
              aria-hidden="true"
              whileHover={{
                color: 'var(--brand-red)',
                scale: [1, 1.2, 0.95, 1.1, 1],
                transition: { duration: 0.5, ease: 'easeOut' },
              }}
            >
              {step.num}
            </motion.div>
            <h3
              className="font-semibold text-[var(--ink)] mb-2"
              style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.1rem' }}
            >
              {step.title}
            </h3>
            <p className="text-sm text-[var(--muted)] leading-relaxed">{step.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
