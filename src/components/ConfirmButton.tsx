import { useState } from 'react'
import { Button, type ButtonProps } from '../ui/Button'
import { ConfirmDialog } from './ConfirmDialog'

export interface ConfirmButtonProps {
  label: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  disabled?: boolean
  className?: string
  confirmTitle: string
  confirmDescription?: string
  cancelLabel?: string
  confirmLabel?: string
  confirmVariant?: ButtonProps['variant']
  onConfirm: () => void | Promise<void>
}

export function ConfirmButton({
  label,
  variant = 'outline',
  size = 'sm',
  disabled,
  className,
  confirmTitle,
  confirmDescription,
  cancelLabel,
  confirmLabel,
  confirmVariant = 'destructive',
  onConfirm,
}: ConfirmButtonProps) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const handleConfirm = async () => {
    setBusy(true)
    try {
      await onConfirm()
      setOpen(false)
    } catch {
      // The caller owns user-visible error handling; keep the dialog open.
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Button
        className={className}
        disabled={disabled || busy}
        size={size}
        variant={variant}
        onClick={() => setOpen(true)}
      >
        {label}
      </Button>
      <ConfirmDialog
        open={open}
        title={confirmTitle}
        description={confirmDescription}
        cancelLabel={cancelLabel}
        confirmLabel={busy ? 'Working...' : confirmLabel}
        confirmVariant={confirmVariant}
        onCancel={() => setOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  )
}
