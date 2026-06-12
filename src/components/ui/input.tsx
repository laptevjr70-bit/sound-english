import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-11 w-full rounded-xl border border-[--border] bg-white px-4 py-2 text-base text-[--ink] placeholder:text-[--muted] transition-colors',
        'focus:outline-2 focus:outline-[--brand-navy] focus:outline-offset-0 focus:border-[--brand-navy]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})
Input.displayName = 'Input'
export { Input }
