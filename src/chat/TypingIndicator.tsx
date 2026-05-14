import { chatT, type ChatLang } from './i18n'
import { cn } from './utils'

export interface TypingIndicatorProps {
  who: 'ai' | 'agent'
  language?: ChatLang | string
  className?: string
}

export function TypingIndicator({ who, language = 'ru', className }: TypingIndicatorProps) {
  const label = chatT(language, `typing.${who}`)
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex items-center gap-2 px-3 py-1', className)}
    >
      <div
        className={cn(
          'inline-flex items-center gap-1 rounded-full px-3 py-1.5',
          who === 'agent'
            ? 'bg-emerald-50 border border-emerald-200'
            : 'bg-slate-100',
        )}
      >
        <span className="size-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:0ms]" />
        <span className="size-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:150ms]" />
        <span className="size-1.5 animate-bounce rounded-full bg-slate-500 [animation-delay:300ms]" />
      </div>
      <span className="text-xs text-slate-500">{label}</span>
    </div>
  )
}
