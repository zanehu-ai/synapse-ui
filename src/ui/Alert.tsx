import type { HTMLAttributes } from 'react'
import { cn } from '../utils/cn'

const variants = {
  neutral: 'border-gray-200 bg-gray-50 text-gray-700',
  success: 'border-green-200 bg-green-50 text-green-800',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-900',
  danger: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-blue-200 bg-blue-50 text-blue-800',
} as const

export type AlertVariant = keyof typeof variants

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant
}

export function Alert({
  className,
  role,
  variant = 'neutral',
  ...props
}: AlertProps) {
  return (
    <div
      role={role ?? (variant === 'danger' ? 'alert' : 'status')}
      className={cn(
        'rounded-md border px-3 py-2 text-sm leading-6',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
