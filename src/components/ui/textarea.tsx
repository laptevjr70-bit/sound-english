import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[100px] w-full rounded-xl border border-[--border] bg-white px-4 py-3 text-base text-[--ink] placeholder:text-[--muted] transition-colors resize-none',
        'focus:outline-2 focus:outline-[--brand-navy] focus:outline-offset-0 focus:border-[--brand-navy]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})
Textarea.displayName = 'Textarea'
export { Textarea }
