import { useState, type KeyboardEvent } from 'react'
import { chatT, type ChatLang } from './i18n'
import { cn } from './utils'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'

export interface MessageInputProps {
  language?: ChatLang | string
  disabled?: boolean
  sending?: boolean
  onSend: (content: string) => void | Promise<void>
  className?: string
}

export function MessageInput({
  language = 'ru',
  disabled,
  sending,
  onSend,
  className,
}: MessageInputProps) {
  const [draft, setDraft] = useState('')

  function flush() {
    const trimmed = draft.trim()
    if (!trimmed) return
    void onSend(trimmed)
    setDraft('')
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      flush()
    }
  }

  const isDisabled = Boolean(disabled || sending)

  return (
    <div
      className={cn(
        'flex items-end gap-2 border-t border-slate-200 bg-white p-3',
        className,
      )}
    >
      <Textarea
        className="min-h-[44px] max-h-40 flex-1 resize-none text-slate-900"
        rows={1}
        placeholder={
          isDisabled
            ? chatT(language, 'input.disabled-closed')
            : chatT(language, 'input.placeholder')
        }
        value={draft}
        disabled={isDisabled}
        onChange={(event) => setDraft(event.currentTarget.value)}
        onKeyDown={handleKeyDown}
        aria-label={chatT(language, 'input.placeholder')}
      />
      <Button
        type="button"
        className="h-10 px-4"
        disabled={isDisabled || !draft.trim()}
        onClick={flush}
      >
        {chatT(language, 'input.send')}
      </Button>
    </div>
  )
}
