// Self-contained chat-namespace dictionary for embeddable chat widgets.
// Consumers may merge these into their app-level i18next instance via
// `i18n.addResourceBundle('en', 'chat', chatI18n.en, true, false)`.
import en from './en.json'
import ru from './ru.json'
import zh from './zh.json'

export type ChatLang = 'ru' | 'en' | 'zh'

export const chatI18n = { en, ru, zh } as const

export type ChatDictionary = typeof en

export function pickChatDictionary(language: ChatLang | string): ChatDictionary {
  if (language === 'zh') return zh as ChatDictionary
  if (language === 'en') return en as ChatDictionary
  return ru as ChatDictionary
}

export function chatT(language: ChatLang | string, key: string): string {
  const dict = pickChatDictionary(language) as Record<string, unknown>
  const segments = key.split('.')
  let cursor: unknown = dict
  for (const seg of segments) {
    if (cursor && typeof cursor === 'object' && seg in (cursor as Record<string, unknown>)) {
      cursor = (cursor as Record<string, unknown>)[seg]
    } else {
      return key
    }
  }
  return typeof cursor === 'string' ? cursor : key
}
