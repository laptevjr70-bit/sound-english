'use client'
import dynamic from 'next/dynamic'

export const MarqueeSection = dynamic(
  () => import('@/components/sections/MarqueeSection').then(m => ({ default: m.MarqueeSection })),
  { ssr: false }
)
export const Stats = dynamic(
  () => import('@/components/sections/Stats').then(m => ({ default: m.Stats })),
  { ssr: false }
)
export const About = dynamic(
  () => import('@/components/sections/About').then(m => ({ default: m.About })),
  { ssr: false }
)
export const Advantages = dynamic(
  () => import('@/components/sections/Advantages').then(m => ({ default: m.Advantages })),
  { ssr: false }
)
export const Programs = dynamic(
  () => import('@/components/sections/Programs').then(m => ({ default: m.Programs })),
  { ssr: false }
)
export const Process = dynamic(
  () => import('@/components/sections/Process').then(m => ({ default: m.Process })),
  { ssr: false }
)
export const Summer = dynamic(
  () => import('@/components/sections/Summer').then(m => ({ default: m.Summer })),
  { ssr: false }
)
export const Testimonials = dynamic(
  () => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })),
  { ssr: false }
)
export const Faq = dynamic(
  () => import('@/components/sections/Faq').then(m => ({ default: m.Faq }))
)
export const Contact = dynamic(
  () => import('@/components/sections/Contact').then(m => ({ default: m.Contact }))
)
