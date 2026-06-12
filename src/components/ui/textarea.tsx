import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[100px] w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-base text-[var(--ink)] placeholder:text-[var(--muted)] transition-colors resize-none',
        'focus:outline-2 focus:outline-[var(--brand-navy)] focus:outline-offset-0 focus:border-[var(--brand-navy)]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'
export { Textarea }
