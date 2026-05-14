import { Badge, type BadgeProps } from '../ui/Badge'

export interface StatusBadgeProps {
  status?: string | number | null
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const label = status === undefined || status === null || status === '' ? 'unknown' : String(status)
  const normalized = label.toLowerCase()
  const variant: BadgeProps['variant'] =
    normalized.includes('active') ||
    normalized.includes('success') ||
    normalized.includes('settled') ||
    normalized.includes('read') ||
    normalized === '1' ||
    normalized === 'ok'
      ? 'success'
      : normalized.includes('pending') ||
          normalized.includes('processing') ||
          normalized.includes('review') ||
          normalized === '0'
        ? 'warning'
        : normalized.includes('fail') ||
            normalized.includes('cancel') ||
            normalized.includes('void') ||
            normalized.includes('suspend') ||
            normalized.includes('error')
          ? 'danger'
          : 'secondary'

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  )
}
