'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PhotoProps {
  src: string
  alt: string
  /** aspect-ratio utility class, e.g. 'aspect-[4/5]' */
  aspect: string
  className?: string
  sizes?: string
  priority?: boolean
  rounded?: string
}

/**
 * Фото через next/image (object-cover, фиксированное соотношение сторон → без CLS).
 * Если файл ещё не загружен в /public/photos/, показывает аккуратный фирменный
 * фолбэк вместо «битой картинки».
 */
export function Photo({
  src,
  alt,
  aspect,
  className,
  sizes = '(max-width: 1024px) 90vw, 45vw',
  priority = false,
  rounded = 'rounded-3xl',
}: PhotoProps) {
  const [error, setError] = useState(false)

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden border border-[var(--border)] shadow-lg bg-[var(--brand-sky)]',
        aspect,
        rounded,
        className
      )}
    >
      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--brand-sky)] to-white text-[var(--brand-navy)]">
          <ImageIcon className="w-10 h-10 opacity-70" aria-hidden="true" />
          <span className="text-sm font-semibold px-4 text-center">{alt}</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}
