import type { AxiosInstance } from 'axios'
import type { Principal } from './types/principal'
import type { Tenant } from './types/tenant'

export type AuthTokenType = 'platform' | 'tenant'

export interface LoginRequest {
  // identity backend accepts exactly one of phone / email; pick whichever
  // the user typed. Older callers passing only `phone` continue to work.
  phone?: string
  email?: string
  password: string
}

export interface LoginResponse {
  token: string
  tokenType: AuthTokenType
  expiresIn: number
  principal: Principal | null
}

export interface ActAsRequest {
  tenantCode: string
}

export interface PageResult<T> {
  data: T[]
  total: number
}

export interface VoucherBatch {
  id: string | number
  tenantId?: string | number
  batchCode?: string
  faceValue?: number
  currency?: string
  totalCount?: number
  redeemedCount?: number
  voidedCount?: number
  status?: string
  createdAt?: string
}

export interface BillingAggregate {
  tenantId?: string | number
  meterCode?: string
  quantity: number
  from?: string
  to?: string
}

export interface AuditLog {
  id: string | number
  tenantId?: string | number
  principalId?: string | number | null
  principalType?: string | null
  action?: string
  resourceType?: string
  resourceId?: string | null
  result?: number | string
  ip?: string | null
  traceId?: string | null
  requestId?: string | null
  detail?: unknown
  createdAt?: string
}

export interface PermissionCheck {
  allowed?: boolean
  tenantId?: string | number
  principalId?: string | number
  permissionCode?: string
  resource?: string
  action?: string
  reason?: string
}

export interface FeatureFlag {
  id: string
  tenantId: string
  featureCode: string
  enabled: boolean
  rolloutPercent: number
  config?: unknown
  createdAt?: string
  updatedAt?: string
}

export interface FeatureFlagListResponse {
  tenantId: string
  flags: FeatureFlag[]
  registry: string[]
}

export interface CapabilitiesResponse {
  tenantId: string
  features: string[]
}

export interface NotificationItem {
  id: string | number
  type: string
  title?: string
  body?: string
  createdAt?: string
  readAt?: string | null
}

export interface ApiKey {
  id: string | number
  name?: string
  prefix?: string
  status?: string
  scopes: string[]
  createdAt?: string
  lastUsedAt?: string | null
}

export interface WebhookSubscription {
  id: string | number
  tenantId?: string | number
  name?: string
  url?: string
  eventTypes?: string[]
  status?: string
  createdAt?: string
  updatedAt?: string
}

export interface FundingChannel {
  id: string | number
  tenantId?: string | number
  channelCode?: string
  channelType?: string
  displayName?: string
  status?: string | number
  currency?: string
  createdAt?: string
  updatedAt?: string
}

export interface JobRun {
  id?: string | number
  jobName: string
  status?: string
  attempts?: number
  startedAt?: string
  finishedAt?: string | null
}

export interface OpcBotAgentDefinition {
  id?: string | number
  agentCode: string
  runtime: string
  capabilities: string[]
  riskAllowed: string[]
  maxConcurrency: number
  activeCount: number
  enabled: boolean
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotWorkflow {
  id?: string | number
  workflowId: string
  sourceType: string
  sourceRef: string
  status: string
  riskLevel: string
  maxParallelism: number
  createdBy?: string | number
  errorMessage?: string | null
  startedAt?: string | null
  finishedAt?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotTask {
  id?: string | number
  taskId: string
  workflowId: string
  agentCode: string
  phase: string
  status: string
  riskLevel: string
  optional?: boolean
  inputPayload?: Record<string, unknown>
  outputPayload?: Record<string, unknown>
  branch?: string | null
  workspaceRef?: string | null
  errorMessage?: string | null
  approvedAt?: string | null
  approvedBy?: string | number | null
  startedAt?: string | null
  finishedAt?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotTaskDependency {
  id?: string | number
  workflowId: string
  taskId: string
  dependsOnTaskId: string
  dependencyType: string
}

export interface OpcBotArtifact {
  id?: string | number
  artifactId: string
  workflowId: string
  taskId: string
  artifactType: string
  payload?: Record<string, unknown>
  createdAt?: string
}

export interface OpcBotGateResult {
  id?: string | number
  gateResultId: string
  workflowId: string
  taskId?: string | null
  gateType: string
  status: string
  required: boolean
  detail?: Record<string, unknown>
  approvedBy?: string | number | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotRunnerProvider {
  id?: string | number
  providerCode: string
  providerType: string
  endpointRef?: string
  capabilities: string[]
  maxConcurrency: number
  activeCount: number
  enabled: boolean
  healthStatus: string
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotSkillDefinition {
  id?: string | number
  skillCode: string
  displayName: string
  sourceType: string
  sourceRepo?: string
  sourcePath: string
  sourceCommit?: string
  checksum?: string
  riskLevel: string
  allowedAgents: string[]
  allowedProviders: string[]
  inputSchema?: Record<string, unknown>
  outputSchema?: Record<string, unknown>
  enabled: boolean
  canary?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotSkillRun {
  id?: string | number
  skillRunId: string
  workflowId: string
  taskId: string
  skillCode: string
  skillVersion?: string
  providerCode: string
  model?: string
  status: string
  durationMs: number
  tokenIn?: number
  tokenOut?: number
  cost?: number
  artifactId?: string | null
  failureReason?: string | null
  humanOverride?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotExternalRun {
  id?: string | number
  externalRunId: string
  workflowId: string
  taskId: string
  providerCode: string
  providerRunId: string
  externalStatus: string
  detail?: Record<string, unknown>
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotLessonCandidate {
  id?: string | number
  candidateId: string
  workflowId: string
  taskId: string
  sourceType: string
  targetType: string
  targetRef: string
  summary: string
  evidenceJson?: Record<string, unknown>
  suggestedDiff?: string
  confidence: string
  status: string
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotEvolutionProposal {
  id?: string | number
  proposalId: string
  candidateId: string
  targetRepo: string
  targetPath: string
  proposalType: string
  diffJson?: Record<string, unknown>
  evidenceJson?: Record<string, unknown>
  riskLevel: string
  status: string
  approvedBy?: string | number | null
  approvedAt?: string | null
  branch?: string | null
  prUrl?: string | null
  errorMessage?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotL5EligibilityResult {
  id?: string | number
  eligibilityId: string
  workflowId: string
  decisionStatus: string
  riskLevel: string
  eligible: boolean
  blockedReasons?: string[]
  evaluatedBy?: string
  evaluatedAt?: string
  inputSnapshot?: Record<string, unknown>
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotPolicyDecision {
  id?: string | number
  decisionId: string
  workflowId: string
  decisionType: string
  decisionStatus: string
  riskLevel: string
  eligible: boolean
  blockedReasons?: string[]
  evaluatedBy?: string
  evaluatedAt?: string
  inputSnapshot?: Record<string, unknown>
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotPullRequest {
  id?: string | number
  pullRequestId: string
  workflowId: string
  integrationRunId?: string
  repo: string
  branch: string
  baseBranch: string
  prUrl?: string
  commitSha?: string
  status: string
  autoMergeStatus: string
  dryRun: boolean
  detail?: Record<string, unknown>
  errorMessage?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotDeployRun {
  deployRunId: string
  workflowId: string
  environment: string
  providerCode: string
  commitSha?: string
  status: string
  detail?: Record<string, unknown>
  errorMessage?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotCanaryRun {
  canaryRunId: string
  workflowId: string
  mode: string
  providerCode: string
  status: string
  detail?: Record<string, unknown>
  errorMessage?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotMonitorCheck {
  monitorCheckId: string
  workflowId: string
  checkType: string
  status: string
  detail?: Record<string, unknown>
  errorMessage?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotRollbackRun {
  rollbackRunId: string
  workflowId: string
  providerCode: string
  status: string
  reason?: string
  detail?: Record<string, unknown>
  errorMessage?: string | null
  createdAt?: string
  updatedAt?: string
}

export interface OpcBotReleaseRuns {
  deployRuns: OpcBotDeployRun[]
  canaryRuns: OpcBotCanaryRun[]
  monitorChecks: OpcBotMonitorCheck[]
  rollbackRuns: OpcBotRollbackRun[]
}

export interface OpcBotWorkflowDetail {
  workflow: OpcBotWorkflow
  tasks: OpcBotTask[]
  dependencies: OpcBotTaskDependency[]
  artifacts: OpcBotArtifact[]
  gates: OpcBotGateResult[]
  l5Eligibility?: OpcBotL5EligibilityResult | null
  pullRequest?: OpcBotPullRequest | null
}

export interface OpcBotTaskInput {
  taskId?: string
  agentCode: string
  phase: string
  riskLevel?: string
  optional?: boolean
  inputPayload?: Record<string, unknown>
  branch?: string
  workspaceRef?: string
}

export interface OpcBotCreateSkillInput {
  skillCode: string
  displayName: string
  sourceType: string
  sourceRepo?: string
  sourcePath: string
  sourceCommit?: string
  checksum?: string
  riskLevel?: string
  allowedAgents: string[]
  allowedProviders: string[]
  inputSchema?: Record<string, unknown>
  outputSchema?: Record<string, unknown>
  enabled?: boolean
  canary?: boolean
}

export interface OpcBotProposeLessonInput {
  targetRepo?: string
  targetPath?: string
  proposalType?: string
  diffJson?: Record<string, unknown>
}

export interface OpcBotMarkEvolutionMergedInput {
  skillCode?: string
  sourceCommit?: string
  checksum?: string
  canary?: boolean
}

export interface OpcBotDependencyInput {
  taskId: string
  dependsOnTaskId: string
  dependencyType?: string
}

export interface OpcBotCreateWorkflowInput {
  sourceType: string
  sourceRef: string
  riskLevel?: string
  maxParallelism?: number
  tasks: OpcBotTaskInput[]
  dependencies?: OpcBotDependencyInput[]
}

export interface OpcBotSummary {
  runningAgents: number
  waitingGates: number
  failedTasks: number
}

export interface OutboxEvent {
  id?: string | number
  eventId?: string
  topic?: string
  status?: string | number
  createdAt?: string
}

export interface PendingOutboxEvents {
  data: OutboxEvent[]
  note?: string
}

export interface GrowthProgram {
  id: string | number
  tenantId?: string | number
  code: string
  maxDepth?: number
  attributionPolicy?: string
  status?: string
}

export interface GrowthRule {
  id: string | number
  tenantId?: string | number
  programId?: string | number
  level: number
  basisMetric: string
  rate?: string
  fixedAmount?: string
  minThreshold?: string
  capRatio?: string
  status?: string
}

export interface GrowthStats {
  tenantId?: string | number
  programId?: string | number
  principalId?: string | number
  totalInvites: number
  pendingReward: string
  settledReward: string
  tierLevel?: number
}

export interface GrowthAccrual {
  id: string | number
  tenantId?: string | number
  programId?: string | number
  beneficiaryPrincipalId?: string | number
  sourceRef: string
  sourceVersion?: string
  level: number
  basisMetric: string
  basisAmount: string
  amount: string
  status: string
  createdAt?: string
}

export const controlApiRoutes = {
  tenants: '/api/tenants',
  tenantByCode: (code: string | number) => `/api/tenants/${code}`,
  audit: '/api/audit',
  rbacCheck: '/api/rbac/check',
  billingMeter: '/api/billing/meter',
  fileUploadUrl: '/api/files/upload-url',
  fileById: (id: string | number) => `/api/files/${id}`,
  fileComplete: (id: string | number) => `/api/files/${id}/complete`,
  webhooks: '/api/integrations/webhooks',
  webhookTest: (id: string | number) => `/api/integrations/webhooks/${id}/test`,
  notifications: '/api/notifications',
  notificationRead: (id: string | number) => `/api/notifications/${id}/read`,
  apiKeys: '/api/integrations/api-keys',
  apiKeyRotate: (id: string | number) => `/api/integrations/api-keys/${id}/rotate`,
  apiKeyRevoke: (id: string | number) => `/api/integrations/api-keys/${id}/revoke`,
  jobRuns: '/api/jobs/runs',
  jobRunManual: (name: string) => `/api/jobs/${encodeURIComponent(name)}/run`,
  outboxPending: '/api/events/outbox/pending',
  opcBotAgents: '/api/opcbot/agents',
  opcBotRunnerProviders: '/api/opcbot/runner-providers',
  opcBotSkills: '/api/opcbot/skills',
  opcBotSkillRuns: '/api/opcbot/skill-runs',
  opcBotExternalRuns: '/api/opcbot/external-runs',
  opcBotReleaseRuns: '/api/opcbot/release-runs',
  opcBotLessonCandidates: '/api/opcbot/lesson-candidates',
  opcBotLessonCandidatePropose: (candidateId: string) =>
    `/api/opcbot/lesson-candidates/${encodeURIComponent(candidateId)}/propose`,
  opcBotEvolutionProposals: '/api/opcbot/evolution-proposals',
  opcBotEvolutionProposalApprove: (proposalId: string) =>
    `/api/opcbot/evolution-proposals/${encodeURIComponent(proposalId)}/approve`,
  opcBotEvolutionProposalReject: (proposalId: string) =>
    `/api/opcbot/evolution-proposals/${encodeURIComponent(proposalId)}/reject`,
  opcBotEvolutionProposalCreatePr: (proposalId: string) =>
    `/api/opcbot/evolution-proposals/${encodeURIComponent(proposalId)}/create-pr`,
  opcBotEvolutionProposalMarkMerged: (proposalId: string) =>
    `/api/opcbot/evolution-proposals/${encodeURIComponent(proposalId)}/mark-merged`,
  opcBotSummary: '/api/opcbot/summary',
  opcBotWorkflows: '/api/opcbot/workflows',
  opcBotWorkflow: (workflowId: string) => `/api/opcbot/workflows/${encodeURIComponent(workflowId)}`,
  opcBotWorkflowEvaluateL5: (workflowId: string) =>
    `/api/opcbot/workflows/${encodeURIComponent(workflowId)}/evaluate-l5`,
  opcBotWorkflowCreatePr: (workflowId: string) =>
    `/api/opcbot/workflows/${encodeURIComponent(workflowId)}/create-pr`,
  opcBotWorkflowAutoMerge: (workflowId: string) =>
    `/api/opcbot/workflows/${encodeURIComponent(workflowId)}/auto-merge`,
  opcBotWorkflowTasks: (workflowId: string) =>
    `/api/opcbot/workflows/${encodeURIComponent(workflowId)}/tasks`,
  opcBotTaskCancel: (taskId: string) => `/api/opcbot/tasks/${encodeURIComponent(taskId)}/cancel`,
  opcBotTaskApprove: (taskId: string) => `/api/opcbot/tasks/${encodeURIComponent(taskId)}/approve`,
  growthPrograms: '/api/growth/programs',
  growthRules: '/api/growth/rules',
  growthRankings: '/api/growth/rankings',
  growthRewards: '/api/growth/me/rewards',
  growthAccruals: '/api/growth/accruals',
  growthAccrualApprove: (id: string | number) => `/api/growth/accruals/${id}/approve`,
  growthAccrualCancel: (id: string | number) => `/api/growth/accruals/${id}/cancel`,
  fundingChannels: (tenantId: string | number) => `/api/v1/tenant/${tenantId}/funding/channels`,
  fundingWallet: (tenantId: string | number, walletId: string | number) =>
    `/api/v1/tenant/${tenantId}/funding/wallets/${walletId}`,
  fundingWalletEntries: (tenantId: string | number, walletId: string | number) =>
    `/api/v1/tenant/${tenantId}/funding/wallets/${walletId}/entries`,
  adminTenantFeatures: (tenantId: string | number) => `/api/admin/tenants/${tenantId}/features`,
  adminTenantFeatureByCode: (tenantId: string | number, code: string) =>
    `/api/admin/tenants/${tenantId}/features/${code}`,
  meCapabilities: '/api/me/capabilities',
  me: '/api/auth/me',
  actAs: '/api/platform/act-as',
  tenantStatus: (code: string) => `/api/tenants/${code}/status`,
} as const

function normalizeLoginResponse(data: unknown): LoginResponse {
  const body = data as {
    token: string
    token_type?: AuthTokenType
    tokenType?: AuthTokenType
    expires_in?: number
    expiresIn?: number
    principal?: Principal | null
  }
  return {
    token: body.token,
    tokenType: body.tokenType ?? body.token_type ?? 'tenant',
    expiresIn: body.expiresIn ?? body.expires_in ?? 0,
    principal: body.principal ?? null,
  }
}

export async function login(client: AxiosInstance, req: LoginRequest): Promise<LoginResponse> {
  const res = await client.post('/api/auth/login', req)
  return normalizeLoginResponse(res.data)
}

export async function actAs(client: AxiosInstance, req: ActAsRequest): Promise<LoginResponse> {
  const res = await client.post(controlApiRoutes.actAs, { tenant_code: req.tenantCode })
  return normalizeLoginResponse(res.data)
}

export interface MeResponse {
  principal: Principal
  tokenType: AuthTokenType
}

// getMe resolves the current session principal + tenant context.
// Backed by `GET /api/auth/me` (ADR-014). Console calls this right after
// `login()` so its zustand store can populate `principal.tenantId`,
// which gates the tenant-scope pages.
export async function getMe(client: AxiosInstance): Promise<MeResponse> {
  const res = await client.get(controlApiRoutes.me)
  const body = res.data as {
    principal?: Record<string, unknown>
    token_type?: AuthTokenType
    tokenType?: AuthTokenType
  }
  const camel = camelizeKeys((body.principal ?? {}) as Record<string, unknown>)
  return {
    principal: {
      id: stringValue(camel.id),
      tenantId: stringValue(camel.tenantId),
      phone: camel.phone ? String(camel.phone) : undefined,
      email: camel.email ? String(camel.email) : undefined,
      displayName: camel.displayName ? String(camel.displayName) : undefined,
      roles: Array.isArray(camel.roles) ? (camel.roles as string[]) : [],
    },
    tokenType: body.tokenType ?? body.token_type ?? 'tenant',
  }
}

export async function listTenants(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<Tenant[]> {
  const res = await client.get(controlApiRoutes.tenants, { params: opts })
  return unwrapList<Record<string, unknown>>(res.data).map(normalizeTenant)
}

export async function getTenant(
  client: AxiosInstance,
  code: string | number,
): Promise<Tenant> {
  const res = await client.get(controlApiRoutes.tenantByCode(code))
  return normalizeTenant(res.data as Record<string, unknown>)
}

export async function createTenant(
  client: AxiosInstance,
  input: {
    code: string
    displayName: string
    domain?: string
    planCode?: string
    ownerPrincipalId?: string | number
    templateCodes?: string[]
    quota?: unknown
  },
): Promise<Tenant> {
  const res = await client.post(controlApiRoutes.tenants, snakeParams(input))
  return normalizeTenant(res.data as Record<string, unknown>)
}

export async function listAuditLogs(
  client: AxiosInstance,
  opts: {
    tenantId: string | number
    principalId?: string | number
    action?: string
    limit?: number
    offset?: number
  },
): Promise<PageResult<AuditLog>> {
  const res = await client.get(controlApiRoutes.audit, { params: snakeParams(opts) })
  return unwrapPage<AuditLog>(res.data)
}

export async function checkPermission(
  client: AxiosInstance,
  opts: {
    tenantId: string | number
    principalId: string | number
    permCode?: string
    permissionCode?: string
    resource?: string
    action?: string
  },
): Promise<PermissionCheck> {
  const res = await client.get(controlApiRoutes.rbacCheck, { params: snakeParams(opts) })
  return camelizeKeys(res.data as Record<string, unknown>) as unknown as PermissionCheck
}

export async function listVoucherBatches(
  client: AxiosInstance,
  opts: { tenantId: string | number; limit?: number; offset?: number },
): Promise<PageResult<VoucherBatch>> {
  const res = await client.get('/api/voucher/batches', {
    params: snakeParams({
      tenantId: opts.tenantId,
      limit: opts.limit,
      offset: opts.offset,
    }),
  })
  return unwrapPage<VoucherBatch>(res.data)
}

export async function createVoucherBatch(
  client: AxiosInstance,
  input: Record<string, unknown>,
): Promise<VoucherBatch> {
  const res = await client.post('/api/voucher/batches', snakeParams(input))
  return camelizeKeys(res.data as Record<string, unknown>) as unknown as VoucherBatch
}

export function getVoucherBatchExportUrl(batchId: string | number): string {
  return `/api/voucher/batches/${batchId}/export.csv`
}

export async function voidVoucher(
  client: AxiosInstance,
  voucherId: string | number,
): Promise<void> {
  await client.post(`/api/voucher/${voucherId}/void`)
}

export async function getBillingAggregate(
  client: AxiosInstance,
  opts: { tenantId: string | number; meterCode: string; from: string; to: string },
): Promise<BillingAggregate> {
  const res = await client.get('/api/billing/aggregate', {
    params: snakeParams(opts),
  })
  return camelizeKeys(res.data as Record<string, unknown>) as unknown as BillingAggregate
}

export async function recordBillingMeter(
  client: AxiosInstance,
  input: Record<string, unknown>,
): Promise<void> {
  await client.post(controlApiRoutes.billingMeter, snakeParams(input))
}

export async function listNotifications(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<PageResult<NotificationItem>> {
  const res = await client.get(controlApiRoutes.notifications, { params: opts })
  return unwrapPage<NotificationItem>(res.data)
}

export async function markNotificationRead(
  client: AxiosInstance,
  notificationId: NotificationItem['id'],
): Promise<void> {
  await client.patch(controlApiRoutes.notificationRead(notificationId))
}

export async function listApiKeys(
  client: AxiosInstance,
  opts: { tenantId?: string | number; limit?: number; offset?: number } = {},
): Promise<ApiKey[]> {
  const res = await client.get(controlApiRoutes.apiKeys, { params: snakeParams(opts) })
  return unwrapList<Record<string, unknown>>(res.data).map((item) => {
    const normalized = camelizeKeys(item) as unknown as ApiKey
    return { ...normalized, scopes: normalized.scopes ?? [] }
  })
}

export async function createApiKey(
  client: AxiosInstance,
  input: { tenantId?: string | number; name: string },
): Promise<ApiKey & { secret?: string }> {
  const res = await client.post(controlApiRoutes.apiKeys, snakeParams(input))
  const normalized = camelizeKeys(res.data as Record<string, unknown>) as unknown as ApiKey & {
    secret?: string
  }
  return { ...normalized, scopes: normalized.scopes ?? [] }
}

export async function rotateApiKey(
  client: AxiosInstance,
  apiKeyId: string | number,
  opts: { tenantId?: string | number } = {},
): Promise<ApiKey & { secret?: string }> {
  const res = await client.post(controlApiRoutes.apiKeyRotate(apiKeyId), snakeParams(opts))
  const normalized = camelizeKeys(res.data as Record<string, unknown>) as unknown as ApiKey & {
    secret?: string
  }
  return { ...normalized, scopes: normalized.scopes ?? [] }
}

export async function revokeApiKey(
  client: AxiosInstance,
  apiKeyId: string | number,
  opts: { tenantId?: string | number } = {},
): Promise<void> {
  await client.post(controlApiRoutes.apiKeyRevoke(apiKeyId), undefined, {
    params: snakeParams(opts),
  })
}

export async function listWebhooks(
  client: AxiosInstance,
): Promise<WebhookSubscription[]> {
  const res = await client.get(controlApiRoutes.webhooks)
  return unwrapList<Record<string, unknown>>(res.data).map(
    (item) => camelizeKeys(item) as unknown as WebhookSubscription,
  )
}

export async function createWebhook(
  client: AxiosInstance,
  input: { name: string; url: string; eventTypes: string[] },
): Promise<WebhookSubscription> {
  const res = await client.post(controlApiRoutes.webhooks, snakeParams(input))
  return camelizeKeys(res.data as Record<string, unknown>) as unknown as WebhookSubscription
}

export async function testWebhook(
  client: AxiosInstance,
  webhookId: string | number,
): Promise<unknown> {
  const res = await client.post(controlApiRoutes.webhookTest(webhookId))
  return res.data
}

export async function listJobRuns(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<PageResult<JobRun>> {
  const res = await client.get(controlApiRoutes.jobRuns, { params: opts })
  return unwrapPage<JobRun>(res.data)
}

export async function runJob(
  client: AxiosInstance,
  jobName: string,
  input: { tenantId?: string | number; payload?: Record<string, unknown> } = {},
): Promise<JobRun> {
  const res = await client.post(controlApiRoutes.jobRunManual(jobName), snakeParams(input))
  return camelizeKeys(res.data as Record<string, unknown>) as unknown as JobRun
}

export async function getPendingOutboxEvents(
  client: AxiosInstance,
): Promise<PendingOutboxEvents> {
  const res = await client.get(controlApiRoutes.outboxPending)
  const body = res.data as { data?: unknown; note?: string }
  return {
    data: unwrapList<Record<string, unknown>>(body).map(
      (item) => camelizeKeys(item) as unknown as OutboxEvent,
    ),
    note: body.note,
  }
}

export async function listOpcBotAgents(
  client: AxiosInstance,
): Promise<OpcBotAgentDefinition[]> {
  const res = await client.get(controlApiRoutes.opcBotAgents)
  return unwrapList<Record<string, unknown>>(res.data).map(
    (item) => camelizeDeep(item) as unknown as OpcBotAgentDefinition,
  )
}

export async function listOpcBotRunnerProviders(
  client: AxiosInstance,
): Promise<OpcBotRunnerProvider[]> {
  const res = await client.get(controlApiRoutes.opcBotRunnerProviders)
  return unwrapList<Record<string, unknown>>(res.data).map(
    (item) => camelizeDeep(item) as unknown as OpcBotRunnerProvider,
  )
}

export async function listOpcBotSkills(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<PageResult<OpcBotSkillDefinition>> {
  const res = await client.get(controlApiRoutes.opcBotSkills, { params: opts })
  const page = unwrapPage<Record<string, unknown>>(res.data)
  return {
    total: page.total,
    data: page.data.map((item) => camelizeDeep(item) as unknown as OpcBotSkillDefinition),
  }
}

export async function createOpcBotSkill(
  client: AxiosInstance,
  input: OpcBotCreateSkillInput,
): Promise<OpcBotSkillDefinition> {
  const res = await client.post(controlApiRoutes.opcBotSkills, opcbotSkillPayload(input))
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotSkillDefinition
}

export async function listOpcBotSkillRuns(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<PageResult<OpcBotSkillRun>> {
  const res = await client.get(controlApiRoutes.opcBotSkillRuns, { params: opts })
  const page = unwrapPage<Record<string, unknown>>(res.data)
  return {
    total: page.total,
    data: page.data.map((item) => camelizeDeep(item) as unknown as OpcBotSkillRun),
  }
}

export async function listOpcBotExternalRuns(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<PageResult<OpcBotExternalRun>> {
  const res = await client.get(controlApiRoutes.opcBotExternalRuns, { params: opts })
  const page = unwrapPage<Record<string, unknown>>(res.data)
  return {
    total: page.total,
    data: page.data.map((item) => camelizeDeep(item) as unknown as OpcBotExternalRun),
  }
}

export async function listOpcBotReleaseRuns(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<OpcBotReleaseRuns> {
  const res = await client.get(controlApiRoutes.opcBotReleaseRuns, { params: opts })
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotReleaseRuns
}

export async function listOpcBotLessonCandidates(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<PageResult<OpcBotLessonCandidate>> {
  const res = await client.get(controlApiRoutes.opcBotLessonCandidates, { params: opts })
  const page = unwrapPage<Record<string, unknown>>(res.data)
  return {
    total: page.total,
    data: page.data.map((item) => camelizeDeep(item) as unknown as OpcBotLessonCandidate),
  }
}

export async function proposeOpcBotLessonCandidate(
  client: AxiosInstance,
  candidateId: string,
  input: OpcBotProposeLessonInput,
): Promise<OpcBotEvolutionProposal> {
  const res = await client.post(
    controlApiRoutes.opcBotLessonCandidatePropose(candidateId),
    opcbotLessonProposalPayload(input),
  )
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotEvolutionProposal
}

export async function listOpcBotEvolutionProposals(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<PageResult<OpcBotEvolutionProposal>> {
  const res = await client.get(controlApiRoutes.opcBotEvolutionProposals, { params: opts })
  const page = unwrapPage<Record<string, unknown>>(res.data)
  return {
    total: page.total,
    data: page.data.map((item) => camelizeDeep(item) as unknown as OpcBotEvolutionProposal),
  }
}

export async function approveOpcBotEvolutionProposal(
  client: AxiosInstance,
  proposalId: string,
): Promise<void> {
  await client.post(controlApiRoutes.opcBotEvolutionProposalApprove(proposalId))
}

export async function rejectOpcBotEvolutionProposal(
  client: AxiosInstance,
  proposalId: string,
): Promise<void> {
  await client.post(controlApiRoutes.opcBotEvolutionProposalReject(proposalId))
}

export async function createOpcBotEvolutionProposalPr(
  client: AxiosInstance,
  proposalId: string,
): Promise<void> {
  await client.post(controlApiRoutes.opcBotEvolutionProposalCreatePr(proposalId))
}

export async function markOpcBotEvolutionProposalMerged(
  client: AxiosInstance,
  proposalId: string,
  input: OpcBotMarkEvolutionMergedInput = {},
): Promise<void> {
  await client.post(controlApiRoutes.opcBotEvolutionProposalMarkMerged(proposalId), {
    skill_code: input.skillCode,
    source_commit: input.sourceCommit,
    checksum: input.checksum,
    canary: input.canary,
  })
}

export async function getOpcBotSummary(client: AxiosInstance): Promise<OpcBotSummary> {
  const res = await client.get(controlApiRoutes.opcBotSummary)
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotSummary
}

export async function listOpcBotWorkflows(
  client: AxiosInstance,
  opts: { limit?: number; offset?: number } = {},
): Promise<PageResult<OpcBotWorkflow>> {
  const res = await client.get(controlApiRoutes.opcBotWorkflows, { params: opts })
  const page = unwrapPage<Record<string, unknown>>(res.data)
  return {
    total: page.total,
    data: page.data.map((item) => camelizeDeep(item) as unknown as OpcBotWorkflow),
  }
}

export async function getOpcBotWorkflow(
  client: AxiosInstance,
  workflowId: string,
): Promise<OpcBotWorkflowDetail> {
  const res = await client.get(controlApiRoutes.opcBotWorkflow(workflowId))
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotWorkflowDetail
}

export async function createOpcBotWorkflow(
  client: AxiosInstance,
  input: OpcBotCreateWorkflowInput,
): Promise<OpcBotWorkflowDetail> {
  const res = await client.post(controlApiRoutes.opcBotWorkflows, opcbotWorkflowPayload(input))
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotWorkflowDetail
}

export async function evaluateOpcBotWorkflowL5(
  client: AxiosInstance,
  workflowId: string,
): Promise<OpcBotL5EligibilityResult> {
  const res = await client.post(controlApiRoutes.opcBotWorkflowEvaluateL5(workflowId))
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotL5EligibilityResult
}

export async function createOpcBotWorkflowPR(
  client: AxiosInstance,
  workflowId: string,
): Promise<OpcBotPullRequest> {
  const res = await client.post(controlApiRoutes.opcBotWorkflowCreatePr(workflowId))
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotPullRequest
}

export async function autoMergeOpcBotWorkflow(
  client: AxiosInstance,
  workflowId: string,
): Promise<OpcBotPullRequest> {
  const res = await client.post(controlApiRoutes.opcBotWorkflowAutoMerge(workflowId))
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotPullRequest
}

export async function addOpcBotTask(
  client: AxiosInstance,
  workflowId: string,
  input: { task: OpcBotTaskInput; dependencies?: OpcBotDependencyInput[] },
): Promise<OpcBotTask> {
  const res = await client.post(controlApiRoutes.opcBotWorkflowTasks(workflowId), {
    task: opcbotTaskPayload(input.task),
    dependencies: (input.dependencies ?? []).map(opcbotDependencyPayload),
  })
  return camelizeDeep(res.data as Record<string, unknown>) as unknown as OpcBotTask
}

export async function cancelOpcBotTask(client: AxiosInstance, taskId: string): Promise<void> {
  await client.post(controlApiRoutes.opcBotTaskCancel(taskId))
}

export async function approveOpcBotTask(client: AxiosInstance, taskId: string): Promise<void> {
  await client.post(controlApiRoutes.opcBotTaskApprove(taskId))
}

export async function listFundingChannels(
  client: AxiosInstance,
  tenantId: string | number,
): Promise<FundingChannel[]> {
  const res = await client.get(controlApiRoutes.fundingChannels(tenantId))
  return unwrapList<Record<string, unknown>>(res.data).map(
    (item) => camelizeKeys(item) as unknown as FundingChannel,
  )
}

export async function listGrowthPrograms(
  client: AxiosInstance,
  opts: { tenantId?: string | number; limit?: number; offset?: number } = {},
): Promise<PageResult<GrowthProgram>> {
  const res = await client.get(controlApiRoutes.growthPrograms, { params: snakeParams(opts) })
  return unwrapPage<GrowthProgram>(res.data)
}

export async function listGrowthRules(
  client: AxiosInstance,
  opts: { tenantId?: string | number; programId: string | number; basisMetric?: string },
): Promise<PageResult<GrowthRule>> {
  const res = await client.get(controlApiRoutes.growthRules, { params: snakeParams(opts) })
  return unwrapPage<GrowthRule>(res.data)
}

export async function listGrowthRankings(
  client: AxiosInstance,
  opts: { tenantId?: string | number; programId: string | number; limit?: number },
): Promise<PageResult<GrowthStats>> {
  const res = await client.get(controlApiRoutes.growthRankings, { params: snakeParams(opts) })
  return unwrapPage<GrowthStats>(res.data)
}

export async function listGrowthRewards(
  client: AxiosInstance,
  opts: {
    tenantId?: string | number
    principalId?: string | number
    programId?: string | number
    status?: string
    limit?: number
    offset?: number
  } = {},
): Promise<PageResult<GrowthAccrual>> {
  const res = await client.get(controlApiRoutes.growthRewards, { params: snakeParams(opts) })
  return unwrapPage<GrowthAccrual>(res.data)
}

export async function listGrowthAccruals(
  client: AxiosInstance,
  opts: {
    tenantId?: string | number
    beneficiaryPrincipalId?: string | number
    programId?: string | number
    status?: string
    limit?: number
    offset?: number
  } = {},
): Promise<PageResult<GrowthAccrual>> {
  const res = await client.get(controlApiRoutes.growthAccruals, { params: snakeParams(opts) })
  return unwrapPage<GrowthAccrual>(res.data)
}

export async function approveGrowthAccrual(
  client: AxiosInstance,
  accrualId: string | number,
  opts: { tenantId?: string | number } = {},
): Promise<GrowthAccrual> {
  return decideGrowthAccrual(client, controlApiRoutes.growthAccrualApprove(accrualId), opts)
}

export async function cancelGrowthAccrual(
  client: AxiosInstance,
  accrualId: string | number,
  opts: { tenantId?: string | number } = {},
): Promise<GrowthAccrual> {
  return decideGrowthAccrual(client, controlApiRoutes.growthAccrualCancel(accrualId), opts)
}

async function decideGrowthAccrual(
  client: AxiosInstance,
  route: string,
  opts: { tenantId?: string | number },
): Promise<GrowthAccrual> {
  const res = await client.post(route, snakeParams(opts))
  return camelizeKeys(res.data as Record<string, unknown>) as unknown as GrowthAccrual
}

// ── Feature flags (ADR-012) ─────────────────────────────────────────────────

export async function listTenantFeatureFlags(
  client: AxiosInstance,
  tenantId: string | number,
): Promise<FeatureFlagListResponse> {
  const res = await client.get(controlApiRoutes.adminTenantFeatures(tenantId))
  const body = camelizeKeys(res.data as Record<string, unknown>) as Record<string, unknown>
  return {
    tenantId: stringValue(body.tenantId),
    flags: (Array.isArray(body.flags) ? (body.flags as Record<string, unknown>[]) : []).map(normalizeFeatureFlag),
    registry: Array.isArray(body.registry) ? (body.registry as string[]) : [],
  }
}

export async function upsertTenantFeatureFlag(
  client: AxiosInstance,
  tenantId: string | number,
  featureCode: string,
  input: { enabled: boolean; rolloutPercent?: number; config?: unknown },
): Promise<FeatureFlag> {
  const res = await client.put(
    controlApiRoutes.adminTenantFeatureByCode(tenantId, featureCode),
    snakeParams(input),
  )
  return normalizeFeatureFlag(res.data as Record<string, unknown>)
}

export async function deleteTenantFeatureFlag(
  client: AxiosInstance,
  tenantId: string | number,
  featureCode: string,
): Promise<void> {
  await client.delete(controlApiRoutes.adminTenantFeatureByCode(tenantId, featureCode))
}

export async function getMyCapabilities(client: AxiosInstance): Promise<CapabilitiesResponse> {
  const res = await client.get(controlApiRoutes.meCapabilities)
  const body = camelizeKeys(res.data as Record<string, unknown>) as Record<string, unknown>
  return {
    tenantId: stringValue(body.tenantId),
    features: Array.isArray(body.features) ? (body.features as string[]) : [],
  }
}

export async function updateTenantStatus(
  client: AxiosInstance,
  code: string,
  status: 0 | 1,
): Promise<{ tenantId: string; status: number }> {
  const res = await client.patch(controlApiRoutes.tenantStatus(code), { status })
  const body = camelizeKeys(res.data as Record<string, unknown>) as Record<string, unknown>
  return { tenantId: stringValue(body.tenantId), status: Number(body.status ?? status) }
}

function normalizeFeatureFlag(raw: Record<string, unknown>): FeatureFlag {
  const item = camelizeKeys(raw)
  return {
    id: stringValue(item.id),
    tenantId: stringValue(item.tenantId),
    featureCode: stringValue(item.featureCode),
    enabled: Number(item.enabled ?? 0) === 1 || item.enabled === true,
    rolloutPercent: Number(item.rolloutPercent ?? 100),
    config: item.config,
    createdAt: item.createdAt ? String(item.createdAt) : undefined,
    updatedAt: item.updatedAt ? String(item.updatedAt) : undefined,
  }
}

function unwrapPage<T>(body: unknown): PageResult<T> {
  const record = body as { data?: unknown; total?: number }
  const data = unwrapList<T>(body).map((item) =>
    isRecord(item) ? (camelizeKeys(item) as unknown as T) : item,
  )
  return { data, total: record.total ?? data.length }
}

function unwrapList<T>(body: unknown): T[] {
  if (Array.isArray(body)) return body as T[]
  if (isRecord(body) && Array.isArray(body.data)) return body.data as T[]
  return []
}

function normalizeTenant(raw: Record<string, unknown>): Tenant {
  const item = camelizeKeys(raw)
  const id = stringValue(item.id)
  const code = stringValue(item.code ?? item.tenantCode)
  const displayName = stringValue(item.displayName ?? item.name)
  return {
    id,
    code,
    name: displayName,
    displayName,
    line: stringValue(item.line ?? item.businessLine),
    status: item.status as string | number | undefined,
    planCode: item.planCode ? String(item.planCode) : undefined,
  }
}

function snakeParams(opts: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(opts)
      .filter((entry) => entry[1] !== undefined)
      .map(([key, value]) => [toSnake(key), value]),
  )
}

function camelizeKeys(value: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [toCamel(key), item]),
  )
}

function camelizeDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(camelizeDeep)
  if (!isRecord(value)) return value
  return Object.fromEntries(
    Object.entries(value).map(([key, item]) => [toCamel(key), camelizeDeep(item)]),
  )
}

function snakeizeDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(snakeizeDeep)
  if (!isRecord(value)) return value
  return Object.fromEntries(
    Object.entries(value)
      .filter((entry) => entry[1] !== undefined)
      .map(([key, item]) => [toSnake(key), snakeizeDeep(item)]),
  )
}

function opcbotWorkflowPayload(input: OpcBotCreateWorkflowInput) {
  return {
    source_type: input.sourceType,
    source_ref: input.sourceRef,
    risk_level: input.riskLevel,
    max_parallelism: input.maxParallelism,
    tasks: input.tasks.map(opcbotTaskPayload),
    dependencies: (input.dependencies ?? []).map(opcbotDependencyPayload),
  }
}

function opcbotTaskPayload(input: OpcBotTaskInput) {
  return {
    task_id: input.taskId,
    agent_code: input.agentCode,
    phase: input.phase,
    risk_level: input.riskLevel,
    optional: input.optional,
    input_payload: snakeizeDeep(input.inputPayload),
    branch: input.branch,
    workspace_ref: input.workspaceRef,
  }
}

function opcbotSkillPayload(input: OpcBotCreateSkillInput) {
  return {
    skill_code: input.skillCode,
    display_name: input.displayName,
    source_type: input.sourceType,
    source_repo: input.sourceRepo,
    source_path: input.sourcePath,
    source_commit: input.sourceCommit,
    checksum: input.checksum,
    risk_level: input.riskLevel,
    allowed_agents: input.allowedAgents,
    allowed_providers: input.allowedProviders,
    input_schema: input.inputSchema,
    output_schema: input.outputSchema,
    enabled: input.enabled ?? true,
    canary: input.canary,
  }
}

function opcbotLessonProposalPayload(input: OpcBotProposeLessonInput) {
  return {
    target_repo: input.targetRepo,
    target_path: input.targetPath,
    proposal_type: input.proposalType,
    diff_json: input.diffJson,
  }
}

function opcbotDependencyPayload(input: OpcBotDependencyInput) {
  return {
    task_id: input.taskId,
    depends_on_task_id: input.dependsOnTaskId,
    dependency_type: input.dependencyType,
  }
}

function toCamel(value: string): string {
  const normalized = value.replace(/_([a-z])/g, (_, char: string) => char.toUpperCase())
  if (/^[A-Z0-9]+$/.test(normalized)) return normalized.toLowerCase()
  return normalized.charAt(0).toLowerCase() + normalized.slice(1)
}

function toSnake(value: string): string {
  return value.replace(/[A-Z]/g, (char) => `_${char.toLowerCase()}`)
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function stringValue(value: unknown): string {
  if (value === undefined || value === null) return ''
  return String(value)
}
