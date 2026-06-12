'use client'
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: 'default' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          {
            'default': 'bg-[--brand-navy] text-white hover:bg-[--brand-blue] active:scale-95 shadow-sm',
            'outline': 'border-2 border-[--brand-navy] text-[--brand-navy] hover:bg-[--brand-sky] active:scale-95',
            'ghost': 'text-[--brand-navy] hover:bg-[--brand-sky]',
            'link': 'text-[--brand-navy] underline-offset-4 hover:underline p-0 h-auto',
          }[variant],
          {
            'default': 'h-11 px-6 py-2.5 text-base',
            'sm': 'h-9 px-4 text-sm',
            'lg': 'h-13 px-8 text-lg',
            'icon': 'h-10 w-10',
          }[size],
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'
export { Button }
