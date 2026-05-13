import { useMemo, useState } from 'react'
import { chatT, type ChatLang } from './i18n'
import type { ChatMessage } from './types'
import { cn } from './utils'

export interface MessageBubbleProps {
  message: ChatMessage
  language?: ChatLang | string
  className?: string
}

export function MessageBubble({ message, language = 'ru', className }: MessageBubbleProps) {
  const [hovered, setHovered] = useState(false)
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  const containerClass = useMemo(() => {
    if (isSystem) return 'flex justify-center'
    return isUser ? 'flex justify-end' : 'flex justify-start'
  }, [isSystem, isUser])

  const bubbleClass = useMemo(() => {
    if (isSystem) {
      return 'rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-600'
    }
    if (isUser) {
      return 'max-w-[78%] rounded-2xl rounded-br-sm bg-sky-600 px-4 py-2 text-sm text-white shadow-sm'
    }
    if (message.role === 'agent') {
      return 'max-w-[78%] rounded-2xl rounded-bl-sm bg-emerald-50 px-4 py-2 text-sm text-emerald-950 shadow-sm border border-emerald-200'
    }
    return 'max-w-[78%] rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-2 text-sm text-slate-900 shadow-sm'
  }, [isSystem, isUser, message.role])

  const roleLabel = chatT(language, `roles.${message.role}`)
  const timestamp = formatTimestamp(message.createdAt)

  return (
    <div
      className={cn(containerClass, className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex max-w-full flex-col gap-1">
        {!isSystem ? (
          <span
            className={cn(
              'text-xs text-slate-500',
              isUser ? 'self-end' : 'self-start',
            )}
          >
            {roleLabel}
          </span>
        ) : null}
        <div className={bubbleClass}>
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        {timestamp && hovered && !isSystem ? (
          <span
            className={cn(
              'text-[10px] text-slate-400',
              isUser ? 'self-end' : 'self-start',
            )}
          >
            {timestamp}
          </span>
        ) : null}
      </div>
    </div>
  )
}

function formatTimestamp(value?: string): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString()
}
