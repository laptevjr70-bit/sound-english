'use client'

import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function LenisSync() {
  const lenis = useLenis(() => ScrollTrigger.update())

  useEffect(() => {
    if (!lenis) return
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(update) }
  }, [lenis])

  return null
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Start with Lenis enabled (SSR); disable on client if touch device
  const [isTouch, setIsTouch] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsTouch(window.matchMedia('(hover: none)').matches)
  }, [])

  // On touch devices (after mount detection) skip Lenis for native scroll
  if (mounted && isTouch) {
    return <>{children}</>
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      <LenisSync />
      {children}
    </ReactLenis>
  )
}
