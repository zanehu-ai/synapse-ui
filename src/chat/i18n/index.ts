// Self-contained chat-namespace dictionaries for embeddable chat widgets.
// Consumers may merge these into their app-level i18next instance via
// `i18n.addResourceBundle('en', 'chat', chatI18n.en, true, false)`.
const en = {
  input: {
    placeholder: 'Type your message...',
    send: 'Send',
    'disabled-closed': 'This conversation is closed.',
  },
  transfer: {
    label: 'Talk to a human',
    confirm: 'Are you sure you want to transfer to a human agent?',
  },
  typing: {
    ai: 'AI is typing...',
    agent: 'Agent is typing...',
  },
  'language-switcher': {
    label: 'Language',
    ru: 'Русский',
    en: 'English',
    zh: '中文',
  },
  messages: {
    empty: 'No messages yet. Send the first one to start.',
    loading: 'Loading conversation...',
  },
  roles: {
    user: 'You',
    ai: 'AI assistant',
    agent: 'Agent',
    system: 'System',
  },
}

const ru = {
  input: {
    placeholder: 'Введите сообщение...',
    send: 'Отправить',
    'disabled-closed': 'Диалог закрыт.',
  },
  transfer: {
    label: 'Связаться с оператором',
    confirm: 'Передать диалог оператору?',
  },
  typing: {
    ai: 'AI печатает...',
    agent: 'Оператор печатает...',
  },
  'language-switcher': {
    label: 'Язык',
    ru: 'Русский',
    en: 'English',
    zh: '中文',
  },
  messages: {
    empty: 'Сообщений пока нет. Напишите первое, чтобы начать.',
    loading: 'Загрузка диалога...',
  },
  roles: {
    user: 'Вы',
    ai: 'AI-ассистент',
    agent: 'Оператор',
    system: 'Система',
  },
}

const zh = {
  input: {
    placeholder: '请输入消息...',
    send: '发送',
    'disabled-closed': '对话已关闭。',
  },
  transfer: {
    label: '找人工',
    confirm: '确认转人工客服？',
  },
  typing: {
    ai: 'AI 正在输入...',
    agent: '客服正在输入...',
  },
  'language-switcher': {
    label: '语言',
    ru: 'Русский',
    en: 'English',
    zh: '中文',
  },
  messages: {
    empty: '暂无消息，发送第一条开始对话。',
    loading: '对话加载中...',
  },
  roles: {
    user: '您',
    ai: 'AI 客服',
    agent: '人工客服',
    system: '系统',
  },
}

export type ChatLang = 'ru' | 'en' | 'zh'

export const chatI18n = { en, ru, zh } as const

export type ChatDictionary = typeof en

export function normalizeChatLang(language: ChatLang | string): ChatLang {
  const normalized = language.toLowerCase().split(/[-_]/)[0]
  if (normalized === 'zh') return 'zh'
  if (normalized === 'en') return 'en'
  return 'ru'
}

export function pickChatDictionary(language: ChatLang | string): ChatDictionary {
  const normalized = normalizeChatLang(language)
  if (normalized === 'zh') return zh as ChatDictionary
  if (normalized === 'en') return en as ChatDictionary
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
