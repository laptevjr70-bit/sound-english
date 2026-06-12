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
          'default': 'bg-[--brand-sky] text-[--brand-navy]',
          'navy': 'bg-[--brand-navy] text-white',
          'lime': 'bg-[--brand-lime]/20 text-green-800',
          'gold': 'bg-[--brand-gold]/20 text-yellow-800',
          'red': 'bg-[--brand-red]/10 text-[--brand-red]',
        }[variant],
        className
      )}
      {...props}
    />
  )
}
export { Badge }
