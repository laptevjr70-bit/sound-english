import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  variant?: 'white' | 'sky' | 'navy'
}

export function Section({ id, className, children, variant = 'white' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 md:py-28 lg:py-32',
        {
          white: 'bg-white',
          sky: 'bg-[var(--brand-sky)]',
          navy: 'bg-[var(--brand-navy)] text-white',
        }[variant],
        className
      )}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
