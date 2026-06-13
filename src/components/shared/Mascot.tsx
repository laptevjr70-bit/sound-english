'use client'
import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MascotProps {
  className?: string
  size?: number
}

export function Mascot({ className, size = 320 }: MascotProps) {
  const [error, setError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const inner = error ? (
    <div
      style={{ width: size, height: size, fontSize: size * 0.5 }}
      className="flex items-center justify-center rounded-full bg-[var(--brand-navy)]/06"
    >
      🦊
    </div>
  ) : (
    <Image
      src="/brand/mascot-fox.png"
      alt="Маскот Sound English — лисёнок"
      width={size}
      height={size}
      className="object-contain drop-shadow-xl"
      onError={() => setError(true)}
    />
  )

  if (!mounted) {
    return (
      <div className={cn('relative select-none', className)} style={{ width: size, height: size }}>
        {inner}
      </div>
    )
  }

  return (
    <motion.div
      className={cn('relative select-none', className)}
      style={{ width: size, height: size }}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      {inner}
    </motion.div>
  )
}
