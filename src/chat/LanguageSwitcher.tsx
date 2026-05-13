import { chatT, type ChatLang } from './i18n'
import { cn } from './utils'
import { SelectField } from '../ui/Select'

export interface LanguageSwitcherProps {
  value: ChatLang
  onChange: (next: ChatLang) => void
  className?: string
}

const LANGS: ChatLang[] = ['ru', 'en', 'zh']

export function LanguageSwitcher({ value, onChange, className }: LanguageSwitcherProps) {
  return (
    <label
      className={cn('inline-flex items-center gap-2 text-xs text-slate-600', className)}
    >
      <span className="sr-only">{chatT(value, 'language-switcher.label')}</span>
      <SelectField
        aria-label={chatT(value, 'language-switcher.label')}
        className="h-8 w-auto min-w-0 px-2 text-xs text-slate-900"
        options={LANGS.map((lang) => ({
          label: chatT(value, `language-switcher.${lang}`),
          value: lang,
        }))}
        value={value}
        onValueChange={(next) => onChange(next as ChatLang)}
      />
    </label>
  )
}
