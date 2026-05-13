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
        <span className="chat-typing-dot" />
        <span className="chat-typing-dot chat-typing-dot--2" />
        <span className="chat-typing-dot chat-typing-dot--3" />
      </div>
      <span className="text-xs text-slate-500">{label}</span>
      <style>{`
        .chat-typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          background-color: rgb(100, 116, 139);
          display: inline-block;
          animation: chat-typing-bounce 1.2s infinite ease-in-out both;
        }
        .chat-typing-dot--2 { animation-delay: 0.15s; }
        .chat-typing-dot--3 { animation-delay: 0.3s; }
        @keyframes chat-typing-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
