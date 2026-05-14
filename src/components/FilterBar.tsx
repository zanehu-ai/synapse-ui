import type { HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

export function FilterBar({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 md:flex-row md:items-end',
        className,
      )}
      {...props}
    />
  )
}
