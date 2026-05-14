import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { Button } from '../ui/Button'
import { Checkbox } from '../ui/Checkbox'
import { cn } from '../utils/cn'

export interface CheckboxFieldProps {
  checked: boolean
  className?: string
  disabled?: boolean
  hint?: ReactNode
  label: ReactNode
  onCheckedChange: (checked: boolean) => void
}

export function CheckboxField({
  checked,
  className,
  disabled,
  hint,
  label,
  onCheckedChange,
}: CheckboxFieldProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-2 rounded-sm text-sm text-gray-700',
        disabled && 'cursor-not-allowed opacity-60',
        className,
      )}
    >
      <Checkbox
        checked={checked}
        className="mt-0.5 border-gray-300 data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
        disabled={disabled}
        onCheckedChange={(next) => onCheckedChange(next === true)}
      />
      <span>
        <span className="font-medium">{label}</span>
        {hint ? <span className="mt-1 block text-xs font-normal text-gray-500">{hint}</span> : null}
      </span>
    </label>
  )
}

export interface ToggleChipProps {
  active: boolean
  children: ReactNode
  className?: string
  disabled?: boolean
  onPressedChange: () => void
}

export function ToggleChip({
  active,
  children,
  className,
  disabled,
  onPressedChange,
}: ToggleChipProps) {
  return (
    <Button
      aria-pressed={active}
      className={cn(
        'h-8 border px-3 text-sm',
        active
          ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
        className,
      )}
      disabled={disabled}
      onClick={onPressedChange}
      size="sm"
      variant={active ? 'default' : 'outline'}
    >
      {children}
    </Button>
  )
}

export interface RangeInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode
  hint?: ReactNode
}

export function RangeInput({ className, hint, label, ...props }: RangeInputProps) {
  const range = (
    <input
      className={cn(
        'h-2 w-full cursor-pointer accent-blue-600 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      type="range"
      {...props}
    />
  )
  if (!label && !hint) return range
  return (
    <label className="block space-y-1 text-sm font-medium text-gray-700">
      {label ? <span>{label}</span> : null}
      {range}
      {hint ? <span className="block text-xs font-normal text-gray-500">{hint}</span> : null}
    </label>
  )
}

export type FileInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInput(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        'block w-full rounded-md border border-gray-300 bg-white text-sm text-gray-700 shadow-sm transition-colors file:mr-3 file:h-10 file:border-0 file:border-r file:border-gray-200 file:bg-gray-50 file:px-3 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-100 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
        className,
      )}
      type="file"
      {...props}
    />
  )
})
