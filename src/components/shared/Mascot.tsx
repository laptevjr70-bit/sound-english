'use client'
import { motion } from 'motion/react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MascotProps {
  className?: string
  size?: number
}

export function Mascot({ className, size = 320 }: MascotProps) {
  return (
    <motion.div
      className={cn('relative select-none', className)}
      style={{ width: size, height: size }}
      animate={{ y: [0, -12, 0] }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {/* TODO: замените на реальный маскот из /public/brand/mascot-fox.png */}
      <Image
        src="/brand/mascot-fox.png"
        alt="Маскот Sound English — лисёнок-супергерой"
        width={size}
        height={size}
        priority
        className="object-contain drop-shadow-xl"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent) {
            parent.innerHTML = `<div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;font-size:${size * 0.5}px;border-radius:50%;background:rgba(20,58,142,0.06)">🦊</div>`
          }
        }}
      />
    </motion.div>
  )
}
