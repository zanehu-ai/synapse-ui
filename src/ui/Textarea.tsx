import * as React from 'react'
import { cn } from '../utils/cn'

export interface TextareaProps extends React.ComponentProps<'textarea'> {
  label?: React.ReactNode
  hint?: React.ReactNode
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, hint, error, id, value, ...props }, ref) => {
    const generatedId = React.useId()
    const textareaId = id ?? generatedId
    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={textareaId} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          data-slot="textarea"
          id={textareaId}
          value={value ?? undefined}
          className={cn(
            'min-h-16 w-full min-w-0 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className,
          )}
          {...props}
        />
        {hint && <p className="text-xs text-gray-500">{hint}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
