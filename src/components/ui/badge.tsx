import * as React from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'navy' | 'lime' | 'gold' | 'red'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        {
          'default': 'bg-[var(--brand-sky)] text-[var(--brand-navy)]',
          'navy': 'bg-[var(--brand-navy)] text-white',
          'lime': 'bg-[var(--brand-lime)]/20 text-green-800',
          'gold': 'bg-[var(--brand-gold)]/20 text-yellow-800',
          'red': 'bg-[var(--brand-red)]/10 text-[var(--brand-red)]',
        }[variant],
        className
      )}
      {...props}
    />
  )
}
export { Badge }
