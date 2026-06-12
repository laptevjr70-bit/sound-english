'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Counter } from '@/components/shared/Counter'
import { STATS } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('[data-stat]'),
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      }
    )
  }, { scope: ref })

  return (
    <section className="py-16 md:py-20 bg-white border-y border-[var(--border)]" aria-label="Цифры и факты">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-12">
          {STATS.map((stat) => (
            <div key={stat.label} data-stat className="text-center">
              <p
                className="mb-2"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-fredoka)',
                  lineHeight: 1,
                  color: stat.color === 'red' ? 'var(--brand-red)' : 'var(--brand-navy)',
                }}
              >
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  raw={stat.raw}
                  display={stat.display}
                />
              </p>
              <p className="text-[var(--ink)] text-sm md:text-base font-medium leading-snug max-w-[10rem] mx-auto">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
