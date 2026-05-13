// Wire-shape mirror of libs/contracts/customer_service.Message — keep this in
// sync with the Go contract. The chat widgets are presentational; routing /
// §8.1 hard-rules / RAG threshold logic stays backend-side.
export type ChatMessageRole = 'user' | 'ai' | 'agent' | 'system'

export type ChatLanguage = 'ru' | 'en' | 'zh'

export interface ChatMessage {
  id: string
  conversationId: string
  role: ChatMessageRole
  content: string
  language?: ChatLanguage | string
  invocationId?: string
  senderPrincipalId?: string
  createdAt?: string
}

export interface ChatConversation {
  id: string
  tenantId: string
  ticketId?: string
  channel?: string
  status?: 'active' | 'closed'
}
