export type QueryScope = 'admin' | 'console'
export type QueryKeyPart = string | number | boolean | null | undefined

function compact(parts: readonly QueryKeyPart[]): readonly QueryKeyPart[] {
  return parts.filter((part) => part !== undefined)
}

export const domainQueryKeys = {
  admin: {
    shellTenants: () => ['admin', 'shell', 'tenants'] as const,
    tenants: () => ['admin', 'tenants'] as const,
    dashboardTenants: () => ['admin', 'dashboard', 'tenants'] as const,
    dashboardOutbox: () => ['admin', 'dashboard', 'outbox'] as const,
    dashboardJobs: () => ['admin', 'dashboard', 'jobs'] as const,
    dashboardVoucher: (tenantId: QueryKeyPart) => compact(['admin', 'dashboard', 'voucher', tenantId]),
    dashboardBilling: (
      tenantId: QueryKeyPart,
      meterCode: QueryKeyPart,
      from: QueryKeyPart,
      to: QueryKeyPart,
    ) => compact(['admin', 'dashboard', 'billing', tenantId, meterCode, from, to]),
    tenant: (tenantId: QueryKeyPart) => compact(['admin', 'tenant', tenantId]),
    tenantDetail: (code: QueryKeyPart) => compact(['admin', 'tenant-detail', code]),
    features: (tenantId: QueryKeyPart) => compact(['admin', 'features', tenantId]),
    billing: (tenantId: QueryKeyPart, meterCode: QueryKeyPart, from: QueryKeyPart, to: QueryKeyPart) =>
      compact(['admin', 'billing', tenantId, meterCode, from, to]),
    voucherBatches: (tenantId: QueryKeyPart) => compact(['admin', 'voucher', 'batches', tenantId]),
    audit: (tenantId: QueryKeyPart) => compact(['admin', 'audit', tenantId]),
    apiKeys: (tenantId: QueryKeyPart) => compact(['admin', 'integrations', 'api-keys', tenantId]),
    webhooks: (tenantId: QueryKeyPart) => compact(['admin', 'integrations', 'webhooks', tenantId]),
    jobRuns: () => ['admin', 'jobs', 'runs'] as const,
    outbox: () => ['admin', 'jobs', 'outbox'] as const,
    rbacRoles: () => ['admin', 'rbac', 'roles'] as const,
    rbacPrincipals: (tenantId: QueryKeyPart) => compact(['admin', 'rbac', 'principals', tenantId]),
    growthPrograms: (tenantId: QueryKeyPart) => compact(['admin', 'growth', 'programs', tenantId]),
    growthRules: (tenantId: QueryKeyPart, programId: QueryKeyPart) =>
      compact(['admin', 'growth', 'rules', tenantId, programId]),
    growthRankings: (tenantId: QueryKeyPart, programId: QueryKeyPart) =>
      compact(['admin', 'growth', 'rankings', tenantId, programId]),
    growthAccruals: (tenantId: QueryKeyPart, programId: QueryKeyPart) =>
      compact(['admin', 'growth', 'accruals', tenantId, programId]),
    customerServiceTickets: (
      tenantId: QueryKeyPart,
      status: QueryKeyPart,
    ) => compact(['admin', 'customer-service', 'tickets', tenantId, status]),
    aiInvocations: (
      tenantId: QueryKeyPart,
      provider: QueryKeyPart,
      escalated: QueryKeyPart,
    ) => compact(['admin', 'customer-service', 'ai-invocations', tenantId, provider, escalated]),
    customerServiceProviderKillswitch: () =>
      ['admin', 'customer-service', 'killswitch', 'providers'] as const,
    customerServiceKillswitch: () => ['admin', 'customer-service', 'killswitch'] as const,
  },
  console: {
    capabilities: () => ['console', 'capabilities'] as const,
    notifications: (principalId: QueryKeyPart, view?: QueryKeyPart) =>
      compact(['console', 'notifications', view, principalId]),
    growthPrograms: (tenantId: QueryKeyPart, view?: QueryKeyPart) =>
      compact(['console', 'growth-programs', view, tenantId]),
    voucherBatches: (tenantId: QueryKeyPart) =>
      compact(['console', 'voucher-batches', tenantId]),
    voucherBatchesView: (tenantId: QueryKeyPart, view?: QueryKeyPart) =>
      compact(['console', 'voucher-batches', view, tenantId]),
    billing: (
      tenantId: QueryKeyPart,
      meterCode: QueryKeyPart,
      from: QueryKeyPart,
      to: QueryKeyPart,
      view?: QueryKeyPart,
    ) => compact(['console', 'billing-aggregate', view, tenantId, meterCode, from, to]),
    apiKeys: (tenantId: QueryKeyPart, view?: QueryKeyPart) => compact(['console', 'api-keys', view, tenantId]),
    webhooks: (tenantId: QueryKeyPart) => compact(['console', 'webhooks', tenantId]),
    growthRewards: (programId: QueryKeyPart) => compact(['console', 'growth-rewards', programId]),
    growthRankings: (programId: QueryKeyPart) => compact(['console', 'growth-rankings', programId]),
    customerServiceConfig: () => ['console', 'customer-service', 'config'] as const,
    customerServiceTickets: (status: QueryKeyPart) =>
      compact(['console', 'customer-service', 'tickets', status]),
    customerServiceAgents: () => ['console', 'customer-service', 'agents'] as const,
    knowledgeDocs: () => ['console', 'knowledge', 'docs'] as const,
    knowledgeDoc: (id: QueryKeyPart) => compact(['console', 'knowledge', 'doc', id]),
    knowledgeVersions: (title: QueryKeyPart) => compact(['console', 'knowledge', 'versions', title]),
    knowledge: () => ['console', 'knowledge'] as const,
    customerServiceStats: () => ['console', 'customer-service', 'stats'] as const,
    customerServiceTicketDetail: (id: QueryKeyPart) =>
      compact(['console', 'customer-service', 'ticket', id]),
    customerServiceTicketConversations: (id: QueryKeyPart) =>
      compact(['console', 'customer-service', 'ticket', id, 'conversations']),
    customerServiceConversationMessages: (id: QueryKeyPart) =>
      compact(['console', 'customer-service', 'conversation', id, 'messages']),
    customerServiceCoPilotDraft: (ticketId: QueryKeyPart) =>
      compact(['console', 'customer-service', 'co-pilot', ticketId]),
  },
} as const
