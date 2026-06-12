'use client'
import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface CounterProps {
  value: number
  prefix?: string
  suffix?: string
  raw?: boolean
  display?: string
}

export function Counter({ value, prefix = '', suffix = '', raw, display }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
  }, [])

  useGSAP(() => {
    if (!ref.current || raw) return
    const el = ref.current

    if (reducedMotion) {
      el.textContent = `${prefix}${value}${suffix}`
      return
    }

    const obj = { val: 0 }
    gsap.to(obj, {
      val: value,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`
      },
    })
  }, { scope: ref, dependencies: [value, reducedMotion] })

  if (raw && display) {
    return <span ref={ref}>{display}</span>
  }

  return <span ref={ref}>{prefix}0{suffix}</span>
}
