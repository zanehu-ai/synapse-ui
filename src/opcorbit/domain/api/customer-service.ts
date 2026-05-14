import type { AxiosInstance } from 'axios'
import type { PageResult } from '../../control'
import {
  camelizeDeep,
  snakeizeShallow,
  unwrapDomainList,
  unwrapDomainPage,
} from './shape'

export interface ConsolePageResult<T> {
  data: T[]
  pending?: boolean
  pendingReason?: string
  total: number
}

export interface AdminPageResult<T> extends PageResult<T> {
  unavailable?: boolean
  note?: string
}

export type SupportedLang = 'ru' | 'en' | 'zh'

export interface CustomerServiceConfig {
  tenantId?: string
  aiEnabled?: boolean
  ragScoreThreshold?: number
  llmConsistencyThreshold?: number
  monthlyBudgetUsd?: number
  languagePreferences?: SupportedLang[]
  coPilotEnabled?: boolean
  updatedAt?: string
}

export interface UpdateCustomerServiceConfigRequest {
  aiEnabled?: boolean
  ragScoreThreshold?: number
  llmConsistencyThreshold?: number
  monthlyBudgetUsd?: number
  languagePreferences?: SupportedLang[]
  coPilotEnabled?: boolean
}

export interface KnowledgeDoc {
  id: string
  tenantId?: string
  title: string
  language: SupportedLang
  version: number
  isActive: boolean
  parentDocId?: string
  uploadedByPrincipalId?: string
  contentHash?: string
  sourceUri?: string
  chunkCount?: number
  createdAt?: string
  updatedAt?: string
}

export interface UploadKnowledgeDocRequest {
  title: string
  language: SupportedLang
  body: string
  sourceUri?: string
}

export interface RollbackKnowledgeDocRequest {
  title: string
  targetVersion: number
}

export type TicketStatus =
  | 'open'
  | 'in_progress'
  | 'escalated'
  | 'resolved'
  | 'closed'

export type TicketPriority = 'low' | 'normal' | 'high' | 'urgent'

export interface Ticket {
  id: string
  tenantId: string
  customerPrincipalId: string
  title: string
  status: TicketStatus
  priority: TicketPriority
  language: SupportedLang
  assignedAgentPrincipalId?: string
  escalatedAt?: string
  resolvedAt?: string
  closedAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface AgentSeat {
  id: string
  tenantId?: string
  principalId: string
  seatStatus: 'available' | 'busy' | 'offline'
  languages: SupportedLang[]
  maxConcurrentTickets: number
  currentActiveCount: number
  lastActiveAt?: string
  createdAt?: string
  updatedAt?: string
}

export interface UpsertAgentSeatRequest {
  principalId: string
  languages: SupportedLang[]
  maxConcurrentTickets: number
  seatStatus?: AgentSeat['seatStatus']
}

export interface AdminTicketRow {
  id: string
  tenantId: string
  customerPrincipalId: string
  title: string
  status: string
  priority: string
  language: string
  assignedAgentPrincipalId?: string
  createdAt?: string
}

export interface AdminAIInvocation {
  invocationId: string
  tenantId: string
  provider: string
  model?: string
  promptTokens: number
  completionTokens: number
  totalCost: number
  currency?: string
  routeReason?: string
  escalatedToHuman: boolean
  createdAt?: string
}

export interface AdminProviderKillswitch {
  provider: string
  enabled: boolean
  updatedAt?: string
  updatedByPrincipalId?: string
}

const customerServiceRoutes = {
  config: '/api/customer-service/config',
  knowledge: '/api/customer-service/knowledge',
  knowledgeRollback: '/api/customer-service/knowledge/rollback',
  knowledgeVersions: (title: string) =>
    `/api/customer-service/knowledge/versions?title=${encodeURIComponent(title)}`,
  tickets: '/api/customer-service/tickets',
  ticketById: (id: string | number) => `/api/customer-service/tickets/${id}`,
  agents: '/api/customer-service/agents',
  agentStatus: (principalId: string) =>
    `/api/customer-service/agents/${encodeURIComponent(principalId)}/status`,
} as const

const adminCustomerServiceRoutes = {
  tickets: '/api/ops/customer-service/tickets',
  aiInvocations: '/api/ops/customer-service/ai-invocations',
  providerKillswitch: '/api/ops/customer-service/killswitch/providers',
  providerKillswitchToggle: (provider: string) =>
    `/api/ops/customer-service/killswitch/providers/${encodeURIComponent(provider)}`,
  tenantKillswitch: (tenantId: string) =>
    `/api/ops/customer-service/killswitch/tenants/${encodeURIComponent(tenantId)}`,
} as const

export async function getCustomerServiceConfig(
  client: AxiosInstance,
): Promise<CustomerServiceConfig> {
  const res = await client.get(customerServiceRoutes.config)
  return camelizeDeep(res.data) as CustomerServiceConfig
}

export async function updateCustomerServiceConfig(
  client: AxiosInstance,
  input: UpdateCustomerServiceConfigRequest,
): Promise<CustomerServiceConfig> {
  const res = await client.put(customerServiceRoutes.config, snakeizeShallow(input))
  return camelizeDeep(res.data) as CustomerServiceConfig
}

export async function listKnowledgeDocs(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number; activeOnly?: boolean } = {},
): Promise<ConsolePageResult<KnowledgeDoc>> {
  const res = await client.get(customerServiceRoutes.knowledge, {
    params: snakeizeShallow(opts),
  })
  return unwrapDomainPage<KnowledgeDoc>(res.data)
}

export async function listKnowledgeVersions(
  client: AxiosInstance,
  title: string,
): Promise<KnowledgeDoc[]> {
  const res = await client.get(customerServiceRoutes.knowledgeVersions(title))
  return unwrapDomainList(res.data).map((row) => camelizeDeep(row) as KnowledgeDoc)
}

export async function uploadKnowledgeDoc(
  client: AxiosInstance,
  input: UploadKnowledgeDocRequest,
): Promise<KnowledgeDoc> {
  const res = await client.post(customerServiceRoutes.knowledge, snakeizeShallow(input))
  return camelizeDeep(res.data) as KnowledgeDoc
}

export async function rollbackKnowledgeVersion(
  client: AxiosInstance,
  input: RollbackKnowledgeDocRequest,
): Promise<KnowledgeDoc> {
  const res = await client.post(
    customerServiceRoutes.knowledgeRollback,
    snakeizeShallow(input),
  )
  return camelizeDeep(res.data) as KnowledgeDoc
}

export async function listTickets(
  client: AxiosInstance,
  opts: {
    status?: TicketStatus | ''
    limit?: number
    offset?: number
  } = {},
): Promise<ConsolePageResult<Ticket>> {
  const params = snakeizeShallow({
    status: opts.status || undefined,
    limit: opts.limit,
    offset: opts.offset,
  })
  const res = await client.get(customerServiceRoutes.tickets, { params })
  return unwrapDomainPage<Ticket>(res.data)
}

export async function getTicket(
  client: AxiosInstance,
  ticketId: string | number,
): Promise<Ticket> {
  const res = await client.get(customerServiceRoutes.ticketById(ticketId))
  return camelizeDeep(res.data) as Ticket
}

export async function listAgentSeats(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<ConsolePageResult<AgentSeat>> {
  const res = await client.get(customerServiceRoutes.agents, {
    params: snakeizeShallow(opts),
  })
  return unwrapDomainPage<AgentSeat>(res.data)
}

export async function upsertAgentSeat(
  client: AxiosInstance,
  input: UpsertAgentSeatRequest,
): Promise<AgentSeat> {
  const res = await client.post(customerServiceRoutes.agents, snakeizeShallow(input))
  return camelizeDeep(res.data) as AgentSeat
}

export async function setAgentSeatStatus(
  client: AxiosInstance,
  principalId: string,
  status: AgentSeat['seatStatus'],
): Promise<AgentSeat> {
  const res = await client.patch(
    customerServiceRoutes.agentStatus(principalId),
    { seat_status: status },
  )
  return camelizeDeep(res.data) as AgentSeat
}

export async function listAllProviderKillswitch(
  client: AxiosInstance,
): Promise<AdminPageResult<AdminProviderKillswitch>> {
  try {
    const res = await client.get(adminCustomerServiceRoutes.providerKillswitch)
    const data = unwrapDomainList<AdminProviderKillswitch>(res.data)
    return { data, total: data.length }
  } catch {
    return unavailablePage<AdminProviderKillswitch>(
      'Provider kill-switch endpoint is not exposed yet.',
    )
  }
}

export async function toggleProviderKillswitch(
  client: AxiosInstance,
  provider: string,
  enabled: boolean,
): Promise<AdminProviderKillswitch> {
  const res = await client.patch(
    adminCustomerServiceRoutes.providerKillswitchToggle(provider),
    { enabled },
  )
  return camelizeDeep(res.data) as AdminProviderKillswitch
}

export async function toggleTenantAIEnabled(
  client: AxiosInstance,
  tenantId: string,
  enabled: boolean,
): Promise<{ tenantId: string; aiEnabled: boolean }> {
  const res = await client.patch(
    adminCustomerServiceRoutes.tenantKillswitch(tenantId),
    { ai_enabled: enabled },
  )
  return camelizeDeep(res.data) as { tenantId: string; aiEnabled: boolean }
}

export async function listAdminCustomerServiceTickets(
  client: AxiosInstance,
  opts: { tenantId: string; status?: string; limit?: number; offset?: number },
): Promise<AdminPageResult<AdminTicketRow>> {
  if (!opts.tenantId) {
    return unavailablePage<AdminTicketRow>(
      'Select a tenant to load customer service tickets.',
    )
  }
  try {
    const res = await client.get(adminCustomerServiceRoutes.tickets, {
      params: snakeizeShallow({
        tenantId: opts.tenantId,
        status: opts.status,
        limit: opts.limit,
        offset: opts.offset,
      }),
    })
    return unwrapDomainPage<AdminTicketRow>(res.data)
  } catch {
    return unavailablePage<AdminTicketRow>(
      'Cross-tenant ticket reads are not yet exposed by the Control API.',
    )
  }
}

export async function listAIInvocations(
  client: AxiosInstance,
  opts: {
    tenantId?: string
    provider?: string
    escalatedOnly?: boolean
    limit?: number
    offset?: number
  } = {},
): Promise<AdminPageResult<AdminAIInvocation>> {
  try {
    const res = await client.get(adminCustomerServiceRoutes.aiInvocations, {
      params: snakeizeShallow({
        tenantId: opts.tenantId,
        provider: opts.provider,
        escalatedOnly: opts.escalatedOnly,
        limit: opts.limit,
        offset: opts.offset,
      }),
    })
    return unwrapDomainPage<AdminAIInvocation>(res.data)
  } catch {
    return unavailablePage<AdminAIInvocation>(
      'AI invocation audit endpoint is not exposed yet.',
    )
  }
}

export function isUnavailable<T>(result: AdminPageResult<T> | undefined): boolean {
  return result?.unavailable === true
}

function unavailablePage<T>(note: string): Promise<AdminPageResult<T>> {
  return Promise.resolve({ data: [], total: 0, unavailable: true, note })
}
