import { Button, type ButtonProps } from '../ui/Button'
import { ConfirmButton } from './ConfirmButton'

export interface RowAction {
  key?: string
  label: string
  onAction: () => void | Promise<void>
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  disabled?: boolean
  confirm?: {
    title: string
    description?: string
    cancelLabel?: string
    confirmLabel?: string
    confirmVariant?: ButtonProps['variant']
  }
}

export interface RowActionsProps {
  actions: RowAction[]
  size?: ButtonProps['size']
}

export function RowActions({ actions, size = 'sm' }: RowActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {actions.map((action) =>
        action.confirm ? (
          <ConfirmButton
            key={action.key ?? action.label}
            label={action.label}
            size={action.size ?? size}
            variant={action.variant ?? 'outline'}
            disabled={action.disabled}
            confirmTitle={action.confirm.title}
            confirmDescription={action.confirm.description}
            cancelLabel={action.confirm.cancelLabel}
            confirmLabel={action.confirm.confirmLabel}
            confirmVariant={action.confirm.confirmVariant}
            onConfirm={action.onAction}
          />
        ) : (
          <Button
            key={action.key ?? action.label}
            size={action.size ?? size}
            variant={action.variant ?? 'outline'}
            disabled={action.disabled}
            onClick={action.onAction}
          >
            {action.label}
          </Button>
        ),
      )}
    </div>
  )
}
