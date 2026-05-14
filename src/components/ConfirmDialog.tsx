import type { ReactNode } from 'react'
import { Button, type ButtonProps } from '../ui/Button'
import { SimpleDialog } from '../ui/Dialog'

export interface ConfirmDialogProps {
  open: boolean
  title: ReactNode
  description?: ReactNode
  cancelLabel?: ReactNode
  confirmLabel?: ReactNode
  confirmVariant?: ButtonProps['variant']
  onCancel: () => void
  onConfirm: () => void
}

export function ConfirmDialog({
  open,
  title,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  confirmVariant = 'destructive',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <SimpleDialog open={open} title={title} onClose={onCancel}>
      {description ? <div className="text-sm text-gray-600">{description}</div> : null}
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </SimpleDialog>
  )
}
