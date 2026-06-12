'use client'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

type ConsentValue = 'all' | 'necessary' | null

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem('cookie_consent') as ConsentValue
    if (saved) setConsent(saved)
  }, [])

  const accept = (value: 'all' | 'necessary') => {
    localStorage.setItem('cookie_consent', value)
    setConsent(value)
    // TODO: если value === 'all' — инициализировать аналитику (Яндекс.Метрика и т.п.)
    // TODO: если value === 'necessary' — убедиться что аналитика НЕ загружается
  }

  if (!mounted || consent !== null) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        role="dialog"
        aria-label="Согласие на использование файлов cookie"
        aria-live="polite"
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 bg-white border border-[--border] rounded-2xl shadow-xl p-5"
      >
        <p className="text-sm text-[--muted] mb-4 leading-relaxed">
          Мы используем cookies для улучшения работы сайта. Технические cookies необходимы для его
          функционирования; аналитические — помогают нам его улучшать.{' '}
          <Link href="/privacy" className="underline text-[--brand-navy] hover:opacity-75">
            Политика конфиденциальности
          </Link>
        </p>
        <div className="flex gap-2 flex-wrap">
          <Button size="sm" onClick={() => accept('all')}>
            Принять все
          </Button>
          <Button size="sm" variant="outline" onClick={() => accept('necessary')}>
            Только необходимые
          </Button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
